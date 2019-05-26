<template>
  <div class="center">
        <div class="log-box">
          <h1>Login</h1>
          <p>Please enter your login details below.
          No Log In Account?
          <router-link :to="{path: '/register'}" class=teamName>
          Register here
          </router-link>
          </p>
        <div>
          <input
          type="email"
          name="email"
          v-model="email"
          placeholder="email"  @keyup.enter="login()"/>
          <br>
          <input
          type="password"
          name="password"
          v-model="password"
          placeholder="password" @keyup.enter="login()" />
          <br>
          <br>
           <button
           @click="login">
           Login
         </button>
         <div class="loginError"> {{error}}</div>
        </div>
      </div>
      </div>

</template>

<script src="./scripts/login.js"> </script>
<style src="./styles/style.css"></style>
