<template lang="pug">
  .ep-wrapper.scheduler
    .ep-loading(v-if="loading") Đang tải. Vui lòng đợi...

    .ep-thankyou(v-else-if="finished")
      h2.ep-thankyou__title ĐĂNG KÝ THÀNH CÔNG!
      .ep-thankyou__body
        p Quý khách đã đăng ký thông tin thành công.

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
        .ep-branding__header
          h2.ep-branding__title Đăng ký hạng mục LCD/POSTER

      section.ep-section
        .ep-section__title  Thông tin trung tâm
        .ep-section__body
          el-form-item(label="Loại hình trung tâm" prop="center_type")
            el-select(v-model="form.center_type")
              template
                el-option(
                  v-for="(i, k) in center_types"
                  :key="k"
                  :value="i.id"
                  :label="i.name") {{ i.name }}
          el-form-item(label="Tên trung tâm" prop="service_center", v-if="form.center_type === 'VNVC'")
            el-select(v-model="form.service_center")
              template(v-if="vnvcGroups")
                el-option-group(
                  v-for="(g, gk) in vnvcGroups"
                  :key="gk"
                  :label="g.name")
                  el-option(
                    v-for="(i, k) in g.items"
                    :key="k"
                    :value="i.id"
                    :label="i.name") {{ i.name }}
          el-form-item(label="Trung tâm" prop="service_center", v-if="form.center_type === 'NUTRIHOME'")
            el-select(v-model="form.service_center")
              template
                el-option(
                  v-for="(i, k) in nutrihomes"
                  :key="k"
                  :value="i.id"
                  :label="i.name") {{ i.name }}
        section.ep-section
        .ep-section__title  THÔNG TIN NGƯỜI ĐĂNG KÝ
        .ep-section__body
          el-form-item(label="Họ và tên" prop="full_name")
            el-input.ep-uppercase(v-model="form.full_name")
          el-form-item(label="Số điện thoại" prop="phone")
            el-input(v-model="form.phone")
          el-form-item(label="Chức vụ" prop="position")
            el-select(v-model="form.position")
              template
                el-option(
                  v-for="(i, k) in positions"
                  :key="i"
                  :value="i"
                  :label="i") {{ i }}
          el-form-item(label="Chức vụ khác" prop="position_other", v-if="form.position === 'Khác'")
            el-input.text-input(placeholder="Nhập chức vụ khác" v-model="form.position_other" clearable)
        section.ep-section
          .ep-section__title HẠNG MỤC ĐỀ XUẤT
          .ep-section__body
            el-form-item(label="Hạng mục" prop="category")
              el-radio-group.ep-full(v-model="form.category")
                el-radio-button(:label="'LCD'" :value="'LCD'") LCD
                el-radio-button(:label="'POSTER'" :value="'POSTER'") POSTER

        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC CỬA RA VÀO
            el-switch(v-model="controlSuggestion1")
          .ep-section__body(v-if="controlSuggestion1")
            el-form-item(label="Khu vực" prop="area_suggestion1")
              el-radio-group.ep-full(v-model="form.area_suggestion1")
                el-radio-button(:label="'MAIN_DOOR'" :value="'MAIN_DOOR'") Cửa ra vào
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item(v-if="form.area_suggestion1 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other1")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other1" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion1")
              el-radio-group.ep-full(v-model="form.location_suggestion1")
                el-radio-button(:label="'MAIN_PILLAR'" :disabled="form.area_suggestion1 === 'OTHERS'" :value="'MAIN_PILLAR'") Cột chính bên ngoài
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item(v-if="form.location_suggestion1 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other1")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other1" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size1", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_size1")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other1", v-if="form.category === 'LCD' && form.lcd_size1 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other1" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity1", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_quantity1")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'LCD'") Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
            el-form-item(label="Nội dung đề xuất POSTER" prop="poster_content1", v-if="form.category === 'POSTER'")
              el-input.text-input(placeholder="Nhập nội dung đề xuất POSTER" v-model="form.poster_content1" clearable)
            el-form-item(label="Số lượng" prop="poster_quantity1", v-if="form.category === 'POSTER'")
              el-select(v-model="form.poster_quantity1")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'POSTER'") Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC KHÁM
            el-switch(v-model="controlSuggestion2")
          .ep-section__body(v-if="controlSuggestion2")
            el-form-item(label="Khu vực" prop="area_suggestion2")
              el-radio-group.ep-full(v-model="form.area_suggestion2")
                el-radio-button(:label="'EXAMINATION'" :value="'EXAMINATION'") Khu vực khám
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item(v-if="form.area_suggestion2 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other2")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other2" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion2")
              el-radio-group.ep-full(v-model="form.location_suggestion2")
                el-radio-button(:label="'REGISTRATION_DESK'" :disabled="form.area_suggestion2 === 'OTHERS'" :value="'REGISTRATION_DESK'") Cạnh bàn đăng ký
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item(v-if="form.location_suggestion2 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other2")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other2" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size2", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_size2")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other2", v-if="form.category === 'LCD' && form.lcd_size2 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other2" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity2", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_quantity2")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'LCD'") Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
            el-form-item(label="Nội dung đề xuất POSTER" prop="poster_content2", v-if="form.category === 'POSTER'")
              el-input.text-input(placeholder="Nhập nội dung đề xuất POSTER" v-model="form.poster_content2" clearable)
            el-form-item(label="Số lượng" prop="poster_quantity2", v-if="form.category === 'POSTER'")
              el-select(v-model="form.poster_quantity2")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'POSTER'") Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC CHECKIN
            el-switch(v-model="controlSuggestion3")
          .ep-section__body(v-if="controlSuggestion3")
            el-form-item(label="Khu vực" prop="area_suggestion3")
              el-radio-group.ep-full(v-model="form.area_suggestion3")
                el-radio-button(:label="'CHECKIN'" :value="'CHECKIN'") Khu vực checkin
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item(v-if="form.area_suggestion3 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other3")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other3" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion3")
              el-radio-group.ep-full(v-model="form.location_suggestion3")
                el-radio-button(:label="'BEHIND_CHECK'" :disabled="form.area_suggestion3 === 'OTHERS'" :value="'BEHIND_CHECK'") Tường đằng sau quầy checkin
                el-radio-button(:label="'NEAR_PAYMENT'" :disabled="form.area_suggestion3 === 'OTHERS'" :value="'NEAR_PAYMENT'") Bên cạnh bàn thanh toán
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item(v-if="form.location_suggestion3 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other3")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other3" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size3", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_size3")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other3", v-if="form.category === 'LCD' && form.lcd_size3 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other3" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity3", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_quantity3")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'LCD'") Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
            el-form-item(label="Nội dung đề xuất POSTER" prop="poster_content3", v-if="form.category === 'POSTER'")
              el-input.text-input(placeholder="Nhập nội dung đề xuất POSTER" v-model="form.poster_content3" clearable)
            el-form-item(label="Số lượng" prop="poster_quantity3", v-if="form.category === 'POSTER'")
              el-select(v-model="form.poster_quantity3")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'POSTER'") Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC THU NGÂN
            el-switch(v-model="controlSuggestion4")
          .ep-section__body(v-if="controlSuggestion4")
            el-form-item(label="Khu vực" prop="area_suggestion4")
              el-radio-group.ep-full(v-model="form.area_suggestion4")
                el-radio-button(:label="'COUNTER'" :value="'COUNTER'") Khu vực thu ngân
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item(v-if="form.area_suggestion4 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other4")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other4" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion4")
              el-radio-group.ep-full(v-model="form.location_suggestion4")
                el-radio-button(:label="'BEHIND_COUNTER'" :disabled="form.area_suggestion4 === 'OTHERS'" :value="'BEHIND_COUNTER'") Tường đằng sau quầy thanh toán
                el-radio-button(:label="'WAIT_AFTER_INJECTED'" :disabled="form.area_suggestion4 === 'OTHERS'" :value="'WAIT_AFTER_INJECTED'") Vị trí KH chờ sau tiêm
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item(v-if="form.location_suggestion4 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other4")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other4" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size4", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_size4")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other4", v-if="form.category === 'LCD' && form.lcd_size4 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other4" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity4", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_quantity4")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'LCD'") Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
            el-form-item(label="Nội dung đề xuất POSTER" prop="poster_content4", v-if="form.category === 'POSTER'")
              el-input.text-input(placeholder="Nhập nội dung đề xuất POSTER" v-model="form.poster_content4" clearable)
            el-form-item(label="Số lượng" prop="poster_quantity4", v-if="form.category === 'POSTER'")
              el-select(v-model="form.poster_quantity4")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'POSTER'") Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC CHỜ SAU TIÊM
            el-switch(v-model="controlSuggestion5")
          .ep-section__body(v-if="controlSuggestion5")
            el-form-item(label="Khu vực" prop="area_suggestion5")
              el-radio-group.ep-full(v-model="form.area_suggestion5")
                el-radio-button(:label="'WAIT_AFTER_INJECTED'" :value="'WAIT_AFTER_INJECTED'") Khu vực chờ sau tiêm
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item(v-if="form.area_suggestion5 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other5")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other5" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion5")
              el-radio-group.ep-full(v-model="form.location_suggestion5")
                el-radio-button(:label="'WALL_COLUMN_INJECT'" :disabled="form.area_suggestion5 === 'OTHERS'" :value="'WALL_COLUMN_INJECT'") Các cột tường các phòng khám/tiêm
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item(v-if="form.location_suggestion5 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other5")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other5" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size5", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_size5")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other5", v-if="form.category === 'LCD' && form.lcd_size5 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other5" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity5", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_quantity5")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'LCD'") Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
            el-form-item(label="Nội dung đề xuất POSTER" prop="poster_content5", v-if="form.category === 'POSTER'")
              el-input.text-input(placeholder="Nhập nội dung đề xuất POSTER" v-model="form.poster_content5" clearable)
            el-form-item(label="Số lượng" prop="poster_quantity5", v-if="form.category === 'POSTER'")
              el-select(v-model="form.poster_quantity5")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'POSTER'") Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC VUI CHƠI TRẺ EM
            el-switch(v-model="controlSuggestion6")
          .ep-section__body(v-if="controlSuggestion6")
            el-form-item(label="Khu vực" prop="area_suggestion6")
              el-radio-group.ep-full(v-model="form.area_suggestion6")
                el-radio-button(:label="'CHIDREN_PLAY_AREA'" :value="'CHIDREN_PLAY_AREA'") Khu vực vui chơi trẻ em
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item(v-if="form.area_suggestion6 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other6")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other6" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion6")
              el-radio-group.ep-full(v-model="form.location_suggestion6")
                el-radio-button(:label="'WALL_CHIDREN_PLAY_AREA'" :disabled="form.area_suggestion6 === 'OTHERS'" :value="'WALL_CHIDREN_PLAY_AREA'") Các cột tại Khu vui chơi trẻ em
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item(v-if="form.location_suggestion6 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other6")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other6" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size6", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_size6")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other6", v-if="form.category === 'LCD' && form.lcd_size6 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other6" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity6", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_quantity6")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'LCD'") Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
            el-form-item(label="Nội dung đề xuất POSTER" prop="poster_content6", v-if="form.category === 'POSTER'")
              el-input.text-input(placeholder="Nhập nội dung đề xuất POSTER" v-model="form.poster_content6" clearable)
            el-form-item(label="Số lượng" prop="poster_quantity6", v-if="form.category === 'POSTER'")
              el-select(v-model="form.poster_quantity6")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'POSTER'") Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC THANG MÁY
            el-switch(v-model="controlSuggestion7")
          .ep-section__body(v-if="controlSuggestion7")
            el-form-item(label="Khu vực" prop="area_suggestion7")
              el-radio-group.ep-full(v-model="form.area_suggestion7")
                el-radio-button(:label="'ELEVATOR_AREA'" :value="'ELEVATOR_AREA'") Khu vực thang máy
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item(v-if="form.area_suggestion7 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other7")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other7" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion7")
              el-radio-group.ep-full(v-model="form.location_suggestion7")
                el-radio-button(:label="'ELEVATOR_AREA'" :disabled="form.area_suggestion7 === 'OTHERS'" :value="'ELEVATOR_AREA'") Khu vực thang máy
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item(v-if="form.location_suggestion7 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other7")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other7" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size7", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_size7")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other7", v-if="form.category === 'LCD' && form.lcd_size7 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other7" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity7", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_quantity7")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'LCD'") Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
            el-form-item(label="Nội dung đề xuất POSTER" prop="poster_content7", v-if="form.category === 'POSTER'")
              el-input.text-input(placeholder="Nhập nội dung đề xuất POSTER" v-model="form.poster_content7" clearable)
            el-form-item(label="Số lượng" prop="poster_quantity7", v-if="form.category === 'POSTER'")
              el-select(v-model="form.poster_quantity7")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'POSTER'") Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC ĐỀ XUẤT KHÁC
            el-switch(v-model="controlSuggestion8")
          .ep-section__body(v-if="controlSuggestion8")
            el-form-item(:label="`Nhập khu vực khác`" prop="area_suggestion_other8")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other8" clearable)
            el-form-item(:label="`Nhập vị trí khác`" prop="location_suggestion_other8")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other8" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size8", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_size8")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other8", v-if="form.category === 'LCD' && form.lcd_size8 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other8" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity8", v-if="form.category === 'LCD'")
              el-select(v-model="form.lcd_quantity8")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'LCD'") Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
            el-form-item(label="Nội dung đề xuất POSTER" prop="poster_content8", v-if="form.category === 'POSTER'")
              el-input.text-input(placeholder="Nhập nội dung đề xuất POSTER" v-model="form.poster_content8" clearable)
            el-form-item(label="Số lượng" prop="poster_quantity8", v-if="form.category === 'POSTER'")
              el-select(v-model="form.poster_quantity8")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            i(v-if="form.category === 'POSTER'") Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
      el-button(@click="submit" type="primary" size="large") Hoàn thành đăng ký

</template>

<script>
import * as $v from '../services/validators'
import * as $n from '../services/normalizers'
import Base from './Base'
import _ from 'lodash'

export default {
  extends: Base,

  data () {
    return {
      key: 'RegisterLCDPosterDev',
      vnvcs: null,
      controlSuggestion1: false,
      controlSuggestion2: false,
      controlSuggestion3: false,
      controlSuggestion4: false,
      controlSuggestion5: false,
      controlSuggestion6: false,
      controlSuggestion7: false,
      controlSuggestion8: false,
      rules: {
        center_type: [$v.required],
        service_center: $v.required,
        phone: [$v.required, ...$v.phone],
        full_name: [$v.required, ...$v.fullName],
        position: $v.required,
        position_other: $v.required,
        category: $v.required,

        area_suggestion1: $v.required,
        area_suggestion_other1: $v.required,
        location_suggestion1: $v.required,
        location_suggestion_other1: $v.required,
        lcd_size1: $v.required,
        lcd_size_other1: $v.required,
        poster_quantity1: $v.required,
        lcd_quantity1: $v.required,

        area_suggestion2: $v.required,
        area_suggestion_other2: $v.required,
        location_suggestion2: $v.required,
        location_suggestion_other2: $v.required,
        lcd_size2: $v.required,
        lcd_size_other2: $v.required,
        poster_quantity2: $v.required,
        lcd_quantity2: $v.required,

        area_suggestion3: $v.required,
        area_suggestion_other3: $v.required,
        location_suggestion3: $v.required,
        location_suggestion_other3: $v.required,
        lcd_size3: $v.required,
        lcd_size_other3: $v.required,
        poster_quantity3: $v.required,
        lcd_quantity3: $v.required,

        area_suggestion4: $v.required,
        area_suggestion_other4: $v.required,
        location_suggestion4: $v.required,
        location_suggestion_other4: $v.required,
        lcd_size4: $v.required,
        lcd_size_other4: $v.required,
        poster_quantity4: $v.required,
        lcd_quantity4: $v.required,

        area_suggestion5: $v.required,
        area_suggestion_other5: $v.required,
        location_suggestion5: $v.required,
        location_suggestion_other5: $v.required,
        lcd_size5: $v.required,
        lcd_size_other5: $v.required,
        poster_quantity5: $v.required,
        lcd_quantity5: $v.required,

        area_suggestion6: $v.required,
        area_suggestion_other6: $v.required,
        location_suggestion6: $v.required,
        location_suggestion_other6: $v.required,
        lcd_size6: $v.required,
        lcd_size_other6: $v.required,
        poster_quantity6: $v.required,
        lcd_quantity6: $v.required,

        area_suggestion7: $v.required,
        area_suggestion_other7: $v.required,
        location_suggestion7: $v.required,
        location_suggestion_other7: $v.required,
        lcd_size7: $v.required,
        lcd_size_other7: $v.required,
        poster_quantity7: $v.required,
        lcd_quantity7: $v.required,

        area_suggestion8: $v.required,
        area_suggestion_other8: $v.required,
        location_suggestion8: $v.required,
        location_suggestion_other8: $v.required,
        lcd_size8: $v.required,
        lcd_size_other8: $v.required,
        poster_quantity8: $v.required,
        lcd_quantity8: $v.required
      },
      center_types: [
        {
          id: 'VNVC',
          name: 'Trung tâm VNVC'
        },
        {
          id: 'NUTRIHOME',
          name: 'Trung tâm Nutrihome'
        }
      ],
      nutrihomes: [
        {
          id: 'NUTRIHOME_ICON4',
          name: 'Nutrihome Icon4 Cầu Giấy'
        },
        {
          id: 'NUTRIHOME_HADONG',
          name: 'Nutrihome Hà Đông'
        },
        {
          id: 'NUTRIHOME_TRUONGCHINH',
          name: 'Nutrihome Trường Chinh'
        },
        {
          id: 'NUTRIHOME_HVT',
          name: 'Nutrihome Hoàng Văn Thụ'
        },
        {
          id: 'NUTRIHOME_LDH',
          name: 'Nutrihome Lê Đại Hành'
        }
      ],
      positions: [
        'Giám đốc Trung tâm',
        'Admin Trung tâm',
        'Khác'
      ],
      lcdSizes: [
        'Treo dọc: 32 inch (740x430x54mm)',
        'Treo dọc: 43 inch(983x571x55mm)',
        'Treo ngang 32 inch (740x430x54mm)',
        'Treo ngang 43 inch(983x571x55mm)',
        'Chân đứng: 49 inch (1770x646x46mm)',
        'Chân đứng 55 inch (1800x722x48mm)',
        'Thêm mới'
      ],
      posterQuantity: [1,2,3,4,5,6,7,8,9,10]
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

  watch: {
    'form.center_type': {
      handler () {
        this.form = {
          ...this.form,
          service_center: null,
          service_center_name: null
        }
      }
    },
    'form.service_center': {
      handler (id) {
        const { center_type } = this.form
        const _array = center_type === 'VNVC' ? this.vnvcs : this.nutrihomes
        const result = _.find(_array, function(item) {
          if (item.id === id) {
            return true
          }
        })
        this.form = {
          ...this.form,
          service_center_name: result.name
        }
      }
    },
    'form.category': {
      handler () {
        this.form = {
          ...this.form,
          lcd_size1: null,
          lcd_size_other1: null,
          poster_quantity1: null,
          lcd_quantity1: null,
          lcd_size2: null,
          lcd_size_other2: null,
          poster_quantity2: null,
          lcd_quantity2: null,
          lcd_size3: null,
          lcd_size_other3: null,
          poster_quantity3: null,
          lcd_quantity3: null,
          lcd_size4: null,
          lcd_size_other4: null,
          poster_quantity4: null,
          lcd_quantity4: null,
          lcd_size5: null,
          lcd_size_other5: null,
          poster_quantity5: null,
          lcd_quantity5: null,
          lcd_size6: null,
          lcd_size_other6: null,
          poster_quantity6: null,
          lcd_quantity6: null,
          lcd_size7: null,
          lcd_size_other7: null,
          poster_quantity7: null,
          lcd_quantity7: null,
          lcd_size8: null,
          lcd_size_other8: null,
          poster_quantity8: null,
          lcd_quantity8: null
        }
      }
    },
    'form.position': {
      handler () {
        this.form = {
          ...this.form,
          position_other: null
        }
      }
    },
    'form.area_suggestion1': {
      handler () {
        this.form = {
          ...this.form,
          location_suggestion1: null,
          area_suggestion_other1: null,
          location_suggestion_other1: null
        }
      }
    },
    'form.location_suggestion1': {
      handler () {
        this.form = {
          ...this.form,
          location_suggestion_other1: null
        }
      }
    },
    'form.area_suggestion2': {
      handler () {
        this.form = {
          ...this.form,
          location_suggestion2: null,
          area_suggestion_other2: null,
          location_suggestion_other2: null
        }
      }
    },
    'form.location_suggestion2': {
      handler () {
        this.form = {
          ...this.form,
          location_suggestion_other1: null
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
      this.vnvcs = null
      this.form = {
        center_type: null,
        service_center: null,
        service_center_name: null,
        full_name: null,
        phone: null,
        position: null,
        position_other: null,
        category: null,

        area_suggestion1: null,
        area_suggestion_other1: null,
        location_suggestion1: null,
        location_suggestion_other1: null,
        lcd_size1: null,
        lcd_size_other1: null,
        poster_quantity1: null,
        lcd_quantity1: null,

        area_suggestion2: null,
        area_suggestion_other2: null,
        location_suggestion2: null,
        location_suggestion_other2: null,
        lcd_size2: null,
        lcd_size_other2: null,
        poster_quantity2: null,
        lcd_quantity2: null,

        area_suggestion3: null,
        area_suggestion_other3: null,
        location_suggestion3: null,
        location_suggestion_other3: null,
        lcd_size3: null,
        lcd_size_other3: null,
        poster_quantity3: null,
        lcd_quantity3: null,

        area_suggestion4: null,
        area_suggestion_other4: null,
        location_suggestion4: null,
        location_suggestion_other4: null,
        lcd_size4: null,
        lcd_size_other4: null,
        poster_quantity4: null,
        lcd_quantity4: null,

        area_suggestion5: null,
        area_suggestion_other5: null,
        location_suggestion5: null,
        location_suggestion_other5: null,
        lcd_size5: null,
        lcd_size_other5: null,
        poster_quantity5: null,
        lcd_quantity5: null,

        area_suggestion6: null,
        area_suggestion_other6: null,
        location_suggestion6: null,
        location_suggestion_other6: null,
        lcd_size6: null,
        lcd_size_other6: null,
        poster_quantity6: null,
        lcd_quantity6: null,

        area_suggestion7: null,
        area_suggestion_other7: null,
        location_suggestion7: null,
        location_suggestion_other7: null,
        lcd_size7: null,
        lcd_size_other7: null,
        poster_quantity7: null,
        lcd_quantity7: null,

        area_suggestion8: null,
        area_suggestion_other8: null,
        location_suggestion8: null,
        location_suggestion_other8: null,
        lcd_size9: null,
        lcd_size_other9: null,
        poster_quantity9: null,
        lcd_quantity9: null
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
                })
          ])
          .finally(() => {
            this.loading = false
          })
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
.main-title-suggestion {
  display: flex;
  justify-content: space-between;
}
</style>
