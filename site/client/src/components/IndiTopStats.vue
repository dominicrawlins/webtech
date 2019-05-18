<template>
  <div>
    <table id="teamGoalsScoredTable">
      <thead>
        <tr>
          <th>Team</th>
          <th>Goals Scored</th>

        </tr>
      </thead>
      <tbody v-for="teamStat in teamStats">
        <tr>
          <td>{{teamStat.name}}</td>
          <td>{{teamStat.goalsFor}}</td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script src="./scripts/indiTopStats.js"></script>
<style src="./styles/style.css"></style>
