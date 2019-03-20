requirejs(["libs/knockout", "libs/vue.min.js"], function(ko, Vue){
  var table = new Vue({
    el: '#playerStatsTable',
    data: {
      players: [
        {
          name: 'Dominic',
          goals: 100,
        },
        {
          name: 'Sachin',
          goals: 0,
        }
      ]
    }
  })
});
