import { describe, expect, it } from 'vitest'
import LanguageSetupFuncts from '@/services/LanguageSetupFuncts'

const { convertLanguage, langs } = LanguageSetupFuncts()

describe('Should handle the language setup service', () => {

  it('should convert the lang to the correct lang code', async () => {

    expect(convertLanguage('de')).toBe('en-GB')

    expect(convertLanguage('en')).toBe('en-GB')
    expect(convertLanguage('en-GB')).toBe('en-GB')
    expect(convertLanguage('en-US')).toBe('en-GB')
    expect(convertLanguage('en-AU')).toBe('en-GB')
    expect(convertLanguage('en-CA')).toBe('en-GB')
    expect(convertLanguage('en-IN')).toBe('en-GB')
    expect(convertLanguage('en-ZA')).toBe('en-GB')

    expect(convertLanguage('fr')).toBe('fr-FR')
    expect(convertLanguage('fr-FR')).toBe('fr-FR')
    expect(convertLanguage('fr-CA')).toBe('fr-FR')
    expect(convertLanguage('fr-BE')).toBe('fr-FR')
    expect(convertLanguage('fr-CH')).toBe('fr-FR')

    expect(convertLanguage('it')).toBe('it-IT')
    expect(convertLanguage('it-IT')).toBe('it-IT')
    expect(convertLanguage('it-CH')).toBe('it-IT')
  })

  it('should get the langs hard coded', () => {

    expect(langs[0]).toBe('en')
    expect(langs[1]).toBe('fr')
    expect(langs[2]).toBe('it')
  })
})