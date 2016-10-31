'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:NewContentCtrl
 * @description
 * # NewContentCtrl
 * Controller of the statsdsuApp
 *
 * Array
 *
 */
angular.module('statsdsuApp')
  .controller('NewContentCtrl', function ($scope, $firebaseObject, $compile, SECArray, SECService, dragulaService, $routeParams, Chapter, storageImageService) {

    //create new
    var ref = firebase.database().ref().child('materials');
    //default blog structure
    $scope.material={parentChapterId:'', parentCourseId:'', parentClassId:'', cnt:[]};

    if($routeParams.chapterId !== undefined){
      var chapterRef = firebase.database().ref().child('chapters').child($routeParams.chapterId);
      $scope.chapterInfo = $firebaseObject(chapterRef);
    }

    var ref = firebase.database().ref().child('materials');
    SECArray.reset();
    SECArray.addCnt(new SECService('editor-text','<h3>Text1</h3><p>Description1</p>','<h1>hello world</h1>'));
    $scope.material.cnt = SECArray.getCnt();
    //Create Material
    $scope.createMaterial = function(){
      //$scope.material={parentChapterId:'', parentCourseId:'', parentClassId:'', cnt:[]};
      $scope.material.parentChapterId = $scope.chapterInfo.$id;
      $scope.material.parentCourseId = $scope.chapterInfo.parentCourseId;
      $scope.material.parentClassId = $scope.chapterInfo.parentClassId;
      //$scope.material.cnt = $scope.cnt;

      var promise = Chapter.addMaterial($scope.material);
      promise.then(
        function(result){alert(result);}
        , function(reason){alert(reason)})
    }

    //Get
    $scope.getIndex = function(index){
      return index
    }

    $scope.check = function(){
      console.log(SECArray.getCnt())
      SECArray.addCnt(new SECService('editor-text','<h3>Text1</h3><p>Description1</p>','<h1>hello world</h1>'));
    }
  });
