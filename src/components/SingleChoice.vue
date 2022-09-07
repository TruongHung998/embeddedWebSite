<template lang="pug">
el-radio-group(
  :value="value"
  @input="val => $emit('update:value', val)")
  el-radio(
    v-for="i, k in options"
    @change="val => $emit('change', i)"
    :key="k"
    :label="i"
    :value="i")
    slot(name="label" :item="i" :index="k")

  el-radio.other(
    v-if="allowOther"
    @change="val => hasOther = val")
    span Lý do khác
    el-input.other__input(
      ref="other"
      placeholder="Nhập lý do khác"
      v-if="hasOther"
      :value="value"
      @input="val => $emit('update:value', val)")
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      required: true
    },

    allowOther: {
      type: Boolean,
      default: false
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
