'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.rpcFactory
 * @description
 * # rpcFactory
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('rpcFactory', function ($http) {

    var ref = 42;
    var errMessage = '';
    var codedataResult, crntResult;

    var testR = function(){
      //perform the request
      ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
      var req = ocpu.rpc("hello", {
        myname : 'Kevin'
      }, function(output){
        return output;//console.log(output.message);
      });

      //if R returns an error, alert the error message
      req.fail(function(){
        return req.responseText
      });
    };

    var runCodeR = function(code){
      ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
      return ocpu.rpc("hello", {
        //text: code
        myname : 'Kevin'
      }, function(output){
        var resultUrl = output.loc+'/R/.val';
        $http.get(resultUrl).then(
          function(sucess){crntResult = sucess.data},
          function(err){crntResult = err.data})
        //console.log(output);
        //var d = output.getLoc();
        //console.log(d)
        codedataResult = output.responseText;

        output.getConsole(function(outtxt){
          codedataResult = outtxt;
          //console.log("Console: "+ outtxt);
        })
        output.getObject(function(data){
          //console.log("Object: "+ data);
        })
      });
    }


    // Public API here
    return {
      runCodeR: runCodeR,
      testR : testR
    };
  });
