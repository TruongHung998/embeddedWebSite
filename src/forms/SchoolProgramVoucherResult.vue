<template lang="pug">
  .ep-wrapper.school-program-voucher-result
    .ep-loading(v-if="loading") Đang tải. Vui lòng đợi...
    .ep-thankyou(v-else-if="finished")
      h2.ep-thankyou__title(style="text-align: center;") GỬI THÔNG TIN THÀNH CÔNG
      .ep-thankyou__body.ep-summary
        section.ep-section.ep-piece
          span
      .ep-thankyou__actions
        div
          a.el-button.el-button--primary.el-button-back(@click="reset") {{'QUAY LẠI'}}

    el-form.ep-form(
      v-else
      v-loading="submitting"
      ref="form"
      :model="form"
      label-position="top"
      :rules="rules")

      section.ep-section
        .ep-section__title(style="font-size: 20px; text-align: center;")
          span CHƯƠNG TRÌNH TRƯỜNG HỌC VÀ PHÒNG KHÁM
          br
          span KẾT QUẢ SỬ DỤNG VOUCHER GIẤY
        .ep-section__body
      section.ep-section
        .ep-section__body
          section.ep-section
            .ep-section__title Trung tâm VNVC phát hành
            .ep-section__body
              el-form-item(prop="center")
                el-select(v-model="form.center" @change="onChooseCenter()" placeholder="Chọn trung tâm VNVC phát hành" clearable)
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
          section.ep-section
            .ep-section__title Đối tượng
            .ep-section__body
              el-form-item(label="" prop="object")
                el-radio-group.ep-full(v-model="form.object" @change="onChooseObject()")
                  el-radio-button(:label="'SCHOOL'" :value="'SCHOOL'") Trường học
                  el-radio-button(:label="'CLINIC'" :value="'CLINIC'") Phòng khám
          section.ep-section(v-if="form.object !== null")
            .ep-section__title {{ `${form.object === 'SCHOOL' ? 'Tên trường học' : 'Tên phòng khám'}` }}
            i(v-if="!form.center")  Vui lòng chọn trung tâm phát hành
            .ep-section__body
              el-form-item(prop="school_name")
                el-select(v-model="form.school_name" :disabled="!form.center" @change="onChooseSchool()" filterable allow-create :placeholder="`${form.object === 'SCHOOL' ? 'Chọn tên trường học' : 'Chọn tên phòng khám'}`" clearable)
                  template(v-if="schools")
                    el-option(
                      v-for="i, k in getLocationByType(schools)"
                      :key="k"
                      :value="i.school"
                      :label="i.school") {{ i.school }}
              el-form-item(v-if="form.school_name === 'Tạo trường/phòng khám mới'" :label="` Nếu không có tên ${form.object === 'SCHOOL' ? 'trường học' : 'phòng khám'} trong danh sách vui lòng nhập mới`" prop="new_school_name")
                el-input.text-input(:placeholder="`Nhập tên ${form.object === 'SCHOOL' ? 'trường học' : 'phòng khám'}`" v-model="form.new_school_name" clearable)
          section.ep-section(v-if="form.object === 'SCHOOL' && false")
            .ep-section__title Người sử dụng
            .ep-section__body
              el-form-item(label="" prop="object_school")
                el-radio-group.ep-full(v-model="form.object_school")
                  el-radio-button(:label="'MY_SELF'" :value="'MY_SELF'") Học sinh của trường
                  el-radio-button(:label="'FOR_GILF'" :value="'FOR_GILF'") Được người khác tặng lại
          section.ep-section
            .ep-section__title Loại khách hàng
            .ep-section__body
              el-form-item(label="" prop="customer_type")
                el-radio-group.ep-full(v-model="form.customer_type")
                  el-radio-button(:label="'NEW'" :value="'NEW'") Khách hàng mới
                  el-radio-button(:label="'OLD'" :value="'OLD'") Khách hàng cũ
          section.ep-section
            .ep-section__title Mã khách hàng VNVC
            .ep-section__body
              el-form-item(label="" prop="pid")
                el-input.text-input(placeholder="Nhập mã khách hàng VNVC" v-model="form.pid" clearable)
          section.ep-section
            .ep-section__title Số serie voucher
            .ep-section__body
              el-form-item(label="" prop="serie")
                el-input.text-input(placeholder="Nhập số serie voucher" v-model="form.serie" clearable)
          section.ep-section
            .ep-section__title Ngày sử dụng
            .ep-section__body
              el-form-item(prop="date")
                el-date-picker(
                  clearable
                  :picker-options="useDateOptions"
                  v-model="form.date")
          section.ep-section
            .ep-section__title Nơi sử dụng
            .ep-section__body
              el-form-item(prop="center_use")
                el-select(v-model="form.center_use" placeholder="Chọn trung tâm VNVC đã sử dụng" clearable)
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
          el-button(@click="onSubmit" type="primary" size="large")
            b GỬI
</template>

<script>
import Base from './Base'
import * as $v from '../services/validators'
import moment from "moment/moment"
import {MessageBox} from "element-ui"
import _ from 'lodash'

export default {
  extends: Base,
  data() {
    return {
      key: 'SchoolProgramVoucherResult',
      provinces: null,
      vnvcs: null,
      rules: {
        center: [$v.required],
        object: [$v.required],
        pid: [$v.required, ...$v.number],
        date: [$v.required],
        object_school: [$v.required],
        center_use: [$v.required],
        school_name: [$v.required],
        new_school_name: [$v.required],
        customer_type: [$v.required],
      },
      schools: []
    }
  },
  computed: {
    useDateOptions () {
      return {
        disabledDate: d => d.valueOf() > Date.now()
      }
    },
    vnvcGroups() {
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
            north: {name: 'Miền Bắc', items: []},
            central: {name: 'Miền Trung', items: []},
            south: {name: 'Miền Nam', items: []}
          })
    }
  },
  methods: {
    getLocationByType(schools) {
      const {object} = this.form
      const _schools = [
        {
          school: 'Tạo trường/phòng khám mới'
        }
      ]
      return _schools.concat(schools
          .filter(i => i.type === object))
    },
    onChooseObject() {
      this.form = {
        ...this.form,
        object_school: null,
        school_name: null,
        new_school_name: null
      }
    },
    onChooseCenter() {
      const {center} = this.form
      this.loading = true
      this.form = {
        ...this.form,
        object: null,
        object_school: null,
        school_name: null,
        new_school_name: null
      }
      const vnvc = this.vnvcs.find(p => p.id == center)
      if (vnvc && vnvc.name) {
        this.$apis.forms
            .getSchoolByCenter({name: vnvc.name})
            .then((res) => {
              if (res && res.data) {
                this.schools = _.cloneDeep(res.data)
              }
            })
            .finally(() => {
              this.loading = false
            })
      } else {
        this.loading = false
      }
    },
    onChooseSchool() {
      const {school_name} = this.form
      if (school_name !== 'Tạo trường/phòng khám mới') {
        this.form = {
          ...this.form,
          new_school_name: null
        }
      }
    },
    fetch() {
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
    reset() {
      this.finished = false
      this.loading = false
      this.submitting = false
      this.form = {
        ...this.form,
        center: null,
        object: null,
        serie: null,
        pid: null,
        date: moment(),
        profile: null,
        object_school: null,
        school_name: null,
        new_school_name: null,
        customer_type: null
      }
      this.schools = []
      this.fetch()
    },
    showWarningMessage(title, message) {
      MessageBox({
        title: title,
        message: message,
        showCancelButton: false,
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        callback: () => {
        }
      })
    },
    onSubmit() {
      let form = this.$refs.form
      if (!form) return
      form?.validate(ok => {
        if (!ok) {
          for (const i in form?.fields) {
            const field = form?.fields[i]
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
        this.findAndShowInfo()
      })
    },
    addNewSchoolClinic() {
      const {center, new_school_name, object, school_name} = this.form
      if (school_name !== 'Tạo trường/phòng khám mới') {
        return
      }
      const vnvc = this.vnvcs.find(p => p.id == center)
      this.$apis.forms
        .addSchoolByCenter({
          data_id: 'VNVC_SCHOOL',
          type: object,
          school: new_school_name,
          center: vnvc?.name
        })
        .then((res) => {
          console.log('res', res)
        }).finally(() => {
        })
    },
    findAndShowInfo() {
      const {pid, date} = this.form
      this.$apis.forms
      .checkPid({pid: pid})
      .then((res) => {
        this.loading = false
        console.log('res', res)
        if (res && res.data && res.data.data && res.data.data.ThongTinBenhNhan && res.data.data.ThongTinBenhNhan.length > 0) {
          const profile = res.data.data.ThongTinBenhNhan[0]
          this.form = {
            ...this.form,
            profile: profile
          }
          MessageBox({
            title: 'Xác nhận thông tin',
            message: `
            Bạn vui lòng kiểm tra thông tin cá nhân trước khi gửi<br><br>
            <p>
              Họ và tên:
              <b style="font-size: 17px;">${profile.FullName}</b>
            </p>
            <p>
              Giới tính:
              <b style="font-size: 17px;">${profile.GenderText ? profile.GenderText : ''}</b>
            </p>
            <p>
              Ngày sinh:
              <b style="font-size: 17px;">${profile.DoB ? moment(profile.DoB).format('DD/MM/YYYY') : ''}</b>
            </p>
          `,
            showCancelButton: true,
            showConfirmButton: true,
            dangerouslyUseHTMLString: true,
            callback: (action) => {
              if (action === 'confirm') {
                this.$apis.forms
                    .checkBookingExist({
                      form_id: 'SchoolProgramVoucherResult',
                      pid: pid
                    })
                    .then((res) => {
                      if (res?.data && res?.data?.data && res?.data?.data?.length > 0) {
                        const dateOrders = _.orderBy(res?.data?.data, ['date'], ['desc'])
                        const _date = dateOrders[0].date
                        if (moment(_date).add(30, 'days').isBefore(moment(date))) {
                          this.addNewSchoolClinic()
                          this.submit()
                        } else {
                          const messageWarning = `PID này đã sử dụng Voucher giấy vào ngày ${moment(_date).format('DD/MM/YYYY')}. Khách hàng không được phép sử dụng quá 1 lần/1 tháng trong thời gian chương trình`
                          this.showWarningMessage('PID đã sử dụng Voucher giấy', messageWarning)
                          return
                        }
                      } else {
                        this.addNewSchoolClinic()
                        this.submit()
                      }
                      this.loading = false
                    }).catch(() => {
                  this.loading = false
                })
              }
            }
          })
        } else {
          this.showWarningMessage('Không tìm thấy PID', 'Mã PID bạn nhập không hợp lệ. Vui lòng kiểm tra lại.')
        }
      })
      .catch(() => {
        this.showWarningMessage('Không tìm thấy PID', 'Mã PID bạn nhập không hợp lệ. Vui lòng kiểm tra lại.')
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.school-program-voucher-result {
  padding-top: 1em;
}
</style>

<style lang="scss">
.school-program-voucher-result {
  .el-input__inner::placeholder {
    text-transform: none !important;
  }
}
</style>
