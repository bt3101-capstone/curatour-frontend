<template>
  <section>
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <p class="content" align="left"><b>Monetisable Entities in {{ heatmapCountry }}</b></p>
        <b-field type="is-info">
            <b-input
              placeholder="Search for Specific Entities"
              icon="magnify"
              v-model="search"
            >
            </b-input>
        </b-field>
        <b-table
          paginated
          :data="items"
          :columns="columns"
          :per-page=10
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name:'Table',
  props:['heatmapCountry'],
  data: function() {
    return {
      search: '',
      info: [],
      data: [],
      columns: [
        {
           field: 'entity',
           label: 'Entities',
           width: 800
        },
        {
           field: 'city',
           label: 'Cities',
        }
      ]
    }
  },
  computed: {
    items () {
      return this.search
        ? this.data.filter(item => item.entity.toLowerCase().includes(this.search.toLowerCase()))
        : this.data
    }
  },
  mounted () {
    axios
      .get('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/monetize/' + this.heatmapCountry)
      .then(response => {this.data =  response.data.data.result})
      .catch(error => { console.log(error) })
  },
  watch: {
    heatmapCountry: function(newCountry) {
    axios
      .get('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/blog/monetize/' + newCountry)
      .then(response => {this.data =  response.data.data.result})
      .catch(error => { console.log(error) })
    }
  }
}

</script>

<style scoped>

</style>
