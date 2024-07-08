
import { getParams } from "/js/fetchParams.js";

let tbody;

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


window.addEventListener("load", () => {
	tbody = document.getElementById("cuerpo");

	fetchTablaPuntaje().then( ( { body: row } ) => {
		console.log(row[0]);
		for (let i = 0; i < row.length; i++) {
			insertRow(row[i]);
		}
	});
});
