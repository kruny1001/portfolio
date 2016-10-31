'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:SuperBlogDetailCtrl
 * @description
 * # SuperBlogDetailCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('SuperBlogDetailCtrl', function ($scope, $compile, $routeParams, $firebaseObject, SECArray, SECService) {
    var ref = firebase.database().ref().child('materials-test').child($routeParams.id);
    var cnt = $firebaseObject(ref);
    var SEAs  = SECArray;
    SEAs.reset()
    cnt.$loaded().then(function(val){
      val.forEach(function(element){
        //console.log(element)
        //var SEA = new SECService(element.type,element.cnt,element.body);
        SECArray.addCnt(element);
      })
      bindHtml();
    })
    function bindHtml() {
      //target Content HTML
      var content = angular.element('.content')
      cnt.forEach(function(val, index){
        if(val.type === 'editor-text'){
          console.log(index);
          content.append("<md-content><editor-text-view mode='read' target='"+index+"'></editor-text-view></md-content>")
        } else if(val.type ==='graph'){
          content.append("<md-content><birds></birds></md-content>")
        } else if(val.type === 'code-terminal'){
          content.append('<md-content><code-terminal></code-terminal></md-content>')
        } else if(val.type === 'slide-course'){
          content.append('<md-content><slide-course></slide-course></md-content>')
        }
        else if(val.type === 'r-code-exe'){
          console.log(index);
          var courseCnt = angular.element(document.createElement('r-code-exe'));
          courseCnt.attr('target',index);
          content.append(courseCnt)
        }
      })
      $compile(content)($scope);
    }


  });
