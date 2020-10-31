class Citas {
    constructor() {
        this.citas = [];
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }
    eliminarCita(idCita) {
        this.citas = this.citas.filter(({ id }) => id != idCita);
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => (cita.id === citaActualizada.id ? citaActualizada : cita));
    }
}

export default Citas;