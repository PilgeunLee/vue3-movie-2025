<template>
  <router-link
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </router-link>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
// @import "~/scss/main";

.logo{
  font-family: "Oswald","sans-serif";
  font-size: 20px;
  color: $black;
  text-decoration: none;
  &:hover { 
    color : $black;
  }
  span {
    color: $primary;
  }
}
</style>