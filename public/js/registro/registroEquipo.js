
import { getParams, getQueryParams } from '/js/fetchParams.js';

let moduloEquipo = document.getElementsByClassName('moduloEquipo')[0];
let	popup = document.getElementsByClassName("popup")[0];
let	popupContent = document.getElementsByClassName("popup-content")[0];

let count = 0;
let limit = 10;
let offset = 0;

let isBusqueda = false;
let busqueda = "";

//----------------------- AREA API  -----------------------------

const fetchEquipo = async () => {
	const response = await fetch(`/api/equipo/get/${limit}/${offset}`, getParams);
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

const fetchRegion = async () => {
	const response = await fetch('/api/region/get/0/0', getParams);
	const json = await response.json();
	return json;
}

const fetchCiudad = async (nombreRegion) => {
	const response = await fetch(`/api/ciudad/perRegion/${nombreRegion}`, getParams);
	const json = await response.json();
	return json;
}

const fetchSearchEquipoPerInstitucion = async (nombreInstitucion) => {
	const response = await fetch(`/api/equipo/search/${nombreInstitucion}/${limit}/${offset}`);
	const json = await response.json();
	return json;
}

const fetchAddEquipo = async (
	grado,
	grupo,
	nombreGrupo,
	nombreInstitucion
) => {
	const query = {
		"grado": grado,
		"grupo": grupo,
		"nombreGrupo": nombreGrupo,
		"nombreInstitucion": nombreInstitucion
	}

	const response = await fetch('/api/equipo', getQueryParams('POST', query));
	const json = await response.json();
	return json;
}

const fetchDelEquipo = async (idEquipo) => {
	const query = {
		"idEquipo": idEquipo,
	}

	const response = await fetch('/api/equipo', getQueryParams('DELETE', query));
	const json = await response.json();
	return json;
}

const fetchUpdateEquipo = async (
	idEquipo,
	grado,
	grupo,
	nombreGrupo,
	nombreInstitucion
) => {
	const query = {
		"idEquipo": idEquipo,
		"grado": grado,
		"grupo": grupo,
		"nombreGrupo": nombreGrupo,
		"nombreInstitucion": nombreInstitucion
	}

	const response = await fetch('/api/equipo', getQueryParams('PUT', query));
	const json = await response.json();
	return json;
}

//------------------- AREA FUNCIONES MODULO -----------------

const insertModuloEquipo = async () => {
	moduloEquipo.style.display = "flex"; //Hacemos visible al modulo Region

	await formularioElemento(moduloEquipo); //Concatenamos formulario para insertar elementos
	buscarElemento(moduloEquipo, busqueda);

	let containerTabla = document.createElement('div')
	let tablaEquipo = document.createElement('table');
	let tbodyEquipo = document.createElement('tbody');
	let cabecera = document.createElement('tr');
	let cabeceraIdEquipo = document.createElement('th')
	let cabeceraGrado = document.createElement('th')
	let cabeceraGrupo = document.createElement('th')
	let cabeceraNombreGrupo = document.createElement('th')
	let cabeceraNombreInstitucion = document.createElement('th')
	let cabeceraNombreCiudad = document.createElement('th')

	containerTabla.setAttribute('class', 'containerTabla');
	tbodyEquipo.setAttribute("class", 'tablaEquipo');
	cabecera.setAttribute('class', 'cabecera');
		
	cabeceraIdEquipo.appendChild(document.createTextNode('ID'));
	cabeceraGrado.appendChild(document.createTextNode('Grado'));
	cabeceraGrupo.appendChild(document.createTextNode('Grupo'));
	cabeceraNombreGrupo.appendChild(document.createTextNode('Nombre Grupo'));
	cabeceraNombreInstitucion.appendChild(document.createTextNode('Institucion'))
	cabeceraNombreCiudad.appendChild(document.createTextNode('Ciudad'));

	cabecera.appendChild(cabeceraIdEquipo);
	cabecera.appendChild(cabeceraGrado);
	cabecera.appendChild(cabeceraGrupo);
	cabecera.appendChild(cabeceraNombreGrupo);
	cabecera.appendChild(cabeceraNombreInstitucion)
	cabecera.appendChild(cabeceraNombreCiudad);
	cabecera.appendChild(document.createElement('th'));

	tbodyEquipo.appendChild(cabecera);

	if (!isBusqueda) {
		let { body } = await fetchEquipo();

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaEquipo(body[i], tbodyEquipo);
		}

	} else {
		let { body } = await fetchSearchEquipoPerInstitucion(busqueda);

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaEquipo(body[i], tbodyEquipo);
		}
	}

	tablaEquipo.appendChild(tbodyEquipo);
	containerTabla.appendChild(tablaEquipo);

	insertPageButtons(containerTabla);

	moduloEquipo.appendChild(containerTabla);
}

const insertRowsTablaEquipo = (content, tbodyEquipo) => {
	let row = document.createElement('tr');
	let columnIdEquipo = document.createElement('th')
	let columnGrado = document.createElement('th')
	let columnGrupo = document.createElement('th')
	let columnNombreGrupo = document.createElement('th')
	let columnNombreInstitucion = document.createElement('th')
	let columnNombreCiudad = document.createElement('th')
	let columnEditarEquipo = document.createElement('th')
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

	columnIdEquipo.appendChild(document.createTextNode(content.idEquipo));
	columnGrado.appendChild(document.createTextNode(content.grado));
	columnGrupo.appendChild(document.createTextNode(content.grupo));
	columnNombreGrupo.appendChild(document.createTextNode(content.nombreGrupo));
	columnNombreInstitucion.appendChild(document.createTextNode(content.nombreInstitucion));
	columnNombreCiudad.appendChild(document.createTextNode(content.nombreCiudad));
	columnEditarEquipo.appendChild(botonEditar);
	
	row.appendChild(columnIdEquipo);
	row.appendChild(columnGrado);
	row.appendChild(columnGrupo);
	row.appendChild(columnNombreGrupo);
	row.appendChild(columnNombreInstitucion);
	row.appendChild(columnNombreCiudad);
	row.appendChild(columnEditarEquipo);

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
	botonEliminar.appendChild(document.createTextNode("Eliminar Ciudad"));

	botonCerrar.addEventListener("click", (e) => {
		popup.style.display = 'none';
	})

	botonEliminar.addEventListener("click", (e) => {
		e.preventDefault();

		apiDelEquipo(content.idEquipo);
	})

	formularioElemento(popupContent, true, content);
	popupContent.appendChild(botonEliminar);
	popupContent.appendChild(botonCerrar);
}

const formularioElemento = async (parent, isPopup, content) => {
	let form = document.createElement('form');

	let seccionGrado = document.createElement('div')
	let labelGrado = document.createElement('label');
	let inputGrado = document.createElement('input');

	let seccionGrupo = document.createElement('div')
	let labelGrupo = document.createElement('label');
	let inputGrupo = document.createElement('input');

	let seccionNombreGrupo = document.createElement('div')
	let labelNombreGrupo = document.createElement('label');
	let inputNombreGrupo = document.createElement('input');

	let seccionNombreInstitucion = document.createElement('div');
	let labelSelectNombreInstitucion = document.createElement('label')
	let selectNombreInstitucion = document.createElement('select');

	let seccionNombreCiudad = document.createElement('div');
	let labelSelectCiudad = document.createElement('label')
	let selectCiudad = document.createElement('select');

	let seccionNombreRegion = document.createElement('div');
	let labelSelectNombreRegion = document.createElement('label')
	let selectNombreRegion = document.createElement('select');
	
	let botonRegistrar = document.createElement('button');

	form.setAttribute('class', 'form');

	seccionGrado.setAttribute('class', 'seccion');

	labelGrado.setAttribute('for', 'inputGrado');
	labelGrado.setAttribute('id', 'labelGrado');

	inputGrado.setAttribute('type', 'number');
	inputGrado.setAttribute('id', isPopup ? 'inputPopupGrado' : 'inputGrado');
	inputGrado.setAttribute('name', 'inputGrado');

	
	seccionGrupo.setAttribute('class', 'seccion');

	labelGrupo.setAttribute('for', 'inputGrupo');
	labelGrupo.setAttribute('id', 'labelGrupo');

	inputGrupo.setAttribute('type', 'text');
	inputGrupo.setAttribute('id', isPopup ? 'inputPopupGrupo' : 'inputGrupo');
	inputGrupo.setAttribute('name', 'inputGrupo');

	
	seccionNombreGrupo.setAttribute('class', 'seccion');

	labelNombreGrupo.setAttribute('for', 'inputNombreGrupo');
	labelNombreGrupo.setAttribute('id', 'labelNombreGrupo');

	inputNombreGrupo.setAttribute('type', 'text');
	inputNombreGrupo.setAttribute('id', isPopup ? 'inputPopupNombreGrupo' : 'inputNombreGrupo');
	inputNombreGrupo.setAttribute('name', 'inputNombreGrupo');


	seccionNombreRegion.setAttribute('class', 'seccion');

	selectNombreRegion.setAttribute('name', 'seleccionarRegion');
	selectNombreRegion.setAttribute('id', isPopup ? 'seleccionarPopupRegion' : 'seleccionarSostenimiento');

	seccionNombreCiudad.setAttribute('class', 'seccion');

	selectCiudad.setAttribute('name', 'seleccionarCiudad');
	selectCiudad.setAttribute('id', isPopup ? 'seleccionarPopupCiudad' : 'seleccionarCiudad');


	seccionNombreInstitucion.setAttribute('class', 'seccion');

	selectNombreInstitucion.setAttribute('name', 'seleccionarInstitucion');
	selectNombreInstitucion.setAttribute('id', isPopup ? 'seleccionarPopupInstitucion' : 'seleccionarInstitucion');


	botonRegistrar.setAttribute('type', 'submit');
	botonRegistrar.setAttribute('id', isPopup ? 'botonGuardar' : 'nuevoRegistro');

	labelGrado.appendChild(document.createTextNode("Grado:"));
	inputGrado.value = isPopup ? content.grado : "";


	labelGrupo.appendChild(document.createTextNode("Grupo:"));
	inputGrupo.value = isPopup ? content.grupo : "";


	labelNombreGrupo.appendChild(document.createTextNode("Nombre del Grupo:"));
	inputNombreGrupo.value = isPopup ? content.nombreGrupo : "";

	labelSelectNombreInstitucion.appendChild(document.createTextNode('Institucion:'))

	labelSelectCiudad.appendChild(document.createTextNode('Ciudad:'))

	labelSelectNombreRegion.appendChild(document.createTextNode('Region:'))

	botonRegistrar.appendChild(document.createTextNode(isPopup ? "Guardar datos" : "Registrar Equipo"));

	
	let jsonRegion = await fetchRegion();
	
	for (let i = 0; i < jsonRegion.body.length; i++) {
		let { nombreRegion: selecNombreRegion } = jsonRegion.body[i];
		let optionRegion = document.createElement('option');

		optionRegion.setAttribute('value', selecNombreRegion);
		optionRegion.appendChild(document.createTextNode(selecNombreRegion));

		selectNombreRegion.appendChild(optionRegion);
	}

	selectNombreRegion.value = isPopup ? content.nombreRegion : "";


	const addElementsToSelectCiudad = async (selectedNombreRegion) => {
		let jsonCiudad = await fetchCiudad(selectedNombreRegion);
		
		for (let i = 0; i < jsonCiudad.body.length; i++) {
			let { nombreCiudad: selecNombreCiudad } = jsonCiudad.body[i];
			let optionCiudad = document.createElement('option');

			optionCiudad.setAttribute('value', selecNombreCiudad);
			optionCiudad.appendChild(document.createTextNode(selecNombreCiudad));

			selectCiudad.appendChild(optionCiudad);
		}

		selectCiudad.value = isPopup ? content.nombreCiudad : "";
	}

	const addElementsToSelectInstitucion = async(selectedNombreCiudad) => {
		let jsonNombreInstitucion = await fetchNombreInstitucion(selectedNombreCiudad);
		
		console.log(jsonNombreInstitucion)

		for (let i = 0; i < jsonNombreInstitucion.body.length; i++) {
			let { nombreInstitucion: selecNombreInstitucion } = jsonNombreInstitucion.body[i];
	
			let optionNombreInstitucion = document.createElement('option');

			optionNombreInstitucion.setAttribute('value', selecNombreInstitucion);
			optionNombreInstitucion.appendChild(document.createTextNode(selecNombreInstitucion));

			selectNombreInstitucion.appendChild(optionNombreInstitucion);
		}

		selectNombreInstitucion.value = isPopup ? content.nombreInstitucion: "";
	}


	if (isPopup) {
		addElementsToSelectCiudad(content.nombreRegion);
		addElementsToSelectInstitucion(content.nombreCiudad);
	}

	console.log( isPopup ? content.nombreCiudad : "No Popup");


	botonRegistrar.addEventListener("click", (e) => {
		e.preventDefault();

		isPopup ? apiUpdateEquipo(content.idEquipo) : apiAddEquipo();
	})

	selectNombreRegion.addEventListener("change", (e) => {
		e.preventDefault();

		console.log(selectNombreRegion.value);

		addElementsToSelectCiudad(selectNombreRegion.value);
	})

	selectCiudad.addEventListener("change", (e) => {
		e.preventDefault();
		addElementsToSelectInstitucion(selectCiudad.value);
	})

	seccionGrado.appendChild(labelGrado);
	seccionGrado.appendChild(inputGrado);

	seccionGrupo.appendChild(labelGrupo);
	seccionGrupo.appendChild(inputGrupo);

	seccionNombreGrupo.appendChild(labelNombreGrupo);
	seccionNombreGrupo.appendChild(inputNombreGrupo);

	seccionNombreInstitucion.appendChild(labelSelectNombreInstitucion);
	seccionNombreInstitucion.appendChild(selectNombreInstitucion)

	seccionNombreRegion.appendChild(labelSelectNombreRegion);
	seccionNombreRegion.appendChild(selectNombreRegion);

	seccionNombreCiudad.appendChild(labelSelectCiudad);
	seccionNombreCiudad.appendChild(selectCiudad);

	form.appendChild(seccionGrado)
	form.appendChild(seccionGrupo)
	form.appendChild(seccionNombreGrupo)
	form.appendChild(seccionNombreRegion);
	form.appendChild(seccionNombreCiudad)
	form.appendChild(seccionNombreInstitucion)
//	form.appendChild(seccionNombreRegion);
	form.appendChild(botonRegistrar);

	parent.appendChild(form);
}

const buscarElemento = (parent, busqueda) => {
	let containerBuscar = document.createElement('div');
	let formBuscar = document.createElement('form');
	let labelBuscarEquipoPerInstitucion = document.createElement('label');
	let inputBuscarEquipoPerInstitucion = document.createElement('input');
	let botonBuscarEquipoPerInstitucion = document.createElement('button');

	containerBuscar.setAttribute('class', 'containerBuscar');
	formBuscar.setAttribute('class', 'formBuscar');

	labelBuscarEquipoPerInstitucion.setAttribute('id', 'labelBuscarEquipoPerInstitucion');
	labelBuscarEquipoPerInstitucion.setAttribute('for', 'inputBuscarEquipoPerInstitucion');

	inputBuscarEquipoPerInstitucion.setAttribute('type', 'text');
	inputBuscarEquipoPerInstitucion.setAttribute('name', 'inputBuscarEquipoPerInstitucion');
	inputBuscarEquipoPerInstitucion.setAttribute('id', 'inputBuscarEquipoPerInstitucion');

	botonBuscarEquipoPerInstitucion.setAttribute('type', 'submit');
	botonBuscarEquipoPerInstitucion.setAttribute('id', 'botonBuscarEquipoPerInstitucion');

	labelBuscarEquipoPerInstitucion.appendChild(document.createTextNode('Buscar equipos por Institucion: '));
	inputBuscarEquipoPerInstitucion.value = busqueda;
	botonBuscarEquipoPerInstitucion.appendChild(document.createTextNode('Buscar'));

	botonBuscarEquipoPerInstitucion.addEventListener("click", (e) => {
		e.preventDefault();
		apiBuscarEquipoPerInstitucion();
	})

	formBuscar.appendChild(labelBuscarEquipoPerInstitucion);
	formBuscar.appendChild(inputBuscarEquipoPerInstitucion);
	formBuscar.appendChild(botonBuscarEquipoPerInstitucion);

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

	moduloEquipo.innerHTML = "";

	insertModuloEquipo();
}

const goToNextPage = () => {
	offset = offset + limit;

	moduloEquipo.innerHTML = "";

	console.log(offset)
	console.log(limit)

	insertModuloEquipo();
}

//-------------- AREA FUNCIONES EVENTS LISTENERS ------------

const apiAddEquipo = () => {
	const grado = document.getElementById('inputGrado').value
	const grupo = document.getElementById('inputGrupo').value
	const nombreGrupo = document.getElementById('inputNombreGrupo').value
	const nombreInstitucion = document.getElementById('seleccionarInstitucion').value

	fetchAddEquipo(
	grado,
	grupo,
	nombreGrupo,
	nombreInstitucion
).then( (json) => {
		if (json.error) {
			alert("Hubo un problema al registrar la Region");
		} else {
			alert("El registro se ha añadido con éxito")
			location.reload();
		}
	})
}

const apiUpdateEquipo = (idEquipo) => {
	const grado = document.getElementById('inputPopupGrado').value
	const grupo = document.getElementById('inputPopupGrupo').value
	const nombreGrupo = document.getElementById('inputPopupNombreGrupo').value
	const nombreInstitucion = document.getElementById('seleccionarPopupInstitucion').value;

		if(!confirm("¿Estas seguro de guardar cambios?")) {
			return 0;
		}

		fetchUpdateEquipo(
			idEquipo,
			grado,
			grupo,
			nombreGrupo,
			nombreInstitucion
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

const apiDelEquipo = (idEquipo) => {
		if (!confirm("¿Seguro que quieres eliminar el registro?")) {
			return 0;
		}

		fetchDelEquipo(idEquipo).then( (json) => {
			console.log(json);
			if(json.error) {
				alert("Hubo un error al eliminar el registro")
				return 0;
			}

			alert("El registro ha sido eliminado con éxito!");
			location.reload();
			});
}

const apiBuscarEquipoPerInstitucion = () => {
	const nombreInstitucion = document.getElementById('inputBuscarEquipoPerInstitucion').value

	if (nombreInstitucion == "") {
		alert("No pueden haber campos vacíos");

		return 0;
	}

	isBusqueda = true;
	busqueda = nombreInstitucion;

	moduloEquipo.innerHTML = "";

	insertModuloEquipo();
}

export default insertModuloEquipo;
