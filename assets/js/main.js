console.log("Loading! pré API");

console.log("Iniciando refatoração do código 01/02/2024 ")

//recebendo largura e altura da tela
$ = document.querySelector.bind(document); 
$$ = document.querySelectorAll.bind(document); 
    let elemento = "#content_id"
    let largura = $(elemento).clientWidth;
    let altura = $(elemento).clientHeight;
console.log(largura,altura);
/* "offset_inicial" é uma variável exclusiva para paginação */
var offset_inicial = 0;
/////////////////////////////////////
// Exemplo de requisição de API via FETCH API JS
var offset = 0; 
var limit = listaTela(largura , altura);
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
            /*correcao_bug_06: 
                Ao remover a lista gerada em caso de select de um único pokemon 
                gera item filho como primeiro item da lista com corpo de texto "NAN 06";*/
            var correcao_bug_06 = pokemonOL.firstChild;
            pokemonOL.removeChild(correcao_bug_06);
        })};

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
        loadMore(offset , limit);
    });
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
        loadMore(offset , limit);
    });

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
        pokemonOL.innerHTML = listaDeRetorno;})}
};
