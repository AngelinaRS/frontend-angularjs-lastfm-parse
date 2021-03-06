// Javascript Code.

Parse.initialize("o738tDIjX7Oq1jSB1PtSG6LfVeZqOgpaKH0pK3dt", "p7JfKdqPlYwWoenFcH1pnxR73YDzNaHAjz6iAwhq");

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
    controller: 'logController'
  });

  $routeProvider.when('/table', {
    templateUrl: 'views/table.html',
    controller: 'MainController'
  });

  $routeProvider.when('/reset_password', {
    templateUrl: 'views/reset_password.html',
    controller: 'ResetPasswordController'
  });
});

app.controller("MainController", function($scope, $http, $window){
  $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=da38c0fa01ea26827dd79dcd3457804a&format=json")
    .success(function(data){
      $scope.datatracks = data["tracks"]["track"]; //takes the information from json
    })
    .error(function(err){
      return err;
    });

    $scope.To_Order = "artist.name"; //Variable to order the data

    $scope.logOut_user = function(){

      Parse.User.logOut();
      $window.location.href = '#/';

  };
});


app.controller("logController", function($scope, $window){
  $scope.signup_user = function(){

    var user = new Parse.User();

    user.set("username", $("#signup-name").val());
    user.set("email", $("#signup-email").val());
    user.set("password", $("#signup-password").val());

    user.signUp(null, {
      success: function(user) {
        $window.location.href = '#/table';
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + " " + error.message);
      }
    });
  };

  $scope.signin_user = function(){
    Parse.User.logIn($("#signin-email").val(), $("#signin-password").val(), {
      success: function(user) {
        $window.location.href = '#/table';
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        alert("Error: " + " " + error.message);
      }
    });
  };
  $scope.forgot_password = function(){
    $window.location.href = '#/reset_password';
  };
});

app.controller("ResetPasswordController", function($scope, $window){

  $scope.password_reset = function(){
    Parse.User.requestPasswordReset($("#send-email").val(), {
      success: function() {
      // Password reset request was sent successfully
        alert("Email sent successfully")
      },
      error: function(error) {
        // Show the error message somewhere
        alert("Error: " + " " + error.message);
      }
    });
  };

  $scope.exit = function(){
    $window.location.href = '#/';
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
  //$(".point-0").addClass("point-transparent ");
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


//Timeslot 3 seconds, call function PointSlide
setInterval('PointSlide()',3000);

//Array of Points
var arrayPoints = new Array(".point-0",".point-1",".point-2");

var count_points = 0;
 
//Background transparent
function transparent_point(point){
  $(".point").ready(function(){
      $(arrayPoints[count_points]).addClass("point-transparent");
  });
}

//Background white
function white_point(point){
  $(".point").ready(function(){
      $(arrayPoints[count_points]).removeClass("point-transparent");
  });
}

//Main function
function PointSlide(){
  white_point(arrayPoints[count_points]);
        //Increase the count in one
  count_points = (count_points + 1) % 3;

  transparent_point(arrayPoints[count_points]);
}
