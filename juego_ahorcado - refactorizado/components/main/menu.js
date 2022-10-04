import { iniciarJuego } from './juego.js'


export const menu = () => {

    let panel = document.createElement("article");
    panel.classList.add("menu");

    let botonPlay = document.createElement("button");
    botonPlay.textContent = "JUGAR";

    botonPlay.addEventListener('click', ()=>{
        
        panel.remove();
        botonPlay.remove();
        
  
        iniciarJuego();
    })

    panel.appendChild(botonPlay); 

    return panel;
}



    
