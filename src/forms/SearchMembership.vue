<template lang="pug">
  .vnvc-membership
    .vnvc-frame__header
      .vnvc-frame__header-title Tra cứu điểm thưởng
    el-form(v-loading="loading").vnvc-frame__content
      .radio-group
        el-radio.ep-radio(style="marginRight: 5rem" v-model="searchType" label="phone") Tra cứu bằng số điện thoại
        el-radio.ep-radio(v-model="searchType" label="code") Tra cứu bằng mã thẻ thành viên
      .ep-input(v-if="searchType === 'phone'")
        input(v-model="phone" id="inputPhone"  maxlength="10").ep-input__input
        .ep-input__main-placeholder Nhập số điện thoại của bạn
        .ep-input__main-placeholder-notempty(v-if="phone !== ''") Nhập số điện thoại của bạn
        .ep-input__sub-placeholder(@click="textInputFocus('inputPhone')" v-if="phone === ''" ) Nhập số điện thoại của bạn
        .ep-input__button(@click="submitOTP" v-if="canSubmitOTP") Nhận OTP
        .ep-input__error-message(v-if="showError === 'phone'")
          .icon(style="paddingRight: 10px !important;")
            img(src="../assets/error_outline.svg")
          .message {{ messageError }}
      .ep-input(v-if="searchType === 'phone'")
        input(v-model="otp" id="inputOTP" :class="{'force-input': forceInputOTP, 'disabled': disableOTP}" :disabled="disableOTP" maxlength="6").ep-input__input.otp-input
        .ep-input__main-placeholder Nhập OTP bạn nhận được
        .ep-input__main-placeholder-notempty(v-if="otp !== ''") Nhập OTP bạn nhận được
        .ep-input__sub-placeholder(@click="textInputFocus('inputOTP')" v-if="otp === ''" :class="{'force-input-text': forceInputOTP}") Nhập OTP bạn nhận được
        .ep-input__error-message(v-if="showError === 'code'")
          .icon(style="paddingRight: 10px !important;")
            img(src="../assets/error_outline.svg")
          .message {{ messageError !== 'Mã xác thực đã hết hạn' ? `${messageError} (${timeCount}s)` : `${messageError}` }}
        .ep-input__time-message(v-if="showTimeCount") {{ `${timeCount}s` }}
      .ep-input(v-if="searchType === 'code'")
        input(v-model="inputCode" id="inputCode").ep-input__input.code-input
        .ep-input__main-placeholder Nhập mã thẻ thành viên của bạn
        .ep-input__main-placeholder-notempty(v-if="inputCode !== ''") Nhập mã thẻ thành viên của bạn
        .ep-input__sub-placeholder(@click="textInputFocus('inputCode')" v-if="inputCode === ''" ) Nhập mã thẻ thành viên của bạn
      .ep-input__resubmitotp(@click="reSubmitOTP" v-if="showReSubmitOTP") Gửi lại mã xác thực
      el-button(:disabled="disableSubmit" v-if="searchType === 'phone'" ).ep-button(:class="{'disabled-button': disableSubmit}") Tra cứu
      el-button(v-if="searchType === 'code'" :disabled="inputCode === ''" @click="onCheckCode").ep-button(:class="{'disabled-button': inputCode === ''}") Kiểm tra
    el-dialog.vnvc-dialog(
      v-if="showPopup"
      visible
      title="Tra cứu điểm thưởng"
      :close-on-click-modal="false"
      @close="onClosePopup")
      el-form(v-loading="loadingPopup").vnvc-frame.wrap-content
        .title Nhập mã xác thực (OTP) được gửi tới số điện thoại *******321 của bạn để tra cứu điểm thưởng
        .ep-input
          input(v-model="otp" id="inputOTP" :class="{'force-input': forceInputOTP, 'disabled': disableOTP}" :disabled="disableOTP" maxlength="6").ep-input__input.otp-input
          .ep-input__main-placeholder Nhập OTP bạn nhận được
          .ep-input__main-placeholder-notempty(v-if="otp !== ''") Nhập OTP bạn nhận được
          .ep-input__sub-placeholder(@click="textInputFocus('inputOTP')" v-if="otp === ''" :class="{'force-input-text': forceInputOTP}") Nhập OTP bạn nhận được
          .ep-input__error-message(v-if="showError === 'code'")
            .icon(style="paddingRight: 10px !important;")
              img(src="../assets/error_outline.svg")
            .message {{ messageError !== 'Mã xác thực đã hết hạn' ? `${messageError} (${timeCount}s)` : `${messageError}` }}
          .ep-input__time-message(v-if="showTimeCount") {{ `${timeCount}s` }}
        .ep-input__resubmitotp(@click="reSubmitOTP" v-if="showReSubmitOTP") Gửi lại mã xác thực
        el-button(:disabled="canSearchMemberPopup").ep-button(:class="{'disabled-button': canSearchMemberPopup}") Tra cứu

</template>
<script>
import Base from "./Base";

const _time = 59
const _initData = {
  phone: '',
  otp: '',
  inputCode: '',
  messageError: '',
  showError: null,
  canSubmitOTP: false,
  forceInputOTP: false,
  showTimeCount: false,
  timeCount: _time,
  disableOTP: true,
  disableSubmit: true,
  preventSubmitOTP: false,
  interval: null,
  showReSubmitOTP: false,
  loading: false,
  showPopup: false,
  loadingPopup: false,
  canSearchMemberPopup: true
}
export default {
  extends: Base,
  data() {
    return {
      searchType: 'phone',
      dummyResult: false,
      ..._initData
    }
  },
  mounted() {
    this.bindEvent()
  },
  watch: {
    searchType: {
      handler() {
        this.onResetForm()
      }
    },
    phone: {
      immediate: true,
      handler(val) {
        this.showError = null
        this.canSubmitOTP = false
        this.clearOTPInput()
        if (val.length === 10) {
          this.validatePhone()
        }
      }
    },
    otp: {
      immediate: true,
      handler(val) {
        if (val.length === 6) {
          this.searchMembership()
        }
      }
    }
  },
  methods: {
    onResetForm () {
      clearInterval(this.interval)
      Object.assign(this.$data, _initData);
      setTimeout(() => {
        this.bindEvent()
      }, 500)
    },
    bindEvent() {
      let el = document.getElementById('inputPhone');
      el.addEventListener('blur', this.validatePhone);
    },
    validatePhone() {
      const regex = /^(0[1-9])+([0-9]{8})\b/g
      if (!regex.test(this.phone) || this.phone.length < 10) {
        this.messageError = 'Vui lòng nhập chính xác số điện thoại'
        this.showError = 'phone'
        this.canSubmitOTP = false
      } else {
        if (!this.preventSubmitOTP) {
          this.canSubmitOTP = true
        }
        this.showError = null
      }
    },
    textInputFocus(id) {
      document.getElementById(id).focus();
    },
    submitOTP() {
      if (!this.showPopup)
        this.loading = true
      setTimeout(() => {
        if (!this.showPopup)
          this.loading = false
        this.preventSubmitOTP = true
        this.forceInputOTP = true
        this.showTimeCount = true
        this.disableOTP = false
        this.canSubmitOTP = false
        this.loadingPopup = false
        this.countTime()
      }, 2000)
    },
    countTime() {
      this.interval = setInterval(() => {
        if (this.timeCount > 0) {
          this.timeCount--
        } else {
          this.showTimeCount = false
          this.timeCount = _time
          this.showError = 'code'
          this.messageError = 'Mã xác thực đã hết hạn'
          this.showReSubmitOTP = true
          clearInterval(this.interval)
        }
      }, 1000)
    },
    clearOTPInput() {
      this.showTimeCount = false
      this.preventSubmitOTP = false
      this.disableOTP = true
      this.forceInputOTP = false
      this.timeCount = _time
      clearInterval(this.interval)
    },
    reSubmitOTP() {
      this.showReSubmitOTP = false
      this.showError = null
      this.submitOTP()
    },
    searchMembership() {
      if (!this.showPopup)
        this.loading = true
      else {
        this.loadingPopup = true
      }
      setTimeout(() => {
        if (!this.showPopup)
          this.loading = false
        else {
          this.loadingPopup = false
        }
        if (!this.dummyResult) {
          this.showError = 'code'
          this.messageError = 'OTP không đúng hoặc hết hạn, bạn còn X lần nhập'
          this.showTimeCount = false
          this.otp = ''
        } else {
          this.disableSubmit = false
          this.showTimeCount = false
          this.preventSubmitOTP = false
          this.forceInputOTP = false
          this.canSearchMemberPopup = false
          this.timeCount = _time
          clearInterval(this.interval)
        }
      }, 1000)
    },
    onCheckCode() {
      this.showPopup = true
      this.loadingPopup = true
      this.submitOTP()
    },
    onClosePopup() {
      this.showPopup = false
    }
  },
}

</script>
<style lang="scss" src="../assets/membership.scss"></style>
