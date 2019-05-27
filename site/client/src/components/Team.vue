<template>
  <div>
    <div>
    <div v-if="urlLoaded"  style="padding bottom 20px;">
    <h1>{{teamAttributes[0].name}}</h1>
    </div>
    <img :src="getImageUrl(teamAttributes[0].id)" width=200 height=200 align="center" v-if="urlLoaded">
    <br />
  </div>
  <br />
  <br />
  <div>
    <Timeline v-if="urlLoaded" class="twitterFeed" v-bind:id="teamAttributes[0].twitterURL" :sourceType="'profile'"/>
      <table id="teamStatsTable" class="content-table left" :style="{'background-color': teamAttributes[0].primaryColours}" v-if="urlLoaded">
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
    <div class="center">
    <div class="content-table">
      <h3>Goals Scored</h3>
        <barChart :widths="widths" :maxLength="maxLength" :labels="labels" v-if="urlLoaded"/>
      </div>
      <br />
      <br />
      <div class="content-table">
        <h3>Assists Made</h3>
        <barChart :widths="widths" :maxLength="maxLength" :labels="labels" v-if="urlLoaded"/>
      </div>
    </div>
    </div>
</template>

<script src="./scripts/team.js"></script>
<style src="./styles/style.css"></style>
