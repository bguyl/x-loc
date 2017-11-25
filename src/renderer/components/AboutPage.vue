<template>
  <div class="container">
    <h1>About</h1>
    <p>
      <span class="role">Developed by:</span> <span class="contributor">Bastien Guyl</span>
    </p>
    <h1>Thanks to</h1>
    <p>
      <span class="role">French localization:</span> <span class="contributor">Stardew Traduction FR (30%, Actionbreaker, LoGeek, Sprigan, bertrand35170, Touffu64)</span><br>
      <span class="role">Font:</span> <span class="contributor">Reddit user Cowsplay</span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'about',
    components: { }
  };
</script>

<style scoped>
  div.container {
    margin: 15px;
    width: calc(800px - 30px);
    background-color: rgba(245, 234, 205, 0.65);
    min-height: calc(100vh - 94px);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1;
    padding: 5px;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-size: 17px;
    font-style: bold;
  }
  span.role {
    text-decoration: underline;
  }
</style>
