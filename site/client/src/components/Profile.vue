<template>
  <div>
    <h1>Your Profile</h1>
    <div>
    </div>
    <router-link :to="{path: '/index'}">
    <button @click="logout">Log Out</button>
    </router-link>
  </div>

</template>

<script src="./scripts/profile.js"></script>
<style src="./styles/style.css"></style>
