
import { getParams, getQueryParams } from '/js/fetchParams.js';

let moduloInstitucion = document.getElementsByClassName('moduloInstitucion')[0];
let	popup = document.getElementsByClassName("popup")[0];
let	popupContent = document.getElementsByClassName("popup-content")[0];

let count = 0;
let limit = 10;
let offset = 0;

let isBusqueda = false;
let busqueda = "";

//----------------------- AREA API  -----------------------------

const fetchInstitucion = async () => {
	const response = await fetch(`/api/institucion/get/${limit}/${offset}`, getParams);
	const json = await response.json();
	return json;
}

const fetchNivelEscolaridad = async () => {
	const response = await fetch('/api/nivelEscolaridad', getParams);
	const json = await response.json();
	return json;
}

const fetchTurno = async () => {
	const response = await fetch('/api/turno', getParams);
	const json = await response.json();
	return json;
}

const fetchSostenimiento = async () => {
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

const fetchSearchInstitucion = async (nombreInstitucion) => {
	const response = await fetch(`/api/institucion/search/${nombreInstitucion}/${limit}/${offset}`);
	const json = await response.json();
	return json;
}

const fetchAddInstitucion = async (
	nombreInstitucion,
	direccionInstitucion,
	nInstitucionPais,
	cct,
	nombreNivelEscolaridad,
	nombreTurno,
	nombreSostenimiento,
	paginaWebInstitucion,
	institucionTelefono1,
	institucionTelefono2,
	nombreCiudad
) => {
	const query = {
		"nombreInstitucion": nombreInstitucion,
		"direccionInstitucion": direccionInstitucion,
		"nInstitucionPais": nInstitucionPais,
		"cct": cct,
		"nombreNivelEscolaridad": nombreNivelEscolaridad,
		"nombreTurno": nombreTurno,
		"nombreSostenimiento": nombreSostenimiento,
		"paginaWebInstitucion": paginaWebInstitucion,
		"institucionTelefono1": institucionTelefono1,
		"institucionTelefono2": institucionTelefono2,
		"nombreCiudad": nombreCiudad
	}

	const response = await fetch('/api/institucion', getQueryParams('POST', query));
	const json = await response.json();
	return json;
}

const fetchDelInstitucion = async (nombreInstitucion) => {
	const query = {
		"nombreInstitucion": nombreInstitucion,
	}

	const response = await fetch('/api/institucion', getQueryParams('DELETE', query));
	const json = await response.json();
	return json;
}

const fetchUpdateInstitucion = async (
	antiguoNombreInstitucion,
	nombreInstitucion,
	direccionInstitucion,
	nInstitucionPais,
	cct,
	nombreNivelEscolaridad,
	nombreTurno,
	nombreSostenimiento,
	paginaWebInstitucion,
	institucionTelefono1,
	institucionTelefono2,
	nombreCiudad
) => {
	const query = {
		"antiguoNombreInstitucion": antiguoNombreInstitucion,
		"nombreInstitucion": nombreInstitucion,
		"direccionInstitucion": direccionInstitucion,
		"nInstitucionPais": nInstitucionPais,
		"cct": cct,
		"nombreNivelEscolaridad": nombreNivelEscolaridad,
		"nombreTurno": nombreTurno,
		"nombreSostenimiento": nombreSostenimiento,
		"paginaWebInstitucion": paginaWebInstitucion,
		"institucionTelefono1": institucionTelefono1,
		"institucionTelefono2": institucionTelefono2,
		"nombreCiudad": nombreCiudad
	}

	const response = await fetch('/api/institucion', getQueryParams('PUT', query));
	const json = await response.json();
	return json;
}

//------------------- AREA FUNCIONES MODULO -----------------

const insertModuloInstitucion = async () => {
	moduloInstitucion.style.display = "flex"; //Hacemos visible al modulo Region

	await formularioElemento(moduloInstitucion); //Concatenamos formulario para insertar elementos
	buscarElemento(moduloInstitucion, busqueda);

	let containerTabla = document.createElement('div')
	let tablaInstitucion = document.createElement('table');
	let tbodyInstitucion = document.createElement('tbody');
	let cabecera = document.createElement('tr');
	let cabeceraNombreInstitucion = document.createElement('th')
	let cabeceraDireccionInstitucion = document.createElement('th')
	let cabeceraNInstitucionPais = document.createElement('th')
	let cabeceraCct = document.createElement('th')
	let cabeceraNombreNivelEscolaridad = document.createElement('th')
	let cabeceraNombreTurno = document.createElement('th')
	let cabeceraNombreSostenimiento = document.createElement('th')
	let cabeceraPaginaWebInstitucion = document.createElement('th')
	let cabeceraInstitucionTelefono1 = document.createElement('th')
	let cabeceraInstitucionTelefono2 = document.createElement('th')
	let cabeceraNombreCiudad = document.createElement('th');

	containerTabla.setAttribute('class', 'containerTabla');
	tbodyInstitucion.setAttribute("class", 'tablaInstitucion');
	cabecera.setAttribute('class', 'cabecera');
		
	cabeceraNombreInstitucion.appendChild(document.createTextNode('Nombre'));
	cabeceraDireccionInstitucion.appendChild(document.createTextNode('Dirección'));
	cabeceraNInstitucionPais.appendChild(document.createTextNode('N. en el Pais'));
	cabeceraCct.appendChild(document.createTextNode('CCT'));
	cabeceraNombreNivelEscolaridad.appendChild(document.createTextNode('Nivel Escolar'));
	cabeceraNombreTurno.appendChild(document.createTextNode('Turno'));
	cabeceraNombreSostenimiento.appendChild(document.createTextNode('Sotenimiento'));
	cabeceraPaginaWebInstitucion.appendChild(document.createTextNode('Página Web'));
	cabeceraInstitucionTelefono1.appendChild(document.createTextNode('Telefono 1'));
	cabeceraInstitucionTelefono2.appendChild(document.createTextNode('Telefono 2'));
	cabeceraNombreCiudad.appendChild(document.createTextNode('Ciudad perteneciente'));

	cabecera.appendChild(cabeceraNombreInstitucion);
	cabecera.appendChild(cabeceraDireccionInstitucion);
	cabecera.appendChild(cabeceraNInstitucionPais);
	cabecera.appendChild(cabeceraCct);
	cabecera.appendChild(cabeceraNombreNivelEscolaridad);
	cabecera.appendChild(cabeceraNombreTurno);
	cabecera.appendChild(cabeceraNombreSostenimiento);
	cabecera.appendChild(cabeceraPaginaWebInstitucion);
	cabecera.appendChild(cabeceraInstitucionTelefono1);
	cabecera.appendChild(cabeceraInstitucionTelefono2);
	cabecera.appendChild(cabeceraNombreCiudad);
	cabecera.appendChild(document.createElement('th'));

	tbodyInstitucion.appendChild(cabecera);

	if (!isBusqueda) {
		let { body } = await fetchInstitucion();

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaInstitucion(body[i], tbodyInstitucion);
		}

	} else {
		let { body } = await fetchSearchInstitucion(busqueda);

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaInstitucion(body[i], tbodyInstitucion);
		}
	}

	tablaInstitucion.appendChild(tbodyInstitucion);
	containerTabla.appendChild(tablaInstitucion);

	insertPageButtons(containerTabla);

	moduloInstitucion.appendChild(containerTabla);
}

const insertRowsTablaInstitucion = (content, tbodyInstitucion) => {
	let row = document.createElement('tr');
	let columnNombreInstitucion = document.createElement('th')
	let columnDireccionInstitucion = document.createElement('th')
	let columnNInstitucionPais = document.createElement('th')
	let columnCct = document.createElement('th')
	let columnNombreNivelEscolaridad = document.createElement('th')
	let columnNombreTurno = document.createElement('th')
	let columnNombreSostenimiento = document.createElement('th')
	let columnPaginaWebInstitucion = document.createElement('th')
	let columnInstitucionTelefono1 = document.createElement('th')
	let columnInstitucionTelefono2 = document.createElement('th')
	let columnNombreCiudad = document.createElement('th');
	let columnEditarInstitucion = document.createElement('th')
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

	columnNombreInstitucion.appendChild(document.createTextNode(content.nombreInstitucion));
	columnDireccionInstitucion.appendChild(document.createTextNode(content.direccionInstitucion));
	columnNInstitucionPais.appendChild(document.createTextNode(content.nInstitucionPais));
	columnCct.appendChild(document.createTextNode(content.cct));
	columnNombreNivelEscolaridad.appendChild(document.createTextNode(content.nombreNivelEscolaridad));
	columnNombreTurno.appendChild(document.createTextNode(content.nombreTurno));
	columnNombreSostenimiento.appendChild(document.createTextNode(content.nombreSostenimiento));
	columnPaginaWebInstitucion.appendChild(document.createTextNode(content.paginaWebInstitucion));
	columnInstitucionTelefono1.appendChild(document.createTextNode(content.institucionTelefono1));
	columnInstitucionTelefono2.appendChild(document.createTextNode(content.institucionTelefono2));
	columnNombreCiudad.appendChild(document.createTextNode(content.nombreCiudad));
	columnEditarInstitucion.appendChild(botonEditar);
	
	row.appendChild(columnNombreInstitucion);
	row.appendChild(columnDireccionInstitucion);
	row.appendChild(columnNInstitucionPais);
	row.appendChild(columnCct);
	row.appendChild(columnNombreNivelEscolaridad);
	row.appendChild(columnNombreTurno);
	row.appendChild(columnNombreSostenimiento);
	row.appendChild(columnPaginaWebInstitucion);
	row.appendChild(columnInstitucionTelefono1);
	row.appendChild(columnInstitucionTelefono2);
	row.appendChild(columnNombreCiudad);
	row.appendChild(columnEditarInstitucion);

	tbodyInstitucion.appendChild(row);
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

		apiDelInstitucion(content.nombreInstitucion);
	})

	formularioElemento(popupContent, true, content);
	popupContent.appendChild(botonEliminar);
	popupContent.appendChild(botonCerrar);
}

const formularioElemento = async (parent, isPopup, content) => {
	let form = document.createElement('form');

	let seccionNombreInstitucion = document.createElement('div')
	let labelNombreInstitucion = document.createElement('label');
	let inputNombreInstitucion = document.createElement('input');

	let seccionDireccionInstitucion = document.createElement('div')
	let labelDireccionInstitucion = document.createElement('label');
	let inputDireccionInstitucion = document.createElement('input');

	let seccionNInstitucionPais = document.createElement('div')
	let labelNInstitucionPais = document.createElement('label');
	let inputNInstitucionPais = document.createElement('input');

	let seccionCct = document.createElement('div')
	let labelCct = document.createElement('label');
	let inputCct = document.createElement('input');

	let seccionNombreNivelEscolaridad = document.createElement('div');
	let labelSelectNivelEscolaridad = document.createElement('label')
	let selectNivelEscolaridad = document.createElement('select');

	let seccionNombreTurno = document.createElement('div');
	let labelSelectTurno = document.createElement('label')
	let selectTurno = document.createElement('select');

	let seccionNombreSostenimiento = document.createElement('div');
	let labelSelectSostenimiento = document.createElement('label')
	let selectSostenimiento = document.createElement('select');

	let seccionPaginaWebInstitucion = document.createElement('div')
	let labelPaginaWebInstitucion = document.createElement('label');
	let inputPaginaWebInstitucion = document.createElement('input');

	let seccionInstitucionTelefono1 = document.createElement('div')
	let labelInstitucionTelefono1 = document.createElement('label');
	let inputInstitucionTelefono1 = document.createElement('input');

	let seccionInstitucionTelefono2 = document.createElement('div');
	let inputInstitucionTelefono2 = document.createElement('input');
	let labelInstitucionTelefono2 = document.createElement('label');

	let seccionNombreRegion = document.createElement('div');
	let labelSelectRegion = document.createElement('label')
	let selectRegion = document.createElement('select');

	let seccionNombreCiudad = document.createElement('div');
	let labelSelectCiudad = document.createElement('label')
	let selectCiudad = document.createElement('select');

	let botonRegistrar = document.createElement('button');

	form.setAttribute('class', 'form');

	seccionNombreInstitucion.setAttribute('class', 'seccion');

	labelNombreInstitucion.setAttribute('for', 'inputNombreInstitucion');
	labelNombreInstitucion.setAttribute('id', 'labelNombreInstitucion');

	inputNombreInstitucion.setAttribute('type', 'text');
	inputNombreInstitucion.setAttribute('id', isPopup ? 'inputPopupNombreInstitucion' : 'inputNombreInstitucion');
	inputNombreInstitucion.setAttribute('name', 'inputNombreInstitucion');


	seccionDireccionInstitucion.setAttribute('class', 'seccion');

	labelDireccionInstitucion.setAttribute('for', 'inputDireccionInstitucion');
	labelDireccionInstitucion.setAttribute('id', 'labelDireccionInstitucion');

	inputDireccionInstitucion.setAttribute('type', 'text');
	inputDireccionInstitucion.setAttribute('id', isPopup ? 'inputPopupDireccionInstitucion' : 'inputDireccionInstitucion');
	inputDireccionInstitucion.setAttribute('name', 'inputDireccionInstitucion');

	
	seccionNInstitucionPais.setAttribute('class', 'seccion');

	labelNInstitucionPais.setAttribute('for', 'inputNInstitucionPais');
	labelNInstitucionPais.setAttribute('id', 'labelNInstitucionPais');

	inputNInstitucionPais.setAttribute('type', 'number');
	inputNInstitucionPais.setAttribute('id', isPopup ? 'inputPopupNInstitucionPais' : 'inputNInstitucionPais');
	inputNInstitucionPais.setAttribute('name', 'inputNInstitucionPais');

	
	seccionCct.setAttribute('class', 'seccion');

	labelCct.setAttribute('for', 'inputCct');
	labelCct.setAttribute('id', 'labelCct');

	inputCct.setAttribute('type', 'number');
	inputCct.setAttribute('id', isPopup ? 'inputPopupCct' : 'inputCct');
	inputCct.setAttribute('name', 'inputCct');


	seccionPaginaWebInstitucion.setAttribute('class', 'seccion');

	labelPaginaWebInstitucion.setAttribute('for', 'inputPaginaWebInstitucion');
	labelPaginaWebInstitucion.setAttribute('id', 'labelPaginaWebInstitucion');

	inputPaginaWebInstitucion.setAttribute('type', 'text');
	inputPaginaWebInstitucion.setAttribute('id', isPopup ? 'inputPopupPaginaWebInstitucion' : 'inputPaginaWebInstitucion');
	inputPaginaWebInstitucion.setAttribute('name', 'inputPaginaWebInstitucion');


	seccionInstitucionTelefono1.setAttribute('class', 'seccion');

	labelInstitucionTelefono1.setAttribute('for', 'inputInstitucionTelefono1');
	labelInstitucionTelefono1.setAttribute('id', 'labelInstitucionTelefono1');

	inputInstitucionTelefono1.setAttribute('type', 'text');
	inputInstitucionTelefono1.setAttribute('id', isPopup ? 'inputPopupInstitucionTelefono1' : 'inputInstitucionTelefono1');
	inputInstitucionTelefono1.setAttribute('name', 'inputInstitucionTelefono1');


	seccionInstitucionTelefono2.setAttribute('class', 'seccion');

	labelInstitucionTelefono2.setAttribute('for', 'inputInstitucionTelefono2');
	labelInstitucionTelefono2.setAttribute('id', 'labelInstitucionTelefono2');

	inputInstitucionTelefono2.setAttribute('type', 'text');
	inputInstitucionTelefono2.setAttribute('id', isPopup ? 'inputPopupInstitucionTelefono2' : 'inputInstitucionTelefono2');
	inputInstitucionTelefono2.setAttribute('name', 'inputInstitucionTelefono2');


	seccionNombreNivelEscolaridad.setAttribute('class', 'seccion');

	selectNivelEscolaridad.setAttribute('name', 'seleccionarNivelEscolaridad');
	selectNivelEscolaridad.setAttribute('id', isPopup ? 'seleccionarPopupNivelEscolaridad' : 'seleccionarNivelEscolaridad');


	seccionNombreTurno.setAttribute('class', 'seccion');

	selectTurno.setAttribute('name', 'seleccionarTurno');
	selectTurno.setAttribute('id', isPopup ? 'seleccionarPopupTurno' : 'seleccionarTurno');


	seccionNombreSostenimiento.setAttribute('class', 'seccion');

	selectSostenimiento.setAttribute('name', 'seleccionarSostenimiento');
	selectSostenimiento.setAttribute('id', isPopup ? 'seleccionarPopupSostenimiento' : 'seleccionarSostenimiento');


	seccionNombreRegion.setAttribute('class', 'seccion');

	selectRegion.setAttribute('name', 'seleccionarRegion');
	selectRegion.setAttribute('id', isPopup ? 'seleccionarPopupRegion' : 'seleccionarRegion');


	seccionNombreCiudad.setAttribute('class', 'seccion');

	selectCiudad.setAttribute('name', 'seleccionarCiudad');
	selectCiudad.setAttribute('id', isPopup ? 'seleccionarPopupCiudad' : 'seleccionarCiudad');


	botonRegistrar.setAttribute('type', 'submit');
	botonRegistrar.setAttribute('id', isPopup ? 'botonGuardar' : 'nuevoRegistro');

	labelNombreInstitucion.appendChild(document.createTextNode("Nombre de la Institucion:"));
	inputNombreInstitucion.value = isPopup ? content.nombreInstitucion : "";


	labelDireccionInstitucion.appendChild(document.createTextNode("Direccion:"));
	inputDireccionInstitucion.value = isPopup ? content.direccionInstitucion : "";


	labelNInstitucionPais.appendChild(document.createTextNode("N en el País:"));
	inputNInstitucionPais.value = isPopup ? content.nInstitucionPais : "";


	labelCct.appendChild(document.createTextNode("CCT:"));
	inputCct.value = isPopup ? content.cct : "";

	labelSelectNivelEscolaridad.appendChild(document.createTextNode('Nivel Escolaridad:'))

	labelSelectTurno.appendChild(document.createTextNode('Turno:'))

	labelSelectSostenimiento.appendChild(document.createTextNode('Sostenimiento:'))

	labelPaginaWebInstitucion.appendChild(document.createTextNode("Página web:"));
	inputPaginaWebInstitucion.value = isPopup ? content.paginaWebInstitucion : "";


	labelInstitucionTelefono1.appendChild(document.createTextNode("Teléfono 1:"));
	inputInstitucionTelefono1.value = isPopup ? content.institucionTelefono1 : "";


	labelInstitucionTelefono2.appendChild(document.createTextNode("Teléfono:"));
	inputInstitucionTelefono2.value = isPopup ? content.institucionTelefono2 : "";

	labelSelectRegion.appendChild(document.createTextNode('Region:'));

	labelSelectCiudad.appendChild(document.createTextNode('Ciudad:'))

	botonRegistrar.appendChild(document.createTextNode(isPopup ? "Guardar datos" : "Registrar Ciudad"));


	let jsonNivelEscolaridad = await fetchNivelEscolaridad();
	
	for (let i = 0; i < jsonNivelEscolaridad.body.length; i++) {
		let { nombreNivelEscolaridad: selecNombreNivelEscolaridad } = jsonNivelEscolaridad.body[i];
		let optionNivelEscolaridad = document.createElement('option');

		optionNivelEscolaridad.setAttribute('value', selecNombreNivelEscolaridad);
		optionNivelEscolaridad.appendChild(document.createTextNode(selecNombreNivelEscolaridad));

		selectNivelEscolaridad.appendChild(optionNivelEscolaridad);
	}

	selectNivelEscolaridad.value = isPopup ? content.nombreNivelEscolaridad : "";


	let jsonTurno = await fetchTurno();
	
	for (let i = 0; i < jsonTurno.body.length; i++) {
		let { nombreTurno: selecNombreTurno } = jsonTurno.body[i];
		let optionTurno = document.createElement('option');

		optionTurno.setAttribute('value', selecNombreTurno);
		optionTurno.appendChild(document.createTextNode(selecNombreTurno));

		selectTurno.appendChild(optionTurno);
	}

	selectTurno.value = isPopup ? content.nombreTurno : "";


	let jsonSostenimiento = await fetchSostenimiento();
	
	for (let i = 0; i < jsonSostenimiento.body.length; i++) {
		let { nombreSostenimiento: selecNombreSostenimiento } = jsonSostenimiento.body[i];
		let optionSostenimiento = document.createElement('option');

		optionSostenimiento.setAttribute('value', selecNombreSostenimiento);
		optionSostenimiento.appendChild(document.createTextNode(selecNombreSostenimiento));

		selectSostenimiento.appendChild(optionSostenimiento);
	}

	selectSostenimiento.value = isPopup ? content.nombreSostenimiento : "";


	let jsonRegion = await fetchRegion();
	
	for (let i = 0; i < jsonRegion.body.length; i++) {
		let { nombreRegion: selecNombreRegion } = jsonRegion.body[i];
		let optionRegion = document.createElement('option');

		optionRegion.setAttribute('value', selecNombreRegion);
		optionRegion.appendChild(document.createTextNode(selecNombreRegion));

		selectRegion.appendChild(optionRegion);
	}

	selectRegion.value = isPopup ? content.nombreRegion : "";

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

	if (isPopup) {
		addElementsToSelectCiudad(content.nombreRegion)
	}

	console.log( isPopup ? content.nombreCiudad : "No Popup");


	botonRegistrar.addEventListener("click", (e) => {
		e.preventDefault();

		isPopup ? apiUpdateInstitucion(content.nombreInstitucion) : apiAddCiudad();
	})

	selectRegion.addEventListener("change", (e) => {
		e.preventDefault();

		console.log(selectRegion.value);

		addElementsToSelectCiudad(selectRegion.value);
	})

	seccionNombreInstitucion.appendChild(labelNombreInstitucion);
	seccionNombreInstitucion.appendChild(inputNombreInstitucion);

	seccionDireccionInstitucion.appendChild(labelDireccionInstitucion);
	seccionDireccionInstitucion.appendChild(inputDireccionInstitucion);

	seccionNInstitucionPais.appendChild(labelNInstitucionPais);
	seccionNInstitucionPais.appendChild(inputNInstitucionPais);

	seccionCct.appendChild(labelCct);
	seccionCct.appendChild(inputCct);

	seccionNombreNivelEscolaridad.appendChild(labelSelectNivelEscolaridad);
	seccionNombreNivelEscolaridad.appendChild(selectNivelEscolaridad)

	seccionNombreTurno.appendChild(labelSelectTurno);
	seccionNombreTurno.appendChild(selectTurno)

	seccionNombreSostenimiento.appendChild(labelSelectSostenimiento);
	seccionNombreSostenimiento.appendChild(selectSostenimiento)

	seccionPaginaWebInstitucion.appendChild(labelPaginaWebInstitucion);
	seccionPaginaWebInstitucion.appendChild(inputPaginaWebInstitucion);

	seccionInstitucionTelefono1.appendChild(labelInstitucionTelefono1);
	seccionInstitucionTelefono1.appendChild(inputInstitucionTelefono1);

	seccionInstitucionTelefono2.appendChild(labelInstitucionTelefono2);
	seccionInstitucionTelefono2.appendChild(inputInstitucionTelefono2);

	seccionNombreRegion.appendChild(labelSelectRegion);
	seccionNombreRegion.appendChild(selectRegion);

	seccionNombreCiudad.appendChild(labelSelectCiudad);
	seccionNombreCiudad.appendChild(selectCiudad);

	form.appendChild(seccionNombreInstitucion);
	form.appendChild(seccionDireccionInstitucion)
	form.appendChild(seccionNInstitucionPais)
	form.appendChild(seccionCct)
	form.appendChild(seccionNombreNivelEscolaridad)
	form.appendChild(seccionNombreTurno)
	form.appendChild(seccionNombreSostenimiento)
	form.appendChild(seccionPaginaWebInstitucion)
	form.appendChild(seccionInstitucionTelefono1)
	form.appendChild(seccionInstitucionTelefono2)
	form.appendChild(seccionNombreRegion);
	form.appendChild(seccionNombreCiudad)
//	form.appendChild(seccionNombreRegion);
	form.appendChild(botonRegistrar);

	parent.appendChild(form);
}

const buscarElemento = (parent, busqueda) => {
	let containerBuscar = document.createElement('div');
	let formBuscar = document.createElement('form');
	let labelBuscarNombreInstitucion = document.createElement('label');
	let inputBuscarNombreInstitucion = document.createElement('input');
	let botonBuscarNombreInstitucion = document.createElement('button');

	containerBuscar.setAttribute('class', 'containerBuscar');
	formBuscar.setAttribute('class', 'formBuscar');

	labelBuscarNombreInstitucion.setAttribute('id', 'labelBuscarNombreInstitucion');
	labelBuscarNombreInstitucion.setAttribute('for', 'inputBuscarNombreInstitucion');

	inputBuscarNombreInstitucion.setAttribute('type', 'text');
	inputBuscarNombreInstitucion.setAttribute('name', 'inputBuscarNombreInstitucion');
	inputBuscarNombreInstitucion.setAttribute('id', 'inputBuscarNombreInstitucion');

	botonBuscarNombreInstitucion.setAttribute('type', 'submit');
	botonBuscarNombreInstitucion.setAttribute('id', 'botonBuscarNombreInstitucion');

	labelBuscarNombreInstitucion.appendChild(document.createTextNode('Buscar ciudad: '));
	inputBuscarNombreInstitucion.value = busqueda;
	botonBuscarNombreInstitucion.appendChild(document.createTextNode('Buscar'));

	botonBuscarNombreInstitucion.addEventListener("click", (e) => {
		e.preventDefault();
		apiBuscarInstitucion();
	})

	formBuscar.appendChild(labelBuscarNombreInstitucion);
	formBuscar.appendChild(inputBuscarNombreInstitucion);
	formBuscar.appendChild(botonBuscarNombreInstitucion);

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

	moduloInstitucion.innerHTML = "";

	insertModuloInstitucion();
}

const goToNextPage = () => {
	offset = offset + limit;

	moduloInstitucion.innerHTML = "";

	console.log(offset)
	console.log(limit)

	insertModuloInstitucion();
}

//-------------- AREA FUNCIONES EVENTS LISTENERS ------------

const apiAddCiudad = () => {
	const nombreInstitucion = document.getElementById('inputNombreInstitucion').value
	const direccionInstitucion = document.getElementById('inputDireccionInstitucion').value
	const nInstitucionPais = document.getElementById('inputNInstitucionPais').value
	const cct = document.getElementById('inputCct').value
	const nombreNivelEscolaridad = document.getElementById('seleccionarNivelEscolaridad').value
	const nombreTurno = document.getElementById('seleccionarTurno').value
	const nombreSostenimiento = document.getElementById('seleccionarSostenimiento').value
	const paginaWebInstitucion = document.getElementById('inputPaginaWebInstitucion').value
	const institucionTelefono1 = document.getElementById('inputInstitucionTelefono1').value
	const institucionTelefono2 = document.getElementById('inputInstitucionTelefono2').value
	const nombreCiudad = document.getElementById('seleccionarCiudad').value;

	fetchAddInstitucion(
	nombreInstitucion,
	direccionInstitucion,
	nInstitucionPais,
	cct,
	nombreNivelEscolaridad,
	nombreTurno,
	nombreSostenimiento,
	paginaWebInstitucion,
	institucionTelefono1,
	institucionTelefono2,
	nombreCiudad
).then( (json) => {
		if (json.error) {
			alert("Hubo un problema al registrar la Region");
		} else {
			alert("El registro se ha añadido con éxito")
			location.reload();
		}
	})
}

const apiUpdateInstitucion = (antiguoNombreInstitucion) => {
	const nombreInstitucion = document.getElementById('inputPopupNombreInstitucion').value
	const direccionInstitucion = document.getElementById('inputPopupDireccionInstitucion').value
	const nInstitucionPais = document.getElementById('inputPopupNInstitucionPais').value
	const cct = document.getElementById('inputPopupCct').value
	const nombreNivelEscolaridad = document.getElementById('seleccionarPopupNivelEscolaridad').value
	const nombreTurno = document.getElementById('seleccionarPopupTurno').value
	const nombreSostenimiento = document.getElementById('seleccionarPopupSostenimiento').value
	const paginaWebInstitucion = document.getElementById('inputPopupPaginaWebInstitucion').value
	const institucionTelefono1 = document.getElementById('inputPopupInstitucionTelefono1').value
	const institucionTelefono2 = document.getElementById('inputPopupInstitucionTelefono2').value
	const nombreCiudad = document.getElementById('seleccionarPopupCiudad').value;

		if(!confirm("¿Estas seguro de guardar cambios?")) {
			return 0;
		}

		fetchUpdateInstitucion(
			antiguoNombreInstitucion,
			nombreInstitucion,
			direccionInstitucion,
			nInstitucionPais,
			cct,
			nombreNivelEscolaridad,
			nombreTurno,
			nombreSostenimiento,
			paginaWebInstitucion,
			institucionTelefono1,
			institucionTelefono2,
			nombreCiudad
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

const apiDelInstitucion = (nombreInstitucion) => {
		if (!confirm("¿Seguro que quieres eliminar el registro?")) {
			return 0;
		}

		fetchDelInstitucion(nombreInstitucion).then( (json) => {
			console.log(json);
			if(json.error) {
				alert("Hubo un error al eliminar el registro")
				return 0;
			}

			alert("El registro ha sido eliminado con éxito!");
			location.reload();
			});
}

const apiBuscarInstitucion = () => {
	const nombreInstitucion = document.getElementById('inputBuscarNombreInstitucion').value

	if (nombreInstitucion == "") {
		alert("No pueden haber campos vacíos");

		return 0;
	}

	isBusqueda = true;
	busqueda = nombreInstitucion;

	moduloInstitucion.innerHTML = "";

	insertModuloInstitucion();
}

export default insertModuloInstitucion;
