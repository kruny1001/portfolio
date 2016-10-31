'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:SuperEditorTestCtrl
 * @description
 * # SuperEditorTestCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('SuperEditorTestCtrl', function ($scope, $compile, SECArray, SECService) {

    var ref = firebase.database().ref().child('materials-test');
    var newMateial = ref.push();

    var SEAs  = SECArray;
    var SEA = new SECService('editor-text','Hello world','<h1>hello world</h1>');
    SECArray.addCnt(SEA);
    var cnt = SECArray.getCnt();
    console.log(cnt);

    //cnt = [{"type":"editor-text","cnt":"<h1>R fundamentals</h1><h2>Chapter 1</h2><h3>1. Expressions</h3><p>Type anything at the prompt, and R will evaluate it and print the answer. </p><p><br/></p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"1+1"},{"type":"editor-text","cnt":"<p>There's your result, 2. It's printed on the console right after you entry.</p><p>Type the string &#34;Go Jacks!&#34;. (Don't forget the quotes!)</p><p><br/></p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"\"Go Jacks\""},{"type":"editor-text","cnt":"<p>Now try multiplying 45.6 times 78.9</p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"#Try Challenge","title":""},{"type":"editor-text","cnt":"<h3>2. Logical Values</h3><p>Some Expressions return a &#34;logical value&#34;: TRUE or FALSE. (Many programming languages refer to these as &#34;boolean&#34; values.) Let's try typing an expressions that gives us a logical value: </p><p><br/></p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"3 < 4"},{"type":"editor-text","cnt":"<p>and another logical value (note that you need a double-equals sign to check whether two values are equal - a single-equals sign won't work):</p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"2 + 2 == 5"},{"type":"editor-text","cnt":"<p>T and F are shorthand for TRUE and FALSE. Try this: </p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"T == TRUE"},{"type":"editor-text","cnt":"<h3>3. Variables</h3><p>As in other programming languages, you can store values into a variable to access it later. Type x=42 to store a value in x. </p><p><br/></p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"x = 42"},{"type":"editor-text","cnt":"<p>You can also use the following. This is a safer way to assign values. </p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"x <- 42"},{"type":"editor-text","cnt":"<p>x can now be used in expressions in place of the original result. Try dividing x by 2(/ is the division operator).</p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"x / 2"},{"type":"editor-text","cnt":"<p>You can re-assign any value to a variable at any time. Try assigning &#34;Arr, matey!&#34; to x.</p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"x = \"Go, Jacks!\""},{"type":"editor-text","cnt":"<p>You can print the value of a variable at any time just by typing its name in the console. Try printing the current value of x. </p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"x = \"Go Jacks!\"\nx"},{"type":"editor-text","cnt":"<p>Now try assigning the TRUE logical value to x.</p>","body":"<h1>hello world</h1>"},{"type":"r-code-exe","code":"x = TRUE"}];

    //var cnt = [
    //  {type:'MathJax', body:'Test Test Test'},
    //  {type:'tableData', body:'<table><thead><th><td>Title</td></th></thead><tbody><tr><td>Body</td></tr></tbody></table>'},
    //  {type:'MathJax', body:'<md-content> CC <md-button class="md-raised"> dd </md-button></md-content>'},
    //  {type:'editor-text', body:"<md-content><editor-text edit-id='12342'></editor-text></md-content>", cnt:'<h1>Hello World</h1>'},
    //];

    $scope.cnt = cnt;

    //var cnt=[{"type":"MathJax","body":"Test Test Test"},{"type":"tableData","body":"<table><thead><th><td>Title</td></th></thead><tbody><tr><td>Body</td></tr></tbody></table>"},{"type":"MathJax","body":"<md-content> CC <md-button class=\"md-raised\"> dd </md-button></md-content>"},{"type":"Quiz","body":"<quiz></quiz>"},{"type":"editor-text","body":"<md-content><editor-text></editor-text></md-content>"},{"type":"editor-code","body":"<md-content><editor-code></editor-code></md-content>"}]
    //$scope.cnt = cnt;

    $scope.createMaterial = function(){
      var newMateial = ref.push();
      newMateial.set($scope.cnt);
    }

    $scope.getIndex = function(index){
      return index
    }
    function bindHtml() {
      //target Content HTML
      var content = angular.element('.content')
      cnt.forEach(function(val, index){
        if(val.type === 'editor-text'){
          console.log(index);
          content.append("<md-content><editor-text target='"+index+"'></editor-text></md-content>")
        }

      })
      $compile(content)($scope);
    }

    bindHtml();
  });
