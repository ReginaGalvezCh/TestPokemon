angular.module('pokeApp').controller('AlphabetSummaryController', function($scope, PokemonService) {
    $scope.alphabetCount = {};
  
    $scope.loadSummary = function() {
      PokemonService.getAllPokemons().then(function(response) {
        response.data.results.forEach(pokemon => {
          let firstLetter = pokemon.name.charAt(0).toUpperCase();
          if (!$scope.alphabetCount[firstLetter]) {
            $scope.alphabetCount[firstLetter] = 1;
          } else {
            $scope.alphabetCount[firstLetter]++;
          }
        });
      });
    };
  
    $scope.loadSummary();
  });
  