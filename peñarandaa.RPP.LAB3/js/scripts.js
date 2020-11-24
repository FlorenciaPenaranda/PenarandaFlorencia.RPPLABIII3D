
import crearTabla from "./tabla.js";
import Anuncio from "./anuncio.js";


let listaAnuncios;
let frmAnuncio;

let proximoId;
let divTabla;

const btnGuardar = document.getElementById('btnGuardar');
const btnModificar = document.getElementById('btnModificar');

window.addEventListener('load', inicializarManejadores);


function inicializarManejadores() {

    ocultarBotones();
    listaAnuncios = obtenerAnuncios();

    proximoId = obtenerId();

    divTabla = document.getElementById("divTabla");
    actualizarLista();

    //referencia la formulario
    frmAnuncio = document.forms[0];

    frmAnuncio.addEventListener('submit', e => { // trae referencia del formulario
        e.preventDefault();

        //modificar
        if (e.submitter.id == "btnModificar") {
            var r = confirm("Desea modificar anuncio?");
            if (r == true) {
                listaAnuncios.forEach(element => {
                    if (element.id == JSON.parse(localStorage.getItem('idSeleccionado'))) {
                        element.titulo = frmAnuncio.titulo.value;
                        element.descripcion = frmAnuncio.descripcion.value;
                        element.precio = frmAnuncio.precio.value;
                        element.transaccion = document.querySelector('input[name="gander"]:checked').value;
                        element.puertas = frmAnuncio.num_puertas.value;
                        element.kms = frmAnuncio.num_kms.value;
                        element.potencia = frmAnuncio.num_potencia.value;
                    }
                });
            } else {
                limpiarDatosForm();
            }
            limpiarDatosForm();
            guardarDatos();
            ocultarBotones();
            actualizarLista();

        } else if (e.submitter.id == "btnEliminar") {
            var r = confirm("Desea eliminar anuncio?");
            if (r == true) {
                eliminarDatos(localStorage.getItem('idSeleccionado'));
                guardarDatos();
                actualizarLista();
                limpiarDatosForm();
                document.getElementById('btnGuardar').style.visibility = 'hidden';
                ocultarBotones();
            } else {
                ocultarBotones();
                actualizarLista();
                limpiarDatosForm();
            }

        } else if (e.submitter.id == "btnCancelar") {
            var r = confirm("Desea cancelar la operacion?");
            if (r == true) {
                ocultarBotones();
                actualizarLista();
                limpiarDatosForm();
            } else {
                ocultarBotones();
                actualizarLista();
                limpiarDatosForm();
            }
        }
        else {//guardar

            const nuevoAnuncio = altaAnuncio();
            if (nuevoAnuncio) {
                listaAnuncios.push(nuevoAnuncio);
                proximoId++;
                guardarDatos();
                localStorage.setItem('nextId', proximoId);
                actualizarLista();
                limpiarDatosForm();
            }
        }
    });

}

function obtenerAnuncios(lista) { //se fija si en el local stoare si ya hay cargada una lista y la va a leer, o la inicializar una lista vacia

    return JSON.parse(localStorage.getItem('anuncio')) || [];
}

function obtenerId() {
    //se fija si en el local stoare si ya hay cargada una lista y la va a leer, o la inicializar una lista vacia

    return JSON.parse(localStorage.getItem('nextId')) || 1;
}


function altaAnuncio() {// hacer en la lase persona

    const nuevoAnuncio = new Anuncio(proximoId,
        frmAnuncio.titulo.value,
        document.querySelector('input[name="gander"]:checked').value,
        frmAnuncio.descripcion.value,
        frmAnuncio.precio.value,
        document.querySelector("#num_puertas").value,
        document.querySelector("#num_kms").value,
        document.querySelector("#num_potencia").value

    ); // construirlo con lo que tomamos del frm.Persona

    //una vez que agrego una persona la agrego a al lista 
    console.log(nuevoAnuncio);
    return nuevoAnuncio;

}

function eliminarDatos(id) {// hacer en la lase persona

    console.log(id);
    listaAnuncios = listaAnuncios.filter(x => {
        return x.id != id;
    })
    actualizarLista();
    guardarDatos();
}

function guardarDatos() {
    localStorage.setItem('anuncio', JSON.stringify(listaAnuncios));
}

function actualizarLista() {
    divTabla.innerHTML = ""  //elimina el constenido de MUY mala forma. MEJORAR

    document.getElementById("divTabla").innerHTML = '<img src="../img/spinner.gif" >'

    setTimeout(() => {

        divTabla.innerHTML = "";
        divTabla.appendChild(crearTabla(listaAnuncios));

    }, 700);

}

function limpiarDatosForm() {
    frmAnuncio.reset();
    /*frmAnuncio.titulo.value = "";
    document.querySelector('input[name="gander"]:checked').value = 
    frmAnuncio.descripcion.value = "";
    frmAnuncio.precio.value = "";
    document.querySelector("#num_puertas").value = "";
    document.querySelector("#num_kms").value = "";
    document.querySelector("#num_potencia").value = "";*/
}

function ocultarBotones() {
    document.getElementById('btnGuardar').style.visibility = 'visible';
    document.getElementById('btnEliminar').style.visibility = 'hidden';
    document.getElementById('btnCancelar').style.visibility = 'hidden';
    document.getElementById('btnModificar').style.visibility = 'hidden';
}



export default function cargarFormulario() {

    listaAnuncios.forEach(element => {
        if (element.id == JSON.parse(localStorage.getItem('idSeleccionado'))) {
            document.getElementById('txtTitulo').value = element.titulo;

            if (element.transaccion == "Venta") {
                document.getElementById("rDoV").checked = true;
            } else {
                document.getElementById("rDoA").checked = true;
            }
            document.getElementById('txtDescripcion').value = element.descripcion;
            document.getElementById('txtPrecio').value = element.precio;
            document.getElementById('num_puertas').value = element.puertas;
            document.getElementById('num_kms').value = element.kms;
            document.getElementById('num_potencia').value = element.potencia;
        }
    });

}








