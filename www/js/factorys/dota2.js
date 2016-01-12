app.factory("Dota", function($http, $q){
  var factory = {};
  var key = 'D7F9124C5B5A471481BE102D76F282EC';

  factory.getHistoryHero = function(id){
    var q = $q.defer();

    var query = '&hero_id=' + id;

    $http.get('http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key='+ key + query)
    .then(function(result){
      q.resolve(result); // sucesso
    }, function(){
      q.reject(); // caso de erro
    });
    return q.promise;
  };

  return factory;
});
