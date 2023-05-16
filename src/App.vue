<template>
    <RouterView></RouterView>
    <LanguageSetupComponent @emit-select="setLanguage" />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateUserStore } from './store/StateUser'
import languageSetupFuncts  from './services/languageSetupFuncts'
import LanguageSetupComponent from './components/LanguageSetupComponent.vue'

const { convertLanguage } = languageSetupFuncts()
const { locale } = useI18n()
const store = useStateUserStore()

function setLanguage(setLang?: string): void {
    const storedLang: string = store.language
    const lang: string = setLang ? setLang : storedLang ? storedLang : window.navigator.language
    locale.value = convertLanguage(lang)
    store.updateLanguage(lang)
}

onMounted(() => {
    setLanguage()
})
</script>
