import { config } from '@vue/test-utils';
import { vi } from 'vitest';

config.global.mocks = {
  $t: vi.fn(t => t),
  ref: vi.fn()
};

vi.stubGlobal('useRoute', vi.fn(() => ({
  name: 'name'
})));

const router = {
  push: vi.fn()
};

vi.stubGlobal('useRouter', vi.fn(() => router));

const routerPush = vi.fn();
vi.mock('vue-router', () => {
  return ({
    useRouter: () => ({
      push: routerPush,
      options: {
        history: {
          base: '/'
        },
      }
    }),
    useRoute: () => ({
      query:{}
    }),
  });
});