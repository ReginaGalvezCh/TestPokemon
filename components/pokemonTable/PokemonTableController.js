angular.module('pokeApp').controller('PokemonTableController', ['$scope', 'PokemonService', function($scope, PokemonService) {
    $scope.pokemons = [];
    $scope.searchText = '';
    $scope.suggestions = [];
    $scope.currentPage = 0;
    $scope.pageSize = 10; 
    $scope.totalPages = 0;
    $scope.selectedPokemon = null;
    $scope.filteredPokemons = [];
    $scope.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    $scope.currentLetter = '';

    $scope.loadPokemons = function() {
        PokemonService.getPokemons($scope.currentPage * $scope.pageSize, $scope.pageSize).then(function(response) {
            $scope.totalPages = Math.ceil(response.data.count / $scope.pageSize);
            let detailPromises = response.data.results.map(pokemon => PokemonService.getPokemonDetails(pokemon.name));
            Promise.all(detailPromises).then(detailsResponses => {
                $scope.pokemons = detailsResponses.map((detailResponse, index) => {
                    let pokemonBaseInfo = response.data.results[index];
                    let pokemonDetails = detailResponse; 
                    return {
                        ...pokemonBaseInfo,
                        image: pokemonDetails.image,
                        types: pokemonDetails.types,
                        abilities: pokemonDetails.abilities,
                    };
                });
                $scope.$apply();
            });       
        });
    };
    $scope.filterByLetter = function(letter) {
        $scope.currentLetter = letter;
        if(letter === '') {
            $scope.filteredPokemons = $scope.pokemons;
        } else {
            $scope.filteredPokemons = $scope.pokemons.filter(pokemon => pokemon.name.startsWith(letter));
        }
    };
  
    $scope.loadPage = function(page) {
        $scope.currentPage = page;
        $scope.loadPokemons();
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.totalPages - 1) {
            $scope.currentPage++;
            $scope.loadPokemons();
        }
    };
    
    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
            $scope.loadPokemons();
        }
    };

    $scope.updateSuggestions = function() {
        if ($scope.searchText.length > 2) {
            PokemonService.searchPokemon($scope.searchText).then(function(response) {
                $scope.suggestions = response.data.results;
            });
        } else {
            $scope.suggestions = [];
        }
    };

    $scope.$watch('searchText', function(newVal) {
        $scope.updateSuggestions();
    });

    $scope.selectPokemon = function(pokemon) {
        $scope.selectedPokemon = pokemon;
    };

    $scope.loadPokemons();
}]);
