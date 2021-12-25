<template>
  <div class="base-icon" :class="classes">
    <font-awesome-icon v-bind="propsToPassToFa()"></font-awesome-icon>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret,
  faChevronDown,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret, faChevronDown, faUser);

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
  },
  props: {
    iconName: {
      type: String,
      required: true,
    },
    noHover: {
      type: Boolean,
      default: false,
    },
    rotation: {
      type: String,
      default: '0',
    },
    size: {
      validator(value) {
        const potentialValues = [
          'xs',
          'sm',
          'lg',
          'xl',
          '2xl',
          '1x',
          '2x',
          '3x',
          '4x',
          '5x',
          '6x',
          '7x',
          '8x',
          '9x',
          '10x',
        ];
        const valid = potentialValues.indexOf(value) !== -1;
        if (!valid) {
          console.warn(
            `Potential icon size values for icons: ${potentialValues.join(
              ' '
            )}. Entered value ${value}`
          );
        }
        return valid;
      },
    },
  },
  computed: {
    currentIcon() {
      return ['fas', this.iconName];
    },
    classes() {
      return {
        'base-icon--no-hover': this.noHover,
      };
    },
  },
  methods: {
    propsToPassToFa() {
      const results = {
        size: this.size,
        icon: this.currentIcon,
      };

      if (this.rotation !== '0') {
        results.rotation = this.rotation;
      }

      return results;
    },
  },
};
</script>

<style lang="scss">
.base-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--main-padding);

  &:hover:not(.base-icon--no-hover) {
    svg,
    svg path {
      fill: var(--icon-color-primary--hover);
    }
  }

  svg,
  svg path {
    fill: var(--icon-color-primary);
    transition: fill 0.3s ease-in, transform 0.2s ease;
  }
}
</style>
