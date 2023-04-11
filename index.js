//selectores 
const texto = document.getElementById('text');
const textoEncriptado = document.getElementById('text-en');
const copiarTexto = document.querySelector('.copy');
const encriptador = document.querySelector('.encript');
const desencriptador = document.querySelector('.desencript');
const img = document.querySelector('img');

//objeto que sirve como base para comparar el texto
//que se va a encriptar
const referencia = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

//variable que se usara para guardar el texto sin encriptar
let textoAnterior = '';

//funciones
const encriptarTexto = (text) => {

    let textoE = '';

    for(let i = 0; i < text.length; i++) {
        //se pregunta si el objeto "referencia" tiene
        //una propiedad igual a un caracter del texto escrito
        if(referencia.hasOwnProperty(text[i])) {
            //si se cumple, ese caracter pasa a ser igual a el valor
            //que tiene el objeto
            text[i] = referencia[text[i]];
        }
        //se va añadiendo cada caracter a una nueva variable
        textoE += text[i];
    }

    //retorno la variable final del texto ya encriptado
    return textoE;
}

const textoCopiado = (str) => {
    return navigator.clipboard.writeText(str);
}


//eventos
encriptador.addEventListener('click', e => {

    //si los contenedores de texto estan vacios o no
    //no se hace nada
    if(texto.value == '') {
        return;
    }

    //borro lo que haya dentro del contenedor antes
    //por si ya hay un texto y asi no juntarlos
    textoEncriptado.value = '';

    //guardo primero el texto en la variable antes de 
    //convertirlo en un array
    textoAnterior = texto.value;
    //convierto el texto en array para pasarselo ala funcion
    let arTexto = texto.value.split('');
    //el value del contenedor pasa a ser el texto ya encriptado
    textoEncriptado.value = `${encriptarTexto(arTexto)}`;
    texto.value = '';
    img.style.display = 'none';
    copiarTexto.style.display = 'block';
});

desencriptador.addEventListener('click', e => {

    //si los contenedores de texto estan vacios o no
    //no se hace nada
    if(textoEncriptado.value == '') {
        return;
    }
    if(texto.value !== '') {
        return;
    }

    //el valor vuelve a ser el inicial gracias ala variable
    //que guardo el texto al inicio
    texto.value = textoAnterior;
    textoEncriptado.value = '';
    img.style.display = 'block';
    copiarTexto.style.display = 'none';
    textoEncriptado.style.background = 'transparent';
});

copiarTexto.addEventListener('click', e=> {
    //simulo que fue seleccionado el texto
    textoEncriptado.style.background = 'white';
    textoCopiado(textoEncriptado.value);
})