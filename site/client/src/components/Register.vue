<template>
  <div class="center">
    <div class="log-box">
      <h1>
        Register
      </h1>
      <p>Please enter your email address and choose a password to register</p>


        <div class="tickorcross">
          <img src="../assets/tick.png" height="20" v-if="emailChecked && emailCorrect"/>
          <img src="../assets/cross.png" height="18" v-if="emailChecked && !emailCorrect"/>
          </div>
        <input
        type="email"
        name="email"
        v-model="email"
        placeholder="email" @change="checkEmail()" class="inlineRegister"/>


      <br>
      <div class="tickorcross">
        <img src="../assets/tick.png" height="20" v-if="passwordChecked && passwordCorrect"/>
        <img src="../assets/cross.png" height="18" v-if="passwordChecked && !passwordCorrect"/>
        </div>

      <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password" @change="checkPassword()" class="inlineRegister"/>
      <br>
      <p class="inputCheck" v-bind:style="{color: longColour}"> Password must be at least 8 characters long </p>
      <p class="inputCheck" v-bind:style="{color: upperColour}"> Password must contain an uppercase character</p>
      <p class="inputCheck" v-bind:style="{color: numberColour}"> Password must contain a number</p>
      <div class="error" v-html="error" />
      <br>
      <button
      @click="register" v-if="passwordCorrect & emailCorrect">
      Register
    </button>
  </div>
</div>
</template>

<script src="./scripts/register.js"> </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./styles/style.css"></style>
