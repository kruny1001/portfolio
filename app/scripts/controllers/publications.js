'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:PublicationsCtrl
 * @description
 * # PublicationsCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('PublicationsCtrl', function ($scope) {
    $scope.pubs = [
      {
        authors:['XJ Ge'], title:" Large-scale analysis of expression signatures reveals hidden links among diverse cellular processes.",
        year:2011, org:"", section:'5:87',
        links:[{name:'Full text', addr:"https://firebasestorage.googleapis.com/v0/b/firebase-bcloud.appspot.com/o/Papers%2Flarge-scale.pdf?alt=media&token=16512d6c-623a-4d02-a68b-32c256b9838f"},{name:'BMC Highly Accessed',addr:'http://bmcsystbiol.biomedcentral.com/articles/10.1186/1752-0509-5-87'}] },
      {
        authors:['Wang C', 'Chou CH', 'Tseng C', 'Ge X', 'Pinchuk LM.'], title:" Early gene response of human brain microvascular endothelial cells to Listeria monocytogenes infection.",
        year:2011, org:"", section:'57:441-446', links:[] },

    ]
  });
