<template lang="pug">
.gia-date-input.el-input__inner
  .gia-date-input__inputs
    input(
      ref="date",
      v-model.lazy="date"
      placeholder="ngày"
      @keydown.right.prevent="() => $refs.month.select()"
      @keydown="filter"
      @keyup="e => change(e, 2, $refs.month)")
    span /
    input(
      ref="month"
      v-model.lazy="month"
      placeholder="tháng"
      @keydown.left.prevent="() => $refs.date.select()"
      @keydown.right.prevent="() => $refs.year.select()"
      @keydown="filter"
      @keyup="e => change(e, 2, $refs.year)")
    span /
    input(
      ref="year"
      v-model.lazy="year"
      placeholder="năm"
      @keydown.left.prevent="() => $refs.month.select()"
      @keydown="filter"
      @keyup="e => change(e, 4)")
</template>

<script>
import moment from "moment";

export default {
  inject: {
    elFormItem: {
      default: null,
    },
  },

  props: {
    value: {
      type: null,
      required: true,
    },
  },

  data() {
    return {
      date: null,
      month: null,
      year: null,
    };
  },

  computed: {
    filled() {
      return this.date && this.month && this.year;
    },
  },

  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (val) {
          const date = moment(val)
          this.date = date.date()
          this.month = date.month() + 1
          this.year = date.year()
        }
      }
    },

    date: 'transfer',
    month: 'transfer',
    year: 'transfer'
  },

  methods: {
    onKeyPress (e, length, next) {
      if (e.target.value.length >= length) {
        if (next) next.select()
      }
    },

    change (e, length, next) {
      const whitelisted = [
        'Shift',
        'Tab',
        'Backspace',
        'Delete',
        'ArrowDown',
        'ArrowUp',
        'ArrowRight',
        'ArrowLeft'
      ].includes(e.key)
      if (whitelisted) return
      if (e.target.value.length >= length) {
        if (next) next.select()
      }
    },

    filter (e) {
      const isNumber = isFinite(e.key)
      const whitelisted = [
        'Shift',
        'Tab',
        'Backspace',
        'Delete',
        'ArrowDown',
        'ArrowUp',
        'ArrowRight',
        'ArrowLeft'
      ].includes(e.key)
      if (!isNumber && !whitelisted) e.preventDefault()
    },

    emit (val = null) {
      this.$emit('input', val)
      if (this.elFormItem) this.elFormItem.validate()
    },

    transfer () {
      if (!this.filled) return this.emit(null)
      const res = moment()
      res.date(+this.date)
      res.month(+this.month - 1)
      res.year(+this.year)
      if (!res.isValid()) return this.emit(null)
      return this.emit(res.toDate())
    }
  }
};
</script>

<style lang="scss" scoped>
.gia-date-input {
  &__inputs {
    display: flex;
    align-items: center;
    > span {
      flex: 0 10px;
    }
    > input {
      outline: none;
      appearance: none;
      border: none;
      line-height: 24px;
      height: 24px;
      min-width: 0;
      flex: 1;
      text-align: center;
      font-size: 1rem;
    }
  }
}
</style>
