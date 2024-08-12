
import { getParams } from "/js/fetchParams.js";
import calcularPuntos from '/js/tablaPosiciones/calcularPuntos.js';
import generarArbolBinario from '/js/tablaPosiciones/arbolBinario.js'

let divTipoCompeticion;
let tbody;

const fetchCompeticion = async () => {
	const response = await fetch('/api/competicion/get/0/0', getParams);
	const json = response.json();
	return json;
}

const fetchTablaPuntaje = async () => {
	const response = await fetch('/api/tablaPuntaje', getParams);
	const json = await response.json();
	return json
}

const insertRow = (item) => {
	//----- Create row -------
	let row = document.createElement("tr"); 
	let posicion = document.createElement("td");
	let equipo = document.createElement("td");
	let grupo = document.createElement("td");
	let partidosGanados = document.createElement("td"); //PG
	let partidosEmpatados = document.createElement("td"); //PE
	let partidosPerdidos = document.createElement("td"); //PP
	let golesAFavor = document.createElement("td"); //GF
	let golesEnContra = document.createElement("td"); //GC
	let diferenciaDeGoles = document.createElement("td"); //Dif
	let puntos = document.createElement("td"); //Puntos

	posicion.appendChild(document.createTextNode(item.posicion));
	equipo.appendChild(document.createTextNode(item.nombreGrupo));
	grupo.appendChild(document.createTextNode(item.grupo));
	partidosGanados.appendChild(document.createTextNode(item.partidosGanados));
	partidosEmpatados.appendChild(document.createTextNode(item.partidosEmpatados));
	partidosPerdidos.appendChild(document.createTextNode(item.partidosPerdidos));
	golesAFavor.appendChild(document.createTextNode(item.golesAFavor));
	golesEnContra.appendChild(document.createTextNode(item.golesEnContra));
	diferenciaDeGoles.appendChild(document.createTextNode(item.diferenciaGoles));
	puntos.appendChild(document.createTextNode(item.puntos));

	row.appendChild(posicion);
	row.appendChild(equipo);
	row.appendChild(grupo);
	row.appendChild(partidosGanados);
	row.appendChild(partidosEmpatados);
	row.appendChild(partidosPerdidos);
	row.appendChild(golesAFavor);
	row.appendChild(golesEnContra);
	row.appendChild(diferenciaDeGoles);
	row.appendChild(puntos);

	tbody.appendChild(row);
}

const addCompeticionToSelect = () => {
	let selectCompeticion = document.getElementById("selectCompeticion");
	divTipoCompeticion = document.getElementById('tipoCompeticion');

	let optionDefault = document.createElement('option');

	optionDefault.setAttribute('value', '');
	optionDefault.setAttribute('selected', 'selected');
	optionDefault.setAttribute('disabled', 'disabled');
	optionDefault.setAttribute('hidden', 'hidden');

	optionDefault.appendChild(document.createTextNode('Selecciona una Competición'));

	selectCompeticion.appendChild(optionDefault);

	fetchCompeticion().then( ( { body } ) => {
		for (let i = 0; i < body.length; i++) {
			let option = document.createElement('option');
			let div = document.createElement('div');

			option.setAttribute('value', body[i].nombreCompeticion);
			div.setAttribute('id', body[i].nombreCompeticion);
			div.setAttribute('class', 'tipoCompeticion');

			div.style.display = "none";

			option.appendChild(document.createTextNode(body[i].nombreCompeticion));
			div.appendChild(document.createTextNode(body[i].nombreTipoCompeticion));

			selectCompeticion.appendChild(option);
			divTipoCompeticion.appendChild(div);
		}
	});
}

window.addEventListener("load", () => {
	tbody = document.getElementById("cuerpo");

	addCompeticionToSelect();
/*
	fetchTablaPuntaje().then( ( { body: row } ) => {
		for (let i = 0; i < row.length; i++) {
			insertRow(row[i]);
		}
	});
	*/
});

document.getElementById('selectCompeticion').addEventListener("change", (e) => {
	let nombreCompeticion = e.target.value;

	const divsClassTipoCompeticion = document.getElementsByClassName('tipoCompeticion');

	for(let i = 0; i < divsClassTipoCompeticion.length; i++) {
		divsClassTipoCompeticion[i].style.display = "none";
	}

	let labelAVisible = document.getElementById(nombreCompeticion)

	labelAVisible.style.display = "flex";

	let tipoCompeticion = labelAVisible.innerHTML

	switch(tipoCompeticion) {
		case 'Regular. Todos contra Todos':
		case "Regular. Ida y Vuelta":
			calcularPuntos(nombreCompeticion);
			break;
		case "Eliminación Directa": 
			generarArbolBinario(nombreCompeticion);

			break;
	}
})
