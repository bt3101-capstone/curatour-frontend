<template>
  <div id="content">

    <div class='autocomplete'>

    <b-tooltip label="Enter a blog URL to get started"
      type='is-light'
      position="is-right">
      <div class="heading">Discover your Performance</div>
    </b-tooltip>


      <b-autocomplete 
        class='autocompleteinput'
        rounded
        v-model='selectedBlog'
        :data="filteredDataArray"
        placeholder="e.g. www.misstamchiak.com"
        icon="magnify"
        @focus="clearOutput"
        @select="option => retrieveData(option)">
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </div>

      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <div 
      v-if="blogInput"
      ref="visual"
      >

        <div class="level-left">
          <div class="level-item">
            <div class="heading">Showing Analysis for {{currentBlog}}</div>
          </div>
        </div>

      <div class="columns is-multiline">

        <div class="column">
          <div class="box">
            <div>
              <HumanHandsupIcon/>
            </div>
            <b-tooltip label="Tooltip right"
            type='is-light'
            position="is-right">
              <div class="heading">Reach
              </div>
            </b-tooltip>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Per Million</div>
                  <div class="title is-5">{{historicalData.reach.perMillion}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="box">
            <div>
              <SpeedometerIcon/>
            </div>
            <b-tooltip label="Tooltip right"
            type='is-light'
            position="is-right">
              <div class="heading">Speed
              </div>
            </b-tooltip>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Percentile</div>
                  <div class="title is-5">{{trafficData.speed.percentile}}</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Median Load Time</div>
                  <div class="title is-5">{{trafficData.speed.medianLoadTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="box">
            <div>
              <LaptopWindowsIcon/>
            </div>
            <b-tooltip label="Total No. of Alexa user URL requests"
              position="is-right">
              <div class="heading">Page Views
              </div>
            </b-tooltip>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Per Million</div>
                  <div class="title is-5">{{historicalData.pageViews.perMillion}}</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Per User</div>
                  <div class="title is-5">{{historicalData.pageViews.perUser}}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>

        <div class="columns is-multiline">
        <div class="column">
          <div class="box">
              <div class="level-left">
              <b-tooltip label="Tooltip right"
                type='is-light'
                position="is-right">
                <div class="heading">Current Travel Trends<AirplaneIcon/></div>
              </b-tooltip>
              </div>

              <TrendsWordCloud></TrendsWordCloud>

          </div>
        </div>
        </div>

      </div>

  </div>
</template>

<script>
import TrendsWordCloud from './TrendsWordCloud.vue'
import axios from 'axios'
import HumanHandsupIcon from 'vue-material-design-icons/HumanHandsup.vue';
import LaptopWindowsIcon from 'vue-material-design-icons/LaptopWindows.vue';
import SpeedometerIcon from 'vue-material-design-icons/Speedometer.vue';
import AirplaneIcon from 'vue-material-design-icons/Airplane.vue';

export default {
  name: 'content',
  components: {
    TrendsWordCloud,
    HumanHandsupIcon,
    LaptopWindowsIcon,
    SpeedometerIcon,
    AirplaneIcon,
    // apexchart,
  },
  data(){
    return{
      chartOptions: {
        chart: {
          id: 'pageviews-chart'
        },
        xaxis: {
          categories: ['Feb 19', 'Mar 19', 'Apr 19', 'May 19', 'Jun 19', 'Jul 19', 'Aug 19', 'Sep 19']
        }
      },
      series: [{
        name: 'Page Views',
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      }],
      blogUrl:[],
      selected: null,
      selectedBlog: "",
      currentBlog: "",
      historicalData:[],
      isLoading:false,
      isFullPage: true,
      blogInput:false,
      trafficData:[],
    }
  },
  mounted () {
    axios
      .get('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/autocomplete')
      .then(response=>(this.blogUrl = response.data.data.result))
      },
  methods: {
    clearOutput(){
      if(this.blogUrl.includes(this.selectedBlog)){
        this.selectedBlog=""
      }
    },
    retrieveData(test){
      if (this.blogUrl.includes(test)){
        this.isLoading = true
        setTimeout(() => {
          axios.all([
            axios.get('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/historical/'+test),
            axios.post('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/traffic/',{
              data: {
                type: "contentData",
                blogUrl: test
              }
              })])
            .then(axios.spread((firstResponse, secondResponse) => {  
              this.historicalData=firstResponse.data.data.result;
              this.isLoading = false;
              this.currentBlog=test;
              this.trafficData=secondResponse.data.data.result[0];
              this.$buefy.toast.open('Success!')
              this.blogInput = true;
              }))
              .catch(error =>{
                this.isLoading=false;
                this.$buefy.toast.open(JSON.stringify(error.message))
              });
          }, 1 * 1000)
      }
    },
  },
  computed: {
    filteredDataArray() {
      return this.blogUrl.filter((option) => {
      return option.toString().toLowerCase().indexOf(this.selectedBlog.toLowerCase()) >= 0})
    }
  }
}
</script>

<style>
#content {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.heading{
  margin-top: 5px;
}
.autocomplete{
  /* margin-top:250px; */
  /* line-height: 200px; */
  /* border: 3px solid green; */
  /* padding: 10px; */
}
</style>

<style scoped>
.autocompleteinput{
  margin-bottom : 20px;
  margin-top: 20px;
  margin-left:auto;
  margin-right:auto;
  width: 40%;
}
</style>