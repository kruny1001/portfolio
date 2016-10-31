'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:CreatecontentCtrl
 * @description
 * # CreatecontentCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('CreatecontentCtrl',
  function ($scope, user, $firebaseObject, $firebaseArray,
    Class, Course, Chapter, $location, $routeParams
  ) {

    $scope.targetClass = null;
    $scope.userInfo = user;
    //$scope.class.instructor = $scope.userInfo.displayName;
    var classes = Class.list();
    classes.$loaded().then(function(data){$scope.classes = data;});
    var courses = Course.list();
    courses.$loaded().then(function(data){$scope.courses = data;});

    //Class
    $scope.createClass = function(){
      //Update User Info
      $scope.class.instructor={uid: user.uid};
      Class.create($scope.class);
    };

    $scope.loadClasses = function() {
      console.log('load classes')
      var classes = Class.list();
      classes.$loaded().then(function(data){
        console.log(data);
        $scope.classes = data;
      });
    };

    $scope.loadClassesForCourse = function() {
      console.log('load classes')
      var classes = Class.list();
      classes.$loaded().then(function(data){
        console.log(data);
        $scope.classesForCourse = data;
      });
    };

    $scope.updateClass= function(){
      var id = $scope.targetClass.$id
      Class.update(id, $scope.targetClass);
    }

    //Course
    $scope.createCourse = function(){
      var parentClassId = $scope.parentClass.$id;
      var parentClassTitle = $scope.parentClass.title;
      $scope.course.instructor={uid: user.uid};
      $scope.course.parentClass = {id:parentClassId, title:parentClassTitle};
      Course.create($scope.course);
    }

    $scope.loadCourses = function(){
      var courseRef = firebase.database().ref().child('courses');
      $scope.courses = $firebaseArray(courseRef);
    }

    //Chapter
      $scope.loadClassesForChapter = function(){
          var classRef = firebase.database().ref().child('classes')
              .orderByChild('title');
          $scope.classesForChapter = $firebaseArray(classRef);
        $scope.classesForChapter.$loaded().then(function(v){
          console.log(v)
        })
        console.log($scope.classesForChapter);
      }

      $scope.loadCourseForChapter = function(targetClassId){
          var courseRef = firebase.database().ref().child('courses')
              .orderByChild('parentClass/id').equalTo(targetClassId);
          $scope.coursesForChapter = $firebaseArray(courseRef);
      }

    $scope.createChapter = function(){
        var parentClassId = $scope.parentClass.$id;
        var parentCourseId = $scope.parentCourse.$id;
        $scope.chapter.parentClassId = parentClassId;
        $scope.chapter.parentCourseId = parentCourseId;
        $scope.chapter.instructor={uid: user.uid};
        Chapter.create($scope.chapter);
    }

    //Material
      $scope.loadChapterForCourser = function(targetCourseId){
          var chapterRef = firebase.database().ref().child('chapters')
              .orderByChild('parentCourseId').equalTo(targetCourseId);
          $scope.chapterForCourse = $firebaseArray(chapterRef);
      }
    $scope.createMaterial = function(){
        $scope.material.parentChapterId = $scope.parentChapter.$id;
        $scope.material.parentCourseId = $scope.parentCourse.$id;
        $scope.material.parentClassId = $scope.parentClass.$id;
        var promise = Chapter.addMaterial($scope.material);
        promise.then(
          function(result){alert(result); $scope.material.title = ""; $scope.material.description="";}
          , function(reason){alert(reason)})
    }

    $scope.openChapter = function(courseId){
      $location.path('course-detail/'+ courseId);
    }

    //Challenge
    $scope.createChallenge = function(){
        $scope.challenge.parentChapterId = $scope.parentCourse.$id;
        $scope.challenge.parentClassId = $scope.parentClass.$id;
        var promise =  Chapter.addChallenge($scope.challenge);
        promise.then(
          function(result){alert(result); $scope.material.title = ""; $scope.material.description="";}
          , function(reason){alert(reason)})
    }

      //Test List Materials
      $scope.listMaterials = Chapter.listMaterials("-K89qh0lojthsPkGiLmU");
  });
