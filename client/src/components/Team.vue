<template>
  <div>
    <router-link :to="{path: '/index'}">
      <h1> Home </h1>
    </router-link>
      <table id="teamStatsTable">
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
