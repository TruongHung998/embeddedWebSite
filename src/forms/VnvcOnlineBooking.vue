<template lang="pug">
.ep-wrapper.scheduler
  .ep-loading(v-if="loading") Đang tải. Vui lòng đợi...

  .ep-thankyou(v-else-if="finished")
    h2.ep-thankyou__title ĐĂNG KÝ THÀNH CÔNG!
    .ep-thankyou__body
      p Quý khách đã đăng ký thông tin tiêm chủng thành công.
        br
        | Việc đăng ký thông tin đầy đủ sẽ giúp Quý khách tiết kiệm thời gian khi làm thủ tục tại quầy lễ tân. Kính mời Quý khách đến Trung tâm VNVC để được phục vụ và xin vui lòng cân nhắc tiêm vào buổi chiều để có không gian thoáng đãng hơn, không phải chờ đợi. Rất mong được đón tiếp Quý khách.
        br
        | Trân trọng.
      dl
        dt Hệ thống Trung tâm Tiêm chủng VNVC
        dd
          a(href="tel:02873006595") Hotline 028 7300 6595

    .ep-thankyou__actions
      el-button(type="primary" @click="reset") ĐĂNG KÝ MỚI
      a.el-button(:href="home") Trở về Trang chủ

  el-form.ep-form(
    v-else
    v-loading="submitting"
    ref="form"
    :model="form"
    label-position="top"
    :rules="rules")
    section.ep-branding
      .ep-branding__logo
        img(:src="logo")
      .ep-branding__header
        h2.ep-branding__title Đăng ký tiêm chủng

    p Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi đến làm thủ tục tại quầy Lễ tân cho Quý Khách hàng, việc đăng ký thông tin tiêm chủng chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.

    section.ep-section
      .ep-section__title Thông tin người tiêm
      .ep-section__body
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Họ tên người tiêm" prop="full_name")
              el-input.ep-uppercase(
                v-model="form.full_name"
                @change="copyToRegister")
          el-col(:sm="12")
            el-form-item(label="Ngày sinh người tiêm" prop="birthday")
              el-date-picker(
                v-model="form.birthday"
                :picker-options="birthdayOptions"
                @change="copyToRegister")
              //- .age {{ form.birthday | age }}

        el-row(:gutter="20")
          el-col(:sm="8" v-if="phoneNeeded")
            el-form-item(label="Số điện thoại người tiêm" prop="phone")
              el-input(
                v-model="form.phone"
                @change="copyToRegister")
          el-col(:sm="phoneNeeded ? 8 : 12")
            el-form-item(label="Giới tính" prop="gender")
              el-radio-group.ep-full(v-model="form.gender")
                el-radio-button(:label="1") Nam
                el-radio-button(:label="0") Nữ
          el-col(:sm="phoneNeeded ? 8 : 12")
            el-form-item(label="Mã khách hàng VNVC (nếu có)" prop="pid")
              el-input(v-model="form.pid")

        //- el-row(:gutter="20")
          el-col(:sm="8")
            el-form-item(label="CMND/Passport" prop="id_number")
              el-input(v-model="form.id_number")
          el-col(:sm="8")
            el-form-item(label="Ngày cấp" prop="id_issue_date")
              el-date-picker(v-model="form.id_issue_date")
          el-col(:sm="8")
            el-form-item(label="Nơi cấp" prop="id_issue_place")
              el-input(v-model="form.id_issue_place")

        el-row(:gutter="20")
          el-col(:sm="8")
            el-form-item(label="Tỉnh thành" prop="address_province")
              el-select(v-model="form.address_province" :loading="provinces === null")
                template(v-if="provinces")
                  el-option(
                    v-for="i, k in provinces"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
          el-col(:sm="8")
            el-form-item(label="Quận huyện" prop="address_district")
              el-select(
                v-model="form.address_district"
                :disabled="!form.address_province"
                :placeholder="form.address_province ? 'Chọn' : 'Chọn tỉnh thành trước'")
                template(v-if="districts")
                  el-option(
                    v-for="i, k in districts"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
          el-col(:sm="8")
            el-form-item(label="Phường xã" prop="address_ward")
              el-select(
                v-model="form.address_ward"
                :disabled="!form.address_district"
                :placeholder="form.address_district ? 'Chọn' : 'Chọn quận huyện trước'")
                template(v-if="wards")
                  el-option(
                    v-for="i, k in wards"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}

        el-form-item(label="Số nhà, tên đường" prop="address_street")
          el-input.ep-uppercase(v-model="form.address_street")

    section.ep-section
      .ep-section__title Thông tin liên hệ
      .ep-section__body
        el-form-item(label="Họ tên người liên hệ" prop="register_full_name")
          el-input.ep-uppercase(
            v-model="form.register_full_name"
            @change="registerChanged = true")

        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Mối quan hệ với người tiêm" prop="register_relationship")
              el-select(
                v-model="form.register_relationship"
                @change="registerChanged = true")
                el-option(
                  v-for="i, k in register_relationships"
                  :key="k"
                  :value="i"
                  :label="i") {{ i }}
          el-col(:sm="12")
            el-form-item(label="Số điện thoại người liên hệ" prop="register_phone")
              el-input(
                v-model="form.register_phone"
                @change="registerChanged = true")

    section.ep-section
      .ep-section__title Thông tin dịch vụ
      .ep-section__body
        el-form-item(label="Loại vắc xin muốn đăng ký" prop="service_type")
          el-radio-group(v-model="form.service_type")
            el-radio-button(label="package") Vắc xin gói
            el-radio-button(label="retail") Vắc xin lẻ

        el-form-item.vaccine(
          v-if="selectableVaccines.length"
          label="Chọn vắc xin"
          prop="service_vaccines")
          el-checkbox-group.vaccine__grid(v-model="form.service_vaccines")
            .vaccine-group(
              v-for="g, gk in selectableVaccineCategories"
              :class="{ 'vaccine-group--expanded': !!expandedVaccineCategories[g.id] }"
              :key="gk"
              v-if="g.items.length")
              .vaccine-group__title(@click="$set(expandedVaccineCategories, g.id, !expandedVaccineCategories[g.id])")
                img(src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB3aWR0aD0iMTc5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTE3MSA5NjBxMCAxMy0xMCAyM2wtNDY2IDQ2NnEtMTAgMTAtMjMgMTB0LTIzLTEwbC01MC01MHEtMTAtMTAtMTAtMjN0MTAtMjNsMzkzLTM5My0zOTMtMzkzcS0xMC0xMC0xMC0yM3QxMC0yM2w1MC01MHExMC0xMCAyMy0xMHQyMyAxMGw0NjYgNDY2cTEwIDEwIDEwIDIzeiIvPjwvc3ZnPg==" width="16px")
                span {{ g.name }}
              .vaccine-group__items(v-if="expandedVaccineCategories[g.id]")
                el-checkbox(
                  v-for="i, k in g.items"
                  :key="k"
                  :value="i.id"
                  :label="i.id"
                  border)
                  .vaccine__metas
                    .vaccine__name {{ i.name }}
                    .vaccine__price {{ i.price | vnd }}
                  .vaccine__description {{ i.prevention }}

        el-form-item(label="Trung tâm VNVC mong muốn tiêm" prop="service_center")
          el-select(v-model="form.service_center")
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

        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Ngày mong muốn tiêm" prop="service_interested_date")
              el-date-picker(
                v-model="form.service_interested_date"
                :picker-options="serviceInterestedDateOptions")
          el-col(:sm="12", v-if="false")
            el-form-item(
              label="Thời gian mong muốn tiêm"
              prop="service_interested_time")
              single-choice.ep-grid(
                :value.sync="form.service_interested_time"
                :options="service_interested_times")
                template(v-slot:label="{ item }") Từ {{ item[0] }}h00 - {{ item[1] }}h00

    el-button(@click="submit" type="primary" size="large") Hoàn thành đăng ký

</template>

<script>
import moment from 'moment'
import logo from '../assets/logo.vnvc.svg'
import * as $v from '../services/validators'
import * as $n from '../services/normalizers'
import { VACCINE_CATEGORIES } from '../services/constants'
import Base from './Base'

export default {
  extends: Base,

  data () {
    return {
      key: 'Scheduler',
      logo,
      vnvcs: null,
      vaccines: null,
      provinces: null,
      districts: null,
      wards: null,
      registerChanged: false,
      expandedVaccineCategories: {},
      rules: {
        full_name: [$v.required, ...$v.fullName],
        birthday: $v.required,
        gender: $v.required,
        pid: $v.pid,
        phone: [$v.required, ...$v.phone],
        address_province: $v.required,
        address_district: $v.required,
        address_ward: $v.required,
        address_street: [$v.required, ...$v.street],
        register_full_name: [$v.required, ...$v.fullName],
        register_relationship: $v.required,
        register_phone: [$v.required, ...$v.phone],
        service_type: $v.required,
        service_vaccines: [
          $v.required,
          { type: 'array', min: 1, message: 'Chọn ít nhất 1 loại vắc xin' }
        ],
        service_center: $v.required,
        service_interested_date: $v.required,
        service_interested_time: $v.required
      },
      register_relationships: [
        'Bản thân', 'Con', 'Cha', 'Mẹ', 'Vợ', 'Chồng',
        'Anh', 'Chị', 'Em', 'Ông', 'Bà',
        'Họ hàng', 'Khác'
      ],
      service_interested_times: [
        [7, 8],
        [8, 11],
        [11, 13],
        [13, 15],
        [15, 17]
      ]
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
    },

    selectableVaccines () {
      if (!this.vaccines) return []
      const vaccines = this.vaccines
        .filter(i => i.sellType === this.form.service_type)
      return vaccines
    },

    selectableVaccineCategories () {
      return VACCINE_CATEGORIES.reduce((res, cat) => {
        if (!cat.children) {
          res.push({
            id: cat.value,
            name: cat.label,
            items: this.selectableVaccines
              .filter(i => i.types && i.types[0] && i.types[0].includes(cat.value))
          })
          return res
        }
        cat.children.forEach(sub => {
          res.push({
            id: sub.value,
            name: `${cat.label} / ${sub.label}`,
            items: this.selectableVaccines
              .filter(i => i.types && i.types[0] && i.types[0].includes(sub.value))
          })
        })
        return res
      }, [])
    },

    years () {
      const birthday = this.form.birthday
      if (!birthday) return null
      return moment
        .duration(moment().diff(birthday))
        .as('year')
    },

    phoneNeeded () {
      return this.years >= 18
    },

    birthdayOptions () {
      return {
        disabledDate: d => d.valueOf() > Date.now()
      }
    },

    serviceInterestedDateOptions () {
      return {
        disabledDate: d => {
          if (d.valueOf() < Date.now()) return true
          return d.valueOf() - Date.now() > moment.duration(60, 'day')
        }
      }
    }
  },

  watch: {
    'form.address_province': {
      handler (provinceId) {
        this.districts = null
        this.$set(this.form, 'address_district', null)
        this.$apis.master
          .getDistrictsList({ provinceId })
          .then(res => {
            this.districts = res
          })
      }
    },
    'form.address_district': {
      handler (districtId) {
        this.wards = null
        this.$set(this.form, 'address_ward', null)
        this.$apis.master
          .getWardsList({ districtId })
          .then(res => {
            this.wards = res
          })
      }
    },
    'form.service_type': {
      handler () {
        this.expandedVaccineCategories = {}
        this.form = {
          ...this.form,
          service_vaccines: []
        }
      }
    },

    phoneNeeded (val) {
      if (!val) this.form = {
        ...this.form,
        phone: undefined
      }
    },

    years (val) {
      if (this.registerChanged || val >= 18) return
      this.form = {
        ...this.form,
        register_full_name: undefined,
        register_relationship: undefined,
        register_phone: undefined
      }
    }
  },

  methods: {
    normalize (val) {
      // const vaccines = this.selectableVaccines.map(i => i.id)
      return {
        ...val,
        full_name: $n.fullName(val.full_name),
        register_full_name: $n.fullName(val.register_full_name),
        address_street: $n.street(val.address_street)
        // service_vaccines: val.service_vaccines
        //   .filter(id => vaccines.includes(id))
      }
    },
  
    reset () {
      this.finished = false
      this.loading = false
      this.submitting = false
      this.vnvcs = null
      this.vaccines = null
      this.provinces = null
      this.districts = null
      this.wards = null
      this.registerChanged = false
      this.expandedVaccineCategories = {}
      this.form = {
        service_vaccines: []
      }
      this.fetch()
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
            }),
          this.$apis.master
            .getVaccinesList()
            .then(res => {
              this.vaccines = res
            })
        ])
        .finally(() => {
          this.loading = false
        })
    },

    copyToRegister () {
      if (this.registerChanged || this.years < 18) return
      this.form = {
        ...this.form,
        register_full_name: this.form.full_name,
        register_relationship: this.register_relationships[0],
        register_phone: this.form.phone
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vaccine {
  &-group {
    font-size: 15px;
    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
      padding-bottom: .5em;
      margin-bottom: .5em;
    }
    &--expanded {
      .vaccine-group__title {
        img {
          transform: rotate(90deg);
        }
      }
    }
    &__title {
      font-size: 15px;
      font-weight: bold;
      line-height: 1.5em;
      cursor: pointer;
      img {
        width: 16px;
        display: inline-block;
        margin-right: .25em;
      }
    }
    &__items {
      font-size: 15px;
      margin: .75em 0 1em;
      display: grid;
      grid-gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      // grid-template-columns: 1fr;
      > * {
        display: flex;
        margin: 0 !important;
      }
    }
  }
  &__metas {
    display: flex;
  }
  &__name {
    flex: 1;
    color: black;
    line-height: 1.4em;
  }
  &__description {
    margin-top: .5em;
    color: #888;
    font-size: 13px;
  }
  &__price {
    color: #1F28AF;
    margin-left: .5em;
    text-align: right;
  }
  /deep/ {
    .el-checkbox {
      &__input {
        vertical-align: top;
      }
    }
  }
}
</style>
