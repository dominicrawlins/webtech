<template>
  <div>
    <h1>Your Profile</h1>
    <div>
      <p>Select Your Team</p>
      <button v-on:click="selectedTeam = team.id" v-for="team in teams">
      <img :src='getImageUrl(team.id)' height=70 width=70  class="pad">
      <!-- {{selectTeam(team)}} -->
      </button>
      {{selectedTeam}}
    </div>
    <router-link :to="{path: '/index'}">
    <button @click="logout">Log Out</button>
    </router-link>
  </div>

</template>

<script src="./scripts/profile.js"></script>
<style src="./styles/style.css"></style>
