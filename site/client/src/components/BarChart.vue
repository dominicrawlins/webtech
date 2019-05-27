<template>
  <div>
    <transition name="grow">
      <div class="inlineBar" v-if="show">
        <dl v-for="(pixelWidth, index) in pixelWidths">
          <div class="barText">{{labels[index]}} </div>
          <dd id="bar" v-bind:style="{width: pixelWidth, 'background-color': colourDictionary[teams[index]]}">
            <div class="barLabel"> {{widths[index]}} </div>
            <dd/>
        </dl>
      </div>
    </transition>
  </div>
</template>

<script src="./scripts/barChart.js"></script>
<style src="./styles/style.css"></style>
