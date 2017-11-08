<template>
  <div class="content">
    <folder-form></folder-form>
    <select-lang></select-lang> 
    <patch-reset-buttons></patch-reset-buttons>
  </div>
</template>

<script>
  import FolderForm from './LandingPage/FolderForm.vue';
  import SelectLang from './LandingPage/SelectLang.vue';
  import PatchResetButtons from './LandingPage/PatchResetButtons.vue';

  export default {
    name: 'landing-page',
    components: { FolderForm, SelectLang, PatchResetButtons }
  };
</script>

<style>
.content {
  margin: 40px 30px;
}
</style>
