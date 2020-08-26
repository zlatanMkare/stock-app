<template>
  <v-layout>
    <v-flex class="pa-12">
      <h1 class="mb-5">{{title}}</h1>
      <p>{{ content }}</p>
      <p>{{ content }}</p>
      <p>{{ content }}</p>
      <p>{{ content }}</p>
     </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      title: 'About',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus porro ut cum quaerat velit corrupti alias corporis nemo labore iure, dolores rerum ad voluptate totam aut error pariatur, provident autem.'
    }
  }
}
</script>
