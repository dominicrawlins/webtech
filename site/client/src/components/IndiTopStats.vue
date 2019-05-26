<template>
  <div>
    <button v-on:click="switchTable" class="switchButton">Visualize</button>
    <br>
    <div v-if="showTable">

    <table id="teamGoalsScoredTable">
      <thead>
        <tr>
          <th v-for="column in namedColumns">{{column}}</th>

        </tr>
      </thead>
      <tbody v-for="thisStat in allStats">
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
