angular.module('pokeApp').service('PokemonService', function($http) {
    var baseUrl = 'https://pokeapi.co/api/v2/';
    this.getPokemons = function(page, pageSize) {
        var url = baseUrl + 'pokemon?offset=' + (page * pageSize) + '&limit=' + pageSize;
        return $http.get(url);
    };
    this.getPokemonDetails = function(pokemonName) {
        return $http.get(baseUrl + 'pokemon/' + pokemonName).then(function(response) {
            let details = response.data;
            let types = details.types.map(t => t.type.name);
            let abilities = details.abilities.map(a => a.ability.name);
    
            return {
                name: details.name,
                image: details.sprites.front_default,
                types: types,
                abilities: abilities,
            };
        });
    };
    
    this.getAllPokemons = function() {
        var allPokemons = [];
        var url = `${baseUrl}pokemon?limit=200`;
        var getAllPokemonsRecursively = function(url) {
            return $http.get(url).then(function(response) {
                allPokemons = allPokemons.concat(response.data.results);
                if (response.data.next) {
                    return getAllPokemonsRecursively(response.data.next);
                } else {
                    return allPokemons;
                }
            });
        };
        return getAllPokemonsRecursively(url);
    };
    this.searchPokemon = function(searchText) {
        var url = baseUrl + 'pokemon/' + searchText;
        return $http.get(url);
    };
});
