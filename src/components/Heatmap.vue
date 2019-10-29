<template>
  <section>
    <div class="columns">

      <div class="column is-7 is-offset-1">
        <div id="chart">
          <ApexChart type=heatmap height=450 :options="chartOptions" :series="series" />
        </div>
      </div>

      <div class="column is-3">
        <div class="card">
          <div class="card-content">
            <b-field label="Country">
              <b-select v-model="heatmapCountry" placeholder="Select a Country" expanded>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Japan">Japan</option>
                  <option value="Singapore">Singapore</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Taiwan">Taiwan</option>
              </b-select>
            </b-field>

            <br>
            <b-field label="Year">
                <b-slider v-model="heatmapYear" rounded type="is-info" :min="2010" :max="2018" ticks>
                  <template v-for="val in [2010, 2018]">
                      <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
                  </template>
                </b-slider>
            </b-field>

          </div>
        </div>
      </div>
    </div>
    <Table v-bind:heatmapCountry="heatmapCountry"/>
  </section>
</template>

<script>
import ApexChart from 'vue-apexcharts';
import Table from './Table.vue';
import axios from 'axios';

export default {
  name:'Heatmap',
  components: {
    ApexChart,
    Table
  },
  data: function() {
    return {
      info: {},
      heatmapCountry: 'Singapore',
      heatmapYear: '2018',
      series: [],
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        colors: ["#167df0"],
        xaxis: {
          type: 'category',
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        title: {
          text: 'Top 15 Places of Interest (Ranking top to bottom)'
        },
        grid: {
          padding: {
            right: 20
          }
        }
      }
    }
  },
  mounted () {
    axios
      .post('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/country',
        {
         data: {
          country: this.heatmapCountry,
          year: this.heatmapYear
         }
       }
      )
      //.then(response=> console.log(response.data.data.result.entities))
      .then(response => {this.series =  response.data.data.result.entities})
      .catch(error => { this.$buefy.toast.open(JSON.stringify(error.message)) })
  },
  watch: {
    heatmapCountry: function(newCountry) {
    axios
      .post('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/country',
        {
         data: {
          country: newCountry,
          year: this.heatmapYear
         }
       }
      )
      //.then(response=> console.log(response.data.data.result.entities))
      .then(response => {this.series =  response.data.data.result.entities})
      .catch(error => { this.$buefy.toast.open(JSON.stringify(error.message)) })
    },
    heatmapYear: function(newYear) {
    axios
      .post('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/country',
        {
         data: {
          country: this.heatmapCountry,
          year: newYear
         }
       }
      )
      //.then(response=> console.log(response.data.data.result.entities))
      .then(response => {this.series =  response.data.data.result.entities})
      .catch(error => { this.$buefy.toast.open(JSON.stringify(error.message)) })
    }
  }
}

</script>

<style scoped>

</style>
