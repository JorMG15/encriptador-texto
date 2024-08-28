
const textarea = document.querySelector('.form__input');
const imagenpersona = document.querySelector('.result__image');
const loader = document.querySelector(".loader");
const resulttitle = document.querySelector(".result__title");
const resulttext = document.querySelector(".result_text");
const botonencriptar = document.querySelector(".submit__container");
const botondesencriptar = document.querySelector(".submit__container + .submit__container");
const botoncopiar = document.querySelector(".submit__container__copy");


// (Objeto) Par clave/valor
const llaves = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

function encriptarmensaje(mensaje) {
    let mensajencriptado = "";

    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        
        // Comprueba si la letra está en el objeto llaves
        if (llaves[letra]) {
            mensajencriptado += llaves[letra];  // Si está, añade la versión encriptada
        } else {
            mensajencriptado += letra;  // Si no está, añade la letra original
        }
    }
    
    return mensajencriptado;
}

function desencriptarmensaje(mensaje) {
    let mensajedesencriptado = mensaje;
    for (const [letra, encriptado] of Object.entries(llaves)) {
        let regex = new RegExp(encriptado, 'g');
        mensajedesencriptado = mensajedesencriptado.replace(regex, letra);
    }
    return mensajedesencriptado;
}

textarea.addEventListener("input", ()=>{
    imagenpersona.style.display = "none";
    loader.classList.remove("hidden");
    resulttitle.textContent = "Capturando mensaje";
    resulttext.textContent = "";
})

botonencriptar.addEventListener("click", (event)=>{ 
    event.preventDefault();
    let mensaje = textarea.value.toLowerCase();
    let mensajeencriptado = encriptarmensaje(mensaje);
    resulttext.textContent = mensajeencriptado;
    botoncopiar.style.display='block';
    resulttitle.textContent = "El resultado es: ";
})      

botondesencriptar.addEventListener("click", (event)=>{
    event.preventDefault();
    let mensaje = textarea.value.toLowerCase();
    let mensajedesencriptado = desencriptarmensaje(mensaje);
    resulttext.textContent = mensajedesencriptado;
    resulttitle.textContent = "El texto desencriptado es: ";
    loader.classList.add('hidden'); 
    botoncopiar.style.display='block';
})
botoncopiar.addEventListener("click", ()=>{
    let portapapeles = resulttext.textContent;
    navigator.clipboard.writeText(portapapeles).then(()=>{
        imagenpersona.style.display='block';
        loader.classList.add('hidden');
        resulttitle.textContent = "El texto se copió";
        botoncopiar.style.display = "none"
        resulttext.textContent = ""
    });
})