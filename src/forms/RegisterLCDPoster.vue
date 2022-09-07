<template lang="pug">
  .ep-wrapper.register-lcd-poster
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
          .ep-section__title.big__heading HẠNG MỤC ĐỀ XUẤT LCD
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC CỬA RA VÀO
            el-switch(v-model="controlSuggestion1")
          .ep-section__body(v-if="controlSuggestion1")
            el-form-item(label="Khu vực" prop="area_suggestion1")
              el-radio-group.ep-full(v-model="form.area_suggestion1")
                el-radio-button(:label="'MAIN_DOOR'" :value="'MAIN_DOOR'") Cửa ra vào
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item.label-other(v-if="form.area_suggestion1 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other1")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other1" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion1")
              el-radio-group.ep-full(v-model="form.location_suggestion1")
                el-radio-button(:label="'MAIN_PILLAR'" :disabled="form.area_suggestion1 === 'OTHERS'" :value="'MAIN_PILLAR'") Cột chính bên ngoài
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item.label-other(v-if="form.location_suggestion1 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other1")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other1" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size1")
              el-select(v-model="form.lcd_size1")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other1", v-if="form.lcd_size1 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other1" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity1")
              el-select(v-model="form.lcd_quantity1")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion1")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.note_suggestion1" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC KHÁM
            el-switch(v-model="controlSuggestion2")
          .ep-section__body(v-if="controlSuggestion2")
            el-form-item(label="Khu vực" prop="area_suggestion2")
              el-radio-group.ep-full(v-model="form.area_suggestion2")
                el-radio-button(:label="'EXAMINATION'" :value="'EXAMINATION'") Khu vực khám
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item.label-other(v-if="form.area_suggestion2 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other2")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other2" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion2")
              el-radio-group.ep-full(v-model="form.location_suggestion2")
                el-radio-button(:label="'REGISTRATION_DESK'" :disabled="form.area_suggestion2 === 'OTHERS'" :value="'REGISTRATION_DESK'") Cạnh bàn đăng ký
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item.label-other(v-if="form.location_suggestion2 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other2")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other2" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size2")
              el-select(v-model="form.lcd_size2")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other2", v-if="form.lcd_size2 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other2" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity2")
              el-select(v-model="form.lcd_quantity2")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion2")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.note_suggestion2" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC CHECKIN
            el-switch(v-model="controlSuggestion3")
          .ep-section__body(v-if="controlSuggestion3")
            el-form-item(label="Khu vực" prop="area_suggestion3")
              el-radio-group.ep-full(v-model="form.area_suggestion3")
                el-radio-button(:label="'CHECKIN'" :value="'CHECKIN'") Khu vực checkin
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item.label-other(v-if="form.area_suggestion3 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other3")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other3" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion3")
              el-radio-group.ep-full(v-model="form.location_suggestion3")
                el-radio-button(:label="'BEHIND_CHECK'" :disabled="form.area_suggestion3 === 'OTHERS'" :value="'BEHIND_CHECK'") Tường đằng sau quầy checkin
                el-radio-button(:label="'NEAR_PAYMENT'" :disabled="form.area_suggestion3 === 'OTHERS'" :value="'NEAR_PAYMENT'") Bên cạnh bàn thanh toán
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item.label-other(v-if="form.location_suggestion3 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other3")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other3" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size3")
              el-select(v-model="form.lcd_size3")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other3", v-if="form.lcd_size3 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other3" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity3")
              el-select(v-model="form.lcd_quantity3")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion3")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.note_suggestion3" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC THU NGÂN
            el-switch(v-model="controlSuggestion4")
          .ep-section__body(v-if="controlSuggestion4")
            el-form-item(label="Khu vực" prop="area_suggestion4")
              el-radio-group.ep-full(v-model="form.area_suggestion4")
                el-radio-button(:label="'COUNTER'" :value="'COUNTER'") Khu vực thu ngân
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item.label-other(v-if="form.area_suggestion4 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other4")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other4" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion4")
              el-radio-group.ep-full(v-model="form.location_suggestion4")
                el-radio-button(:label="'BEHIND_COUNTER'" :disabled="form.area_suggestion4 === 'OTHERS'" :value="'BEHIND_COUNTER'") Tường đằng sau quầy thanh toán
                el-radio-button(:label="'WAIT_AFTER_INJECTED'" :disabled="form.area_suggestion4 === 'OTHERS'" :value="'WAIT_AFTER_INJECTED'") Vị trí KH chờ sau tiêm
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item.label-other(v-if="form.location_suggestion4 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other4")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other4" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size4")
              el-select(v-model="form.lcd_size4")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other4", v-if="form.lcd_size4 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other4" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity4")
              el-select(v-model="form.lcd_quantity4")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion4")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.note_suggestion4" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC CHỜ SAU TIÊM
            el-switch(v-model="controlSuggestion5")
          .ep-section__body(v-if="controlSuggestion5")
            el-form-item(label="Khu vực" prop="area_suggestion5")
              el-radio-group.ep-full(v-model="form.area_suggestion5")
                el-radio-button(:label="'WAIT_AFTER_INJECTED'" :value="'WAIT_AFTER_INJECTED'") Khu vực chờ sau tiêm
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item.label-other(v-if="form.area_suggestion5 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other5")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other5" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion5")
              el-radio-group.ep-full(v-model="form.location_suggestion5")
                el-radio-button(:label="'WALL_COLUMN_INJECT'" :disabled="form.area_suggestion5 === 'OTHERS'" :value="'WALL_COLUMN_INJECT'") Các cột tường các phòng khám/tiêm
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item.label-other(v-if="form.location_suggestion5 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other5")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other5" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size5")
              el-select(v-model="form.lcd_size5")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other5", v-if="form.lcd_size5 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other5" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity5")
              el-select(v-model="form.lcd_quantity5")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion5")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.note_suggestion5" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC VUI CHƠI TRẺ EM
            el-switch(v-model="controlSuggestion6")
          .ep-section__body(v-if="controlSuggestion6")
            el-form-item(label="Khu vực" prop="area_suggestion6")
              el-radio-group.ep-full(v-model="form.area_suggestion6")
                el-radio-button(:label="'CHIDREN_PLAY_AREA'" :value="'CHIDREN_PLAY_AREA'") Khu vực vui chơi trẻ em
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item.label-other(v-if="form.area_suggestion6 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other6")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other6" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion6")
              el-radio-group.ep-full(v-model="form.location_suggestion6")
                el-radio-button(:label="'WALL_CHIDREN_PLAY_AREA'" :disabled="form.area_suggestion6 === 'OTHERS'" :value="'WALL_CHIDREN_PLAY_AREA'") Các cột tại Khu vui chơi trẻ em
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item.label-other(v-if="form.location_suggestion6 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other6")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other6" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size6")
              el-select(v-model="form.lcd_size6")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other6", v-if="form.lcd_size6 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other6" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity6")
              el-select(v-model="form.lcd_quantity6")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion6")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.note_suggestion6" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC THANG MÁY
            el-switch(v-model="controlSuggestion7")
          .ep-section__body(v-if="controlSuggestion7")
            el-form-item(label="Khu vực" prop="area_suggestion7")
              el-radio-group.ep-full(v-model="form.area_suggestion7")
                el-radio-button(:label="'ELEVATOR_AREA'" :value="'ELEVATOR_AREA'") Khu vực thang máy
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Khu vực khác
            el-form-item.label-other(v-if="form.area_suggestion7 === 'OTHERS'" :label="`Nhập khu vực khác`" prop="area_suggestion_other7")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other7" clearable)
            el-form-item(label="Vị trí" prop="location_suggestion7")
              el-radio-group.ep-full(v-model="form.location_suggestion7")
                el-radio-button(:label="'ELEVATOR_AREA'" :disabled="form.area_suggestion7 === 'OTHERS'" :value="'ELEVATOR_AREA'") Khu vực thang máy
                el-radio-button(:label="'OTHERS'" :value="'OTHERS'") Vị trí khác
            el-form-item.label-other(v-if="form.location_suggestion7 === 'OTHERS'" :label="`Nhập vị trí khác`" prop="location_suggestion_other7")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other7" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size7")
              el-select(v-model="form.lcd_size7")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other7", v-if="form.lcd_size7 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other7" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity7")
              el-select(v-model="form.lcd_quantity7")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion7")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.note_suggestion7" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        section.ep-section
          .ep-section__title.main-title-suggestion KHU VỰC ĐỀ XUẤT KHÁC
            el-switch(v-model="controlSuggestion8")
          .ep-section__body(v-if="controlSuggestion8")
            el-form-item.label-other(:label="`Nhập khu vực khác`" prop="area_suggestion_other8")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.area_suggestion_other8" clearable)
            el-form-item.label-other(:label="`Nhập vị trí khác`" prop="location_suggestion_other8")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.location_suggestion_other8" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size8")
              el-select(v-model="form.lcd_size8")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other8", v-if="form.lcd_size8 === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.lcd_size_other8" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity8")
              el-select(v-model="form.lcd_quantity8")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion8")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.note_suggestion8" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        el-button(@click="onAddSection()" type="success", style="margin-bottom: 20px;") +Thêm khu vực đề xuất
        section.ep-section(v-for="(i, j) in form.others")
          .ep-section__title.main-title-suggestion {{ `KHU VỰC ĐỀ XUẤT KHÁC ${j + 1}` }}
            el-button(type="danger" @click="onRemoveSection(j)" icon="el-icon-delete")
          .ep-section__body
            el-form-item.label-other(:label="`Nhập khu vực khác`" :prop="form.others[j].area_suggestion_other")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.others[j].area_suggestion_other" clearable)
            el-form-item.label-other(:label="`Nhập vị trí khác`" prop="location_suggestion_other")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.others[j].location_suggestion_other" clearable)
            el-form-item(label="Kích thước LCD" prop="lcd_size")
              el-select(v-model="form.others[j].lcd_size")
                template
                  el-option(
                    v-for="(i, k) in lcdSizes"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item(label="Thêm mới kích thước LCD" prop="lcd_size_other", v-if="form.others[j].lcd_size === 'Thêm mới'")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.others[j].lcd_size_other" clearable)
            el-form-item(label="Số lượng" prop="lcd_quantity")
              el-select(v-model="form.others[j].lcd_quantity")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.others[j].note_suggestion" clearable)
            i Kích thước 32 inch thích hợp với treo ở cột, 43 inch thích hợp với treo ở khu vực tường lớn, Chân đứng thích hợp với đặt tại Cổng ra/ Cổng vào
        section.ep-section
          .ep-section__title.big__heading HẠNG MỤC ĐỀ XUẤT POSTER
        el-button(@click="onAddPosterSection()" type="warning", style="margin-bottom: 20px;") +Thêm hạng mục đề xuất POSTER
        section.ep-section(v-for="(i, j) in form.posters")
          .ep-section__title.main-title-suggestion {{ `ĐỀ XUẤT POSTER ${j + 1}` }}
            el-button(type="danger" @click="onRemovePosterSection(j)" icon="el-icon-delete")
          .ep-section__body
            el-form-item.label-other(:label="`Nhập khu vực đề xuất POSTER`" :prop="form.posters[j].area_suggestion")
              el-input.text-input(placeholder="Nhập tên khu vực khác" v-model="form.posters[j].area_suggestion" clearable)
            el-form-item.label-other(:label="`Nhập vị trí đề xuất POSTER`" prop="location_suggestion")
              el-input.text-input(placeholder="Nhập vị trí khác" v-model="form.posters[j].location_suggestion" clearable)
            el-form-item(label="Nhập kích thước POSTER" prop="poster_size")
              el-input.text-input(placeholder="Nhập kích thước khác" v-model="form.posters[j].poster_size" clearable)
            el-form-item(label="Số lượng POSTER" prop="poster_quantity")
              el-select(v-model="form.posters[j].poster_quantity")
                template
                  el-option(
                    v-for="(i, k) in posterQuantity"
                    :key="i"
                    :value="i"
                    :label="i") {{ i }}
            el-form-item.label-other(:label="`Ghi chú`" prop="note_suggestion_poster")
              el-input.text-input(placeholder="Nhập ghi chú" v-model="form.posters[j].note" clearable)
            i Tùy vị trí trung tâm có nhu cầu lắp đặt poster, Trung tâm đo đạc và đề xuất  kích thước phù hợp. Quy cách: mica tạo khung nhét format in PP để dễ dàng thay nội dung
      el-button(@click="onSubmit()" type="primary" size="large") Hoàn thành đăng ký

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
      key: 'RegisterLCDPoster',
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
        phone: [...$v.phone], //$v.required,
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
        lcd_quantity1: $v.required,

        area_suggestion2: $v.required,
        area_suggestion_other2: $v.required,
        location_suggestion2: $v.required,
        location_suggestion_other2: $v.required,
        lcd_size2: $v.required,
        lcd_size_other2: $v.required,
        lcd_quantity2: $v.required,

        area_suggestion3: $v.required,
        area_suggestion_other3: $v.required,
        location_suggestion3: $v.required,
        location_suggestion_other3: $v.required,
        lcd_size3: $v.required,
        lcd_size_other3: $v.required,
        lcd_quantity3: $v.required,

        area_suggestion4: $v.required,
        area_suggestion_other4: $v.required,
        location_suggestion4: $v.required,
        location_suggestion_other4: $v.required,
        lcd_size4: $v.required,
        lcd_size_other4: $v.required,
        lcd_quantity4: $v.required,

        area_suggestion5: $v.required,
        area_suggestion_other5: $v.required,
        location_suggestion5: $v.required,
        location_suggestion_other5: $v.required,
        lcd_size5: $v.required,
        lcd_size_other5: $v.required,
        lcd_quantity5: $v.required,

        area_suggestion6: $v.required,
        area_suggestion_other6: $v.required,
        location_suggestion6: $v.required,
        location_suggestion_other6: $v.required,
        lcd_size6: $v.required,
        lcd_size_other6: $v.required,
        lcd_quantity6: $v.required,

        area_suggestion7: $v.required,
        area_suggestion_other7: $v.required,
        location_suggestion7: $v.required,
        location_suggestion_other7: $v.required,
        lcd_size7: $v.required,
        lcd_size_other7: $v.required,
        lcd_quantity7: $v.required,

        area_suggestion_other8: $v.required,
        location_suggestion_other8: $v.required,
        lcd_size8: $v.required,
        lcd_size_other8: $v.required,
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
        },
        {
          id: 'NUTRIHOME_Q12',
          name: 'Nutrihome Quận 12'
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
      posterQuantity: [1,2,3,4,5,6,7,8,9,10],
      area_suggestion: null,
      area_suggestion_other: null,
      location_suggestion: null,
      location_suggestion_other: null,
      lcd_size: null,
      lcd_size_other: null,
      poster_quantity: null,
      lcd_quantity: null
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
        if (!id) { return }
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
    onRemoveSection (index) {
      const { others } = this.form
      others.splice(index, 1)
      this.form = {
        ...this.form,
        others
      }
    },
    onAddSection () {
      const { others } = this.form
      others.push({
        area_suggestion: null,
        area_suggestion_other: null,
        location_suggestion: null,
        location_suggestion_other: null,
        lcd_size: null,
        lcd_size_other: null,
        lcd_quantity: null,
      })
      this.form = {
        ...this.form,
        others
      }
    },
    onAddPosterSection () {
      const { posters } = this.form
      posters.push({
        area_suggestion: null,
        location_suggestion: null,
        poster_size: null,
        poster_quantity: null,
        note: null
      })
      this.form = {
        ...this.form,
        posters
      }
    },
    onRemovePosterSection (index) {
      const { posters } = this.form
      posters.splice(index, 1)
      this.form = {
        ...this.form,
        posters
      }
    },
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
        lcd_quantity1: null,
        note_suggestion1: null,

        area_suggestion2: null,
        area_suggestion_other2: null,
        location_suggestion2: null,
        location_suggestion_other2: null,
        lcd_size2: null,
        lcd_size_other2: null,
        lcd_quantity2: null,
        note_suggestion2: null,

        area_suggestion3: null,
        area_suggestion_other3: null,
        location_suggestion3: null,
        location_suggestion_other3: null,
        lcd_size3: null,
        lcd_size_other3: null,
        lcd_quantity3: null,
        note_suggestion3: null,

        area_suggestion4: null,
        area_suggestion_other4: null,
        location_suggestion4: null,
        location_suggestion_other4: null,
        lcd_size4: null,
        lcd_size_other4: null,
        lcd_quantity4: null,
        note_suggestion4: null,

        area_suggestion5: null,
        area_suggestion_other5: null,
        location_suggestion5: null,
        location_suggestion_other5: null,
        lcd_size5: null,
        lcd_size_other5: null,
        lcd_quantity5: null,
        note_suggestion5: null,

        area_suggestion6: null,
        area_suggestion_other6: null,
        location_suggestion6: null,
        location_suggestion_other6: null,
        lcd_size6: null,
        lcd_size_other6: null,
        lcd_quantity6: null,
        note_suggestion6: null,

        area_suggestion7: null,
        area_suggestion_other7: null,
        location_suggestion7: null,
        location_suggestion_other7: null,
        lcd_size7: null,
        lcd_size_other7: null,
        lcd_quantity7: null,
        note_suggestion7: null,

        area_suggestion_other8: null,
        location_suggestion_other8: null,
        lcd_size8: null,
        lcd_size_other8: null,
        lcd_quantity8: null,
        note_suggestion8: null,

        others: [],
        posters: []
      }
      this.fetch()
    },

    onSubmit () {
      const form = this.$refs.form
      if (!form) return
      form.validate(ok => {
        if (!ok) {
          for (const i in form.fields) {
            const field = form.fields[i]
            console.log('field', field)
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

        this.loading = true
        this.$apis.forms
          .checkBookingExist({
            form_id: 'RegisterLCDPoster',
            service_center: this.form.service_center
          })
          .then((res) => {
            console.log('res', res)
            if (res && res.data && res.data.data && Array.isArray(res.data.data)) {
              if (res.data.data.length > 0) {
                alert('Trung tâm của bạn đã có trong cơ sở dữ liệu. Bạn chỉ được gửi 1 lần duy nhất.')
              } else {
                this.loading = false
                this.submitting = true
                return this
                    .send()
                    .then(() => {
                      this.finished = true
                      this.scrollToTop()
                    })
                    .finally(() => {
                      this.submitting = false
                    })
              }
            } else {
              alert('Đã có lỗi xảy ra')
            }
          })
          .finally(() => {
            this.loading = false
        })
      })
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
.register-lcd-poster {
  .main-title-suggestion {
    display: flex;
    justify-content: space-between;
  }
  .big__heading {
    font-size: 20px;
  }
}
</style>

<style lang="scss">
.register-lcd-poster {
  .el-form-item__label {
    font-weight: bold;
  }
  .label-other {
    .el-form-item__label {
      font-weight: normal;
    }
  }
}
</style>
