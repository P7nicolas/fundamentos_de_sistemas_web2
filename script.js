const cards = ['<div class="carde"><div class="photo"><img src="img/alface.png" alt="alface" height="180px"></div><h5 class="nome">Alface</h5><p class="preco">R$3,50/kg</p><button class="comprar">Ver Produto</button></div>',
    '<div class="carde"><div class="photo"><img src="img/manga.png" alt="manga" height="180px"></div><h5 class="nome">Manga</h5><p class="preco">R$6,00/kg</p><button class="comprar">Ver Produto</button></div>',
    '<div class="carde"><div class="photo"><img src="img/arroz.png" alt="arroz" height="180px"></div><h5 class="nome">Arroz</h5><p class="preco">R$4,50/kg</p><button class="comprar">Ver Produto</button></div>',
    '<div class="carde"><div class="photo"><img src="img/feijao.png" alt="feijao" height="180px"></div><h5 class="nome">Feijão</h5><p class="preco">R$8,00/kg</p><button class="comprar">Ver Produto</button></div>',
    '<div class="carde"><div class="photo"><img src="img/sabonete.png" alt="sabonete" height="180px"></div><h5 class="nome">Sabonete</h5><p class="preco">R$2,00/unidade</p><button class="comprar">Ver Produto</button></div>',
    '<div class="carde"><div class="photo"><img src="img/detergente.png" alt="detergente" height="180px"></div><h5 class="nome">Detergente</h5><p class="preco">Preço: R$3,50/unidade</p><button class="comprar">Ver Produto</button></div>'];

const container = document.querySelector('.insideContainer');
const left = document.getElementById('setaL');
const right = document.getElementById('setaR');
const n = 6;
let indice = 0;

function preProcess(){
    indice = n-1;
    let novo = getSlice(cards, n);
    novo = novo.reduce((tags,atual)=>{ return tags+atual});
    container.innerHTML = novo; 
}

preProcess();

function getSlice(lista, n){
    let ini = indice;
    let fim = indice + n;
    let novo = lista.slice(ini,fim);
    
    if(fim > lista.length){
        novo = novo.concat(cards.slice(0,(fim-lista.length)));
    } 

    return novo;
}

function calcDesl(cartoes){
    let tamCard = cartoes[0].offsetWidth;
    let tamDiv = container.offsetWidth;
    let prct = (tamCard/tamDiv);
    desl = 1.0 - (prct * n);
    desl = desl/(2*n - 2);
    desl = 2*desl + prct;
    desl *= tamDiv;
    desl = Math.round(desl)

    return desl;
}

function gira(val){
    indice += val;
    indice = (indice + cards.length)%cards.length
    
    let novo = getSlice(cards, n);
    novo = novo.reduce((tags,atual)=>{ return tags+atual});
    container.innerHTML = novo;

    let cartoes = container.querySelectorAll('.carde');
    desl = calcDesl(cartoes);

    cartoes.forEach(cartao => {
        cartao.classList.toggle('anima');
        if(val > 0){
            cartao.style.left = desl.toString() + 'px';
        }else{
            cartao.style.right = desl.toString() + 'px';
        }
    })    
}

function anima(val){
    let cartoes = container.querySelectorAll('.carde');
    desl = calcDesl(cartoes);

    cartoes.forEach(cartao => {
        cartao.style.transform = 'translate(' + (-val*desl).toString() + 'px)'
    })
}

function setaClick(val){
    gira(val);
    setTimeout(() => anima(val), '1');
}

left.addEventListener("click", () => setaClick(-1));
right.addEventListener("click", () => setaClick(1));