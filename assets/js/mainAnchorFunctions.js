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

            function loadMore(offset , limit){
                let dfr = offset + limit - travaGeracional;
            if (dfr <= 0){
                pokeAPI.getPokemons( offset , limit )
                    .then((resultsArray = []) => {
                    listaDeRetorno = resultsArray.map((convertPokemonToHTML)).join('');
                    pokemonOL.innerHTML = listaDeRetorno;});}
            else {
                pokeAPI.getPokemons( offset , limit - dfr )
                .then((resultsArray = []) => {
                listaDeRetorno = resultsArray.map((convertPokemonToHTML)).join('');
                pokemonOL.innerHTML = listaDeRetorno;})}};


 ////////////*Paginacao*/////////////
 const buttonPrv = document.getElementById('pagination-prv');
 const buttonNxt = document.getElementById('pagination-nxt');
 var travaGeracional = 151;
 offset <= offset_inicial ? buttonPrv.parentElement.removeChild(buttonPrv):null;
 //
 buttonPrv.addEventListener('click' , () => {
     offset <= offset_inicial + limit ? buttonPrv.parentElement.removeChild(buttonPrv):null;
     offset -= limit;
     offset < 0 ? offset = 0 :
     ////////////////////////
     loadMore(offset , limit);});
     
 buttonNxt.addEventListener('click' , () => {
     offset_inicial >= offset + limit ? null:
     buttonNxt.parentElement.appendChild(buttonPrv);
     // 0 <= 0 + 16 true
     // 0 <= 16 + 16 true
     // 0 <= 32 + 16 true
     offset += limit;
     //limitando listagem para não carregar uma página vazia//
     offset > travaGeracional ? offset -= dfr:
     limit > travaGeracional ? limit -= dfr:
     /////////////////////////
     loadMore(offset , limit); });