import { beforeEach, describe, expect, it, vi } from 'vitest'
import { config, shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useStateUserStore } from '@/store/StateUser'
import App from '@/App.vue';

config.global.stubs = {
  RouterView: true
}

const locale: { value: string } = { value: '' };

vi.mock('@/store/StateUserService', () => ({
  useStateUserStore: {
    language: '' as string,
    updateLanguage: vi.fn() as Function,
  }
}));

vi.mock('vue-i18n', () => ({
  useI18n: () => {
    return {
      locale
    };
  }
}));

describe('Should display the app page', () => {

  beforeEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: {
        language: 'fr' as string
      },
    })
    setActivePinia(createPinia())
  })

  it('should set the lang into the i18n plugin', async () => {
    shallowMount(App);
    
    const { useI18n } = await import('vue-i18n');
    expect(useI18n().locale.value).toStrictEqual('fr-FR');
  });

  it('should get the lang from browser to the store', async () => {
    shallowMount(App);

    const userStore = useStateUserStore()
    expect(userStore.language).toBe('fr')
  });

  it('should update the lang with a parameter', async () => {
    const wrapper = shallowMount(App);

    const userStore = useStateUserStore()

    wrapper.vm.setLanguage('de')

    expect(userStore.language).toBe('de')
  });

  it('should update the lang from the store', async () => {
    shallowMount(App);

    const userStore = useStateUserStore()
    userStore.updateLanguage('it')

    expect(userStore.language).toBe('it')
  });
  
});
