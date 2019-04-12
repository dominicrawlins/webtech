
<template>

<!--<ul class="homemadeToolbarHorizontal">
  <router-link :to="{path: '/index'}">
    <li class="homemadeToolbarHorizontalOption">
      Home
    </li>
  </router-link>
  <div class = "homemadeToolbarDropdown">
  <li class = "homemadeToolbarHorizontalOption">
    Teams
    <div class="homemadeToolbarDropdownContent">
      <ul class = "homemadeToolbarVertical">
        <li class="homemadeToolbarVerticalOption">
          Boom
        </li>
        <li class="homemadeToolbarVerticalOption">
          Hello
        </li>
      </ul>
    </div>
  </li>
</div>

</ul>
-->

<div class="navbar">
    <router-link :to="{path: '/index'}">
  <li class="toolbarItem">Home</li>
</router-link>
  <div class="dropdown">
    <button class="dropbtn">Teams
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <li class="dropdownItem">Arsenal</li>
      <li class="dropdownItem">Chelsea</li>
    </div>
  </div>
</div>


</template>
<script src="./scripts/toolbar.js"/>
<style src="./styles/style.css"/>
