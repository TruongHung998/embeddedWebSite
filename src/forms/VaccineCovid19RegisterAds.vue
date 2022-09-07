<template lang="pug">
.ep__registration-step.ep__registration-step--framed
  el-form.vaccine-covid19-register-userinfo(
    v-loading="loading"
    label-position="top"
    ref="form"
    v-if="page === 'USER_INFO'"
    :model="form"
    :rules="rules")
    .ep__registration-header
      i.user-profile-icon
        <svg width="162" height="172" viewBox="0 0 162 172" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M81.5 0.083252C72.5586 0.083252 63.8181 2.73467 56.3836 7.70223C48.9491 12.6698 43.1547 19.7304 39.7329 27.9911C36.3112 36.2518 35.416 45.3417 37.1603 54.1113C38.9047 62.8808 43.2104 70.9362 49.5329 77.2587C55.8554 83.5812 63.9107 87.8869 72.6803 89.6313C81.4499 91.3756 90.5397 90.4803 98.8005 87.0586C107.061 83.6369 114.122 77.8425 119.089 70.408C124.057 62.9735 126.708 54.2329 126.708 45.2916C126.708 33.3016 121.945 21.8027 113.467 13.3245C104.989 4.84626 93.49 0.083252 81.5 0.083252V0.083252ZM81.5 72.4166C76.1352 72.4166 70.8908 70.8257 66.4302 67.8452C61.9695 64.8647 58.4928 60.6283 56.4398 55.6719C54.3867 50.7154 53.8496 45.2615 54.8962 39.9998C55.9428 34.738 58.5262 29.9048 62.3197 26.1113C66.1132 22.3178 70.9464 19.7344 76.2082 18.6878C81.4699 17.6412 86.9238 18.1783 91.8803 20.2314C96.8367 22.2844 101.073 25.7611 104.054 30.2217C107.034 34.6824 108.625 39.9268 108.625 45.2916C108.625 52.4856 105.767 59.3849 100.68 64.4719C95.5934 69.5588 88.694 72.4166 81.5 72.4166V72.4166ZM162.875 171.875V162.833C162.875 146.047 156.207 129.949 144.337 118.079C132.468 106.21 116.369 99.5416 99.5833 99.5416H63.4167C46.6307 99.5416 30.5322 106.21 18.6627 118.079C6.79321 129.949 0.125 146.047 0.125 162.833V171.875H18.2083V162.833C18.2083 150.843 22.9713 139.344 31.4495 130.866C39.9278 122.388 51.4267 117.625 63.4167 117.625H99.5833C111.573 117.625 123.072 122.388 131.55 130.866C140.029 139.344 144.792 150.843 144.792 162.833V171.875H162.875Z" fill="#E9ECF4"/></svg>
      el-row(:gutter="20", style="display: flex; align-items: center;")
        el-col(style="width: auto;")
          i
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.43512 21.7314C4.60711 21.9034 4.84039 22 5.08363 22C5.32687 22 5.56015 21.9034 5.73214 21.7314C5.90414 21.5594 6.00076 21.3261 6.00076 21.0829C6.00076 20.8396 5.90414 20.6063 5.73214 20.4344L4.54741 19.2496L7.37519 16.4218L10.8515 19.8981C11.0235 20.0701 11.2568 20.1668 11.5 20.1668C11.7432 20.1668 11.9765 20.0701 12.1485 19.8981C12.3205 19.7261 12.4171 19.4929 12.4171 19.2496C12.4171 19.0064 12.3205 18.7731 12.1485 18.6011L11.4221 17.8747L18.0264 11.2681C18.2828 11.0138 18.4862 10.711 18.6246 10.3774C18.7631 10.0438 18.8339 9.68606 18.833 9.32487L18.833 4.97091L22.2314 1.56565C22.4034 1.39365 22.5 1.16037 22.5 0.917136C22.5 0.673897 22.4034 0.44062 22.2314 0.268624C22.0594 0.096628 21.8261 1.2601e-06 21.5829 1.23884e-06C21.3396 1.21757e-06 21.1064 0.0966279 20.9344 0.268624L17.536 3.66701L13.182 3.66701C12.8208 3.66607 12.463 3.73689 12.1295 3.87536C11.7959 4.01383 11.4931 4.21719 11.2388 4.47364L4.62532 11.0779L3.89889 10.3515C3.81373 10.2663 3.71263 10.1988 3.60135 10.1527C3.49008 10.1066 3.37082 10.0829 3.25038 10.0829C3.12994 10.0829 3.01068 10.1066 2.89941 10.1527C2.78814 10.1988 2.68703 10.2663 2.60187 10.3515C2.51671 10.4367 2.44915 10.5378 2.40306 10.649C2.35697 10.7603 2.33325 10.8796 2.33325 11C2.33325 11.1204 2.35697 11.2397 2.40306 11.351C2.44915 11.4622 2.51671 11.5633 2.60187 11.6485L6.07817 15.1248L3.25038 17.9526L2.06565 16.7679C1.89365 16.5959 1.66037 16.4992 1.41713 16.4992C1.17389 16.4992 0.940618 16.5959 0.768622 16.7679C0.596626 16.9399 0.499999 17.1731 0.499999 17.4164C0.499999 17.6596 0.596626 17.8929 0.768621 18.0649L4.43512 21.7314ZM7.8335 10.4638L9.01824 11.6485C9.19024 11.8205 9.42351 11.9171 9.66675 11.9171C9.90999 11.9171 10.1433 11.8205 10.3153 11.6485C10.4873 11.4765 10.5839 11.2432 10.5839 11C10.5839 10.7568 10.4873 10.5235 10.3153 10.3515L9.13053 9.16675L10.5834 7.7139L11.7681 8.89864C11.9401 9.07064 12.1734 9.16726 12.4166 9.16726C12.6599 9.16726 12.8931 9.07064 13.0651 8.89864C13.2371 8.72664 13.3338 8.49337 13.3338 8.25013C13.3338 8.00689 13.2371 7.77361 13.0651 7.60162L11.8804 6.41688L12.5266 5.76837C12.6118 5.68327 12.7129 5.6158 12.8242 5.56979C12.9355 5.52379 13.0547 5.50016 13.1751 5.50026L16.9997 5.50026L16.9997 9.32487C16.9998 9.44528 16.9762 9.56453 16.9302 9.6758C16.8842 9.78707 16.8167 9.88819 16.7316 9.97338L10.1251 16.5777L5.92234 12.3749L7.8335 10.4638Z" fill="#13339C"/>
            </svg>
        el-col(style="width: auto;")
          span.registration_injection_ta_label Đăng ký tiêm vắc xin COVID-19 tại&nbsp;
          a.registration_injection_ta_label(href="https://tamanhhospital.vn/", style="text-decoration: none;") BVĐK Tâm Anh
      h1.registration_injection_h1 Thông tin người tiêm
      p.registration_injection_note Dành cho người cao tuổi (trên 65 tuổi), người trên 18 tuổi có bệnh lý nền, phụ nữ mang thai và tiêm mũi 4 cho người từ 50 tuổi ưu tiên có bệnh lý nền.

    section
      el-row(:gutter="20")
        el-col(:sm="12")
          el-form-item(label="Số di động người tiêm/người giám hộ" prop="phone")
            el-input(v-model="form.phone" ref="focus")

        el-col(:sm="12")
          el-form-item(label="Mã số khách hàng tại Tâm Anh (nếu có)" prop="pid")
            el-input(v-model="form.pid")

      el-row(:gutter="20")
        el-col(:sm="12")
          el-form-item(label="Họ tên người tiêm" prop="name")
            el-input.ep-uppercase(v-model="form.name")

        el-col(:sm="12")
          el-form-item(label="Ngày sinh người tiêm" prop="birthday")
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
        el-col(:sm="12", v-if="false")
          el-form-item(label="Ngày sinh người tiêm" prop="birthday")
            el-date-picker(
                v-model="form.birthday"
                @change="onBirthday"
                popper-class="picker-date-custom-classed"
                :picker-options="birthdayOptions")
      el-button.button-icon-next(
        @click="lookup"
        v-if="is_searching"
        type="primary") TIẾP TỤC
          i
            <svg width="14" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.293 12.293L6.707 13.707L13.414 7L6.707 0.292999L5.293 1.707L9.586 6H0V8H9.586L5.293 12.293Z" fill="white"/>
            </svg>
    section(v-if="!is_searching")
      el-row(:gutter="20")
        el-col(:sm="12")
          el-form-item(label="Giới tính" prop="gender")
            single-choice(
              :value.sync="form.gender"
              :options="genders")
              template(v-slot:label="{ item }") {{ item }}
        el-col(:sm="12")
          el-form-item(label="Quốc tịch" prop="country_code")
            el-select(v-model="form.country_code")
              template
                el-option(
                    v-for="i, k in countrys"
                    :key="k"
                    :value="i.MAQG"
                    :label="i.TENQG") {{ i.TENQG }}

      .heading-page THÔNG TIN NGƯỜI LIÊN HỆ
      section
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Họ tên người liên hệ" prop="name_contact")
              el-input.ep-uppercase(v-model="form.name_contact")
          el-col(:sm="12")
            el-form-item(label="Mối quan hệ với người tiêm" prop="relation_contact")
              el-select(v-model="form.relation_contact")
                template
                  el-option(
                      v-for="i, k in relations"
                      :key="k"
                      :value="i"
                      :label="i") {{ i }}
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Số di động người liên hệ" prop="phone_contact")
              el-input(v-model="form.phone_contact")
      .heading-page ĐỊA CHỈ CỤ THỂ ĐANG SINH SỐNG
      section
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Tỉnh thành" prop="province_id")
              el-select(
                v-model="form.province_id"
                :loading="provinces === null")
                template(v-if="provinces")
                  el-option(
                    v-for="i, k in provinces"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}

          el-col(:sm="12")
            el-form-item(label="Quận huyện" prop="district_id")
              el-select(
                v-model="form.district_id"
                :disabled="!form.province_id"
                :placeholder="form.province_id ? 'Chọn' : 'Chọn tỉnh thành trước'")
                template(v-if="districts")
                  el-option(
                    v-for="i, k in districts"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Phường xã" prop="war_id")
              el-select(
                v-model="form.war_id"
                :disabled="!form.district_id"
                :placeholder="form.district_id ? 'Chọn' : 'Chọn quận huyện trước'")
                template(v-if="wards")
                  el-option(
                    v-for="i, k in wards"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
          el-col(:sm="12")
            el-form-item(label="Số nhà, tên đường" prop="address")
              el-input.ep-uppercase(v-model="form.address")

      .heading-page(v-if="isShowCMND") CMND/CCCD/PASSPORT NGƯỜI TIÊM
      section(v-if="isShowCMND")
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Số CMND/CCCD/Passport" prop="cmnd")
              el-input.ep-uppercase(v-model="form.cmnd", placeholder="Nhập số")

          el-col(:sm="12")
            el-form-item(label="Ngày cấp" prop="cmnd_date")
              el-date-picker(
                  v-model="form.cmnd_date"
                  popper-class="picker-date-custom-classed"
                  :picker-options="birthdayOptions")
        el-row(:gutter="20")
          el-col(:sm="12")
            el-form-item(label="Nơi cấp" prop="cmnd_location")
              el-input.ep-uppercase(v-model="form.cmnd_location" placeholder="Nhập nơi cấp")

      .heading-page BẠN ĐÃ TIÊM VẮC XIN COVID-19 CHƯA?
      section
        el-form-item(label="" prop="inject_num")
            single-choice(
              :value.sync="form.inject_num"
              :options="injects")
              template(v-slot:label="{ item }") {{ item }}
        el-row(:gutter="20", v-if="form.inject_num && form.inject_num.includes('Đã tiêm')")
          el-col(:sm="3")
            el-form-item.inject-num-label(label="MŨI 1")
          el-col(:sm="7")
            el-form-item(label="" prop="vaccine_name_1")
              el-select(
                v-model="form.vaccine_name_1"
                :disabled="mui1_disable"
                @change="vaccineNameChange()"
                clearable
                placeholder="Chọn loại vắc xin")
                template
                  el-option(
                    v-for="i, k in vaccines"
                    :key="k"
                    :value="i"
                    :label="i") {{ i }}
          el-col(:sm="7")
            el-form-item(prop="vaccine_date_1")
              el-date-picker(
                  :disabled="mui1_disable"
                  v-model="form.vaccine_date_1"
                  popper-class="picker-date-custom-classed"
                  placeholder="Chọn ngày tiêm"
                  @change="vaccineDateChange()"
                  :picker-options="vaccineInjections1")
          el-col(:sm="7")
            el-form-item(label="" prop="vaccine_location_1")
              el-input.ep-uppercase(
                :disabled="mui1_disable"
                clearable
                v-model="form.vaccine_location_1"
                placeholder="Điền nơi tiêm")
        div(style="margin-bottom: 20px; font-style: italic; color: #ffc107;", v-if="mui1_disable && form.inject_num && form.inject_num.includes('Đã tiêm')") Bạn không thể cập nhật mũi 1 vì đây là mũi tiêm tại Bệnh viện
        el-row(:gutter="20", v-if="form.inject_num === 'Đã tiêm mũi 2'")
          el-col(:sm="3")
            el-form-item.inject-num-label(label="MŨI 2")
          el-col(:sm="7")
            el-form-item(label="" prop="vaccine_name_2")
              el-select(
                :disabled="mui2_disable"
                clearable
                v-model="form.vaccine_name_2"
                placeholder="Chọn loại vắc xin")
                template
                  el-option(
                    v-for="i, k in vaccines2"
                    :key="k"
                    :value="i"
                    :label="i") {{ i }}
          el-col(:sm="7")
            el-form-item(prop="vaccine_date_2")
              el-date-picker(
                :disabled="mui2_disable"
                v-model="form.vaccine_date_2"
                popper-class="picker-date-custom-classed"
                placeholder="Chọn ngày tiêm"
                :picker-options="vaccineInjections2")
          el-col(:sm="7")
            el-form-item(label="" prop="vaccine_location_2")
              el-input.ep-uppercase(
                :disabled="mui2_disable"
                clearable
                v-model="form.vaccine_location_2"
                placeholder="Điền nơi tiêm")
        div(style="margin-bottom: 20px; font-style: italic; color: #ffc107;", v-if="mui2_disable && form.inject_num === 'Đã tiêm mũi 2'") Bạn không thể cập nhật mũi 2 vì đây là mũi tiêm tại Bệnh viện
        .vaccine-inject-note(v-if="form.inject_num && form.inject_num.includes('Đã tiêm')") Quý khách vui lòng mang theo Giấy xác nhận đã tiêm vắc xin COVID-19 khi đến tiêm vắc xin tại Bệnh viện
      .heading-page CHỌN ĐỊA ĐIỂM MONG MUỐN TIÊM
      section
        el-form-item(prop="location")
          single-choice(
            :value.sync="form.location"
            :options="locations")
            template(v-slot:label="{ item }")
              b {{ item.name }}
              br
              span.address_hospital(style="padding-left: 25px") {{ item.address }}
      el-button.button-icon-next(
        @click="nextPage()"
        type="primary") TIẾP TỤC
          i
            <svg width="14" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.293 12.293L6.707 13.707L13.414 7L6.707 0.292999L5.293 1.707L9.586 6H0V8H9.586L5.293 12.293Z" fill="white"/>
            </svg>
  el-form.vaccine-covid19-register-userinfo(
    v-loading="loading"
    label-position="top"
    ref="form"
    v-if="page === 'MEDICAL_INPUT'"
    :model="form"
    :rules="rules")
    .ep__registration-header
      i.user-profile-icon
        <svg width="163" height="181" viewBox="0 0 163 181" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M144.792 9.12492H124.448C124.448 6.72692 123.495 4.42714 121.8 2.73149C120.104 1.03585 117.804 0.083252 115.406 0.083252H47.5938C45.1958 0.083252 42.896 1.03585 41.2003 2.73149C39.5047 4.42714 38.5521 6.72692 38.5521 9.12492H18.2083C8.23537 9.12492 0.125 17.2353 0.125 27.2083V162.833C0.125 172.806 8.23537 180.917 18.2083 180.917H144.792C154.765 180.917 162.875 172.806 162.875 162.833V27.2083C162.875 17.2353 154.765 9.12492 144.792 9.12492ZM144.792 162.833H18.2083V27.2083H36.2917V45.2916H126.708V27.2083H144.792V162.833Z" fill="#E9ECF4"/>
        </svg>
      el-row(:gutter="20", style="display: flex; align-items: center;")
        el-col(style="width: auto;")
          i
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.43512 21.7314C4.60711 21.9034 4.84039 22 5.08363 22C5.32687 22 5.56015 21.9034 5.73214 21.7314C5.90414 21.5594 6.00076 21.3261 6.00076 21.0829C6.00076 20.8396 5.90414 20.6063 5.73214 20.4344L4.54741 19.2496L7.37519 16.4218L10.8515 19.8981C11.0235 20.0701 11.2568 20.1668 11.5 20.1668C11.7432 20.1668 11.9765 20.0701 12.1485 19.8981C12.3205 19.7261 12.4171 19.4929 12.4171 19.2496C12.4171 19.0064 12.3205 18.7731 12.1485 18.6011L11.4221 17.8747L18.0264 11.2681C18.2828 11.0138 18.4862 10.711 18.6246 10.3774C18.7631 10.0438 18.8339 9.68606 18.833 9.32487L18.833 4.97091L22.2314 1.56565C22.4034 1.39365 22.5 1.16037 22.5 0.917136C22.5 0.673897 22.4034 0.44062 22.2314 0.268624C22.0594 0.096628 21.8261 1.2601e-06 21.5829 1.23884e-06C21.3396 1.21757e-06 21.1064 0.0966279 20.9344 0.268624L17.536 3.66701L13.182 3.66701C12.8208 3.66607 12.463 3.73689 12.1295 3.87536C11.7959 4.01383 11.4931 4.21719 11.2388 4.47364L4.62532 11.0779L3.89889 10.3515C3.81373 10.2663 3.71263 10.1988 3.60135 10.1527C3.49008 10.1066 3.37082 10.0829 3.25038 10.0829C3.12994 10.0829 3.01068 10.1066 2.89941 10.1527C2.78814 10.1988 2.68703 10.2663 2.60187 10.3515C2.51671 10.4367 2.44915 10.5378 2.40306 10.649C2.35697 10.7603 2.33325 10.8796 2.33325 11C2.33325 11.1204 2.35697 11.2397 2.40306 11.351C2.44915 11.4622 2.51671 11.5633 2.60187 11.6485L6.07817 15.1248L3.25038 17.9526L2.06565 16.7679C1.89365 16.5959 1.66037 16.4992 1.41713 16.4992C1.17389 16.4992 0.940618 16.5959 0.768622 16.7679C0.596626 16.9399 0.499999 17.1731 0.499999 17.4164C0.499999 17.6596 0.596626 17.8929 0.768621 18.0649L4.43512 21.7314ZM7.8335 10.4638L9.01824 11.6485C9.19024 11.8205 9.42351 11.9171 9.66675 11.9171C9.90999 11.9171 10.1433 11.8205 10.3153 11.6485C10.4873 11.4765 10.5839 11.2432 10.5839 11C10.5839 10.7568 10.4873 10.5235 10.3153 10.3515L9.13053 9.16675L10.5834 7.7139L11.7681 8.89864C11.9401 9.07064 12.1734 9.16726 12.4166 9.16726C12.6599 9.16726 12.8931 9.07064 13.0651 8.89864C13.2371 8.72664 13.3338 8.49337 13.3338 8.25013C13.3338 8.00689 13.2371 7.77361 13.0651 7.60162L11.8804 6.41688L12.5266 5.76837C12.6118 5.68327 12.7129 5.6158 12.8242 5.56979C12.9355 5.52379 13.0547 5.50016 13.1751 5.50026L16.9997 5.50026L16.9997 9.32487C16.9998 9.44528 16.9762 9.56453 16.9302 9.6758C16.8842 9.78707 16.8167 9.88819 16.7316 9.97338L10.1251 16.5777L5.92234 12.3749L7.8335 10.4638Z" fill="#13339C"/>
            </svg>
        el-col(style="width: auto;")
          span.registration_injection_ta_label Đăng ký tiêm vắc xin COVID-19 tại BVĐK Tâm Anh
      h1.registration_injection_h1 Thông tin y khoa & bệnh lý
      p.registration_injection_note Dành cho người cao tuổi (trên 65 tuổi), người trên 18 tuổi có bệnh lý nền, phụ nữ mang thai và tiêm mũi 3 cho người từ 50 tuổi ưu tiên có bệnh lý nền.
    section
      el-row(:gutter="20")
        el-col
          el-form-item(label="Vui lòng chọn đối tượng phù hợp với tình trạng người được tiêm" prop="injected_subject")
            single-choice.ep-grid(
                :value.sync="form.injected_subject"
                @change="changeInjectSubject"
                :options="getInjectSubject()")
                template(v-slot:label="{ item }") {{ item.name }}
      el-row(:gutter="20")
        el-col(:sm="24")
          el-form-item(label="Quý khách vui lòng ghi rõ tình trạng sức khoẻ của mình" prop="benhnen")
            single-choice(
                :value.sync="form.benhnen"
                @change="changeHealthCondition"
                :options="health_conditions")
                template(v-slot:label="{ item }") {{ item }}
      el-row(:gutter="20", v-if="form.benhnen == 'Có bệnh lý nền'")
        el-col(:sm="24")
          el-form-item(label="Nhập các loại bệnh lý gặp phải" prop="dsbenhnen")
            el-input(type="textarea" rows="3" v-model="form.dsbenhnen")
      el-row(:gutter="20")
        el-col(:sm="24")
          el-form-item(label="Người tiêm đã từng là F0?" prop="is_f0")
            single-choice(
                :value.sync="form.is_f0"
                :options="boolean_list")
                template(v-slot:label="{ item }") {{ item }}
      el-row(:gutter="20", v-if="form.is_f0 == 'Có'")
          el-col(:sm="8")
            el-form-item.inject-num-label(label="Ngày hoàn tất điều trị F0")
          el-col(:sm="10")
            el-form-item(prop="f0_date")
              el-date-picker(
                  v-model="form.f0_date"
                  popper-class="picker-date-custom-classed"
                  placeholder="Chọn ngày hoàn tất điều trị F0"
                  :picker-options="birthdayOptions")
      el-row(:gutter="20", v-if='false')
        el-col(:sm="24")
          el-form-item(label="14 ngày gần đây, Quý khách có sử dụng thuốc kháng sinh hoặc tiêm bất kỳ loại vắc xin nào không?" prop="dungthuoc_khangsinh_14ngay")
            single-choice(
                :value.sync="form.dungthuoc_khangsinh_14ngay"
                :options="boolean_list")
                template(v-slot:label="{ item }") {{ item }}
      el-row(:gutter="20", v-if='false')
        el-col(:sm="24")
          el-form-item(label="Quý khách có mong muốn đăng ký khám chuyên khoa khác cùng ngày hay không?" prop="dkkham_khoakhac")
            single-choice(
                :value.sync="form.dkkham_khoakhac"
                :options="boolean_list")
                template(v-slot:label="{ item }") {{ item }}
      el-row(:gutter="20", v-if="false && form.injected_subject && form.injected_subject.id === 'PREGNANT_WOMEN'")
        el-col(:sm="24")
          el-form-item(label="Người được tiêm có đang mang thai hay không?" prop="is_pregnant")
            single-choice(
                :value.sync="form.is_pregnant"
                :options="boolean_list")
                template(v-slot:label="{ item }") {{ item }}
      el-row(:gutter="20", v-if="form.injected_subject && form.injected_subject.id === 'PREGNANT_WOMEN'")
        el-col(:sm="24")
          el-form-item(label="Vui lòng nhập tuần thai người được tiêm" prop="pregnant_week")
            el-input(
                v-model="form.pregnant_week"
                placeholder="Nhập số tuần thai")
      el-row(:gutter="20", v-if="form.injected_subject && form.injected_subject.id === 'PREGNANT_WOMEN'")
        el-col(:sm="24")
          el-form-item(label="Người được tiêm có từng sinh con ở BV Tâm Anh hay không?" prop="is_birth_ta")
            single-choice(
                :value.sync="form.is_birth_ta"
                :options="boolean_list")
                template(v-slot:label="{ item }") {{ item }}
      el-row(:gutter="20", v-if="form.injected_subject && form.injected_subject.id === 'PREGNANT_WOMEN' && form.is_birth_ta == 'Có'")
          el-col(:sm="8")
            el-form-item.inject-num-label(label="Ngày sinh")
          el-col(:sm="10")
            el-form-item(prop="born_date")
              el-date-picker(
                  v-model="form.born_date"
                  popper-class="picker-date-custom-classed"
                  placeholder="Chọn ngày sinh"
                  :picker-options="birthdayOptions")
      el-row
        el-button.back-button-userinfo(@click="page = 'USER_INFO'") QUAY LẠI
        el-button.button-icon-next(
          @click="onSummary"
          type="primary") TIẾP TỤC
            i
              <svg width="14" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.293 12.293L6.707 13.707L13.414 7L6.707 0.292999L5.293 1.707L9.586 6H0V8H9.586L5.293 12.293Z" fill="white"/>
              </svg>
  el-form.vaccine-covid19-register-success(
    v-loading="loading"
    label-position="top"
    ref="form"
    v-if="page === 'REGISTER_SUCCESS'"
    :model="form"
    :rules="rules")
    .ep__registration-header
      el-row(:gutter="20", style="display: flex; align-items: center;")
        el-col(style="width: auto;")
          i.user-profile-icon
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.43512 21.7314C4.60711 21.9034 4.84039 22 5.08363 22C5.32687 22 5.56015 21.9034 5.73214 21.7314C5.90414 21.5594 6.00076 21.3261 6.00076 21.0829C6.00076 20.8396 5.90414 20.6063 5.73214 20.4344L4.54741 19.2496L7.37519 16.4218L10.8515 19.8981C11.0235 20.0701 11.2568 20.1668 11.5 20.1668C11.7432 20.1668 11.9765 20.0701 12.1485 19.8981C12.3205 19.7261 12.4171 19.4929 12.4171 19.2496C12.4171 19.0064 12.3205 18.7731 12.1485 18.6011L11.4221 17.8747L18.0264 11.2681C18.2828 11.0138 18.4862 10.711 18.6246 10.3774C18.7631 10.0438 18.8339 9.68606 18.833 9.32487L18.833 4.97091L22.2314 1.56565C22.4034 1.39365 22.5 1.16037 22.5 0.917136C22.5 0.673897 22.4034 0.44062 22.2314 0.268624C22.0594 0.096628 21.8261 1.2601e-06 21.5829 1.23884e-06C21.3396 1.21757e-06 21.1064 0.0966279 20.9344 0.268624L17.536 3.66701L13.182 3.66701C12.8208 3.66607 12.463 3.73689 12.1295 3.87536C11.7959 4.01383 11.4931 4.21719 11.2388 4.47364L4.62532 11.0779L3.89889 10.3515C3.81373 10.2663 3.71263 10.1988 3.60135 10.1527C3.49008 10.1066 3.37082 10.0829 3.25038 10.0829C3.12994 10.0829 3.01068 10.1066 2.89941 10.1527C2.78814 10.1988 2.68703 10.2663 2.60187 10.3515C2.51671 10.4367 2.44915 10.5378 2.40306 10.649C2.35697 10.7603 2.33325 10.8796 2.33325 11C2.33325 11.1204 2.35697 11.2397 2.40306 11.351C2.44915 11.4622 2.51671 11.5633 2.60187 11.6485L6.07817 15.1248L3.25038 17.9526L2.06565 16.7679C1.89365 16.5959 1.66037 16.4992 1.41713 16.4992C1.17389 16.4992 0.940618 16.5959 0.768622 16.7679C0.596626 16.9399 0.499999 17.1731 0.499999 17.4164C0.499999 17.6596 0.596626 17.8929 0.768621 18.0649L4.43512 21.7314ZM7.8335 10.4638L9.01824 11.6485C9.19024 11.8205 9.42351 11.9171 9.66675 11.9171C9.90999 11.9171 10.1433 11.8205 10.3153 11.6485C10.4873 11.4765 10.5839 11.2432 10.5839 11C10.5839 10.7568 10.4873 10.5235 10.3153 10.3515L9.13053 9.16675L10.5834 7.7139L11.7681 8.89864C11.9401 9.07064 12.1734 9.16726 12.4166 9.16726C12.6599 9.16726 12.8931 9.07064 13.0651 8.89864C13.2371 8.72664 13.3338 8.49337 13.3338 8.25013C13.3338 8.00689 13.2371 7.77361 13.0651 7.60162L11.8804 6.41688L12.5266 5.76837C12.6118 5.68327 12.7129 5.6158 12.8242 5.56979C12.9355 5.52379 13.0547 5.50016 13.1751 5.50026L16.9997 5.50026L16.9997 9.32487C16.9998 9.44528 16.9762 9.56453 16.9302 9.6758C16.8842 9.78707 16.8167 9.88819 16.7316 9.97338L10.1251 16.5777L5.92234 12.3749L7.8335 10.4638Z" fill="#13339C"/>
            </svg>
        el-col(style="width: auto;")
          span.registration_injection_ta_label Đăng ký tiêm vắc xin COVID-19 tại BVĐK Tâm Anh
      h1.registration_injection_h1 Hoàn thành đăng ký
    section
      div
        p(v-if="form.location.id === 'BV-TAMANH-HCM'") Cảm ơn Quý khách hàng đã đăng ký thông tin. Hệ thống sẽ sắp xếp lịch tiêm và nhắn tin đặt hẹn đến Quý khách qua&nbsp;
          a(style="font-weight: bold;", href="https://oa.zalo.me/4356537378985331656") Kênh Zalo chính thức của BVĐK Tâm Anh
          span &nbsp;hoặc tin nhắn.
        p(v-if="form.location.id === 'BV-TAMANH-HN'") Cảm ơn Quý khách hàng đã đăng ký thông tin. Hệ thống sẽ sắp xếp lịch tiêm và bệnh viện sẽ liên hệ đặt hẹn đến Quý khách trong thời gian sớm nhất.
      p Người được mời tiêm phải có xác nhận đặt hẹn hợp lệ từ BVĐK Tâm Anh để làm căn cứ được phục vụ tiêm chủng và có mặt tại Bệnh viện theo giờ được hẹn. Người đến tiêm chủng cần trình diện CMND/CCCD/Passport có thông tin trùng với thông tin đã đăng ký và xác nhận đặt hẹn.
      el-col
        .ep-section__description.inject_info_title Đăng ký tiêm tại
        p(style="color: #0957DE; font-weight: 700; font-size: 16px; margin-top: 5px; margin-bottom: 10px;") {{ form.location.id === 'BV-TAMANH-HN' ? 'BỆNH VIỆN ĐA KHOA TÂM ANH HÀ NỘI' : 'BỆNH VIỆN ĐA KHOA TÂM ANH TP.HCM' }}
        p(style="margin-top: 5px; margin-bottom: 10px;") {{ form.location.id === 'BV-TAMANH-HN' ? '108 Hoàng Như Tiếp, Bồ Đề, Long Biên, Hà Nội' : '2B Phổ Quang, Phường 2, Tân Bình, TP. HCM' }}
      el-col
        .ep-section__description.inject_info_title Thông tin đăng ký
        p(style="color: #0957DE; font-weight: 700; font-size: 16px; margin-top: 5px; margin-bottom: 10px;") {{ `${form.name.toUpperCase()}, ${form.phone}` }}
        p(v-if="form.pid", style="margin-top: 5px; margin-bottom: 10px;") PID:&nbsp;
          b {{ form.pid }}
        p(style="margin-top: 5px; margin-bottom: 10px;") {{ getPidBirthday() }}
        p(v-if="form.cmnd || form.cmnd_date || form.cmnd_location", style="margin-top: 5px; margin-bottom: 10px;") CMND&nbsp;{{  `${form.cmnd}, cấp ngày ${getDateStr(form.cmnd_date)}, tại ${form.cmnd_location.toUpperCase()}` }}
        p(style="margin-top: 5px; margin-bottom: 10px;") {{ getAddressFull() }}
      el-col
        .ep-section__description.inject_info_title Thông tin y khoa & bệnh lý
        p(style="color: #0957DE; font-weight: 700; font-size: 16px; margin-top: 5px; margin-bottom: 10px;") {{ `${form.injected_subject.name} / ${form.benhnen}` }}
        p(v-if="getListVaccine().length > 0", style="margin-top: 5px; margin-bottom: 10px;")
          b Đã tiêm mũi&nbsp;{{ getListVaccine().length }}
          ul(style="margin-block-start: 0em; padding-inline-start: 20px;")
            li(v-for="i, k in getListVaccine()" :key="k")
              div(style="display: flex; align-items: center;")
                p(style="margin-top: 5px; margin-bottom: 10px;") {{ `Mũi tiêm ${i.order}, vào ngày ${getDateStr(i.date)} ${getEnumVaccine(i.name)} tại ${i.location.toUpperCase()}` }}
      p Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác và không có đủ các điều kiện kể trên. Vì hệ thống sẽ tự động loại các thông tin trùng khớp nên mỗi khách hàng chỉ cần đăng ký một lần duy nhất.
      p Chi tiết Quy định về việc tiêm vắc xin phòng Covid-19 tại Bệnh viện Đa khoa Tâm Anh Tp. HCM, vui lòng đọc&nbsp;
        a(href="https://tamanhhospital.vn/tam-anh-tiem-vac-xin-ngua-covid-19-cho-nguoi-cao-tuoi-benh-nen/") tại đây.
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

</template>

<script>
import moment from 'moment'
import * as $v from '../services/validators'
import * as $n from '../services/normalizers'
import Base from './Base'
import taLogo from '../assets/ta_logo.png'
import { MessageBox } from 'element-ui'
import { find } from 'lodash'

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

  data () {
    return {
      key: 'VaccineCovid19Register',
      taLogo,
      vaccines: [
        'AZ (Anh)',
        'MO (Mỹ-Đức)',
        'PZ (Mỹ)',
        'VE (Trung Quốc)'
      ],
      vaccines2: [],
      provinces: [],
      districts: [],
      wards: [],
      page: 'USER_INFO',
      is_searching: true,
      rules: {
        phone: [$v.required, ...$v.phone],
        name: [$v.required, ...$v.fullName],
        birthday: [$v.required],
        gender: [$v.required],
        country_code: [$v.required],
        province_id: $v.required,
        district_id: $v.required,
        war_id: $v.required,
        address: [$v.required, ...$v.street],
        cmnd: [$v.required],
        cmnd_date: [$v.required],
        cmnd_location: [$v.required],
        injected_subject: [$v.required],
        health_condition: [$v.required],
        dsbenhnen: [$v.required],
        benhnen: [$v.required],
        dungthuoc_khangsinh_14ngay: [$v.required],
        dkkham_khoakhac: [$v.required],
        location: [$v.required],
        is_pregnant: [$v.required],
        is_birth_ta: [$v.required],
        pregnant_week: [$v.required, ...$v.quantity],
        inject_num: [$v.required],
        vaccine_name_1: [$v.required],
        vaccine_date_1: [$v.required],
        vaccine_location_1: [$v.required],
        vaccine_name_2: [$v.required],
        vaccine_date_2: [$v.required],
        vaccine_location_2: [$v.required],
        born_date: [$v.required],
        is_f0: [$v.required],
        f0_date: [$v.required],
        pid: [...$v.number],
        name_contact: [$v.required, ...$v.fullName],
        phone_contact: [$v.required, ...$v.phone],
        relation_contact: [$v.required]
      },
      genders: ['Nam', 'Nữ'],
      countrys: [],
      injects: [],
      injected_subjects: [
        {
          id: 'ELDERLY',
          name: 'Người cao tuổi (trên 65 tuổi)'
        },
        {
          id: 'PREGNANT_WOMEN',
          name: 'Khách hàng khám sản (đang mang thai)'
        },
        {
          id: 'NON_PREGNANT_WOMEN',
          name: 'Khách hàng khám sản (không mang thai)'
        },
        {
          id: 'FERTILITY_CENTER',
          name: 'Khách hàng thăm khám tại Trung tâm Hỗ trợ sinh sản'
        },
        {
          id: '18_TUOI_BENH_NEN',
          name: 'Người trên 18 tuổi suy giảm hệ thống miễn dịch'
        },
        {
          id: 'MUI_3_50_TUOI_BENH_NEN',
          name: 'Người từ 50 tuổi ưu tiên có bệnh lý nền'
        },
        {
          id: 'OTHER',
          name: 'Đối tượng khác'
        }
      ],
      injected_subjectshn: [
        {
          id: 'PREGNANT_WOMEN',
          name: 'Khách hàng khám sản (đang mang thai)'
        },
        {
          id: 'NON_PREGNANT_WOMEN',
          name: 'Khách hàng khám sản (không mang thai)'
        },
        {
          id: 'FERTILITY_CENTER',
          name: 'Khách hàng thăm khám tại Trung tâm Hỗ trợ sinh sản'
        }
      ],
      boolean_list: ['Có', 'Không'],
      underlyings: [
        'Đái tháo đường',
        'Bệnh phổi tắc nghẽn mạn tính và các bệnh phổi khác',
        'Ung thư (đặc biệt là các khối u ác tính về huyết học, ung thư phổi và bệnh ung thư di căn khác)',
        'Bệnh thận mạn tính',
        'Béo phì, thừa cân',
        'Bệnh tim mạch (suy tim, bệnh động mạch vành hoặc bệnh cơ tim)',
        'Bệnh lý mạch máu não',
        'Hội chứng Down',
        'HIV/AIDS',
        'Bệnh lý thần kinh (bao gồm cả chứng sa sút trí tuệ)',
        'Bệnh hồng cầu hình liềm, bệnh thalassemia, bệnh huyết học mạn tính khác',
        'Hen phế quản',
        'Tăng huyết áp',
        'Thiếu hụt miễn dịch',
        'Bệnh gan',
        'Rối loạn do sử dụng chất gây nghiện',
        'Đang điều trị bằng thuốc corticosteroid hoặc các thuốc ức chế miễn dịch khác',
        'Các bệnh hệ thống',
        'Bệnh lý mắc lúc nhỏ như: Tăng áp phổi nguyên hoặc thứ phát, bệnh tim bẩm sinh, rối loạn chuyển hóa di truyền bẩm sinh, rối loạn nội tiết bẩm sinh-mắc phải.',
        'Ghép tạng hoặc cấy ghép tế bào gốc tạo máu',
        'Bệnh lý khác'
      ],
      locations: [
        {
          id: 'BV-TAMANH-HCM',
          name: 'Bệnh viện Đa khoa Tâm Anh TP. HCM',
          address: '2B Phổ Quang, Phường 2, Tân Bình, TP. HCM'
        },
        {
          id: 'BV-TAMANH-HN',
          name: 'Bệnh viện Đa khoa Tâm Anh Hà Nội',
          address: '108 Hoàng Như Tiếp, Bồ Đề, Long Biên, Hà Nội '
        }
      ],
      relations: [
        'Bản thân', 'Con', 'Cha', 'Mẹ', 'Vợ', 'Chồng', 'Anh', 'Chị', 'Em', 'Ông', 'Bà', 'Họ hàng', 'Khác'
      ],
      mui1_disable: false,
      mui2_disable: false,
      isShowCMND: true,
      datesInjection2: moment(),
      day: '',
      month: '',
      year: ''
    }
  },

  computed: {
    birthdayOptions () {
      return {
        disabledDate: d => d.valueOf() > Date.now()
      }
    },
    vaccineInjections1 () {
      return {
        disabledDate: d => {
          return moment('2020-01-01').isSameOrAfter(moment(d)) || d.valueOf() > Date.now()
        }
      }
    },
    vaccineInjections2 () {
      return {
        disabledDate: d => {
          return moment(this.datesInjection2).isSameOrAfter(moment(d)) || moment('2021-01-01').isSameOrAfter(moment(d)) || d.valueOf() > Date.now()
        }
      }
    },

    backgroundDiseaseRequired () {
      if (this.form.injected_subject && this.form.injected_subject.id) {
        return this.form.injected_subject.id === '18_TUOI_BENH_NEN'
      }
      return false
    },

    health_conditions () {
      if (this.backgroundDiseaseRequired) {
        return ['Có bệnh lý nền']
      }
      return ['Không có bệnh lý nền', 'Có bệnh lý nền']
    }
  },

  watch: {
    year(current, prev) {
      if (current > 9999) this.year = prev;
      if (current && current.length == 4 && moment(`${current}-${this.month}-${this.day}`).format('DD/MM/YYYY') === 'Invalid date') {
        this.month = ''
        this.day = ''
      }
    },
    'form.province_id': {
      handler (provinceId) {
        this.districts = null
        this.$set(this.form, 'district_id', null)
        this.$apis.master
          .getDistrictsList({ provinceId })
          .then(res => {
            this.districts = res
          })
      }
    },
    'form.district_id': {
      handler (districtId) {
        this.wards = null
        this.$set(this.form, 'war_id', null)
        this.$apis.master
          .getWardsList({ districtId })
          .then(res => {
            this.wards = res
          })
      }
    },
    'form.inject_num': {
      handler (vaccineNum) {
        switch (vaccineNum) {
          case 'Chưa tiêm':
            this.form = {
              ...this.form,
              vaccine_name_1: this.mui1_disable ? this.form.vaccine_name_1 : '',
              vaccine_date_1: this.mui1_disable ? this.form.vaccine_date_1 : '',
              vaccine_location_1: this.mui1_disable ? this.form.vaccine_location_1 : '',
              vaccine_name_2: this.mui2_disable ? this.form.vaccine_name_2 : '',
              vaccine_date_2: this.mui2_disable ? this.form.vaccine_date_2 : '',
              vaccine_location_2: this.mui2_disable ? this.form.vaccine_location_2 : ''
            }
            return
          case 'Đã tiêm mũi 1':
            this.form = {
              ...this.form,
              vaccine_name_2: this.mui2_disable ? this.form.vaccine_name_2 : '',
              vaccine_date_2: this.mui2_disable ? this.form.vaccine_date_2 : '',
              vaccine_location_2: this.mui2_disable ? this.form.vaccine_location_2 : ''
            }
            return
          case 'Đã tiêm mũi 2':
            if (this.form.vaccine_name_1) {
              this.validateInjections()
            }
            return
        }
      }
    },
    'form.vaccine_name_1': {
      handler () {
        this.validateInjections()
      }
    },
    'form.vaccine_date_1': {
      handler () {
        this.validateInjections()
      }
    },
    'form.vaccine_name_2': {
      handler (val) {
        this.validateInjections(val)
      }
    }
  },

  methods: {
    vaccineNameChange () {
      if (!this.mui2_disable) {
        this.form = {
          ...this.form,
          vaccine_name_2: '',
          vaccine_date_2: ''
        }
      }
    },
    vaccineDateChange () {
      if (!this.mui2_disable) {
        this.form = {
          ...this.form,
          vaccine_name_2: '',
          vaccine_date_2: ''
        }
      }
    },
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
    validateInjections (vaccine2) {
      const { vaccine_name_1, vaccine_date_1 } = this.form
      let dateDuration = ''
      let typeVaccine = this.getEnumVaccine(vaccine_name_1)
      let typeVaccine2 = this.getEnumVaccine(vaccine2)
      switch (typeVaccine) {
        case 'VeroCell':
          dateDuration = moment(vaccine_date_1).add(27, 'days')
          this.vaccines2 = ['VE (Trung Quốc)']
          break
        case 'AstraZeneca':
          dateDuration = moment(vaccine_date_1).add(typeVaccine2 === 'Pfizer' ? 27 : 41, 'days')
          this.vaccines2 = ['AZ (Anh)', 'PZ (Mỹ)', 'MO (Mỹ-Đức)']
          break
        case 'Pfizer':
          dateDuration = moment(vaccine_date_1).add(20, 'days')
          this.vaccines2 = ['PZ (Mỹ)', 'MO (Mỹ-Đức)']
          break
        case 'Moderna':
          dateDuration = moment(vaccine_date_1).add(27, 'days')
          this.vaccines2 = ['PZ (Mỹ)', 'MO (Mỹ-Đức)']
          break
      }
      this.datesInjection2 = dateDuration
    },
    reset () {
      this.finished = false
      this.loading = false
      this.submitting = false
      this.isLoading = false
      this.isShowCMND = true
      this.form = {
        phone: null,
        name: null,
        birthday: null,
        gender: null,
        country: null,
        country_code: null,
        phone_contact: null,
        name_contact: null,
        relation_contact: null,
        province_id: null,
        district_id: null,
        war_id: null,
        address: null,
        cmnd: null,
        cmnd_date: null,
        cmnd_location: null,
        injected_subject: null,
        health_condition: null,
        dungthuoc_khangsinh_14ngay: null,
        dkkham_khoakhac: null,
        benhnen: null,
        dsbenhnen: [],
        list_vx: [],
        is_pregnant:null,
        is_birth_ta: null,
        is_f0: null,
        f0_date: null,
        pid: null
      }
      this.fetch()
    },

    normalize (val) {
      return {
        ...val,
        name: $n.fullName(val.name),
        address: $n.street(val.address),
        cmnd: $n.fullName(val.cmnd),
        cmnd_location: $n.fullName(val.cmnd_location),
        vaccine_location_1: $n.fullName(val.vaccine_location_1),
        vaccine_location_2: $n.fullName(val.vaccine_location_2),
        name_contact: $n.fullName(val.name_contact)
      }
    },

    changeHealthCondition (benhnen) {
      const { injected_subject } = this.form
      const subjects_required = ['ELDERLY', 'OTHER', 'CHILDREN', 'MUI_3_50_TUOI_BENH_NEN']
      if (injected_subject && injected_subject.id && subjects_required.includes(injected_subject.id) && benhnen == 'Không có bệnh lý nền') {
        MessageBox({
          title: 'Cảnh báo',
          message: `
            Hiện nay bệnh viện ưu tiên tiêm vắc xin cho các đối tượng <strong>có bệnh lý</strong>. Bạn có muốn cập nhật bệnh lý?
          `,
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: 'Cập nhật',
          cancelButtonText: 'Hủy',
          dangerouslyUseHTMLString: true
        })
        .then(() => {
          this.$set(this.form, 'benhnen', 'Có bệnh lý nền')
        })
        .catch(() => {})
      }
    },

    changeInjectSubject (subject) {
      const { benhnen } = this.form
      const subjects_required = ['ELDERLY', 'OTHER', 'CHILDREN', 'MUI_3_50_TUOI_BENH_NEN']
      if (subject && subject.id && subjects_required.includes(subject.id) && benhnen && benhnen == 'Không có bệnh lý nền') {
        MessageBox({
          title: 'Cảnh báo',
          message: `
            Hiện nay bệnh viện ưu tiên tiêm vắc xin cho các đối tượng <strong>có bệnh lý</strong>. Bạn có muốn cập nhật bệnh lý?
          `,
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: 'Cập nhật',
          cancelButtonText: 'Hủy',
          dangerouslyUseHTMLString: true
        })
        .then(() => {
          this.$set(this.form, 'benhnen', 'Có bệnh lý nền')
        })
        .catch(() => {})
      }
    },

    onBirthday (birthday) {
      if (moment(birthday).isAfter(moment())) {
        this.form.birthday = null
      }
      const _now = moment()
      const _birthday = moment(birthday)
      const diff = moment.duration(_now.diff(_birthday))
      const diffYear = diff.years()
      this.isShowCMND = diffYear >= 15
      if (diffYear >= 18) {
        this.rules = {
          ...this.rules,
          cmnd: [$v.required],
          cmnd_date: [$v.required],
          cmnd_location: [$v.required]
        }
      } else {
        this.rules = {
          ...this.rules,
          cmnd: [],
          cmnd_date: [],
          cmnd_location: []
        }
      }
    },

    getPidBirthday () {
        const { birthday, gender } = this.form
        return `${gender}, ${this.getDateStr(birthday)}`
    },

    getAddressFull () {
      const { war_id, district_id, province_id, address } = this.form
      let _province = this.getNameByIdInList(this.provinces, province_id)
      let _district = this.getNameByIdInList(this.districts, district_id)
      let _ward = this.getNameByIdInList(this.wards, war_id)
      return `${address.toUpperCase()}, ${_ward.name}, ${_district.name}, ${_province.name}`
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
          this.$apis.forms
            .getCountrys()
            .then(res => {
              this.countrys = res.data
            })
        ])
        .finally(() => {
          this.loading = false
        })
    },

    showWarningMessage(message) {
      MessageBox({
        title: 'Thông tin chưa chính xác',
        message: message,
        showCancelButton: false,
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        callback: () => {}
      })
    },

    onSummary() {
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
        const { gender, injected_subject, birthday, is_pregnant } = this.form
        const _now = moment()
        const _birthday = moment(birthday)
        const diff = moment.duration(_now.diff(_birthday))
        const yearOld = diff.years()
        if (gender == 'Nam' && injected_subject && injected_subject.id == 'PREGNANT_WOMEN') {
          this.showWarningMessage(`
            Người được tiêm có giới tính Nam, Quý khách vui lòng khai báo thông tin chính xác để được xác nhận khi đến tiêm chủng.<br><br>
            Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác.
          `)
          return
        }
        const pregnants = ['PREGNANT_WOMEN', 'NON_PREGNANT_WOMEN', 'FERTILITY_CENTER'];
        if (yearOld < 18 && injected_subject && pregnants.includes(injected_subject.id)) {
          this.showWarningMessage(`
            Người được tiêm không nằm trong độ tuổi phù hợp (< 18 tuổi), Quý khách vui lòng khai báo thông tin chính xác để được xác nhận khi đến tiêm chủng.<br><br>
            Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác.
          `)
          return
        }
        if (injected_subject && injected_subject.id == 'PREGNANT_WOMEN' && is_pregnant == 'Không') {
          this.showWarningMessage(`
            Quý khách vui lòng khai báo thông tin chính xác để được xác nhận khi đến tiêm chủng.<br><br>
            Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác.
          `)
          return
        }
        if (injected_subject && injected_subject.id === '18_TUOI_BENH_NEN' && yearOld < 18) {
          this.showWarningMessage('Người được tiêm chưa đủ 18 tuổi, Quý khách vui lòng khai báo thông tin chính xác để được xác nhận khi đến tiêm chủng.<br/><br/>Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác.')
          return
        }
        if (injected_subject && injected_subject.id === 'MUI_3_50_TUOI_BENH_NEN' && yearOld < 50) {
          this.showWarningMessage('Người được tiêm chưa đủ 50 tuổi, Quý khách vui lòng khai báo thông tin chính xác để được xác nhận khi đến tiêm chủng.<br/><br/>Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác.')
          return
        }
        if (injected_subject && injected_subject.id == 'CHILDREN' && !(yearOld >= 12 && yearOld < 18)) {
          this.showWarningMessage(`
            Người được tiêm không nằm trong độ tuổi từ đủ 12 tuổi đến dưới 18 tuổi, Quý khách vui lòng khai báo thông tin chính xác để được xác nhận khi đến tiêm chủng.<br><br>
            Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác.
          `)
          return
        }
        // if (injected_subject && injected_subject.id == 'UNDER_18' && moment().format("YYYY") - moment(birthday).format('YYYY') >= 18) {
        //   this.showWarningMessage(`
        //     Người được tiêm chưa đủ 18 tuổi để thuộc đối tượng "Người trên 18 tuổi có bệnh lý nền", Quý khách vui lòng khai báo thông tin chính xác để được xác nhận khi đến tiêm chủng.<br><br>
        //     Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác.
        //   `)
        //   return
        // }
        // if (moment().format("YYYY") - moment(birthday).format('YYYY') < 18) {
        //   this.showWarningMessage(`
        //     Người được tiêm đang trên 18 tuổi, Quý khách vui lòng khai báo thông tin chính xác.
        //   `)
        //   return
        // }
        if (injected_subject && injected_subject.id == 'ELDERLY' && yearOld < 65) {
          this.showWarningMessage(`
            Người được tiêm chưa đủ 65 tuổi, Quý khách vui lòng khai báo thông tin chính xác để được xác nhận khi đến tiêm chủng.<br><br>
            Để đảm bảo khách quan, trung thực và công bằng, Bệnh viện Tâm Anh có thể từ chối tiêm chủng với Khách hàng đăng ký thông tin không chính xác.
          `)
          return
        }
        this.saveRequest()
      })
    },

    saveRequest () {
      const { location, province_id, district_id, war_id } = this.form
      let _province = this.getNameByIdInList(this.provinces, province_id)
      let _district = this.getNameByIdInList(this.districts, district_id)
      let _ward = this.getNameByIdInList(this.wards, war_id)
      let province = null
      let district = null
      let ward = null
      if (location.id === 'BV-TAMANH-HN') {
        province = _province.mapping.tamanh_hn
        district = _district.mapping.tamanh_hn
        ward = _ward.mapping.tamanh_hn
      } else {
        province = _province.mapping.tamanh_hcm
        district = _district.mapping.tamanh_hcm
        ward = _ward.mapping.tamanh_hcm
      }

      const _form = {
        ...this.form,
        province_id: province,
        district_id: district,
        war_id: ward,
        location_inject: location.id,
        province: _province.name,
        district: _district.name,
        ward: _ward.name,
        country: this.getCountryName()
      }

      this.loading = true
      this.$apis.forms
      .push(this.key, {
        _source: this.source,
        ...this.normalize(_form)
      })
      .then(() => {
        this.page = 'REGISTER_SUCCESS'
        this.scrollToTop()
      })
      .finally(() => {
        this.loading = false
      })
    },

    getCountryName () {
      const _countrys = this.countrys
      const { country_code } = this.form
      if (country_code) {
        for (const item of _countrys) {
          if (item.MAQG == country_code) {
            return item.TENQG
          }
        }
        return country_code
      }
      return ''
    },

    getNameByIdInList (list, id) {
      let result = find(list, (obj) => {
        if (obj.id == id) {
          return true
        }
      })
      return result
    },

    getListVaccine () {
      const {
        vaccine_name_1,
        vaccine_date_1,
        vaccine_location_1,
        vaccine_name_2,
        vaccine_date_2,
        vaccine_location_2
      } = this.form
      let vaccines = []
      if (vaccine_name_1) {
        vaccines.push({
          name: vaccine_name_1,
          date: vaccine_date_1,
          location: vaccine_location_1,
          order: 1
        })
        if (vaccine_name_2) {
          vaccines.push({
            name: vaccine_name_2,
            date: vaccine_date_2,
            location: vaccine_location_2,
            order: 2
          })
        }
      }
      return vaccines
    },

    nextPage () {
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
        this.page = 'MEDICAL_INPUT'
        this.scrollToTop()
      })
    },

    lookup () {
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
        if (this.year && this.year.length == 4 && moment(`${this.year}-${this.month}-${this.day}`).format('DD/MM/YYYY') === 'Invalid date') {
          this.month = ''
          this.day = ''
          this.year = ''
          this.form = {
            ...this.form,
            birthday: ''
          }
          return
        } else {
          this.form = {
            ...this.form,
            birthday: moment(`${this.year}-${this.month}-${this.day}`)
          }
        }
        MessageBox({
          title: 'Xác nhận thông tin',
          message: `
            Bạn vui lòng kiểm tra thông tin chính xác để đảm bảo nhận được thông tin đặt hẹn<br><br>
            <p>
              Số di động:
              <b style="font-size: 17px;">${this.form.phone}</b>
            </p>
            <p>
              Họ tên người tiêm:
              <b style="font-size: 17px;">${this.form.name.toUpperCase()}</b>
            </p>
            <p>
              Ngày sinh người tiêm:
              <b style="font-size: 17px;">${this.getDateStr(this.form.birthday)}</b>
            </p>
          `,
          showCancelButton: true,
          showConfirmButton: true,
          dangerouslyUseHTMLString: true,
          callback: (action) => {
            if (action == 'confirm') {
              this.loading = true
              const data = {
                phone: this.form.phone,
                birthday: moment(this.form.birthday).format('YYYY-MM-DD')
              }
              this.$apis.forms
              .getRecordKeyWeb(data)
              .then((res) => {
                if (res?.data && res?.data?.phone) {
                  let {
                    list_vx,
                    benhnen,
                    birthday
                  } = res.data
                  let vaccine_name_1 = null
                  let vaccine_date_1 = null
                  let vaccine_location_1 = null
                  let vaccine_name_2 = null
                  let vaccine_date_2 = null
                  let vaccine_location_2 = null
                  let injects = ['Chưa tiêm', 'Đã tiêm mũi 1', 'Đã tiêm mũi 2']
                  this.injects = injects
                  list_vx.forEach((item) => {
                    if (item?.vx_order === "1") {
                      this.injects = ['Đã tiêm mũi 1', 'Đã tiêm mũi 2']
                      vaccine_name_1 = this.getEnumVaccine(item.vx_name)
                      vaccine_date_1 = item.vx_date && item.vx_date != '0000-00-00 00:00:00' ? item.vx_date : null
                      vaccine_location_1 = item.vx_location
                      if (item.type_author == 'system') {
                        this.mui1_disable = true
                      }
                    } else {
                      this.injects = ['Đã tiêm mũi 2']
                      vaccine_name_2 = this.getEnumVaccine(item.vx_name)
                      vaccine_date_2 = item.vx_date && item.vx_date != '0000-00-00 00:00:00' ? item.vx_date : null
                      vaccine_location_2 = item.vx_location
                      if (item.type_author == 'system') {
                        this.mui2_disable = true
                      }
                    }
                  })
                  // switch (list_vx.length) {
                  //   case 0:
                  //     this.injects = injects
                  //     break
                  //   case 1:
                  //     this.injects = ['Đã tiêm mũi 1', 'Đã tiêm mũi 2']
                  //     break
                  //   case 2:
                  //     this.injects = ['Đã tiêm mũi 2']
                  //     break
                  // }
                  if (benhnen !== null && benhnen !== '') {
                    benhnen = benhnen == 'Có' ? 'Có bệnh lý nền' : 'Không có bệnh lý nền'
                  }
                  if (birthday) {
                    this.day = moment(birthday).format('DD')
                    this.month = moment(birthday).format('MM')
                    this.year = moment(birthday).format('YYYY')
                  }
                  this.form = {
                    ...this.form,
                    ...res.data,
                    inject_num: this.injects[0],
                    vaccine_name_1,
                    vaccine_date_1,
                    vaccine_location_1,
                    vaccine_name_2,
                    vaccine_date_2,
                    vaccine_location_2,
                    benhnen,
                    province_id: null,
                    province: null,
                    district_id: null,
                    district: null,
                    war_id: null,
                    ward: null
                  }
                }
              })
              .finally(() => {
                this.injects = ['Chưa tiêm', 'Đã tiêm mũi 1', 'Đã tiêm mũi 2']
                const _now = moment()
                const { birthday, name, phone, phone_contact } = this.form
                const _birthday = moment(birthday)
                const diff = moment.duration(_now.diff(_birthday))
                const diffYear = diff.years()
                if (diffYear >= 18) {
                  this.form = {
                    ...this.form,
                    name_contact: name,
                    phone_contact: phone_contact ? phone_contact : phone,
                    relation_contact: 'Bản thân'
                  }
                }
                this.isShowCMND = diffYear >= 15
                if (diffYear >= 18) {
                  this.rules = {
                    ...this.rules,
                    cmnd: [$v.required],
                    cmnd_date: [$v.required],
                    cmnd_location: [$v.required]
                  }
                } else {
                  this.rules = {
                    ...this.rules,
                    cmnd: [],
                    cmnd_date: [],
                    cmnd_location: []
                  }
                }
                this.loading = false
                this.is_searching = false
              })
            }
          }
        })
      })
    },

    getInjectSubject() {
      const { injected_subjects, form } = this
      const { id } = form.location
      if (id === 'BV-TAMANH-HN') {
        return this.injected_subjectshn
      }
      return injected_subjects
    },

    getEnumVaccine (fullString) {
      if (!fullString) return fullString
      const lowcaseStr = fullString.toLowerCase()
      if (lowcaseStr.includes('astrazeneca') || lowcaseStr.includes('az') || lowcaseStr.includes('as')) {
        return 'AstraZeneca'
      }
      if (lowcaseStr.includes('verocell') || lowcaseStr.includes('ve')) {
        return 'VeroCell'
      }
      if (lowcaseStr.includes('moderna') || lowcaseStr.includes('mo')) {
        return 'Moderna'
      }
      if (lowcaseStr.includes('pfizer') || lowcaseStr.includes('pz') || lowcaseStr.includes('pf')) {
        return 'Pfizer'
      }
      return fullString
    },

    scrollToTop () {
      const rect = this.$el.getBoundingClientRect()
      console.log(rect.top + window.scrollY - 72)
      if (rect) window.scrollTo(0, rect.top + window.scrollY - 72)
    },

    getDateStr (date, format = 'DD/MM/YYYY') {
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
.vaccine-covid19-register-userinfo {
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
}

@media only screen and (min-width: 576px) {}
</style>
