<template>
  <div>
    <h2>{{$t('files-location')}}</h2>
    <form action="#">
      <div class="file-field input-field">
        <div class="btn">
          <span>{{$t('browse')}}</span>
          <input type="file" @change="onChange" webkitdirectory>
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" :value="value" :placeholder="$t('folder-placeholder')">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'folder-form',
    props: ['value'],
    methods: {
      onChange (e) {
        this.$emit('input', e.target.files[0].path)
      }
    }
  }
</script>
