let errores = 0;
let aciertos = 0;
let palabraAAdivinar = "";
let palabraNormalizada = "";
let mammaMia;
let sonido;
let win;
let silenciar;

window.addEventListener("load", () => {
  root = document.getElementById("root");
  wrapper = document.getElementById("wrapper");
  wrapper.appendChild(header("imagenes/logo.png", "El ahorcadito"));
  wrapper.appendChild(main());
  root.appendChild(footer());
});

const main = () => {
  let musicaOn = true;
  const toggle = () =>
    musicaOn
      ? `<img class="control-volumen" src="./imagenes/sound-active.png" alt="Silenciar">`
      : `<img class="control-volumen" src="./imagenes/sound-slash.png" alt="Silenciar">`;
  const reproduccion = () => (musicaOn ? sonido.play() : sonido.pause());

  let principal = document.createElement("main");
  const sonido = cargarSonido("./audios/Surrounded-by-the-Enemy.mp3");
  const silenciar = document.createElement("button");
  silenciar.classList.add("hidden");
  silenciar.setAttribute("id", "silenciar");
  silenciar.addEventListener("click", () => {
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
};

const menu = () => {
  let panel = document.createElement("article");
  panel.classList.add("menu");

  let botonPlay = document.createElement("button");
  botonPlay.textContent = "JUGAR";

  botonPlay.addEventListener("click", () => {
    panel.remove();
    botonPlay.remove();

    iniciarJuego();
  });

  panel.appendChild(botonPlay);

  return panel;
};

const iniciarJuego = () => {
  sonido = document.getElementById("/Surrounded-by-the-Enemy.mp3");
  mammaMia = cargarSonido("./audios/mamma-mia.mp3");
  win = cargarSonido("./audios/reggaedrum_01_167a.wav");

  silenciar = document.getElementById("silenciar");
  silenciar.classList.toggle("hidden");
  sonido.loop = true;
  sonido.play();

  let palabra = buscarPalabra().then((palabra) => {
    try {
      palabraAAdivinar = palabra[0];
      let palabraModificada = palabraAAdivinar;

      for (let i = 0; i < palabraAAdivinar.length; i++) {
        if (palabraAAdivinar[i] == "á")
          palabraModificada = palabraModificada.replace("á", "a");
        else if (palabraAAdivinar[i] == "é")
          palabraModificada = palabraModificada.replace("é", "e");
        else if (palabraAAdivinar[i] == "í")
          palabraModificada = palabraModificada.replace("í", "i");
        else if (palabraAAdivinar[i] == "ó")
          palabraModificada = palabraModificada.replace("ó", "o");
        else if (palabraAAdivinar[i] == "ú")
          palabraModificada = palabraModificada.replace("ú", "u");
      }

      palabraNormalizada = palabraModificada;
      jugar(palabra[0]);
    } catch (error) {
      jugar("supercalifragilisticoespialidoso");
    }
  });

  async function buscarPalabra() {
    try {
      const response = await fetch(
        "https://clientes.api.greenborn.com.ar/public-random-word"
      );
      return response.json();
    } catch (error) {
      return null;
    }
  }
};

const jugar = (palabra) => {
  let cantidadLetras = palabra.length;

  let contenedor = document.getElementById("contenedor");

  let canvas = document.createElement("canvas");
  canvas.setAttribute("width", "300px");
  canvas.setAttribute("height", "400px");
  canvas.setAttribute("id", "canvas-ahorcado");

  contenedor.appendChild(canvas);
  //let ctx = canvas.getContext("2d");
  contenedor
    .appendChild(crearAreaLetras(cantidadLetras))
    .appendChild(crearBotonesLetras());
};

const dibujar = (ctx, parte) => {
  switch (parte) {
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
      dibujarRectangulo(ctx, 100, 20, 100, 15, "brown");
      dibujarRectangulo(ctx, 100, 20, 15, 380, "brown");
      dibujarRectangulo(ctx, 80, 385, 100, 15, "brown");
      break;
    case 8:
      dibujarLinea(ctx, 200, 20, 200, 75, "red");
    case 9:
      dibujarOjosEnCruz(ctx, 190, 90, 210, 90, "red", 5);
      dibujarLinea(ctx, 150, 130, 250, 120, "red");
      silenciar.classList.toggle("hidden");
      let areaLetras = document.getElementById("area-letras");
      areaLetras.innerHTML = "";
      let gameOver = document.createElement("img");
      gameOver.setAttribute("src", "./imagenes/game_over.png");
      gameOver.setAttribute("alt", "Game Over");
      areaLetras.appendChild(gameOver);
      let mensaje = document.createElement("p");
      mensaje.textContent = `La palabra era ${palabraAAdivinar}`;
      mensaje.classList.add("mensaje-final");
      areaLetras.appendChild(mensaje);
      sonido.pause();
      mammaMia.play();

      areaLetras.appendChild(menuJugarNuevamente());

    default:
  }
};

const crearAreaLetras = (cantidadLetras) => {
  let areaLetras = document.createElement("div");
  areaLetras.setAttribute("id", "area-letras");
  let areaPalabra = document.createElement("div");
  areaPalabra.classList.add("area-palabra");
  areaLetras.appendChild(areaPalabra);

  for (let i = 0; i < cantidadLetras; i++) {
    let divLetra = document.createElement("div");
    divLetra.textContent = "*";
    divLetra.classList.add("div-subrayado");
    divLetra.setAttribute("id", `${i}`);
    areaPalabra.appendChild(divLetra);
  }

  return areaLetras;
};

const crearBotonesLetras = () => {
  const abecedario = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const botonera = document.createElement("div");
  botonera.classList.add("botonera");

  abecedario.forEach((letra) => {
    let boton = document.createElement("button");
    boton.classList.add("boton-letra");
    boton.setAttribute("id", letra);
    boton.textContent = letra;
    boton.addEventListener("click", () => {
      compararLetras(boton.textContent);
      boton.disabled = true;
    });
    botonera.appendChild(boton);
  });

  return botonera;
};

const compararLetras = (letra) => {
  let letraEncontrada = false;
  let palabra = palabraAAdivinar;

  for (let i = 0; i < palabra.length; i++) {
    if (palabraNormalizada[i] == letra) {
      aciertos++;
      letraEncontrada = true;
      document.getElementById(`${i}`).textContent = palabra[i];
    }
  }

  if (!letraEncontrada) {
    errores++;
    dibujar(
      document.getElementById("canvas-ahorcado").getContext("2d"),
      errores
    );
  }

  if (aciertos == palabraAAdivinar.length) {
    silenciar.classList.toggle("hidden");
    let areaLetras = document.getElementById("area-letras");
    areaLetras.innerHTML = "";
    let ganaste = document.createElement("img");
    ganaste.setAttribute("src", "./imagenes/funny-celebrate-8.webp");
    ganaste.setAttribute("alt", "¡Ganaste!");
    areaLetras.appendChild(ganaste);
    let mensaje = document.createElement("p");
    mensaje.textContent = `La palabra era ${palabraAAdivinar}`;
    mensaje.classList.add("mensaje-final");
    areaLetras.appendChild(mensaje);
    sonido.pause();
    win.loop = true;
    win.play();
    areaLetras.appendChild(menuJugarNuevamente());
  }
};

const menuJugarNuevamente = () => {
  let divMenu = document.createElement("div");
  divMenu.classList.add("menu");
  let botonJugarNuevamente = document.createElement("button");
  botonJugarNuevamente.textContent = "Jugar de nuevo";
  let botonTerminar = document.createElement("button");
  botonTerminar.textContent = "Terminar";
  botonJugarNuevamente.addEventListener("click", () => {
    if (win.play) {
      win.pause();
    }
    document.getElementById("contenedor").innerHTML = "";
    errores = 0;
    aciertos = 0;
    iniciarJuego();
  });
  botonTerminar.addEventListener("click", () => {
    window.location = "/juego-ahorcado";
  });
  divMenu.appendChild(botonJugarNuevamente);
  divMenu.appendChild(botonTerminar);

  return divMenu;
};

const header = (logo, titulo) => {
  let cabecera = document.createElement("header");
  cabecera.classList.add("cabecera");

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

const footer = () => {
  let pie_de_pagina = document.createElement("footer");
  pie_de_pagina.classList.add("pie-de-pagina");

  let divContacto = document.createElement("div");
  divContacto.classList.add("contacto");
  divContacto.innerHTML = `    <p><a href="https://www.linkedin.com/in/juan-montivero/"><i class="fa-brands fa-linkedin-in fa-2x"></i></a></p>
  <p><a href="https://www.github.com/juan351"><i class="fa-brands fa-github fa-2x"></i></a></p>`;

  let divCopyright = document.createElement("div");
  divCopyright.classList.add("copyright");
  divCopyright.innerHTML = `<p>&copy Juan Montivero</p>`;

  pie_de_pagina.appendChild(divContacto);
  pie_de_pagina.appendChild(divCopyright);

  return pie_de_pagina;
};

const cargarSonido = (fuente) => {
  const sonido = document.createElement("audio");
  sonido.src = fuente;
  sonido.setAttribute("preload", "auto");
  sonido.setAttribute("controls", "none");
  sonido.style.display = "none"; // <-- oculto
  sonido.setAttribute("id", fuente.slice(fuente.lastIndexOf("/")));
  document.body.appendChild(sonido);

  return sonido;
};

const dibujarCirculo = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, 2 * 3.14);
  ctx.stroke();
};

const dibujarLinea = (ctx, inicialX, inicialY, finalX, finalY, color) => {
  ctx.beginPath();
  ctx.moveTo(inicialX, inicialY);
  ctx.lineTo(finalX, finalY);
  ctx.strokeStyle = color;
  ctx.stroke();
};

const dibujarRectangulo = (ctx, x, y, base, altura, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, base, altura);
};

const dibujarOjosEnCruz = (ctx, xOjo1, yOjo1, xOjo2, yOjo2, color, largo) => {
  dibujarLinea(ctx, xOjo1, yOjo1, xOjo1 + largo, yOjo1 + largo, color);
  dibujarLinea(ctx, xOjo1 + largo, yOjo1, xOjo1, yOjo1 + largo, color);
  dibujarLinea(ctx, xOjo2, yOjo2, xOjo2 + largo, yOjo2 + largo, color);
  dibujarLinea(ctx, xOjo2 + largo, yOjo2, xOjo2, yOjo2 + largo, color);
};
