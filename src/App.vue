<template>
  <div id="app">
    <!-- <waste-map /> -->
    <data-cleanup />
  </div>
</template>

<script>
import WasteMap from "./components/WasteMap";
import DataCleanup from "./components/DataCleanup";

export default {
  name: "App",
  components: {
    // WasteMap,
    DataCleanup
  }
};
</script>
