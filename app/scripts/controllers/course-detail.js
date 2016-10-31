'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:CourseDetailCtrl
 * @description
 * # CourseDetailCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('CourseDetailCtrl', function ($scope, $routeParams,$location,$firebaseAuth,
                                            Course, Chapter, progressReport, $mdMedia, $firebaseArray
  ) {

    var Auth = $firebaseAuth();
    $scope.xs = $mdMedia('xs');
    $scope.md =  $mdMedia('md');
    $scope.sm =  $mdMedia('sm');
    $scope.lg =  $mdMedia('lg');

    $scope.$watch(function() {
      var check=['xs', 'sm', 'md', 'lg'];
      var target = '';
      check.forEach(function(val){
        if($mdMedia(val)){
          target = val;
        }
      })
      return target;
    }, function(screen){
      if(screen =='xs')
        $scope.titleLength = 25;
      else if(screen =='sm')
        $scope.titleLength = 25;
      else if(screen =='md')
        $scope.titleLength = 25;
      else if(screen =='lg')
        $scope.titleLength = 20;
    });

    var courseId = $routeParams.id;
    $scope.auth = false;
    //$scope.chapterList = Chapter.listByCourseId(courseId);
    //$scope.chapterList.$loaded().then(function(val){
    //  val.forEach(function(chapter, index){
    //    var materials = Chapter.listMaterials(chapter.$id);
    //    materials.$loaded().then(function(data){
    //      $scope.chapterList[index].materials = data;
    //    })
    //  })
    //})

    $scope.courseInfo = Course.getInfo(courseId);
    $scope.courseInfo.$loaded().then(function(data){
      var userAuth = Auth.$getAuth();
      if(userAuth){
        var userRef = firebase.database().ref().child('users').child(userAuth.uid);
        userRef.on('value', function(snapshot) {
          if(snapshot.val().Role === "admin")
            $scope.auth = snapshot.val();
        });

        //console.log($scope.courseInfo.instructor.uid)
        //if(userAuth.uid === $scope.courseInfo.instructor.uid)
        //  $scope.auth = true;
      }

      //console.log(userAuth.Role)
      if(data.chapterList === undefined | data.chapterList === []) {
        var listChapterRef =
          firebase.database().ref().child('chapters')
            .orderByChild('parentCourseId').equalTo(courseId);

        var chapters = $firebaseArray(listChapterRef);
        $scope.courseInfo = Course.getInfo(courseId);
        chapters.$loaded().then(function(chs){
          if(chs.length > 0)
            chs.forEach(function(val){
              $scope.courseInfo.chapterList.push(val.$id)
            })
          $scope.courseInfo.$save();
        })
      }
      $scope.chapterList = Chapter.listByCourseId(data.chapterList);

    })

    $scope.recover = function(){
      //console.log(userAuth.Role)

      if($scope.courseInfo.chapterList === undefined | $scope.courseInfo.chapterList === []) {
        var listChapterRef = firebase.database().ref().child('chapters').orderByChild('parentCourseId').equalTo(courseId);
        var chapters = $firebaseArray(listChapterRef);
        $scope.courseInfo = Course.getInfo(courseId);
        chapters.$loaded().then(function(chs){
          if($scope.courseInfo.chapterList === undefined)
            $scope.courseInfo.chapterList = [];
          if(chs.length > 0)
            chs.forEach(function(val){

              $scope.courseInfo.chapterList.push(val.$id)
            })
          $scope.courseInfo.$save();
        })

      }

    }
    $scope.goToChapter = function(chapterId){
      //href="#/material-list/{{ch.$id}}"
      progressReport.updateSubscriptChpater(chapterId);
      $location.path('material-list/'+chapterId);
    }
    $scope.updateOrder = function(){
      $scope.courseInfo.chapterList = [];
      $scope.chapterList.forEach(function(val, index){
        $scope.courseInfo.chapterList.push(val.$id);
      });
      $scope.courseInfo.$save();
    }
  });
