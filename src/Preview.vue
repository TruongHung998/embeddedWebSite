<template lang="pug">
.page.preview
  .container
    component(:is="form")
</template>

<script>
import Demo from './forms/Demo'
import VnvcOnlineBooking from './forms/VnvcOnlineBooking'
import OnlineBookingSurvey from './forms/OnlineBookingSurvey'
import BookStore from './forms/BookStore'
import SignConsultation6m from './forms/SignupConsultation6m'
import TAVaccineBooking from './forms/TAVaccineBooking'
import VaccineCovid19Register from './forms/VaccineCovid19Register'
import VaccineCovid19RegisterAds from './forms/VaccineCovid19RegisterAds'
import SchoolProgramVoucherResult from './forms/SchoolProgramVoucherResult'
import RegisterLCDPoster from './forms/RegisterLCDPoster'

export default {
  components: {
    Demo,
    VnvcOnlineBooking,
    OnlineBookingSurvey,
    BookStore,
    SignConsultation6m,
    TAVaccineBooking,
    VaccineCovid19Register,
    VaccineCovid19RegisterAds,
    SchoolProgramVoucherResult,
    RegisterLCDPoster
  },

  computed: {
    form () {
      const res = location.search.substr(1)
      return res || 'Demo'
    }
  }
}
</script>

<style lang="scss" src="./assets/forms.scss"></style>
<style lang="scss">
html,
body {
  font-family: --apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
}
input,
button {
  font-family: --apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
}
.container {
  max-width: 640px;
  padding: 0 16px;
  margin: 0 auto;
}
.preview {
  margin: 3em 0;
}
</style>
