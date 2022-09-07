<template lang="pug">
.ep-wrapper.online-booking-survey
  .ep-loading(v-if="loading") Đang tải. Vui lòng đợi...

  .ep-thankyou(v-else-if="finished")
    h2.ep-thankyou__title KHẢO SÁT HOÀN THÀNH!
    .ep-thankyou__body
      p Cảm ơn Quý khách đã tham gia khảo sát.
      dl
        dt Hệ thống Trung tâm Tiêm chủng VNVC
        dd
          a(href="tel:02873006595") Hotline 028 7300 6595

      p Để được phục vụ tốt hơn và nhận nhiều ưu đãi cho lần tiêm tiếp theo, Quý khách vui lòng đăng ký tại đây.

    .ep-thankyou__actions
      div
        a.el-button.el-button--primary(:href="next") ĐĂNG KÝ TIÊM CHỦNG

        a.el-button(:href="home") Trở về Trang chủ
      p
        small
          em (*) VNVC sẽ gửi thông tin về chương trình ưu đãi mới nhất đến Quý khách đã đăng ký.

  el-form.ep-form.ep-form--survey(
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
        h2.ep-branding__title Khảo sát tiêm chủng

    section.ep-section
      .ep-section__title Câu hỏi khảo sát
      .ep-section__description Kính thưa quý khách hàng, với mong muốn phục vụ Quý khách hàng tốt hơn, VNVC tiến hành khảo sát nhanh các vấn đề sau đây, kính mong Quý khách hàng hỗ trợ bằng cách điền thông tin theo hướng dẫn sau:
      .ep-section__body
        el-form-item.ep-piece(
          label="1. Để đảm bảo an toàn phòng dịch và nâng cao chất lượng phục vụ khách hàng tốt hơn, VNVC dự kiến sẽ thực hiện đăng ký và xếp lịch tiêm online trước khi đến tiêm, Quý khách có ủng hộ hình thức này hay không?"
          prop="online_booking_supporting")
          el-radio-group(v-model="form.online_booking_supporting")
            el-radio-button(:label="true" :value="true") Ủng hộ
            el-radio-button(:label="false" :value="false") Không ủng hộ

        el-form-item.ep-piece.ep-push-1(
          v-if="form.online_booking_supporting"
          label="1a. Nếu ủng hộ đăng ký trước khung giờ đến tiêm, Quý khách vui lòng chọn kênh mong muốn đăng ký:"
          prop="online_booking_methods")
          multiple-choices(
            :options="online_booking_methods"
            :value.sync="form.online_booking_methods")

        el-form-item.ep-piece(
          label="2. Nếu VNVC áp dụng Chương trình ưu đãi giá/tặng quà cho Khách hàng đến tiêm sau 13h00 mỗi ngày, Quý khách có đồng ý tham gia hay không?"
          prop="booking_promotions_joining")
          el-radio-group(v-model="form.booking_promotions_joining")
            el-radio-button(:label="true" :value="true") Đồng ý tham gia
            el-radio-button(:label="false" :value="false") Không đồng ý tham gia

        el-form-item.ep-piece.ep-push-1(
          v-if="form.booking_promotions_joining"
          label="2a. Quý khách vui lòng chọn khung giờ mong muốn tiêm:"
          prop="booking_promotions_agrees")
          multiple-choices(
            :options="booking_promotions_agrees"
            :value.sync="form.booking_promotions_agrees")
            template(v-slot:label="{ item }") Từ {{ item[0] }}h00 - {{ item[1] }}h00

        el-form-item.ep-piece.ep-push-1(
          v-if="form.booking_promotions_joining === false"
          label="2b. Quý khách vui lòng cho biết lý do không muốn tham gia:"
          prop="booking_promotions_disagrees")
          multiple-choices(
            allow-other
            :options="booking_promotions_disagrees"
            :value.sync="form.booking_promotions_disagrees"
            :other.sync="form.booking_promotions_other_disagrees")

        el-form-item.ep-piece.ep-push-1(
          label="2c. Vui lòng cho biết lý do anh/chị chọn khung giờ chiều 13h00 - 17h00"
          prop="time_after_13h_reasons"
          v-if="timeAfter13hPreferred")
          multiple-choices(
            allow-other
            :options="time_after_13h_reasons"
            :value.sync="form.time_after_13h_reasons"
            :other.sync="form.time_after_13h_other_reasons")

        el-form-item.ep-piece.ep-push-1(
          label="2d. Vui lòng cho biết lý do anh/chị chọn khung giờ chiều 17h00 - 21h00"
          prop="time_after_17h_reasons"
          v-if="timeAfter17hPreferred")
          multiple-choices(
            allow-other
            :options="time_after_17h_reasons"
            :value.sync="form.time_after_17h_reasons"
            :other.sync="form.time_after_17h_other_reasons")

        el-form-item.ep-piece(
          label="3. Vui lòng cho biết lý do anh/chị lựa chọn tiêm ở VNVC"
          prop="vnvc_reasons")
          multiple-choices(
            allow-other
            :options="vnvc_reasons"
            :value.sync="form.vnvc_reasons"
            :other.sync="form.vnvc_other_reasons")

    section.ep-section
      .ep-section__title Thông tin người khảo sát
      .ep-section__body
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Họ tên người thực hiện" prop="full_name")
              el-input.ep-uppercase(v-model="form.full_name")
          el-col(:sm="12")
            el-form-item(label="Số điện thoại" prop="phone")
              el-input(v-model="form.phone")

        el-form-item(label="Địa chỉ email Anh/Chị muốn nhận chương trình khuyến mãi/ưu đãi" prop="email")
          el-input(v-model="form.email")

    el-button(@click="submit" type="primary" size="large") Hoàn thành khảo sát
</template>

<script>
import Base from './Base'
import logo from '../assets/logo.vnvc.svg'
import * as $v from '../services/validators'
import * as $n from '../services/normalizers'

export default {
  extends: Base,

  props: {
    next: {
      type: String,
      default: 'https://vnvc.vn/dang-ky-tiem-chung/'
    }
  },

  data () {
    return {
      key: 'OnlineBookingSurvey',
      logo,
      rules: {
        online_booking_supporting: $v.required,
        online_booking_methods: $v.required,
        booking_promotions_joining: $v.required,
        booking_promotions_agrees: $v.required,
        booking_promotions_disagrees: $v.required,
        time_after_13h_reasons: $v.required,
        time_after_17h_reasons: $v.required,
        vnvc_reasons: $v.required,
        full_name: [$v.required, ...$v.fullName],
        phone: [$v.required, ...$v.phone],
        email: $v.email
      },
      online_booking_methods: [
        'Qua Website',
        'Qua Zalo',
        'Qua Facebook Fanpage',
        'Qua Tổng đài/Hotline'
      ],
      booking_promotions_agrees: [
        [12, 15],
        [15, 17],
        [17, 19],
        [19, 21]
      ],
      booking_promotions_disagrees: [
        'Không phù hợp lịch sinh hoạt của tôi và gia đình',
        'Nhà ở xa trung tâm VNVC, tiêm buổi chiều không thuận tiện di chuyển',
        'Cần về sớm trước giờ giới nghiêm',
        'Không muốn/ không thể ra đường vào buổi chiều, tối',
        'Không quan tâm đến chương trình ưu đãi giá',
        'Không ngại phải xếp hàng chờ đợi và đông đúc'
      ],
      time_after_13h_reasons: [
        'Khung giờ vắng nên không phải chờ đợi.',
        'Khung giờ vắng có nhiều không gian cho trẻ chơi',
        'Đi tiêm khung giờ được nhận quà và/hoặc ưu đãi giá',
        'Thuận tiện theo lịch sinh hoạt của gia đình'
      ],
      time_after_17h_reasons: [
        'Phải đi làm giờ hành chính',
        'Hết giờ đi học của trẻ',
        'Thời tiết thuận lợi, thoải mái để đi tiêm',
        'Khung giờ vắng nên không phải chờ đợi.',
        'Khung giờ vắng có nhiều không gian cho trẻ chơi',
        'Đi tiêm khung giờ được nhận quà và/hoặc ưu đãi giá',
        'Thuận tiện theo lịch sinh hoạt của gia đình'
      ],
      vnvc_reasons: [
        'Có đủ các loại vắc xin',
        'Quy trình tiêm chủng an toàn',
        'Phòng chống dịch Covid-19 tốt',
        'Bác sĩ, điều dưỡng, nhân viên giỏi',
        'Giá thành hợp lý',
        'Phục vụ tốt, dịch vụ chăm sóc khách hàng cao cấp',
        'Nhiều ưu đãi, khuyến mãi cho khách hàng',
        'Có tin nhắn mời đi tiêm thuận tiện lưu thông, nhắc lịch tiêm, dễ dàng tra cứu \'lịch sử tiêm chủng\'',
        'Có tổng đài chăm sóc Khách hàng dễ dàng tương tác qua điện thoại và facebook'
      ]
    }
  },

  computed: {
    timeAfter13hPreferred () {
      const ranges = this.form.booking_promotions_agrees
      for (const i in ranges)
        if (ranges[i] && ranges[i][0] >= 13 && ranges[i][0] < 17) return true
      return false
    },
    timeAfter17hPreferred () {
      const ranges = this.form.booking_promotions_agrees
      for (const i in ranges)
        if (ranges[i] && ranges[i][0] >= 17) return true
      return false
    }
  },

  watch: {
    'form.online_booking_supporting': {
      handler (val) {
        if (!val) {
          this.form = {
            ...this.form,
            online_booking_methods: []
          }
        }
      }
    },
    'form.booking_promotions_joining': {
      handler (val) {
        if (val) {
          this.form = {
            ...this.form,
            booking_promotions_disagrees: []
          }
        } else {
          this.form = {
            ...this.form,
            booking_promotions_agrees: [],
            time_after_13h_reasons: [],
            time_after_13h_other_reasons: undefined,
            time_after_17h_reasons: [],
            time_after_17h_other_reasons: undefined
          }
        }
      }
    }
  },

  methods: {
    normalize (val) {
      return {
        ...val,
        full_name: $n.fullName(val.full_name)
      }
    },
    reset () {
      this.finished = false
      this.loading = false
      this.submitting = false
      this.form = {
        online_booking_methods: [],
        booking_promotions_agrees: [],
        booking_promotions_disagrees: [],
        time_after_13h_reasons: [],
        time_after_17h_reasons: [],
        vnvc_reasons: []
      }
    }
  }
}
</script>
