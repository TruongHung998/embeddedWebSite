<template lang="pug">
.gia-select
  template(v-if="!filterable")
    i.gia-select__caret.el-select__caret.el-input__icon.el-icon-arrow-down
    select.gia-select__input.gia-select__input--native.el-input__inner(
      v-model="proxy"
      :placeholder="placeholder"
      :disabled="disabled")
      option(disabled selected :value="null") {{ placeholder }}

      template(v-if="grouped.length === 1")
        option(
          v-for="o, ok in grouped[0][groupItemsKey]"
          :key="ok"
          :value="o[valueKey]") {{ o[labelKey] }}

      template(v-else)
        optgroup(
          v-for="g, gk in grouped"
          :key="gk"
          :label="g[groupLabelKey]")
          option(
            v-for="o, ok in g[groupItemsKey]"
            :key="ok"
            :value="o[valueKey]") {{ o[labelKey] }}

  template(v-else)
    .gia-select__input.el-input__inner(@click="togglePanel(true)")
      i.gia-select__caret.el-select__caret.el-input__icon.el-icon-arrow-down
      .gia-select__selected {{ selected ? selected[labelKey] : placeholder }}

    .gia-select__overlay(v-if="displayPanel" @click="togglePanel(false)")
      .gia-select__panel(@click.stop)
        .gia-select__panel-instruction(v-if="placeholder" v-text="placeholder")
        .gia-select__panel-header
          .gia-select__panel-query
            input(
              :placeholder="filterText"
              v-model="query"
              ref="query"
              type="search")
          .gia-select__panel-close(@click="togglePanel(false)") Đóng

        .gia-select__panel-content
          .gia-select__group(
            v-for="g, gk in filtered"
            :key="gk")
            .gia-select__group-label(
              v-if="g[groupLabelKey] !== null") {{ g[groupLabelKey] }}
            .gia-select__group-items
              .gia-select__item(
                v-for="o, ok in g[groupItemsKey]"
                :checked="selected ? o[valueKey] === selected[valueKey] : false"
                :key="ok"
                @click="e => select(o, ok, g, gk)")
                .gia-select__item-label(v-if="!$scopedSlots.item") {{ o[labelKey] }}
                slot(name="item" :item="o")

</template>

<script>
export default {
  inject: {
    elFormItem: {
      default: null
    }
  },

  props: {
    value: {
      type: null,
      default: null
    },

    filterable: {
      type: Boolean,
      default: false
    },

    options: {
      type: Array,
      default: null
    },

    groups: {
      type: Array,
      default: null
    },

    valueKey: {
      type: String,
      default: 'id'
    },

    labelKey: {
      type: String,
      default: 'name'
    },

    groupLabelKey: {
      type: String,
      default: 'name'
    },

    groupItemsKey: {
      type: String,
      default: 'items'
    },

    placeholder: {
      type: String,
      default: 'Chọn...'
    },

    filterText: {
      type: String,
      default: 'Nhập từ khóa tìm kiếm...'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      query: '',
      displayPanel: false
    }
  },

  computed: {
    proxy: {
      get () {
        return this.value
      },

      set (val) {
        this.$emit('input', val)
        this.$emit('change', val)
        if (this.elFormItem) this.elFormItem.validate()
      }
    },

    selected () {
      if (this.options) return this.options
        .find(i => i[this.valueKey] === this.proxy)
      else if (this.groups) {
        for (const gk in this.groups) {
          for (const ok in this.groups[gk][this.groupItemsKey]) {
            const o = this.groups[gk][this.groupItemsKey][ok]
            if (o[this.valueKey] === this.proxy)
            return o
          }
        }
      }
      return null
    },

    grouped () {
      if (this.options) {
        return [{
          [this.groupLabelKey]: null,
          [this.groupItemsKey]: this.options
        }]
      } else if (this.groups) {
        return this.groups
      }
      return []
    },

    filtered () {
      const query = this.query.toLowerCase()
      if (!query) return this.grouped
      if (this.options) {
        return [{
          [this.groupLabelKey]: null,
          [this.groupItemsKey]: this.options
            .filter(o => o[this.labelKey]
              .toLowerCase()
              .includes(query)
            )
        }]
      } else if (this.groups) {
        return this.groups
          .reduce((res, g) => {
            const items = g.items
              .filter(o => o[this.labelKey]
                .toLowerCase()
                .includes(query)
              )
            if (items.length) {
              res.push({
                ...g,
                [this.groupItemsKey]: items
              })
            }
            return res
          }, [])
      }
      return []
    }
  },

  methods: {
    togglePanel (to) {
      this.displayPanel = to !== undefined
        ? to
        : !this.displayPanel
      if (this.displayPanel) {
        this.$nextTick(this.focusQuery)
      } else {
        this.query = ''
      }
    },

    focusQuery () {
      if (this.$refs.query) {
        this.$refs.query.focus()
      }
    },

    focus () {
      this.togglePanel(true)
    },

    select (o, ok, g, gk) {
      this.togglePanel(false)
      this.proxy = o[this.valueKey]
      this.$emit('select', o, ok, g, gk)
      if (this.elFormItem) this.elFormItem.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
$--color-primary: #102E9E;
$--color-primary-highlight: #0075FF;
$--color-paper: #F0F2F1;
$--color-text-secondary: #606266;
$--radius: 4px;

.gia-select {
  position: relative;
  &__caret {
    position: absolute;
    right: 4px;
    top: 0;
    pointer-events: none;
  }
  select {
    padding-left: 15px !important;
  }
  &__input {
    padding-right: 32px;
    cursor: pointer;
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
    height: 375px;
    max-height: 50vh;
    width: 90%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(black, .1);
    > * {
      min-height: 0;
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
    &-query {
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
      flex: 1;
      background: $--color-paper;
      overflow-y: scroll;
      line-height: 1.35em;
    }
  }
  &__group {
    &-label {
      font-weight: bold;
      color: $--color-text-secondary;
      font-size: 13px;
      padding: 1.5em 1em 1em;
    }
  }
  &__item {
    padding: 1em;
    border-top: 1px solid #f2f2f2;
    background: white;
    cursor: pointer;
    &:hover {
      background: $--color-primary-highlight;
    }
    &[checked] {
      color: $--color-primary;
    }
  }
}
</style>
