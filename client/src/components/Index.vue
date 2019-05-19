<template>
  <div>
    <div class="right">
      <p>Welcome to the Premier League Stats Page!</p>
    </div>
      <table id="teamStatsTable" class="tab_format">
        <thead>
          <tr>
            <th class="tab_format">Team</th>
            <th class="tab_format">Games Played</th>
            <th class="tab_format">Wins</th>
            <th class="tab_format">Draws</th>
            <th class="tab_format">Losses</th>
            <th class="tab_format">Goals Scored</th>
            <th class="tab_format">Goals Against</th>
            <th class="tab_format">Points</th>

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
