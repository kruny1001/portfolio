'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.UserFire
 * @description
 * # UserFire
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('UserFire', function ($firebaseArray, $firebaseObject) {
    // Service logic
    // ...
    function UserFire(snap){
      this.userFire_id = snap.key();
      this.userFire = snap.val();

    }
    UserFire.prototype = {
      getObj: function(){
        return $firebaseObject(this);
      },
      update: function(snap){
        if(snap.val() !== this.userFire){
          this.userFire = snap.val();
          return true;
        }
        return false;

      },
      toJSON: function(){
        return this.userFire;
      }
    };
    return UserFire;
  })
  .factory("UserFireFactory", function($firebaseArray, UserFire){
    return $firebaseArray.$extend({
      $$added: function(snap){
        return new UserFire(snap);
      },
      $$updated: function(snap){
        var user = this.$getRecord(snap.key())
        return user.update(snap);
      },
      $$getKey: function(rec){
        //temp1.$$getKey(temp1[0])
        //"9cea924f-3466-45e3-acaf-b41a3307ad49"
        return rec.userFire_id;
      }
    })
  })
  .factory("UserFireList", function(UserFireFactory){
    return function(ref){
      return new UserFireFactory(ref);
    }
  })


