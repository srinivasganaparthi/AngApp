angular.module("myApp").service('globals', function () {
  var globalConstants = {};
  globalConstants['IsLoggedin'] = false;

  return {
    getKeyValue: function (keyName) {
      return globalConstants[keyName];
    },

    setKeyValue: function (keyName, value) {
      globalConstants[keyName] = value;
    }
  };
});