'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:profileHeader
 * @description
 * # profileHeader
 * Website header directive
 *
 *
 * Menu should be controlled by the admin level
 *
 */
angular.module('statsdsuApp')
  .directive('profileHeader', function ($firebaseAuth, $location) {
    return {
      templateUrl: 'views/templates/profile/header.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var Auth = $firebaseAuth();
        scope.logout = function() { Auth.$signOut(); };
        scope.menus = [
          {name:"Recent Works", target:"self", dest:"/material/-KR9qDDwpdMOtaWZRBg2"},
          {name:"Timeline", target:"self", dest:"/timelines"},
          {name:"Contact", target:"self", dest:"/contact"},
          {name:"Resume", target:"_blank", dest:"https://firebasestorage.googleapis.com/v0/b/firebase-kev.appspot.com/o/Kevin_Son_RESUME_2016.pdf?alt=media&token=43cd54ee-b129-4db3-b869-9072ff01f582g"},
          //{name:"Software & Data", dest:"/material/-KREpyle5XmJC_m0QFEL"},
          ////{name:"Publication", dest:"/material-list/-KQb5JEEs4S1LAM8EDDT"},
          //{name:"Education", dest:"/material/-KR9yxbTd0z1wX3X8khK"},
          //{name:"Login", dest:"/login"},
          //{name:"Account", dest:"/account"},
          //{name:"Logout", dest:"", action:"logout"}
        ]
        scope.actionMenu = function(target){
          if(target.dest !== "")
            $location.path(target.dest);
          else{
            if(target.action ==="logout")
              scope.logout();
          }
        }
        scope.goTo = function(dest){
          $location.path(dest);
        }
      }
    };
  });
