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
var offset = 0; 
//Adapta ao tamanho de tela para exibir diferentes elementos
var limit = listaTela(largura , altura); 


/////////////////////////////////////
// Exemplo de requisição de API via FETCH API JS

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