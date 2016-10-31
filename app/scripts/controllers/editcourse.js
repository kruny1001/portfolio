'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:EditcourseCtrl
 * @description
 * # EditcourseCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('EditcourseCtrl', function ($scope, $routeParams,
    $mdDialog, $firebaseObject, $firebaseArray) {

    // The modes
    $scope.modes = ['Scheme', 'XML', 'Javascript', 'R'];
    $scope.mode = 'R';

    $scope.aceOption = {
      mode: $scope.mode.toLowerCase(),
      onLoad: function (_ace) {
        // HACK to have the ace instance in the scope...
        $scope.modeChanged = function () {
          _ace.getSession().setMode('ace/mode/' + $scope.mode.toLowerCase());
        };
      }
    };

    var id = $routeParams.idClass.toString();
    var courseType = $routeParams.sectionId;

    var courseRef = firebase.database().ref().child(courseType+'/'+id);
    $scope.item = $firebaseObject(courseRef)
    //  .$loaded().then(function(data){
    //})

    $scope.updateRecord = function(){
      $scope.item.$save().then(function(ref) {
        ref.key() === ref.$id; // true
      }, function(error) {
        console.log("Error:", error);
      });
    }

    //Remove content item
    $scope.removeContentItem = function(type, index){
      console.log(index)
      var ref = $scope.item.$ref();
      var data = $firebaseArray(ref.child(type));
      data.$loaded().then(function(){
        var item = data[index]
        data.$remove(item).then(function(ref) {
          ref.key() === item.$id; // true
        }).catch(function(error) {
          console.log("Error:", error);
        });
      })
    }

    $scope.openNewItemDialog = function(ev, type, contentId) {
      var dialogTmpl;
      if(type === 'material'){
        dialogTmpl='views/templates/newMaterialDialog.html'
      }
      else if(type === 'challenge'){
        dialogTmpl='views/templates/newChallengeDialog.html'
      }
      $mdDialog.show({
        controller: DialogController,
        templateUrl: dialogTmpl,
        locals: { contentId: $routeParams, cntType: type},
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

  });

function DialogController($scope, $mdDialog, contentId, cntType,
                          FBURL, $firebaseObject, $firebaseArray) {
  var ref = firebase.database().ref()

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  $scope.submit = function(cnt){
    var targetRef = ref.child(contentId.sectionId).child(contentId.idClass).child(cntType);
    var targetContent = $firebaseArray(targetRef)
    targetContent.$loaded().then(function(val){
      console.log(val);

    });
    targetContent.$add(cnt).then($mdDialog.hide());
  }
}
