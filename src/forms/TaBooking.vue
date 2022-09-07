<template lang="pug">
.ta-booking
  el-form(v-loading="loading || submitting || filling").ta-frame
    .ta-frame__header
      .ta-frame__header-title Đăng ký khám bệnh

    .ta-frame__content
      p.ta-frame__greeting(v-if="inDoctorMode && doctor && speciality && center") Đăng ký khám với&nbsp;
        strong {{ doctor.name }}
        | ,&nbsp;
        strong {{ speciality.name }}
        | &nbsp;tại&nbsp;
        strong {{ center.name }}
        | &nbsp;
        em ({{ center.address }})

      el-form(
        ref="form"
        :show-message="false"
        :rules="rules"
        :model="form"
        :disabled="filling"
        label-position="top")

        template(v-if="step === STEP_APPOINTMENT")
          el-form-item(
            v-if="!inDoctorMode"
            label="Chọn địa điểm khám"
            prop="vendor")
            el-radio(
              v-for="i, k in centers"
              :key="k"
              v-model="form.center"
              :label="i.id") {{ i.name }}

          el-form-item(
            label="Chọn loại dịch vụ khám"
            prop="service_type")
            el-radio(
              v-for="i, k in services"
              :key="k"
              v-model="form.service"
              :label="i.id") {{ i.name }}

          .ta-frame__blocker(
            :class="{'ta-frame__blocker--blocked': !form.service || !form.center}")
            .ta-frame__blocker-help Vui lòng chọn địa điểm khám & dịch vụ khám trước
            .ta-frame__blocker-content

              el-row(:gutter="12" v-if="!inDoctorMode")
                el-col(
                  :xs="form.service === SERVICE_NGOAI_GIO && form.center !== 'ha-noi' ? 24 : 12"
                  :sm="form.service === SERVICE_NGOAI_GIO && form.center !== 'ha-noi' ? 24 : 12")
                  el-form-item(prop="speciality")
                    gia-select(
                      v-model="form.speciality"
                      :options="form.center === 'ha-noi' && form.service !== SERVICE_ONLINE ? specialistHN : specialities"
                      placeholder="Chọn chuyên khoa")

                el-col(
                  :xs="12"
                  :sm="12"
                  v-if="form.center === 'ha-noi' || form.service !== SERVICE_NGOAI_GIO")
                  el-form-item(prop="doctor")
                    gia-select(
                      v-model="form.doctor"
                      :options="form.center === 'ha-noi' && form.service !== SERVICE_ONLINE ? doctorsHN : doctors"
                      placeholder="Chọn bác sĩ")

              el-form-item(prop="service_date_time")
                gia-scheduler(
                  placeholder="Chọn ngày giờ khám"
                  :date.sync="form.service_date"
                  :time.sync="form.service_time"
                  :get-slots="getDoctorSlots"
                  :center="form.center"
                  :disabled="disableBooking")

              el-form-item(
                prop="tool"
                v-if="form.service === SERVICE_ONLINE")
                gia-select(
                  placeholder="Chọn công cụ khám"
                  v-model="form.tool"
                  :options="tools")

          el-form-item(label="Vấn đề sức khỏe cần khám" prop="note")
            el-input(
              v-model="form.note"
              rows="4"
              type="textarea"
              placeholder="Nhập tình trạng sức khoẻ của bạn, câu hỏi dành cho bác sĩ và các vấn đề sức khỏe cần khám")

          el-button.expanded(
            type="primary"
            @click="goToUserStep" :disabled="disableBooking") NHẬP THÔNG TIN NGƯỜI CẦN KHÁM →

        template(v-else-if="step === STEP_USER")
          a(href="#" @click.prevent="backToAppointmentStep") ← Chọn lại ngày giờ hẹn khám
          p Điền đầy đủ thông tin người khám để tiết kiệm thời gian khi tới khám.

          el-row(:gutter="12")
            el-col(:xs="12" :sm="12")
              el-form-item(label="Số di động" prop="phone")
                el-input(v-model="form.phone")


            el-col(:xs="12" :sm="12")
              el-form-item(label="Họ và tên" prop="name")
                el-input.uppercase(v-model="form.name")

          el-row(:gutter="12")
            el-col(:xs="12" :sm="12")
              el-form-item(label="Ngày sinh" prop="birthday")
                gia-date-input(v-model="form.birthday")

            el-col(:xs="12" :sm="12")
              el-form-item(label="Mã khách hàng (nếu có)" prop="pid")
                el-input(v-model="form.pid")

          template(v-if="!filled")
            el-button.expanded(
              type="ghost"
              @click="fill"
              :disabled="filling") KIỂM TRA THÔNG TIN →

          template(v-else)
            el-row(:gutter="12")
              el-col(:xs="12" :sm="12")
                el-form-item(label="Giới tính" prop="sex")
                  gia-select(
                    v-model="form.sex"
                    :options="genders"
                    placeholder="Chọn giới tính")

              el-col(:xs="12" :sm="12")
                el-form-item(label="Quốc tịch" prop="nationality")
                  gia-select(
                    v-model="form.nationality"
                    :options="nationalities"
                    placeholder="Chọn quốc tịch")

            el-row(:gutter="12")
              el-col(:xs="8" :sm="8")
                el-form-item(label="Tỉnh thành" prop="address_province")
                  gia-select(
                    :disabled="provinces.length === 0"
                    v-model="form.address_province"
                    :options="provinces"
                    @change="clearDistrict")

              el-col(:xs="8" :sm="8")
                el-form-item(label="Quận huyện" prop="address_district")
                  gia-select(
                    :disabled="districts.length === 0"
                    v-model="form.address_district"
                    :options="districts"
                    @change="clearWard")

              el-col(:xs="8" :sm="8")
                el-form-item(label="Phường xã" prop="address_ward")
                  gia-select(
                    :disabled="wards.length === 0"
                    v-model="form.address_ward"
                    :options="wards")

            el-form-item(label="Số nhà, tên đường" prop="address_street")
              el-input.uppercase(
                v-model="form.address_street"
                placeholder="SỐ NHÀ, TÊN ĐƯỜNG")

            el-form-item(prop="term" v-if="form.service === SERVICE_ONLINE")
              el-checkbox(v-model="form.term") Tôi đã đọc và đồng ý với&nbsp;
                a(href="https://tamanhhospital.vn/dieu-kien-dieu-khoan-su-dung-dich-vu-pko/" target="_blank") Điều khoản &amp; điều kiện sử dụng dịch vụ "Phòng khám online"

            el-button.expanded(
              type="primary"
              :disabled="submitting"
              @click="submit") HOÀN THÀNH ĐĂNG KÝ KHÁM BỆNH →

  el-dialog.ta-dialog(
    v-if="finished"
    visible
    title="Đăng ký thành công"
    :close-on-click-modal="false"
    @close="reset")
    p Kính gửi Quý khách
    p Cảm ơn Quý khách đã gửi yêu cầu đặt lịch hẹn khám tại Hệ thống Bệnh viện Đa khoa Tâm Anh.
    p Chúng tôi đã nhận được yêu cầu từ Quý khách và sẽ liên hệ với Quý khách theo số điện thoại&nbsp;
      strong {{ form.phone }}
      | để xác nhận lịch hẹn trong ngày.

    table
      tbody
        tr
          td
            i.bx.bx-user
          td
            strong.full-name {{ form.name }}
        tr
          td
            i.bx.bx-cog
          td
            .spans
              span(v-if="form.pid")
                | PID:&nbsp;
                strong.pid {{ form.pid }}
              strong.gender {{ sex }}
              strong.birthday {{ form.birthday | date }}
        tr
          td
            i.bx.bx-phone
          td
            strong.phone {{ form.phone }}
        tr
          td
            i.bx.bx-map
          td
            strong.address {{ address }}
        tr
          td
            i.bx.bx-calendar
          td
            template(v-if="service && center")
              strong.service {{ service.name }}
              span &nbsp;tại&nbsp;
              strong.center {{ center.name }}
            template(v-if="speciality")
              br
              strong.speciality {{ speciality.name }}
            template(v-if="doctor")
              br
              strong.doctor {{ doctor.name }}
            br
            .spans
              strong.service-time(v-if="form.service_time") {{ form.service_time }}
              strong.service-date {{ form.service_date | date }}
        tr(v-if="tool")
          td
            i.bx.bx-clipboard
          td
            strong.service-tool {{ tool }}
        tr
          td
            i.bx.bx-message
          td
            strong.message {{ form.note }}

    p Cảm ơn Quý khách đã tin tưởng chọn Hệ thống Bệnh viện Đa khoa Tâm Anh là nơi cung cấp dịch vụ chăm sóc sức khỏe của mình!
    p Trân trọng.
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { Dialog } from 'element-ui'
import _ from 'lodash'
import * as $v from '../services/validators'
import * as $n from '../services/normalizers'
import Base from './Base'
import GiaSelect from '../components/GiaSelect'
import GiaDateInput from '../components/GiaDateInput'
import GiaScheduler from '../components/GiaScheduler'
import { MessageBox } from 'element-ui'

Vue.use(Dialog)

export const STEP_APPOINTMENT = 'APPOINTMENT'
export const STEP_USER = 'USER'
export const SERVICE_TRONG_GIO = 'trong_gio'
export const SERVICE_NGOAI_GIO = 'ngoai_gio'
export const SERVICE_ONLINE = 'online'
export const CENTER_HCM = 'ho-chi-minh'
export const CENTER_HN = 'ha-noi'

export default {
  extends: Base,

  components: {
    GiaSelect,
    GiaDateInput,
    GiaScheduler
  },

  filters: {
    date (val) {
      return moment(val).format('DD/MM/YYYY')
    }
  },

  data () {
    const centers = [{
      id: CENTER_HN,
      name: 'BVĐK Tâm Anh Hà Nội',
      address: '108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, TP. Hà Nội'
    }, {
      id: CENTER_HCM,
      name: 'BVĐK Tâm Anh TP. HCM',
      address: '2B Phổ Quang, Phường 2, Q. Tân Bình, TP. HCM'
    }]
    const tools = [
      { id: 'zalo_video', name: 'Gọi Zalo video (Bằng số ĐT)' },
      { id: 'viber_video', name: 'Gọi Viber video (Bằng số ĐT)' },
      { id: 'zoom', name: 'Khám qua Zoom (Cần máy tính hoặc ĐT thông minh và internet)' },
      { id: 'meet', name: 'Khám qua Google Meet (Cần máy tính hoặc ĐT thông minh và internet)' }
    ]
    const genders = [
      { id: 'NAM', name: 'Nam' },
      { id: 'NỮ', name: 'Nữ' },
    ]
    return {
      key: 'TamAnhBooking',
      STEP_APPOINTMENT,
      STEP_USER,
      SERVICE_ONLINE,
      SERVICE_NGOAI_GIO,
      SERVICE_TRONG_GIO,

      centers,
      tools,
      genders,
      nationalities: [],
      slots: [],
      provinces: [],
      districts: [],
      wards: [],

      finished: false,
      loading: false,
      submitting: false,
      disableBooking: false,
      step: STEP_APPOINTMENT,
      filled: false,
      filling: false,
      form: {},
      specialistHN: [],
      doctorsHN: [],
      schedulesHN: [],
      oversHN: [],
      schedulesAllHN: [],
      specialistHCM: [],
      doctorsHcm: [],
      doctorsSlotHcm: [],
      trueListSpecialHN: []
    }
  },

  computed: {
    inDoctorMode () {
      const mode = this.binded && this.binded.layout
        ? this.binded.layout
        : null
      return mode === 'doctor'
    },

    rules () {
      return {
        speciality: { required: true, message: 'Vui lòng chọn chuyên khoa' },
        // doctor: { required: true, message: 'Vui lòng chọn bác sĩ' },
        service_date_time: {
          validator: (val, rule, cb) => {
            if (!this.form.service_date || !this.form.service_time)
              return cb(new Error('Vui lòng chọn đầy đủ cả ngày và giờ khám'))
            return cb()
          }
        },
        tool: { required: true, message: 'Vui lòng chọn công cụ khám' },
        note: { required: true, message: 'Vui lòng điền vấn đề sức khỏe cần khám' },
        phone: [
          { required: true, message: 'Vui lòng nhập số điện thoại' },
          ...$v.phone
        ],
        name: [
          { required: true, message: 'Vui lòng nhập họ và tên' },
          ...$v.fullName
        ],
        birthday: { required: true, message: 'Vui lòng nhập ngày sinh' },
        pid: $v.pid,
        sex: { required: true, message: 'Vui lòng chọn giới tính' },
        nationality: { required: true, message: 'Vui lòng chọn quốc tịch' },
        address_province: { required: true, message: 'Vui lòng chọn tỉnh thành' },
        address_district: { required: true, message: 'Vui lòng chọn quận huyện' },
        address_ward: { required: true, message: 'Vui lòng chọn phường xã' },
        address_street: { required: true, message: 'Vui lòng nhập số nhà, tên đường' },
        term: { required: true, message: 'Vui lòng xác nhận chấp nhận điều khoản' },
      }
    },

    services () {
      return [
        { id: SERVICE_TRONG_GIO, name: 'Khám trong giờ' },
        ...(this.inDoctorMode
          ? []
          : [{ id: SERVICE_NGOAI_GIO, name: 'Khám ngoài giờ' }]),
        { id: SERVICE_ONLINE, name: 'Khám online' }
      ]
    },

    service () {
      return this.services.find(i => i.id === this.form.service) || null
    },

    center () {
      return this.centers.find(i => i.id === this.form.center) || null
    },

    normalizedSlots () {
      const res = []
      this.slots.forEach(c => {
        const center = {
          id: c.slug,
          name: c.name,
          slug: c.slug,
          specialities: []
        };
        (c.catchuyenkhoa || []).forEach(s => {
          const speciality = {
            id: s.term_id,
            name: s.name,
            slug: s.slug,
            doctors: []
          };
          (s.listdoctor || []).forEach(d => {
            const doctor = {
              id: d.ID,
              name: d.post_title,
              slug: d.post_name,
              slots: this.getAllDoctorSlots(s, d)
            }
            speciality.doctors.push(doctor)
          })
          center.specialities.push(speciality)
        })
        res.push(center)
      })
      return res
    },

    specialities () {
      const center = this.normalizedSlots
        .find(i => i.id === this.form.center)
      if (!center) return []

      const filterer = i => {
        // remove speciality with no doctors
        if (!i.doctors.length) return false

        // keep all other specialities for out-of-service hours
        if (this.form.service === SERVICE_NGOAI_GIO) return true

        // keep specialities with active doctors
        const hasActiveDoctors = i.doctors
          .filter(d => {
            const slots = d.slots[this.form.service]
            return Object
              .values(slots)
              .filter(i => i.length > 0).length > 0
          }).length > 0
        if (!hasActiveDoctors) return false

        // return true after all
        return true
      }

      const filterTaHcm = (item) => {
        return {
          id: item.ID || '',
          name: item.TEN || ''
        }
      }

      switch (this.form.service) {
        case SERVICE_NGOAI_GIO:
          switch (this.form.center) {
            case CENTER_HCM:
              return center.specialities
                .filter(i => [
                  'khoa-noi-tong-hop',
                  'trung-tam-san-phu-khoa',
                  'khoa-nhi',
                  'noi-than-kinh',
                  'khoa-ngoai-tong-hop'
                ].includes(i.slug))
            case CENTER_HN:
              return center.specialities
                .filter(i => [
                  'khoa-nhi',
                  'khoa-tai-mui-hong',
                  'noi-than-kinh',
                  'khoa-ngoai-tong-hop'
                ].includes(i.slug))
            default:
              return []
          }

        case SERVICE_TRONG_GIO:
          return this
              .specialistHCM
              .map(filterTaHcm)

        case SERVICE_ONLINE:
          return center
            .specialities
            .filter(filterer)

        default:
          return []
      }
    },

    speciality () {
      const { center, service } = this.form
      const dataSource = center === 'ho-chi-minh' || (center === 'ha-noi' && service === SERVICE_ONLINE) ? this.specialities : this.specialistHN
      return dataSource
        .find(i => i.id === this.form.speciality) || null
    },

    doctors() {
      if (this.form.service === SERVICE_TRONG_GIO)
        return this.doctorsHcm.map((item) => {
          return {
            id: item?.employeeCode || '',
            name: item?.employeeName || ''
          }
        })
      return this.speciality
          ? this.speciality.doctors
              .filter(d => {
                const slots = d.slots[this.form.service]
                if (typeof slots === 'function') return true
                return Object
                    .values(slots)
                    .filter(i => i.length > 0).length > 0
              })
          : []
    },

    doctor () {
      const { center, service } = this.form
      const dataSource = center === 'ho-chi-minh' || (center === 'ha-noi' && service === SERVICE_ONLINE) ? this.doctors : this.doctorsHN
      return dataSource
        .find(i => i.id === this.form.doctor) || null
    },

    sex () {
      const found = this.genders.find(i => i.id === this.form.sex)
      return found ? found.name : null
    },

    tool () {
      if (this.form.service !== SERVICE_ONLINE) return null
      const found = this.tools.find(i => i.id === this.form.tool)
      return found ? found.name : null
    },

    address () {
      const res = [this.form.address_street]
      const ward = this.wards.find(i => i.id === this.form.address_ward)
      if (ward) res.push(ward.name)
      const district = this.districts.find(i => i.id === this.form.address_district)
      if (district) res.push(district.name)
      const province = this.provinces.find(i => i.id === this.form.address_province)
      if (province) res.push(province.name)
      return res.join(', ')
    }
  },

  watch: {
    'form.center': {
      async handler (val) {
        if (this.inDoctorMode) return
        if (val === 'ha-noi') {
          const scheduleBody = {
            startdate: moment().format('YYYYMMDD').toString(),
            enddate: moment().add(2, 'months').format('YYYYMMDD').toString(),
          }
          const res_api_A = await this.$apis.forms
              .getScheduleHN(scheduleBody)
          if (res_api_A && res_api_A.data && res_api_A.data.data) {
            this.schedulesAllHN = res_api_A.data.data
            const { service } = this.form
            if (service !== SERVICE_ONLINE) {
              this.specialistHN = this.getScheduleDoctorByType(this.schedulesAllHN, service === SERVICE_NGOAI_GIO)
            }
          }
        }
        this.$set(this.form, 'speciality', null)
      }
    },

    'form.service': {
      handler (val) {
        if (this.inDoctorMode) return
        const { center } = this.form
        if (center === 'ha-noi' && val !== SERVICE_ONLINE) {
          this.specialistHN = this.getScheduleDoctorByType(this.schedulesAllHN, val === SERVICE_NGOAI_GIO)
        }
        this.$set(this.form, 'speciality', null)
      }
    },

    'form.speciality': {
      handler (val) {
        if (this.inDoctorMode) return
        const {center} = this.form
        if (val && center === 'ha-noi') {
          for (const item of this.specialistHN) {
            if (item.id == val) {
              this.doctorsHN = item.doctors
              return
            }
          }
          // this.$apis.forms
          //     .getDoctorsHN()
          //     .then(res => {
          //       let doctors = []
          //       if (res && res.data && res.data.data) {
          //         res.data.data.forEach((item) => {
          //           if (item?.active__c == "1" && item?.specialist_Code__c == val) {
          //             doctors.push({
          //               id: item?.code__c,
          //               name: item?.name,
          //               slug: item?.external_Id__c
          //             })
          //           }
          //         });
          //       }
          //       this.doctorsHN = doctors
          //     })
        }
        if (val && center === CENTER_HCM && this.form.service === SERVICE_TRONG_GIO) {
          this.loading = true
          this.doctorsHcm = []
          this.$apis.tamanh
              .getDoctorsHcm(this.form.speciality)
              .then(res => {
                this.doctorsHcm = Array.from(new Set(res.map(a => a.employeeName)))
                    .map(employeeName => {
                      return res.find(a => a.employeeName === employeeName)
                    })
              }).finally(() => this.loading = false
          )
        }
        this.$set(this.form, 'doctor', null)
        this.$set(this.form, 'service_date', null)
        this.$set(this.form, 'service_time', null)
      }
    },

    'form.doctor': {
      handler(val) {
        const {center, speciality} = this.form
        if (val && speciality && center !== 'ha-noi') {
          if ((speciality === '16' && val === '1295') || (speciality === '15' && val === '0161') || (speciality === '25' && val === '0372')) {
            this.disableBooking = true
            const doctorName = this.doctors.find(item => {
              return item?.id === val
            })?.name
            MessageBox({
              title: 'Thông báo',
              message: `Cảm ơn Quý khách đã sử dụng dịch vụ của BVĐK Tâm Anh. Để đặt lịch với ${doctorName || ''} xin vui lòng liên hệ hotline <a href="tel:02871026789">0287.102.6789</a> từ 7:00 - 20:00 hàng ngày để được hỗ trợ đặt lịch. Trân trọng cảm ơn Quý khách`,
              dangerouslyUseHTMLString: true
            })
            return
          } else {
            this.disableBooking = false
          }
        } else {
          this.disableBooking = false
        }
        if (val && speciality && center === 'ha-noi') {
          const scheduleBody = {
            startdate: moment().format('YYYYMMDD').toString(),
            enddate: moment().add(2, 'months').format('YYYYMMDD').toString(),
            doctor_code__c: val.toString()
          }
          this.$apis.forms
              .getScheduleHN(scheduleBody)
              .then(res => {
                if (res && res.data && res.data.data) {
                  const schedules = []
                  const overs = []
                  res.data.data.forEach((item) => {
                    if (item?.mid > 0 || item?.mor || item?.aft) {
                      schedules.push(item)
                    }
                    if (item?.over > 0) {
                      overs.push(item?.day)
                    }
                  })
                  this.schedulesHN = schedules
                  this.oversHN = overs
                }
              })
        }
        if (val && speciality && center === CENTER_HCM && this.form.service === SERVICE_TRONG_GIO) {
          this.loading = true
          this.doctorsSlotHcm = []
          this.$apis.tamanh
              .getDoctorsSlotHcm(this.form.speciality, this.form.doctor)
              .then(res => {
                this.doctorsSlotHcm = res
              }).finally(() => this.loading = false
          )
        }
        this.$set(this.form, 'service_date', null)
        this.$set(this.form, 'service_time', null)
      }
    },

    'form.address_province': {
      handler (provinceId) {
        this.districts = []
        this.$apis.master
          .getDistrictsList({ provinceId })
          .then(res => {
            this.districts = res
          })
      }
    },

    'form.address_district': {
      handler (districtId) {
        this.wards = []
        this.$apis.master
          .getWardsList({ districtId })
          .then(res => {
            this.wards = res
          })
      }
    }
  },

  methods: {
    normalize (val) {
      return {
        ...val,
        name: $n.fullName(val.name),
        address_street: $n.street(val.address_street)
      }
    },

    reset () {
      this.finished = false
      this.loading = false
      this.submitting = false
      this.step = STEP_APPOINTMENT
      this.filling = false
      this.filled = false
      this.form = {
        // center: this.centers[0].id,
        service: this.inDoctorMode
          ? this.services[0].id
          : undefined,
        nationality: 'VN',
        ...(_.isObject(this.binded)
          ? this.binded
          : {}
        )
      }
      // sample hn
      // this.step = STEP_USER
      // this.form = {
      //   ...this.form,
      //   center: CENTER_HN,
      //   service: SERVICE_NGOAI_GIO,
      //   name: 'VŨ THỊ THƠM',
      //   phone: '0987356001',
      //   birthday: moment('18/06/1983', 'DD/MM/YYYY').toDate()
      // }
      // sample hcm
      // this.step = STEP_USER
      // this.form = {
      //   ...this.form,
      //   center: CENTER_HCM,
      //   service: SERVICE_NGOAI_GIO,
      //   name: 'NGUYỄN ĐÌNH THÀNH',
      //   phone: '0933851122',
      //   birthday: moment('06/10/1968', 'DD/MM/YYYY').toDate()
      // }
      // refetch
      this.fetch()
    },

    getScheduleDoctorByType (schedules, isOver = false) {
      let bookings = []
      schedules.forEach((item) => {
        if (item?.specialistcode &&
            item?.specialistname &&
            item?.doctorcode &&
            item?.doctorname &&
            ((isOver && item?.over > 0) ||
                (!isOver && (item?.mid > 0 || item?.mor > 0 || item?.aft > 0)))) {
          bookings.push(item)
        }
      })
      bookings = _.chain(bookings)
          .groupBy("specialistcode")
          .map((key) => {
            const _special = key[0]
            let doctors = key.map((doctor) => {
              return {
                id: doctor.doctorcode,
                name: doctor.doctorname,
                slug: doctor.doctorcode
              }
            })
            doctors = _.uniqBy(doctors, function(item) {
              return item.id
            })
            doctors = _.sortBy(doctors, 'name')
            if (doctors.length > 0) {
              return {
                id: _special.specialistcode,
                name: _special.specialistname,
                slug: _special.specialistcode,
                doctors: doctors
              }
            }
          }).value()
      const subArray = []
      bookings.forEach((item) => {
        const index = this.trueListSpecialHN.findIndex(subItem => {
          return item.id === subItem.code__c && subItem.active__c === 1
        })
        if (index !== -1) {
          subArray.push(item)
        }
      })
      return _.sortBy(subArray, 'name')
    },

    clearDistrict () {
      this.$set(this.form, 'address_district', null)
      this.clearWard()
    },

    clearWard () {
      this.$set(this.form, 'address_ward', null)
    },

    fetch () {
      this.loading = true
      return Promise
        .all([
          this.$apis.tamanh
            .getSchedulingSlots()
            .then(res => {
              this.slots = res
            }),
          this.$apis.master
            .getProvincesList()
            .then(res => {
              this.provinces = res
            }),
          this.$apis.forms
            .getCountrys()
            .then(res => {
              this.nationalities = res.data
                .map(i => ({ id: i.MAQG, name: i.TENQG }))
            }),
          this.$apis.tamanh
              .getSpecialitiesHcm()
              .then(res => {
                this.specialistHCM = res
              }),
          this.$apis.forms.getSpecialistHN().then((res) => {
            if (res && res.data && res.data.data) {
              this.trueListSpecialHN = res.data.data
            }
          })
    ])
        .finally(() => {
          this.loading = false
        })
    },

    showErrors (e) {
      const messages = _.map(_.union(..._.values(e)), i => i.message).join('\n').trim()
      if (messages) alert(messages)
    },

    async parsePatientData (found) {
      if (!found) return {}
      try {
        const provinces = this.provinces
        let district, ward
        const compare = (item, id) => {
          const key = {
            [CENTER_HN]: 'tamanh_hn',
            [CENTER_HCM]: 'tamanh_hcm'
          }[this.form.center] || null
          return key
            ? item.mapping[key] === id
            : item.id === id
        }
        const province = provinces
          .find(i => compare(i, +found.matinh))
        if (province)
          district = (await this.$apis.master
            .getDistrictsList({ provinceId: province.id }))
            .find(i => compare(i, +found.maquan))
        if (district)
          ward = (await this.$apis.master
            .getWardsList({ districtId: district.id }))
            .find(i => compare(i, +found.maphuong))
        const res = {
          sex: found.gioitinh,
          address_province: province?.id,
          address_district: district?.id,
          address_ward: ward?.id,
          address_street: found.sonha
        }
        if (found.mabn) res.pid = found.mabn
        return res
      } catch (e) {
        console.error(e)
        return {}
      }
    },

    fill () {
      this.$refs.form.validate((ok, e) => {
        this.showErrors(e)
        if (!ok) return
        this.filling = true
        this.$apis.tamanh
          .findPid(this.form.center, {
            hoten: this.form.name,
            dienthoai: this.form.phone,
            ngaysinh: moment(this.form.birthday)
              .format({
                [CENTER_HCM]: 'DD/MM/YYYY',
                [CENTER_HN]: 'YYYY-MM-DD'
              }[this.form.center] || 'DD/MM/YYYY'),
            mabn: this.form.pid || ''
          })
          .then(async res => {
            const parsed = await this.parsePatientData(res)
            this.form.fetch
            this.form = {
              ...this.form,
              customer_type: res ? 'old' : 'new',
              customer_fetched_data: res,
              ...parsed
            }
          })
          .finally(() => {
            this.filled = true
            this.filling = false
          })
      })
    },

    isSameRange(date, from, to) {
      return moment(date).isSameOrAfter(moment(from)) && moment(date).isSameOrBefore(moment(to))
    },

    getAllDoctorSlots (speciality, doctor) {
      const today = moment().startOf('day')
      const parseByShift = shift => {
        const slots = {}
        if (!shift) return slots
        const target = shift.find(i => i.item_khoa === speciality.term_id)
        if (target && target.list_ngay && target.list_ngay.length) {
          target.list_ngay.forEach(i => {
            const date = moment(i.item_ngay, 'DD/MM/YYYY')
            if (date > today) {
              const timeframes = []
              if (i.item_sang) timeframes.push({ id: 'Sáng', name: 'Sáng' })
              if (i.item_trua) timeframes.push({ id: 'Trưa', name: 'Trưa' })
              if (i.item_chieu) timeframes.push({ id: 'Chiều', name: 'Chiều' })
              if (i.item_toi) timeframes.push({ id: 'Tối', name: 'Tối' })
              slots[date.format('DD/MM/YYYY')] = timeframes
            }
          })
        }
        return slots
      }
      const res = {
        [SERVICE_TRONG_GIO]: parseByShift(doctor.lich_offline),
        [SERVICE_ONLINE]: parseByShift(doctor.lich_oneline)
      }
      return res
    },

    getPartAvaible(day, part) {
      const now = moment()
      const currentHour = now.format('HH')
      const currentDay = now.format('DD/MM/YYYY')
      if (currentDay !== day) return true
      return ((currentHour < 12 && part === 'MORNING') ||
          (currentHour >= 12 && currentHour < 13 &&  part === 'NOON') ||
          (currentHour >= 13 && currentHour <= 17  &&  part === 'AFTERNOON')
      )
    },

    getDoctorSlots (date) {
      const s = moment(date).format('DD/MM/YYYY')
      // const weekday = moment(date).day()
      if (this.form.center === CENTER_HN) {
        if (this.form.service === SERVICE_TRONG_GIO) {
          for (const item of this.schedulesHN) {
            if (s === item.day) {
              const slots = []
              if (item.mor > 0 && this.getPartAvaible(s, 'MORNING')) { slots.push({ id: 'Sáng', name: 'Sáng' }) }
              if (item.mid > 0 && this.getPartAvaible(s, 'NOON')) { slots.push({ id: 'Trưa', name: 'Trưa' }) }
              if (item.aft > 0 && this.getPartAvaible(s, 'AFTERNOON')) { slots.push({ id: 'Chiều', name: 'Chiều' }) }
              return slots
            }
          }
          return null
        }
        if (this.form.service === SERVICE_NGOAI_GIO) {
          if (this.oversHN && this.oversHN.length > 0 && this.oversHN.includes(s)) {
            return [{
              id: '16:30 - 19:30',
              name: '16:30 - 19:30',
              help: 'Ngoài giờ'
            }]
          }
          return null
        }
      }

      // service ngoai gio
      if (this.form.service === SERVICE_NGOAI_GIO) {
        if (this.form.center === CENTER_HCM) {
          switch (this.speciality.slug) {
            case 'khoa-noi-tong-hop':
            case 'trung-tam-san-phu-khoa':
            case 'khoa-nhi':
              if (s === '11/12/2021' || (this.isSameRange(date, '2021-12-13', '2021-12-31') && (s !== '19/12/2021' && s !== '26/12/2021'))) {
                return [{
                  id: '16:00 - 18:30',
                  name: '16:00 - 18:30',
                  help: 'Ngoài giờ'
                }]
              }
              return null
            case 'khoa-ngoai-tong-hop':
              if (this.isSameRange(date, '2021-12-14', '2021-12-19') && (s !== '19/12/2021' && s !== '26/12/2021')) {
                return [{
                  id: '16:00 - 18:30',
                  name: '16:00 - 18:30',
                  help: 'Ngoài giờ'
                }]
              }
              return null
            case 'noi-than-kinh':
              if (s === '15/12/2021' || s === '17/12/2021' || s === '22/12/2021' || s === '24/12/2021' || s === '29/12/2021' || s === '31/12/2021') {
                return [{
                  id: '16:00 - 18:30',
                  name: '16:00 - 18:30',
                  help: 'Ngoài giờ'
                }]
              }
              return null
            default:
              return null
          }
        } else if (this.form.center === CENTER_HN) {
          switch (this.speciality.slug) {
            case 'khoa-nhi':
            case 'khoa-tai-mui-hong':
              if (this.isSameRange(date, '2021-12-06', '2021-12-12')) return [{
                id: '16:30 - 19:30',
                name: '16:30 - 19:30',
                help: 'Ngoài giờ'
              }]
              break
            case 'khoa-ngoai-tong-hop':
              if (s === '06/12/2021') {
                return [{
                  id: '16:30 - 19:30',
                  name: '16:30 - 19:30',
                  help: 'Ngoài giờ'
                }]
              }
              return null
            case 'noi-than-kinh':
              if (s === '04/12/2021') {
                return [{
                  id: '16:30 - 19:30',
                  name: '16:30 - 19:30',
                  help: 'Ngoài giờ'
                }]
              }
              return null
            default:
              return null
          }
          return null
        }
        return null
      }

      // doctor
      if (!this.doctor) return null

      // service online
      if (
          this.form.service === SERVICE_ONLINE
      ) {
        return this.doctor.slots[this.form.service][s] || null
      }

      // service trong gio
      if (this.form.service === SERVICE_TRONG_GIO) {
        const slot = this.doctorsSlotHcm.map((item) => {
          let slotTime = ''
          switch (true) {
            case item.indexSlot >= 6 && item.indexSlot < 12 :
              slotTime = 'Sáng'
              break;
            case item.indexSlot >= 12 && item.indexSlot <= 13 :
              slotTime = 'Trưa'
              break;
            case item.indexSlot > 13  :
              slotTime = 'Chiều'
              break;
          }
          return {
            slotDate: item.slotDate || '',
            id: slotTime || '',
            name: slotTime || ''
          }
        })
        const slotGroup = groupArrayOfObjects(slot, 'slotDate')
        return slotGroup[s] || null
      }

      return null
    },

    parseSlotToPart (slot) {
      const { item_sang, item_trua, item_chieu, item_toi } = slot
      let parts = []
      if (item_sang) {
        parts.push({
          id: 'Sáng',
          name: 'Sáng'
        })
      }
      if (item_trua) {
        parts.push({
          id: 'Trưa',
          name: 'Trưa'
        })
      }
      if (item_chieu) {
        parts.push({
          id: 'Chiều',
          name: 'Chiều'
        })
      }
      if (item_toi) {
        parts.push({
          id: 'Tối',
          name: 'Tối'
        })
      }
      return parts
    },

    goToUserStep () {
      this.$refs.form.validate((ok, e) => {
        this.showErrors(e)
        if (!ok) return
        this.step = STEP_USER
      })
    },

    backToAppointmentStep () {
      this.filling = false
      this.step = STEP_APPOINTMENT
    },

    submit () {
      this.form = {
        ...this.form,
        speciality_name: this.speciality && this.speciality.name ? this.speciality.name : null,
        doctor_name: this.doctor && this.doctor.name ? this.doctor.name : null
      }
      this.$refs.form.validate((ok, e) => {
        this.showErrors(e)
        if (!ok) return
        const current = new Date()
        if (current.getHours() >= 19 && (current.getHours() <= 23 && current.getMinutes() <= 59)) {
          MessageBox({
            title: 'Thông báo',
            message: 'Cảm ơn Quý khách đã sử dụng dịch vụ của BVĐK Tâm Anh. Nếu Quý khách có nhu cầu đặt lịch khám ngày mai xin vui lòng liên hệ tổng đài trước 20:00 để được hỗ trợ. Trân trọng cảm ơn Quý khách'
          }).finally(() => {
            this.submitForm()
          })
        } else {
          this.submitForm()
        }
      })
    },
    submitForm () {
      this.submitting = true
      const ward = this.wards.find(i => i.id === this.form.address_ward)
      const district = this.districts.find(i => i.id === this.form.address_district)
      const province = this.provinces.find(i => i.id === this.form.address_province)
      this.form = {
        ...this.form,
        address_province_name: province.name,
        address_district_name: district.name,
        address_ward_name: ward.name
      }
      return this.send()
          .then(() => {
            this.form = this.normalize(this.form)
            this.finished = true
          })
          .finally(() => {
            this.submitting = false
          })
    }
  }
}

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    if (Array.isArray(rv[moment(x[key]).format('DD/MM/YYYY')])) {
      const found = rv[moment(x[key]).format('DD/MM/YYYY')].find((item) => {
        return item.id === x.id
      })
      if (!found) {
        (rv[moment(x[key]).format('DD/MM/YYYY')] = rv[moment(x[key]).format('DD/MM/YYYY')] || []).push(x);
      }
      return rv;
    } else {
      (rv[moment(x[key]).format('DD/MM/YYYY')] = rv[moment(x[key]).format('DD/MM/YYYY')] || []).push(x)
      return rv
    }
  }, {});
}
</script>

<style lang="scss" src="../assets/tamanh.scss"></style>
