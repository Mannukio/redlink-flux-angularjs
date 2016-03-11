var redlinkApp = angular.module('redlinkApp',['ui.router']);

angular.module('redlinkApp').constant('urlEjemplo','http://127.0.0.1:8098/examples/no-angular/data/lista.json');



/*************************** Controllers *******************/
redlinkApp.controller('MainController', ['$scope', 'ServicioMensajes', function($scope, ServicioMensajes){
	
	$scope.links = [{
		nombre:"INICIO",
		estado:"app.home"
	},{
		nombre:"TABLAS",
		estado:"app.tablas"
	},{
		nombre:"DIRECTIVAS",
		estado:"app.directivas"
	}
	];


	$scope.nombreCurso = 'RedLink';

	$scope.nombreCursoAuxiliar = null;

	$scope.cambiarCurso = function(){
		// Importante cuando hay que copiar variables de $scope
		$scope.nombreCurso = angular.copy($scope.nombreCursoAuxiliar);
		$scope.nombreCursoAuxiliar = null;
	};

	$scope.cantMensajes = ServicioMensajes.getCantidadMensajes();

	$scope.sumarMensaje = function(){
		ServicioMensajes.sumarMensaje();
		$scope.cantMensajes = ServicioMensajes.getCantidadMensajes();
	}

	$scope.resetMensaje = function(){
		ServicioMensajes.resetMensaje();
		$scope.cantMensajes = ServicioMensajes.getCantidadMensajes();
	}


}]);

redlinkApp.controller('HomeController', ['$scope', function($scope){

}]);

redlinkApp.controller('DirectivasController', ['$scope', function($scope){

}]);

redlinkApp.controller('TablasController', ['$scope','$http','urlEjemplo', function($scope,$http,urlEjemplo){

	$http.get(urlEjemplo).success(function(data){
		console.log(data);
		$scope.datos = data;
	});

	$scope.reseteoVencimiento = function(fila){
		fila.vencida = false;
	}
}]);



/****************** Servicio ejemplo *******************/

angular.module('redlinkApp').service('ServicioMensajes', function(){
	var cantMensajes = 0;

	this.sumarMensaje = function(){
		cantMensajes++;
	}

	this.resetMensaje = function(){
		cantMensajes = 0;
	}

	this.getCantidadMensajes = function(){
		console.log(cantMensajes);
		return cantMensajes;
	}

})



//////// Diretiva con renombre
angular.module('redlinkApp').directive('myHome', ['ServicioMensajes', function(servicios){
	return {
		restrict: 'E',
		scope: {
			model: "=datos"
		},
		templateUrl: 'templates/directivas.html',
		link: function($scope, element, atts){
				/*

				//$scope.cantMensajes = ServicioMensajes.getCantidadMensajes();

				$scope.sumarMensaje = function(){
					ServicioMensajes.sumarMensaje();
					$scope.model.cantMensajes = ServicioMensajes.getCantidadMensajes();
				}

				$scope.resetMensaje = function(){
					ServicioMensajes.resetMensaje();
					$scope.model.cantMensajes = ServicioMensajes.getCantidadMensajes();
				}		
				*/		
			}
		}
}]);

/*************************** Routes *****************************/

angular.module('redlinkApp').config(['$stateProvider','$urlRouterProvider','$locationProvider', 
	function( $stateProvider, $urlRouterProvider, $locationProvider){
		$locationProvider.hashPrefix('!');

		$stateProvider.state('app',{
			url:'/',
			abstract: true,
			views: {
				"content":{
					templateUrl: 'vistas/main.html',
					controller: 'MainController'
				}
			}
		}).state('app.home',{
			url:'home',
			views: {
				"principal":{
					templateUrl: 'vistas/home.html',
					controller: 'MainController'
				}
			}
		}).state('app.tablas',{
			url:'tablas',
			views: {
				"principal":{
					templateUrl: 'vistas/tablas.html',
					controller: 'TablasController'
				}
			}
		}).state('app.directivas',{
			url:'directivas',
			views: {
				"principal":{
					templateUrl: 'vistas/directiva.html',
					controller: 'DirectivasController'
				}
			}
		}).state('app.directivas2',{
			url:'marquee',
			abstract: false,
			views: {
				"principal":{
					template: '<marquee><h1>{{nombreCurso}}</h1></marquee>',
					controller: 'MainController'
				}
			}
		});
		$urlRouterProvider.otherwise('/home')
	}]);

angular
	.element(document).ready(function(){
	if ( window.location.hash == '#_=_'){
		window.location.hash = '#!';
	}
});


// angular.module('redlinkApp')