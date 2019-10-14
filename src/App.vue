<template>
  <div id="app">
    <b-table striped hover :items="points" :fields="fields" @row-clicked="showDetails"></b-table>
    <point-details v-model="currentPoint" />

    <!-- <waste-map /> -->
  </div>
</template>

<script>
// import WasteMap from "./components/WasteMap";
// import PointList from "./components/PointList";
import PointDetails from "./components/PointDetails";

export default {
  name: "App",
  components: {
    // WasteMap,
    // PointList,
    PointDetails
  },
  data() {
    return {
      points: [],
      fields: [
        { key: "properties.Name", label: "Name" },
        { key: "properties.description", label: "Description" }
      ],
      currentPoint: null
    };
  },
  mounted() {
    let eco = require("./assets/data/geo/Eco_Friendly_Product_Sellers.json");
    let ewaste = require("./assets/data/geo/E_Waste_Management.json");
    let edu = require("./assets/data/geo/Education_Awareness_Training.json");
    let food = require("./assets/data/geo/Food_collection_centers.json");
    let gov = require("./assets/data/geo/Government_Organisations.json");
    let informal = require("./assets/data/geo/Informal_Recycling_Centers.json");
    let organic = require("./assets/data/geo/Organic_Waste_Management.json");
    let pvt = require("./assets/data/geo/Private_Waste_Management_Organizations.json");
    let research = require("./assets/data/geo/Research_Planning_Design.json");

    this.points = this.points
      .concat(eco.features)
      .concat(ewaste.features)
      .concat(edu.features)
      .concat(food.features)
      .concat(gov.features)
      .concat(informal.features)
      .concat(organic.features)
      .concat(pvt.features)
      .concat(research.features);
  },
  methods: {
    showDetails(item) {
      this.currentPoint = item;
    }
  }
  // watch: {
  //   currentPoint(value) {
  //     console.log("current item is " + JSON.stringify(value));
  //   }
  // }
};
</script>
