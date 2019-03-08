requirejs(["libs/knockout"], function(ko){
  var myViewModel = {
      players: [
        {playerName: 'Dominic', goals: '40'},
        {playerName: 'Sachin', goals: '0'}
      ]
  };

  ko.applyBindings(myViewModel);

});
