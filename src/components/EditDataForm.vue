<template>
  <div>edit_data_form</div>
  <pre>{{ row }}</pre>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
};
</script>
