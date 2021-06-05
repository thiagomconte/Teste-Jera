<template>
  <div>
    <Nav class="mb-5"/>
    <router-view/>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue';
export default {
  components:{
    Nav
  }
}
</script>

<style>

</style>