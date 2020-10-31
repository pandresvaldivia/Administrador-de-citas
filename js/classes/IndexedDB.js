import UI from '../classes/UI.js'
import {form} from '../selectores.js'

const ui = new UI();

class CitasDB{
    constructor(){
        this.database = undefined;
        this.createDB();
    }
    createDB() {
        const citas = indexedDB.open('citas', 1);
        citas.onerror = ()=>{
            console.error('Error al crear la base de datos');
        }
        citas.onsuccess = ()=>{
            console.log('Base de datos "citas" creada');
            
            this.database = citas.result;
        }
    
        citas.onupgradeneeded = (e)=>{

            const db = e.target.result;
            const objStore = db.createObjectStore('citas',{
                keyPath: 'id'
            })
            
            objStore.createIndex('mascota', 'mascota', {unique:false});
            objStore.createIndex('propietario', 'propietario', {unique:false});
            objStore.createIndex('telefono', 'telefono', {unique:false});
            objStore.createIndex('fecha', 'fecha', {unique:false});
            objStore.createIndex('hora', 'hora', {unique:false});
            objStore.createIndex('sintomas', 'sintomas', {unique:false});
        }
    }
    agregarCita(citaObj){
        const transaction = this.database.transaction(['citas'], "readwrite");
    
        transaction.oncomplete =()=>{
            console.log('Transaccion creada con exito');
        }
    
        transaction.onerror = ()=>{
            console.error('Error al crear la transaccion');
        }
    
        const objStore = transaction.objectStore('citas');
    
        const request = objStore.add(citaObj);
    
        request.onsuccess = (e)=>{
            console.log(`Cita agragada con exito. ID: ${e.target.result}`);
            ui.imprimirMensaje("Cita agregada correctamente");
        }
    
        request.onerror = ()=>{
            console.error('Error al agregar la cita');
        }
    }
    obtenerCitas(){
        const objStore = this.database.transaction('citas').objectStore('citas');
    
        objStore.openCursor().onsuccess = (e)=>{
            let cursor = e.target.result;
            if(cursor){
                ui.imprimirCitas(cursor.value)
                cursor.continue();
            }
        }
    }
    actualizarCita(citaObj){
        const transaction = this.database.transaction(['citas'], 'readwrite');
        const objStore = transaction.objectStore('citas');
    
        transaction.oncomplete =()=>{
            console.log('Transaccion creada con exito');
        }
    
        transaction.onerror = ()=>{
            console.error('Error al crear la transaccion');
        }
    
        const request = objStore.put(citaObj);
        request.onsuccess = (e)=>{
            console.log(`Cita Actualizada con exito. ID: ${e.target.result}`);
            form.querySelector('button[type="submit"]').textContent = "Crear Cita";
            ui.imprimirMensaje("Cita actualizada correctamente");
        }
        request.onerror = ()=>{
            console.log('Error al actualizar la cita');
        }
    
    }
    eliminarCita(id){
        const request = this.database.transaction(['citas'], 'readwrite').objectStore('citas').delete(id);
    
        request.onsuccess = ()=>{
            console.log('Cita eliminada con exito');
        }
        request.onerror = ()=>{
            console.log('Error al eliminar cita');
        }
    }
}

export default CitasDB;