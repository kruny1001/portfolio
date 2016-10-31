'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.courseFactory
 * @description
 * # courseFactory
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('courseFactory', function ($firebaseArray, $firebaseObject) {

    var ref = firebase.database().ref()

    // Public API here
    return {
      listCoures: function (courseType) {
        var refCourse = ref.child(courseType);
        return $firebaseArray(refCourse);
      },
      addNewCourseCnt: function(courseType, cnt){
        var refCourse = ref.child(courseType);
        var courses = $firebaseArray(refCourse);
        courses.$add(cnt)
      },
      deleteCourseCnt: function(courseType, index){
        var refCourse = ref.child(courseType);
        var courses = $firebaseArray(refCourse);
        courses.$remove(courses[index]);
      },
      updateCourseCnt: function (courseType, index, cnt) {
        var refCourse = ref.child(courseType);
        var courses = $firebaseArray(refCourse);
        courses.$save(cnt);
      }
    };
  });
