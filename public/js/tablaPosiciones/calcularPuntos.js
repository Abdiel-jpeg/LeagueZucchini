
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

	console.log(bodyEvento)

	console.log(bodyParticipante)

	let participantes = [];

	for(let i = 0; i < bodyParticipante.length; i++) {
		let subParticipante = {
			idEquipo: bodyParticipante[i].idEquipo,
			posicion: null,
			puntos: 0,
			partidosGanados: 0,
			partidosPerdidos: 0,
			partidosEmpatados: 0,
			golesAFavor: 0,
			golesEncontra: 0,
			diferienciaGoles: 0,
		}
		
		participantes[i] = subParticipante
	} 

	console.log(participantes)

	for(let i = 0; i < bodyEvento.length; i++) { //Recorrer Eventos
		participantes.forEach( participante => { //Si algun participante en especifico se encuentra en el evento
			if(bodyEvento[i].idEquipo1 == participante.idEquipo) {
				participante.puntos += bodyEvento[i].puntosEquipo1
			}
		} );
	}
}

export default calcularPuntos;
