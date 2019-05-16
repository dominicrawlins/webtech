<template>
  <v-layout column>
    <v-flex xs6 offset-xs>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pt-2 pb-2">
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
           <v-btn
             class="cyan"
             @click="register">
             Register
           </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>

</template>

<script src="./scripts/register.js"> </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./styles/style.css"></style>
