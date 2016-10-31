'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:WriteCtrl
 * @description
 * # WriteCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('WriteCtrl', function($scope, $location, user,$firebaseObject, $firebaseArray, blogService){

    var baseRef = firebase.database().ref()
    var authorName = $firebaseObject(baseRef.child('users/'+user.uid+'/name'));

    $scope.createNewContent = function(){
      var cnt = $('.editable').html();
      var title = $scope.docTitle;
      var blogInfo = {title:title, views:0, likes: 0, dislikes: 0,
        name:authorName.$value, auth:user.uid, date: firebase.database.ServerValue.TIMESTAMP};
      var blogCnt = {cnt:cnt};
      blogService.newItem(blogInfo, blogCnt);
    }

    var MyExtension = function () {
      this.parent = true;
    };



    rangy.init();
    var HighlighterButton = MediumEditor.Extension.extend({
      name: 'highlighter',
      init: function () {
        this.classApplier = rangy.createCssClassApplier('highlight', {
          elementTagName: 'mark',
          normalize: true
        });

        this.button = this.document.createElement('button');
        this.button.classList.add('medium-editor-action');
        this.button.innerHTML = '<i class="fa fa-paint-brush"></i>';
        this.button.title = 'Highlight';

        this.on(this.button, 'click', this.handleClick.bind(this));

      },

      getButton: function () {
        return this.button;
      },
      handleClick: function (event) {
        this.classApplier.toggleSelection();
      }
    });
    var editor = new MediumEditor('.editable', {
      toolbar: {
        buttons: [
          'bold', 'italic',
          'underline', 'strikethrough',
          'quote', 'anchor', 'image', 'justifyLeft',
          'justifyCenter', 'justifyRight', 'justifyFull',
          'superscript', 'subscript', 'orderedlist', 'unorderedlist',
          'pre', 'outdent', 'indent', 'h2', 'h3', 'anchor','myextension','fontsize','highlighter'],
        static: true,
        sticky: true,
        buttonLabels: 'fontawesome'
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
      },
      extensions: {
        'highlighter': new HighlighterButton()
      }
    });

    editor.subscribe('editableDrag', function (event, editable) {
    });

    editor.subscribe('editableDrop', function (event, editable) {
      console.log('drop drop', event, editable);
    });
  })

  //.controller('WriteCtrl', function ($scope, FBURL, $firebaseArray, Auth) {
  //
  //  $scope.authData = Auth.$getAuth();
  //
  //  $scope.doc = {title: '', body:'dd', author: ''};
  //  var writeRef = new Firebase(FBURL + '/testWrite');
  //  $scope.testWrite = $firebaseArray(writeRef);
  //
  //  $scope.testWrite.$loaded().then(function(data){
  //    data.forEach(function(val){
  //      var cmtRef = new Firebase(FBURL+'/comments/'+val.$id);
  //      var cmts = $firebaseArray(cmtRef);
  //      cmts.$loaded().then(function(data){
  //        console.log(data)
  //        val.cmts = data;
  //      })
  //
  //    })
  //  }) .catch(function(error) {
  //    console.log("Error:", error);
  //  });
  //
  //  $scope.publish = function(){
  //    $scope.doc.body = $('.editable').html();
  //    $scope.testWrite.$add($scope.doc);
  //  }
  //  $scope.cancel = function(){
  //    $scope.doc.body = "";
  //  }
  //
  //  var editor = new MediumEditor('.editable', {
  //    toolbar: {
  //      buttons: [
  //        'bold', 'italic',
  //        'underline', 'strikethrough',
  //        'quote', 'image', 'justifyLeft',
  //
  //        'justifyCenter', 'justifyRight', 'justifyFull',
  //        'superscript', 'subscript', 'orderedlist', 'unorderedlist',
  //        'pre', 'outdent', 'indent', 'h1','h2', 'h3','h4','h5', 'anchor'],
  //      static: true,
  //      sticky: true
  //    },
  //    //imageDragging:,
  //    paste: {
  //      /* This example includes the default options for paste,
  //       if nothing is passed this is what it used */
  //      forcePlainText: true,
  //      cleanPastedHTML: false,
  //      cleanReplacements: [],
  //      cleanAttrs: ['class', 'style', 'dir'],
  //      cleanTags: ['meta']
  //    },
  //    anchor: {
  //      /* These are the default options for anchor form,
  //       if nothing is passed this is what it used */
  //      customClassOption: null,
  //      customClassOptionText: 'Button',
  //      linkValidation: false,
  //      placeholderText: 'Paste or type a link',
  //      targetCheckbox: false,
  //      targetCheckboxText: 'Open in new window'
  //    }
  //  });
  //
  //  editor.subscribe('editableDrag', function (event, editable) {
  //    //console.log('start drag' , event , editable);
  //
  //    // custom drag handling
  //  });
  //
  //  editor.subscribe('editableDrop', function (event, editable) {
  //    console.log('drop drop', event, editable);
  //    // custom drop handling
  //  });
  //});
