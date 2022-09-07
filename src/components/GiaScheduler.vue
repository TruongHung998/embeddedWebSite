<template lang="pug">
.gia-scheduler.el-input.el-input--prefix
  .gia-scheduler__input.el-input__inner(@click="togglePanel(true)" :class="{'gia-scheduler__date--disabled-button': disabled}")
    span.el-input__prefix
      i.el-input__icon.bx.bx-calendar

    .gia-scheduler__input-content
      template(v-if="!date && !time") {{ placeholder }}
      template(v-else)
        span.gia-scheduler__selected-date(v-if="date") {{ moment(date).format(format) }}
        span.gia-scheduler__selected-time(v-if="time") {{ time }}

  .gia-scheduler__overlay(v-if="displayPanel" @click="togglePanel(false)")
    .gia-scheduler__panel(@click.stop)
      .gia-scheduler__panel-header
        .gia-scheduler__panel-placeholder {{ placeholder }}
        .gia-scheduler__panel-close(@click="togglePanel(false)") Đóng

      .gia-scheduler__panel-content
        p Chọn ngày khám
        .gia-scheduler__grid
          .gia-scheduler__previous(@click="toPreviousMonth")
            i.bx.bx-chevron-left
          .gia-scheduler__current {{ month + 1 }} / {{ year }}
          .gia-scheduler__next(@click="toNextMonth")
            i.bx.bx-chevron-right
          .gia-scheduler__dow T2
          .gia-scheduler__dow T3
          .gia-scheduler__dow T4
          .gia-scheduler__dow T5
          .gia-scheduler__dow T6
          .gia-scheduler__dow T7
          .gia-scheduler__dow CN
          .gia-scheduler__empty(v-for="i, k in offset" :key="k")
          .gia-scheduler__date(
            v-for="i, k in dates"
            :class="{'gia-scheduler__date--disabled': i.disabled, 'gia-scheduler__date--selected': i.selected, 'gia-scheduler__date--today': i.today, 'gia-scheduler__date--marked': i.marked}"
            @click="selectDate(i, k)")
            span(v-if="!$scopedSlots.date") {{ i.label }}
            slot(name="date" :date="i")

        p Chọn giờ khám

        template(v-if="!slots || slots.length === 0")
          .gia-scheduler__note
            template(v-if="selectedDate") Bác sĩ hiện chưa có lịch khám vào ngày này.
            template(v-else) Chọn ngày trước...

        template(v-else)
          .gia-scheduler__shifts
            .gia-scheduler__shift(
              v-for="i, k in slots"
              :key="k")
              el-radio(:label="i.id" v-model="selectedTime")
                strong(v-text="i.name")

          //- .gia-scheduler__slots
            .gia-scheduler__slot(
              v-for="i, k in slots"
              :key="k"
              @click="selectTime(i, k)"
              :class="{ 'gia-scheduler__slot--selected': time === i.id }")
              strong(v-text="i.name")
              div(v-if="i.help" v-text="i.help")

        el-button.gia-scheduler__action(
          type="primary"
          :disabled="!selectedDate || !selectedTime"
          @click="select")
          span(v-if="selectedDate && selectedTime") Chọn ngày&nbsp;
            strong(v-text="formattedValue")
            | &nbsp;→
          span(v-else="selectedDate || selectedTime") Vui lòng chọn đủ cả ngày và giờ
          span(v-else v-text="placeholder")

</template>

<script>
import moment from 'moment'
import {CENTER_HCM, CENTER_HN} from "../forms/TaBooking";

export default {
  inject: {
    elFormItem: {
      default: null
    }
  },

  props: {
    date: {
      type: null,
      required: true
    },

    time: {
      type: null,
      required: true
    },

    placeholder: {
      type: String,
      default: 'Chọn ngày giờ khám'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    min: {
      type: null,
      default: () => moment().subtract(1, 'days').toDate()
    },

    max: {
      type: null,
      default: () => moment().add(1, 'month').toDate()
    },

    format: {
      type: String,
      default: 'DD/MM/YYYY'
    },

    getSlots: {
      type: Function,
      default: () => null
    },
    center: {
      type: String,
    }
  },

  data () {
    return {
      displayPanel: false,
      month: null,
      year: null,
      slots: null,

      selectedDate: null,
      selectedTime: null
    }
  },

  computed: {
    moment: () => moment,

    formattedValue () {
      if (!this.selectedDate || !this.selectedTime) return null
      const slot = this.slots.find(i => i.id === this.selectedTime)
      if (!slot) return null
      const date = moment(this.selectedDate).format(this.format)
      const time = slot.name
      return `${date} - ${time}`
    },

    dates () {
      const selected = this.selectedDate
        ? moment(this.selectedDate).format(this.format)
        : null
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
        const slots = this.getSlots(current)
        res.push({
          label: i,
          today: current.format('DD/MM/YYYY') === now,
          disabled: current < this.min || current > this.max,
          selected: current.format(this.format) === selected,
          value: current,
          marked: slots !== null && slots.length > 0
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

  watch: {
    date: {
      immediate: true,
      handler (val) {
        if (val === this.selectedDate) return
        this.selectedTime = null
        this.slots = null
        this.selectedDate = val
      }
    },

    time: {
      immediate: true,
      handler (val) {
        this.selectedTime = val
      }
    },

    selectedDate (val) {
      if (!val) return
      this.slots = this.getSlots(val)
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

    selectDate (date) {
      if (date.disabled) return
      const _date = date.value.format('DD/MM/YYYY')
      const _now = moment().format('DD/MM/YYYY')
      if (_date === _now) {
        if (this.center === CENTER_HN) {
          alert('Website chưa cập nhật lịch khám trong ngày, Quý Khách vui lòng gọi hotline 1800 6858 để được nhân viên tư vấn đặt lịch. Xin Quý Khách thông cảm vì sự bất tiện này.\n' +
              'Trân trọng.')
        }
        if (this.center === CENTER_HCM) {
          alert('Website chưa cập nhật lịch khám trong ngày, Quý Khách vui lòng gọi hotline 028 7300 6858 để được nhân viên tư vấn đặt lịch. Xin Quý Khách thông cảm vì sự bất tiện này.\n' +
              'Trân trọng.')
        }
      } else {
        this.selectedDate = date.value.toDate()
        this.selectedTime = null
      }
    },

    resetPicker () {
      this.year = this.date
        ? moment(this.date).year()
        : moment().year()
      this.month = this.date
        ? moment(this.date).month()
        : moment().month()
    },

    togglePanel (to) {
      if (!this.disabled) {
        this.displayPanel = to !== undefined
            ? to
            : !this.displayPanel
        if (this.displayPanel) {
          this.resetPicker()
        } else {
          this.query = ''
        }
      }
    },

    focus () {
      this.togglePanel(true)
    },

    select () {
      this.$emit('update:date', this.selectedDate)
      this.$emit('update:time', this.selectedTime)
      this.togglePanel(false)
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

.gia-scheduler {
  &__action {
    width: 100%;
    display: block;
    margin-top: 1em;
  }
  &__note {
    background: #DBF0FF;
    padding: 8px 12px;
    border-radius: $--radius;
    color: black;
  }
  &__shifts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: .5em;
    > * {
      min-width: 0;
    }
  }
  &__slots {
    display: flex;
    border-radius: $--radius;
    background: white;
    overflow: hidden;
    > * {
      min-width: 0;
      flex: 1;
    }
  }
  &__slot {
    color: black;
    text-align: center;
    padding: .5em .25em;
    cursor: pointer;
    &--selected {
      background: $--color-primary;
      color: white;
    }
    strong {
      font-weight: bold;
    }
  }
  &__input {
    cursor: pointer;
  }
  &__input-content {
    > * {
      &:not(:last-child) {
        &:after {
          content: ', ';
        }
      }
    }
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(black, .1);
    background: #1691E2;
    > * {
      min-height: 0;
    }
    &-header {
      background: $--color-primary;
      display: flex;
      color: white;
      padding: 12px;
      align-items: center;
      > * {
        min-width: 0;
      }
    }
    &-content {
      padding: 12px;
      p {
        margin: 0 0 .5em 0;
        font-size: 14px;
        &:not(:first-child) {
          margin-top: 1em;
        }
      }
    }
    &-placeholder {
      flex: 1;
      text-transform: uppercase;
    }
    &-close {
      flex: 0 48px;
      font-size: 14px;
      text-align: center;
      margin-left: 8px;
      cursor: pointer;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: .5em;
    grid-gap: .25em;
    background: white;
    border-radius: $--radius;
    > * {
      text-align: center;
    }
  }
  &__current {
    grid-column: span 5;
    color: $--color-text-regular;
    font-weight: bold;
  }
  &__previous,
  &__next {
    color: $--color-primary;
    font-size: 1.5em;
    cursor: pointer;
  }
  &__dow {
    padding: .25em 0;
    font-size: .9em;
    color: $--color-text-regular;
    font-weight: bold;
    text-transform: uppercase;
  }
  &__date {
    padding: .5em 0;
    cursor: pointer;
    border-radius: $--radius;
    position: relative;
    color: black;
    &--today {
      color: $--color-primary;
    }
    &--marked {
      &:after {
        content: '';
        position: absolute;
        top: 3px;
        right: 3px;
        width: 6px;
        height: 6px;
        background: $--color-primary-highlight;
        border-radius: 1000px;
      }
    }
    &:hover {
      background: rgba($--color-primary-highlight, .1);
    }
    &--disabled {
      color: lighten($--color-text-secondary, 45);
      cursor: not-allowed;
      img {
        opacity: .3;
      }
      &:hover {
        background: transparent;
        color: lighten($--color-text-secondary, 45);
      }
    }
    &--disabled-button {
      color: lighten($--color-text-secondary, 45);
      cursor: not-allowed;
      img {
        opacity: .3;
      }
      opacity: .5;
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
