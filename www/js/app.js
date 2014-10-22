// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function ($ionicPlatform, messageList, $rootScope, messageEndpoint) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    function onNotification(event) {
      var version = event.version || event.payload.version || event.payload[0].Value;
      messageEndpoint.get( version )
        .then( function(response) {
          messageList.messages.push(response.data);
        } )
        .catch(function (e) {
          errorHandler(e);
        })

    }

    function successHandler() {
      alert("Subscribed");
    }

    function errorHandler(e) {
      alert("Error: " + e);
    }

    if (typeof push !== 'undefined') {
      alert('initiating');
      push.register(onNotification, successHandler, errorHandler);
    } else {
      alert('Push plugin not installed!');
    }
  });
})

.factory('messageList', function() {
  return {
    messages: []
  }
})


.controller('MainCtrl', function ( messageEndpoint, messageList ) {
  var $scope = this;

  $scope.messages = messageList.messages;

  $scope.sendMessage = function (newMessageText) {
    var newMessage = { author: 'Lukas', text: newMessageText };
    messageList.messages.push( newMessage );
    messageEndpoint.send( newMessage );
  }
})

.factory('messageEndpoint', function ( $http ) {
    var endpointUrl = 'http://192.168.15.104:8080/whatsup-rs/rest/messages';
    return {
      'get': function( id ) {
        return $http.get( endpointUrl + '/' + id );
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

