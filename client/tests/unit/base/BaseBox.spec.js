import { mount } from '@vue/test-utils';
import BaseBox from '@/components/base/BaseBox.vue';

describe('BaseBox.vue', () => {
  it('renders msg when passed to slot', () => {
    const msg = 'new message';
    const wrapper = mount(BaseBox, {
      slots: {
        default: {
          render: () => msg,
        },
      },
    });

    expect(wrapper.text()).toBe(msg);
  });
});
