<template>
    <div class="langs" @click="toggleModal">
    </div>
    <div 
      v-if="modalIsOpen" 
      class="langs-modal"
      tabindex="0" 
      @blur="closeModal" 
    >
        <ul class="langs-modal_ul">
            <li 
              class="langs-modal_ul_lang"
              v-for="lang in langs"
              :key="lang.type"
              @click="emitSelect(lang.type)"
            >
              {{ t(`langs.${lang.type}`) }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import languageSetupFuncts from '../services/languageSetupFuncts'

const { t } = useI18n()
const { langs } = languageSetupFuncts()

const submitEmit = defineEmits(['emit-select'])
const modalIsOpen: Ref<boolean> = ref(false)

function emitSelect(lang: string): void {
    submitEmit('emit-select', lang)
}

function toggleModal(): void {
    modalIsOpen.value = !modalIsOpen.value
}

function closeModal(): void {
    modalIsOpen.value = false
}
</script>

<style lang="scss" scoped>
.langs {
    position: fixed;
    right: 20px;
    bottom: 15px;
    width: 35px;
    height: 35px;
    background-image: url('../assets/icons/world.png');
    background-repeat: no-repeat;
    cursor: pointer;
}

.langs:hover {
    opacity: .7;
}

.langs-modal {
    position: fixed;
    right: 75px;
    bottom: 15px;
    width: 250px;
    border: 3px solid $fourth-color;
    border-radius: $radius;
    background-color: $third-color;
    color: #032539;
    z-index: 10;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.langs-modal_ul {
    width: 100%;
    list-style: none;
    padding: 0;
    text-align: center;

}

.langs-modal_ul_lang {
    border-bottom: 1px solid #032539;
    padding: 5px 0;
    cursor: pointer;
}

.langs-modal_ul_lang:last-child {
    border: none;
}

.langs-modal_ul_lang:hover {
    background-color: #032539;
    color: $third-color;
}
</style>