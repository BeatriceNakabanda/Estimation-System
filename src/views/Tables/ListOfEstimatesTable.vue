<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row ">
        <div class="col text-right">
          <base-button type="primary" id="create-estimate" size="md" class="shadow-none spacing btn-md" @click="modal1 = true">Create Estimate</base-button>
          <modal :show.sync="modal1">
                      <template slot="header">
                        <!-- here -->
                          <h3 class="modal-title " id="exampleModalLabel">Created Estimate</h3>
                      </template>
                      <!-- create estimate form -->
                      <CreateEstimateForm  />
                      
                  </modal>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <base-table class="table table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" 
                  tbody-classes="list"
                  :data="estimates" id="left">
        <template  slot="columns"  >
          <th class="bgcolor">Title</th>
          <th class="bgcolor">Project</th>
          <th class="bgcolor">Developer</th>
          <th class="bgcolor">Date Created</th>
          <th class="bgcolor">Date Estimated</th>
          <th class="bgcolor">Status</th>
          <th class="bgcolor"></th>
        </template>
          <template class="table-row" slot-scope="{row} ">
          <td class="title">
            {{row.title}}
          </td>
          <td class="project">
            {{row.project}}
          </td>
          <td class="developer">
            {{row.developer}}
          </td>
          <td class="dateCreated">
            {{row.dateCreated}}
          </td>
          <td class="dateEstimated">
            {{row.dateEstimated}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
         
          <td >
            <span class="action-icons">
              <router-link  to="/" id="view">
                <i class="rounded-circle fa fa-eye fa-1x" aria-hidden="true" id="my-icons" @click="modal2 = false" ></i>
                <modal :show.sync="modal2">
                  <template slot="header">
                          <h3 class="modal-title " id="exampleModalLabel"> Estimate</h3>
                      </template>
                </modal>
              </router-link>
            </span>
            <span class="action-icons">
              <router-link  to="/" id="view">
<<<<<<< HEAD
                <i class="rounded-circle fas fa-pen" aria-hidden="true" id="my-icons" @click=" modal1 = true ,edit(_id,updatedEstimate);" ></i>
                <modal :show.sync="modal">
                    <template slot="header">
                        <h3 class="modal-title " id="exampleModalLabel">Editing Estimate</h3>
                    </template>
                    <div>
                      <!-- edit estimate form -->
                     
                    </div>
                    
                </modal>
=======
                <i class="rounded-circle fas fa-pen" aria-hidden="true" id="my-icons" @click.stop="editEstimate(row._id)"></i>

>>>>>>> 454bc23f60f602203105424e3aefbd6eb8c014a8
              </router-link>
            </span>
            
          </td>
          </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <!-- <base-pagination total="30"></base-pagination> -->
      <base-pagination></base-pagination>

    </div>
    
  </div>
</template>
<script>
import CreateEstimateForm from "../Forms/CreateEstimateForm";

// import EditEstimateForm from "../Forms/EditEstimateForm";
import axios from "axios";

const baseURL = "http://localhost:8081/estimates";

export default {
  name: "estimates-table",
  components: {
    CreateEstimateForm
    // EditEstimateForm
  },
  props: {
    estimates: Array,
    type: {
      type: String
    },
    title: String
  },
  data() {
    return {
      // editing: null,
      modal: true,
      modal1: true,
      modal2: true
    };
  },
    //fetches a single estimate when the component is created
    async created(){
      try {
        const res = await axios.get(`http://localhost:8081/estimate/` + this.$route.params.id) 

        this.estimate = res.data; 
      } catch(e){
        console.error(e)
      }
    },
  methods: {
<<<<<<< HEAD
    edit: function(_id, updatedEstimate) {
      row.title = req.body.title = title;

      row.project = req.body.project = project;
      row.developer = req.body.developer = developer;
      let { title, project, developer } = updatedEstimate;

      axios
        .put("http://localhost:8081/estimates/" + _id, updatedEstimate)
        .then(res => {
          res.data = updatedEstimate;
        })
        .catch(error => {
          console.log(error);
        });
=======
    editEstimate(estimateid){
      this.$router.push({
        name: 'EditEstimate',
        params: { id: estimateid }
      })
>>>>>>> 454bc23f60f602203105424e3aefbd6eb8c014a8
    }
  }

  // async editEstimate(id, updatedEstimate) {
  // try {
  //     const response = await fetch(`http://localhost:3000/estimates/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(updatedEstimate),
  //     headers: { 'Content-type': 'application/json; charset=UTF-8' },
  //     })
  //     const data = await response.json()
  //     this.estimates = this.estimates.map(estimate => (estimate.id === id ? data : estimate))
  // } catch (error) {
  //     console.error(error)
  // }
  // }
  // editMode(estimate) {
  //   this.cachedEstimate = Object.assign({}, estimate);
  //   this.editing = estimate.id;
  // }
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
#my-icons {
  background-color: #5e72e4;
  border-color: #5e72e4;
  color: #eee7eb;
}
#my-icons:hover {
  background-color: #d10572;
  border-color: #d10572;
  color: #eee7eb;
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .card {
    margin-top: 30px;
  }
}
</style>
