'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:seBlogRead
 * @description
 * # seBlogRead
 */
angular.module('statsdsuApp')
  .directive('seBlogRead', function ($sce,  $firebaseAuth, $routeParams, $location, $firebaseObject, $firebaseArray) {
    return {
      transclude: true,
      templateUrl: 'views/templates/seBlog/seBlogRead.html',
      scope:{
        'user': '@onUser'
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var Auth = $firebaseAuth();
        scope.authData = Auth.$getAuth();
        //console.log($routeParams.id);
        scope.editable = false;
        var id = $routeParams.id
        var postRef = firebase.database().ref().child('blogCnt/'+ id);
        scope.post = $firebaseObject(postRef);
        //scope.post.$loaded().then(function(val){
        //
        //  if(val.auth == user.uid)
        //    scope.editable = true;
        //  scope.post.cnt = $sce.trustAsHtml(val.cnt);
        //})

        scope.editPage = function(){
          $location.path('edit/'+scope.post.$id);
        }

        var cmtRef = firebase.database().ref().child('comments/'+$routeParams.id);
        var cmts = $firebaseArray(cmtRef);
        cmts.$loaded().then(function(data){
          console.log(data)
          scope.cmts = data;
        })

      }
    };
  });