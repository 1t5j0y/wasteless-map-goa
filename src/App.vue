<template>
  <div id="app">
    <!-- <waste-map /> -->
    <point-list />
    <separated-data />
  </div>
</template>

<script>
// import WasteMap from "./components/WasteMap";
import PointList from "./components/PointList";
import SeparatedData from "./components/SeparatedData";

export default {
  name: "App",
  components: {
    // WasteMap,
    PointList,
    SeparatedData
  }
};
</script>
