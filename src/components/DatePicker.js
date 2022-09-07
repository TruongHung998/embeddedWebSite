import { DatePicker } from 'element-ui'

export default {
  extends: DatePicker,

  props: {
    format: {
      type: String,
      default: 'dd/MM/yyyy'
    },

    placeholder: {
      type: String,
      default: 'Ngày/Tháng/Năm'
    }
  }
}
