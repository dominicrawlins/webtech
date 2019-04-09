<template>
  <div>
      <table id="teamStatsTable">
        <thead>
          <tr>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody v-for="team in teams">
          <tr>
            <td>{{team.name}}</td>
            <td>{{team.points}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script src="./scripts/index.js"></script>
<style src="./styles/style.css"></style>
