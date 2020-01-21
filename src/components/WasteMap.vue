<template>
  <div>
    <!-- <div>
      <button @click="searchMap">Search for sales</button>
    </div>
    <div>
      <h2>Suggest an addition</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace"
          :options="{
            bounds: goaBounds,
            strictBounds: true
          }"
          >
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>-->
    <gmap-map
      :options="{
      zoom: 8,
      disableDefaultUI: true,
      fullscreenControl: true,
      zoomControl: true,
      restriction: {latLngBounds: goaBounds, strictBounds: true}
      }"
      :center="center"
      style="width: 100%;  height: 600px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="openInfoWindow(m);"
      ></gmap-marker>
      <gmap-info-window
        v-if="currentPlace !== null"
        :position="currentPlace.position"
        :opened="infoBoxOpen"
        @closeclick="infoBoxOpen = false;"
      >
        <div class="infoWindow" style="width: 400px;">
          <h6 id="infoWindow-location">{{ currentPlace.position.name }}</h6>
          <i>{{currentPlace.position.description}}</i>
          <br />
          <br />
          <b>Contact Info:</b>
          <br />
          Persons: {{currentPlace.position.contact.persons}}
          <br />
          Address: {{currentPlace.position.contact.address}}
          <br />
          Phone: {{currentPlace.position.contact.phones}}
          <br />
          Email: {{currentPlace.position.contact.emails}}
          <br />
          URL: {{currentPlace.position.contact.urls}}
          <br />
          <br />

          <button @click="closeInfoWindow();">Close</button>
        </div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "WasteMap",
  data() {
    return {
      center: { lat: 15.4, lng: 74 },
      markers: [],
      places: [],
      currentPlace: null,
      infoBoxOpen: false,
      goaBounds: { north: 15.9, south: 14.7, west: 73.2, east: 74.5 },
      mapData: null
    };
  },

  mounted() {
    this.geolocate();
    this.mapData = require("../assets/data/goa_waste_eco_map_points.json");
    this.populateMarkers();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          label: this.currentPlace.name
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
    },
    openInfoWindow(location) {
      this.currentPlace = location;
      this.infoBoxOpen = true;
    },
    closeInfoWindow() {
      this.infoBoxOpen = false;
    },
    populateMarkers: function() {
      this.mapData.features.forEach(feature => {
        let marker = {
          name: feature.name,
          description: feature.description,
          contact: feature.contact,
          categories: feature.categories,
          lng: feature.coordinates[0],
          lat: feature.coordinates[1]
        };
        this.markers.push({ position: marker });
        marker = null;
      });
    },
    searchMap: function() {
      let featureList = new Array();
      featureList = this.mapData.features;
      let results = new Array();

      featureList.forEach(element => {
        if (element.properties.categories.includes("sales")) {
          results.push(element);
        }
      });
    }
  }
};
</script>