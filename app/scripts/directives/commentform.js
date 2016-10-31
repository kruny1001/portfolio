'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:commentForm
 * @description
 * # commentForm
 * comment-form
 */
angular.module('statsdsuApp')
  .directive('commentForm', function () {
    return {
      template: '<form name="projectForm" ng-submit="commentPush()">'+
      '<md-input-container flex>'+
      '<label>Write Comment</label>'+
      '<textarea required name="newComment" ng-model="newComment" columns="1" md-maxlength="150"></textarea>'+
      '<div ng-messages="projectForm.newComment.$error">'+
      '<div ng-message="md-maxlength">No more than 150 chars</div>'+
      '</div>'+
      '</md-input-container>'+
      '<md-button class="md-raised md-warn" type="submit">Add Comment</md-button>'+
      '</form>',
      restrict: 'E',
      scope:{
        'target': '@onTarget',
        'recipe': '@onRecipe'
      },
      controller: commentFormCtrl,
      link: function postLink(scope, element, attrs) {
      }
    };
  });

function commentFormCtrl($scope,notification, activityScore,$firebaseAuth, $firebaseArray, FirebaseRefFactory, $firebaseObject){

  var Auth = $firebaseAuth();
  FirebaseRefFactory.setRef('comments');
  var authData = Auth.$getAuth();
  var commentRef= FirebaseRefFactory.getRef();
  var list = $firebaseArray(commentRef);
  list.$loaded(function(data){
//      console.log(data)
  });

  if(authData != null) {
    var url = FBURL + '/users/'+authData.uid;
    var userRif = firebase.database().ref().child('users/'+authData.uid);
    //console.log("ilbeView");
    var user = $firebaseObject(userRif);
    user.$loaded().then(function(data) {
      if(data.provider === "facebook"){

      }
    })
      .catch(function(error) {
        console.error("Error:", error);
      });
  }


  $scope.commentPush = function(){
    var testRef = commentRef;
    var newRefs=[];

    var newRef = pushSomething(testRef, $scope.newComment);


    $scope.newComment = '';
    newRefs.push(newRef);
  }

  function pushSomething(ref, body) {
    //// Let's push something. push() returns a reference that you can hold onto!
    //console.log('uesr_id '+authData.uid, 'body '+body);
    //console.log(authData);
    //console.log($scope.target);
    var justPushed = ref.child($scope.target).push(
      {
        user_id: authData.uid,
        name: user.name,
        //profileImage: user.profileImage,
        body: body,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }
    );
    activityScore.incScore(3);
    var blogInfoRef = firebase.database().ref().child('write').child($scope.target).child('auth');
    //console.log(blogInfoRef);
    blogInfoRef.once('value', function(snap){
      var targetUser = snap.val()
      //if(targetUser !== authData.uid){
      var cnt = {
        targetDocId: $scope.target,
        targetUser:targetUser,
        authorUserId:authData.uid,
        name: user.name,
        //profileImage: user.profileImage,
        body: body,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      notification.addNotification(cnt);
      //}
    })

    // We return a reference, but you can also return the name of the newly
    // created object with .name().
    return justPushed;
  }
}