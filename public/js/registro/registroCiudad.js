
import { getParams, getQueryParams } from '/js/fetchParams.js';

let moduloCiudad = document.getElementsByClassName('moduloCiudad')[0];
let	popup = document.getElementsByClassName("popup")[0];
let	popupContent = document.getElementsByClassName("popup-content")[0];

let count = 0;
let limit = 10;
let offset = 0;

let isBusqueda = false;
let busqueda = "";

//----------------------- AREA API  -----------------------------

const fetchCiudad = async () => {
	const response = await fetch(`/api/ciudad/get/${limit}/${offset}`, getParams);
	const json = await response.json();
	return json;
}

const fetchRegion = async () => {
	const response = await fetch('/api/region/get/0/0', getParams);
	const json = await response.json();
	return json;
}

const fetchSearchCiudad = async (nombreCiudad) => {
	const response = await fetch(`/api/ciudad/search/${nombreCiudad}/${limit}/${offset}`);
	const json = await response.json();
	return json;
}

const fetchAddCiudad = async (nombreCiudad, nombreRegion) => {
	const query = {
		"nombreCiudad": nombreCiudad,
		"nombreRegion": nombreRegion,
	}

	const response = await fetch('/api/ciudad', getQueryParams('POST', query));
	const json = await response.json();
	return json;
}

const fetchDelCiudad = async (nombreCiudad, nombreRegion) => {
	const query = {
		"nombreCiudad": nombreCiudad,
		"nombreRegion": nombreRegion
	}

	const response = await fetch('/api/ciudad', getQueryParams('DELETE', query));
	const json = await response.json();
	return json;
}

const fetchUpdateCiudad = async (nuevoNombreCiudad, nuevoNombreRegion, nombreCiudad, nombreRegion) => {
	const query = {
		"nuevoNombreCiudad": nuevoNombreCiudad,
		"nuevoNombreRegion": nuevoNombreRegion,
		"nombreCiudad": nombreCiudad,
		"nombreRegion": nombreRegion
	}

	const response = await fetch('/api/ciudad', getQueryParams('PUT', query));
	const json = await response.json();
	return json;
}

//------------------- AREA FUNCIONES MODULO -----------------

const insertModuloCiudad = async () => {
	moduloCiudad.style.display = "flex"; //Hacemos visible al modulo Region

	await formularioElemento(moduloCiudad); //Concatenamos formulario para insertar elementos
	buscarElemento(moduloCiudad, busqueda);

	let containerTabla = document.createElement('div')
	let tablaCiudad = document.createElement('table');
	let tbodyCiudad = document.createElement('tbody');
	let cabecera = document.createElement('tr');
	let cabeceraNombreCiudad = document.createElement('th');
	let cabeceraNombreRegion = document.createElement('th');

	containerTabla.setAttribute('class', 'containerTabla');
	tbodyCiudad.setAttribute("class", 'tablaCiudad');
	cabecera.setAttribute('class', 'cabecera');
	
	cabeceraNombreCiudad.appendChild(document.createTextNode('Ciudad perteneciente'));
	cabeceraNombreRegion.appendChild(document.createTextNode('Región perteneciente'));

	cabecera.appendChild(cabeceraNombreCiudad);
	cabecera.appendChild(cabeceraNombreRegion)
	cabecera.appendChild(document.createElement('th'));

	tbodyCiudad.appendChild(cabecera);

	if (!isBusqueda) {
		let { body } = await fetchCiudad();

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaCiudad(body[i], tbodyCiudad);
		}

	} else {
		let { body } = await fetchSearchCiudad(busqueda);

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaCiudad(body[i], tbodyCiudad);
		}
	}

	tablaCiudad.appendChild(tbodyCiudad);
	containerTabla.appendChild(tablaCiudad);

	insertPageButtons(containerTabla);

	moduloCiudad.appendChild(containerTabla);
}

const insertRowsTablaCiudad = ({ nombreCiudad, nombreRegion }, tbodyCiudad) => {
	let row = document.createElement('tr');
	let columnNombreCiudad = document.createElement('th');
	let columnNombreRegion = document.createElement('th')
	let columnEditarCiudad = document.createElement('th')
	let botonEditar = document.createElement('button');

	row.setAttribute('class', 'row');

	botonEditar.setAttribute('type', 'button');
	botonEditar.setAttribute('name', 'editar');
	botonEditar.setAttribute('id', 'editar');

	botonEditar.addEventListener('click', (e) => {
		e.preventDefault();
	
		//Al darle al boton editar, deberia salirnos el popup, llamándolo con la
		//siguiente función
		insertPopupContent(nombreCiudad, nombreRegion);
	})

	botonEditar.appendChild(document.createTextNode("editar"));

	columnNombreCiudad.appendChild(document.createTextNode(nombreCiudad));
	columnNombreRegion.appendChild(document.createTextNode(nombreRegion));
	columnEditarCiudad.appendChild(botonEditar);
	
	row.appendChild(columnNombreCiudad);
	row.appendChild(columnNombreRegion);
	row.appendChild(columnEditarCiudad);

	tbodyCiudad.appendChild(row);
}

const insertPopupContent = (nombreCiudad, nombreRegion) => {
	popupContent.innerHTML = ""; //Limpiamos antes de iniciar
	popup.style.display = "flex"; //Aparecemos el popup

	let botonCerrar = document.createElement('button');
	let botonEliminar = document.createElement('button');
	botonCerrar.setAttribute('class', 'botonCerrar')

	botonEliminar.setAttribute('type', 'button');
	botonEliminar.setAttribute('class', 'botonEliminar')

	botonCerrar.appendChild(document.createTextNode("X"));
	botonEliminar.appendChild(document.createTextNode("Eliminar Ciudad"));

	botonCerrar.addEventListener("click", (e) => {
		popup.style.display = 'none';
	})

	botonEliminar.addEventListener("click", (e) => {
		e.preventDefault();

		apiDelCiudad(nombreCiudad, nombreRegion);
	})

	formularioElemento(popupContent, true, nombreCiudad, nombreRegion);
	popupContent.appendChild(botonEliminar);
	popupContent.appendChild(botonCerrar);
}

const formularioElemento = async (parent, isPopup, nombreCiudad, nombreRegion) => {
	let form = document.createElement('form');
	let seccionNombreCiudad = document.createElement('div')
	let labelNombreCiudad = document.createElement('label');
	let inputNombreCiudad = document.createElement('input');
	let seccionNombreRegion = document.createElement('div');
	let labelSelectRegion = document.createElement('label')
	let selectRegion = document.createElement('select');
	let botonRegistrar = document.createElement('button');

	form.setAttribute('class', 'form');
	
	seccionNombreCiudad.setAttribute('class', 'seccion');

	labelNombreCiudad.setAttribute('for', 'inputNombreCiudad');
	labelNombreCiudad.setAttribute('id', 'labelNombreCiudad');

	inputNombreCiudad.setAttribute('type', 'text');
	inputNombreCiudad.setAttribute('id', isPopup ? 'inputPopupNombreCiudad' : 'inputNombreCiudad');
	inputNombreCiudad.setAttribute('name', 'inputNombreCiudad');
	inputNombreCiudad.required = true;

	seccionNombreRegion.setAttribute('class', 'seccion');

	selectRegion.setAttribute('name', 'seleccionarRegion');
	selectRegion.setAttribute('id', isPopup ? 'seleccionarPopupRegion' : 'seleccionarRegion');

	botonRegistrar.setAttribute('type', 'submit');
	botonRegistrar.setAttribute('id', isPopup ? 'botonGuardar' : 'nuevoRegistro');

	labelNombreCiudad.appendChild(document.createTextNode("Nombre de la Ciudad:"));
	inputNombreCiudad.value = isPopup ? nombreCiudad : "";
	labelSelectRegion.appendChild(document.createTextNode("Región perteneciente:"));
	botonRegistrar.appendChild(document.createTextNode(isPopup ? "Guardar datos" : "Registrar Ciudad"));

	let json = await fetchRegion();
	
	for (let i = 0; i < json.body.length; i++) {
		let { nombreRegion: selecNombreRegion } = json.body[i];
		let optionRegion = document.createElement('option');

		optionRegion.setAttribute('value', selecNombreRegion);
		optionRegion.appendChild(document.createTextNode(selecNombreRegion));

		selectRegion.appendChild(optionRegion);
	}

	selectRegion.value = nombreRegion;

	botonRegistrar.addEventListener("click", (e) => {
		e.preventDefault();

		isPopup ? apiUpdateCiudad(nombreCiudad, nombreRegion) : apiAddCiudad();
	})

	seccionNombreCiudad.appendChild(labelNombreCiudad);
	seccionNombreCiudad.appendChild(inputNombreCiudad);
	seccionNombreRegion.appendChild(labelSelectRegion);
	seccionNombreRegion.appendChild(selectRegion);

	form.appendChild(seccionNombreCiudad);
	form.appendChild(seccionNombreRegion);
	form.appendChild(botonRegistrar);

	parent.appendChild(form);
}

const buscarElemento = (parent, busqueda) => {
	let containerBuscar = document.createElement('div');
	let formBuscar = document.createElement('form');
	let labelBuscarNombreCiudad = document.createElement('label');
	let inputBuscarNombreCiudad = document.createElement('input');
	let botonBuscarNombreCiudad = document.createElement('button');

	containerBuscar.setAttribute('class', 'containerBuscar');
	formBuscar.setAttribute('class', 'formBuscar');

	labelBuscarNombreCiudad.setAttribute('id', 'labelBuscarNombreCiudad');
	labelBuscarNombreCiudad.setAttribute('for', 'inputBuscarNombreCiudad');

	inputBuscarNombreCiudad.setAttribute('type', 'text');
	inputBuscarNombreCiudad.setAttribute('name', 'inputBuscarNombreCiudad');
	inputBuscarNombreCiudad.setAttribute('id', 'inputBuscarNombreCiudad');

	botonBuscarNombreCiudad.setAttribute('type', 'submit');
	botonBuscarNombreCiudad.setAttribute('id', 'botonBuscarNombreCiudad');

	labelBuscarNombreCiudad.appendChild(document.createTextNode('Buscar ciudad: '));
	inputBuscarNombreCiudad.value = busqueda;
	botonBuscarNombreCiudad.appendChild(document.createTextNode('Buscar'));

	botonBuscarNombreCiudad.addEventListener("click", (e) => {
		e.preventDefault();
		apiBuscarCiudad();
	})

	formBuscar.appendChild(labelBuscarNombreCiudad);
	formBuscar.appendChild(inputBuscarNombreCiudad);
	formBuscar.appendChild(botonBuscarNombreCiudad);

	containerBuscar.appendChild(formBuscar);

	parent.appendChild(containerBuscar);
}

const insertPageButtons = (parent) => {	
	let containerPages = document.createElement('page');
	let labelPages = document.createElement('label');
	let previousPage = document.createElement('button');
	let nextPage = document.createElement('button');

	containerPages.setAttribute('class', 'containerPages');
	labelPages.setAttribute('id', 'labelPages');
	previousPage.setAttribute('class', 'previousPage');
	nextPage.setAttribute('class', 'nextPage');

	labelPages.appendChild(document.createTextNode(`Mostrando ${offset + 10 > count ? count : offset + 10} de ${count}`))

	if (offset == 0) {
		previousPage.style.display = 'none';
	}

	if (count <= limit || offset + 10 > count) {
		nextPage.style.display = 'none';
	}

	previousPage.appendChild(document.createTextNode('<'));
	nextPage.appendChild(document.createTextNode('>'))

	previousPage.addEventListener("click", (e) => {
		e.preventDefault();

		goToPreviousPage();
	})

	nextPage.addEventListener("click", (e) => {
		e.preventDefault();

		goToNextPage();
	})

	containerPages.appendChild(labelPages);
	containerPages.appendChild(previousPage);
	containerPages.appendChild(nextPage);

	parent.appendChild(containerPages);
}

const goToPreviousPage = () => {
	offset = offset - limit;

	moduloCiudad.innerHTML = "";

	insertModuloCiudad();
}

const goToNextPage = () => {
	offset = offset + limit;

	moduloCiudad.innerHTML = "";

	console.log(offset)
	console.log(limit)

	insertModuloCiudad();
}

//-------------- AREA FUNCIONES EVENTS LISTENERS ------------

const apiAddCiudad = () => {
	const nombreCiudad = document.getElementById('inputNombreCiudad').value;
	const nombreRegion = document.getElementById('seleccionarRegion').value;

	if (nombreRegion == "") {
		alert("Selecciona una region por favor");

		return 0;
	}

	fetchAddCiudad(nombreCiudad, nombreRegion).then( (json) => {
		if (json.error) {
			alert("Hubo un problema al registrar la Region");
		} else {
			alert("El registro se ha añadido con éxito")
			location.reload();
		}
	})
}

const apiUpdateCiudad = (nombreCiudad, nombreRegion) => {
		const nuevoNombreCiudad = document.getElementById('inputPopupNombreCiudad').value
		const nuevoNombreRegion = document.getElementById('seleccionarPopupRegion').value

		if(!confirm("¿Estas seguro de guardar cambios?")) {
			return 0;
		}

		fetchUpdateCiudad(nuevoNombreCiudad, nuevoNombreRegion, nombreCiudad, nombreRegion).then( (json) => {
			if (json.error) {
				alert("Hubo un error al actualizar los datos");
				console.log(json)
				return 0;
			}

			alert("El guardado de los datos ha sido exitoso");
			location.reload();
		} )
}

const apiDelCiudad = (nombreCiudad, nombreRegion) => {
		if (!confirm("¿Seguro que quieres eliminar el registro?")) {
			return 0;
		}

		fetchDelCiudad(nombreCiudad, nombreRegion).then( (json) => {
			console.log(json);
			if(json.error) {
				alert("Hubo un error al eliminar el registro")
				return 0;
			}

			alert("El registro ha sido eliminado con éxito!");
			location.reload();
			});
}

const apiBuscarCiudad = () => {
	const nombreCiudad = document.getElementById('inputBuscarNombreCiudad').value

	if (nombreCiudad == "") {
		alert("No pueden haber campos vacíos");

		return 0;
	}

	isBusqueda = true;
	busqueda = nombreCiudad;

	moduloCiudad.innerHTML = "";

	insertModuloCiudad();
}

export default insertModuloCiudad;
