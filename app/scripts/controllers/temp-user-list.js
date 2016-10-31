'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:TempUserListCtrl
 * @description
 * # TempUserListCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('TempUserListCtrl', function ($scope, $filter, $firebaseArray) {
    var usersRef = firebase.database().ref().child('newUsers');
    var query = usersRef.orderByChild('createAt');
    $scope.users = $firebaseArray(query);




    $scope.users.$loaded().then(function(val){
      var header ="name,phone,email,school,grade,date,gender,age,ethnicity\n";
      var reseult = header;
      val.forEach(function(data){

        var phone = $filter('phoneFilter')(data.phone);
        var gender = $filter('genderFilter')(data.gender);
        var ethnicity = $filter('ethinicityFilter')(data.ethnicity);
        var createAt = $filter("date")(data.createAt, 'short');
        reseult += data.fName+' '+data.lName+","+phone+","+data.userEmail+","+data.school+","+data.grade+","+
            createAt+","+gender+","+data.age+","+ethnicity+'\n';
      })
      console.log(reseult);
      console.table($scope.users, ["fName", "lName", "school", "phone", "userEmail"])
    })

  });
