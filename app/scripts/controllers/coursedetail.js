'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:CoursedetailCtrl
 * @description
 * # CoursedetailCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('CoursedetailCtrl', function ($scope, $routeParams, $compile, intro) {

    //typedjs
    //$(function(){
    //  $(".element").typed({
    //    strings: ["First sentence.", "Second sentence."],
    //    typeSpeed: 0,
    //    showCursor: true,
    //  });
    //});

    $scope.crntTopic;

    if($routeParams.className =='r-intro'){
      //intro.course.$loaded().then(function(snap){
      //  $scope.course = snap;
      //});
      $scope.course = intro.course();
    }
    else if($routeParams.className == 'r-vis'){
      $scope.course = intro.courseVis();
    }

    $scope.startTopic = function(index){
      $scope.crntTopic = $scope.course[index];
      console.log('start '+ index);
      var tl = new TimelineMax();
      var hidingList = TweenMax.staggerTo("md-list-item", 0.5, {opacity:0, display:'none', y:-100, ease:Back.easeIn}, 0.1, appendDirective);
      tl.add(hidingList)//.to('course-cnt md-content', 0.5, {opacity:1});
    }

    var appendDirective = function(){
      var courseCnt = angular.element(document.createElement('course-cnt'));
      courseCnt.attr('target','crntTopic');
      courseCnt.attr('name','course.topic');
      //courseCnt.attr('type','crntTopic');
      var el = $compile( courseCnt )( $scope );
      //wher e do you want to place the new element?
      angular.element('md-content').append(courseCnt);
      $scope.insertHere = el;
    }

    $scope.listMenu = function(){
      var tl = new TimelineMax();
      var listing = TweenMax.staggerTo("md-list-item", 0.5, {opacity:1, display:'block', y:-0, ease:Back.easeIn}, 0.1);
      tl.to('course-cnt md-content', 0.5, {opacity:0}).add(listing);
      console.log($scope.insertHere);
      $scope.insertHere.remove();
    }
  });
