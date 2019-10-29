<template>
  <div id="trending">
    <Heatmap v-bind:heatmap_data="heatmap_data" v-bind:year="year" v-bind:country="country"/>
  </div>
</template>

<script>

import Heatmap from '../components/Heatmap.vue';

function generateCountry (country) {
  var countries = ["Indonesia", "Japan", "Singapore", "South Korea", "Thailand", "Taiwan"]
  if (countries.includes(country)) {
    return country
  } else {
    return "Japan"
  }
}

function generateYear (year) {
  var years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
  if (years.includes(year)) {
    return year
  } else {
    return 2019
  }
}

function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

export default {
  name: 'Trending',
  components: {
    Heatmap
  },
  data() {
    return {
    country:generateCountry(),
    year: generateYear(),
      heatmap_data: [{
          name: 'Arashiyama',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Osaka',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Kyoto',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Onsen',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Tokyo',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Fuji',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Nara',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Hakone',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Sapporo',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Hiroshima',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Nagoya',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Shinjuku',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Kobe',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Fukuoka',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        },
        {
          name: 'Kanazawa',
          data: generateData(12, {
            min: 5,
            max: 90
          })
        }
      ]
    }
  }
}
</script>

<style>
#trending {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>