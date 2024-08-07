
import { getParams, getQueryParams } from '/js/fetchParams.js';

let moduloEvento = document.getElementsByClassName('moduloEvento')[0];
let	popup = document.getElementsByClassName("popup")[0];
let	popupContent = document.getElementsByClassName("popup-content")[0]; 

let count = 0;
let limit = 10;
let offset = 0;

let isBusqueda = false;
let busqueda = "";

let tipoCompeticion = '';

//----------------------- AREA API  -----------------------------

const fetchEvento = async (nombreEvento) => {
	const response = await fetch(`/api/evento/${nombreEvento}/${limit}/${offset}`, getParams);
	const json = await response.json();
	return json;
}

const fetchCompeticion = async () => {
	const response = await fetch('/api/competicion/get/0/0', getParams);
	const json = await response.json();
	return json;
}

const fetchUpdateEvento = async (query) => {
	const response = await fetch('/api/evento/', getQueryParams('PUT', query));
	const json = await response.json();
	return json;
}

//------------------- AREA FUNCIONES MODULO -----------------
	
const insertModuloEvento = async () => {
	moduloEvento.style.display = "flex"; //Hacemos visible al modulo Region

	await insertCompeticionSelector();
}

const insertCompeticionSelector = async (nombreCompeticion) => {
	let divLabelsCompeticion = document.createElement('div');
	// Contenedor principal
	let divHeadControlEvento = document.createElement('div');
	divHeadControlEvento.setAttribute('class', 'head-control-evento');

	// Label Seleccionar Competición
	let labelSeleccionarCompeticion = document.createElement('label');
	labelSeleccionarCompeticion.setAttribute('id', 'labelSeleccionarCompeticion');
	labelSeleccionarCompeticion.appendChild(document.createTextNode('Seleccionar competición:'));

	// Select Competición
	let selectCompeticion = document.createElement('select');
	selectCompeticion.setAttribute('id', 'selectCompeticionControlEvento');
	selectCompeticion.setAttribute('name', 'selectCompeticionControlEvento');

	const { body } = await fetchCompeticion();

	let optionDefault = document.createElement('option');

	optionDefault.setAttribute("selected", "selected")
	optionDefault.setAttribute("disabled", "disabled")
	optionDefault.setAttribute("hidden", "hidden")
	optionDefault.setAttribute("value", "")
	optionDefault.textContent = "Seleccionar competicion"

	selectCompeticion.appendChild(optionDefault)

	body.forEach( item => {
		let option = document.createElement('option');
		let label = document.createElement('label')
		
		option.setAttribute('value', item.nombreCompeticion);
		option.textContent = item.nombreCompeticion;

		label.setAttribute('id', item.nombreCompeticion);
		label.setAttribute('class', 'evento-labels-competicion');

		label.style.display = "none";

		label.appendChild(document.createTextNode(item.nombreTipoCompeticion));

		divLabelsCompeticion.appendChild(label);

		selectCompeticion.appendChild(option)
	} )

	if (nombreCompeticion) {
		selectCompeticion.value = nombreCompeticion;
	}

	selectCompeticion.addEventListener("change", async (e) => {
		moduloEvento.innerHTML = "";
	
		body.forEach( (competicion) => {
			if (competicion.nombreCompeticion == selectCompeticion.value) {
				tipoCompeticion = competicion.nombreTipoCompeticion;
			}
		} )

		await insertCompeticionSelector(selectCompeticion.value);
		await insertTablaEvento(selectCompeticion.value);
	})

	// Sección Labels Competición
	let divSeccionLabelsCompeticion = document.createElement('div');
	divSeccionLabelsCompeticion.setAttribute('class', 'seccion-labels-competicion');

	// Sub-div para Tipo Competición
	let divTipoCompeticion = document.createElement('div');
	let labelTipoCompeticion = document.createElement('label');
	labelTipoCompeticion.appendChild(document.createTextNode('Tipo competición:'));

	divTipoCompeticion.appendChild(labelTipoCompeticion);

	// Div para Labels Competición

	divLabelsCompeticion.setAttribute('id', 'eventoLabelsCompeticion');

	divLabelsCompeticion.appendChild(document.createElement('label').appendChild(document.createTextNode(tipoCompeticion)))

	// Append sub-divs to Sección Labels Competición
	divSeccionLabelsCompeticion.appendChild(divTipoCompeticion);
	divSeccionLabelsCompeticion.appendChild(divLabelsCompeticion);

	// Append all elements to the main container
	divHeadControlEvento.appendChild(labelSeleccionarCompeticion);
	divHeadControlEvento.appendChild(selectCompeticion);
	divHeadControlEvento.appendChild(divSeccionLabelsCompeticion);

	// Append the main container to the parent element
	moduloEvento.appendChild(divHeadControlEvento);
}

const insertTablaEvento = async (nombreCompeticion) => {
	let containerTablaEvento = document.createElement('div')
	let containerTablaEquipo1 = document.createElement('div');
	let containerTablaEquipo2 = document.createElement('div');
	let tablaEvento = document.createElement('table');
	let tablaEquipo1 = document.createElement('table');
	let tablaEquipo2 = document.createElement('table');
	let tbody = document.createElement('tbody');
	let tbodyEquipo1 = document.createElement('tbody');
	let tbodyEquipo2 = document.createElement('tbody')
	let cabecera = document.createElement('tr');
	let cabeceraEquipo1 = document.createElement('tr');
	let cabeceraEquipo2 = document.createElement('tr');

	let cabecerasEvento = [
		'ID Evento', 
		'Nombre Evento', 
		'Fase Actual',
		'Fecha Inicio',
		'Cantidad Tiempo Extra', 
		'Ganador Partido', 
		'Es Partido Empatado', 
		''
  ];

	let cabecerasEquipo1 = [ 
		'ID Equipo 1', 
		'Grado Equipo 1', 
		'Grupo Equipo 1', 
		'Nombre Grupo Equipo 1', 
		'Nombre Institución Equipo 1', 
		'Goles Equipo 1', 
		'Tarjetas Amarillas Equipo 1', 
		'Tarjetas Rojas Equipo 1', 
		'Goles Penales Finales Equipo 1', 
		'Puntos Equipo 1',
		''
	]

	let cabecerasEquipo2 = [ 
		'ID Equipo 2', 
		'Grado Equipo 2', 
		'Grupo Equipo 2', 
		'Nombre Grupo Equipo 2', 
		'Nombre Institución Equipo 2', 
		'Goles Equipo 2', 
		'Tarjetas Amarillas Equipo 2', 
		'Tarjetas Rojas Equipo 2', 
		'Goles Penales Finales Equipo 2', 
		'Puntos Equipo 2',
		''
	]

	cabecerasEvento.forEach(textoCabecera => {
		let th = document.createElement('th');
		th.appendChild(document.createTextNode(textoCabecera));
		cabecera.appendChild(th)
	})

	cabecerasEquipo1.forEach(textoCabecera => {
		let th = document.createElement('th');
		th.appendChild(document.createTextNode(textoCabecera));
		cabeceraEquipo1.appendChild(th)
	})

	cabecerasEquipo2.forEach(textoCabecera => {
		let th = document.createElement('th');
		th.appendChild(document.createTextNode(textoCabecera));
		cabeceraEquipo2.appendChild(th)
	})

	containerTablaEquipo1.setAttribute('class', 'containerTabla');
	containerTablaEquipo2.setAttribute('class', 'containerTabla');
	tbody.setAttribute("class", 'tablaEvento');
	tbodyEquipo1.setAttribute("class", 'tablaEvento');
	tbodyEquipo2.setAttribute("class", 'tablaEvento');
	cabecera.setAttribute('class', 'cabecera');
	cabeceraEquipo1.setAttribute('class', 'cabecera');
	cabeceraEquipo2.setAttribute('class', 'cabecera');

	tbody.appendChild(cabecera);
	tbodyEquipo1.appendChild(cabeceraEquipo1);
	tbodyEquipo2.appendChild(cabeceraEquipo2);

	let { body } = await fetchEvento(nombreCompeticion);

	count = body[0].count

	body.forEach( evento => {
		let filaEvento = document.createElement('tr');
		let filaEquipo1 = document.createElement('tr');
		let filaEquipo2 = document.createElement('tr');

		let datosEvento = [
			evento.idEvento, 
			evento.nombreEvento,
			evento.faseActual,
			evento.fechaInicio,
      evento.cantidadTiempoExtra, 
			evento.ganadorPartido, 
			evento.esPartidoEmpatado, 
    ];

		let datosEquipo1 = [ 
			evento.idEquipo1, 
      evento.gradoEquipo1, 
			evento.grupoEquipo1, 
			evento.nombreGrupoEquipo1, 
			evento.nombreInstitucionEquipo1, 
      evento.golesEquipo1, 
			evento.tarjetasAmarillasEquipo1, 
			evento.tarjetasRojasEquipo1, 
      evento.golesPenalesFinalesEquipo1, 
			evento.puntosEquipo1
		]

		let datosEquipo2 = [
			evento.idEquipo2, 
			evento.gradoEquipo2, 
			evento.grupoEquipo2, 
      evento.nombreGrupoEquipo2, 
			evento.nombreInstitucionEquipo2, 
			evento.golesEquipo2, 
      evento.tarjetasAmarillasEquipo2, 
			evento.tarjetasRojasEquipo2, 
			evento.golesPenalesFinalesEquipo2, 
			evento.puntosEquipo2
		]

		datosEvento.forEach( value => {
			let columna = document.createElement('th');

			columna.appendChild(document.createTextNode(value));
			filaEvento.appendChild(columna)
		} );

		datosEquipo1.forEach( value => {
			let columna = document.createElement('th');
			columna.appendChild(document.createTextNode(value));
			filaEquipo1.appendChild(columna)
		} );

		datosEquipo2.forEach( value => {
			let columna = document.createElement('th');
			columna.appendChild(document.createTextNode(value));
			filaEquipo2.appendChild(columna)
		} );
		let columnaEditarEvento = document.createElement('th');
		let columnaEditarEquipo1 = document.createElement('th');
		let columnaEditarEquipo2 = document.createElement('th');
		let botonEditarEvento = document.createElement('button');
		let botonEditarEquipo1 = document.createElement('button');
		let botonEditarEquipo2 = document.createElement('button');
		
		botonEditarEvento.appendChild(document.createTextNode('Editar'));
		botonEditarEquipo1.appendChild(document.createTextNode('Editar'));
		botonEditarEquipo2.appendChild(document.createTextNode('Editar'));

		botonEditarEvento.addEventListener("click", (e) => {
			e.preventDefault();

			insertPopupContent(datosEvento, evento.idEvento, null, true);
		})

		botonEditarEquipo1.addEventListener("click", (e) => {
			e.preventDefault();
			
			let contentEquipo1 = [
				{
					nombre: "golesEquipo1", 
					valor: evento.golesEquipo1, 
					texto: "Goles"
				},
				{
					nombre: "tarjetasAmarillasEquipo1", 
					valor: evento.tarjetasAmarillasEquipo1, 
					texto: 'Tarjetas amarillas'
				},
				{
					nombre: "tarjetasRojasEquipo1", 
					valor: evento.tarjetasRojasEquipo1, 
					texto: 'Tarjetas rojas'
				},
				{
					nombre: "golesPenalesFinalesEquipo1", 
					valor: evento.golesPenalesFinalesEquipo1, 
					texto:'Goles penales finales'
				}
			]

			insertPopupContent(contentEquipo1, evento.idEvento, evento.idEquipo1, false, 1);
		});

		botonEditarEquipo2.addEventListener("click", (e) =>{
			e.preventDefault();

			let contentEquipo2 = [
				{
					nombre: "golesEquipo2", 
					valor: evento.golesEquipo2, 
					texto: 'Goles'
				},
				{
					nombre: "tarjetasAmarillasEquipo2", 
					valor: evento.tarjetasAmarillasEquipo2, 
					texto: 'Tarjetas Amarillas'
				},
				{
					nombre: "tarjetasRojasEquipo2", 
					valor: evento.tarjetasRojasEquipo2, 
					texto:"Tarjetas Rojas"
				},
				{
					nombre: "golesPenalesFinalesEquipo2", 
					valor: evento.golesPenalesFinalesEquipo2, 
					texto: "Goles penales finales"}
			]

			insertPopupContent(contentEquipo2, evento.idEvento, evento.idEquipo2, false, 2);
		})

		columnaEditarEvento.appendChild(botonEditarEvento);
		columnaEditarEquipo1.appendChild(botonEditarEquipo1);
		columnaEditarEquipo2.appendChild(botonEditarEquipo2)

		filaEvento.appendChild(columnaEditarEvento);
		filaEquipo1.appendChild(columnaEditarEquipo1);
		filaEquipo2.appendChild(columnaEditarEquipo2)

		tbody.appendChild(filaEvento);
		tbodyEquipo1.appendChild(filaEquipo1)
		tbodyEquipo2.appendChild(filaEquipo2);
	} );
	
	tablaEvento.appendChild(tbody);
	tablaEquipo1.appendChild(tbodyEquipo1);
	tablaEquipo2.appendChild(tbodyEquipo2)
	containerTablaEvento.appendChild(tablaEvento);
	containerTablaEquipo1.appendChild(tablaEquipo1);
	containerTablaEquipo2.appendChild(tablaEquipo2);

	insertPageButtons(containerTablaEvento);
	insertPageButtons(containerTablaEquipo1);
	insertPageButtons(containerTablaEquipo2);

	moduloEvento.appendChild(containerTablaEvento);
	moduloEvento.appendChild(containerTablaEquipo1);
	moduloEvento.appendChild(containerTablaEquipo2);
	
}

const insertPopupContent = (content, idEvento, idEquipo, isFormularioEvento = false, nEquipo) => {
	popupContent.innerHTML = ""; //Limpiamos antes de iniciar
	popup.style.display = "flex"; //Aparecemos el popup

	let botonCerrar = document.createElement('button');
	botonCerrar.setAttribute('class', 'botonCerrar')

	botonCerrar.appendChild(document.createTextNode("X"));

	botonCerrar.addEventListener("click", (e) => {
		popup.style.display = 'none';
	})

	isFormularioEvento ? 
		formularioEvento(popupContent, content, idEvento) :
		formularioElemento(popupContent, true, content, idEvento, idEquipo);

	let botonGuardar = document.createElement('button');

	botonGuardar.appendChild(document.createTextNode('Guardar'));

	botonGuardar.addEventListener('click', (e) => {
		e.preventDefault();

		apiUpdateEvento(idEvento, nEquipo);
	})

	popupContent.appendChild(botonCerrar);
	popupContent.appendChild(botonGuardar);
}

const formularioEvento = (parent, content, idEvento) => {
	console.log(content);
	let form = document.createElement('form');

	// Nombre del Evento
	let divNombreEvento = document.createElement('div');
	let labelNombreEvento = document.createElement('label');
	let inputNombreEvento = document.createElement('input');

	divNombreEvento.setAttribute('class', "seccion");

	labelNombreEvento.setAttribute('for', 'inputNombreEvento');
	labelNombreEvento.setAttribute('id', 'labelNombreEvento');

	labelNombreEvento.appendChild(document.createTextNode('Nombre del Evento:'));

	inputNombreEvento.setAttribute('type', 'text');
	inputNombreEvento.setAttribute('id', 'inputNombreEvento');
	inputNombreEvento.setAttribute('name', 'inputNombreEvento');
	inputNombreEvento.value = content.nombreEvento == null ? "" : content.nombreEvento;

	divNombreEvento.appendChild(labelNombreEvento);
	divNombreEvento.appendChild(inputNombreEvento);

	form.appendChild(divNombreEvento);

	// Fase Actual
	let divFaseActual = document.createElement('div');
	let labelFaseActual = document.createElement('label');
	let inputFaseActual = document.createElement('input');

	divFaseActual.setAttribute('class', "seccion");

	labelFaseActual.setAttribute('for', 'inputFaseActual');
	labelFaseActual.setAttribute('id', 'labelFaseActual');

	labelFaseActual.appendChild(document.createTextNode('Fase Actual:'));

	inputFaseActual.setAttribute('type', 'text');
	inputFaseActual.setAttribute('id', 'inputFaseActual');
	inputFaseActual.setAttribute('name', 'inputFaseActual');
	inputFaseActual.value = content.faseActual;

	divFaseActual.appendChild(labelFaseActual);
	divFaseActual.appendChild(inputFaseActual);

	form.appendChild(divFaseActual);

	// Fecha de Inicio
	let divFechaInicio = document.createElement('div');
	let labelFechaInicio = document.createElement('label');
	let inputFechaInicio = document.createElement('input');

	divFechaInicio.setAttribute('class', "seccion");

	labelFechaInicio.setAttribute('for', 'inputFechaInicio');
	labelFechaInicio.setAttribute('id', 'labelFechaInicio');

	labelFechaInicio.appendChild(document.createTextNode('Fecha de Inicio:'));

	inputFechaInicio.setAttribute('type', 'date');
	inputFechaInicio.setAttribute('id', 'inputFechaInicio');
	inputFechaInicio.setAttribute('name', 'inputFechaInicio');
	inputFechaInicio.value = content.fechaInicio;

	divFechaInicio.appendChild(labelFechaInicio);
	divFechaInicio.appendChild(inputFechaInicio);

	form.appendChild(divFechaInicio);

	// Cantidad de Tiempo Extra
	let divCantidadTiempoExtra = document.createElement('div');
	let labelCantidadTiempoExtra = document.createElement('label');
	let inputCantidadTiempoExtra = document.createElement('input');

	divCantidadTiempoExtra.setAttribute('class', "seccion");

	labelCantidadTiempoExtra.setAttribute('for', 'inputCantidadTiempoExtra');
	labelCantidadTiempoExtra.setAttribute('id', 'labelCantidadTiempoExtra');

	labelCantidadTiempoExtra.appendChild(document.createTextNode('Cantidad de Tiempo Extra:'));

	inputCantidadTiempoExtra.setAttribute('type', 'number');
	inputCantidadTiempoExtra.setAttribute('id', 'inputCantidadTiempoExtra');
	inputCantidadTiempoExtra.setAttribute('name', 'inputCantidadTiempoExtra');
	inputCantidadTiempoExtra.value = content.cantidadTiempoExtra;

	divCantidadTiempoExtra.appendChild(labelCantidadTiempoExtra);
	divCantidadTiempoExtra.appendChild(inputCantidadTiempoExtra);

	form.appendChild(divCantidadTiempoExtra);

	// Ganador del Partido
	let divGanadorPartido = document.createElement('div');
	let labelGanadorPartido = document.createElement('label');
	let selectGanadorPartido = document.createElement('select');

	divGanadorPartido.setAttribute('class', "seccion");

	labelGanadorPartido.setAttribute('for', 'selectGanadorPartido');
	labelGanadorPartido.setAttribute('id', 'labelGanadorPartido');

	labelGanadorPartido.appendChild(document.createTextNode('Ganador del Partido:'));

	selectGanadorPartido.setAttribute('id', 'selectGanadorPartido');
	selectGanadorPartido.setAttribute('name', 'selectGanadorPartido');

	let optionEquipo1 = document.createElement('option');
	optionEquipo1.setAttribute('value', 'Equipo 1');
	optionEquipo1.appendChild(document.createTextNode('Equipo 1'));

	let optionEquipo2 = document.createElement('option');
	optionEquipo2.setAttribute('value', 'Equipo 2');
	optionEquipo2.appendChild(document.createTextNode('Equipo 2'));

	selectGanadorPartido.appendChild(optionEquipo1);
	selectGanadorPartido.appendChild(optionEquipo2);
	selectGanadorPartido.value = content.ganadorPartido;

	divGanadorPartido.appendChild(labelGanadorPartido);
	divGanadorPartido.appendChild(selectGanadorPartido);

	form.appendChild(divGanadorPartido);

	// Partido Empatado
	let divPartidoEmpatado = document.createElement('div');
	let labelPartidoEmpatado = document.createElement('label');
	let inputPartidoEmpatado = document.createElement('input');

	divPartidoEmpatado.setAttribute('class', "seccion");

	labelPartidoEmpatado.setAttribute('for', 'inputPartidoEmpatado');
	labelPartidoEmpatado.setAttribute('id', 'labelPartidoEmpatado');

	labelPartidoEmpatado.appendChild(document.createTextNode('Partido Empatado:'));

	inputPartidoEmpatado.setAttribute('type', 'checkbox');
	inputPartidoEmpatado.setAttribute('id', 'inputPartidoEmpatado');
	inputPartidoEmpatado.setAttribute('name', 'inputPartidoEmpatado');
	inputPartidoEmpatado.checked = content.esPartidoEmpatado;

	switch(tipoCompeticion) {
		case "Regular.Ida y Vuelta":
		case "Regular. Todos contra Todos":
			inputFaseActual.setAttribute('disabled', 'disabled');
			labelFaseActual.style.color = 'gray';
			break;

		case "Eliminación Directa":
			inputPartidoEmpatado.setAttribute('disabled', 'disabled')
			labelPartidoEmpatado.style.color = 'gray';
			break;
	}

	divPartidoEmpatado.appendChild(labelPartidoEmpatado);
	divPartidoEmpatado.appendChild(inputPartidoEmpatado);

	form.appendChild(divPartidoEmpatado);
	
	// Append the form to the parent element
	parent.appendChild(form);
}


const formularioElemento = (parent, isPopup, content, idEvento, idEquipo) => {
	let form = document.createElement('form');

	form.setAttribute('class', 'form');

	content.forEach( dato => {
		let div = document.createElement('div');
		let label = document.createElement('label');
		let input = document.createElement('input')

		div.setAttribute("class", "seccion");

		label.setAttribute("for", `input${dato.nombre}`);
		label.setAttribute('id', `label${dato.nombre}`);

		label.appendChild(document.createTextNode(dato.texto))

		input.setAttribute('type', 'number');
		input.setAttribute('id', `input${dato.nombre}`);
		input.setAttribute('name', `input${dato.nombre}`);

		input.value = dato.valor;

		div.appendChild(label);
		div.appendChild(input);

		form.appendChild(div);
	} )
	
	parent.appendChild(form);
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

	moduloEvento.innerHTML = "";

	insertModuloEvento();
}

const goToNextPage = () => {
	offset = offset + limit;

	moduloEvento.innerHTML = "";

	console.log(offset)
	console.log(limit)

	insertModuloEvento();
}

//-------------- AREA FUNCIONES EVENTS LISTENERS ------------

const apiUpdateEvento = (idEvento, nEquipo = 0) => {
	let query;

	console.log(nEquipo);
	if (nEquipo == 0) {
		const nombreEvento = document.getElementById('inputNombreEvento').value;
		const faseActual = document.getElementById('inputFaseActual').value;
		const fechaInicio = document.getElementById('inputFechaInicio').value;
		const cantidadTiempoExtra = document.getElementById('inputCantidadTiempoExtra').value;
		const ganadorPartido = document.getElementById('selectGanadorPartido').value;
		const esPartidoEmpatado = document.getElementById('inputPartidoEmpatado').checked;

		query = {
			"parte": "evento",
			"nombreEvento": nombreEvento,
			"fechaInicio": fechaInicio,
			"faseActual": faseActual,
			"cantidadTiempoExtra": cantidadTiempoExtra,
			"ganadorPartido": ganadorPartido,
			"esPartidoEmpatado": esPartidoEmpatado,
			"idEvento": idEvento
		}
	}

	if (nEquipo == 1) {
		const golesEquipo1 = document.getElementById('inputgolesEquipo1').value;
		const tarjetasAmarillasEquipo1 = document.getElementById('inputtarjetasAmarillasEquipo1').value;
		const tarjetasRojasEquipo1 = document.getElementById('inputtarjetasRojasEquipo1').value;
		const golesPenalesFinalesEquipo1 = document.getElementById('inputgolesPenalesFinalesEquipo1').value;

		query = {
			"parte": "equipo1",
			"golesEquipo1": golesEquipo1,
			"tarjetasAmarillasEquipo1": tarjetasAmarillasEquipo1,
			"tarjetasRojasEquipo1": tarjetasRojasEquipo1,
			"golesPenalesFinalesEquipo1": golesPenalesFinalesEquipo1,
			"idEvento": idEvento
		}
	}

	if (nEquipo == 2) {
		const golesEquipo2 = document.getElementById('inputgolesEquipo2').value;
		const tarjetasAmarillasEquipo2 = document.getElementById('inputtarjetasAmarillasEquipo2').value;
		const tarjetasRojasEquipo2 = document.getElementById('inputtarjetasRojasEquipo2').value;
		const golesPenalesFinalesEquipo2 = document.getElementById('inputgolesPenalesFinalesEquipo2').value;

		query = {
			"parte": "equipo2",
			"golesEquipo2": golesEquipo2,
			"tarjetasAmarillasEquipo2": tarjetasAmarillasEquipo2,
			"tarjetasRojasEquipo2": tarjetasRojasEquipo2,
			"golesPenalesFinalesEquipo2": golesPenalesFinalesEquipo2,
			"idEvento" : idEvento
		}
	}

	if(!confirm("¿Estas seguro de guardar cambios?")) {
		return 0;
	}

	console.log(query);

	fetchUpdateEvento(query).then( (json) => {
		if (json.error) {
			alert("Hubo un error al actualizar los datos");
			console.log(json)
			return 0;
		}

		alert("El guardado de los datos ha sido exitoso");
		location.reload();
	} )
}

export default insertModuloEvento;
