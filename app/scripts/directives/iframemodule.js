'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:iframeModule
 * @description
 * # iframeModule
 */
angular.module('statsdsuApp')
  .directive('iframeModule', function ($compile, SECArray) {
    return {
      template: '<div></div>',
      scope:{cnt:'=', target:'@', editor:'@', mode:'@'},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.editor = false;
        scope.SEC = SECArray.getElement(scope.target)
        console.log(scope.target, ': ', scope.SEC);
        if(scope.mode != 'edit')
          element.append(scope.cnt.cnt);
        else{
          var inputbox = angular.element('<md-content>' +
              '<md-button ng-click="deleteElement()"> Delete </md-button>' +
            '<md-input-container class="md-block">' +
            '<label>Biography</label>' +
            '<textarea ng-model="SEC.cnt" md-select-on-focus></textarea>' +
            '</md-input-container>' +
            '</md-content>')
          inputbox = $compile(inputbox)(scope);
          element.append(inputbox);
        }

        scope.deleteElement = function(){
          SECArray.removeElement(scope.target)
          element.empty();
          scope.$destroy();
        }
      }
    };
});