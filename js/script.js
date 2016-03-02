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
    templateUrl: 'views/login.html',
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


app.controller("loginController", function($scope){
  $scope.signUp = function(){
    var logup_name = $("#signup-name").val();
    var logup_email = $("#signup-email").val();
    var logup_password = $("#signup-password").val();

    var user = new Parse.User();
    user.set("username", logup_name);
    user.set("password", logup_password);
    user.set("email", logup_email);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

});

//Timeslot 3 seconds, call function Slide
setInterval('Slide()',3000);

//Array of the images
var arrayImages = new Array(".img1",".img2",".img3");
 
var count = 0;
 
//Efect fadeIn to show an image
function show(img){
  $(".img").ready(function(){
      $(arrayImages[count]).fadeIn(1500);
  });
}
 
//Efect fadeOut to hide an image
function hide(img){
  $(".img").ready(function(){
      $(arrayImages[count]).fadeOut(1500);
  });
}
 
//Main function
function Slide(){
        //hide the current image
  hide(arrayImages[count]);
        //Increase the count in one
  count = (count + 1) % 3;
        //show the other image
  show(arrayImages[count]);
}