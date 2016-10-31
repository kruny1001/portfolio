'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.photoService
 * @description
 * # photoService
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .value('IMGTAG','outletImg')
  .factory('photoService', function ($resource,cloudinary,IMGTAG) {
    var url = cloudinary.url(IMGTAG,{format:'json',type:'list'});
    console.log(url);
    return $resource(url, {}, {
      loadPhotos: {method: 'GET', isArray:false}
    });
  });