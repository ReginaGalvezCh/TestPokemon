angular.module('pokeApp').controller('AlphabetSummaryController', ['$scope', '$rootScope', 'PokemonService', function($scope, $rootScope, PokemonService) {
  $scope.alphabetCount = {};
  $scope.filteredPokemons = [];
  $scope.allPokemons = [];

  $scope.loadSummary = async function() {
      $scope.allPokemons = await PokemonService.getAllPokemons();
      $scope.allPokemons.forEach(pokemon => {
          let firstLetter = pokemon.name.charAt(0).toUpperCase();
          $scope.alphabetCount[firstLetter] = ($scope.alphabetCount[firstLetter] || 0) + 1;
      });
      $rootScope.$apply(); // Usar $rootScope.$apply() para asegurar la actualización de la vista en todo el ámbito de la aplicación.
  };

  $scope.filterByLetter = function(letter) {
      $scope.filteredPokemons = $scope.allPokemons.filter(pokemon => pokemon.name.startsWith(letter));
      $rootScope.$apply(); // Esto asegurará que los cambios se reflejen en la vista.
  };

  $scope.loadSummary();
}]);
