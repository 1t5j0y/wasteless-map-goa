<template>
  <div id="container">
    <br />
    <br />
    <div>
      <b-form @submit="onSubmit" @reset="onReset">
        <div>
          <div v-for="person in contactPersons" :key="person.inputname">
            <b-form-input
              id="contactPersons"
              v-model="person.inputvalue"
              type="text"
              placeholder="Enter name"
              size="sm"
            ></b-form-input>
            <br />
          </div>
          <div>
            <b-button
              variant="outline-info"
              v-on:click="addContactPerson"
              size="sm"
            >Add Contact Person #{{contactPersonIndex + 1}}</b-button>
          </div>
        </div>
        <br />
        <div>
          <div v-for="number in phones" :key="number.inputname">
            <b-form-input
              id="phones"
              v-model="number.inputvalue"
              type="tel"
              placeholder="Enter phone number"
              size="sm"
            ></b-form-input>
            <br />
          </div>
          <div>
            <b-button
              variant="outline-info"
              v-on:click="addPhone"
              size="sm"
            >Add Phone #{{phoneIndex + 1}}</b-button>
          </div>
        </div>
        <br />
        <div>
          <div v-for="email in emails" :key="email.inputname">
            <b-form-input
              id="emails"
              v-model="email.inputvalue"
              type="email"
              placeholder="Enter email"
              size="sm"
            ></b-form-input>
            <br />
          </div>
          <div>
            <b-button
              variant="outline-info"
              v-on:click="addEmailRow"
              size="sm"
            >Add Email #{{emailIndex + 1}}</b-button>
          </div>
        </div>
        <br />
        <div>
          <div v-for="url in urls" :key="url.inputname">
            <b-form-input
              id="urls"
              v-model="url.inputvalue"
              type="url"
              placeholder="Enter URL"
              size="sm"
            ></b-form-input>
            <br />
          </div>
          <div>
            <b-button variant="outline-info" v-on:click="addURL" size="sm">Add URL #{{urlIndex + 1}}</b-button>
          </div>
        </div>
        <br />
        <div>
          <b-form-group id="contactAddress" label="Address:" label-for="contactAddress">
            <b-form-input
              id="contactAddress"
              v-model="contactAddress"
              placeholder="Enter address"
              size="sm"
            ></b-form-input>
          </b-form-group>
        </div>
        <br />
        <div>
          <b-form-group id="description" label="Description:" label-for="description">
            <b-form-input
              id="description"
              v-model="description"
              placeholder="Enter description"
              size="sm"
            ></b-form-input>
          </b-form-group>
        </div>
        <br />
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

        <br />
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeparatedData",
  data() {
    return {
      name: "",
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
        { text: "Paper", value: "paper" },
        { text: "Plastic", value: "plastic" }
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
      this.phones = [];
      this.phoneIndex = 0;
      this.urls = [];
      this.urlIndex = 0;
      this.contactAddress = "";
      this.categories = [];
      this.description = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>