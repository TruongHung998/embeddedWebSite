<template lang="pug">
.loader
  component(:is="form" v-bind="binding")
</template>

<script>
import Vue from 'vue'
import qs from 'qs'

export default {
  computed: {
    query () {
      return qs.parse(window.location.search, {
        ignoreQueryPrefix: true
      }) || {}
    },

    form () {
      return this.query.form || 'Demo'
    },

    binding () {
      const props = {
        ...this.query
      }
      return props
    }
  },

  created () {
    const form = require(`../forms/${this.form}`).default
    Vue.component(this.form, form)
  }
}
</script>
