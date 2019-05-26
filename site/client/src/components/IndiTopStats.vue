<template>
  <div>
    <button v-on:click="switchTable" class="switchButton">Toggle Visualisation</button>
    <button  v-on:click="changeShownStats(5)"  v-if="table">Add Teams</button>
    <button v-on:click="changeShownStats(-5)"  v-if="table"> Remove Teams</button>
    <br>
    <div v-if="showTable">
    <table id="teamGoalsScoredTable" align="center" class="content-table fixedTable">
      <thead>
        <tr>
          <th v-for="column in namedColumnsShort">{{column}}</th>
        </tr>
      </thead>

      <tbody v-for="teamStat in teamStatsShort">
        <tr>
          <td  v-for="(value, propertyName) in thisStat">{{value}}</td>
        </tr>
      </tbody>
    </table>

  </div>
  <div v-if="!showTable">
    <barChart :widths="heights" :maxLength="maxLength" :labels="labels" />
  </div>
    </div>
</template>

<script src="./scripts/indiTopStats.js"></script>
<style src="./styles/style.css"></style>
