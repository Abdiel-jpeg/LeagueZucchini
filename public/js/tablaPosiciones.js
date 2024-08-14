
import { getParams } from "/js/fetchParams.js";
import calcularPuntos from '/js/tablaPosiciones/calcularPuntos.js';
import generarTabla from '/js/tablaPosiciones/generarTabla.js';
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

document.getElementById('selectCompeticion').addEventListener("change", async (e) => {
	let tableContainer = document.getElementById('tableContainer');
	let treeRoot = document.getElementById('treeRoot');

	tableContainer.innerHTML = "";
	treeRoot.innerHTML = "";

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
			let lista = await calcularPuntos(nombreCompeticion);
			
			console.log(lista)

			generarTabla(lista);

			break;
		case "Eliminación Directa": 
			await generarArbolBinario(nombreCompeticion);

			break;
	}
})
