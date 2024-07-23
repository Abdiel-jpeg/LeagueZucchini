
import { getParams, getQueryParams } from '/js/fetchParams.js';

let moduloRegion = document.getElementsByClassName('moduloRegion')[0];
let	popup = document.getElementsByClassName("popup")[0];
let	popupContent = document.getElementsByClassName("popup-content")[0];

let count = 0;
let limit = 10;
let offset = 0;

let isBusqueda = false;
let busqueda = "";

//----------------------- AREA API  -----------------------------

const fetchRegion = async () => {
	const response = await fetch(`/api/region/get/${limit}/${offset}`, getParams);
	const json = await response.json();
	return json;
}

const fetchSearchRegion = async (nombreRegion) => {
	const response = await fetch(`/api/region/search/${nombreRegion}/${limit}/${offset}`);
	const json = await response.json();
	return json;
}

const fetchAddRegion = async (nombreRegion) => {
	const query = {
		"nombreRegion": nombreRegion,
	}

	const response = await fetch('/api/region/', getQueryParams('POST', query));
	const json = await response.json();
	return json;
}

const fetchDelRegion = async (nombreRegion) => {
	const query = {
		"nombreRegion": nombreRegion
	}

	const response = await fetch('/api/region', getQueryParams('DELETE', query));
	const json = await response.json();
	return json;
}

const fetchUpdateRegion = async (nuevoNombreRegion, nombreRegion) => {
	const query = {
		"nuevoNombreRegion": nuevoNombreRegion,
		"nombreRegion": nombreRegion
	}

	const response = await fetch('/api/region', getQueryParams('PUT', query));
	const json = await response.json();
	return json;
}

//------------------- AREA FUNCIONES MODULO -----------------

const insertModuloRegion = async () => {
	moduloRegion.style.display = "flex"; //Hacemos visible al modulo Region

	await formularioElemento(moduloRegion); //Concatenamos formulario para insertar elementos
	buscarElemento(moduloRegion, busqueda);

	let containerTabla = document.createElement('div')
	let tablaRegion = document.createElement('table');
	let tbodyRegion = document.createElement('tbody');
	let cabecera = document.createElement('tr');
	let cabeceraNombreRegion = document.createElement('th');

	containerTabla.setAttribute('class', 'containerTabla');
	tbodyRegion.setAttribute("class", 'tablaRegion');
	cabecera.setAttribute('class', 'cabecera');
	
	cabeceraNombreRegion.appendChild(document.createTextNode('Región'));

	cabecera.appendChild(cabeceraNombreRegion)
	cabecera.appendChild(document.createElement('th'));

	tbodyRegion.appendChild(cabecera);

	if (!isBusqueda) {
		let { body } = await fetchRegion();

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaRegion(body[i], tbodyRegion);
		}

	} else {
		let { body } = await fetchSearchRegion(busqueda);

		count = body[0].count

		for(let i = 0; i < body.length; i++) {
			insertRowsTablaRegion(body[i], tbodyRegion);
		}
	}

	tablaRegion.appendChild(tbodyRegion);
	containerTabla.appendChild(tablaRegion);

	insertPageButtons(containerTabla);

	moduloRegion.appendChild(containerTabla);
}

const insertRowsTablaRegion = ({ nombreRegion }, tbodyRegion) => {
	let row = document.createElement('tr');
	let columnNombreRegion = document.createElement('th')
	let columnEditarRegion = document.createElement('th')
	let botonEditar = document.createElement('button');

	row.setAttribute('class', 'row');

	botonEditar.setAttribute('type', 'button');
	botonEditar.setAttribute('name', 'editar');
	botonEditar.setAttribute('id', 'editar');

	botonEditar.addEventListener('click', (e) => {
		e.preventDefault();
	
		//Al darle al boton editar, deberia salirnos el popup, llamándolo con la
		//siguiente función
		insertPopupContent(nombreRegion);
	})

	botonEditar.appendChild(document.createTextNode("editar"));

	columnNombreRegion.appendChild(document.createTextNode(nombreRegion));
	columnEditarRegion.appendChild(botonEditar);
	
	row.appendChild(columnNombreRegion);
	row.appendChild(columnEditarRegion);

	tbodyRegion.appendChild(row);
}

const insertPopupContent = (nombreRegion) => {
	popupContent.innerHTML = ""; //Limpiamos antes de iniciar
	popup.style.display = "flex"; //Aparecemos el popup

	let botonCerrar = document.createElement('button');
	let botonEliminar = document.createElement('button');
	botonCerrar.setAttribute('class', 'botonCerrar')

	botonEliminar.setAttribute('type', 'button');
	botonEliminar.setAttribute('class', 'botonEliminar')

	botonCerrar.appendChild(document.createTextNode("X"));
	botonEliminar.appendChild(document.createTextNode("Eliminar Region"));

	botonCerrar.addEventListener("click", (e) => {
		popup.style.display = 'none';
	})

	botonEliminar.addEventListener("click", (e) => {
		e.preventDefault();

		apiDelRegion(nombreRegion);
	})

	formularioElemento(popupContent, true, nombreRegion);
	popupContent.appendChild(botonEliminar);
	popupContent.appendChild(botonCerrar);
}

const formularioElemento = async (parent, isPopup, nombreRegion) => {
	let form = document.createElement('form');
	let seccionNombreRegion = document.createElement('div')
	let labelNombreRegion = document.createElement('label');
	let inputNombreRegion = document.createElement('input');
	let botonRegistrar = document.createElement('button');

	form.setAttribute('class', 'form');
	
	seccionNombreRegion.setAttribute('class', 'seccion');

	labelNombreRegion.setAttribute('for', 'inputNombreRegion');
	labelNombreRegion.setAttribute('id', 'labelNombreRegion');

	inputNombreRegion.setAttribute('type', 'text');
	inputNombreRegion.setAttribute('id', isPopup ? 'inputPopupNombreRegion' : 'inputNombreRegion');
	inputNombreRegion.setAttribute('name', 'inputNombreRegion');
	inputNombreRegion.required = true;

	botonRegistrar.setAttribute('type', 'submit');
	botonRegistrar.setAttribute('id', isPopup ? 'botonGuardar' : 'nuevoRegistro');

	labelNombreRegion.appendChild(document.createTextNode("Nombre de Región:"));
	inputNombreRegion.value = isPopup ? nombreRegion : "";
	botonRegistrar.appendChild(document.createTextNode(isPopup ? "Guardar datos" : "Registrar Region"));

	botonRegistrar.addEventListener("click", (e) => {
		e.preventDefault();

		isPopup ? apiUpdateRegion(nombreRegion) : apiAddRegion();
	})

	seccionNombreRegion.appendChild(labelNombreRegion);
	seccionNombreRegion.appendChild(inputNombreRegion);

	form.appendChild(seccionNombreRegion);
	form.appendChild(botonRegistrar);

	parent.appendChild(form);
}

const buscarElemento = (parent, busqueda) => {
	let containerBuscar = document.createElement('div');
	let formBuscar = document.createElement('form');
	let labelBuscarNombreRegion = document.createElement('label');
	let inputBuscarNombreRegion = document.createElement('input');
	let botonBuscarNombreRegion = document.createElement('button');

	containerBuscar.setAttribute('class', 'containerBuscar');
	formBuscar.setAttribute('class', 'formBuscar');

	labelBuscarNombreRegion.setAttribute('id', 'labelBuscarNombreRegion');
	labelBuscarNombreRegion.setAttribute('for', 'inputBuscarNombreRegion');

	inputBuscarNombreRegion.setAttribute('type', 'text');
	inputBuscarNombreRegion.setAttribute('name', 'inputBuscarNombreRegion');
	inputBuscarNombreRegion.setAttribute('id', 'inputBuscarNombreRegion');

	botonBuscarNombreRegion.setAttribute('type', 'submit');
	botonBuscarNombreRegion.setAttribute('id', 'botonBuscarNombreRegion');

	labelBuscarNombreRegion.appendChild(document.createTextNode('Buscar región: '));
	inputBuscarNombreRegion.value = busqueda;
	botonBuscarNombreRegion.appendChild(document.createTextNode('Buscar'));

	botonBuscarNombreRegion.addEventListener("click", (e) => {
		e.preventDefault();
		apiBuscarRegion();
	})

	formBuscar.appendChild(labelBuscarNombreRegion);
	formBuscar.appendChild(inputBuscarNombreRegion);
	formBuscar.appendChild(botonBuscarNombreRegion);

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

	moduloRegion.innerHTML = "";

	insertModuloRegion();
}

const goToNextPage = () => {
	offset = offset + limit;

	moduloRegion.innerHTML = "";

	console.log(offset)
	console.log(limit)

	insertModuloRegion();
}

//-------------- AREA FUNCIONES EVENTS LISTENERS ------------

const apiAddRegion = () => {
	const nombreRegion = document.getElementById('inputNombreRegion').value;

	if (nombreRegion == "") {
		alert("Selecciona una region por favor");

		return 0;
	}

	fetchAddRegion(nombreRegion).then( (json) => {
		if (json.error) {
			alert("Hubo un problema al registrar la Region");
		} else {
			alert("El registro se ha añadido con éxito")
			location.reload();
		}
	})
}

const apiUpdateRegion = (nombreRegion) => {
		const nuevoNombreRegion = document.getElementById('inputPopupNombreRegion').value

		if(!confirm("¿Estas seguro de guardar cambios?")) {
			return 0;
		}

		fetchUpdateRegion(nuevoNombreRegion, nombreRegion).then( (json) => {
			if (json.error) {
				alert("Hubo un error al actualizar los datos");
				console.log(json)
				return 0;
			}

			alert("El guardado de los datos ha sido exitoso");
			location.reload();
		} )
}

const apiDelRegion = (nombreRegion) => {
		if (!confirm("¿Seguro que quieres eliminar el registro?")) {
			return 0;
		}

		fetchDelRegion(nombreRegion).then( (json) => {
			console.log(json);
			if(json.error) {
				alert("Hubo un error al eliminar el registro")
				return 0;
			}

			alert("El registro ha sido eliminado con éxito!");
			location.reload();
			});
}

const apiBuscarRegion = () => {
	const nombreRegion = document.getElementById('inputBuscarNombreRegion').value

	if (nombreRegion == "") {
		alert("No pueden haber campos vacíos");

		return 0;
	}

	isBusqueda = true;
	busqueda = nombreRegion;

	moduloRegion.innerHTML = "";

	insertModuloRegion();
}

export default insertModuloRegion;
