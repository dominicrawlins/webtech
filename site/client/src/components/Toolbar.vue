
<template>

<div class="navbar">
    <router-link :to="{path: '/index'}">
  <li class="toolbarItem">Home</li>
</router-link>
<li class="toolbarItem">
  <div class="dropdown">
    <button class="dropbtn">Teams
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <div class="row">
      <div class="column">
      <router-link :to="{path: '/team/arsenal'}">
        <li class="dropdownItem">Arsenal</li>
      </router-link>
      <router-link :to="{path: '/team/bournemouth'}">
        <li class="dropdownItem">Bournemouth</li>
      </router-link>
      <router-link :to="{path: '/team/brighton'}">
        <li class="dropdownItem">Brighton</li>
      </router-link>
      <router-link :to="{path: '/team/burnley'}">
        <li class="dropdownItem">Burnley</li>
      </router-link>
      <router-link :to="{path: '/team/cardiffcity'}">
        <li class="dropdownItem">Cardiff City</li>
      </router-link>
      <router-link :to="{path: '/team/chelsea'}">
        <li class="dropdownItem">Chelsea</li>
      </router-link>
      <router-link :to="{path: '/team/crystalpalace'}">
        <li class="dropdownItem">Crystal Palace</li>
      </router-link>
      <router-link :to="{path: '/team/everton'}">
        <li class="dropdownItem">Everton</li>
      </router-link>
      <router-link :to="{path: '/team/fulham'}">
        <li class="dropdownItem">Fulham</li>
      </router-link>
    </div>
    <div class="column">
      <router-link :to="{path: '/team/huddersfield'}">
        <li class="dropdownItem">Huddersfield</li>
      </router-link>
      <router-link :to="{path: '/team/leicestercity'}">
        <li class="dropdownItem">Leicester</li>
      </router-link>
      <router-link :to="{path: '/team/liverpool'}">
        <li class="dropdownItem">Liverpool</li>
      </router-link>
      <router-link :to="{path: '/team/manchestercity'}">
        <li class="dropdownItem">Man City</li>
      </router-link>
      <router-link :to="{path: '/team/manchesterutd'}">
        <li class="dropdownItem">Man Utd</li>
        </router-link>
        <router-link :to="{path: '/team/newcastleutd'}">
          <li class="dropdownItem">Newcastle</li>
        </router-link>
        <router-link :to="{path: '/team/southampton'}">
          <li class="dropdownItem">Southampton</li>
        </router-link>
        <router-link :to="{path: '/team/tottenham'}">
          <li class="dropdownItem">Tottenham</li>
        </router-link>
        <router-link :to="{path: '/team/watford'}">
          <li class="dropdownItem">Watford</li>
        </router-link>
        <router-link :to="{path: '/team/westhamutd'}">
          <li class="dropdownItem">West Ham</li>
        </router-link>
        <router-link :to="{path: '/team/wolverhampton'}">
          <li class="dropdownItem">Wolves</li>
        </router-link>
    </div>
  </div>

  </div>
  </div>

</li>
<router-link :to="{path: '/stats/teams'}">
<li class="toolbarItem">Team Stats</li>
</router-link>
<router-link :to="{path: '/register'}">
  <li class="toolbarItem" v-if="!$store.state.isUserLoggedIn">Register</li>
</router-link>
<router-link :to="{path: '/login'}">
  <li class="toolbarItem" v-if="!$store.state.isUserLoggedIn">Log In</li>
  </router-link>
  <router-link @click.native="logout" to="/logout">
<li class="toolbarItem" v-if="$store.state.isUserLoggedIn">Log Out</li>
</router-link>
</div>


</template>
<script src="./scripts/toolbar.js"/>
<style src="./styles/style.css"/>
