import { header} from './components/header.js'
import { main } from './components/main.js'
import { footer } from './components/footer.js'

window.addEventListener('load',()=>{
    root = document.getElementById("root");
    root.appendChild(header("imagenes/logo.png", "El ahorcadito"));
    root.appendChild(main());
    root.appendChild(footer());

});