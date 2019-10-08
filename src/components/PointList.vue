<template>
  <div>
    <!-- <b-table stickyColumn="true"> -->
      <!-- <b-col :style="{width: '500px'}"> -->
        <b-row>
        <div>
          <h2>{{name}}</h2>
          <b-form-textarea
            plaintext
            id="textarea"
            v-model="compositeDescription"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <hr />
        </b-row>
        <b-row>
      <!-- </b-col>       -->
      <b-container fluid>
      <b-col :style="{width: '500px'}" stickyColumn="true">
        <b-row v-for="point in points" :key="point.Name">
          <b-link
            v-on:click="displayPointDetails(point.properties.Name, point.properties.description)"
          >{{point.properties.Name}}</b-link>
        </b-row>
      </b-col>
      </b-container>
        </b-row>

    <!-- </b-table> -->
  </div>
</template>

<script>
export default {
  name: "PointList",
  data() {
    return {
      points: [],
      name: "hello",
      compositeDescription: "yo"
    };
  },
  mounted() {
    let eco = require("../assets/data/geo/Eco_Friendly_Product_Sellers.json");
    let ewaste = require("../assets/data/geo/E_Waste_Management.json");
    let edu = require("../assets/data/geo/Education_Awareness_Training.json");
    let food = require("../assets/data/geo/Food_collection_centers.json");
    let gov = require("../assets/data/geo/Government_Organisations.json");
    let informal = require("../assets/data/geo/Informal_Recycling_Centers.json");
    let organic = require("../assets/data/geo/Organic_Waste_Management.json");
    let pvt = require("../assets/data/geo/Private_Waste_Management_Organizations.json");
    let research = require("../assets/data/geo/Research_Planning_Design.json");

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
    displayPointDetails: function(name, compositeDescription) {
      this.name = name;
      this.compositeDescription = compositeDescription;
    }
  }
};
</script>      