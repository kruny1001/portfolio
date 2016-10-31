'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('CourseCtrl', function ($scope, $http, rpcFactory) {
    $scope.crntResult = "Result: ";

    TweenMax.set('.course-float', {display:'block'})
    TweenMax.from('.course-float', 1, {xPercent: '-100'});

    $scope.crntIndex = 0;

    $scope.contents = [
      {title: 'Mean(Average)', desc: 'The mean is a mesure of central tendency of the distribution.',
        nextDesc:'As you can see Array X of average is 3.8181. You can change the element of array from eidtor.',
        preDesc: '\\( \\bar{x} = \\frac{1}{n}\\sum\\limits_{i=1}^n x_i \\)', source:[{code:'x=c(1,2,3,4,2,3,1,2,5,9,10)\nmean(x)'}]},
      {title: 'Median', desc: 'The median is half of observations are greater than and half are smaller than that value when the data is sorted in ascending order',
        preDesc: '\\(  \\)', source:[{code:'x=c(1,2,3,4,2,3,1,2,5,9,10)\nmedian(x)'}]},
      {title: 'Variance', desc: '', preDesc: '\\(  s^2 = \\frac{1}{n-1}\\sum\\limits_{i=1}^n (x_i - \\bar{x})^2 \\)'},
      {title: 'Standard Deviation', desc: '',
        preDesc: '\\(  s =\\sqrt{ \\frac{1}{n-1}\\sum\\limits_{i=1}^n (x_i - \\bar{x})^2 } \\)', source:[{code:'x=c(1,2,3,4,2,3,1,2,5,9,10)\nsd(x)'}] },
      {title: 'Quartiles', desc: '', preDesc: '', source:[{code:'x=c(1,2,3,4,2,3,1,2,5,9,10)\nquantile(x,0.25)'}, {code:'x=c(1,2,3,4,2,3,1,2,5,9,10)\nquantile(x,0.75)'}]}
    ]


    $scope.assignContent = function(index){
      return $scope.contents[index];
    }

    $scope.prevContent = function(){
      $scope.crntIndex --;
      $scope.crntResult = "Result: ";
      if($scope.contents[$scope.crntIndex]){
        $scope.crntContent = $scope.assignContent($scope.crntIndex);
        TweenMax.set('.course-float', {display:'none'});
        TweenMax.set('.course-float', {display:'block'})
        TweenMax.from('.course-float', 1, {xPercent: '+100'});
      }
      else
        alert('Start');
    }

    $scope.nextContent = function(){
      $scope.crntIndex ++;
      $scope.crntResult = "Result: ";

      if($scope.contents[$scope.crntIndex]){
        $scope.crntContent = $scope.assignContent($scope.crntIndex);
        TweenMax.set('.course-float', {display:'none'});
        TweenMax.set('.course-float', {display:'block'})
        TweenMax.from('.course-float', 1, {xPercent: '-100'});
      }
      else
        alert('End');
    }

    $scope.runCodeR = function(code){
      ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");

      ocpu.call("runSrc", {
        text: code
      }, function(output){
        //TweenMax.set('.after-run-code',0.5,{display:'block', opacity:0});
        //TweenMax.to('.after-run-code',0.5,{opacity:1})
        //TweenMax.to('.after-run-code', 0.5, {display:'none'}, 5)
        var resultUrl = output.loc+'/R/.val';
        $http.get(resultUrl).then(function(sucess){$scope.crntResult = sucess.data}, function(err){$scope.crntResult = err.data})
        console.log(output);
        var d = output.getLoc();
        console.log(d)
        $scope.codedataResult = output.responseText;

        output.getConsole(function(outtxt){
          $scope.codedataResult = outtxt;
          $scope.$digest();
          console.log("Console: "+ outtxt);
        })
        output.getObject(function(data){
          console.log("Object: "+ data);
        })
      }).fail(function(text){

      });
    }

    //start
    $scope.crntContent = $scope.assignContent($scope.crntIndex);

    $scope.code ='x=c(1,2,3,4,2,3,1,2,5,9,10)\nmedian(x)';
    $scope.test = function(code){
      var result = rpcFactory.testR();

    }
  });
