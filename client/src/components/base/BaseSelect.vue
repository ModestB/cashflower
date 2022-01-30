<template>
  <div class="form-control-select">
    <label v-if="showLabel" :for="id">{{ label }}</label>
    <v-select
      :options="options"
      label="label"
      :reduce="(options) => options.value"
      :modelValue="selected"
      :clearable="false"
      @option:selected="$emit('set-selected', $event)"
      :disabled="disabled"
    ></v-select>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators';

export default {
  emits: ['set-selected'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: [String, Number],
      required,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showLabel() {
      return !!this.label.length;
    },
  },
};
</script>
<style lang="scss">
.form-control-select {
  display: flex;
  flex-direction: column;
  padding: var(--main-spacing-2) 0;

  .v-select {
    width: 160px;

    &.vs--open {
      .vs__dropdown-toggle {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
      }
    }
  }

  .vs__dropdown-menu {
    max-width: 160px;
  }

  .vs__dropdown-toggle {
    height: var(--input-height);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color--muted);
  }

  label {
    font-size: 16px;
    color: var(--text-color);
    margin: 0 0 var(--main-spacing-2) 0;
  }
}
</style>
