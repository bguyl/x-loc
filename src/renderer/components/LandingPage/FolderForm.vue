<template>
  <form action="#">
    <div class="file-field input-field">
      <div class="btn">
        <span>Browse</span>
        <input type="file" webkitdirectory>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" v-bind:value="gamepath" placeholder="Game files folder">
      </div>
    </div>
  </form>
</template>

<script>
  // const fs = require('fs');

  // var gp = null;
  // const defaultpath = 'file://C:/Program Files (x86)/Steam/steamapps/common/Stardew Valley';
  // if (fs.existsSync()) {
  //   gp = defaultpath;
  // }

  export default {
    name: 'folder-form',
    data: {
      gamepath: null
    }
  };
</script>

<style>

</style>
