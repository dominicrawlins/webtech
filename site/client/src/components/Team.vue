<template>
  <div>
    <div v-if="urlLoaded">
    <h1>{{teamAttributes[0].name}}</h1>
    <img :src="getImageUrl(teamAttributes[0].id)" width=40 height=40 align="center">
  </div>
    <Timeline v-if="urlLoaded" class="twitterFeed" v-bind:id="teamAttributes[0].twitterURL" :sourceType="'profile'"/>
      <table id="teamStatsTable" class="content-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Position</th>
            <th>Goals</th>
            <th>Assists</th>

          </tr>
        </thead>
        <tbody v-for="player in players">
          <tr>
            <td>{{player.name}}</td>
            <td>{{player.position}}</td>
            <td>{{player.goals}}</td>
            <td>{{player.assists}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script src="./scripts/team.js"></script>
<style src="./styles/style.css"></style>
