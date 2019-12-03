<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  ul,ol,li {
    list-style: none;
  }
  html, body {
    width: 100%;
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
    // min-height: 13.34rem;
  }
  // #app {
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   flex-direction: column;
  // }
  // .appMain {
  //   width: 100%;
  //   flex: 1;
  // }
  // .footBar {
  //   width: 100%;
  //   height: 50px;
  //   background: red;
  // }
</style>
