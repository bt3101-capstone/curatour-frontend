<template>
  <div id="blogList">
    <div class="columns is-multiline" v-for="row in formattedBlogs">
      <div class="column" v-for="blogList in row">
        <div class="box">
          {{blogList.blog}}
        </div>
      </div>
    </div>
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
        response=>{
          var responseResult=response.data.data.result
          for(var i=0; i<responseResult.length;i++){
            var data={id: i, blog:responseResult[i]};
            this.list.push(
              data
              );
        }
        }

        )
  },
  computed: {
      formattedBlogs() {
          return this.list.reduce((c, n, i) => {
              if (i % 3 === 0) c.push([]);
              c[c.length - 1].push(n);
              return c;
          }, []);
      }
  }
}
</script>

<style>
#blogList {
    margin-top: 20px;  
    margin-bottom: 20px;  
    margin-left: 40px;
    margin-right: 40px;
}
</style>