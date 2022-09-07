import { Select } from 'element-ui'

export default {
  extends: Select,

  props: {
    defaultFirstOption: {
      type: Boolean,
      default: true
    },

    filterable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    readonly() {
      const isIE = !this.$isServer && !isNaN(Number(document.documentMode))
      return (!this.filterable || this.multiple || !isIE) && !this.visible && !this.remote
    }
  }
}
