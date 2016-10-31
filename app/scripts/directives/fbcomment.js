'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:fbComment
 * @description
 * # fbComment
 */
angular.module('statsdsuApp')
  .directive('fbComment', function () {
    function createHTML(href, numposts, colorscheme) {
      return '<div class="fb-comments" ' +
        'data-href="' + href + '" ' +
        'data-numposts="' + numposts + '" ' +
        'data-colorsheme="' + colorscheme + '">' +
        '</div>';
    }

    return {
      restrict: 'A',
      scope: {},
      link: function postLink(scope, elem, attrs) {
        attrs.$observe('pageHref', function (newValue) {
          var href        = newValue;
          var numposts    = attrs.numposts    || 5;
          var colorscheme = attrs.colorscheme || 'light';

          elem.html(createHTML(href, numposts, colorscheme));
          FB.XFBML.parse(elem[0]);
        });
      }
    };
  }).directive('fbLike', function () {
    return {
      restrict:'E',
      template: '<div class="fb-like" data-href="{{page}}" data-colorscheme="light" data-layout="box_count" data-action="like" data-show-faces="true" data-send="false"></div>'
    }
  });;