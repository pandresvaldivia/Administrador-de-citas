import UI from './classes/UI.js'
import CitasDB from './classes/IndexedDB.js'
import {nombreInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    form} from './selectores.js'

const ui = new UI();
const citasDB = new CitasDB();
let modoEditor = false;

const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
};

export function writeData(e) {
    citaObj[e.target.name] = e.target.value;
}

export function agregarCita(e) {
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if (mascota == "" || propietario == "" || telefono == "" || fecha == "" || hora == "" || sintomas == "") {
        ui.imprimirMensaje("Falta llenar campos", "error");

        return;
    }

    if (modoEditor) {

        citasDB.actualizarCita({...citaObj});

        modoEditor = false;
    } else {

        citaObj.id = Date.now();

        citasDB.agregarCita(citaObj);
        
    }

    reiniciarObjeto();

    form.reset();

    ui.vaciarCitas();

    citasDB.obtenerCitas();
}

export function reiniciarObjeto() {
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.sintomas = "";
    citaObj.telefono = "";
}

export function eliminarCita(id) {

    citasDB.eliminarCita(id);

    ui.vaciarCitas();

    citasDB.obtenerCitas();
}

export function cargarEditor(cita) {
    modoEditor = true;

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    nombreInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    form.querySelector('button[type="submit"]').textContent = "Guardar cambios";
}