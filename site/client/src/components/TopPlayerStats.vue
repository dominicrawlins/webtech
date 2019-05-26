<template>
  <div>
    <p>This is where the top player stats will go.</p>
    <indiTopStats :stat= "stat" :columns="columns":order="order" :table="table"></indiTopStats>
    <indiTopStats :stat= "secondstat" :columns="secondcolumns":order="secondorder" :table="table"></indiTopStats>
    </div>
</template>

<script src="./scripts/topPlayerStats.js"></script>
<style src="./styles/style.css"></style>
