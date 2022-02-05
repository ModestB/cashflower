import { mount } from '@vue/test-utils';
import BaseAlert from '@/components/base/BaseAlert.vue';

describe('BaseAlert.vue', () => {
  let wrapper;
  const msg = 'new message';

  beforeEach(() => {
    wrapper = mount(BaseAlert, {
      props: {
        type: 'success',
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

  it('should have class alert-success', () => {
    expect(wrapper.classes()).toContain('alert--success');
  });
});
