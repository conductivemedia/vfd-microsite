var micrositeVFD = angular.module('micrositeVFD', ['angulartics', 'angulartics.google.analytics', 'ngRoute', 'micrositeVFD.services']); //ui.router maybe

// routes
    micrositeVFD.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'CatalogCtrl'
            })
            
            .when('/inverters', {
                templateUrl : 'pages/inverters.html',
                controller  : 'FilterResultsCtrl'
            })

            // route for the faq page
            .when('/faq', {
                templateUrl : 'pages/faq.html'
            })

            // route for the contact page
            .when('/guides', {
                templateUrl : 'pages/guides.html'
            });
    });

micrositeVFD.controller('CatalogCtrl', function($scope, $location, Catalog) {
	$scope.catalogs = Catalog.all();

	$scope.reset = function() {
    	$scope.formObject = {};
  	}

  	$scope.submitSearch = function(form){
      console.log(form)
  		var filteredProducts = Catalog.filter(form)
  		Catalog.filteredProducts = filteredProducts
  		console.log(window.localStorage.updateDisplay);
  		window.localStorage.updateDisplay = 1;
  		$location.path("/inverters")
  	}
  	$scope.formObject = {}

})

micrositeVFD.controller('FilterResultsCtrl', function($scope, Catalog) {  //$stateParams maybe
  var updateDisplay = function() {
    // console.log("updating display");
    $scope.products = Catalog.filteredProducts
    if (Catalog.filteredProducts.length > 0) {
      $scope.series = Catalog.filteredProducts[0].series
    } else {
      $scope.series = ''
    }
  }

  $scope.$watch(
      function() {
        // console.log('watching');
        return window.localStorage.updateDisplay;
      },
      function(newValue, oldValue) {
        // console.log('oldValue: ' + oldValue + ', newValue: ' +newValue);
        if (newValue == 1) {
          window.localStorage.updateDisplay = 0;
          updateDisplay();
        }
      });
  updateDisplay();
});