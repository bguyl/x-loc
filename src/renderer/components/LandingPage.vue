<template>
  <div class="content">
    <folder-form></folder-form>
  </div>
</template>

<script>
  import FolderForm from './LandingPage/FolderForm.vue';
  export default {
    name: 'landing-page',
    components: { FolderForm }
  };
</script>

<style>
.content {
  margin: 40px 30px;
}
</style>
