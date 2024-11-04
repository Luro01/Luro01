/*-------------------------*\
       Menu
\*-------------------------*/
const fechar = document.querySelector("#fechar");
const abrir = document.querySelector("#abrir");
const minus = document.querySelector("#minus");
const header = document.querySelector("header");

abrir.addEventListener('click',function(){
  header.classList.add('menu')
  header.classList.remove('fechar')
  toggleMenu(fechar,abrir)
  
})
fechar.addEventListener('click',function(){
  header.classList.remove('menu')
  header.classList.add('fechar')
  toggleMenu(abrir,fechar)
})

function toggleMenu(mostrar,esconder){
  setTimeout(()=> {
      esconder.style.display = "none"
      minus.style.display = 'block'
      setTimeout(()=>{
      minus.style.display = 'none'
       mostrar.style.display = "block"
    },200)
   
 
  },200)
 

}






/*-------------------------*\
        Animações Sobre
\*-------------------------*/
const digitarT = document.querySelector("#title");
const text = 'Olá, meu nome é Lucas!';
let index = 0;

function digitar(){
  if(index<text.length){
    digitarT.textContent += text[index];
    index++;
    setTimeout(digitar,50)
  }
}

const background = document.querySelector("#colorir");
setTimeout(()=>{
  background.classList.add('animate')
},2500)

digitar()



/*-------------------------*\
        Tab Bar
\*-------------------------*/
const navItens= document.querySelectorAll('.nav-itens');
const line = document.querySelector('.line');
const section = document.querySelectorAll('section');

function ChecarVisivel(){

    Array.from(section).forEach(element =>{
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            updateLine(element);
        }
    })
}

function updateLine(section){

    const item = Array.from(navItens).find(element => 
        element.getAttribute('href') === `#${section.id}`
    );
    if(item){

        console.log(item.offset)
        line.style.width = item.offsetWidth + 'px'; 
        line.style.left = item.offsetLeft + 'px'; 
    }
   
}



window.addEventListener('scroll', ChecarVisivel);



/*-------------------------*\
        Carrosel
\*-------------------------*/
const cards = document.querySelectorAll(".cards");
const container = document.querySelector("#carrousel");
let currentIndex = 0;
let startX; 
let movimentando = false; 
let mobile = false;

document.querySelector("#next").addEventListener("click", () => {
  currentIndex += 1;
  mobile=false
  updateCarousel();
});

document.querySelector("#prev").addEventListener("click", () => {
  currentIndex -= 1;
  mobile=false
  updateCarousel();
});
function updateCarousel() {
    if (currentIndex < 0) {
        currentIndex = cards.length - 1; 
    } else if (!mobile && currentIndex >= cards.length-1) {
        currentIndex = 0;
    }else if(mobile && currentIndex >= cards.length){
        currentIndex = 0;
    }


    const margin = parseFloat(getComputedStyle(cards[0]).marginRight) + parseFloat(getComputedStyle(cards[0]).marginLeft); 
    const offset = -currentIndex * (cards[0].offsetWidth+margin);

    container.style.transform = `translateX(${offset}px)`; 
}


container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  movimentando = true;
  mobile = true
});
container.addEventListener("touchmove", (e) => {
  if (!movimentando) return;
  const moveX = e.touches[0].clientX;
  const diffX = startX - moveX;

  if (diffX > 70) { 
    currentIndex += 1;
    updateCarousel();
    movimentando = false; 
  } else if (diffX < -70) { 
    currentIndex -= 1;
    updateCarousel();
    movimentando = false; 
  }
});


