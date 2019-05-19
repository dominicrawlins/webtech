<template>
  <div>
    <h1>
      Register
    </h1>


    <input
    type="email"
    name="email"
    v-model="email"
    placeholder="email" />
    <br>
    <input
    type="password"
    name="password"
    v-model="password"
    placeholder="password" />
    <br>
    <div class="error" v-html="error" />
    <br>
    <button
    @click="register">
    Register
  </button>
</div>
</template>

<script src="./scripts/register.js"> </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./styles/style.css"></style>
