var app = angular.module('pokeApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/pokemons', {
        templateUrl: 'components/pokemonTable/pokemonTable.html',
        controller: 'PokemonTableController'
    })
    .when('/alphabetSummary', {
        templateUrl: 'components/AlphabetSummary/alphabetSummary.html',
        controller: 'AlphabetSummaryController'
    })
    .otherwise({
        redirectTo: '/pokemons'
    });
}]);
