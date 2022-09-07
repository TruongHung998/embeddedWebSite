<template lang="pug">
.form
  pre
    code(v-text="JSON.stringify({ key, form }, null, 2)")
</template>

<script>
import Vue from 'vue'
import {
  Row,
  Col,
  Form,
  FormItem,
  Input,
  RadioGroup,
  RadioButton,
  Radio,
  CheckboxGroup,
  CheckboxButton,
  Checkbox,
  Option,
  OptionGroup,
  Button,
  Tooltip,
  Loading,
  Switch,
  Dialog
} from 'element-ui'
import { cloneDeep, isObject, isString } from 'lodash'
import DatePicker from '../components/DatePicker'
import Select from '../components/Select'
import MultipleChoices from '../components/MultipleChoices'
import SingleChoice from '../components/SingleChoice'
import ApisService from '../services/apis'
import * as formatters from '../services/formatters'
import VueQRCodeComponent from 'vue-qrcode-component'

import vi from 'element-ui/lib/locale/lang/vi'
import locale from 'element-ui/lib/locale'
locale.use(vi)

Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Checkbox)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Loading.directive)

export default {
  components: {
    ElDatePicker: DatePicker,
    ElSelect: Select,
    MultipleChoices,
    SingleChoice,
    'qr-code': VueQRCodeComponent
  },

  filters: {
    ...formatters
  },

  props: {
    source: {
      type: String,
      default: null
    },

    next: {
      type: String,
      default: null
    },

    home: {
      type: String,
      default: 'https://vnvc.vn'
    },

    extras: {
      type: [String, Object],
      default: 'null'
    }
  },

  data () {
    let binded = null
    try {
      if (isObject(this.extras)) binded = cloneDeep(this.extras)
      else if (isString(this.extras)) JSON.parse(this.extras)
    } catch (e) {
      console.error(e)
    }
    return {
      key: 'Base',
      loading: false,
      submitting: false,
      finished: false,
      binded,
      form: {}
    }
  },

  computed: {
    $apis: () => ApisService
  },

  created () {
    if (this.reset) this.reset()
  },

  methods: {
    normalize: val => val,

    send () {
      return this.$apis.forms
        .push(this.key, {
          _source: this.source,
          ...this.normalize(this.form)
        })
        .then(console.log)
    },

    scrollToTop () {
      const rect = this.$el.getBoundingClientRect()
      console.log(rect.top + window.scrollY - 72)
      if (rect) window.scrollTo(0, rect.top + window.scrollY - 72)
    },

    submit () {
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
      })
    }
  }
}
</script>

<style lang="scss" src="../assets/forms.scss"></style>
