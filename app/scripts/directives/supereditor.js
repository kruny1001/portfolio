'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:superEditor
 * @description
 * # superEditor
 */
angular.module('statsdsuApp')
  .directive('superEditor', function ($compile, SECArray, SECService, RCodeExeService) {
    return {
      scope:{
        content: '=',
        editId: '&',
      },
      templateUrl:'views/templates/superEditor/super-editor.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.SECs = [];

        if(scope.content === undefined)
          scope.content = [];

        var cnt = angular.element('.content');
        var SEAs  = SECArray;
        scope.isOpen = false;
        scope.demo = {
          isOpen: false,
          count: 0,
          selectedDirection: 'left'
        };

        var compileContent = function(){
          $compile(cnt)(scope);
        }
        scope.addDirective = function(){
          cnt.append('<h1> add Directive </h1>');
          console.log(scope.content)
        }
        // Editor text
        // Pass Object
        scope.addDirectiveEditor = function(){
          var SEA = new SECService('editor-text','Hello world 2','<h1>hello world</h1>');
          var index = SECArray.addCnt(SEA);
          var editor = angular.element("<md-content><editor-text target="+index+"></editor-text></md-content>");
          editor = $compile(editor)(scope);
          cnt.append(editor);
        }

        scope.addDirectiveCode = function(){
          var SEA = new SECService('iframe-module','','');
          var index = SECArray.addCnt(SEA);
          var codeEditor = angular.element('<md-content><iframe-module mode="edit" target='+index+'></iframe-module></md-content>')
          codeEditor = $compile(codeEditor)(scope);

          cnt.append(codeEditor);
        }

        scope.addDirectiveChart = function(){
          var SEA = new SECService('graph','','');
          var index = SECArray.addCnt(SEA);
          var obj = {type:'editor-code', body:"<md-content><birds></birds></md-content>"}
          var codeEditor = angular.element(obj.body)
          codeEditor = $compile(codeEditor)(scope);
          cnt.append(codeEditor);
        }

        scope.addDirectiveSlideCourse = function(){
          var SEA = new SECService('slide-course','','');
          var index = SECArray.addCnt(SEA);
          var editor = angular.element("<md-content><slide-course></slide-course>></md-content>");
          editor = $compile(editor)(scope);
          cnt.append(editor);
        }

        scope.addDirectiveQuiz = function(){
          var SEA = new SECService('quiz','','');
          var index = SECArray.addCnt(SEA);
          scope.quiz = {description: 'What is the ', options: ['cool', 'boom', 'good'], answer:2}
          var editor = angular.element('<md-content><md-whiteframe class="md-whiteframe-1dp" flex-sm="45" flex-gt-sm="35" flex-gt-md="25" layout="column" layout-align="start center"> <h3 class="md-title"> Quiz 1 </h3> <quiz quiz-obj="quiz"></quiz> </md-whiteframe></md-content>');
          editor = $compile(editor)(scope);
          cnt.append(editor);
        }

        scope.rCodeExe = function(){
          var SEA = new RCodeExeService('r-code-exe',{code:"", title:"", desc:"", codeOnly:false, cmdCode:true, visualCode:false, result:""});
          var index = SECArray.addCnt(SEA);
          var courseCnt = angular.element(document.createElement('r-code-exe'));
          courseCnt.attr('index',index);
          var el = $compile( courseCnt )(scope);
          cnt.append(courseCnt);
        }

        scope.addDirectiveChallenge = function(){
          var SEA = {type:'challenge', pre:"", sample:"", solution:"", sct:""};
          var index = SECArray.addCnt(SEA);
          var courseCnt = angular.element(document.createElement('challenge'));
          courseCnt.attr('index',index);
          courseCnt.attr('mode','edit');
          var el = $compile( courseCnt )(scope);
          cnt.append(courseCnt);
        }

        scope.addDirectiveSurvey = function(){
          var SEA = {type:'survey', year:'2016'};
          var index = SECArray.addCnt(SEA);
          var courseCnt = angular.element(document.createElement('se-survey'));
          courseCnt.attr('index',index);
          var el = $compile( courseCnt )(scope);
          cnt.append(courseCnt);
        }
      }
    };
  });