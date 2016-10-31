'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:EditContentCtrl
 * @description
 * # EditContentCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('EditContentCtrl', function ($scope, $window, $compile, $routeParams, $firebaseObject, SECArray, dragulaService) {
    //Get SEC object
    SECArray.reset()
    $scope.docId = $routeParams.id
    $scope.cnt = SECArray.readContentFromFirebase($routeParams.id)
    $scope.cnt.$loaded(function(){
      $scope.contestFromSECs = SECArray.getCnt();
      console.log("editContentCtrl: ",$scope.contestFromSECs)
      SECArray.addUID();
      bindHtml($scope.contestFromSECs)
    })

    dragulaService.options($scope, 'test-bag', {
      drop: function (el, source, handle, sibling) {
        return true; // elements are always draggable by default
      },
      removeOnSpill: true
    });

    function bindHtml(cnt) {
      //target Content HTML
      var content = angular.element('.content')
      cnt.forEach(function(val, index){
        if(val.type === 'editor-text'){
          var container = angular.element(document.createElement('md-content'))
          container.attr('dragular','test-bag');
          container.attr('dragula-model','val');
          var courseCnt = angular.element(document.createElement('editor-text-view'));
          courseCnt.attr('cnt', 'cnt.cnt['+index+']');
          courseCnt.attr('mode', 'edit');
          courseCnt.attr('index', index);
          container.append(courseCnt)
          content.append(container)
            //"<editor-text-view ng-cloack mode='edit' target='val' index='"+index+"'></editor-text-view></md-content>")
        } else if(val.type ==='iframe-module'){
          var container = angular.element(document.createElement('md-content'))
          container.attr('dragular','test-bag');
          container.attr('dragula-model','val');
          var courseCnt = angular.element(document.createElement('iframe-module'));
          courseCnt.attr('mode', 'edit');
          courseCnt.attr('target', index);
          container.append(courseCnt)
          content.append(container)
        }
        else if(val.type ==='graph'){
          content.append("<md-content dragula='test-bag'><birds></birds></md-content>")
        } else if(val.type === 'code-terminal'){
          content.append("<md-content dragula='test-bag'><code-terminal></code-terminal></md-content>")
        } else if(val.type === 'slide-course'){
          content.append("<md-content dragula='test-bag'><slide-course></slide-course></md-content>")
        }
        else if(val.type === 'r-code-exe'){
          var container = angular.element(document.createElement('md-content'))
          container.attr('dragular','test-bag');
          container.attr('dragula-model','val');
          var courseCnt = angular.element(document.createElement('r-code-exe'));
          courseCnt.attr('cnt', 'cnt.cnt['+index+']');
          courseCnt.attr('mode', 'edit');
          courseCnt.attr('index', index);
          container.append(courseCnt)
          content.append(container)
        }
        else if(val.type === 'challenge'){
          var container = angular.element(document.createElement('md-content'))
          var courseCnt = angular.element(document.createElement('challenge'));
          courseCnt.attr('cnt', 'cnt.cnt['+index+']');
          courseCnt.attr('dragula-model','val');
          courseCnt.attr('mode', 'edit');
          courseCnt.attr('index', index);
          container.attr('dragular','test-bag');
          container.append(courseCnt)
          content.append(container)
        }
        else{
          //content.append("<md-content dragula='test-bag'>Wrong Content </md-content>")
        }
      })
      $compile(content)($scope);
    }

    //Create Material
    $scope.updateMaterial = function(){
      //console.log($scope.cnt.cnt)
      $scope.cnt.cnt = SECArray.getCnt();
      console.log($scope.cnt.cnt)
      $scope.cnt.$save();
      $window.history.back();
    }
  });