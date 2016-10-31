'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.progressReport
 * @description
 * # progressReport
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('progressReport',
  function ($firebaseArray, $firebaseObject, $firebaseAuth) {
    var Auth = $firebaseAuth();
    var userAuth = Auth.$getAuth();
    var ref = firebase.database().ref();
    //console.log(userAuth);
    if(userAuth !== null)
      var progressRef = ref.child('progress').child(userAuth.uid);

    // Public API here
    return {
      getSubscribeList: function (courseType) {
        var refCourse = ref.child(courseType);
        return $firebaseArray(refCourse);
      },
      setSubscribes: function(courseType, cnt){
        var refCourse = ref.child(courseType);
        var courses = $firebaseArray(refCourse);
        courses.$add(cnt)
      },
      getProgress: function(courseType, index){
        var refCourse = ref.child(courseType);
        var courses = $firebaseArray(refCourse);
        courses.$remove(courses[index]);
      },
      updateProgress: function (courseType, index, cnt) {
        var refCourse = ref.child(courseType);
        var courses = $firebaseArray(refCourse);
        courses.$save(cnt);
      },
      updateSubscriptChpater: function(chapterId){
        //get Chapter Name
        var chapterRef = firebase.database().ref().child('chapters/'+chapterId);
        var chapterObj = $firebaseObject(chapterRef);
        console.log(chapterObj);
        //progressRef.child('').child('')
        var classObj = 0;
        var courseObj = 0;
      }
    };
  });
