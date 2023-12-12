const pokeAPI = {};

function convertPokeApiDetail_to_model (pokeDetail){
    const pokemon = new PokemonClass();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;
    pokemon.type = pokeDetail.types[0].type.name;
    pokemon.types = pokeDetail.types;
    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default;
    return pokemon;}

pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then((pokemon_Poke_API_detail_json) => {
        return convertPokeApiDetail_to_model(pokemon_Poke_API_detail_json);
    })}

pokeAPI.getPokemons = (offset = 0, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        // o primeiro .then recebe a promisse que veio via fetch e o segundo .then recebe o retorno do primeiro já em objeto JSON e o terceiro pega somente o array dos resultados .results
        .then((response) => response.json())
        .then((responseToJSON) => responseToJSON.results) // results é o nome do array contendo os pokemons 
            .then((responseResults)=> responseResults.map(pokeAPI.getPokemonDetail)) //usa a função map nos indices para listar um array dos detalhes dos pokemons
        .then((detailResponses)=> Promise.all(detailResponses))
        .then((returnResponses)=> returnResponses)
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        .catch((error) =>console.error(error))
        .finally(() => { console.log("Loading! response received")});
};

function distribuiNumber (id){
    if (id < 10) { pokemonNumber = `#00${id}`;} 
    else if (id >= 10 && id <= 100) {pokemonNumber = `#0${id}`;} 
    else {pokemonNumber = `#${id}`;}
    return pokemonNumber; }

function manipularlistaTipos (types){
   switch (types.length) {
       case 1:
           return "vazio"
       case 2:
           return types[1].type.name; }}   

function listaTela(largura , altura){
   prop = largura / altura;
   console.log(prop);
   if (prop <= 0.9){
       return 4;}
   else if (prop > 0.9 && prop <= 2.8 && largura >= 576){
       return 9;}
   else if (prop > 2.8 && largura > 900){
       return 16;}
   else return 6}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Vanila PokeAPI ////////////////////////////////////////////////////////////////////

const pokeAPI = {};

pokeAPI.getPokemonDetail = (pokemon) => {return fetch(pokemon.url).then((response) => response.json())}

pokeAPI.getPokemons = (offset = 0 , limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        // o primeiro .then recebe a promisse que veio via fetch e o segundo .then recebe o retorno do primeiro já em objeto JSON e o terceiro pega somente o array dos resultados .results
        .then((response) => response.json())
        .then((responseToJSON) => responseToJSON.results) // results é o nome do array contendo os pokemons 
        .then((responseResults)=> responseResults.map(pokeAPI.getPokemonDetail)) //usa a função map nos indices para listar um array dos detalhes dos pokemons
        .then((detailResponses)=> Promise.all(detailResponses))
        .then((returnResponses)=> returnResponses)
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        .catch((error) =>console.error(error))
        .finally(() => { console.log("Loading! response received")});
};

////////////////////////////////////////////////////////////////////////////////////////////////////////*/