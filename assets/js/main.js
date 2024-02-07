/* 
//////////////////////////////////////Documentação parcial do arquivo main.js//////////////////////////////////////////////
Bug_01: 
É retornado uma lista com dois elementos ao invés de de um e com o primeiro tendo índice NAN

Processo de resolução:
como se encontrava somente no primeiro item fora realizado uma deleção te todos os itens da lista para apagar as repetições 
e do primeiro item que é gerado indevidamente, restando somente o item selecionado*/



const pokemonOL = document.getElementById('pokemonList');
function convertPokemonToHTML(pokemonRecebido){
    return `
    <button id="button_${pokemonRecebido.number}" onclick="requisicaoDetalhada(${pokemonRecebido.number})">

        <li class="pokemonListItem background__${pokemonRecebido.type}">
                <span class="pokemonListItem__number">${distribuiNumber(pokemonRecebido.number)}</span>
                <span class="pokemonListItem__name">${pokemonRecebido.name}</span>

            <div class="pokemonListItem__detailContainer">
                <ol class="detailContainer__types">
                    <li class="type-proprieties ${pokemonRecebido.type}">${pokemonRecebido.type}</li>
                    <li class="type-proprieties ${manipularlistaTipos(pokemonRecebido.types)}">${manipularlistaTipos(pokemonRecebido.types)}</li>
                </ol>

            <!--<img class="pokemonListItem__Image" src="${pokemonRecebido.photo}" alt="${pokemonRecebido.name}"> -->
                <img class="pokemonListItem__Image" src="${pokemonRecebido.photo}" alt="${pokemonRecebido.name}"> 
            </div>
        </li>
    </button>
    `
}
    pokeAPI.getPokemons( offset , limit ).then((resultsArray = []) => { 
        listaDeRetorno = resultsArray.map((convertPokemonToHTML)).join('');
        pokemonOL.innerHTML += listaDeRetorno; 

    });

    // realizado a inclusao de uma função no onclick que faz uma requisição nova detalhada e remove a lista antiga
    function requisicaoDetalhada(referencial){
        pokeAPI.getPokemons( (referencial - 1) , 1 ).then((resultsArray = []) => { 
            response = resultsArray.map((convertPokemonToHTML)).join('');
            pokemonOL.innerHTML -= listaDeRetorno; //Remover toda a lista que a API gera e deixar somente o item clicado
            pokemonOL.innerHTML += response;
            /*correcao_bug_01: 
                Ao remover a lista gerada em caso de select de um único pokemon 
                gera item filho como primeiro item da lista com corpo de texto "NAN";*/
            var correcao_bug_06 = pokemonOL.firstChild;
            pokemonOL.removeChild(correcao_bug_06);
        })};


