<template>
      <div>
          <p>Login</p>
        <div>
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

           <br>
           <button
           @click="login">
           Login
         </button>
        </div>
      </div>

</template>

<script src="./scripts/login.js"> </script>
<style src="./styles/style.css"></style>
