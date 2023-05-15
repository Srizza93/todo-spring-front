<template>
    <RouterView></RouterView>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { convertLanguage }  from './services/languageSetup'

const { locale } = useI18n()

retrieveLanguage()

function retrieveLanguage(): void {
    const lang: string = window.navigator.language
    locale.value = convertLanguage(lang)
}
</script>
