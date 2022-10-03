import { cargarSonido } from './../../utils/cargarSonido.js';
import { menu } from './main/menu.js'

export const main = () => {

    let musicaOn = true;
    const toggle = () => musicaOn? `<img class="control-volumen" src="../imagenes/sound-active.png" alt="Silenciar">`:
    `<img class="control-volumen" src="../imagenes/sound-slash.png" alt="Silenciar">`;
    const reproduccion = () => musicaOn? sonido.play(): sonido.pause();

    let principal = document.createElement("main");
    const sonido = cargarSonido('../../audios/Surrounded-by-the-Enemy.mp3');
    const silenciar = document.createElement("button");
    silenciar.classList.add("hidden");
    silenciar.setAttribute("id", "silenciar");
    silenciar.addEventListener('click', ()=> {
        musicaOn = !musicaOn;
        silenciar.innerHTML = toggle();    
        reproduccion();
    });
    silenciar.innerHTML = toggle();
    
    principal.appendChild(silenciar);

    let seccion = document.createElement("section");
    seccion.setAttribute("id", "contenedor");
    seccion.appendChild(menu());
    principal.appendChild(seccion);  

    return principal;
}