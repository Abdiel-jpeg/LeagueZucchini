
import { getQueryParams, getParams } from '/js/fetchParams.js';

//------------------------- AREA API FETCH ---------------------

const fetchEvento = async (nombreCompeticion) => {
	const response = await fetch(`/api/evento/${nombreCompeticion}/0/0`);
	const json = response.json()
	return json;
}

const fetchParticipantes = async (nombreCompeticion) => {
	const response = await fetch(`/api/competicion/participantes/${nombreCompeticion}`)
	const json = response.json();
	return json;
}

//------------------------- AREA CODIGO -------------------------

const calcularPuntos = async (nombreCompeticion) => {
	const { body: bodyEvento } = await fetchEvento(nombreCompeticion);
	const { body: bodyParticipante } = await fetchParticipantes(nombreCompeticion);

	let participantes = [];
	
	//Obtener a los participantes par asignarles puntos
	for(let i = 0; i < bodyParticipante.length; i++) {
		let subParticipante = {
			participante: bodyParticipante[i],
			posicion: null,
			puntos: 0,
			partidosGanados: 0,
			partidosPerdidos: 0,
			partidosEmpatados: 0,
			golesAFavor: 0,
			golesEnContra: 0,
			diferenciaGoles: 0,
		}
		
		participantes[i] = subParticipante
	} 

	for(let i = 0; i < bodyEvento.length; i++) { //Recorrer Eventos
		let evento = bodyEvento[i]

		participantes.forEach( participante => { //Si algun participante en especifico se encuentra en el evento
			//Si es el que encontramos es el de la izquierda
			if(evento.idEquipo1 == participante.participante.idEquipo) {
				//Contador puntos
				participante.puntos += evento.puntosEquipo1;
				
				//Contador partidos ganados, perdidos y empatados
				if(evento.esPartidoEmpatado) {
					participante.partidosEmpatados++;
				} else if(evento.ganadorPartido == "Equipo 1") {
					participante.partidosGanados++;
				} else if(evento.ganadorPartido == "Equipo 2") {
					participante.partidosPerdidos++;
				}

				//Contador goles
				participante.golesAFavor += evento.golesEquipo1;
				participante.golesEnContra += evento.golesEquipo2;
				participante.diferenciaGoles = participante.golesAFavor - participante.golesEnContra;

			//O si es el de la derecha
			} else if(evento.idEquipo2 == participante.participante.idEquipo) {
				//Contador puntos
				participante.puntos += evento.puntosEquipo2;

				//Contador partidos ganados, perdidos y empatados
				if(evento.esPartidoEmpatado) {
					participante.partidosEmpatados++;
				} else if(evento.ganadorPartido == 'Equipo 1') {
					participante.partidosPerdidos++;
				} else if(evento.ganadorPartido == 'Equipo 2') {
					participante.partidosGanados++;
				}

				//Contador goles
				participante.golesAFavor += evento.golesEquipo2;
				participante.golesEnContra += evento.golesEquipo1;
				participante.diferenciaGoles = participante.golesAFavor - participante.golesEnContra;
			}
		} );
	}

	//Algoritmo de ordenamiento rapido
	
	const quicksort = (arr) => {
		if(arr.length == 0) return [] //Detenerse cuando ya no haya mas elementos que ordenar
		if(arr.length == 1) return arr //Si solo hay un numero que ordnar, devuelvelo, no hay nada que hacer

		let i = Math.floor(arr.length/2); //Obtener la posicion del pivote, numero entero
		let pivot = arr[i]; //Obtenemos el pivote
		arr.splice(i, 1); //Eliminamos el pivote de la lista

		return [
			...quicksort(arr.filter(y => y.puntos > pivot.puntos)),
			pivot,
			...quicksort(arr.filter(y => y.puntos <= pivot.puntos))
		]
	}

	participantes = quicksort(participantes)

	return participantes;
}

export default calcularPuntos;
