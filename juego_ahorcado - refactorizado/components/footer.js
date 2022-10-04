export const footer = () => {

    let pie_de_pagina = document.createElement("footer");
    pie_de_pagina.classList.add("pie-de-pagina");

    let divContacto = document.createElement("div")
    divContacto.classList.add("contacto");
    divContacto.innerHTML = `    <p><a href="https://www.linkedin.com/in/juan-montivero/"><i class="fa-brands fa-linkedin-in fa-2x"></i></a></p>
    <p><a href="https://www.github.com/juan351"><i class="fa-brands fa-github fa-2x"></i></a></p>`;
    
    let divCopyright = document.createElement("div");
    divCopyright.classList.add("copyright");
    divCopyright.innerHTML = `<p>&copy Juan Montivero</p>`;

    pie_de_pagina.appendChild(divContacto);
    pie_de_pagina.appendChild(divCopyright); 
    
    return pie_de_pagina;
}