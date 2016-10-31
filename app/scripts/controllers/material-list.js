'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:MaterialListCtrl
 * @description
 * # MaterialListCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('MaterialListCtrl', function ($scope, $routeParams, $window,
                                            $compile,$mdDialog,
                                            $firebaseObject,$firebaseAuth,$firebaseArray,
                                            Course, Chapter, Auth, SECArray
  ) {

    //console.log(Auth);
    $scope.userAuth = Auth.$getAuth();
    $scope.targetMat = null;
    $scope.progressValue = 0;

    var chapterId = $routeParams.chapterId;
    $scope.chapterInfo = Chapter.getChapter(chapterId);

    $scope.materialList = Chapter.listMaterials(chapterId);
    $scope.materialList.$loaded().then(function(val){
      $scope.setTargetMaterial({},0);
      TweenMax.to('.material-list-cnt', 1.2, {scrollTo:{y:0}, ease:Power2.easeOut});
    })

    $scope.back = function(){
      $window.history.back();
    }

    //material-list-cnt position top


    //bind content onto main view
    $scope.setTargetMaterial = function(event, index){
      if( $scope.materialList.length -1 >= index && index >= 0 ){
        $scope.crntIndex = index;
        angular.element('.content').html("");
        $scope.targetMat = $scope.materialList[index];
        $scope.cnt = $scope.targetMat.cnt;
        SECArray.updateCnt($scope.cnt);


        var cmtRef = firebase.database().ref().child('comments/'+$scope.targetMat.$id);
        var cmts = $firebaseArray(cmtRef);
        cmts.$loaded().then(function(data){
          $scope.cmts = data;
        })
        bindHtml($scope.targetMat.cnt)
        $scope.progressValue = ((index+1)/$scope.materialList.length) * 100;
      }
    }

    $scope.runSrc = function(){
      var code='';
    }

    //load 5 module first
    function bindHtml(cnt) {
      //target Content HTML
      var content = angular.element('.content')
      cnt.forEach(function(val, index){

        //if((index + 1)% 8 == 0 )
        //  setTimeout(function() {  }, 100);

        if(val.type === 'editor-text'){
          var container = angular.element(document.createElement('md-content'))
          container.css('margin-top','20px;');
          container.css('margin-botton','20px;');
          //container.attr('dragular','test-bag');
          //container.attr('dragula-model','val');

          var courseCnt = angular.element(document.createElement('editor-text-view'));
          courseCnt.attr('cnt', 'cnt['+index+']');
          courseCnt.attr('mode', 'read');
          courseCnt.attr('index', index);
          container.append(courseCnt)
          content.append(container)
          //content.append("<md-content><editor-text-view ng-cloack index='"+index+"' mode='read' cnt='cnt["+index+"]'></editor-text-view></md-content>")
        } else if(val.type ==='iframe-module'){
          var container = angular.element(document.createElement('md-content'))
          container.css('margin-top','20px;');
          container.css('margin-botton','20px;');
          //container.attr('dragular','test-bag');
          //container.attr('dragula-model','val');

          var courseCnt = angular.element(document.createElement('iframe-module'));
          courseCnt.attr('cnt', 'cnt['+index+']');
          courseCnt.attr('mode', 'read');
          courseCnt.attr('index', index);
          container.append(courseCnt)
          content.append(container)
        }

        else if(val.type ==='survey'){
          var courseCnt = angular.element(document.createElement('se-survey'));
          content.append(courseCnt)
        } else if(val.type === 'code-terminal'){
          content.append('<md-content><code-terminal></code-terminal></md-content>')
        } else if(val.type === 'slide-course'){
          content.append('<md-content><slide-course></slide-course></md-content>')
        }
        else if(val.type === 'r-code-exe'){
          var courseCnt = angular.element(document.createElement('r-code-exe'));
          courseCnt.attr('cnt', 'cnt['+index+']');
          courseCnt.attr('index', index);
          courseCnt.attr('mode', 'read');
          content.append(courseCnt)
        }
        else if(val.type === 'challenge'){
          var courseCnt = angular.element(document.createElement('challenge'));
          courseCnt.attr('index',index);
          courseCnt.attr('mode','read');
          content.append(courseCnt)
        }
      })
      $compile(content)($scope);

    }


    $scope.showAlert = function(ev, chapterId) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Would you like to delete this content?')
        .textContent('After deleting this content, you can not restore this content.')
        .ariaLabel('delete cnt')
        .targetEvent(ev)
        .ok('Submit')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function () {
        $scope.status = 'You decided to get rid of your debt.';
        Chapter.removeChapter(chapterId)
      }, function () {
        $scope.status = 'You decided to keep your debt.';
      });
    }
  });
