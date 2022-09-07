<template lang="pug">
.ep-wrapper.signup-consultation-6m
  .ep-loading(v-if="loading") Đang tải. Vui lòng đợi...
  .ep-thankyou(v-else-if="finished")
    h2.ep-thankyou__title ĐĂNG KÝ TƯ VẤN THÀNH CÔNG
    .ep-thankyou__body.ep-summary
      section.ep-section.ep-piece
        span Cảm ơn Quý Ba, Mẹ đã đăng ký tư vấn. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
    .ep-thankyou__actions
      div
        a.el-button.el-button--primary.el-button-back(@click="reset") {{'QUAY LẠI'}}

  el-form.ep-form.ep-form--signupconsultation6m(
    v-else
    v-loading="submitting"
    ref="form"
    :model="form"
    label-position="top"
    :rules="rules")

    section.ep-section
      .ep-section__title ĐĂNG KÝ TƯ VẤN
      .ep-section__body
        p Đừng lo sợ Covid-19 mà trì hoãn tiêm chủng cho con yêu, Bố Mẹ nên hoàn tất lịch tiêm cho trẻ từ 0-6 tháng bằng Bộ 3 vắc xin: 6 trong 1 - Phế cầu - Rotavirus của Bỉ để con không bỏ mất cơ hội chủng ngừa vắc xin trong đời.

    section.ep-section
      .ep-section__body
        el-form-item(prop="full_name")
          el-input.text-input.ep-uppercase(placeholder="Họ và tên" v-model="form.full_name")
        el-form-item(prop="phone")
          el-input.text-input(placeholder="Số điện thoại" v-model="form.phone")
        el-form-item(prop="content")
          el-input.text-input(placeholder="Nội dung cần tư vấn" v-model="form.content")
        el-form-item(prop="center")
          el-select(v-model="form.center" placeholder="Chọn trung tâm dự kiến tiêm")
            template(v-if="vnvcGroups")
              el-option-group(
                v-for="g, gk in vnvcGroups"
                :key="gk"
                :label="g.name")
                el-option(
                  v-for="i, k in g.items"
                  :key="k"
                  :value="i.id"
                  :label="i.name") {{ i.name }}  
        el-button.sign-consultation-submit(@click="onSubmitSignupConsultation" type="primary" size="large")
          b Tư vấn ngay!
</template>

<script>
import Base from './Base'
import * as $v from '../services/validators'
import * as $n from '../services/normalizers'

export default {
  extends: Base,
  data () {
    return {
      key: 'SignConsultation6m',
      provinces: null,
      vnvcs: null,
      rules: {
        full_name: [$v.required, ...$v.fullName],
        phone: [$v.required, ...$v.phone],
        content: [$v.required],
        center: [$v.required]
      },
    }
  },
  computed: {
    vnvcGroups () {
      if (!this.provinces || !this.vnvcs) return null
      return this.vnvcs
        .map(i => {
          const province = this.provinces.find(p => p.id == i.provinceId)
          return {
            ...i,
            province: province.name,
            region: province.region
          }
        })
        .reduce((res, i) => {
          if (res[i.region]) res[i.region].items.push(i)
          return res
        }, {
          north: { name: 'Miền Bắc', items: [] },
          central: { name: 'Miền Trung', items: [] },
          south: { name: 'Miền Nam', items: [] }
        })
    }
  },
  methods: {
    normalize (val) {
      return {
        ...val,
        full_name: $n.fullName(val.full_name)
      }
    },
    fetch () {
      this.loading = true
      return Promise
        .all([
          this.$apis.master
            .getProvincesList()
            .then(res => {
              this.provinces = res
            }),
          this.$apis.master
            .getVnvcsList()
            .then(res => {
              this.vnvcs = res
            })
        ])
        .finally(() => {
          this.loading = false
        })
    },
    reset () {
      this.finished = false
      this.loading = false
      this.submitting = false
      this.form = {
        phone: null,
        full_name: null,
        content: null,
        center: null
      }
      this.fetch()
    },
    onSubmitSignupConsultation() {
      this.submit();
    },
  }
}
</script>

<style lang="scss" scoped>
.signup-consultation-6m {
  background-color: #2a3990;
  padding: 20px;
  color: #FFF;
  border-radius: 20px;
  .sign-consultation-submit {
    width: 100%;
    background-color: #f89f47;
    border: 0px;
    border-radius: 20px;
  }
  .el-input__inner {
    background-color: #FFF !important;
  }
}
</style>

<style lang="scss">
.signup-consultation-6m {
  .el-input__inner {
    border-radius: 20px;
    color: #2a3990;
    ::placeholder {
      color: #2a3990;
    }
  }
  .el-input__inner::placeholder {
    text-transform: none !important;
  }
  .el-form-item__error {
    border-color: red;
    color: #FFF;
  }
  .el-input__inner:focus {
    border-color: #f89f47;
  }
  .el-button-back {
    background-color: #FFFFFF;
    color: #2a3990;
    font-weight: bold;
  }
}
</style>
