<template>
  <b-modal
    size="xl"
    scrollable
    ref="modal"
    :title="biz_name"
    :visible="visible"
    @hidden="resetModal"
  >
    <div v-if="currentPoint">
      <h6>
        <span v-html="currentPoint.properties.description"></span>
      </h6>
      <!-- <h5>{{currentPoint.properties.description}}</h5> TODO use this-->
      <hr />
    </div>
    <div>
      <b-form @submit="handleSubmit">
        <!-- TODO Add form validations -->
        <div>
          <b-form-group id="name" label="Name:" label-for="biz_name">
            <b-form-input
              required
              id="biz_name"
              v-model="biz_name"
              placeholder="Enter name"
              size="sm"
            ></b-form-input>
          </b-form-group>
        </div>
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
          <div v-for="person in contactPersons" :key="person.inputname">
            <b-form-input
              id="contactPersons"
              v-model="person.inputvalue"
              type="text"
              placeholder="Enter contact person name"
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
          <b-form-group label="Categories:">
            <b-form-checkbox-group
              id="categories"
              v-model="categories"
              :options="categoryOptions"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </b-form>
    </div>
    <template v-slot:modal-footer="{save, cancel}">
      <b-button size="sm" type="submit" variant="primary" @click="handleOk">Save</b-button>
      <b-button size="sm" variant="danger" @click="resetModal()">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script>
import MapPointsApi from '../services/api/MapPoints'
export default {
  name: "PointDetails",
  model: {
    prop: "currentPoint",
    event: "input"
  },
  props: {
    currentPoint: {
      default: null
    }
  },
  computed: {
    visible() {
      return this.currentPoint !== null;
    }
  },
  watch: {
    currentPoint() {
      this.biz_name =
        this.currentPoint !== null ? this.currentPoint.properties.Name : "";
      this.coordinates =
        this.currentPoint !== null
          ? this.currentPoint.geometry.coordinates
          : [];
    }
  },
  data() {
    return {
      biz_name: "",
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
    handleOk(evt) {
      evt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      // alert("submitting \n" + this.pointDetails());
      var request_object = {
        name: "",
        description: "",
        categories: [],
        coordinates: [],
        contact: {
          persons: [],
          emails: [],
          phones: [],
          urls: [],
          address: ""
        }
      };
      request_object.name = this.biz_name;
      request_object.description = this.description;
      request_object.categories = this.categories;
      request_object.coordinates = this.coordinates;
      for (var person in this.contactPersons) {
        request_object.contact.persons.push(
          JSON.stringify(this.contactPersons[person].inputvalue)
        );
      }
      for (var email in this.emails) {
        request_object.contact.emails.push(
          JSON.stringify(this.emails[email].inputvalue)
        );
      }
      for (var number in this.phones) {
        request_object.contact.phones.push(
          JSON.stringify(this.phones[number].inputvalue)
        );
      }
      for (var url in this.urls) {
        request_object.contact.urls.push(
          JSON.stringify(this.urls[url].inputvalue)
        );
      }
      request_object.contact.address = this.contactAddress;

      var str_request_object = JSON.stringify(request_object);
      // console.log(str_request_object);

      alert(JSON.stringify(str_request_object));
      MapPointsApi.addPoints(request_object);

      //TODO add loader
      // this.$nextTick(() => {
      //   this.$refs.modal.hide();
      // });
    },
    pointDetails() {
      return (
        this.biz_name +
        "\n" +
        this.description +
        "\n" +
        this.contactAddress +
        "\n" +
        this.coordinates +
        "\n" +
        JSON.stringify(this.contactPersons) +
        "\n" +
        JSON.stringify(this.emails) +
        "\n" +
        JSON.stringify(this.phones) +
        "\n" +
        JSON.stringify(this.categories) +
        "\n" +
        JSON.stringify(this.urls)
      );
    },
    resetModal() {
      this.biz_name = "";
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
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
      this.$emit("input", null);
    }
  }
};
</script>