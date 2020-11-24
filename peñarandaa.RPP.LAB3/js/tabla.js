import cargarFormulario from "./scripts.js";

let idSeleccionado;


export default function crearTabla(lista) {
    //llama a crear cabecera y agregar manejadores
    const tabla = document.createElement('table'); //creo el elemento tabla

    tabla.appendChild(crearCabecera(lista[0])); //appendChild inyecta la cabecera en la tabla
    tabla.appendChild(crearCuerpo(lista)); // lo mismo al body

    
    return tabla;
}

function crearCabecera(item) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) { // key es la clave 
        const th = document.createElement('th'); // crea las columnas con  los key
        const texto = document.createTextNode(key);

        th.appendChild(texto);
        tr.appendChild(th);
    }
    thead.appendChild(tr); // agrega al head su tr, y sus th con las key creando la cabecera completa
    return thead;
}


function crearCuerpo(lista) {
    const tbody = document.createElement('tbody');

    lista.forEach(element => { //los array tiene for each
        const tr = document.createElement('tr');


        for (const key in element) { //los elementos los recorro con un forin
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }
        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id']);
            // tr.dataset.id =   element['id'];  //otra forma
        }
        agregarManejadorTR(tr);//le agrego el manejador 
        tbody.appendChild(tr);

    });
    return tbody;
}

function agregarManejadorTR(tr) {//deberia preguntar que no sea null el elemento al que queremos agregar el manjeador
    if (tr) {
        tr.addEventListener('click', function (e) {
            document.getElementById('btnGuardar').style.visibility = 'hidden';
            document.getElementById('btnModificar').style.visibility = 'visible';
            document.getElementById('btnEliminar').style.visibility = 'visible';
            document.getElementById('btnCancelar').style.visibility = 'visible';

            idSeleccionado = e.target.parentNode.dataset.id;
            //console.log(idSeleccionado);  
            localStorage.setItem('idSeleccionado',idSeleccionado);
            cargarFormulario();


            //alert(e.target.parentNode.dataset.id) // otra manera de obtener el id

        }); //atajo el evento

    }


}