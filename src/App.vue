<template>
    <RouterView></RouterView>
    <LanguageSetupComponent @emit-select="setLanguage" />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import languageSetupFuncts  from './services/languageSetupFuncts'
import LanguageSetupComponent from './components/LanguageSetupComponent.vue';

const { convertLanguage } = languageSetupFuncts()
const { locale } = useI18n()

function setLanguage(setLang?: string): void {
    const lang: string = setLang ? setLang : window.navigator.language
    locale.value = convertLanguage(lang)
}

onMounted(() => {
    setLanguage()
})
</script>
