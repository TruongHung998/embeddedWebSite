<template lang="pug">
  .ep__registration-step.ep__registration-step--framed
    el-form.evusheld-tracking-form(
      label-position="top"
      ref="form"
      :model="form"
      v-loading="submitting"
      :rules="rules")
      .ep__registration-header
        i.user-profile-icon
          <svg width="162" height="172" viewBox="0 0 162 172" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M81.5 0.083252C72.5586 0.083252 63.8181 2.73467 56.3836 7.70223C48.9491 12.6698 43.1547 19.7304 39.7329 27.9911C36.3112 36.2518 35.416 45.3417 37.1603 54.1113C38.9047 62.8808 43.2104 70.9362 49.5329 77.2587C55.8554 83.5812 63.9107 87.8869 72.6803 89.6313C81.4499 91.3756 90.5397 90.4803 98.8005 87.0586C107.061 83.6369 114.122 77.8425 119.089 70.408C124.057 62.9735 126.708 54.2329 126.708 45.2916C126.708 33.3016 121.945 21.8027 113.467 13.3245C104.989 4.84626 93.49 0.083252 81.5 0.083252V0.083252ZM81.5 72.4166C76.1352 72.4166 70.8908 70.8257 66.4302 67.8452C61.9695 64.8647 58.4928 60.6283 56.4398 55.6719C54.3867 50.7154 53.8496 45.2615 54.8962 39.9998C55.9428 34.738 58.5262 29.9048 62.3197 26.1113C66.1132 22.3178 70.9464 19.7344 76.2082 18.6878C81.4699 17.6412 86.9238 18.1783 91.8803 20.2314C96.8367 22.2844 101.073 25.7611 104.054 30.2217C107.034 34.6824 108.625 39.9268 108.625 45.2916C108.625 52.4856 105.767 59.3849 100.68 64.4719C95.5934 69.5588 88.694 72.4166 81.5 72.4166V72.4166ZM162.875 171.875V162.833C162.875 146.047 156.207 129.949 144.337 118.079C132.468 106.21 116.369 99.5416 99.5833 99.5416H63.4167C46.6307 99.5416 30.5322 106.21 18.6627 118.079C6.79321 129.949 0.125 146.047 0.125 162.833V171.875H18.2083V162.833C18.2083 150.843 22.9713 139.344 31.4495 130.866C39.9278 122.388 51.4267 117.625 63.4167 117.625H99.5833C111.573 117.625 123.072 122.388 131.55 130.866C140.029 139.344 144.792 150.843 144.792 162.833V171.875H162.875Z" fill="#E9ECF4"/></svg>
        el-row(:gutter="20", style="display: flex; align-items: center;")
        h1.registration_injection_h1 Tra cứu thông tin đăng ký tiêm Evusheld

      section
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Số di động" prop="phone")
              el-input(v-model="form.phone" ref="focus")
          el-col(:sm="12")
            el-form-item(label="Ngày sinh người tiêm" prop="birth")
              el-date-picker(
                v-model="form.birth"
                popper-class="picker-date-custom-classed"
                placeholder="Chọn ngày sinh"
                :picker-options="birthdayOptions")
            el-form-item(label="Ngày sinh người tiêm" prop="birthday" v-if="false")
              div(class="FormDate" @keyup.capture="updateValue")
                input(
                  v-if="showDay"
                  ref="day"
                  v-model="day"
                  class="FormDate__input FormDate__input--day"
                  type="number"
                  placeholder="DD"
                  @input="updateDay"
                  @blur="day = day.padStart(2, 0)")
                span(
                  v-if="showDay && showMonth"
                  class="FormDate__divider") {{'/'}}
                input(
                  v-if="showMonth"
                  ref="month"
                  v-model="month"
                  class="FormDate__input FormDate__input--month"
                  type="number"
                  placeholder="MM"
                  @input="updateMonth"
                  @blur="month = month.padStart(2, 0)")
                span(
                  v-if="showYear && (showDay || showMonth)"
                  class="FormDate__divider") {{'/'}}
                input(
                  v-if="showYear"
                  ref="year"
                  v-model="year"
                  class="FormDate__input FormDate__input--year"
                  type="number"
                  placeholder="YYYY"
                  @blur="year = year.padStart(4, 0)")
          el-col(:sm="12")
            el-form-item(label="Mã đăng ký" prop="order_id")
              el-input(v-model="form.order_id")

        el-button.button-icon-next(
          @click="lookup"
          type="primary") TRA CỨU
          i
            <svg width="14" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.293 12.293L6.707 13.707L13.414 7L6.707 0.292999L5.293 1.707L9.586 6H0V8H9.586L5.293 12.293Z" fill="white"/>
            </svg>
    el-dialog.evusheld-dialog(title="Thông tin đăng ký tiêm Evusheld" :show-close="false" :visible.sync="show" width="70%")
      section.ep-section.finish-inject-2
        el-col
          ep-section__description-note Chúng tôi đã tìm thấy thông tin của Quý khách:
        el-col
          h2.booking-completed-row Thông tin cá nhân
        div(style="display: flex; align-items: center; width: 100%; justify-content: space-between;")
          div
            div.row-booking-right.row-label-success
              span Tên người đăng ký tiêm:&nbsp;
              span.eplus-strong(style="color: #0957DE; font-size: 15px;") {{ evusheldProfile.pr_fullname }}
            div.row-booking-right.row-label-success
              span SĐT:&nbsp;
              span.eplus-strong(style="color: #0957DE; font-size: 15px;") {{ evusheldProfile.pr_phone }}
            div.row-booking-right.row-label-success
              span Ngày sinh:&nbsp;
              span.eplus-strong(style="color: #0957DE;") {{ getDateStr(evusheldProfile.pr_birth) }}
            div.row-booking-right.row-label-success
              span Giới tính:&nbsp;
              span.eplus-strong {{ evusheldProfile.pr_gender }}
            div.row-booking-right.row-label-success
              span Cân nặng:&nbsp;
              span.eplus-strong {{ `${evusheldProfile.pr_weight}kg` }}
            div.row-booking-right.row-label-success
              span Địa chỉ:&nbsp;
              span.eplus-strong {{ evusheldProfile.pr_address }}
            div.row-booking-right.row-label-success
              span Số CMND/CCCD/Passport:&nbsp;
              span.eplus-strong {{ `số ${evusheldProfile.pr_passport}, cấp ngày ${getDateStr(evusheldProfile.pr_passport_date)}, cấp bởi ${evusheldProfile.pr_passport_location}` }}
        el-col
          h2.booking-completed-row Thông tin người liên hệ
        div(style="display: flex; align-items: center; width: 100%; justify-content: space-between;")
          div
            div.row-booking-right.row-label-success
              span Tên người liên hệ:&nbsp;
              span.eplus-strong {{ evusheldProfile.rs_name }}
            div.row-booking-right.row-label-success
              span SĐT:&nbsp;
              span.eplus-strong {{ evusheldProfile.rs_phone }}
            div.row-booking-right.row-label-success
              span Mối quan hệ với người được tiêm:&nbsp;
              span.eplus-strong {{ evusheldProfile.rs_law }}
        el-col(style="margin-bottom: 30px;")
          h2.booking-completed-row Thông tin đăng ký
          div.row-booking-right.row-label-success
            span Mã đăng ký:&nbsp;
            span.eplus-strong(style="color: #0957DE; font-size: 18px;") {{ evusheldProfile.order_id }}
          div.row-booking-right.row-label-success
            span Nơi đăng ký tiêm:&nbsp;
            span.eplus-strong(style="color: #0957DE;") {{ `${evusheldProfile.sv_location === 'HCM' ? 'Bệnh viện Đa khoa Tâm Anh TP. Hồ Chí Minh' : 'Bệnh viện Đa khoa Tâm Anh Hà Nội'}` }}
          div.row-booking-right.row-label-success
            span Trạng thái:&nbsp;
            span.eplus-strong {{ getOrderStatus(evusheldProfile.order_status) }}
          div.row-booking-right.row-label-success
            span Hình thức thanh toán:&nbsp;
            span.eplus-strong {{ getPayment(evusheldProfile.payment_code) }}
          div.row-booking-right.row-label-success
            span Số tiền:&nbsp;
            span.eplus-strong {{ getCurrencyFormat(evusheldProfile.sv_total) }}
        p Trong trường hợp cần hỗ trợ gấp hoặc cần giải đáp thắc mắc, Quý khách vui lòng liên hệ:
        b HỆ THỐNG BỆNH VIỆN ĐA KHOA TÂM ANH
        br
        ul
          li
            b Bệnh viện Đa khoa Tâm Anh TP. HCM
            p 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
            p
              a.phone(href="tel:02871026789") 0287 102 6789
            p
              a.mail(href="mailto:info@hcm.tahospital.vn") info@hcm.tahospital.vn
          li
            b Bệnh viện Đa khoa Tâm Anh (Hà Nội)
            p 108 Hoàng Như Tiếp, Bồ Đề, Long Biên, Hà Nội
            p
              a.phone(href="tel:18006858") 1800 6858
            p
              a.mail(href="mailto:info@tamanhhospital.vn") info@tamanhhospital.vn
        .finish-inject-2-actions(style="display: flex; align-items: center; width: 100%; justify-content: center;")
          el-button(type="primary" @click="close()") ĐÓNG
</template>

<script>
import moment from 'moment'
import * as $v from '../services/validators'
import Base from './Base'
import taLogo from '../assets/ta_logo.png'
import { MessageBox } from 'element-ui'

export default {
  extends: Base,
  name: 'FormDate',

  props: {
    showDay: {
      type: Boolean,
      default: true,
    },
    showMonth: {
      type: Boolean,
      default: true,
    },
    showYear: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      key: 'EvusheldTracking',
      taLogo,
      submitting: false,
      show: false,
      evusheldProfile: {},
      rules: {
        phone: [$v.required, ...$v.phone],
        birth: [$v.required]
      },
      day: '',
      month: '',
      year: ''
    }
  },

  watch: {
    year(current, prev) {
      if (current > 9999) this.year = prev;
      if (current && current.length == 4 && moment(`${current}-${this.month}-${this.day}`).format('DD/MM/YYYY') === 'Invalid date') {
        this.month = ''
        this.day = ''
      }
    }
  },

  computed: {
    birthdayOptions() {
      return {
        disabledDate: d => d.valueOf() > Date.now()
      }
    }
  },

  methods: {
    updateValue() {
      const timestamp = Date.parse(`${this.year.padStart(4, 0)}-${this.month}-${this.day}`)
      if (Number.isNaN(timestamp)) return
      this.form = {
        ...this.form,
        birthday: moment(timestamp)
      }
      this.$emit('input', timestamp)
    },
    updateDay() {
      if (!this.day.length || (this.day < 4 && this.day.length < 2)) return
      if (this.day > 31) {
        this.day = ''
        return
      }
      if (this.showMonth) this.$refs.month.select()
      else if (this.showYear) this.$refs.year.select()
    },
    updateMonth() {
      if (!this.month.length || this.month < 2) return
      if (this.month > 12) {
        this.month = ''
        return
      }
      if (this.showYear) this.$refs.year.select()
    },
    reset() {
      this.submitting = false
      this.show = false
      this.form = {
        phone: null,
        order_id: undefined,
        birth: null
      }
    },

    getOrderStatus (status) {
      switch (status) {
        case '0':
          return 'Chưa thanh toán'
        case '1':
          return 'Đã thanh toán'
        case '2':
          return 'Hủy VNPay'
        case '3':
          return 'Đã hủy'
      }
      return ''
    },

    getPayment (code) {
      switch (code) {
        case 'cod':
          return 'Thanh toán tại bệnh viện'
        case 'trans':
          return 'Chuyển khoản'
        case 'vnpay_atm':
          return 'Thanh toán thẻ nội địa - VNPay'
        case 'vnpay_visa':
          return 'Thanh toán thẻ quốc tế - VNPay'
        case 'qrcode':
          return 'Thanh toán QRCode VNPay (online)'
        case 'qroffline':
          return 'Thanh toán QRCode VNPay (offline)'
      }
      return ''
    },

    getCurrencyFormat(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `${val} VNĐ`;
    },

    close() {
      this.reset()
    },

    lookup() {
      const form = this.$refs.form
      if (!form) return
      form.validate(ok => {
        if (!ok) {
          for (const i in form.fields) {
            const field = form.fields[i]
            if (field.validateState === 'error') {
              const rect = field.$el.getBoundingClientRect()
              if (rect) window.scrollTo(0, rect.top + window.scrollY - 72)
              for (const j in field.$children) {
                const focuser = field.$children[j]
                if (focuser.focus) {
                  focuser.focus()
                  break
                }
              }
              break
            }
          }
          return
        }
        this.submitting = true
        const dataSubmit = {
          ...this.form,
          birth: moment(this.form.birth).format('YYYY-MM-DD')
        }
        this.$apis.tamanh
            .evusheldTracking(dataSubmit)
            .then((res) => {
              console.log('res', res)
              if (res) {
                this.evusheldProfile = res
                this.show = true
              } else {
                MessageBox({
                  title: '',
                  message: 'Rất tiếc! Chúng tôi không tìm thấy thông tin của bạn. Vui lòng thử lại.',
                  showCancelButton: false,
                  showConfirmButton: true,
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: 'ĐÓNG',
                  cancelButtonText: '',
                  callback: () => {}
                })
              }
            }).catch(() => {
              MessageBox({
                title: '',
                message: 'Rất tiếc! Chúng tôi không tìm thấy thông tin của bạn. Vui lòng thử lại.',
                showCancelButton: false,
                showConfirmButton: true,
                dangerouslyUseHTMLString: true,
                confirmButtonText: 'ĐÓNG',
                cancelButtonText: '',
                callback: () => {}
              })
            }).finally(() => {
              this.submitting = false
            })
      })
    },

    scrollToTop() {
      const rect = this.$el.getBoundingClientRect()
      console.log(rect.top + window.scrollY - 72)
      if (rect) window.scrollTo(0, rect.top + window.scrollY - 72)
    },

    getDateStr(date, format = 'DD/MM/YYYY') {
      return date ? moment(date).format(format) : date
    }
  }
}
</script>
<style lang="scss" scoped>
.eplus {
  &-body {
    border-collapse: separate !important;
    border-radius: 0 0 8px 8px;
    border: 1px solid #ddd;
    border-top: none;
  }

  &-contact-list {
    margin-bottom: 0;
    padding-inline-start: 28px;
  }

  &-header {
    border-radius: 8px 8px 0 0 !important;

    * {
      vertical-align: middle !important;
    }

    &__logo {
      padding: 16px !important;

      img {
        width: 64px !important;

      }
    }

    &__introduce {
      // padding: 24px 16px 24px 0 !important;
      padding: 12px 12px 12px 0 !important;
    }
  }

  &-title {
    font-size: 18px;
    line-height: 1.2em !important;
    font-weight: bold;
    color: white;
    margin: 0 !important;

  }

  &-sub-title {
    font-size: 16px;
    color: white !important;
    margin: .2em 0 0 0 !important;

  }

  &-hotline {
    font-weight: bold;
    margin: .25em 0 .5em 0;

    a {
      font-weight: bold;
    }
  }

  &-legend {
    font-weight: bold;
    margin: 16px 0 12px;
  }

  &-strong {
    font-weight: bold;
  }

  &-alt {
    font-size: .9em !important;
  }

  &-card {
    border: 1px solid #ddd !important;
    border-collapse: separate !important;
    border-radius: 4px !important;
    margin: 12px 0 16px !important;
    width: 100%;

    tr {
      &:not(:last-child) {
        td {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    &__icon {
      text-align: center;

      img {
        width: 20px !important;
        display: inline-block;
      }
    }

    .icon-passport {
      position: absolute !important;
    }

    .booking-detail-line {
      margin-top: 10px;
      padding: 0px 15px;
      display: flex;

      .row-booking-left {
        width: 40%;
      }

      .row-booking-right {
        width: 55%;
      }
    }

    &__preview {
      padding: 10px 10px 10px 0 !important;

      p {
        margin: 0 !important;
      }

      p + p {
        margin-top: .25em !important;
      }
    }
  }

  &-summary {
    &__price {
      text-align: right;
    }
  }

  &-footer {
    background: transparent !important;
  }

  &-partners {
    text-align: center;

    a {
      display: inline-block;
      margin: 0 5px;
      vertical-align: middle;
    }
  }

  &-company {
    text-align: center;

    &__about {
      text-align: center;
      font-size: 12px !important;
    }

    &__contact {
      text-align: center;
      font-size: 12px !important;

      > a {
        margin: 0 5px;
      }
    }
  }
}
</style>

<style lang="scss">
.evusheld-dialog {
  .finish-inject-2 {
    color: #233248;
    .hospital-ta {
      margin: 15px 0px;
    }
    .booking-success-note {
      margin-bottom: 20px;
    }
    .ep-section__description-note {
      color: #686868;
      text-align: left;
      float: left;
      margin: 20px 0px 30px;
      &.date {
        margin: 0px;
      }
    }
    .lasted-line-ta-website {
      margin-bottom: 80px;
    }
    .el-link {
      font-weight: bold;
      a {
        color: #0957DE;
      }
      margin-top: 20px;
    }
    .row-label-success {
      margin-bottom: 0.3em;
    }
  }
  .el-dialog__title {
    font-weight: bold;
  }
}
.evusheld-tracking-form {
  .ep__registration-header {
    p {
      font-weight: 600;
      color: #102E9E;
      font-size: 16px;
    }

    i {
      bottom: 0px;
      right: 0px;
      top: 0px;
    }

    .user-profile-icon {
      svg {
        width: 12rem;
        height: 16rem;
        position: absolute;
        bottom: -17px;
        right: 0px;
      }
    }
  }

  .button-icon-next {
    span {
      display: flex;
      align-items: flex-start;

      i {
        margin-left: 5px;
      }
    }
  }

  .heading-page {
    font-size: 16px;
    font-weight: 600;
    color: #282828;
    margin-bottom: 15px;
  }

  .inject-num-label {
    font-weight: 600;
    color: #282828;
    padding-top: 10px;
    padding-left: 10px;
  }

  .vaccine-inject-note {
    color: #1691E2;
    font-size: 14px;
    text-align: center;
    padding: 0px 20px 30px;
    font-style: italic;
  }

  .underlying-item {
    display: grid;

    .el-checkbox {
      margin-bottom: 10px;
      align-items: center;
      display: flex;
    }
  }

  .back-button-userinfo {
    background-color: #E9E9E9;
  }

  .birthday-container {
    background-color: #f6f8fe;
    padding: 0px 4px;
    display: flex;
    justify-content: space-between;

    input {
      height: 30px !important;
    }
  }

  .el-icon-circle-close::before {
    color: red !important;
  }
}

.vaccine-covid19-register-success {
  .inject_info_title {
    color: #233248;
    font-weight: 800;
    align-items: center;
    margin-top: 0.5em;
  }

  .inject_info_title::after {
    content: '';
    flex: 1;
    margin-left: 1rem;
    height: 1px;
    background-color: #000;
  }

  .row-vaccine-info {
    display: flex;
    border-bottom: 1px solid #ddd;
    align-items: center;

    .eplus-card__icon {
      width: 25px;
    }
  }

  .phone {
    color: #0957DE;
    font-weight: bold;
    text-decoration: none;
  }

  .mail {
    color: #0957DE;
    text-decoration: none;
  }
}

.FormDate {
  $spacing: 0.75em;
  display: inline-flex;
  position: relative;
  overflow: hidden;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  height: 38px;

  &__input {
    height: 38px;
    padding-right: $spacing / 2;
    padding-left: $spacing / 2;
    border: none;
    text-align: center;
    -moz-appearance: textfield; // 1

    &::-webkit-inner-spin-button {
      display: none; // 1
    }

    &:first-child {
      padding-left: $spacing;
    }

    &:last-child {
      padding-right: $spacing;
    }

    &:focus {
      outline: none;
    }

    &--day,
    &--month {
      width: 3em;
    }

    &--year {
      width: 4em;
    }
  }

  &__divider {
    padding-bottom: $spacing;
    pointer-events: none;
  }
}

.el-message-box {
  width: auto;
  max-width: 420px;
}

.registration_injection_ta_label {
  font-weight: 700;
  color: #102E9E;
  font-size: 18px;
  padding-left: 0px;
}

.registration_injection_h1 {
  padding-top: 5px;
  position: relative;
}

.registration_injection_note {
  font-weight: 400;
  font-size: 16px;
  position: relative;
}

@media only screen and (max-width: 576px) {
  .ep__registration-header {
    margin: -25px -25px 1.5rem -25px;
  }
  .el-radio-group {
    display: grid !important;
  }
  .el-form-item {
    margin-bottom: 17px !important;
  }
  .address_hospital {
    font-size: 12px !important;
  }
  .button-icon-next {
    margin-top: 10px !important;
  }
  .inject-num-label {
    margin: 0px !important;
    padding: 0px !important;
  }
  .vaccine-inject-note {
    padding: 0px 10px 10px !important;
  }
  .registration_injection_ta_label {
    font-size: 16px !important;
  }
  .registration_injection_h1 {
    font-size: 1.7em !important;
  }
  .registration_injection_note {
    font-size: 14px !important;
  }
  .el-form-item__label {
    font-weight: bold !important;
  }
  .evusheld-dialog {
    .el-dialog {
      width: 95% !important;
    }
  }
}

@media only screen and (min-width: 576px) {
}
</style>
