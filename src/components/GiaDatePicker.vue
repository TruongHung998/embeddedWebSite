<template lang="pug">
.gia-date-picker
  .gia-date-picker__input.el-input__inner(@click="togglePanel(true)")
    i.gia-date-picker__icon.bx.bx-calendar
    .gia-date-picker__selected {{ formattedValue }}

  .gia-date-picker__overlay(
    v-if="displayPanel"
    @click="togglePanel(false)")
    .gia-date-picker__panel(@click.stop)
      .gia-date-picker__panel-instruction(v-text="placeholder" v-if="placeholder")
      .gia-date-picker__panel-header
        .gia-date-picker__panel-previous(@click="toPreviousMonth")
          i.bx.bx-chevron-left

        .gia-date-picker__panel-selects
          select(v-model="month")
            option(v-for="i in months" :key="i.id" :value="i.id") {{ i.name }}

          select(v-model="year")
            option(v-for="i in years" :key="i" :value="i") {{ i }}

        .gia-date-picker__panel-next(@click="toNextMonth")
          i.bx.bx-chevron-right

      .gia-date-picker__panel-content
        .gia-date-picker__grid
          .gia-date-picker__dow T2
          .gia-date-picker__dow T3
          .gia-date-picker__dow T4
          .gia-date-picker__dow T5
          .gia-date-picker__dow T6
          .gia-date-picker__dow T7
          .gia-date-picker__dow CN
          .gia-date-picker__empty(v-for="i, k in offset" :key="k")
          .gia-date-picker__date(
            v-for="i, k in dates"
            :class="{'gia-date-picker__date--disabled': i.disabled, 'gia-date-picker__date--selected': i.selected, 'gia-date-picker__date--today': i.today}"
            @click="select(i)")
            span(v-if="!$scopedSlots.date") {{ i.label }}
            slot(name="date" :date="i")
</template>

<script>
import moment from 'moment'

export default {
  inject: {
    elFormItem: {
      default: null
    }
  },

  props: {
    value: {
      type: null,
      required: true
    },

    format: {
      type: String,
      default: 'DD/MM/YYYY'
    },

    placeholder: {
      type: String,
      default: 'Chọn ngày'
    },

    min: {
      type: null,
      default: () => moment().subtract(200, 'years').toDate()
    },

    max: {
      type: null,
      default: () => moment().add(200, 'years').toDate()
    }
  },

  data () {
    return {
      displayPanel: false,
      month: null,
      year: null
    }
  },

  computed: {
    moment: () => moment,
    formattedValue () {
      if (!this.value) return this.placeholder
      return moment(this.value).format(this.format)
    },

    years () {
      const start = moment(this.min).year()
      const end = moment(this.max).year()
      const res = []
      for (let i = start; i <= end; i++) res.push(i)
      return res
    },

    months () {
      return [
        { id: 0, name: 'Tháng 1' },
        { id: 1, name: 'Tháng 2' },
        { id: 2, name: 'Tháng 3' },
        { id: 3, name: 'Tháng 4' },
        { id: 4, name: 'Tháng 5' },
        { id: 5, name: 'Tháng 6' },
        { id: 6, name: 'Tháng 7' },
        { id: 7, name: 'Tháng 8' },
        { id: 8, name: 'Tháng 9' },
        { id: 9, name: 'Tháng 10' },
        { id: 10, name: 'Tháng 11' },
        { id: 11, name: 'Tháng 12' }
      ]
    },

    dates () {
      const now = moment().format('DD/MM/YYYY')
      const eom = moment()
        .year(this.year)
        .month(this.month)
        .endOf('month')
        .date()
      const res = []
      for (let i = 1; i <= eom; i++) {
        const current = moment({
          year: this.year,
          month: this.month,
          date: i
        })
        res.push({
          label: i,
          today: current.format('DD/MM/YYYY') === now,
          disabled: current < this.min || current > this.max,
          selected: current.format(this.format) === this.formattedValue,
          value: current
        })
      }
      return res
    },

    offset () {
      const dow = moment()
        .year(this.year)
        .month(this.month)
        .date(1)
        .day()
      return dow === 0 ? 6 : dow - 1
    }
  },

  methods: {
    toNextMonth () {
      const res = moment({
        month: this.month,
        year: this.year
      }).add(1, 'month')
      this.month = res.month()
      this.year = res.year()
    },

    toPreviousMonth () {
      const res = moment({
        month: this.month,
        year: this.year
      }).subtract(1, 'month')
      this.month = res.month()
      this.year = res.year()
    },

    resetPicker () {
      this.year = this.value
        ? moment(this.value).year()
        : moment().year()
      this.month = this.value
        ? moment(this.value).month()
        : moment().month()
    },

    togglePanel (to) {
      this.displayPanel = to !== undefined
        ? to
        : !this.displayPanel
      if (this.displayPanel) {
        this.resetPicker()
      } else {
        this.query = ''
      }
    },

    select (date) {
      if (date.disabled) return
      this.$emit('input', date.value.toDate())
      this.togglePanel(false)
      if (this.elFormItem) this.elFormItem.validate()
    },

    focus () {
      this.togglePanel(true)
    }
  }
}
</script>

<style lang="scss" scoped>
$--color-primary: #102E9E;
$--color-primary-highlight: #0075FF;
$--color-paper: #F0F2F1;
$--color-text-regular: #000;
$--color-text-secondary: #606266;
$--radius: 4px;

.gia-date-picker {
  &__icon {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 18px;
    pointer-events: none;
    color: $--color-primary;
  }
  &__input {
    cursor: pointer;
    padding-left: 32px;
  }
  &__overlay {
    z-index: 10000;
    background: rgba(black, .25);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
    > * {
      min-width: 0;
    }
  }
  &__panel {
    margin-top: 10vh;
    width: 90%;
    max-width: 360px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(black, .1);
    > * {
      min-height: 0;
    }
    &-next,
    &-previous {
      padding: 0 6px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    &-selects {
      text-align: center;
      > select {
        min-width: 96px;
        font-size: 1em;
        border-radius: $--radius;
        border: none;
        background: white;
        color: $--color-text-regular;
        padding: .5em;
        outline: none;
        &:not(:last-child) {
          margin-right: .5em;
        }
      }
    }
    &-instruction {
      background: $--color-primary;
      font-size: 13px;
      line-height: 1.3em;
      padding: .75em .5em 0;
      color: white;
      text-align: center;
    }
    &-header {
      background: $--color-primary;
      display: flex;
      color: white;
      padding: 8px;
      align-items: center;
      > * {
        min-width: 0;
      }
      input {
        width: 100%;
        &::placeholder {
          color: rgba(white, .5);
          font-size: 13px;
        }
      }
    }
    &-close {
      flex: 0 48px;
      font-size: 14px;
      text-align: center;
      margin-left: 8px;
      cursor: pointer;
    }
    &-selects {
      flex: 1;
      > input {
        appearance: none;
        outline: none;
        border: none;
        width: 100%;
        background: darken($--color-primary, 8);
        color: white;
        border-radius: $--radius;
        padding: 10px;
      }
    }
    &-content {
      background: white;
      line-height: 1.35em;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: .5em;
    grid-gap: .25em;
    > * {
      text-align: center;
    }
  }
  &__dow {
    padding: .25em 0;
    font-size: .9em;
    color: $--color-text-regular;
    font-weight: bold;
    text-transform: uppercase;
  }
  &__date {
    padding: 1em 0;
    cursor: pointer;
    border-radius: $--radius;
    position: relative;
    &--today {
      color: $--color-primary;
    }
    &:hover {
      background: $--color-primary-highlight;
    }
    &--disabled {
      color: lighten($--color-text-secondary, 45);
      cursor: not-allowed;
      img {
        opacity: .3;
      }
      &:hover {
        background: transparent;
      }
    }
    &--selected {
      background: $--color-primary;
      color: white;
      font-weight: bold;
      border-radius: $--radius;
      &:hover {
        background: lighten($--color-primary, 5);
      }
    }
  }
}
</style>
