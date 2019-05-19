<template>
  <v-layout column>
    <v-flex xs6 offset-xs>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pt-2 pb-2">
          <v-text-field
              v-model="email"
              label="Email"
            ></v-text-field>
           <br>
           <v-text-field
              :type="'password'"
               v-model="password"
               label="Password"
             ></v-text-field>
           <br>
           <div class="error" v-html="error" />
           <br>
           <v-btn
             class="cyan"
             @click="login">
             LogIn
           </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>

</template>

<script src="./scripts/login.js"> </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./styles/style.css"></style>
