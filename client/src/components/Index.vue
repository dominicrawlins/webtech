<template>
  <div>
      <table id="teamStatsTable">
        <thead>
          <tr>
            <th>Team</th>
            <th>Games Played</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Losses</th>
            <th>Goals Scored</th>
            <th>Goals Against</th>
            <th>Points</th>

          </tr>
        </thead>
        <tbody v-for="team in teams">
          <tr>
            <router-link :to="{name:'team', params:{team: team.name}}">
              <td>{{team.name}}</td>
            </router-link>
            <td>{{team.gamesPlayed}}</td>
            <td>{{team.wins}}</td>
            <td>{{team.draws}}</td>
            <td>{{team.losses}}</td>
            <td>{{team.goalsFor}}</td>
            <td>{{team.goalsAgainst}}</td>
            <td>{{team.points}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script src="./scripts/index.js"></script>
<style src="./styles/style.css"></style>
