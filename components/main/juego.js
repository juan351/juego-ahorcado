import { dibujarCirculo, dibujarLinea, dibujarOjosEnCruz, dibujarRectangulo } from "./../../utils/dibujar.js";
import { cargarSonido } from "./../../utils/cargarSonido.js"
let errores = 0;
let aciertos = 0;
let palabraAAdivinar = '';
let mammaMia;  
let sonido;  
let win;
let silenciar;

export const iniciarJuego = () => {
    sonido = document.getElementById("/Surrounded-by-the-Enemy.mp3");
    mammaMia = cargarSonido("../../audios/mamma-mia.mp3");
    win = cargarSonido("../../audios/reggaedrum_01_167a.wav");

    
    silenciar = document.getElementById("silenciar");
    silenciar.classList.toggle("hidden");
    sonido.play();



    let palabra= buscarPalabra().then(palabra => {  
        try {
            jugar(palabra["body"]["Word"]);    
        } catch (error) {
            jugar("supercalifragilisticoespialidoso");    
        }    
        
                   
    });
        

        

    

    

    async function buscarPalabra(){
        try {
            const response = await fetch("https://palabras-aleatorias-public-api.herokuapp.com/random");
            return response.json();
            
        } catch (error) {
            return null; 
        }
        
    }
    
}

export const jugar = (palabra) => {
    
    palabraAAdivinar = palabra;
    
    let cantidadLetras = palabra.length;

    let contenedor = document.getElementById("contenedor");

    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", "300px");
    canvas.setAttribute("height", "400px");
    canvas.setAttribute("id", "canvas-ahorcado");

    contenedor.appendChild(canvas); 
        //let ctx = canvas.getContext("2d");
    contenedor.appendChild(crearAreaLetras(cantidadLetras)).appendChild(crearBotonesLetras());
    
    
}

const dibujar = (ctx, parte) => {
    switch(parte){
        case 1:
            dibujarCirculo(ctx, 200, 100, "black");
            break;
        case 2:
            dibujarLinea(ctx, 200, 125, 200, 225, "black");
            break;
        case 3:
            dibujarLinea(ctx, 200, 225, 185, 280, "black");
            break;
        case 4:
            dibujarLinea(ctx, 200, 225, 215, 280, "black");
            break;
        case 5:
            dibujarLinea(ctx, 200, 150, 185, 180, "black");
            break;
        case 6:
            dibujarLinea(ctx, 200, 150, 215, 180, "black");
            break;
        case 7:
            dibujarRectangulo(ctx, 100,20,100,15, "brown");
            dibujarRectangulo(ctx, 100,20,15,380, "brown");
            dibujarRectangulo(ctx, 80,385,100,15, "brown");
            break;
        case 8: 
            dibujarLinea(ctx, 200, 20, 200, 75, "red");
        case 9:
            dibujarOjosEnCruz(ctx, 190, 90, 210, 90, "red", 5); 
            dibujarLinea(ctx, 150, 130, 250, 120, "red");
            silenciar.classList.toggle("hidden");
            let areaLetras = document.getElementById("area-letras");
            areaLetras.innerHTML = '';
            let gameOver = document.createElement("img");
            gameOver.setAttribute("src", "../../imagenes/game_over.png");
            gameOver.setAttribute("alt", "Game Over");
            areaLetras.appendChild(gameOver); 
            let mensaje = document.createElement("p");
            mensaje.textContent = `La palabra era ${palabraAAdivinar}`
            mensaje.classList.add("mensaje-final");
            areaLetras.appendChild(mensaje); 
            sonido.pause(); 
            mammaMia.play();

            areaLetras.appendChild(menuJugarNuevamente());             
            

        default:
    }
}

const crearAreaLetras = (cantidadLetras) => {

    let areaLetras = document.createElement("div");
    areaLetras.setAttribute("id", "area-letras");
    let areaPalabra = document.createElement("div");
    areaPalabra.classList.add("area-palabra");
    areaLetras.appendChild(areaPalabra);
        

    for(let i = 0; i < cantidadLetras; i++){
        let divLetra = document.createElement("div");
        divLetra.textContent = '*';
        divLetra.classList.add("div-subrayado");
        divLetra.setAttribute("id", `${i}`);
        areaPalabra.appendChild(divLetra);
    }

    return areaLetras; 
}

const crearBotonesLetras = () => {
    const abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const botonera = document.createElement("div");
    botonera.classList.add("botonera");
    
    
    abecedario.forEach(letra => {
        let boton = document.createElement("button");
        boton.classList.add("boton-letra"); 
        boton.setAttribute("id", letra);
        boton.textContent = letra;
        boton.addEventListener('click', () => {
            compararLetras(boton.textContent);
            boton.disabled = true; 
        });
        botonera.appendChild(boton)
    });

    return botonera;
}

const compararLetras = (letra) => {
    let letraEncontrada = false;
    let palabra = palabraAAdivinar;
    
    for(i=0; i < palabra.length; i++){
        if(palabra[i] == letra){
            aciertos++;
            letraEncontrada = true;
            document.getElementById(`${i}`).textContent = letra;

        }
    }

    if(!letraEncontrada){
        errores++;
        dibujar(document.getElementById("canvas-ahorcado").getContext("2d"), errores);

    }

    if(aciertos == palabraAAdivinar.length){

        silenciar.classList.toggle("hidden");
        let areaLetras = document.getElementById("area-letras");
        areaLetras.innerHTML = '';
        let ganaste = document.createElement("img");
        ganaste.setAttribute("src", "../../imagenes/funny-celebrate-8.webp");
        ganaste.setAttribute("alt", "¡Ganaste!");
        areaLetras.appendChild(ganaste); 
        sonido.pause();  
        win.loop = true;
        win.play();
        areaLetras.appendChild(menuJugarNuevamente()); 

    }
    

}

const menuJugarNuevamente = () => {
  let divMenu = document.createElement("div");
  divMenu.classList.add("menu");
  let botonJugarNuevamente = document.createElement("button");
  botonJugarNuevamente.textContent = "Jugar de nuevo";
  let botonTerminar = document.createElement("button");
  botonTerminar.textContent = "Terminar";
  botonJugarNuevamente.addEventListener("click", () => {
    if(win.play){
        win.pause();
    }
    document.getElementById("contenedor").innerHTML = "";
    errores = 0;
    aciertos = 0;
    iniciarJuego();
  });
  botonTerminar.addEventListener("click", () => {
    window.location = "/";
  });
  divMenu.appendChild(botonJugarNuevamente);
  divMenu.appendChild(botonTerminar);

  return divMenu;
};