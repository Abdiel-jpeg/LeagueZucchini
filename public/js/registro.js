import { getParams } from "/js/fetchParams.js";

let formRegistro;

const fetchRegion = async () => {
	const response = await fetch('/api/region', getParams);
	const json = await response.json();
	return json;
}

const insertRow = (item) => {
	let row = document.createElement('div');
	row.appendChild(document.createTextNode(item.nombreRegion));

	formRegistro.appendChild(row);
}

const addNewRegistro = async () => {
	const registro = document.getElementById("nombreNuevoRegistro");

	console.log(registro.value);
}

window.addEventListener("load", () => {
	document.getElementById("nombreDelRegistro").appendChild(document.createTextNode("Registrar nueva region"));
	formRegistro = document.getElementById("formRegistro");

	fetchRegion().then(({ body }) => {
		for(let i = 0; i < body.length; i++) {
			insertRow(body[i]);
		}
	});
});

document.getElementById("nuevoRegistro").addEventListener("click", (e) => {
	e.preventDefault();
	addNewRegistro();
})
