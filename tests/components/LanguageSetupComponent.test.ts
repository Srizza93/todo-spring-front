import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSetupComponent from '@/components/LanguageSetupComponent.vue'

describe('Should setup the language', async () => {
  it('should toggle the modal', async () => {
    const wrapper = mount(LanguageSetupComponent)
    const modalWrapper = wrapper.find('.langs')

    modalWrapper.trigger('click')
    await wrapper.vm.$nextTick()
    
    const modal = wrapper.find('.langs-modal')
    expect(modal.exists()).toBe(true)
  })

  it('should get the langs', async () => {
    const wrapper = mount(LanguageSetupComponent)
    const modalWrapper = wrapper.find('.langs')

    modalWrapper.trigger('click')
    await wrapper.vm.$nextTick()
    
    const langs = wrapper.vm.langs
    
    expect(langs).toHaveLength(3)
    expect(langs[0]).toBe('en')
    expect(langs[1]).toBe('fr')
    expect(langs[2]).toBe('it')
  })
})