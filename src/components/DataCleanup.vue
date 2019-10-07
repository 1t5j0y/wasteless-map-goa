<template>
  <div id="container">
    <div>
      <h2>{{name}}</h2>
      <b-form-textarea plaintext id="textarea" v-model="legacyDescription" rows="3" max-rows="6"></b-form-textarea>
      <hr />
    </div>
    <div>
      <b-form @submit="onSubmit" @reset="onReset">
        <div>
          <div>
            <b-button
              variant="outline-info"
              v-on:click="addContactPerson"
            >Add Contact Person #{{contactPersonIndex + 1}}</b-button>
          </div>
          <div class="row" v-for="person in contactPersons" :key="person.inputname">
            <b-form-input
              id="contactPersons"
              v-model="person.inputvalue"
              type="text"
              placeholder="Enter name"
            ></b-form-input>
          </div>
        </div>
        <div>
          <div>
            <b-button variant="outline-info" v-on:click="addPhone">Add Phone #{{phoneIndex + 1}}</b-button>
          </div>
          <div class="row" v-for="number in phones" :key="number.inputname">
            <b-form-input
              id="phones"
              v-model="number.inputvalue"
              type="tel"
              placeholder="Enter phone number"
            ></b-form-input>
          </div>
        </div>
        <div>
          <div>
            <b-button variant="outline-info" v-on:click="addEmailRow">Add Email #{{emailIndex + 1}}</b-button>
          </div>
          <div class="row" v-for="email in emails" :key="email.inputname">
            <b-form-input
              id="emails"
              v-model="email.inputvalue"
              type="email"
              placeholder="Enter email"
            ></b-form-input>
          </div>
        </div>
        <div>
          <div>
            <b-button variant="outline-info" v-on:click="addURL">Add URL #{{urlIndex + 1}}</b-button>
          </div>
          <div class="row" v-for="url in urls" :key="url.inputname">
            <b-form-input id="urls" v-model="url.inputvalue" type="url" placeholder="Enter URL"></b-form-input>
          </div>
        </div>
        <div>
          <b-form-group id="contactAddress" label="Address:" label-for="contactAddress">
            <b-form-input id="contactAddress" v-model="contactAddress" placeholder="Enter address"></b-form-input>
          </b-form-group>
        </div>        
        <div>
          <b-form-group id="description" label="Description:" label-for="description">
            <b-form-input id="description" v-model="description" placeholder="Enter description"></b-form-input>
          </b-form-group>
        </div>
        <div>
          <b-form-group label="Categories:">
            <b-form-checkbox-group
              id="categories"
              v-model="categories"
              :options="categoryOptions"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <!--b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
        </b-form-group-->
        <br />
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataCleanup",
  data() {
    return {
      name: "",
      legacyDescription: "",
      coordinates: [],
      contactPersons: [],
      contactPersonIndex: 0,
      emails: [],
      emailIndex: 0,
      phones: [],
      phoneIndex: 0,
      urls: [],
      urlIndex: 0,
      contactAddress: "",
      categories: [],
      description: "",
      categoryOptions: [
        {text: 'Paper', value: 'paper'},
        {text: 'Plastic', value: 'plastic'}
      ]
    };
  },
  mounted() {},
  methods: {
    addEmailRow: function() {
      this.emails.push({
        inputname: this.emails[this.emailIndex],
        inputvalue: ""
      });
      this.emailIndex++;
    },
    addContactPerson: function() {
      this.contactPersons.push({
        inputname: this.contactPersons[this.contactPersonIndex],
        inputvalue: ""
      });
      this.contactPersonIndex++;
    },
    addPhone: function() {
      this.phones.push({
        inputname: this.phones[this.phoneIndex],
        inputvalue: ""
      });
      this.phoneIndex++;
    },
    addURL: function() {
      this.urls.push({
        inputname: this.urls[this.urlIndex],
        inputvalue: ""
      });
      this.urlIndex++;
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.emails));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.contactPersons = [];
      this.contactPersonIndex = 0;
      this.emails = [];
      this.emailIndex = 0;
      this.phones= [];
      this.phoneIndex= 0;
      this.urls= [];
      this.urlIndex= 0;
      this.contactAddress= "";
      this.categories= [];
      this.description= "";

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
};
</script>