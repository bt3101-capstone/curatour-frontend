  <template>

  <div class="wordcloud">
    <wordcloud
      :data="defaultWords[sliderValue]"
      nameKey="name"
      valueKey="value"
      :color="myColors"
      :showTooltip="false"
      spiral="rectangular">
    </wordcloud>
    <b-field label="Select Period">
      <b-slider v-model="sliderValue" type="is-info"  rounded :min="0" :max="3" aria-label="Fan" :tooltip="false" @change="changeData">
          <b-slider-tick :value="0">1 Day</b-slider-tick>
          <b-slider-tick :value="1">1 Week</b-slider-tick>
          <b-slider-tick :value="2">1 Month</b-slider-tick>
          <b-slider-tick :value="3">3 Months</b-slider-tick>
      </b-slider>
    </b-field>
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import axios from 'axios'

export default {
  name: 'trendswordcloud',
  components: {
    wordcloud
  },
  mounted () {
    axios
      .get('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/timeEntities')
      .then((response) => {
        var test=response.data.data.result
        // var wordCloudData=[]
        for(var i=0; i<test.length;i++){
          var obj=test[i].entities
          // var timePeriod =test[i].timePeriod
          var periodData=[]
          for (let [key, value] of Object.entries(obj)) {
            var trendWord = {
              "name": key,
              "value": value
            }
            periodData.push(trendWord);
          }
          this.defaultWords[i]=periodData
        }
      }
      )},

  data() {
    return {
      myColors: ['#849099'],
      defaultWords: {
        0: [],
        1:[],
        2:[],
        3:[]
        },
      sliderValue: 0,
    }
  }
}
</script>
