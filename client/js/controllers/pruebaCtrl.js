app.controller('pruebaCtrl', function ($scope, $http) {
    $scope.mensaje = 'la ruta "/prueba"';

    $scope.peticionGET = function (){
	    $http.get('../server/public/prueba').then(function (data){                                                                                                   
	    	console.log(data);
	    	alert(data.data);
	    });
    };

    $scope.peticionPOST = function () {
		$http({
			method: 'POST', 
			url: '../server/public/peticionpost',
            contentType: 'application/json', 
            dataType: "json", 
			data: {
					dato1: 'prueba',
					dato2: 'otra prueba'
					}
		}).then(function (data, status, headers, config) {
			console.log(data);
			alert(data.data);
        }).catch(function (Object) {
               alert(Object.data);
           });
    }

    $scope.peticionGET();
    $scope.peticionPOST();

});
