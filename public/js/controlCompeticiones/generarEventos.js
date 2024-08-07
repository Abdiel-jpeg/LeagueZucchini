
import { getParams, getQueryParams } from '/js/fetchParams.js';

//------------------- AREA API--------------------

const fetchCompeticionParticipantes = async (nombreCompeticion) => {
	const response = await fetch(`/api/competicion/participantes/${nombreCompeticion}`);
	const json = response.json()
	return json;
}

const fetchAddCompeticionEliminacionDirectaParticipante = async (subEvento, nombreCompeticion) => {
	const query = {
		"idCompeticionEliminacionDirectaParticipante": subEvento[0],
		"idEquipo1": subEvento[1],
		"idEquipo2": subEvento[2],
		"idLinkTo": subEvento[3] == undefined ? "null" : subEvento[3],
		"nombreCompeticion": nombreCompeticion
	}

	const response = await fetch('/api/competicion/eliminacionDirecta/participantes/', getQueryParams('POST', query))
	const json = response.json();
	return json;
}

const fetchDelCompeticionEliminacionDirectaParticipante = async (nombreCompeticion) => {
	const query = {
		"nombreCompeticion": nombreCompeticion
	}

	const response = await fetch(`/api/competicion/eliminacionDirecta/participantes/`, getQueryParams('DELETE', query))
	const json = response.json();
	return json;
}

const fetchAddEvento = async (nombreEvento, idEquipo1, idEquipo2, nombreCompeticion) => {
	const query = {
		"nombreEvento": nombreEvento,
		"idEquipo1": idEquipo1,
		"idEquipo2": idEquipo2,
		"nombreCompeticion": nombreCompeticion
	}

	const response = await fetch('/api/evento/', getQueryParams('POST', query));
	const json = response.json();
	return json;
}

const fetchDelEvento = async (nombreCompeticion) => {
	const query = {"nombreCompeticion": nombreCompeticion}

	const response = await fetch('/api/evento', getQueryParams('DELETE', query));
	const json = response.json();
	return json;
}

//---------------- AREA CODIGO ------------------

const generarEventos = async (nombreCompeticion) => {
	const { body } = await fetchCompeticionParticipantes(nombreCompeticion);

	switch(body[0].nombreTipoCompeticion) {
		case "Eliminación Directa": eliminacionDirecta(body, nombreCompeticion);
			break;
		case "Regular. Todos contra Todos": todosContraTodos(body, nombreCompeticion)
			break;
		case "Regular. Ida y Vuelta": idaYVuelta(body, nombreCompeticion);
	}
}

const eliminacionDirecta = async (body, nombreCompeticion) => {
	await fetchDelCompeticionEliminacionDirectaParticipante(nombreCompeticion);

	let nLink = 0;

	const total = body.length;

	let events = []

	console.log(2 / 2 + 2 % 2);

	let nivel = 0;

	const asignEvents = (total, link = -1, parent) => {
		let currentParent = nLink;
		let storedNLink = nLink;
		
		if (total == 2) {
			nivel = nivel + 2;
		}

		if (total == 3) {
			nivel++;
		}

		let subNivel = {
			equipo1: total == 2 ? "asignado" : "",
			equipo2: total == 2 ? "asignado" : "",
			nivel: nivel
		}

		let subTotal1 = Math.floor(total / 2)
		let subTotal2 = subTotal1 + (total % 2)

		console.log(`Numero iteracion ${storedNLink}`);
		console.log(link)
		console.log(`SubTotal 1: ${total == 2 ? body[nivel - 2].idEquipo : subTotal1}`);
		console.log(`SubTotal 2: ${total == 2 || total == 3 ? body[nivel - 1].idEquipo : subTotal2}`)
		console.log(`total en subequipos: ${total}`)
		console.log('parent:', parent)
		console.log('/****----------------------//---------------------**/')
		//console.log(`Nivel padre: ${nivel}`)

		let subEvent = [
			nLink,
			total == 2 ? body[nivel - 2].idEquipo : "null",
			total == 2 || total == 3 ? body[nivel - 1].idEquipo : "null",
			parent
		]

		events.push(subEvent);

		fetchAddCompeticionEliminacionDirectaParticipante(subEvent, nombreCompeticion);

		nLink++;
		link++;

		if (subTotal1 == 1) {		
			if (subTotal2 == 1) {
				return 0;
			}
			asignEvents(subTotal2, storedNLink, currentParent)
			return 0;
		}

		asignEvents(subTotal1, storedNLink, currentParent)
		asignEvents(subTotal2, storedNLink, currentParent)
	}

	asignEvents(total)
	console.log(events)

	generarEventosEliminacionDirecta(events, nombreCompeticion);
}

const todosContraTodos = (body, nombreCompeticion) => {
	let eventos = []

	for(let i = 0; i < body.length; i++) {
		for (let j = i + 1; j < body.length; j++) {
			let nombreEvento = body[i].idEquipo + ' vs ' + body[j].idEquipo;
			eventos.push([nombreEvento, body[i].idEquipo, body[j].idEquipo])
		}
	}

	console.log(eventos)
	
	generarEventosTodosContraTodos(eventos, nombreCompeticion);
}

const idaYVuelta = (body, nombreCompeticion) => {
	let eventos = []

	for(let i = 0; i < body.length; i++) {
		for (let j = i + 1; j < body.length; j++) {
			let idEquipoCasa1 =  body[i].idEquipo;
			let idEquipoCasa2 =  body[j].idEquipo;
			let idEquipoVisitante1 = body[j].idEquipo;
			let idEquipoVisitante2 =  body[i].idEquipo;


			let nombreEventoCasa = `${idEquipoCasa1} vs ${idEquipoCasa2}`;
			let nombreEventoVisitante = `${idEquipoVisitante1} vs ${idEquipoVisitante2}`;

			eventos.push([
				nombreEventoCasa, idEquipoCasa1, idEquipoCasa2,
			], [
				nombreEventoVisitante, idEquipoVisitante1, idEquipoVisitante2
			])
		}
	}

	console.log(eventos);

	generarEventosIdaYVuelta(eventos, nombreCompeticion);
}

const generarEventosEliminacionDirecta = (elementos, nombreCompeticion) => {
	fetchDelEvento(nombreCompeticion);

	for(let i = 0; i < elementos.length; i++) {
		let nombreEvento;
		let idEquipo1 = elementos[i][1]
		let idEquipo2 = elementos[i][2]

		nombreEvento = `${idEquipo1} vs ${idEquipo2}`;

		if(idEquipo1 == "null") {
			nombreEvento = '';
		}

		fetchAddEvento(nombreEvento, idEquipo1, idEquipo2, nombreCompeticion);
	}
}

const generarEventosTodosContraTodos = (elementos, nombreCompeticion) => {
	fetchDelEvento(nombreCompeticion);

	for(let i = 0; i < elementos.length; i++) {
		let nombreEvento = elementos[i][0]
		let idEquipo1 = elementos[i][1]
		let idEquipo2 = elementos[i][2]

		fetchAddEvento(nombreEvento, idEquipo1, idEquipo2, nombreCompeticion)
	}
}

const generarEventosIdaYVuelta = (elementos, nombreCompeticion) => {
	fetchDelEvento(nombreCompeticion);

	for(let i = 0; i < elementos.length; i++) {
		let nombreEvento = elementos[i][0]
		let idEquipo1 = elementos[i][1]
		let idEquipo2 = elementos[i][2]

		fetchAddEvento(nombreEvento, idEquipo1, idEquipo2, nombreCompeticion)
	}
}

export default generarEventos;
