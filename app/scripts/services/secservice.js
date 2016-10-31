'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.SECService
 * @description
 * # SECService
 * Factory in the statsdsuApp.
 */

angular.module('statsdsuApp')
  .factory('SECArray', function($firebaseObject){
    var content = {cnt:[]};
    var cnts = [];
    var readContent = function(contents){
      var cnts = [];
      cnts = contents;
    }
    var addCnt = function(obj){
      //var index = cnts.push(obj)
      var index = content.cnt.push(obj)
      return index-1;
    }

    var updateCnt = function(arr){
      content.cnt = arr;
    }

    var getCnt = function(){
      if(content.cnt === undefined )
        content.cnt = [];
      return content.cnt;
    }

    var getElement = function(index){
      return content.cnt[index];
    }

    var removeElement = function(uid){
      var index = _.findIndex(content.cnt, function(o) { return o.uid == uid; });
      console.log("remove: "+index)
      content.cnt.splice(index, 1);
    }

    var reset = function(){
      content.cnt = [];
    }

    var readContentFromFirebase = function(materialId){
      var ref = firebase.database().ref().child('materials').child(materialId);
      content = $firebaseObject(ref);
      content.$loaded().then(function(){
        cnts = content.cnt;
      })
      return content;
    }

    var addUID = function(){
      content.cnt.forEach(function(val){
        val.uid = _guid();
      })
    }

    function _guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    return {
      addCnt: addCnt,
      addUID: addUID,
      updateCnt: updateCnt,
      readContentreadContent: readContent,
      getCnt: getCnt,
      getElement: getElement,
      removeElement:removeElement,
      reset: reset,
      readContentFromFirebase: readContentFromFirebase
    };
  })
  .factory('RCodeExeService', function(){
    function RCodeExeService(type, cntObj){
      this.type= type;
      this.code = cntObj.code;
      this.title= cntObj.title;
      this.desc= cntObj.desc;
    }

    RCodeExeService.prototype.getCode = function(){
      return this.code;
    }

    var posssibleRoles = ['admin', 'editor', 'guest'];
    function checkRole(role){
      return posssibleRoles.indexOf(rolw) !== -1;
    }
    RCodeExeService.build = function(data){
      if(!checkRole(data.role)){ return;}
      return new RCodeExeService(data.type, data.body, data.cnt);
    }

    return RCodeExeService;
  })
  .factory('SECService', function () {
    function SECService(type, cnt, body){
      this.type= type;
      this.cnt = cnt;
      this.body = body;
    }

    SECService.prototype.getCnt = function(){
      return this.cnt;
    }

    var posssibleRoles = ['admin', 'editor', 'guest'];
    function checkRole(role){
      return posssibleRoles.indexOf(rolw) !== -1;
    }
    SECService.build = function(data){
      if(!checkRole(data.role)){ return;}
      return new SECService(data.type, data.body, data.cnt);
    }

    return SECService;
  });