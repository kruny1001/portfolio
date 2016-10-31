'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .filter('keyboardShortcut', function($window) {
    return function(str) {
      if (!str) return;
      var keys = str.split('-');
      var isOSX = /Mac OS X/.test($window.navigator.userAgent);
      var seperator = (!isOSX || keys.length > 2) ? '+' : '';
      var abbreviations = {
        M: isOSX ? '⌘' : 'Ctrl',
        A: isOSX ? 'Option' : 'Alt',
        S: 'Shift'
      };
      return keys.map(function(key, index) {
        var last = index == keys.length - 1;
        return last ? key : abbreviations[key];
      }).join(seperator);
    };
  })
  .controller('EditCtrl', function ($scope, $sce, user, $location, blogService, $routeParams, $firebaseObject){

    var id = $routeParams.id
    var postInfo = firebase.database().ref().child('write/'+ id);
    var postRef = firebase.database().ref().child('blogCnt/'+ id);
    var baseRef = firebase.database().ref()
    var authorName = $firebaseObject(baseRef.child('users/'+user.uid+'/name'));
    $scope.postInfo = $firebaseObject(postInfo);
    $scope.post = $firebaseObject(postRef);
    $scope.post.$loaded().then(function(val){
      $scope.post.cnt = $sce.trustAsHtml(val.cnt);
    })

    $scope.updateCnt = function(){
      var cnt = $('.editable').html();
      $scope.postInfo.$save();
      blogService.updateItem(id, {cnt:cnt, updated:firebase.database.ServerValue.TIMESTAMP});

    }

    $scope.imgEdit = function() {
      var imgs = $('.page img')

      angular.forEach(angular.element(imgs), function(value, key){
        var container = angular.element('<div editor-img></div>');
        container.addClass('editor-img');
        var imgTag = angular.copy(value);
        container.append(imgTag);
        var e = $compile(container)($scope);
        angular.element(value).replaceWith(e);
      });
    }

    var editor = new MediumEditor('.editable', {
      toolbar: {
        buttons: [
          'bold', 'italic',
          'underline', 'strikethrough',
          'quote', 'anchor', 'image', 'justifyLeft',
          'justifyCenter', 'justifyRight', 'justifyFull',
          'superscript', 'subscript', 'orderedlist', 'unorderedlist',
          'pre', 'outdent', 'indent', 'h2', 'h3', 'h4', 'h5', 'anchor'],
        static: true,
        sticky: true
      },
      //imageDragging:,
      paste: {
        /* This example includes the default options for paste,
         if nothing is passed this is what it used */
        forcePlainText: false,
        cleanPastedHTML: false,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir'],
        cleanTags: ['meta']
      },
      anchor: {
        /* These are the default options for anchor form,
         if nothing is passed this is what it used */
        customClassOption: null,
        customClassOptionText: 'Button',
        linkValidation: false,
        placeholderText: 'Paste or type a link',
        targetCheckbox: false,
        targetCheckboxText: 'Open in new window'
      }
    });
    editor.subscribe('editableDrag', function (event, editable) {
      //console.log('start drag' , event , editable);

      // custom drag handling
    });

    editor.subscribe('editableDrop', function (event, editable) {
      console.log('drop drop', event, editable);
      // custom drop handling
    });

  })