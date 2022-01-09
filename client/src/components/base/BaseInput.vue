<template>
  <div class="form-control" :class="{ invalid: invalid }">
    <label v-if="showLabel" :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="showInvalidFeedback" class="feedback feedback--invalid">
      {{ invalidFeedback }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    id: {
      type: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    invalidFeedback: {
      type: String,
      default: '',
    },
  },
  computed: {
    showLabel() {
      return !!this.label.length;
    },
    showInvalidFeedback() {
      return this.invalid && !!this.invalidFeedback.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  display: flex;
  flex-direction: column;
  padding: var(--main-padding-2) 0;

  &.invalid {
    input,
    input:focus,
    input:focus-visible {
      border-color: var(--danger);
    }

    input:focus,
    input:focus-visible {
      box-shadow: var(--box-shadow--danger);
    }

    label {
      color: var(--danger);
    }
  }

  input {
    height: 35px;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color--muted);
    padding: 0 var(--main-padding-2);
    outline: none;
    transition: border-color 0.3s ease-in, box-shadow 0.3s ease;

    &:focus,
    &:focus-visible {
      border-color: var(--border-color--muted-4);
    }
  }

  label {
    font-size: 16px;
    color: var(--text-color);
    margin: 0 var(--main-padding) var(--main-padding-2) var(--main-padding);
  }

  .feedback {
    font-size: var(--font-size--xs);
    margin: 2px var(--main-padding) 0 var(--main-padding);
    text-align: right;

    &--invalid {
      color: var(--danger);
    }
  }
}
</style>
