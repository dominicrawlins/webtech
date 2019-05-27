<template>
  <div>
    <h1>Team Statistics</h1>
    <h3>The following tables rank teams in order for various statistics</h3>
    <div>
      <div >
        <h4>Goals Conceded:</h4>
        <indiTopStats :stat= "stat" :columns="columns":order="order" :table="table"></indiTopStats>
      </div>
      <div>
        <h4>Wins:</h4>
        <indiTopStats :stat= "secondstat" :columns="secondcolumns":order="secondorder" :table="table"></indiTopStats>
      </div>
    </div>
    </div>
</template>

<script src="./scripts/topTeamStats.js"></script>
<style src="./styles/style.css"></style>
