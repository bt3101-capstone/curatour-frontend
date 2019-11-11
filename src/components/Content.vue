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

      <nav class="level">
        <div class="level-left">
          <div class="heading">Showing Analysis for {{currentBlog}}</div>
        </div>
      </nav>

      <nav class="level">
        <div class="column">
          <div class="box">
            <div>
              <SpeedometerIcon/>
            </div>
            <b-tooltip label="Loading Time for Users"
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
      </nav>

      <div class="columns is-multiline">
        <div class="column">
          <div class="box">
            <nav class="level">
              <div class="level-left">
                </div>
              <div class="level-right">
                <div class="level-item">
                  <b-button @click="changeDataPeriod7">7 Days</b-button>
                </div>
                <div class="level-item">
                  <b-button @click="changeDataPeriod14">14 Days</b-button>
                </div>
                <div class="level-item">
                  <b-button @click="changeDataPeriod21">21 Days</b-button>
                </div>
              </div>
            </nav>

      <div class="columns is-multiline">
        <div class="column">
          <div class="box">
            <div>
              <HumanHandsupIcon/>
            </div>
            <b-tooltip label="Number of Internet Users who visit the site"
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
              <div class="level-item">
                <div class="">
                  <div class="heading">Median</div>
                  <div class="title is-5">0.51</div>
                </div>
              </div>
            </div>

            <div id='reachChart'><apexcharts ref="reachSeries" type=line height=250 :options="chartOptions" :series="reachSeries" /></div>
          </div>
        </div>

                <div class="column">
          <div class="box">
            <div>
              <PodiumGoldIcon/>
            </div>
            <b-tooltip label="Calculated using combination of average daily visitors and pageviews over past month"
            type='is-light'
            position="is-right">
              <div class="heading">Rank
              </div>
            </b-tooltip>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Based on Alexa</div>
                  <div class="title is-5">{{historicalData.rank.toLocaleString()}}</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Median</div>
                  <div class="title is-5">899,927</div>
                </div>
              </div>
            </div>

            <div id='rankChart'><apexcharts ref="rankSeries" type=line height=250 :options="chartOptions" :series="rankSeries" /></div>
          </div>
        </div>

        <div class="column">
          <div class="box">
            <div>
              <LaptopWindowsIcon/>
            </div>
            <b-tooltip label="Total No. of Alexa user URL requests"
            type='is-light'
              position="is-right">
              <div class="heading">Page Views
              </div>
            </b-tooltip>

            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Per User</div>
                  <div class="title is-5">{{historicalData.pageViews.perUser}}</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Median</div>
                  <div class="title is-5">1.60</div>
                </div>
              </div>
            </div>
            <div id='pageViewsChart'><apexcharts ref="pageViewsSeries" type=line height=250 :options="chartOptions" :series="pageViewsSeries" /></div>
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
                <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <div class="heading">Current Travel Trends</div>
                  </div>
                  <div class="level-item">
                    <AirplaneIcon/>
                  </div>
                </div>
                </nav>
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
import PodiumGoldIcon from 'vue-material-design-icons/PodiumGold.vue';
import SpeedometerIcon from 'vue-material-design-icons/Speedometer.vue';
import AirplaneIcon from 'vue-material-design-icons/Airplane.vue';
import apexcharts from 'vue-apexcharts'
import moment from 'moment'

export default {
  name: 'content',
  components: {
    TrendsWordCloud,
    HumanHandsupIcon,
    LaptopWindowsIcon,
    SpeedometerIcon,
    AirplaneIcon,
    PodiumGoldIcon,
    apexcharts,
  },
  data(){
    return{
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories:[],
        },
      },

      pageViewsSeries: [{
        name: 'Page-Views-perMillion',
        data:[],
      },],

      rankSeries: [{
        name: 'Rank',
        data:[],
      },],

      reachSeries: [{
        name: 'Reach',
        data:[],
      },],
      blogUrl:[],
      selectedBlog: "",
      currentBlog: "",
      historicalData:[],
      isLoading:false,
      isFullPage: true,
      blogInput:false,
      trafficData:[], 
      startDate: moment().subtract(6, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    }
  },
  mounted () {
    axios
      .get('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/autocomplete')
      .then(response=>(this.blogUrl = response.data.data.result))
      },
  methods: {
    changeDataPeriod7() {
      this.startDate=moment().subtract(6, 'days').format('YYYY-MM-DD'),
      axios.post('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/traffic/',{
        data: {
          type: "historicalData",
          blogUrl: this.currentBlog,
          startDate: this.startDate,
          endDate: this.endDate,
        }
      })
      .then(response=>{
        var chartData=response.data.data.result
        var date=[]
        var pageViews=[]
        var rank=[]
        var reach=[]
        for(var i=0; i<chartData.length;i++){
          date.unshift(moment(chartData[i].date).format('DD-MM-YY'));
          pageViews.unshift(chartData[i].pageViews.perUser);
          rank.unshift(chartData[i].rank);
          reach.unshift(chartData[i].reach.perMillion);
        }
        this.chartOptions = {...this.chartOptions, ...{
          xaxis: {
              categories: date
          }
        }}
        this.pageViewsSeries[0].data=pageViews
        this.rankSeries[0].data=rank
        this.reachSeries[0].data=reach
      })
    },
    changeDataPeriod14() {
      this.startDate=moment().subtract(13, 'days').format('YYYY-MM-DD'),
      axios.post('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/traffic/',{
        data: {
          type: "historicalData",
          blogUrl: this.currentBlog,
          startDate: this.startDate,
          endDate: this.endDate,
        }
      })
      .then(response=>{
        var chartData=response.data.data.result
        var date=[]
        var pageViews=[]
        var rank=[]
        var reach=[]
        for(var i=0; i<chartData.length;i++){
          date.unshift(moment(chartData[i].date).format('DD-MM-YY'));
          pageViews.unshift(chartData[i].pageViews.perUser);
          rank.unshift(chartData[i].rank);
          reach.unshift(chartData[i].reach.perMillion);
        }
        this.chartOptions = {...this.chartOptions, ...{
          xaxis: {
              categories: date
          }
        }}
        this.pageViewsSeries[0].data=pageViews
        this.rankSeries[0].data=rank
        this.reachSeries[0].data=reach
      })
    },
    changeDataPeriod21() {
      this.startDate=moment().subtract(20, 'days').format('YYYY-MM-DD'),
      axios.post('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/traffic/',{
        data: {
          type: "historicalData",
          blogUrl: this.currentBlog,
          startDate: this.startDate,
          endDate: this.endDate,
        }
      })
      .then(response=>{
        var chartData=response.data.data.result
        var date=[]
        var pageViews=[]
        var rank=[]
        var reach=[]
        for(var i=0; i<chartData.length;i++){
          date.unshift(moment(chartData[i].date).format('DD-MM-YY'));
          pageViews.unshift(chartData[i].pageViews.perUser);
          rank.unshift(chartData[i].rank);
          reach.unshift(chartData[i].reach.perMillion);
        }
        this.chartOptions = {...this.chartOptions, ...{
          xaxis: {
              categories: date
          }
        }}
        this.pageViewsSeries[0].data=pageViews
        this.rankSeries[0].data=rank
        this.reachSeries[0].data=reach
      })
    },
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
              }
            ),
            axios.post('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/traffic/',{
              data: {
                type: "historicalData",
                blogUrl: test,
                startDate: this.startDate,
                endDate: this.endDate,
              }
            })])
            .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {  
              this.historicalData=firstResponse.data.data.result;
              this.isLoading = false;
              this.currentBlog=test;
              this.trafficData=secondResponse.data.data.result[0];
              var chartData=thirdResponse.data.data.result
              var date=[]
              var pageViews=[]
              var rank=[]
              var reach=[]
              for(var i=0; i<chartData.length;i++){
                date.unshift(moment(chartData[i].date).format('DD-MM-YY'));
                pageViews.unshift(chartData[i].pageViews.perUser);
                rank.unshift(chartData[i].rank);
                reach.unshift(chartData[i].reach.perMillion);
              }
              this.chartOptions = {...this.chartOptions, ...{
                xaxis: {
                    categories: date
                }
              }}
              this.pageViewsSeries[0].data=pageViews
              this.rankSeries[0].data=rank
              this.reachSeries[0].data=reach
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
  },
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