<template>
  <select><slot></slot></select>
</template>
<script>
export default {
  name: 'material-select',
  props: ['value'],
  watch: {
    value: function (value) {
      this.relaod(value);
    }
  },
  methods: {
    relaod: function (value) {
      var select = window.$(this.$el);
      select.val(value || this.value);
      select.material_select('destroy');
      select.material_select();
    }
  },
  mounted: function () {
    var vm = this;
    var select = window.$(this.$el);
    select
      .val(this.value)
      .on('change', function () {
        vm.$emit('input', this.value);
      });

    select.material_select();
  },
  updated: function () {
    this.relaod();
  },
  destroyed: function () {
    window.$(this.$el).material_select('destroy');
  }
};
</script>

