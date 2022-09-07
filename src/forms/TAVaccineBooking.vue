<template lang="pug">
.ep-wrapper.ta-vaccine-booking
  .ep-loading(v-if="loading") Đang tải. Vui lòng đợi...

  el-form.ep-form(
    v-loading="submitting"
    ref="form"
    v-else
    :model="form"
    label-position="top"
    :rules="rules")
    section.ep-branding.ep-ta-branding
      .ep-branding__logo
        img(:src="taLogo")
      .ep-branding__header
        .ep-branding__title.ep-ta-vaccine-booking Đặt hẹn tiêm vắc xin COVID-19 tại BVĐK Tâm Anh
    .ep-finish-inject-2(v-if="false && isInputVaccine && wrongType == 'BOOKING_EXIST'")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Quý khách đã đặt hẹn tiêm COVID-19 cho Khách hàng
            b {{` ${profile.name} - PID ${profile.pid}`}}
            div Khách hàng cần hoàn tất mũi tiêm vào Ngày đặt hẹn để có thể đặt hẹn cho mũi tiêm tiếp theo.
        el-row
          .el-link.booking-detail
            a(@click="onBookingDetail()") Thông tin lịch hẹn
            .icon(style="padding: 10px !important;")
              img(src="../assets/arrow.svg")
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="(finished && wrongType === 'BOOKING_SUCCESS') || (isInputVaccine && wrongType == 'BOOKING_EXIST')")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Cảm ơn Quý khách đã đặt hẹn tiêm vắc xin COVID-19. Quý khách vui lòng chụp ảnh màn hình để xác nhận đặt hẹn khi đến tiêm.
        el-col
          div.booking-completed-row Thông tin đặt hẹn
        div(style="display: flex; align-items: center; width: 100%; justify-content: space-between;")
          div(style="width: 30% !important;")
            qr-code.qr-code-image(:text="getQRCode()")
          div(style="width: 65% !important;")
            div.row-booking-right.row-label-success(v-if="getPrefixBookingLabel() === 'Mã đặt hẹn'")
              span MÃ ĐẶT HẸN:&nbsp;
              span.eplus-strong(style="color: #0957DE; font-size: 18px;") {{ bookingResponse.booking_id }}
            div.row-booking-right.row-label-success(v-else)
              span.eplus-strong(style="color: #0957DE")  {{ `${getPrefixBookingLabel()}` }}
              br
              span.eplus-strong(style="color: #0957DE; font-size: 18px;") {{ bookingResponse.booking_id }}
            div.row-label-success
              b {{ getExpectInjectTime() }}
              span , ngày&nbsp;
              b {{ getExpectInjectDate() }}
            div.row-label-success
              b BVĐK Tâm Anh TP. HCM
            div.row-label-success
              span(style="color: #686868;") 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col
          div.booking-completed-row Thông tin đăng ký
        el-col
          div.row-label-success
            b {{ `${profile.name}, ${profile.phone}` }}
          div.row-label-success
            span PID&nbsp;
            b(style="color: #0957DE") {{ bookingResponse.pid }}
          div.row-label-success
            span {{ getGenderBirthday(profile)  }}
          div.row-label-success(v-if="profile.cmnd")
            span {{ `CMND ${profile.cmnd}, cấp ngày ${profile.cmnd_date}, tại ${profile.cmnd_location}` }}
          div.row-label-success
            span {{ `${profile.address}, ${profile.war}, ${profile.district}, ${profile.province}` }}
        el-col
          div.booking-completed-row Thông tin y khoa & bệnh lý
          b {{ getMedicalInfo() }}
          div
            b {{ getInjectedVaccine().length > 0 ? `Đã tiêm ${getInjectedVaccine().length} mũi` : 'Chưa tiêm' }}
            div(v-if="getInjectedVaccine().length > 0", v-for="i, k in getInjectedVaccine()")
              span - Mũi {{ i.order }}: tiêm ngày&nbsp;{{ getDateStr(i.date) }},&nbsp;
              b {{ i.name }}&nbsp;
              span Tại {{ i.location.toUpperCase() }}
        el-col(v-if="profile.name_contact || profile.relationship || profile.phone_contact")
          div.booking-completed-row Thông tin liên hệ
        el-col
           b(v-if="profile.name_contact || profile.relationship") {{ `${profile.name_contact || ''} (${profile.relationship || ''})` }}
           br
           b(v-if="profile.phone_contact") {{ profile.phone_contact }}
        el-col(style="margin-top: 20px;")
          span Quý khách vui lòng có mặt đúng giờ theo giờ hẹn, trình diện ảnh chụp màn hình đặt hẹn và giấy tờ tuỳ thân trùng khớp với Thông tin đã đăng ký để được phục vụ.
        el-col
          span Trong trường hợp cần hỗ trợ gấp hoặc cần giải đáp thắc mắc, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="isInputVaccine && wrongType == 'INJECTED_COMPLETED'")
      section.ep-section.finish-inject-2
        el-col
          b.ep-section__description-note Chúc mừng Quý khách đã hoàn tất 02 mũi tiêm COVID-19. Hiện nay bệnh viện đang ưu tiên tiêm mũi 3 cho người trên 50 tuổi hoặc người có bệnh lý nền theo hướng dẫn của Sở Y Tế. Quý khách vui lòng quay lại đặt hẹn sau khi đối tượng tiêm được mở rộng. Xin chân thành cảm ơn.
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="!isInputVaccine && wrongType == 'INJECT_DATE_NOT_AVAILABLE'")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Căn cứ theo lịch tiêm mũi 1 mà Qúy Khách đã cung cấp thì Quý khách chưa đến ngày tiêm mũi 2 theo khoảng cách quy định của Bộ Y tế.
          .ep-section__description-note.date Ngày tiêm dự kiến của Quý khách là
            b {{expect_next_date}}
          .ep-section__description-note Quý khách vui lòng quay lại để đặt hẹn sau bằng cách truy cập vào đúng link đặt hẹn này.
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="isInputVaccine && wrongType == 'PROFILE_NOT_FOUND'")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Thông tin đăng ký đặt hẹn chưa chính xác.
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="isInputVaccine && wrongType == 'PROFILE_NOT_APPROVED'")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Thông tin đăng ký đặt hẹn chưa chính xác.
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="isInputVaccine && wrongType == 'WRONG_AGE'")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Bệnh viện sẽ thông báo sớm đến bạn khi thực hiện đặt lịch tiêm cho đối tượng Trẻ em dưới 18 tuổi. Xin cảm ơn.
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="!isInputVaccine && wrongType == 'VACCINE_NOT_FOUND'")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Căn cứ theo thông tin tình trạng mũi tiêm, chúng tôi chưa triển khai chương trình tiêm chủng phù hợp với thông tin mũi tiêm của Quý khách.
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="isInputVaccine && wrongType == 'PID_WRONG'")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Chúng tôi đang cập nhật lại thông tin đăng ký và hệ thống sẽ gửi lại tin nhắn đặt hẹn cho Quý khách sau. Xin chân thành cảm ơn.
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep-finish-inject-2(v-else-if="isInputVaccine && wrongType == 'DATE_F0_WRONG'")
      section.ep-section.finish-inject-2
        el-col
          .ep-section__description-note Theo Hướng dẫn tạm thời Khám sàng lọc trước khi tiêm vaccine phòng COVID-19 do Bộ Y tế ban hành, Bộ Y tế yêu cầu không tiêm cho người có ít nhất một yếu tố phải trì hoãn là có tiền sử rõ ràng đã mắc COVID-19 trong vòng 6 tháng; đang mắc bệnh cấp tính; phụ nữ mang thai dưới 13 tuần. Bạn vui lòng liên hệ lại sau khi có các hướng dẫn mới.
        el-col
          span Để được tư vấn về các dịch vụ khám chữa bệnh, Quý khách vui lòng liên hệ:
        el-col.hospital-ta
          b Bệnh viện Đa khoa Tâm Anh TP. HCM
        el-col
          span 2B Phổ Quang, Phường 2, Tân Bình, TP. HCM
        el-col.lasted-line-ta-website
          .el-link
            a(href="https://bit.ly/3aA0WG6") tamanhhospital.vn
        .finish-inject-2-actions
          el-button(type="primary" onclick="location.href='https://bit.ly/2YHRCgD';") Đặt hẹn khám
          a.el-button(href="https://bit.ly/ZALO-BVTA") Chat ngay
    .ep(v-else-if="isInputVaccine")
      section.ep-section
        .ep-section__description-note Quý khách vui lòng cập nhật tình trạng tiêm để có thể đặt hẹn tiêm vắc xin COVID-19 cho Khách hàng
          b {{` ${profile.name}`}}
      section.ep-section
        .ep-section__title Bạn đã từng là F0 chưa?
        .ep-section__body
          el-form-item(label="" prop="is_f0")
            el-radio-group.ep-full(v-model="form.is_f0")
              el-radio-button(:label="'Có'") Đã từng
              el-radio-button(:label="'Không'") Chưa
      section.ep-section(v-if="form.is_f0 == 'Có'")
        .ep-section__title Nhập ngày hoàn tất điều trị F0
        .ep-section__body
          el-form-item(label="" prop="f0_date")
            el-date-picker.vaccine-input-item(
              clearable
              :picker-options="expectDateInjected"
              v-model="form.f0_date")
      section.ep-section
        .ep-section__title Bạn đã tiêm vắc xin COVID-19 chưa?
        .ep-section__body
          el-form-item(label="" prop="num_injected")
            el-radio-group.ep-full(v-model="form.num_injected")
              el-radio-button(:label="0", :disabled="not_injected_disabled") Chưa tiêm
              el-radio-button(:label="1", :disabled="num1_injected_disabled") Đã tiêm Mũi 1
              el-radio-button(:label="2") Đã tiêm Mũi 2
      section.ep-section(v-if="form.num_injected === 1 || form.num_injected === 2")
        .ep-section__title MŨI 1
          span.is-required-char *
        i(v-if="type_first_disabled") Bạn không thể cập nhật mũi 1 vì đây là mũi tiêm tại Bệnh viện
        .ep-section__body
          el-form-item(label="Chọn loại vắc xin đã tiêm" prop="inject_type_first")
            el-select.vaccine-input-item(v-model="form.inject_type_first" @change="vaccineNameChange()" clearable :disabled="type_first_disabled")
              template(v-if="vaccines")
                el-option(
                  v-for="i, k in vaccines"
                  :key="k"
                  :value="i.id"
                  :label="i.name") {{ i.name }}

          el-form-item(label="Điền ngày đã tiêm" prop="inject_date_first")
                el-date-picker.vaccine-input-item(
                  :disabled="date_first_disabled"
                  clearable
                  @change="vaccineDateChange()"
                  :picker-options="expectDateInjected"
                  v-model="form.inject_date_first")
          el-form-item(label="Điền nơi tiêm" prop="inject_location_first")
            el-input.vaccine-input-item.ep-uppercase(v-model="form.inject_location_first" :disabled="location_first_disabled")
      section.ep-section(v-if="form.num_injected === 2")
        .ep-section__title MŨI 2
          span.is-required-char *
        i(v-if="type_second_disabled") Bạn không thể cập nhật mũi 2 vì đây là mũi tiêm tại Bệnh viện
        .ep-section__body
          el-form-item(label="Chọn loại vắc xin đã tiêm" prop="inject_type_second")
            el-select.vaccine-input-item(v-model="form.inject_type_second" clearable :disabled="type_second_disabled")
              template(v-if="vaccines")
                el-option(
                  v-for="i, k in vaccines2"
                  :key="k"
                  :value="i.id"
                  :label="i.name") {{ i.name }}

          el-form-item(label="Điền ngày đã tiêm" prop="inject_date_second")
                el-date-picker.vaccine-input-item(
                  :disabled="date_second_disabled"
                  clearable
                  :picker-options="expectDateInjected2"
                  v-model="form.inject_date_second")

          el-form-item(label="Điền nơi tiêm" prop="inject_location_second")
            el-input.vaccine-input-item.ep-uppercase(v-model="form.inject_location_second" :disabled="location_second_disabled")
      div(style="height: 40px;")
      div.booking-button-container
        el-button.next-button(@click="onNext" type="primary" size="large")
          .icon {{ getLabelButton() }}
            img(src="../assets/arrow-white.svg")
    .ep(v-else)
      section.ep-section.timeslot-booking
        .ep-section__title ĐẶT HẸN TIÊM VẮC XIN COVID-19
        .ep-section__body
          el-form-item(label="Ngày mong muốn tiêm" prop="expect_date_inject")
            el-date-picker(
              :picker-options="expectDateOptions"
              :editable="false"
              popper-class="expect-date-inject-popper"
              :default-value="getDefaultDate()"
              v-model="form.expect_date_inject")
          el-form-item(label="Thời gian mong muốn tiêm" prop="expect_timeslot_inject" v-if="wrongType !== 'OVER_VACCINE_SLOT'" v-loading="isLoading")
            el-radio-group.ep-full.expect-timeslot-container(v-model="form.expect_timeslot_inject", style="flex-flow: wrap;justify-content: space-between;")
              el-radio-button.expect-timeslot-item(v-for="item, k in getTimeslotForBooking(dates)", :label="k", :key="k", :disabled="item.slot <= 0")
                  b.slot-time {{ `${parseHour(item.from)}` }}
                  div.slot-available {{ item.slot > 0 ? 'CÒN CHỖ' : 'HẾT CHỖ' }}
          .section(v-else)
            p Hiện lượng cấp phát vắc xin phù hợp với phác đồ tiêm của Quý khách vào ngày đặt hẹn này đã hết. Quý khách vui lòng chọn ngày đặt hẹn khác.
            p Do số lượng vắc xin có hạn, số suất tiêm sẽ được mở trước ngày tiêm 24 giờ. Quý khách vui lòng theo dõi để đặt hẹn theo nhu cầu.
            p Trân trọng cám ơn Quý khách.
          .section(v-if="wrongType !== 'OVER_VACCINE_SLOT'")
            i * Nhằm tổ chức tốt công tác tiêm chủng, quý khách vui lòng có mặt đúng giờ hẹn. Bệnh viện có thể từ chối phục vụ nếu Quý khách đi sai giờ hẹn.
      div.booking-button-container
        el-button.next-button(@click="onBooking" type="primary" size="large", :disabled="wrongType === 'OVER_VACCINE_SLOT'")
          .icon {{"Hoàn tất"}}
            img(src="../assets/arrow-white.svg")

</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import * as $v from '../services/validators'
import Base from './Base'
import taLogo from '../assets/ta_logo.png'
import { MessageBox } from 'element-ui'

export default {
  extends: Base,

  data () {
    return {
      key: 'VaccineBookingOnline',
      taLogo,
      dates: [],
      profile: {},
      rules: {
        num_injected: [$v.required],
        inject_type_first: [$v.required],
        inject_date_first: [$v.required],
        inject_location_first: [$v.required],
        inject_type_second: [$v.required],
        inject_date_second: [$v.required],
        inject_location_second: [$v.required],
        expect_date_inject: [$v.required],
        expect_timeslot_inject: [$v.required],
        is_f0: [$v.required],
        f0_date: [$v.required]
      },
      vaccines: [
        {
          name: 'AstraZeneca',
          id: 'Az'
        },
        {
          name: 'Pfizer',
          id: 'Pz'
        },
        {
          name: 'Moderna',
          id: 'Mo'
        },
        {
          name: 'Verocell',
          id: 'Ve'
        }
      ],
      vaccines2: [],
      datesAvailable: [],
      isInputVaccine: true,
      isLoading: false,
      wrongType: '',
      expect_next_date: '',
      bookingResponse: {},
      type_first_disabled: false,
      date_first_disabled: false,
      location_first_disabled: false,
      type_second_disabled: false,
      date_second_disabled: false,
      location_second_disabled: false,
      not_injected_disabled: false,
      num1_injected_disabled: false,
      datesInjection2: moment(),
      prefix_booking_code: null,
      diffYear: 0
    }
  },

  computed: {
    expectDateOptions () {
      return {
        disabledDate: d => {
          const { datesAvailable } = this
          if (datesAvailable.length > 0) {
            const day = moment(d).format('YYYY-MM-DD')
            // const today = moment().format('YYYY-MM-DD')
            if (datesAvailable.includes(day)) {
              return false
            }
          }
          return true
        }
      }
    },
    expectDateInjected () {
      return {
        disabledDate: d => {
          if (d.valueOf() >= Date.now()) return true
        }
      }
    },
    expectDateInjected2 () {
      return {
        disabledDate: d => {
          return moment(this.datesInjection2).isSameOrAfter(moment(d)) || moment('2021-01-01').isSameOrAfter(moment(d)) || d.valueOf() > Date.now() || moment(this.form.inject_date_first).isSameOrAfter(moment(d))
          // if (d.valueOf() >= Date.now() || moment(this.form.inject_date_first).isSameOrAfter(moment(d))) return true
        }
      }
    }
  },

  watch: {
    'form.expect_date_inject': {
      handler (val) {
        const params = new URLSearchParams(window.location.search)
        const _source = params.get('by_source')
        const date = moment(val).format('YYYY-MM-DD')
        this.isLoading = true
        this.form.expect_timeslot_inject = null
        const { inject_type_first, inject_type_second, num_injected } = this.form
        let vaccines = ["astrazeneca", "as", "az"]
        if (num_injected == 2) {
          let typeVaccine1 = this.getEnumVaccine(inject_type_first)
          let typeVaccine2 = this.getEnumVaccine(inject_type_second)
          if (typeVaccine1 !== typeVaccine2 || ((typeVaccine1 == 'Ve' || typeVaccine2 == 'Ve') && typeVaccine1 !== typeVaccine2) || typeVaccine1 == 'Pz' || typeVaccine2 == 'Pz' || typeVaccine1 == 'Mo' || typeVaccine2 == 'Mo' || this.profile.doituongtiem === 'Khách hàng khám sản (đang mang thai)') {
            vaccines = ["moderna", "mo", "pfizer", "pz", "pf"]
            this.prefix_booking_code = 'P'
          }
          if (typeVaccine1 == typeVaccine2 && typeVaccine1 == 'Az') {
            vaccines = ["astrazeneca", "as", "az"]
            this.prefix_booking_code = null
          }
        } else {
          if (inject_type_first) {
            let typeVaccine = this.getEnumVaccine(inject_type_first)
            if (typeVaccine == 'Mo' || typeVaccine == 'Pz') {
              vaccines = ["moderna", "mo", "pfizer", "pz", "pf"]
              this.prefix_booking_code = 'P'
            } else {
              vaccines = ["astrazeneca", "as", "az"]
              this.prefix_booking_code = null
            }
          }
        }
        const data = {
          date: date,
          formId: 'VaccineBookingOnline',
          vaccines: vaccines
        }

        if (vaccines.includes('pfizer') && !(this.profile.doituongtiem === 'Khách hàng khám sản (đang mang thai)' || this.diffYear >= 18)) {
          this.wrongType = 'OVER_VACCINE_SLOT'
          this.isLoading = false
          return
        }

        this.$apis.forms
          .getVaccineslots(data, _source)
          .then((res) => {
            if (res && res.data > 0) {
              this.wrongType = ''
              this.$apis.forms
                .getTimeslots(date, _source)
                .then((res) => {
                  this.dates = res.data
                }).finally(() => {
                  this.isLoading = false
                })
            } else {
              this.wrongType = 'OVER_VACCINE_SLOT'
              this.isLoading = false
            }
          })
          .catch(() => {
            this.isLoading = false
          })
      }
    },
    'form.inject_type_first': {
      handler () {
        this.validateInjections()
      }
    },
    'form.inject_date_first': {
      handler () {
        this.validateInjections()
      }
    },
    'form.num_injected': {
      handler (vaccineNum) {
        switch (vaccineNum) {
          case 0:
            this.form = {
              ...this.form,
              inject_type_first: '',
              inject_date_first: '',
              inject_location_first: '',
              inject_type_second: '',
              inject_date_second: '',
              inject_location_second: '',
            }
            return
          case 1:
            this.form = {
              ...this.form,
              inject_type_second: '',
              inject_date_second: '',
              inject_location_second: ''
            }
            return
          case 2:
            return
        }
      }
    },
  },

  methods: {
    getPrefixBookingLabel() {
      const { doituongtiem } = this.profile
      switch (doituongtiem) {
        case 'Phụ nữ mang thai':
          return 'Mã đặt hẹn khám thai & tiêm vắc xin COVID-19'
        case 'Khách hàng thăm khám tại Trung tâm Hỗ trợ sinh sản':
          return 'Mã đặt hẹn khám IVF & tiêm vắc xin COVID-19'
        case 'Khách hàng khám sản (không mang thai)':
          return 'Mã đặt hẹn khám sản & tiêm vắc xin COVID-19'
      }
      return 'Mã đặt hẹn'
    },
    getTimeslotForBooking (dates) {
      if (moment(this.form.expect_date_inject).format('DD/MM/YYYY') !== moment().format('DD/MM/YYYY')) {
        return dates
      }
      const hours = moment().format('HH')
      const mins = moment().format('mm')
      let _dates = []
      const currentHours = Number(hours) + Number(mins/60)
      for (const date of dates) {
        const { from } = date
        if (from >= currentHours) {
          _dates.push(date)
        }
      }
      return _dates
    },
    vaccineNameChange () {
      if (!this.type_second_disabled) {
        this.form = {
          ...this.form,
          inject_type_second: '',
          inject_date_second: ''
        }
      }
    },
    vaccineDateChange () {
      if (!this.type_second_disabled) {
        this.form = {
          ...this.form,
          inject_type_second: '',
          inject_date_second: ''
        }
      }
    },
    validateInjections () {
      const { inject_type_first, inject_date_first } = this.form
      let dateDuration = ''
      let typeVaccine = this.getEnumVaccine(inject_type_first)
      switch (typeVaccine) {
        case 'Ve':
          this.vaccines2 = [
            {
              name: 'Verocell',
              id: 'Ve'
            }
          ]
          dateDuration = moment(inject_date_first).add(27, 'days')
          break
        case 'Az':
          this.vaccines2 = [
            {
              name: 'AstraZeneca',
              id: 'Az'
            },
            {
              name: 'Pfizer',
              id: 'Pz'
            },
            {
              name: 'Moderna',
              id: 'Mo'
            }
          ]
          dateDuration = moment(inject_date_first).add(41, 'days')
          break
        case 'Pz':
          this.vaccines2 = [
            {
              name: 'Pfizer',
              id: 'Pz'
            },
            {
              name: 'Moderna',
              id: 'Mo'
            }
          ]
          dateDuration = moment(inject_date_first).add(20, 'days')
          break
        case 'Mo':
          this.vaccines2 = [
            {
              name: 'Pfizer',
              id: 'Pz'
            },
            {
              name: 'Moderna',
              id: 'Mo'
            }
          ]
          dateDuration = moment(inject_date_first).add(27, 'days')
          break
      }
      this.datesInjection2 = dateDuration
    },
    getMedicalInfo() {
      let medicals = []
      const { doituongtiem, benhnen } = this.profile
      if (doituongtiem) {
        medicals.push(doituongtiem)
      }
      if (benhnen) {
        medicals.push(benhnen)
      }
      return medicals.join(' / ')
    },
    getQRCode() {
      const { name, pid, birthday, idbooking } = this.profile
      return `n:${name}|pid:${pid}|b:${moment(birthday, 'YYYYMMDD')}|c:${idbooking}|i:VaccineBookingOnline`
    },
    getDefaultDate() {
      if (this.datesAvailable.length > 0) {
        return this.getDateStr(this.datesAvailable[0], 'YYYY-MM-DD')
      }
    },
    getLabelButton () {
      const { num_injected } = this.form
      switch (num_injected) {
        case 0:
          return 'Đặt hẹn tiêm mũi 1'
        case 1:
          return 'Đặt hẹn tiêm mũi 2'
        case 2:
          return 'Đặt hẹn tiêm mũi 3'
      }
      return 'Hoàn tất'
    },

    getGenderBirthday (profile) {
      if (profile.gender && profile.birthday) {
        return `${profile.gender} - ${this.getDateStr(profile.birthday)}`
      }
      return profile.gender || this.getDateStr(profile.birthday)
    },

    showWarningMessage(message) {
      MessageBox({
        title: 'Cập nhật mũi tiêm',
        message: message,
        showCancelButton: true,
        showConfirmButton: true,
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'Tiếp tục',
        cancelButtonText: 'Hủy',
        callback: (type) => {
          if (type == 'confirm') {
            const form = {
              ...this.form,
              is_update: true,
              is_booking: false
            }
            this.isLoading = true
            this.$apis.forms
            .push(this.key, {
              _source: this.source,
              ...this.normalize(form)
            })
            .then(() => {
              this.wrongType = 'INJECTED_COMPLETED'
              this.isInputVaccine = true
            })
            .finally(() => {
              this.isLoading = false
            })
          }
        }
      })
    },

    getParams () {
      const params = new URLSearchParams(window.location.search)
      const hashtag = window.location.hash
      const pid = params.get('pid')
      const rid = params.get('rid')
      return { pid, rid, hashtag }
    },

    reset () {
      this.finished = false
      this.loading = false
      this.submitting = false
      this.isLoading = false
      this.dates = []
      this.datesAvailable = []
      this.isInputVaccine = true
      this.wrongType = ''
      this.profile = {}
      this.expect_next_date = ''
      this.bookingResponse = {}
      this.form = {
        num_injected: null,
        inject_type_first: null,
        inject_date_first: null,
        inject_location_first: null,
        inject_type_second: null,
        inject_date_second: null,
        inject_location_second: null,
        expect_timeslot_inject: null,
        is_booking: false,
        is_update: false,
        is_f0: null,
        f0_date: null,
        prefix_booking_code: null
      }
      this.fetch()
    },

    onNext () {
      let form = this.$refs.form
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
        const { num_injected, is_f0, f0_date } = this.form
        if (is_f0 == 'Có') {
          let dates = []
          if (this.diffYear >= 18) {
            dates = this.getRangeDateAvailable(moment(f0_date).add(34, 'days'))
          } else {
            dates = this.getRangeDateAvailable(moment(f0_date).add(6, 'months'))
          }
          if (dates.length > 0) {
            this.datesAvailable = dates
          } else {
            this.wrongType = 'DATE_F0_WRONG'
            return
          }
        }
        if (num_injected !== null) {
          switch(num_injected) {
            case 0:
              this.isInputVaccine = false
              break
            case 1:
              this.inJectedVaccine01()
              break
            case 2:
              if (this.wrongType === 'INJECTED_3_CONDITION' || (is_f0 == 'Có' && this.datesAvailable.length > 0)) {
                this.isInputVaccine = false
              } else {
                this.showWarningMessage('Bạn có chắc muốn cập nhật đã hoàn tất 2 mũi tiêm Covid-19 hay không?')
              }
          }
        }
      })
    },

    inJectedVaccine01 () {
      const { inject_type_first, inject_date_first } = this.form
      let dateDuration = ''
      let typeVaccine = this.getEnumVaccine(inject_type_first)
      switch (typeVaccine) {
        case 'Ve':
          dateDuration = moment(inject_date_first).add(27, 'days') // 28
          var form1 = {
            ...this.form,
            is_update: true,
            is_booking: false
          }
          this.isLoading = true
          this.$apis.forms
          .push(this.key, {
            _source: this.source,
            ...this.normalize(form1)
          })
          .then(() => {
            this.wrongType = 'VACCINE_NOT_FOUND'
            this.isInputVaccine = false
          })
          .finally(() => {
            this.isLoading = false
          })
          return
        case 'Az':
          dateDuration = moment(inject_date_first).add(41, 'days') // 42
          break
        case 'Pz':
          dateDuration = moment(inject_date_first).add(20, 'days') // 21
          break
        case 'Mo':
          dateDuration = moment(inject_date_first).add(27, 'days') // 28
          break
      }
      const dates = this.getRangeDateAvailable(dateDuration)
      if (dates.length > 0) {
        this.datesAvailable = dates
      } else {
        var form2 = {
          ...this.form,
          is_update: true,
          is_booking: false
        }
        this.isLoading = true
        this.$apis.forms
        .push(this.key, {
          _source: this.source,
          ...this.normalize(form2)
        })
        .then(() => {
          this.wrongType = 'INJECT_DATE_NOT_AVAILABLE'
          this.expect_next_date = dateDuration.format('DD/MM/YYYY')
        })
        .finally(() => {
          this.isLoading = false
        })
      }
      this.isInputVaccine = false
    },

    getRangeDateAvailable (injectedDate) {
      const { datesAvailable } = this
      let dates = []
      datesAvailable.forEach((date) => {
        if (moment(date).isSameOrAfter(moment(injectedDate))) {
          dates.push(date)
        }
      })
      if (this.wrongType === 'INJECTED_3_CONDITION') {
        const now = moment()
        const next = moment().add(1, 'days').format('YYYY-MM-DD')
        const limitHour = now.format('HH')
        const today = now.format('YYYY-MM-DD')
        if (dates.includes(today)) {
          _.remove(dates, function(item) {
            return item === today
          });
        }
        if (limitHour >= 23) {
          if (dates.includes(next)) {
            _.remove(dates, function(item) {
              return item === next
            });
          }
        }
      }
      return dates
    },

    scrollToTop () {
      const rect = this.$el.getBoundingClientRect()
      if (rect) window.scrollTo(0, rect.top + window.scrollY - 72)
    },

    getEnumVaccine (fullString) {
      if (!fullString) return fullString
      const lowcaseStr = fullString.toLowerCase()
      if (lowcaseStr.includes('astrazeneca') || lowcaseStr.includes('az')) {
        return 'Az'
      }
      if (lowcaseStr.includes('verocell') || lowcaseStr.includes('ve')) {
        return 'Ve'
      }
      if (lowcaseStr.includes('moderna') || lowcaseStr.includes('mo')) {
        return 'Mo'
      }
      if (lowcaseStr.includes('pfizer') || lowcaseStr.includes('pz') || lowcaseStr.includes('pf')) {
        return 'Pz'
      }
      return fullString
    },

    onBooking () {
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
        const { expect_timeslot_inject, expect_date_inject, inject_type_first } = this.form
        const timeslot = this.getTimeslotForBooking(this.dates)[expect_timeslot_inject]
        const form = {
          ...this.form,
          expect_timeslot_inject: timeslot,
          expect_date_inject: moment(expect_date_inject).toISOString(),
          slot_from: timeslot?.from,
          slot_to: timeslot?.to,
          booking_date: moment(expect_date_inject).format('YYYY-MM-DD'),
          center_id: 'BV-TAMANH-HCM',
          is_booking: true,
          is_update: inject_type_first !== null && !this.type_first_disabled,
          prefix_booking_code: this.prefix_booking_code
        }
        this.isLoading = true
        this.$apis.forms
        .push(this.key, {
          _source: this.source,
          ...this.normalize(form)
        })
        .then((res) => {
          this.finished = true
          this.wrongType = 'BOOKING_SUCCESS'
          this.bookingResponse = res?.data?.data
          this.scrollToTop()
          if (this.prefix_booking_code === 'P') {
            MessageBox({
              title: '',
              message: 'Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác. Quý khách có bệnh lý vui lòng mang theo hồ sơ sức khỏe và giấy tờ khám bệnh khi đến tiêm.',
              showCancelButton: false,
              showConfirmButton: true,
              dangerouslyUseHTMLString: true,
              confirmButtonText: 'ĐÓNG',
              cancelButtonText: '',
              callback: () => {}
            })
          }
        })
        .finally(() => {
          this.isLoading = false
        })
      })
    },

    fetch () {
      this.loading = true
      this.$apis.forms
      .findRecordRID(this.getParams())
      .then((res) => {
        if (res.data) {
          if (res.data?.enum_message_error) {
            this.wrongType = res.data?.enum_message_error
            this.loading = false
            return
          }
          if (res.data.status == '0' || res.data.status == '4') {
            this.wrongType = 'PROFILE_NOT_APPROVED'
            this.loading = false
            return
          }
          this.profile = {
            ...res.data,
            rid: this.getParams().rid
          }
          if (this.profile?.idrecord) {
            const {isf0, datef0} = this.profile
            let diffYear = 0
            if (this.profile && this.profile?.birthday) {
              const { birthday } = this.profile
              diffYear = moment().diff(birthday, 'years')
              this.diffYear = diffYear
              const _birthday = moment(birthday).add(18, 'years')
              const dates = this.getRangeDateAvailable(_birthday)
              if (diffYear < 18) {
                if (dates.length > 0) {
                  this.datesAvailable = dates
                } else {
                  this.wrongType = 'WRONG_AGE'
                  this.loading = false
                  return
                }
              }
            }
            // this.form.num_injected = this.profile?.list_vx.length
            this.form = {
              ...this.form,
              record: this.profile
            }
            const { list_vx } = this.profile
            if (list_vx && Array.isArray(list_vx)) {
              _.orderBy(list_vx, ['vx_order'], ['asc']).forEach((vxItem) => {
                const { vx_name, vx_date, vx_location, type_author, vx_order } = vxItem
                if (vx_order == '1') {
                  this.form = {
                    ...this.form,
                    inject_date_first: vx_date && vx_date !== '0000-00-00 00:00:00' ? moment(vx_date) : null,
                    inject_location_first: vx_location,
                    inject_type_first: vx_name
                  }
                  if (type_author && type_author == 'system') {
                    this.type_first_disabled = true
                    this.date_first_disabled = true
                    this.location_first_disabled = true
                  } else {
                    this.type_first_disabled = false
                    this.date_first_disabled = false
                    this.location_first_disabled = false
                  }
                  this.form.num_injected = 1
                }
                if (vx_order == '2') {
                  this.form = {
                    ...this.form,
                    inject_date_second: vx_date && vx_date !== '0000-00-00 00:00:00' ? moment(vx_date) : null,
                    inject_location_second: vx_location,
                    inject_type_second: vx_name
                  }
                  if (type_author && type_author == 'system') {
                    this.type_second_disabled = true
                    this.date_second_disabled = true
                    this.location_second_disabled = true
                  } else {
                    this.type_second_disabled = false
                    this.date_second_disabled = false
                    this.location_second_disabled = false
                  }
                  this.form.num_injected = 2
                }
              })
            }
            if (this.form.num_injected == 2) {
              this.num1_injected_disabled = true
              this.not_injected_disabled = true
              if (diffYear >= 18 && !(isf0 && isf0 === 'Có')) {
                // ((diffYear >= 65) || (diffYear >= 50 && diffYear < 65 && this.profile.benhnen && this.profile.benhnen !== 'Không') || (this.profile.doituongtiem === 'Khách hàng khám sản (đang mang thai)' && !(this.profile.benhnen && this.profile.benhnen !== 'Không' && this.isBenhNenInclude(this.profile.benhnen))))
                this.wrongType = 'INJECTED_3_CONDITION'
                const dates = this.getRangeDateAvailable(moment(this.form.inject_date_second).add(3, 'months'))
                if (dates.length > 0) {
                  this.datesAvailable = dates
                } else {
                  this.wrongType = 'DATE_F0_WRONG'
                  return
                }
              }

              if ((diffYear >= 18 && diffYear < 50 && this.profile.benhnen && this.profile.benhnen !== 'Không' && this.isBenhNenInclude(this.profile.benhnen) || (this.profile.doituongtiem === 'Khách hàng khám sản (đang mang thai)' && this.profile.benhnen && this.profile.benhnen !== 'Không' && this.isBenhNenInclude(this.profile.benhnen))) && !(isf0 && isf0 === 'Có')) {
                this.wrongType = 'INJECTED_3_CONDITION'
                const dates = this.getRangeDateAvailable(moment(this.form.inject_date_second).add(27, 'days'))
                if (dates.length > 0) {
                  this.datesAvailable = dates
                } else {
                  this.wrongType = 'DATE_F0_WRONG'
                  return
                }
              }

              if (this.wrongType !== 'INJECTED_3_CONDITION' && !(isf0 && isf0 === 'Có')) {
                this.wrongType = 'INJECTED_COMPLETED'
              }
            }
            if (this.form.num_injected == 1) {
              const { vx_name, vx_date, vx_location, type_author } = this.profile?.list_vx[0]
              this.form = {
                ...this.form,
                inject_date_first: vx_date && vx_date !== '0000-00-00 00:00:00' ? moment(vx_date) : null,
                inject_location_first: vx_location,
                inject_type_first: vx_name
              }
              if (type_author && type_author == 'system') {
                this.type_first_disabled = true
                this.date_first_disabled = true
                this.location_first_disabled = true
              } else {
                this.type_first_disabled = false
                this.date_first_disabled = false
                this.location_first_disabled = false
              }
              this.not_injected_disabled = true
            }

            if (isf0 && isf0 === 'Có') {
              let dates = []
              if (this.diffYear >= 18) {
                dates = this.getRangeDateAvailable(moment(datef0).add(34, 'days'))
              } else {
                dates = this.getRangeDateAvailable(moment(datef0).add(6, 'months'))
              }
              if (dates.length > 0) {
                this.datesAvailable = dates
              } else {
                this.wrongType = 'DATE_F0_WRONG'
                return
              }
            }
          }
          if (this.profile.idbooking) {
            this.checkBookingExist(this.profile.idbooking)
          } else {
            this.loading = false
          }
        }
      }).catch(() => {
        this.loading = false
        this.wrongType = 'PROFILE_NOT_FOUND'
      }).finally(() => {
        this.loading = false
      })

      const params = new URLSearchParams(window.location.search)
      const _source = params.get('by_source')
      const centerId = _source && _source == 'SMS' ? 'BV-TAMANH-HANOI' : 'BV-TAMANH-HCM'

      this.$apis.forms
      .getDateForBooking({
        centerId: centerId,
        from: moment().format('YYYY-MM-DD'),
        to: moment().add(2, 'month').format('YYYY-MM-DD'),
        sortBy: 'for_date',
        sortType: 'ASC'
      })
      .then((res) => {
        if (res.data && res.data.items) {
          let dates = res.data.items.map((item) => {
            return moment(item.for_date).format('YYYY-MM-DD')
          })
          this.datesAvailable = _.uniq(dates)
        }
      }).catch(() => {
      })
    },

    isBenhNenInclude(benhnen) {
      const dsbenhly = [
        'Ung thư',
        'Ghép tạng',
        'HIV',
        'Đang điều trị bằng thuốc corticosteroid hoặc các thuốc ức chế miễn dịch khác',
        'Thiếu hụt miễn dịch'
      ]
      for (const item of dsbenhly) {
        const lowerCase = item.toLocaleLowerCase()
        if (benhnen.toLocaleLowerCase().includes(lowerCase)) {
          return true
        }
      }
      return false
    },

    checkBookingExist (bookingId) {
       this.$apis.forms
      .checkBookingExist({
        form_id: 'VaccineBookingOnline',
        booking_id: bookingId
      })
      .then((res) => {
        if (res?.data && res?.data?.data && res?.data?.data?.length > 0) {
          const bookings = _.orderBy(res?.data?.data, ['booking_date'], ['desc'])
          const {booking_date} = bookings[0]
          const _now = moment(moment().format('YYYY-MM-DD'))
          const _booking_date = moment(booking_date)
          const diff = moment.duration(_now.diff(_booking_date))
          const diffDays = diff.asDays()
          if (diffDays > 7) {
            // show available for booking
          } else {
            this.wrongType = 'BOOKING_EXIST'
          }
          this.bookingResponse = res?.data?.data[0]
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    getExpectInjectTime () {
      const { slot_from } = this.bookingResponse
      return `${this.parseHour(slot_from)}`
    },

    getExpectInjectDate () {
      const { expect_date_inject } = this.bookingResponse
      return moment(expect_date_inject).format('DD/MM/YYYY')
    },

    onBookingDetail () {
      this.wrongType = 'BOOKING_SUCCESS'
      this.finished = true
    },

    parseHour (number) {
      if (!number) return 'Không xác định'
      const nums = number.toString().split('.')
      if (nums.length === 2) {
        return `${this.addZero(nums[0])}:${this.addZero((number - nums[0]) * 60)}`
      }
      return `${this.addZero(number)}:00`
    },

    addZero (num) {
      if (num <= 9) {
        return `0${num}`
      }
      return num
    },

    getDateStr (date, format = 'DD/MM/YYYY') {
      return date ? moment(date).format(format) : date
    },

    getInjectedVaccine () {
      const {
        num_injected,
        inject_type_first,
        inject_date_first,
        inject_location_first,
        inject_type_second,
        inject_date_second,
        inject_location_second
      } = this.form
      const first = {
        order: 1,
        name: inject_type_first,
        date: inject_date_first,
        location: inject_location_first
      }
      const second = {
        order: 2,
        name: inject_type_second,
        date: inject_date_second,
        location: inject_location_second
      }
      if (num_injected == 2) {
        return [first, second]
      }
      return num_injected == 1 ? [first] : []
    }
  }
}
</script>

<style lang="scss" scoped>
.ta-vaccine-booking {
  .ep-ta-branding {
    margin: 0px -16px 16px;
    background-color: #0957DE;
    .ep-branding__logo {
      border-right: none;
      flex: 0 100px;
      margin-right: 0.5em;
      margin-left: 0.2em;
    }
    .ep-ta-vaccine-booking {
      text-transform: none;
      color: #FFFFFF;
      font-size: 15px;
    }
  }
  .row-vaccine-info {
    display: flex;
    border-bottom: 1px solid #ddd;
    align-items: center;
    .eplus-card__icon {
      width: 25px;
    }
  }
  .booking-button-container {
    margin-top: 20px;
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100vw;
    text-align: center;
    padding: 10px 0px 15px;
    background-color: #FAFAFF;
    left: 0px;
    right: 0px;
    .el-button {
      max-width: 640px;
      width: calc(100% - 32px);
      margin: 0px 16px;
    }
  }
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
    .finish-inject-2-actions {
      margin-top: 20px;
      text-align: center;
      position: fixed;
      bottom: 0px;
      width: 100vw;
      text-align: center;
      padding: 10px 0px;
      background-color: #FAFAFF;
      left: 0px;
      right: 0px;
      .el-button--primary {
        background-color: #0957DE;
        border-color: #0957DE;
      }
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
  .booking-detail {
    width: 100%;
    margin-top: 0px;
    margin-bottom: 20px;
    .icon {
      text-align: center;
      img {
        width: 15px !important;
        display: inline-block;
      }
    }
  }
  .next-button {
    width: 100%;
    background-color: #0957DE;
    border-color: #0957DE;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 15px !important;
        margin-left: 10px;
        display: inline-block;
      }
    }
  }
  .is-required-char {
    color: #e5285d;
    padding-left: 3px;
  }
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
        width: 30vw;
      }
      .row-booking-right {
        width: 55vw;
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
.booking-completed-row {
  display: flex;
  align-items: center;
  margin: 0.8rem 0px;
}
.booking-completed-row::after {
    content: '';
    flex: 1;
    margin-left: 1rem;
    height: 1px;
    background-color: #CFCFD0;
}
}
</style>
<style lang="scss">
.ta-vaccine-booking {
  .el-radio-button {
    .el-radio-button__inner {
      padding: 12px;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      background-color: #0957DE;
      border-color: #0957DE;
    }
  }
  .timeslot-booking {
    .expect-timeslot-container {
      display: grid;
      border-radius: 1px solid #eee;
      line-height: 1.4em;
      grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
      grid-gap: 8px;
      .expect-timeslot-item {
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid #DDDFE5;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        .el-radio-button__inner {
          border-left: 1px solid #DCDFE6;
        }
        .slot-available {
          padding: 10px 0px 0px;
        }
        .slot-time {
          padding: 15px 0px 0px;
        }
        -webkit-appearance: none;
        box-shadow: none !important;
        border-left: 1px solid #DCDFE6;
      }
      .is-active {
        .el-radio-button__inner {
          border-radius: 4px !important;
          border-left: 0px !important;
        }
      }
    }
    .timeslot-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-radio-button__inner {
        flex: 1;
        height: 100%;
        padding: 20px;
      }

    }
  }
  .vaccine-input-item {
    .is-disabled {
      input {
        background-color: #FFFFFF !important;
        font-weight: 600;
        color: #000000 !important;
        opacity: 1 !important;
      }
    }
    input {
      background-color: #FFFFFF !important;
      font-weight: 600;
      color: #000000 !important;
      opacity: 1 !important;
    }
  }
  .qr-code-image {
    canvas {
      max-width: 100% !important;
    }
    img {
      width: 100% !important;
    }
  }
}
.expect-date-inject-popper {
  .el-icon-d-arrow-left, .el-icon-d-arrow-right {
    display: none !important;
  }
  .el-picker-panel__icon-btn {
    font-size: 20px !important;
    margin-top: 5px !important;
  }
}
</style>
