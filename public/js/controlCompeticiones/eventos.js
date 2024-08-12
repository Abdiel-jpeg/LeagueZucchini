
import { getParams, getQueryParams } from '/js/fetchParams.js';

let moduloEvento = document.getElementsByClassName('moduloEvento')[0];
let	popup = document.getElementsByClassName("popup")[0];
let	popupContent = document.getElementsByClassName("popup-content")[0]; 

let count = 0;
let limit = 10;
let offset = 0;

let tipoCompeticion = '';
let nombreGlobalCompeticion = ''
let idLocalEquipo1;
let idLocalEquipo2;
let idCompeticionEliminacionDirectaParticipante;

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

			nombreGlobalCompeticion = e.target.value;

			limit = 10;
			offset = 0;
		
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
		let containerTablaEvento = document.createElement('div');
		let containerTablaEquipo = document.createElement('div');
		let tablaEvento = document.createElement('table');
		let tablaEquipo = document.createElement('table');
		let tbody = document.createElement('tbody');
		let tbodyEquipo = document.createElement('tbody');
		let cabecera = document.createElement('tr');
		let cabeceraEquipo = document.createElement('tr');

		let cabecerasEvento = [
			'',
			'ID Evento', 
			'Nombre Evento', 
			'Fase Actual',
			'Fecha Inicio',
			'Cantidad Tiempo Extra', 
			'Ganador Partido', 
			'Es Partido Empatado', 
			''
		];

		cabecerasEvento.forEach(textoCabecera => {
			let th = document.createElement('th');
			th.appendChild(document.createTextNode(textoCabecera));
			cabecera.appendChild(th)
		})

		containerTablaEquipo.setAttribute('class', 'containerTabla container-tablas-equipo');
		tablaEquipo.setAttribute('class', 'tablaEquipo')
		tbody.setAttribute("class", 'tablaEvento');
		tbodyEquipo.setAttribute("class", 'tbodyEquipo');
		cabecera.setAttribute('class', 'cabecera');
		cabeceraEquipo.setAttribute('class', 'cabecera');

		tbody.appendChild(cabecera);

		let { body } = await fetchEvento(nombreCompeticion);

		count = body[0].count

		//Cabecera para Equipos
		let cabecerasEquipo = [
			"",
			"Equipo1",
			"Equipo2"
		]
		
		cabecerasEquipo.forEach(textoCabecera => {
			let th = document.createElement('th');
			th.appendChild(document.createTextNode(textoCabecera));
			cabeceraEquipo.appendChild(th)
		})

		//------------ TABLA EQUIPOS --------------

		tbodyEquipo.appendChild(cabeceraEquipo);

		addRowsEvento(tbody, body);
		addRowsEquipo(containerTablaEquipo, tbodyEquipo, body)



		//-------------- APPEND CHILDREN -----------

		tablaEvento.appendChild(tbody);
		tablaEquipo.appendChild(tbodyEquipo);
		containerTablaEvento.appendChild(tablaEvento);
		containerTablaEquipo.appendChild(tablaEquipo);

		insertPageButtons(containerTablaEvento);

		moduloEvento.appendChild(containerTablaEvento);
		moduloEvento.appendChild(containerTablaEquipo);
	}

	const addRowsEvento = (parent, body) => {
		body.forEach( evento => {
			let filaEvento = document.createElement('tr');
			
			//-------------- RADIO INPUT -----------------
			let radioInput = document.createElement('input')
			
			radioInput.setAttribute('type', 'radio');
			radioInput.setAttribute('id', `radioInput${evento.idEvento}`);
			radioInput.setAttribute('value', evento.idEvento);
			radioInput.setAttribute('name', 'select_evento');

			radioInput.addEventListener("change", (e) => {
				idLocalEquipo1 = evento.idEquipo1;
				idLocalEquipo2 = evento.idEquipo2;
				idCompeticionEliminacionDirectaParticipante = evento.idCompeticionEliminacionDirectaParticipante

				console.log(`Equipo 1: ${idLocalEquipo1}`);
				console.log(`Equipo 2 : ${idLocalEquipo2}`);
				console.log(`Id Competicion Eliminacion Directa: ${idCompeticionEliminacionDirectaParticipante}`)

				const boton = document.getElementsByClassName('boton_registrar_puntos')

				for(let i = 0; i < boton.length; i++) {
					boton[i].style.display = 'none';
				}
					
				document.getElementById('botonRegistrarPuntos' + e.target.value).style.display = 'flex';

				//---------------- ITEMS A ESCONDER ----------------
				let itemsAEsconder = document.getElementsByClassName('columnaGeneral');


				for(let i = 0; i < itemsAEsconder.length; i++) {
					itemsAEsconder[i].style.display = "none";
				}

				//-------------- ITEMS A HACER VISIBLES --------------
				let itemsAVisibles = document.getElementsByClassName(`columna${e.target.value}`);

				for(let i = 0; i < itemsAVisibles.length; i++) {
					itemsAVisibles[i].style.display = "table-cell";
				}

		})

		filaEvento.appendChild(radioInput)

		//-------------- RESTO DE LA TABLA -----------
		let datosEvento = [
			tipoCompeticion == "Eliminación Directa" ? evento.idCompeticionEliminacionDirectaParticipante :	evento.idEvento, 
		evento.nombreEvento,
		evento.faseActual ? evento.faseActual : "No aplica",
		formatDate(evento.fechaInicio),
		evento.cantidadTiempoExtra, 
		evento.ganadorPartido != 0 ? evento.ganadorPartido : "No aplica", 
		evento.esPartidoEmpatado ? 'Si' : 'No', 
	];

	datosEvento.forEach( value => {
		let columna = document.createElement('th');

		columna.appendChild(document.createTextNode(value));
			filaEvento.appendChild(columna)
	} );

	let columnaEditarEvento = document.createElement('th');
	let botonEditarEvento = document.createElement('button');

	botonEditarEvento.appendChild(document.createTextNode('Editar'));

	botonEditarEvento.addEventListener("click", (e) => {
		e.preventDefault();

		insertPopupContent(datosEvento, evento.idEvento, true);
	})

		columnaEditarEvento.appendChild(botonEditarEvento);
		filaEvento.appendChild(columnaEditarEvento);
		parent.appendChild(filaEvento);
	} );
}

const addRowsEquipo = (container, parent, body) => {
	let matrizEquipo1 = []
	let matrizEquipo2 = []

	body.forEach( evento => {	
		matrizEquipo1.push( [
			evento.idEvento,
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
		] );

		matrizEquipo2.push( [
			evento.idEvento,
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
		] );
	} );

	let cabecerasEquipos = [ 
		'ID', 
		'Grado', 
		'Grupo', 
		'Nombre Grupo', 
		'Nombre Institución', 
		'Goles', 
		'Tarjetas Amarillas', 
		'Tarjetas Rojas', 
		'Goles Penales Finales', 
		'Puntos',
	]

	for(let i = 0; i < body.length; i++) {
		for (let j = 0; j < cabecerasEquipos.length; j++) {
			let row = document.createElement('tr');

			row.setAttribute('id', 'rowEvento' + body[i].idEvento);

			//Th de la cabecera
			let th = document.createElement('th');
			th.appendChild(document.createTextNode(cabecerasEquipos[j]));

			th.style.display = "none";
			th.setAttribute('class', `columna${matrizEquipo1[i][0]} columnaGeneral`)
		
			row.appendChild(th);

			//Td del Equipo1
			let tdEquipo1 = document.createElement('td');

			tdEquipo1.style.display = "none";
			tdEquipo1.setAttribute('class', `columna${matrizEquipo1[i][0]} columnaGeneral`)

			tdEquipo1.appendChild(document.createTextNode(matrizEquipo1[i][j + 1]));
			console.log(document.createTextNode(matrizEquipo1[i][j + 1]));
			console.log(matrizEquipo1[i][j + 1])
			row.appendChild(tdEquipo1)

			parent.appendChild(row)

			//Td del Equipo2
			let tdEquipo2 = document.createElement('td');

			tdEquipo2.style.display = "none";
			tdEquipo2.setAttribute('class', `columna${matrizEquipo1[i][0]} columnaGeneral`)

			tdEquipo2.appendChild(document.createTextNode(matrizEquipo2[i][j + 1]));
			row.appendChild(tdEquipo2)

			parent.appendChild(row)
		}

		insertEventListenerPuntos(container, body[i])
	}
}

const insertEventListenerPuntos = (container, evento) => {
	//------------ BOTON REGIRSTRAR PUNTOS ---------
	let registrarPuntos = document.createElement('button');

	registrarPuntos.setAttribute('id', 'botonRegistrarPuntos' + evento.idEvento);
	registrarPuntos.setAttribute('class', 'boton_registrar_puntos');
	registrarPuntos.value = evento.idEvento;

	registrarPuntos.appendChild(document.createTextNode('Editar puntos'));

	registrarPuntos.style.display = 'none'

	registrarPuntos.addEventListener('click', (e) => {
		e.preventDefault();

		let content = [
			{
				nombre: "golesEquipo1", 
				valor: evento.golesEquipo1, 
				texto: 'Goles Equipo 1'
			},
			{
				nombre: "tarjetasAmarillasEquipo1", 
				valor: evento.tarjetasAmarillasEquipo1, 
				texto: 'Tarjetas Amarillas Equipo 1'
			},
			{
				nombre: "tarjetasRojasEquipo1", 
				valor: evento.tarjetasRojasEquipo1, 
				texto:"Tarjetas Rojas Equipo 1"
			},
			{
				nombre: "golesPenalesFinalesEquipo1", 
				valor: evento.golesPenalesFinalesEquipo1, 
				texto: "Goles penales finales Equipo 1"
			},
			{
				nombre: "golesEquipo2", 
				valor: evento.golesEquipo2, 
				texto: 'Goles Equipo 2'
			},
			{
				nombre: "tarjetasAmarillasEquipo2", 
				valor: evento.tarjetasAmarillasEquipo2, 
				texto: 'Tarjetas Amarillas Equipo 2'
			},
			{
				nombre: "tarjetasRojasEquipo2", 
				valor: evento.tarjetasRojasEquipo2, 
				texto:"Tarjetas Rojas Equipo 2"
			},
			{
				nombre: "golesPenalesFinalesEquipo2", 
				valor: evento.golesPenalesFinalesEquipo2, 
				texto: "Goles penales finales Equipo 2"
			}
		]

		insertPopupContent(content, evento.idEvento, false);
	})

	container.appendChild(registrarPuntos);
}

const insertPopupContent = (content, idEvento, isFormularioEvento = false) => {
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
		formularioElemento(popupContent, content, idEvento);

	let botonGuardar = document.createElement('button');

	botonGuardar.appendChild(document.createTextNode('Guardar'));

	botonGuardar.addEventListener('click', (e) => {
		e.preventDefault();

		apiUpdateEvento(idEvento, isFormularioEvento);
	})

	popupContent.appendChild(botonCerrar);
	popupContent.appendChild(botonGuardar);
}

const formularioEvento = (parent, content, idEvento) => {
	console.log(content);
		
	let nombreEvento = content[1];
	let faseActual = content[2];
	let fechaInicio = formatDate(content[3]);
	let cantidadTiempoExtra = content[4];
	let ganadorPartido = content[5];
	let esPartidoEmpatado = content[6]

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
	inputNombreEvento.value = nombreEvento == null ? "" : nombreEvento;

	divNombreEvento.appendChild(labelNombreEvento);
	divNombreEvento.appendChild(inputNombreEvento);

	form.appendChild(divNombreEvento);

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
	inputFechaInicio.value = fechaInicio ? fechaInicio : "null";

	console.log(fechaInicio)

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
	inputCantidadTiempoExtra.value = cantidadTiempoExtra;

	divCantidadTiempoExtra.appendChild(labelCantidadTiempoExtra);
	divCantidadTiempoExtra.appendChild(inputCantidadTiempoExtra);

	form.appendChild(divCantidadTiempoExtra);

	parent.appendChild(form);
}


const formularioElemento = (parent, content, idEvento) => {
	let form = document.createElement('form');

	form.setAttribute('class', 'form');

	//-------------- Id del Evento ----------------
	
	let divId = document.createElement('div');
	let labelId = document.createElement('label');
	let inputId = document.createElement('input');

	labelId.appendChild(document.createTextNode('ID del Evento'))
	labelId.style.color = 'gray';
	inputId.setAttribute('disabled', 'disabled');
	inputId.setAttribute('id', 'idEventoRegistrarPuntos');

	const botones =	document.getElementsByClassName('boton_registrar_puntos');

	for(let i = 0; i < botones.length; i++) {
		if (botones[i].style.display == 'flex') {
			inputId.value = botones[i].value;
		}
	}

	divId.appendChild(labelId);
	divId.appendChild(inputId);

	form.appendChild(divId);

	//------ Datos de los inputs númericos ---------

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

const goToPreviousPage = async () => {
	offset -= 10;
	limit -= 10

	moduloEvento.innerHTML = "";

	console.log(`offset: ${offset}`)
	console.log(`limit: ${limit}`)

	await	insertCompeticionSelector(nombreGlobalCompeticion);
	await insertTablaEvento(nombreGlobalCompeticion)
}

const goToNextPage = async () => {
	offset += 10;
	limit += 10

	moduloEvento.innerHTML = "";

	console.log(`offset: ${offset}`)
	console.log(`limit: ${limit}`)

	await	insertCompeticionSelector(nombreGlobalCompeticion);
	await	insertTablaEvento(nombreGlobalCompeticion)
}

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 0).padStart(2, '0'); // Months are zero-based
	const day = String(date.getDate()).padStart(1, '0');
	return `${year}-${month}-${day}`;
}

//-------------- AREA FUNCIONES EVENTS LISTENERS ------------

const apiUpdateEvento = (idEvento, isFormularioEvento = false) => {
	let query;

	if (isFormularioEvento) {
		const nombreEvento = document.getElementById('inputNombreEvento').value;
		const fechaInicio = document.getElementById('inputFechaInicio').value;
		const cantidadTiempoExtra = document.getElementById('inputCantidadTiempoExtra').value;

		query = {
			"parte": "evento",
			"nombreEvento": nombreEvento,
			"fechaInicio": fechaInicio,
			"cantidadTiempoExtra": cantidadTiempoExtra,
			"idEvento": idEvento
		}

	} else {
		const idEventoRegistrarPuntos = document.getElementById('idEventoRegistrarPuntos').value
		const golesEquipo1 = document.getElementById('inputgolesEquipo1').value;
		const tarjetasAmarillasEquipo1 = document.getElementById('inputtarjetasAmarillasEquipo1').value;
		const tarjetasRojasEquipo1 = document.getElementById('inputtarjetasRojasEquipo1').value;
		const golesPenalesFinalesEquipo1 = document.getElementById('inputgolesPenalesFinalesEquipo1').value;
		const golesEquipo2 = document.getElementById('inputgolesEquipo2').value;
		const tarjetasAmarillasEquipo2 = document.getElementById('inputtarjetasAmarillasEquipo2').value;
		const tarjetasRojasEquipo2 = document.getElementById('inputtarjetasRojasEquipo2').value;
		const golesPenalesFinalesEquipo2 = document.getElementById('inputgolesPenalesFinalesEquipo2').value;

		query = {
			"parte": "equipos",
			"idEquipo1": idLocalEquipo1,
			"golesEquipo1": golesEquipo1,
			"tarjetasAmarillasEquipo1": tarjetasAmarillasEquipo1,
			"tarjetasRojasEquipo1": tarjetasRojasEquipo1,
			"golesPenalesFinalesEquipo1": golesPenalesFinalesEquipo1,
			"idEquipo2": idLocalEquipo2,
			"golesEquipo2": golesEquipo2,
			"tarjetasAmarillasEquipo2": tarjetasAmarillasEquipo2,
			"tarjetasRojasEquipo2": tarjetasRojasEquipo2,
			"golesPenalesFinalesEquipo2": golesPenalesFinalesEquipo2,
			"idEvento" : idEventoRegistrarPuntos,
			"nombreTipoCompeticion": tipoCompeticion
		}
	}

	if(!confirm("¿Estas seguro de guardar cambios?")) {
		return 0;
	}

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
