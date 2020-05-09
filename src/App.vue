<template>
  <div class="wrapper">
    <div class="user-wrapper">
      <user-card v-if="GET_ROOT_USER" :card="GET_ROOT_USER"></user-card>
    </div>
  </div>
</template>

<script>
  import UserCard from "./components/UserCard";
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: 'App',
    components: {
      UserCard
    },
    mounted() {
     this.add_card();
    },
    computed: {
      ...mapGetters(['GET_ROOT_USER']),
    },
    methods: {
      ...mapActions(['add_card'])
    }
  }
</script>

<style lang="scss">
  @import "assets/style/main";

  body {
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.2;
  }
  .wrapper {
    outline: none;
    padding: 160px 20px 220px;
    background: #fff;
    border-radius: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    flex-grow: 1;
    position: relative;
  }
  .user-wrapper {
    display: flex;
  }
</style>
