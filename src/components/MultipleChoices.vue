<template lang="pug">
el-checkbox-group.ep-multiple-choices.ep-grid(
  :value="value"
  @input="val => $emit('update:value', val)")
  el-checkbox(
    v-for="i, k in options"
    :key="k"
    @change="val => $emit('change', val)"
    :label="i"
    :value="i")
    slot(name="label" :item="i" :index="k")

  el-checkbox.other(
    label="Lý do khác"
    v-if="allowOther"
    @change="val => hasOther = val")
    span Lý do khác
    el-input.other__input(
      ref="other"
      placeholder="Nhập lý do khác"
      v-if="hasOther"
      :value="other"
      @input="val => $emit('update:other', val)")
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },

    allowOther: {
      type: Boolean,
      default: false
    },

    other: {
      type: null,
      default: null
    },
    
    options: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      hasOther: false
    }
  },

  watch: {
    hasOther (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.other.focus()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.other {
  display: flex;
  > * {
    min-width: 0;
  }
  /deep/ {
    .el-checkbox {
      &__label {
        flex: 1;
      }
    }
  }
  &__input {
    margin-top: .25em;
  }
}
</style>
