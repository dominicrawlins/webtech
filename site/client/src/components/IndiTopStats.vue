<template>
  <div>
    <table id="teamGoalsScoredTable">
      <thead>
        <tr>
          <th v-for="column in namedColumns">{{column}}</th>

        </tr>
      </thead>
      <tbody v-for="teamStat in teamStats">
        <tr>
          <td  v-for="(value, propertyName) in teamStat">{{value}}</td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script src="./scripts/indiTopStats.js"></script>
<style src="./styles/style.css"></style>
