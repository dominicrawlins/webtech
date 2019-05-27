<template>
  <div>
    <div class="center">
      <button v-on:click="switchTable">Toggle Visualisation</button>
      <button  v-on:click="changeShownStats(1)"  v-if="showTable">Add</button>
      <button v-on:click="changeShownStats(-1)"  v-if="showTable"> Remove</button>
    </div>

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
          <td  v-for="(value, propertyName) in teamStat">{{value}}</td>
        </tr>
      </tbody>
    </table>

  </div>
  <div v-if="!showTable">
    <barChart :widths="heights" :maxLength="maxLength" :labels="labels" :teams="teams"/>
  </div>
    </div>
</template>

<script src="./scripts/indiTopStats.js"></script>
<style src="./styles/style.css"></style>
