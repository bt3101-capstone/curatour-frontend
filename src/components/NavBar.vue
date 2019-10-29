<template>
    <b-navbar class='header' fixed-top='true'>
        <template slot="brand" >
            <b-navbar-item href='https://curatour.io'>
                <img
                    src="../assets/curatour_navbar.png"
                >
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item class='headercontent' href="/home">
                Your Performance
            </b-navbar-item>
            <b-navbar-item class='headercontent' href="/trending">
                What's Trending
            </b-navbar-item>
            <b-navbar-item class='headercontent' href="/blogs">
              List of Blogs Analysed 
            </b-navbar-item>
            <b-navbar-item class='headercontent' href="/about">
              About
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import 'buefy/dist/buefy.css'

export default {
  name: 'NavBar',
}
</script>

<style>
.header{
  background-color: #ED4933;
}
.headercontent{
  color: black;
}
</style>
