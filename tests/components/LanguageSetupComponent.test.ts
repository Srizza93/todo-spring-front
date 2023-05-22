import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSetupComponent from '@/components/LanguageSetupComponent.vue'

describe('Should setup the language', async () => {

  it('should toggle the modal', async () => {
    const wrapper = mount(LanguageSetupComponent)
    const modalWrapper = wrapper.find('.langs')

    modalWrapper.trigger('click')
    await wrapper.vm.$nextTick()

    let modal = wrapper.find('.langs-modal')
    expect(modal.exists()).toBe(true)

    modalWrapper.trigger('click')
    await wrapper.vm.$nextTick()

    modal = wrapper.find('.langs-modal')
    expect(modal.exists()).toBe(false)
  })

  it('should close the modal', async () => {
    const wrapper = mount(LanguageSetupComponent)
    const modalWrapper = wrapper.find('.langs')

    modalWrapper.trigger('click')
    await wrapper.vm.$nextTick()
    
    let modal = wrapper.find('.langs-modal')
    expect(modal.exists()).toBe(true)
    
    wrapper.vm.closeModal()
    await wrapper.vm.$nextTick()

    modal = wrapper.find('.langs-modal')
    expect(modal.exists()).toBeFalsy()
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

  it('should emit the lang selected', async () => {
    const wrapper = mount(LanguageSetupComponent)
    const modalWrapper = wrapper.find('.langs')

    modalWrapper.trigger('click')
    await wrapper.vm.$nextTick()
    
    const langs = wrapper.findAll('.langs-modal_ul_lang')
    
    langs[0].trigger('click')
    await wrapper.vm.$nextTick()

    const emittedSubmit = wrapper.emitted()['emit-select'] as unknown[][]

    expect(emittedSubmit).toBeTruthy()
    expect((emittedSubmit[0][0] as { lang: string })).toEqual('en')
  })
})