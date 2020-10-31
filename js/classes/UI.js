import {cargarEditor, eliminarCita} from '../funciones.js';
import {citasContainer} from '../selectores.js'

class UI {
    imprimirMensaje(mensaje, tipo) {
        if (!document.getElementById("mensaje")) {
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("text-center", "alert", "d-block", "col-12");
            divMensaje.textContent = mensaje;
            divMensaje.id = "mensaje";

            if (tipo == "error") {
                divMensaje.classList.add("alert-danger");
            } else {
                divMensaje.classList.add("alert-success");
            }

            document.getElementById("contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

            setTimeout(() => {
                divMensaje.remove();
            }, 2000);
        }
    }

    imprimirCitas(cita) {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement("div");

            divCita.classList.add("cita", "p-3");

            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement("h2");
            mascotaParrafo.classList.add("card-title", "font-weight-bolder");
            mascotaParrafo.textContent = mascota;

            const telefonoParrafo = document.createElement("p");
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Teléfono: </span>${telefono}
            `;

            const fechaParrafo = document.createElement("p");
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span>${fecha}
            `;

            const horaParrafo = document.createElement("p");
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span>${hora}
            `;

            const sintomasParrafo = document.createElement("p");
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Síntomas: </span>${sintomas}
            `;

            const propietarioParrafo = document.createElement("p");
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span>${propietario}
            `;

            const eliminarBtn = document.createElement("button");
            eliminarBtn.classList.add("btn", "btn-danger", "mr-2");
            eliminarBtn.innerHTML =
                'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

            eliminarBtn.onclick = () => {
                eliminarCita(id);
            };

            const editarBtn = document.createElement("button");
            editarBtn.classList.add("btn", "btn-info");
            editarBtn.innerHTML =
                'Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>';

            editarBtn.onclick = () => {
                cargarEditor(cita);
            };

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(eliminarBtn);
            divCita.appendChild(editarBtn);

            citasContainer.appendChild(divCita);
    }
    vaciarCitas() {
        while (citasContainer.firstChild) {
            citasContainer.firstChild.remove();
        }
    }
}
export default UI;