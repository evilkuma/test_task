<template>
  <div id="app">
      <router-view name="menu" id="menu" />
      <router-view id="main" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0;
        background-color: #222831;
        color: #f2a365;
    }

    a {
        color: #f2a365;
    }

    #menu, #main {
        float: left;
        height: 100%;
    }

    #menu {
        float: left;
        width: 150px;
    }
    #main {
        float: left;
        width: calc(100% - 150px);
    }

</style>