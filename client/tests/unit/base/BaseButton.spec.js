import { mount } from '@vue/test-utils';
import BaseButton from '@/components/base/BaseButton.vue';

describe('BaseButton.vue', () => {
  let wrapper;
  const msg = 'new message';

  beforeEach(() => {
    wrapper = mount(BaseButton, {
      props: {
        type: 'link',
        mode: 'success',
      },
      slots: {
        default: {
          render: () => msg,
        },
      },
    });
  });

  it('renders msg when passed to slot', () => {
    expect(wrapper.text()).toBe(msg);
  });

  it('should have class btn--link', () => {
    expect(wrapper.classes()).toContain('btn--link');
  });

  it('should have correct mode class btn--success', () => {
    expect(wrapper.classes()).toContain('btn--success');
  });

  it('should not be disabled', () => {
    expect(wrapper.attributes().disabled).toBeUndefined();
  });

  it('should be disabled', () => {
    wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: {
          render: () => msg,
        },
      },
    });

    expect(Object.keys(wrapper.attributes())).toContain('disabled');
  });
});
