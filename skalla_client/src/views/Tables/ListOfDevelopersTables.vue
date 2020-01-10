<template>
    <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        <div class="col text-right">
          <div class="header-spacing"></div>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th class="bgcolor">No</th>
            <th class="bgcolor">Developer</th>
            <th class="bgcolor"></th>
            <th class="bgcolor"></th>
            <th class="bgcolor"></th>
            <th class="bgcolor"></th>
            
        </tr>
        </thead>
          <tbody>
            <tr v-for="developer, index in developers">
              <td >{{ index + 1 }}</td>
               <td> {{ developer.name}}</td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
            </tr>
          </tbody>
      </table>
    </div>
    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import EditEstimateForm from "../Forms/EditEstimateForm";

export default {
  name: "developers-table",
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      modal1: false,
      developers: [],

      form: {
        developers: ""
      }
    };
  },
  mounted() {
    created();
  },

  async created() {
    try {
      const res = await axios.get(`http://localhost:8081/api/users/developers`);

      this.developers = res.data;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
<style>
#view {
  color: #747273;
  padding-left: 10px;
}
#left {
  text-align: left;
}
/* Adding cursor to table */
.table-row {
  cursor: pointer;
}

.spacing {
  padding-left: 16px;
  padding-right: 16px;
}
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 13px;
  font-weight: 700;
}

/* First column of table font adjustment */
.text-sm {
  font-weight: 400;
  font-size: 13px !important;
}
/* styling rounded border */
.rounded-circle {
  border: 1px solid rgb(201, 201, 199);
  padding: 6px;
}

/* Status column font size adjustment */
span .status {
  font-size: 13px;
}

.bgcolor {
  background: #e7eaec !important;
}
/* displaying action icons on hover */
table > tbody > tr .action-icons {
  visibility: hidden;
}
table > tbody > tr:hover .action-icons {
  visibility: visible;
}
/* styling buttons */
#create-estimate {
  border-radius: 4px;
}
/* cancel button for modal */
.cancel-color {
  color: rgb(135, 141, 148);
  background-color: #e2e0e1;
}
.cancel-color:hover {
  color: #ffffff;
  background-color: #afadae;
}

/* table header spacing */
.header-spacing {
  width: 5px;
  height: 43px;
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .card {
    margin-top: 30px;
  }
}
</style>