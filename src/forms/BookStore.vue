<template lang="pug">
.ep-wrapper.book-store
  .ep-loading(v-if="loading") Đang tải. Vui lòng đợi...
  .ep-thankyou(v-else-if="finished")
    h2.ep-thankyou__title ĐẶT HÀNG THÀNH CÔNG
    .ep-thankyou__body.ep-summary
      section.ep-section.ep-piece
        span Chúc mừng Quý khách đã đặt mua thành công Sách COVID-19 & BỆNH TIM MẠCH. Chúng tôi sẽ tiến hành giao sách trong vòng 10 ngày kể từ ngày đặt mua thành công. Quý khách vui lòng chụp ảnh màn hình hoặc kiểm tra hộp thư điện tử để lưu trữ thông tin đặt mua.
      section.ep-section.ep-piece
        .ep-section__title.summary-receive TỔNG KẾT ĐƠN HÀNG
          el-row(:gutter="20")
            el-col(:sm="14")
              b Covid-19 & Bệnh tim mạch
            el-col(:sm="10")
              b {{getBookPrice()}} x {{this.form.quantity}}
          el-row(:gutter="20")
            el-col(:sm="14")
              span Thành tiền
            el-col(:sm="10")
              b {{getBookPrice(this.form.quantity)}}
          el-row(:gutter="20")
            el-col(:sm="14")
              span Phí vận chuyển
            el-col.row(:sm="10")
              .sale-price {{getShipFee()}}&nbsp;miễn phí
          el-row(:gutter="20")
            el-col(:sm="14")
              span Tổng số tiền (bao gồm VAT)
            el-col(:sm="10")
              b {{getBookTotalPrice()}}
      section.ep-section.ep-piece
        .ep-section__title.summary-receive THÔNG TIN GIAO HÀNG
        el-col
          b {{this.form.full_name_receiver + ' - ' + this.form.phone_receiver}}
        el-col
          span {{getShippingInfo()}}
        el-col
          span {{getTaxInfo()}}
    .ep-thankyou__actions
      div
        a.el-button.el-button--primary(@click="reset") {{'ĐẶT MUA ĐƠN HÀNG MỚI'}}
        a.el-button(:href="home") Trở về Trang chủ

  el-form.ep-form.ep-form--bookstore(
    v-else
    v-loading="submitting"
    ref="form"
    :model="form"
    label-position="top"
    :rules="rules")
    section.ep-branding.ep-ta-branding
      .ep-branding__logo
        img(:src="taLogo")
      .ep-branding__header
        h2.ep-branding__title.ep-ta-branding__title Đăng ký mua sách

    section.ep-section
      .ep-section__description COVID-19 & Bệnh tim mạch được biên soạn bởi đội ngũ chuyên gia giàu kinh nghiệm của Trung tâm Tim mạch, BVĐK Tâm Anh TP.HCM: PGS.TS.BS Phạm Nguyễn Vinh - Giám đốc Trung tâm Tim mạch (chủ biên), TS.BS Nguyễn Anh Dũng - Trưởng khoa Phẫu thuật Tim mạch - Lồng ngực, ThS.BS Huỳnh Thanh Kiều - Trưởng khoa Nội tim mạch, BSCKI Vũ Năng Phúc - Trưởng khoa Tim bẩm sinh, BSCKI Phạm Thục Minh Thủy - Khoa Tim bẩm sinh, BS. Nguyễn Phạm Thùy Linh - Khoa Tim bẩm sinh và ThS.BS Phạm Hoàng Trọng Hiếu - Khoa Thông tim can thiệp.
      .ep-section__description Sách do Bệnh viện Đa khoa Tâm Anh phối hợp cùng Nhà xuất bản Đại học Quốc gia TP.HCM phát hành, gồm 108 trang in màu cung cấp những thông tin khoa học về bệnh lý và chủng ngừa Covid-19 cho mọi đối tượng, đặc biệt là những người mắc bệnh mạn tính như tim mạch, đái tháo đường, bệnh phổi tắc nghẽn mạn tính, suy thận mạn, ung thư...
      .ep-section__description Sách "Covid-19 & Bệnh tim mạch" chính thức phát hành vào ngày 1/10/2021 với số lượng giới hạn. Hãy nhanh tay đặt mua sách ngay từ hôm nay!
    section.ep-section
      .ep-branding__book
        img(:src="book")
      .ep-section__title Tên sách: 
        b COVID-19 & BỆNH TIM MẠCH
      .ep-section__description Đơn giá:&nbsp;
        b 150.000đ

    section.ep-section
      el-form-item(label="Số lượng mua" prop="quantity")
              el-input(v-model="form.quantity")

    section.ep-section.ep-piece
      .ep-section__title THÔNG TIN NGƯỜI MUA
      .ep-section__body
        el-form-item(label="Họ và tên" prop="full_name_buyer")
          el-input.ep-uppercase(v-model="form.full_name_buyer")
        el-form-item(label="Số điện thoại" prop="phone_buyer")
          el-input(v-model="form.phone_buyer")
        el-form-item(label="Email" prop="email_buyer")
          el-input(v-model="form.email_buyer")
        el-form-item(label="Địa chỉ" prop="address_street_buyer")
          el-input.ep-uppercase(v-model="form.address_street_buyer")
        el-row(:gutter="20")
          el-col(:sm="8")
            el-form-item(label="Tỉnh thành" prop="address_province_buyer")
              el-select(
                v-model="form.address_province_buyer"
                @change="onChooseProvinceBuyer"
                :loading="provinces_buyer === null")
                template(v-if="provinces_buyer")
                  el-option(
                    v-for="i, k in provinces_buyer"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
          el-col(:sm="8")
            el-form-item(label="Quận huyện" prop="address_district_buyer")
              el-select(
                v-model="form.address_district_buyer"
                @change="onChooseDistrictBuyer"
                :disabled="!form.address_province_buyer"
                :placeholder="form.address_province_buyer ? 'Chọn' : 'Chọn tỉnh thành trước'")
                template(v-if="districts_buyer")
                  el-option(
                    v-for="i, k in districts_buyer"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
          el-col(:sm="8")
            el-form-item(label="Phường xã" prop="address_ward_buyer")
              el-select(
                v-model="form.address_ward_buyer"
                :disabled="!form.address_district_buyer"
                :placeholder="form.address_district_buyer ? 'Chọn' : 'Chọn quận huyện trước'")
                template(v-if="wards_buyer")
                  el-option(
                    v-for="i, k in wards_buyer"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}

    section.ep-section.ep-piece
      .ep-section__title THÔNG TIN GIAO HÀNG
        el-form-item.ep-sub-title(
            label=""
            prop="is_same_buyer_receivers")
            multiple-choices(
              @change="onChooseIsSame"
              :options="is_same_buyer_receivers"
              :value.sync="is_same_buyer_receiver")
      .ep-section__body
        el-form-item(label="Họ và tên" prop="full_name_receiver")
          el-input.ep-uppercase(v-model="form.full_name_receiver")
        el-form-item(label="Số điện thoại" prop="phone_receiver")
          el-input(v-model="form.phone_receiver")
        el-form-item(
          label="Hình thức nhận hàng"
          prop="method_received")
          single-choice.ep-grid(
            :value.sync="form.method_received"
            :options="method_receiveds")
            template(v-slot:label="{ item }") {{item}}
        el-form-item(label="Địa chỉ" prop="address_street_receiver" v-if="form.method_received == 'Giao sách tận nơi'")
          el-input.ep-uppercase(v-model="form.address_street_receiver")
        el-row(:gutter="20" v-if="form.method_received == 'Giao sách tận nơi'")
          el-col(:sm="8")
            el-form-item(label="Tỉnh thành" prop="address_province_receiver")
              el-select(
                v-model="form.address_province_receiver"
                @change="onChooseProvinceReceiver"
                :loading="provinces_receiver === null")
                template(v-if="provinces_receiver")
                  el-option(
                    v-for="i, k in provinces_receiver"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
          el-col(:sm="8")
            el-form-item(label="Quận huyện" prop="address_district_receiver")
              el-select(
                v-model="form.address_district_receiver"
                @change="onChooseDistrictReceiver"
                :disabled="!form.address_province_receiver"
                :placeholder="form.address_province_receiver ? 'Chọn' : 'Chọn tỉnh thành trước'")
                template(v-if="districts_receiver")
                  el-option(
                    v-for="i, k in districts_receiver"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
          el-col(:sm="8")
            el-form-item(label="Phường xã" prop="address_ward_receiver")
              el-select(
                v-model="form.address_ward_receiver"
                :disabled="!form.address_district_receiver"
                :placeholder="form.address_district_receiver ? 'Chọn' : 'Chọn quận huyện trước'")
                template(v-if="wards_receiver")
                  el-option(
                    v-for="i, k in wards_receiver"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
        el-form-item(label="Ghi chú" prop="note")
            el-input(v-model="form.note" type="textarea")
        el-form-item(
          label="Xuất hoá đơn GTGT"
          prop="export_invoice")
          el-radio-group(v-model="form.export_invoice")
            el-radio-button(:label="true" :value="true") Có
            el-radio-button(:label="false" :value="false") Không

        el-form-item.ep-push-1(
          v-if="form.export_invoice"
          label="Tên công ty"
          prop="company_name")
          el-input.ep-uppercase(v-model="form.company_name")

        el-form-item.ep-push-1(
          v-if="form.export_invoice"
          label="Địa chỉ công ty"
          prop="company_address")
          el-input.ep-uppercase(v-model="form.company_address")

        el-form-item.ep-push-1(
          v-if="form.export_invoice"
          label="Mã số thuế"
          prop="company_tax")
          el-input(v-model="form.company_tax")
    section.ep-sticky-summary-mobile
      el-row.ep-sticky-summary-mobile__row(:gutter="20")
        el-col(style="width: 100%")
          .ep-section__title TỔNG KẾT ĐƠN HÀNG
          .ep-sticky-summary-mobile__description
            b COVID-19 & BỆNH TIM MẠCH
          .ep-sticky-summary-mobile__description Giá:&nbsp;
            b {{getBookPrice(this.form.quantity)}}
          .ep-sticky-summary-mobile__description Phí vận chuyển:&nbsp;
            b {{getShipFee()}}&nbsp;miễn phí
          .ep-sticky-summary-mobile__description Tổng tiền:&nbsp;
            b {{getBookTotalPrice()}}        
    section.ep-sticky-summry
      .ep-section__title COVID-19 & <br>BỆNH TIM MẠCH
      .ep-section__description Giá:&nbsp;
        b {{getBookPrice(this.form.quantity)}}
      .ep-section__description Phí vận chuyển:&nbsp; 
      .ep-section__description
        b {{getShipFee() !== '' ? `${getShipFee()}&nbsp;` : ''}}miễn phí
      .ep-section__description Tổng tiền:&nbsp;
        b {{getBookTotalPrice()}}
    el-button(@click="onSubmitBookStore" type="primary" size="large") GỬI
</template>

<script>
import Base from './Base'
import book from '../assets/book.jpg'
import taLogo from '../assets/ta_logo.png'
import * as $v from '../services/validators'
import * as $n from '../services/normalizers'
import moment from 'moment';

export default {
  extends: Base,
  data () {
    return {
      key: 'BookStore',
      book,
      taLogo,

      provinces_buyer: null,
      districts_buyer: null,
      wards_buyer: null,

      provinces_receiver: null,
      districts_receiver: null,
      wards_receiver: null,
      completed: false,
      is_same_buyer_receiver: [],
      ship_fee_inner: 28000,
      ship_fee_suburbs: 49000,
      price_unit: 150000,
      price_after_discount: 100000,
      rules: {
        quantity: [$v.required, ...$v.quantity],

        full_name_buyer: [$v.required, ...$v.fullName],
        phone_buyer: [$v.required, ...$v.phone],
        email_buyer: $v.email,
        address_street_buyer: [$v.required, ...$v.street],
        address_province_buyer: $v.required,
        address_district_buyer: $v.required,
        address_ward_buyer: $v.required,

        method_received: $v.required,
        full_name_receiver: [$v.required, ...$v.fullName],
        phone_receiver: [$v.required, ...$v.phone],
        address_street_receiver: [$v.required, ...$v.street],
        address_province_receiver: $v.required,
        address_district_receiver: $v.required,
        address_ward_receiver: $v.required,

        method_payment: $v.required,
        company_name: $v.required,
        company_address: $v.required,
        company_tax: $v.required,
      },
      method_payments: [
        'Tiền mặt (COD)',
        'Thẻ thanh toán nội địa (ATM) hoặc thanh toán ngân hàng trực tuyến (internet banking)',
        'Thẻ thanh toán quốc tế (Visa/ Master/ JCB/ UnionPay)',
      ],
      method_receiveds: [
        // 'Nhận sách tại BVĐK Tâm Anh TPHCM 2B Phổ Quang, Quận Tân Bình, Tp. HCM',
        'Giao sách tận nơi'
      ],
      is_same_buyer_receivers: ['Giống thông tin Người mua']
    }
  },

  watch: {

  },

  computed: {

  },

  methods: {
    normalize (val) {
      return {
        ...val,
        full_name_receiver: $n.fullName(val.full_name_receiver),
        full_name_buyer: $n.fullName(val.full_name_buyer),
        address_street_receiver: $n.street(val.address_street_receiver),
        address_street_buyer: $n.street(val.address_street_buyer),
        company_name: $n.fullName(val.company_name),
        company_address: $n.street(val.company_address),
      }
    },
    reset () {
      this.finished = false
      this.loading = false
      this.submitting = false
      this.is_same_buyer_receiver = []
      this.form = {
        quantity: null,
        full_name_buyer: null,
        phone_buyer: null,
        address_street_buyer: null,
        address_province_buyer: null,
        address_district_buyer: null,
        address_ward_buyer: null,

        full_name_receiver: null,
        phone_receiver: null,
        address_street_receiver: null,
        address_province_receiver: null,
        address_district_receiver: null,
        address_ward_receiver: null,
        order_id: null,
        company_name: null,
        company_address: null,
        company_tax: null,
        note: null,
        export_invoice: null,
        transaction: {},
        method_received: 'Giao sách tận nơi',
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
              this.provinces_receiver = res
              this.provinces_buyer = res
            }),
        ])
        .finally(() => {
          this.loading = false
        })
    },
    onChooseIsSame (isChecked) {
      if (isChecked) {
        this.districts_receiver = this.districts_buyer;
        this.wards_receiver = this.wards_buyer;
        this.form = {
          ...this.form,
          full_name_receiver: this.form.full_name_buyer,
          phone_receiver: this.form.phone_buyer,
          address_street_receiver: this.form.address_street_buyer,
          address_province_receiver: this.form.address_province_buyer,
          address_district_receiver: this.form.address_district_buyer,
          address_ward_receiver: this.form.address_ward_buyer,
        }
      }
    },
    onChooseProvinceBuyer (provinceId) {
      this.districts_buyer = null
      this.$set(this.form, 'address_district_buyer', null)
      this.$apis.master
        .getDistrictsList({ provinceId })
        .then(res => {
          this.districts_buyer = res
        })
    },
    onChooseDistrictBuyer (districtId) {
      this.wards_buyer = null
      this.$set(this.form, 'address_ward_buyer', null)
      this.$apis.master
        .getWardsList({ districtId })
        .then(res => {
          this.wards_buyer = res
        })
    },
    onChooseProvinceReceiver (provinceId) {
      this.districts_receiver = null
      this.$set(this.form, 'address_district_receiver', null)
      this.$apis.master
        .getDistrictsList({ provinceId })
        .then(res => {
          this.districts_receiver = res
        })
    },
    onChooseDistrictReceiver (districtId) {
      this.wards_receiver = null
      this.$set(this.form, 'address_ward_receiver', null)
      this.$apis.master
        .getWardsList({ districtId })
        .then(res => {
          this.wards_receiver = res
        })
    },
    getBookPrice (unit = 1) {
      // const {method_payment} = this.form;
      let price = this.price_unit; // method_payment == 'Tiền mặt (COD)' ? 150000 : 135000;
      return this.getCurrencyFormat(price*unit);
    },
    getShipFee (isFormat = true) {
      const {method_received, address_province_receiver} = this.form;
      let shippingfee = 0;
      if (method_received == 'Giao sách tận nơi' && address_province_receiver) {
        shippingfee = address_province_receiver == 79 ? this.ship_fee_inner : this.ship_fee_suburbs;
      }
      if (shippingfee == 0) {
        return '';
      }
      return isFormat ? this.getCurrencyFormat(shippingfee) : shippingfee;
    },
    getBookTotalPrice () {
      const {method_received, address_province_receiver, quantity} = this.form;
      let shippingfee = 0; // method_payment
      if (method_received == 'Giao sách tận nơi' && address_province_receiver) {
        shippingfee = 0;//address_province_receiver == 79 ? this.ship_fee_inner : this.ship_fee_suburbs;
      }
      let price = this.price_unit; // method_payment == 'Tiền mặt (COD)' ? 150000 : 135000;
      price = price * quantity;
      return this.getCurrencyFormat(price + shippingfee);
    },
    getShippingInfo () {
      const {
        method_received,
        address_province_receiver,
        address_street_receiver,
        address_district_receiver,
        address_ward_receiver
      } = this.form;
      if (method_received == 'Giao sách tận nơi') {
        const provinceName = this.getNameByIdInList(this.provinces_receiver, address_province_receiver);
        const districtName = this.getNameByIdInList(this.districts_receiver, address_district_receiver);
        const wardName     = this.getNameByIdInList(this.wards_receiver, address_ward_receiver);
        return `Giao hàng tận nơi: ${address_street_receiver}, ${wardName}, ${districtName}, ${provinceName}`;
      } else {
        return 'Nhận sách tại BVĐK Tâm Anh TPHCM 2B Phổ Quang, Quận Tân Bình, Tp. HCM';
      }
    },
    getTaxInfo () {
      const {export_invoice, company_name, company_address, company_tax} = this.form;
      if (export_invoice) {
        return `Xuất hóa đơn: ${company_name} - ${company_address} - ${company_tax}`;
      } else {
        return 'Không xuất hóa đơn';
      }
    },
    getCurrencyFormat(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `${val} VNĐ`;
    },
    getNameByIdInList(list, id) {
      for(const item of list) {
        if (item?.id === id) return item.name;
      }
      return id;
    },
    getOrderId() {
      const prefix = 'TABUYBOOK';
      const {phone_buyer} = this.form;
      const timeString = moment().format('YYYYMMDDHHmmssSS');
      return `${prefix}${phone_buyer}${timeString}`;
    },
    onSubmitBookStore() {
      this.form = {
        ...this.form,
        price: this.price_unit,
        ship_fee: this.getShipFee(false),
        order_id: this.getOrderId(),
      }
      this.form = this.normalize(this.form);
      this.submit();
    },
    onPaymentOrFinish() {
      //add payment
    }
  }
}
</script>

<style lang="scss" scoped>
.book-store {
  .summary-receive {
    margin-bottom: 1em;
  }
  .row {
    display: flex;
  }
  .sale-price {
    text-decoration: line-through;
  }
  .summary-free-ship {
    text-transform: capitalize;
    font-style: italic;
  }
}

@media only screen and (max-width: 576px) {
  .ep-sticky-summary-mobile {
    display: block;
  }
  
  .ep-sticky-summry {
    display: none;
  }

  .ep-form--bookstore {
    padding-bottom: 100px;
  }
}

@media only screen and (min-width: 576px) {
  .ep-sticky-summary-mobile {
    display: none;
  }
  
  .ep-sticky-summry {
    display: block;
  }

  .ep-form--bookstore {
    padding-bottom: 20px;
  }
}
</style>
