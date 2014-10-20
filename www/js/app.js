// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller('MainCtrl', function ( messageEndpoint ) {
  var $scope = this;

  $scope.messages = [];

  $scope.sendMessage = function (newMessageText) {
    var newMessage = { author: 'Lukas', text: newMessageText };
    $scope.messages.push( newMessage );
    messageEndpoint.send( newMessage );
  }
})

.factory('messageEndpoint', function ( $http ) {
    var endpointUrl = 'http://localhost:8080/whatsup-rs/rest/messages';
    return {
      'get': function( id ) {
        return $http.get({
          url: endpointUrl + '/' + id
        });
      },
      'send': function( message ) {
        return $http.post( endpointUrl, message, {
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json'
          }
        }, message);
      }
    };
})

