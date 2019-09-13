<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
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
    <br>
    <gmap-map
      :options="{
      zoom: 8,
      disableDefaultUI: true,
      fullscreenControl: true,
      zoomControl: true,
      restriction: {latLngBounds: goaBounds, strictBounds: true}
      }"
      :center = "center"
      style="width:500px;  height: 600px;"
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
        <div class="infoWindow" style="width: 300px;">
          <h2 id="infoWindow-location">{{ currentPlace }}</h2>
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
      goaBounds: {north: 15.9, south: 14.7, west: 73.2, east: 74.5}
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        // console.log(this.currentPlace);
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
      if(navigator.geolocation) navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    openInfoWindow(location) {
      // console.log(location);
      this.currentPlace = location;
      this.infoBoxOpen = true;
    },
    closeInfoWindow() {
      this.infoBoxOpen = false;
    }    
  }
};
</script>