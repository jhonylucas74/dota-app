// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});



app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('Heros', {
    url: '/',
    templateUrl: 'views/heros.html',
    controller: 'HerosController'
  });

  $stateProvider.state('Chanllengers', {
    url: '/chanllengers/:id',
    templateUrl: 'views/chanllengers.html',
    controller: 'ChanllengersController'
  });

  $stateProvider.state('Settings', {
    url: '/settings',
    templateUrl: 'views/settings.html',
    controller: 'SettingsController'
  });


});

app.controller('SettingsController',function($scope){
  $scope.user_id = localStorage.getItem('user_id');

  $scope.save = function(){
    localStorage.setItem('user_id',$scope.user_id);
  }
});


app.controller("HerosController", function($rootScope, $scope, $window, $http, Dota){
  var user_id = localStorage.getItem("user_id");
  $scope.heros = [];

  $http.get('js/data/heros.json').then(function(res){
      $scope.heros = res.data;
      localStorage.setItem('heros', JSON.stringify(res.data));
  });

  var progresso = {};

  $http.get('http://localhost:3000/user?id='+user_id).then(function(res){


      if(res.data && res.data.desafios){
        localStorage.setItem('desafios', JSON.stringify(res.data.desafios));
        var desafios = res.data.desafios;

        for (var i = 0; i < desafios.length; i++) {
          progresso[desafios[i].hero] = {
            total: 13,
            atual: desafios[i].desafios.length || 0
          };
        }
      } else {
        console.log("error: problemas ao pegar os dados do backend")
      }

      for (var i = 0; i <   $scope.heros.length; i++) {
        if(progresso[ $scope.heros[i].hero_id]){
            $scope.heros[i].atual = progresso[  $scope.heros[i].hero_id].atual;
            $scope.heros[i].total = progresso[  $scope.heros[i].hero_id].total;
        }
      }
      console.log(  $scope.heros);

  });


  $rootScope.show = function(id){
    $window.location = "#/chanllengers/"+id;
  };
});

app.controller("ChanllengersController", function($scope, $ionicScrollDelegate, $stateParams){

  $scope.$on('$ionicView.enter', function() {
    $ionicScrollDelegate.scrollTop(true);
  });

  var heros = JSON.parse(localStorage.getItem('heros'));
  $scope.image  = null;

  if(heros){
    for (var i = 0; i < heros.length; i++) {
      if(heros[i].hero_id == $stateParams.id)
        $scope.image = heros[i].image;
    }
  }

  var completos = JSON.parse(localStorage.getItem('desafios'));
  console.log(completos);

  var feitos = null;
  for (var i = 0; i < completos.length; i++) {
    if(completos[i].hero == $stateParams.id ){
      feitos  = completos[i].desafios;
      console.log(feitos);
    }
  }


  $scope.desafios = [
    {
      title: '1. Não morra na partida.',
      description: 'Fique vivo, nem precisa ganhar essa partida.'
    },
    {
      title: '2. Mate mais que todos no seu time.',
      description: 'Nem precisa ganhar a partida.'
    },
    {
      title: '3. Mate de 10 para cima e tente morrer pouco.',
      description: 'Só pode morrer 4 vezes se não irá falhar.'
    },
    {
      title: '4. Mate de 20 para cima e tente morrer pouco.',
      description: 'Só pode morrer 4 vezes se não irá falhar.'
    },
    {
      title: '5. Mate mais que todos no seu time',
      description: 'Dessa vez você tem que ganhar a partida.'
    },
    {
      title: '6. Mate mais de 20 e ganhe a partida.',
      description: 'Lembre-se de ganhar a partida.'
    },
    {
      title: '7. Mate mais de 30 e ganhe a partida.',
      description: 'Lembre-se de ganhar a partida.'
    },
    {
      title: '8. Mate mais de 40 e ganhe a partida.',
      description: 'Lembre-se de ganhar a partida.'
    },
    {
      title: '9. Mate mais que todos no jogo.',
      description: 'Lembre-se de ganhar a partida.'
    },
    {
      title: '9. Mate mais que todos no jogo.',
      description: 'Lembre-se de ganhar a partida.'
    },
    {
      title: '10. Mate mais de 20 e morra até 4 vezes.',
      description: 'Lembre-se de ganhar a partida.'
    },
    {
      title: '11. Mate mais de 30 e morra até 4 vezes.',
      description: 'Lembre-se de ganhar a partida.'
    },
    {
      title: '12. Mate mais de 40 e morra até 4 vezes.',
      description: 'Lembre-se de ganhar a partida.'
    },
    {
      title: '13. Não morra e ganhe a partida.',
      description: 'Não morra e ganhe, simples assim.'
    }
  ];

  if(feitos){
    for (var i = 0; i < feitos.length; i++) {
        $scope.desafios[feitos[i]].class = "mark";
    }
  }

  $scope.total = $scope.desafios.length;
  if(feitos) {
    $scope.atual = feitos.length
  } else {
    $scope.atual = 0;
  }


   $ionicScrollDelegate.scrollTop();

});
