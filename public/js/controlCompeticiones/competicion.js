
import { getParams, getQueryParams } from '/js/fetchParams.js';

let	popup = document.getElementsByClassName("popup")[0];
let	popupContent = document.getElementsByClassName("popup-content")[0];

let moduloCompeticion = document.getElementsByClassName('moduloCompeticion')[0];

let count = 0;
let limit = 10;
let offset = 0;

let isBusqueda = false;
let busqueda = "";

//----------------------- AREA API  -----------------------------

const fetchCompeticion = async () => {
	const response = await fetch(`/api/competicion/get/${limit}/${offset}`, getParams);
	const json = await response.json();
	return json;
}

const fetchNombreInstitucion = async (nombreCiudad) => {
	const response = await fetch(`/api/institucion/perCiudad/${nombreCiudad}`, getParams);
	const json = await response.json();
	return json;
}

const fetchNombreRegion = async () => {
	const response = await fetch('/api/sostenimiento', getParams);
	const json = await response.json();
	return json;
}

const fetchTipoCompeticion = async () => {
	const response = await fetch('/api/competicion/tipos', getParams);
	const json = await response.json();
	return json;
}

const fetchCiudad = async (nombreRegion) => {
	const response = await fetch(`/api/ciudad/perRegion/${nombreRegion}`, getParams);
	const json = await response.json();
	return json;
}

const fetchSearchNombreCompeticion = async (nombreInstitucion) => {
	const response = await fetch(`/api/competicion/search/${nombreInstitucion}/${limit}/${offset}`);
	const json = await response.json();
	return json;
}

const fetchAddCompeticion = async (
	nombreCompeticion,
	descripcionCompeticion,
	nombreTipoCompeticion
) => {
	const query = {
		"nombreCompeticion": nombreCompeticion,
		"descripcionCompeticion": descripcionCompeticion,
		"nombreTipoCompeticion": nombreTipoCompeticion
	}

	const response = await fetch('/api/competicion', getQueryParams('POST', query));
	const json = await response.json();
	return json;
}

const fetchDelCompeticion = async (idCompeticion) => {
	const query = {
		"idCompeticion": idCompeticion,
	}

	const response = await fetch('/api/competicion', getQueryParams('DELETE', query));
	const json = await response.json();
	return json;
}

const fetchUpdateCompeticion = async (
	idCompeticion,
	nombreCompeticion,
	descripcionCompeticion,
	nombreTipoCompeticion
) => {
	const query = {
		"idCompeticion": idCompeticion,
		"nombreCompeticion": nombreCompeticion,
		"descripcionCompeticion": descripcionCompeticion,
		"nombreTipoCompeticion": nombreTipoCompeticion
	}

	const response = await fetch('/api/competicion', getQueryParams('PUT', query));
	const json = await response.json();
	return json;
}

//------------------- AREA FUNCIONES MODULO -----------------

const insertModuloCompeticion = async () => {
	moduloCompeticion.style.display = "flex"; //Hacemos visible al modulo Region

	await formularioElemento(moduloCompeticion); //Concatenamos formulario para insertar elementos
	buscarElemento(moduloCompeticion, busqueda);

	let containerTabla = document.createElement('div')
	let tablaEquipo = document.createElement('table');
	let tbodyEquipo = document.createElement('tbody');
	let cabecera = document.createElement('tr');
	let cabeceraIdCompeticion = document.createElement('th')
	let cabeceraNombreCompeticion = document.createElement('th')
	let cabeceraDescripcionCompeticion = document.createElement('th')
	let nombreTipoCompeticion = document.createElement('th')

	containerTabla.setAttribute('class', 'containerTabla');
	tbodyEquipo.setAttribute("class", 'tablaEquipo');
	cabecera.setAttribute('class', 'cabecera');
		
	cabeceraIdCompeticion.appendChild(document.createTextNode('ID'));
	cabeceraNombreCompeticion.appendChild(document.createTextNode('Nombre'));
	cabeceraDescripcionCompeticion.appendChild(document.createTextNode('Descripción'));
	nombreTipoCompeticion.appendChild(document.createTextNode('Tipo Competicion'))

	cabecera.appendChild(cabeceraIdCompeticion);
	cabecera.appendChild(cabeceraNombreCompeticion);
	cabecera.appendChild(cabeceraDescripcionCompeticion);
	cabecera.appendChild(nombreTipoCompeticion)
	cabecera.appendChild(document.createElement('th'));

	tbodyEquipo.appendChild(cabecera);

	if (!isBusqueda) {
		let { body } = await fetchCompeticion();

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaCompeticion(body[i], tbodyEquipo);
		}

	} else {
		let { body } = await fetchSearchNombreCompeticion(busqueda);

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaCompeticion(body[i], tbodyEquipo);
		}
	}

	tablaEquipo.appendChild(tbodyEquipo);
	containerTabla.appendChild(tablaEquipo);

	insertPageButtons(containerTabla);

	moduloCompeticion.appendChild(containerTabla);
}

const insertRowsTablaCompeticion = (content, tbodyEquipo) => {
	let row = document.createElement('tr');
	let columnIdCompeticion = document.createElement('th')
	let columnNombreCompeticion = document.createElement('th')
	let columnDescripcionCompeticion = document.createElement('th')
	let columnTipoCompeticion = document.createElement('th')
	let columnEditarCompeticion = document.createElement('th')
	let botonEditar = document.createElement('button');

	row.setAttribute('class', 'row');

	botonEditar.setAttribute('type', 'button');
	botonEditar.setAttribute('name', 'editar');
	botonEditar.setAttribute('id', 'editar');

	botonEditar.addEventListener('click', (e) => {
		e.preventDefault();
	
		//Al darle al boton editar, deberia salirnos el popup, llamándolo con la
		//siguiente función
		insertPopupContent(content);
	})

	botonEditar.appendChild(document.createTextNode("editar"));

	columnIdCompeticion.appendChild(document.createTextNode(content.idCompeticion));
	columnNombreCompeticion.appendChild(document.createTextNode(content.nombreCompeticion));
	columnDescripcionCompeticion.appendChild(document.createTextNode(content.descripcionCompeticion));
	columnTipoCompeticion.appendChild(document.createTextNode(content.nombreTipoCompeticion));
	columnEditarCompeticion.appendChild(botonEditar);
	
	row.appendChild(columnIdCompeticion);
	row.appendChild(columnNombreCompeticion);
	row.appendChild(columnDescripcionCompeticion);
	row.appendChild(columnTipoCompeticion);
	row.appendChild(columnEditarCompeticion);

	tbodyEquipo.appendChild(row);
}

const insertPopupContent = (content) => {
	popupContent.innerHTML = ""; //Limpiamos antes de iniciar
	popup.style.display = "flex"; //Aparecemos el popup

	let botonCerrar = document.createElement('button');
	let botonEliminar = document.createElement('button');
	botonCerrar.setAttribute('class', 'botonCerrar')

	botonEliminar.setAttribute('type', 'button');
	botonEliminar.setAttribute('class', 'botonEliminar')

	botonCerrar.appendChild(document.createTextNode("X"));
	botonEliminar.appendChild(document.createTextNode("Eliminar Competicion"));

	botonCerrar.addEventListener("click", (e) => {
		popup.style.display = 'none';
	})

	botonEliminar.addEventListener("click", (e) => {
		e.preventDefault();

		apiDelCompeticion(content.idCompeticion);
	})

	formularioElemento(popupContent, true, content);
	popupContent.appendChild(botonEliminar);
	popupContent.appendChild(botonCerrar);
}

const formularioElemento = async (parent, isPopup, content) => {
	let form = document.createElement('form');

	let seccionNombreCompeticion = document.createElement('div')
	let labelNombreCompeticion = document.createElement('label');
	let inputNombreCompeticion = document.createElement('input');

	let seccionDescripcionCompeticion = document.createElement('div')
	let labelDescripcionCompeticion = document.createElement('label');
	let textareaDescripcionCompeticion = document.createElement('textarea');

	let seccionTipoCompeticion = document.createElement('div');
	let labelSelectTipoCompeticion = document.createElement('label')
	let selectTipoCompeticion = document.createElement('select');
	
	let botonRegistrar = document.createElement('button');

	form.setAttribute('class', 'form');

	seccionNombreCompeticion.setAttribute('class', 'seccion');

	labelNombreCompeticion.setAttribute('for', 'inputNombreCompeticion');
	labelNombreCompeticion.setAttribute('id', 'labelCompeticion');

	inputNombreCompeticion.setAttribute('type', 'text');
	inputNombreCompeticion.setAttribute('id', isPopup ? 'inputPopupNombreCompeticion' : 'inputNombreCompeticion');
	inputNombreCompeticion.setAttribute('name', 'nombreCompeticion');

	
	seccionDescripcionCompeticion.setAttribute('class', 'seccion');

	labelDescripcionCompeticion.setAttribute('for', 'textareaDescripcionCompeticion');
	labelDescripcionCompeticion.setAttribute('id', 'labelDescripcionCompeticion');

	textareaDescripcionCompeticion.setAttribute('cols', '40');
	textareaDescripcionCompeticion.setAttribute('rows', '7');
	textareaDescripcionCompeticion.setAttribute('id', isPopup ? 'textareaPopupDescripcionCompeticion' : 'textareaDescripcionCompeticion');
	textareaDescripcionCompeticion.setAttribute('name', 'textareaDescripcionCompeticion');


	seccionTipoCompeticion.setAttribute('class', 'seccion');

	selectTipoCompeticion.setAttribute('name', 'seleccionarTipoCompeticion');
	selectTipoCompeticion.setAttribute('id', isPopup ? 'seleccionarPopupTipoCompeticion' : 'seleccionarTipoCompeticion');


	botonRegistrar.setAttribute('type', 'submit');
	botonRegistrar.setAttribute('id', isPopup ? 'botonGuardar' : 'nuevoRegistro');

	labelNombreCompeticion.appendChild(document.createTextNode("Nombre:"));
	inputNombreCompeticion.value = isPopup ? content.nombreCompeticion : "";


	labelDescripcionCompeticion.appendChild(document.createTextNode("Descripción:"));
	textareaDescripcionCompeticion.value = isPopup ? content.descripcionCompeticion : "";

	labelSelectTipoCompeticion.appendChild(document.createTextNode('Tipo Competicion:'))

	botonRegistrar.appendChild(document.createTextNode(isPopup ? "Guardar datos" : "Registrar Equipo"));

	
	let jsonTipoCompeticion = await fetchTipoCompeticion();
	
	for (let i = 0; i < jsonTipoCompeticion.body.length; i++) {
		let { nombreTipoCompeticion: selecNombreTipoCompeticion } = jsonTipoCompeticion.body[i];
		let optionTipoCompeticion = document.createElement('option');

		optionTipoCompeticion.setAttribute('value', selecNombreTipoCompeticion);
		optionTipoCompeticion.appendChild(document.createTextNode(selecNombreTipoCompeticion));

		selectTipoCompeticion.appendChild(optionTipoCompeticion);
	}

	selectTipoCompeticion.value = isPopup ? content.nombreTipoCompeticion : "";


	botonRegistrar.addEventListener("click", (e) => {
		e.preventDefault();

		isPopup ? apiUpdateCompeticion(content.idCompeticion) : apiAddCompeticion();
	})


	seccionNombreCompeticion.appendChild(labelNombreCompeticion);
	seccionNombreCompeticion.appendChild(inputNombreCompeticion);

	seccionDescripcionCompeticion.appendChild(labelDescripcionCompeticion);
	seccionDescripcionCompeticion.appendChild(textareaDescripcionCompeticion);

	seccionTipoCompeticion.appendChild(labelSelectTipoCompeticion);
	seccionTipoCompeticion.appendChild(selectTipoCompeticion);

	form.appendChild(seccionNombreCompeticion)
	form.appendChild(seccionDescripcionCompeticion)
	form.appendChild(seccionTipoCompeticion);
	form.appendChild(botonRegistrar);

	parent.appendChild(form);
}

const buscarElemento = (parent, busqueda) => {
	let containerBuscar = document.createElement('div');
	let formBuscar = document.createElement('form');
	let labelBuscarNombreCompeticion = document.createElement('label');
	let inputBuscarNombreCompeticion = document.createElement('input');
	let botonBuscarNombreCompeticion = document.createElement('button');

	containerBuscar.setAttribute('class', 'containerBuscar');
	formBuscar.setAttribute('class', 'formBuscar');

	labelBuscarNombreCompeticion.setAttribute('id', 'labelBuscarNombreCompeticion');
	labelBuscarNombreCompeticion.setAttribute('for', 'inputBuscarNombreCompeticion');

	inputBuscarNombreCompeticion.setAttribute('type', 'text');
	inputBuscarNombreCompeticion.setAttribute('name', 'inputBuscarNombreCompeticion');
	inputBuscarNombreCompeticion.setAttribute('id', 'inputBuscarNombreCompeticion');

	botonBuscarNombreCompeticion.setAttribute('type', 'submit');
	botonBuscarNombreCompeticion.setAttribute('id', 'botonBuscarNombreCompeticion');

	labelBuscarNombreCompeticion.appendChild(document.createTextNode('Buscar nombre competición:'));
	inputBuscarNombreCompeticion.value = busqueda;
	botonBuscarNombreCompeticion.appendChild(document.createTextNode('Buscar'));

	botonBuscarNombreCompeticion.addEventListener("click", (e) => {
		e.preventDefault();
		apiBuscarNombreCompeticion();
	})

	formBuscar.appendChild(labelBuscarNombreCompeticion);
	formBuscar.appendChild(inputBuscarNombreCompeticion);
	formBuscar.appendChild(botonBuscarNombreCompeticion);

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

	moduloCompeticion.innerHTML = "";

	insertModuloCompeticion();
}

const goToNextPage = () => {
	offset = offset + limit;

	moduloCompeticion.innerHTML = "";

	console.log(offset)
	console.log(limit)

	insertModuloCompeticion();
}

//-------------- AREA FUNCIONES EVENTS LISTENERS ------------

const apiAddCompeticion = () => {
	const nombreCompeticion = document.getElementById('inputNombreCompeticion').value
	const descripcionCompeticion = document.getElementById('textareaDescripcionCompeticion').value
	const nombreTipoCompeticion = document.getElementById('seleccionarTipoCompeticion').value

	fetchAddCompeticion(
		nombreCompeticion,
		descripcionCompeticion,
		nombreTipoCompeticion
).then( (json) => {
		if (json.error) {
			alert("Hubo un problema al registrar la Region");
		} else {
			alert("El registro se ha añadido con éxito")
			location.reload();
		}
	})
}

const apiUpdateCompeticion = (idCompeticion) => {
	const nombreCompeticion = document.getElementById('inputPopupNombreCompeticion').value
	const descripcionCompeticion = document.getElementById('textareaPopupDescripcionCompeticion').value
	const nombreTipoCompeticion = document.getElementById('seleccionarPopupTipoCompeticion').value;

		if(!confirm("¿Estas seguro de guardar cambios?")) {
			return 0;
		}

		fetchUpdateCompeticion(
			idCompeticion,
			nombreCompeticion,
			descripcionCompeticion,
			nombreTipoCompeticion
		).then( (json) => {
			if (json.error) {
				alert("Hubo un error al actualizar los datos");
				console.log(json)
				return 0;
			}

			alert("El guardado de los datos ha sido exitoso");
			location.reload();
		} )
}

const apiDelCompeticion = (idCompeticion) => {
		if (!confirm("¿Seguro que quieres eliminar el registro?")) {
			return 0;
		}
	
		fetchDelCompeticion(idCompeticion).then( (json) => {
			if(json.error) {
				alert("Hubo un error al eliminar el registro")
				return 0;
			}

			alert("El registro ha sido eliminado con éxito!");
			location.reload();
			});
}

const apiBuscarNombreCompeticion = () => {
	const nombreCompeticion = document.getElementById('inputBuscarNombreCompeticion').value

	if (nombreCompeticion == "") {
		alert("No pueden haber campos vacíos");

		return 0;
	}

	isBusqueda = true;
	busqueda = nombreCompeticion;

	moduloCompeticion.innerHTML = "";

	insertModuloCompeticion();
}

//----------------- AREA DE EVENT LISTENERS ---------------------

export default insertModuloCompeticion;
