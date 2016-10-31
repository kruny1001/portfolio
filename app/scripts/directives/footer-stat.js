'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:footerStat
 * @description
 * # footerStat
 */
angular.module('statsdsuApp')
  .directive('footerStat', function () {
    return {
      templateUrl: 'views/templates/footer.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.addClass('footerholder');
        TweenLite.to('footer-barbers', 0.6, {yPercent:95});

        element.bind('mouseenter', function() {
          TweenLite.to('footer-barbers', 0.6, {yPercent:0});
        });
        element.bind('mouseleave', function() {
          TweenLite.to('footer-barbers', 0.6, {yPercent:95});
        });
      }
    };
  });