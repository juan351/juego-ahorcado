export const cargarSonido = fuente =>{
    const sonido = document.createElement("audio");
    sonido.src = fuente;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "none"; // <-- oculto
    sonido.setAttribute("id", fuente.slice(fuente.lastIndexOf('/')))
    document.body.appendChild(sonido);
    
    return sonido;
}