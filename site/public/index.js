requirejs(["libs/knockout"], function(ko) {
  var myViewModel = {
    detailsEnabled : ko.observable(false),
    enableDetals: function() {
      this.detailsEnabled(true);
    },
    disableDetails: function() {
      this.detailsEnabled(false);
    }
  };
  ko.applyBindings(myViewModel)
});
