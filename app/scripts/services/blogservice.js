'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.blogService
 * @description
 * # blogService
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('blogService', function ($location, $firebaseObject, $firebaseArray) {

    var ref = firebase.database().ref()
    var blogCntRef = ref.child('blogCnt');
    var commentsRef = ref.child('comments');
    var blogRef = ref.child('write');

    // Public API here
    return {
      deleteItem: deleteItem,
      newItem: newItem,
      updateItem : updateItem
    };

    function redirection(id){
      console.log(id);
      $location.path('/read/'+id);
    }

    function newItem(blogItemInfo, blogItemCnt){
      //create write object
      var newBlogInfo = blogRef.push();
      newBlogInfo.set(blogItemInfo, function(err){
        if(err){
          console.log('add info: '+ err);
        }
        else{
          blogCntRef.child(newBlogInfo.key()).set(blogItemCnt, function(err){
            if(err){
              console.log('add Content: '+err);
            }
            else{
              redirection(newBlogInfo.key());
            }
          });
        }
      });
    }

    function updateItem(id, blogItemCnt){
      blogCntRef.child(id).update(blogItemCnt);
      $location.path('/read/'+id);
    }

    function deleteItem(id) {
      blogCntRef.child(id).remove();
      commentsRef.child(id).remove();
      blogRef.child(id).remove();
      $location.path('/');
    }
  });
