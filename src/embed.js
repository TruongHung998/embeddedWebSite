/* eslint-disable */
import Vue from 'vue'

(function () {
  const Preview = () => import(/* webpackChunkName: 'form.demo' */ './Preview.vue')

  const FORMS = {
    demo: () => import(
      /* webpackChunkName: 'form.demo' */
      './forms/Demo.vue'),
    'vnvc-online-booking': () => import(
      /* webpackChunkName: 'form.vnvc-online-booking' */
      './forms/VnvcOnlineBooking.vue'),
    'online-booking-survey': () => import(
      /* webpackChunkName: 'form.online-booking-survey' */
      './forms/OnlineBookingSurvey.vue'),
    'book-store': () => import(
      /* webpackChunkName: 'form.book-store' */
      './forms/BookStore.vue'),
    'signup-consultation-6m': () => import(
      /* webpackChunkName: 'form.signup-consultation-6m' */
      './forms/SignupConsultation6m.vue'),
    'ta-vaccine-booking': () => import(
      /* webpackChunkName: 'form.ta-vaccine-booking' */
      './forms/TAVaccineBooking.vue'),
    'vaccine-covid19-register': () => import(
      /* webpackChunkName: 'form.vaccine-covid19-register' */
      './forms/VaccineCovid19Register.vue'),
    'vaccine-covid19-register-ads': () => import(
      /* webpackChunkName: 'form.vaccine-covid19-register-ads' */
      './forms/VaccineCovid19RegisterAds.vue'),
    'school-program-voucher-result': () => import(
        /* webpackChunkName: 'form.school-program-voucher-result' */
        './forms/SchoolProgramVoucherResult.vue'),
    'ta-booking': () => import(
      /* webpackChunkName: 'form.ta-booking' */
      './forms/TaBooking.vue'),
    'vaccine-covid19-register-input': () => import(
        /* webpackChunkName: 'form.vaccine-covid19-register-input' */
        './forms/VaccineCovid19RegisterInput.vue'),
    'ta-vaccine-booking-nb': () => import(
        /* webpackChunkName: 'form.ta-vaccine-booking-nb' */
        './forms/TAVaccineBookingNB.vue'),
    'register-lcd-poster': () => import(
        /* webpackChunkName: 'form.register-lcd-poster' */
        './forms/RegisterLCDPoster.vue'),
    'evusheld-tracking': () => import(
        /* webpackChunkName: 'form.evusheld-tracking' */
        './forms/EvusheldTracking.vue'),
    'search-membership': () => import(
        /* webpackChunkName: 'form.search-membership' */
        './forms/SearchMembership.vue'),
  }

  const ref = document.getElementById('eplus-form-embed')
  if (ref) {
    const key = ref.getAttribute('data-form')
    const source = ref.getAttribute('data-source')
    const next = ref.getAttribute('data-next')
    const home = ref.getAttribute('data-home')
    const extras = ref.getAttribute('data-extras')
    const id = `eplus-form-embed__${key}`
    const div = document.createElement('div')
    div.setAttribute('id', id)
    ref.parentNode.insertBefore(div, ref)
    const props = {}
    if (source) props.source = source
    if (home) props.home = home
    if (next) props.next = next
    if (extras) props.extras = extras
    new Vue({
      render: h => h(FORMS[key], { props }),
    }).$mount(div)
  }

  window.embedForm = (root, key, props = {}) => {
    if (!root) return
    new Vue({
      render: h => h(FORMS[key], { props })
    }).$mount(root)
  }
})()
