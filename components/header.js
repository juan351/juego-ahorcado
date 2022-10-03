export const header = (logo, titulo) => {

    let cabecera = document.createElement("header");
    cabecera.classList.add("cabecera")
    
    let nav = document.createElement("nav");
    
    let divLogo = document.createElement("div");
    divLogo.classList.add("logo");

    
    let imagen = document.createElement("img");
    imagen.setAttribute("src", logo);
    imagen.setAttribute("alt", titulo);
    
    let divTitulo = document.createElement("div");
    divTitulo.classList.add("titulo");
    let textTitulo = document.createElement("h2");
    textTitulo.textContent = titulo;

    divTitulo.appendChild(textTitulo);
    divLogo.appendChild(imagen);
    cabecera.appendChild(divLogo);
    nav.appendChild(divTitulo);
  

    cabecera.appendChild(nav);

    return cabecera;
};

