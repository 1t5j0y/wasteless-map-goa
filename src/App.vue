<template>
  <div id="app">

    <waste-map />
  </div>
</template>

<script>
import WasteMap from "./components/WasteMap";

export default {
  name: "App",
  components: {
    WasteMap,
  },
  data() {
    return {
      points: [],
      currentPoint: null
    };
  },
  mounted() {
    let data_points = require("./assets/data/goa_waste_eco_map_points.json");

    this.points = this.points.concat(data_points)
  },
  methods: {
    showDetails(item) {
      this.currentPoint = item;
    }
  }
};
</script>
