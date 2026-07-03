import { Habitacion } from "../../dominio/Habitacion";
import { Hotel } from "../../dominio/Hotel";
import { ValidationException } from "../../infraestructura/exceptions/ValidationError";

export class FiltrarHabitacionesDisponiblesUseCase {
    execute(hotel: Hotel, data: {capacidad: number, fechaInicio: string, fechaFin: string}): Habitacion[] {
        const fechaInicio = new Date(data.fechaInicio);
        const fechaFin = new Date(data.fechaFin);

        if(!data.capacidad || data.capacidad <= 0) {
            throw new ValidationException('La capacidad debe ser mayor a 0');
        }

        if(isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
            throw new ValidationException('Las fechas no son validas');
        }

        if(fechaInicio >= fechaFin) {
            throw new ValidationException('La fecha de inicio debe ser menor a la fecha fin');
        }

        return hotel.filtrarHabitacionesDisponibles(data.capacidad, fechaInicio, fechaFin);
    }
}
