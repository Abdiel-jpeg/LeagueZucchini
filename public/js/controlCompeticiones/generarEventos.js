
import { getParams } from '/js/fetchParams.js';

//------------------- AREA API--------------------

const fetchCompeticionParticipantes = async (nombreCompeticion) => {
	const response = await fetch(`/api/competicion/participantes/${nombreCompeticion}`);
	const json = response.json()
	return json;
}

//---------------- AREA CODIGO ------------------

const generarEventos = async(nombreCompeticion) => {
	const { body } = await fetchCompeticionParticipantes(nombreCompeticion);

	switch(body[0].nombreTipoCompeticion) {
		case "Eliminación Directa": eliminacionDirecta(body);
			break;
	}
}

const eliminacionDirecta = async (body) => {
	let nLink = 0;

	const total = body.length;

	let parentEvent = {
		equipo1: "",
		equipo2: "",
		nOfSubEquipos: 10
	}

	console.log(2 / 2 + 2 % 2);

	const asignEvents = (total, nivel) => {
		let subNivel = {
			equipo1: total == 2 ? "asignado" : "",
			equipo2: total == 2 ? "asignado" : "",
			nivel: nivel
		}

		let subTotal1 = Math.floor(total / 2)
		let subTotal2 = subTotal1 + (total % 2)

		console.log(`Nivel ${nLink}`);
		console.log(`SubTotal 1: ${subTotal1}`);
		console.log(`SubTotal 2: ${subTotal2}`)
		console.log(`total en subequipos: ${total}`)
		console.log(`Nivel padre: ${nivel}`)

		nLink++;
		nivel++;
		
		console.log(subNivel);

		if (subTotal1 == 1) {		
			if (subTotal2 == 1) {
				return 0;
			}
			asignEvents(subTotal2, nivel)
			return 0;
		}

		asignEvents(subTotal1, nivel)
		asignEvents(subTotal2, nivel)
	}

	asignEvents(total, -1)
	console.log(parentEvent);
}

export default generarEventos;
