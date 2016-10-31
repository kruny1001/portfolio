'use strict';
/**
 * @ngdoc overview
 * @name statsdsuApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 * Add new routes using `yo angularfire:route` with the optional --auth-required flag.
 *
 * Any controller can be secured so that it will only load if user is logged in by
 * using `whenAuthenticated()` in place of `when()`. This requires the user to
 * be logged in to view this route, and adds the current user into the dependencies
 * which can be injected into the controller. If user is not logged in, the promise is
 * rejected, which is handled below by $routeChangeError
 *
 * Any controller can be forced to wait for authentication to resolve, without necessarily
 * requiring the user to be logged in, by adding a `resolve` block similar to the one below.
 * It would then inject `user` as a dependency. This could also be done in the controller,
 * but abstracting it makes things cleaner (controllers don't need to worry about auth state
 * or timing of displaying its UI components; it can assume it is taken care of when it runs)
 *
 *   resolve: {
 *     user: ['Auth', function(Auth) {
 *       return Auth.$getAuth();
 *     }]
 *   }
 *
 */
angular.module('statsdsuApp')

/**
 * Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
 * when called, invokes Auth.$requireAuth() service (see Auth.js).
 *
 * The promise either resolves to the authenticated user object and makes it available to
 * dependency injection (see AccountCtrl), or rejects the promise if user is not logged in,
 * forcing a redirect to the /login page
 */
  .config(['$routeProvider', 'SECURED_ROUTES', function($routeProvider, SECURED_ROUTES) {
    // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
    // unfortunately, a decorator cannot be use here because they are not applied until after
    // the .config calls resolve, so they can't be used during route configuration, so we have
    // to hack it directly onto the $routeProvider object
    $routeProvider.whenAuthenticated = function(path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['$firebaseAuth', function($firebaseAuth) {
        var Auth = $firebaseAuth();
        return Auth.$requireSignIn();
      }];
      $routeProvider.when(path, route);
      SECURED_ROUTES[path] = true;
      return $routeProvider;
    };
  }])

  .config(function (cloudinaryProvider,$routeProvider) {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCVpbl-acmVwnl24GRnydSxCjcR5IwTUjw",
      authDomain: "kev.firebaseapp.com",
      databaseURL: "https://kev.firebaseio.com",
      storageBucket: "firebase-kev.appspot.com",
      messagingSenderId: "934050888108"
    };
    firebase.initializeApp(config);
    //   cloudinary setting
    cloudinaryProvider
      .set("cloud_name", "dbfirebase")
      .set("upload_preset", "hb1c23iq");
  })

  // configure views; whenAuthenticated adds a resolve method to ensure users authenticate
  // before trying to access that route
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .whenAuthenticated('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
      })
      //.when('/course', {
      //  templateUrl: 'views/course.html',
      //  controller: 'CourseCtrl'
      //})
      .when('/course/:className', {
        templateUrl: 'views/partials/coursedetail.html',
        controller: 'CoursedetailCtrl'
      })

      .when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl'
      })

      .when('/editCourse/:sectionId/:idClass', {
        templateUrl: 'views/editcourse.html',
        controller: 'EditcourseCtrl'
      })

      .when('/userInfo/:user_id', {
        templateUrl: 'views/userinfo.html',
        controller: 'UserinfoCtrl'
      })
      .whenAuthenticated('/write', {
        templateUrl: 'views/write.html',
        controller: 'WriteCtrl'
      })
      .when('/notification', {
        templateUrl: 'views/notification.html',
        controller: 'NotificationCtrl'
      })
      .whenAuthenticated('/read/:id', {
        templateUrl: 'views/read.html',
        controller: 'ReadCtrl'
      })
      .whenAuthenticated('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/test-progress', {
        templateUrl: 'views/test-progress.html',
        controller: 'TestProgressCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/course', {
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl'
      })

      .when('/cs/:id', {
        templateUrl: 'views/cs.html',
        controller: 'CsCtrl'
      })
      .when('/createContent', {
        templateUrl: 'views/createcontent.html',
        controller: 'CreatecontentCtrl'
      })
      .when('/createContent/:chapterId', {
        templateUrl: 'views/createcontent.html',
        controller: 'CreatecontentCtrl'
      })
      .when('/class/:id', {
        templateUrl: 'views/class.html',
        controller: 'ClassCtrl'
      })
      .when('/course-detail/:id', {
        templateUrl: 'views/course-detail.html',
        controller: 'CourseDetailCtrl'
      })
      .when('/chapter-detail/:id', {
        templateUrl: 'views/chapter-detail.html',
        controller: 'ChapterDetailCtrl'
      })
      .when('/material-list/:chapterId', {
        templateUrl: 'views/material-list.html',
        controller: 'MaterialListCtrl'
      })
      .when('/quizTest', {
        templateUrl: 'views/quiztest.html',
        controller: 'QuiztestCtrl'
      })
      .when('/editContents/:type/:id', {
        templateUrl: 'views/editcontents.html',
        controller: 'EditcontentsCtrl'
      })
      .when('/registerForm', {
        templateUrl: 'views/registerform.html',
        controller: 'RegisterformCtrl'
      })
      .when('/user-list', {
        templateUrl: 'views/user-list.html',
        controller: 'UserListCtrl'
      })
      .when('/menu-test', {
        templateUrl: 'views/menu-test.html',
        controller: 'MenuTestCtrl'
      })
      .when('/edit-registerForm/:registerId', {
        templateUrl: 'views/edit-registerform.html',
        controller: 'EditRegisterformCtrl'
      })
      .when('/create-material', {
        templateUrl: 'views/create-material.html',
        controller: 'CreateMaterialCtrl'
      })
      .when('/super-editor-test', {
        templateUrl: 'views/super-editor-test.html',
        controller: 'SuperEditorTestCtrl'
      })
      .when('/test-class', {
        templateUrl: 'views/test-class.html',
        controller: 'TestClassCtrl'
      })
      .when('/super-blog-list', {
        templateUrl: 'views/super-blog-list.html',
        controller: 'SuperBlogListCtrl'
      })
      .when('/super-blog-detail/:id', {
        templateUrl: 'views/super-blog-detail.html',
        controller: 'SuperBlogDetailCtrl'
      })

      .when('/super-editor-detail', {
        templateUrl: 'views/super-editor-detail.html',
        controller: 'SuperEditorDetailCtrl'
      })
      .when('/new-content', {
        templateUrl: 'views/content-tool/new-content.html',
        controller: 'NewContentCtrl'
      })
      .when('/new-content/:chapterId', {
        templateUrl: 'views/content-tool/new-content.html',
        controller: 'NewContentCtrl'
      })
      .when('/edit-content/:id', {
        templateUrl: 'views/content-tool/edit-content.html',
        controller: 'EditContentCtrl'
      })
      .when('/classList', {
        templateUrl: 'views/classlist.html',
        controller: 'ClasslistCtrl'
      })
      .when('/survey', {
        templateUrl: 'views/survey.html',
        controller: 'SurveyCtrl'
      })
      .when('/survey-result', {
        templateUrl: 'views/survey-result.html',
        controller: 'SurveyResultCtrl'
      })
      .when('/pixi-view', {
        templateUrl: 'views/pixi-view.html',
        controller: 'PixiViewCtrl'
      })
      .when('/survey-result', {
        templateUrl: 'views/survey-result.html',
        controller: 'SurveyResultCtrl'
      })
      .when('/codelab', {
        templateUrl: 'views/codelab.html',
        controller: 'CodelabCtrl'
      })
      .when('/se-grid', {
        templateUrl: 'views/se-grid.html',
        controller: 'SeGridCtrl'
      })
      .when('/class', {
        templateUrl: 'views/class.html',
        controller: 'ClassCtrl'
      })
      .when('/classes', {
        templateUrl: 'views/classes.html',
        controller: 'ClassesCtrl'
      })
      .when('/class-edit', {
        templateUrl: 'views/class-edit.html',
        controller: 'ClassEditCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl'
      })
      .when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl'
      })
      .when('/material/:materialId', {
        templateUrl: 'views/material.html',
        controller: 'MaterialCtrl'
      })
      .when('/publications', {
        templateUrl: 'views/publications.html',
        controller: 'PublicationsCtrl'
      })
      .when('/timelines', {
        templateUrl: 'views/timelines.html',
        controller: 'TimelinesCtrl'
      })
      .when('/people', {
        templateUrl: 'views/people.html',
        controller: 'PeopleCtrl'
      })
      .when('/software', {
        templateUrl: 'views/software.html',
        controller: 'SoftwareCtrl'
      })
      .when('/edu', {
        templateUrl: 'views/edu.html',
        controller: 'EduCtrl'
      })
      .when('/timelines', {
        templateUrl: 'views/timelines.html',
        controller: 'TimelinesCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({redirectTo: '/'});
  }])

  /**
   * Apply some route security. Any route's resolve method can reject the promise with
   * "AUTH_REQUIRED" to force a redirect. This method enforces that and also watches
   * for changes in auth status which might require us to navigate away from a path
   * that we can no longer view.
   */
  .run(['$rootScope', '$location', '$firebaseAuth', 'SECURED_ROUTES', '$mdDialog',
    function($rootScope, $location, $firebaseAuth, SECURED_ROUTES, $mdDialog) {
      var Auth = $firebaseAuth();
      // watch for login status changes and redirect if appropriate
      Auth.$onAuthStateChanged(check);

      // some of our routes may reject resolve promises with the special {authRequired: true} error
      // this redirects to the login page whenever that is encountered
      $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
        if( err === 'AUTH_REQUIRED' ) {
          $location.path('login');
        }
      });

      function check(user) {
        if( !user && authRequired($location.path()) ) {
          $location.path('login');
        }
      }

      function authRequired(path) {
        return SECURED_ROUTES.hasOwnProperty(path);
      }

      //$mdDialog.show(
      //  $mdDialog.alert()
      //    .parent(angular.element(document.querySelector('#popupContainer')))
      //    .clickOutsideToClose(true)
      //    .title('This is an alert title')
      //    .textContent('You can specify some description text in here.')
      //    .ariaLabel('Alert Dialog Demo')
      //    .ok('Got it!')
      //    .targetEvent()
      //);
    }
  ])

  .run(['$rootScope', function($rootScope, $firebaseObject){
    var ref = firebase.database().ref().child('crntUrl');
    //$rootScope.crntUrl = $firebaseObject(ref);
    //console.log($rootScope.crntUrl);


  }])
  // used by route security
  .constant('SECURED_ROUTES', {});
