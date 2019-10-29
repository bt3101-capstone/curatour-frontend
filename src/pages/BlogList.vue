<template>
  <div id="blogList">
      <div class="heading">Blogs Analysed:</div>
      <li v-for="blog in list">
    {{blog}}
  </li>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'bloglist',
  data(){
    return{
      list:[],
    }
  },
  mounted () {
    axios
      .get('http://ec2-54-179-183-41.ap-southeast-1.compute.amazonaws.com/autocomplete')
      .then(
        response=>(this.list = response.data.data.result)
        )
  },
}
</script>

<style>
#blogList {
    margin-top: 20px;  
}
</style>