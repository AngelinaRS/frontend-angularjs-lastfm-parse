// Javascript Code.
var app = angular.module("app", ['ngRoute']);

app.controller('PasswordController', function PasswordController($scope) {
  $scope.title = "This is AngularJS and Jasmin!";
  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
});

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/table.html',
    controller: 'MainController'
  });
});

app.controller("MainController", function($scope, $http){
  $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=da38c0fa01ea26827dd79dcd3457804a&format=json")
    .success(function(data){
      $scope.datatracks = data["tracks"]["track"]; //takes the information from json
    })
    .error(function(err){
      return err;
    });

    $scope.To_Order = "artist.name"; //Variable to order the data
});
