import {agregarCita, writeData} from '../funciones.js'
import CitasDB from './IndexedDB.js'
import {nombreInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    form} from '../selectores.js'

class App{
    constructor(){
        this.initApp()
    }
    initApp(){
        nombreInput.addEventListener("input", writeData);
        propietarioInput.addEventListener("input", writeData);
        telefonoInput.addEventListener("input", writeData);
        fechaInput.addEventListener("input", writeData);
        horaInput.addEventListener("input", writeData);
        sintomasInput.addEventListener("input", writeData);
        form.addEventListener("submit", agregarCita);

        const citasDB = new CitasDB();
        setTimeout(() => {
                citasDB.obtenerCitas();
        }, 1000);
    }
}

export default App;