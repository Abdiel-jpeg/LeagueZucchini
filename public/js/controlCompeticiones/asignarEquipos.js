
import { getParams, getQueryParams } from '/js/fetchParams.js';
import generarEventos from '/js/controlCompeticiones/generarEventos.js';

let moduloAsignarEquipos = document.getElementsByClassName('moduloAsignarEquipos')[0];

let selectCompeticion = document.getElementById('selectCompeticion');
let selectRegion = document.getElementById('selectRegion');
let selectCiudad = document.getElementById('selectCiudad');
let selectInstitucion = document.getElementById('selectInstitucion');
let tbodyEquipos = document.getElementById('tbodyEquipos');
let tbodyParticipantes = document.getElementById('tbodyParticipantes');

//---------------------- AREA APIs-----------------------

const fetchCompeticion = async () => {
	const response = await fetch('/api/competicion/get/0/0', getParams);
	const json = response.json();
	return json;
}

const fetchRegion = async () => {
	const response = await fetch('/api/region/get/0/0', getParams);
	const json = response.json();
	return json;
}

const fetchCiudad = async (nombreRegion) => {
	const response = await fetch(`/api/ciudad/perRegion/${nombreRegion}/`, getParams);
	const json = response.json();
	return json;
}

const fetchInstitucion = async (nombreCiudad) => {
	const response = await fetch(`/api/institucion/perCiudad/${nombreCiudad}`, getParams);
	const json = response.json();
	return json;
}

const fetchEquipo = async (nombreInstitucion) => {
	const response = await fetch(`/api/equipo/search/${nombreInstitucion}/10/0`, getParams);
	const json = response.json();
	return json;
}

const fetchCompeticionParticipantes = async (nombreCompeticion) => {
	const response = await fetch(`/api/competicion/participantes/${nombreCompeticion}`, getParams);
	const json = response.json();
	return json;
}

const fetchAddCompeticionParticipantes = async (nombreCompeticion, idEquipo) => {
	const query = {
		"nombreCompeticion": nombreCompeticion,
		"idEquipo": idEquipo
	}

	const response = await fetch('/api/competicion/participantes/', getQueryParams('POST', query));
	const json = response.json();
	return json;
}

const fetchDelCompeticionParticipantes = async (nombreCompeticion, idEquipo) => {
	const query = {
		"nombreCompeticion": nombreCompeticion,
		"idEquipo": idEquipo
	}

	const response = await fetch('/api/competicion/participantes/', getQueryParams('DELETE', query));
	const json = response.json();
	return json;
}

//------------- AREA CODIGO PAGINA ---------------

const insertModuloAsignarEquipos = async () => {
	moduloAsignarEquipos.style.display = "flex";

	let optionDefaultRegion = document.createElement('option');
	let optionDefaultCompeticion = document.createElement('option');

	optionDefaultRegion.setAttribute('value', "")
	optionDefaultRegion.setAttribute('selected', 'selected')
	optionDefaultRegion.setAttribute('hidden', 'hidden')
	optionDefaultRegion.setAttribute('disabled', 'disabled')

	optionDefaultCompeticion.setAttribute('value', "")
	optionDefaultCompeticion.setAttribute('selected', 'selected')
	optionDefaultCompeticion.setAttribute('hidden', 'hidden')
	optionDefaultCompeticion.setAttribute('disabled', 'disabled')

	optionDefaultRegion.appendChild(document.createTextNode('Seleccionar'));
	optionDefaultCompeticion.appendChild(document.createTextNode('Seleccionar'));

	selectRegion.appendChild(optionDefaultRegion)
	selectCompeticion.appendChild(optionDefaultCompeticion);

	const { body: competiciones } = await fetchCompeticion();

	for(let i = 0; i < competiciones.length; i++) {
		let option = document.createElement('option');
		let label = document.createElement('label')

		option.setAttribute('value', competiciones[i].nombreCompeticion);
		label.setAttribute('class', 'label-competicion');
		label.setAttribute('id', competiciones[i].nombreCompeticion);
		label.style.display = 'none';

		option.appendChild(document.createTextNode(competiciones[i].nombreCompeticion));
		label.appendChild(document.createTextNode(competiciones[i].nombreTipoCompeticion))

		selectCompeticion.appendChild(option)

		document.getElementById('labelsCompeticion').appendChild(label);
	}


	const { body: regiones } = await fetchRegion();

	for(let i = 0; i < regiones.length; i++) {
		let option = document.createElement('option');

		option.setAttribute('value', regiones[i].nombreRegion);
		option.appendChild(document.createTextNode(regiones[i].nombreRegion));

		selectRegion.appendChild(option);
	}


	const addValuesSelectCiudad = async (nombreRegion) => {
	let optionDefaultCiudad = document.createElement('option');
	
		optionDefaultCiudad.setAttribute('value', "")
		optionDefaultCiudad.setAttribute('selected', 'selected')
		optionDefaultCiudad.setAttribute('hidden', 'hidden')
		optionDefaultCiudad.setAttribute('disabled', 'disabled')

		optionDefaultCiudad.appendChild(document.createTextNode('Seleccionar'));

		selectCiudad.appendChild(optionDefaultCiudad);

		const { body: ciudades } = await fetchCiudad(nombreRegion);

		for(let i = 0; i < ciudades.length; i++) {
			let option = document.createElement('option');

			option.setAttribute('value', ciudades[i].nombreCiudad);
			option.appendChild(document.createTextNode(ciudades[i].nombreCiudad));

			selectCiudad.appendChild(option);
		}
	}

	const addValuesSelectInstitucion = async (nombreCiudad) => {
		let optionDefaultInstitucion = document.createElement('option');
	
		optionDefaultInstitucion.setAttribute('value', "")
		optionDefaultInstitucion.setAttribute('selected', 'selected')
		optionDefaultInstitucion.setAttribute('hidden', 'hidden')
		optionDefaultInstitucion.setAttribute('disabled', 'disabled')

		optionDefaultInstitucion.appendChild(document.createTextNode('Seleccionar'));

		selectInstitucion.appendChild(optionDefaultInstitucion);

		const { body: instituciones } = await fetchInstitucion(nombreCiudad);

		for(let i = 0; i < instituciones.length; i++) {
			let option = document.createElement('option');

			option.setAttribute('value', instituciones[i].nombreInstitucion);
			option.appendChild(document.createTextNode(instituciones[i].nombreInstitucion));

			selectInstitucion.appendChild(option);
		}
	}

	//---------------- EVENT LISTENERS --------------------
	
	selectCompeticion.addEventListener('change', async () => {
		let labelsCompeticion = document.getElementsByClassName('label-competicion');

		for (let i = 0; i < labelsCompeticion.length; i++) {
			labelsCompeticion[i].style.display = 'none';
		}

		document.getElementById(selectCompeticion.value).style.display = 'flex';
	
		tbodyParticipantes.innerHTML = "";

		tbodyParticipantes.appendChild(addCabeceraTabla(true));

		const { body } = await fetchCompeticionParticipantes(selectCompeticion.value);

		for (let i = 0; i < body.length; i++) {
			tbodyParticipantes.appendChild(addRowsTabla(body[i], true));
		}
	})

	selectRegion.addEventListener('change', () => {
		selectCiudad.innerHTML = "";

		addValuesSelectCiudad(selectRegion.value);
	})

	selectCiudad.addEventListener('change', () => {
		selectInstitucion.innerHTML = "";


		addValuesSelectInstitucion(selectCiudad.value);
	})

	selectInstitucion.addEventListener("change", async () => {
		tbodyEquipos.innerHTML = "";

		tbodyEquipos.appendChild(addCabeceraTabla());

		const { body: equipos } = await fetchEquipo(selectInstitucion.value);

		console.log(equipos)

		for(let i = 0; i < equipos.length; i++) {
			tbodyEquipos.appendChild(addRowsTabla(equipos[i]));
		}

		document.getElementsByClassName('añadir-a-competicion')[0].style.display = 'flex';
	})
}

const addCabeceraTabla = (isCompeticion = false) => {
	let cabecera = document.createElement('tr')
	let cabeceraId = document.createElement('th')
	let cabeceraGrado = document.createElement('th')
	let cabeceraGrupo = document.createElement('th')
	let cabeceraNombreGrupo = document.createElement('th')
	let cabeceraNombreInstitucion = document.createElement('th');
	let cabeceraSeleccion = document.createElement('th')

	cabecera.setAttribute('class', 'cabecera')

	cabeceraId.appendChild(document.createTextNode('Id'))
	cabeceraGrado.appendChild(document.createTextNode('Grado'))
	cabeceraGrupo.appendChild(document.createTextNode('Grupo'))
	cabeceraNombreGrupo.appendChild(document.createTextNode('Nombre Grupo'))
	cabeceraNombreInstitucion.appendChild(document.createTextNode('Institución'))

	cabecera.appendChild(cabeceraId)
	cabecera.appendChild(cabeceraGrado)
	cabecera.appendChild(cabeceraGrupo)
	cabecera.appendChild(cabeceraNombreGrupo)
	if (isCompeticion) { cabecera.appendChild(cabeceraNombreInstitucion) }
	cabecera.appendChild(cabeceraSeleccion)

	return cabecera;
}

const addRowsTabla = (content, isCompeticion = false) => {
	let row = document.createElement('tr');
	let columnIdEquipo = document.createElement('th')
	let columnGrado = document.createElement('th')
	let columnGrupo = document.createElement('th')
	let columnNombreGrupo = document.createElement('th')
	let columnNombreInstitucion = document.createElement('th');
	let columnOpcion = document.createElement('th');
	let checkbox = document.createElement('input');

	row.setAttribute('class', 'row');
	checkbox.setAttribute('type', 'checkbox')
	checkbox.setAttribute('id', isCompeticion ? 'checkboxEliminar' : 'checkboxEquipo')
	checkbox.setAttribute('class', isCompeticion ? 'checkbox-eliminar' : 'checkbox-equipo')
	checkbox.setAttribute('value', content.idEquipo);

	columnIdEquipo.appendChild(document.createTextNode(content.idEquipo));
	columnGrado.appendChild(document.createTextNode(content.grado));
	columnGrupo.appendChild(document.createTextNode(content.grupo));
	columnNombreGrupo.appendChild(document.createTextNode(content.nombreGrupo));
	columnNombreInstitucion.appendChild(document.createTextNode(content.nombreInstitucion));
	columnOpcion.appendChild(checkbox)

	row.appendChild(columnIdEquipo);
	row.appendChild(columnGrado);
	row.appendChild(columnGrupo);
	row.appendChild(columnNombreGrupo);
	if (isCompeticion) { row.appendChild(columnNombreInstitucion) }
	row.appendChild(columnOpcion)

	return row;
}


//---------------- AREA EVENT LISTENERS ---------------

document.getElementById("añadirACompeticion").addEventListener('click', async (e) => {
	e.preventDefault();

	const opcionesElegidas = document.getElementsByClassName('checkbox-equipo');

	for (let i = 0; i < opcionesElegidas.length; i++) {
		if (opcionesElegidas[i].checked) {
			const response = await fetchAddCompeticionParticipantes(selectCompeticion.value, opcionesElegidas[i].value)
		}
	}

	location.reload();
})

document.getElementById("botonEliminar").addEventListener('click', async (e) => {
	e.preventDefault();

	if(!confirm('¿Estás seguro de eliminar los grupos seleccionados?')) {
		return 0;
	}

	const opcionesElegidas = document.getElementsByClassName('checkbox-eliminar');

	for (let i = 0; i < opcionesElegidas.length; i++) {
		if (opcionesElegidas[i].checked) {
			const response = await fetchDelCompeticionParticipantes(selectCompeticion.value, opcionesElegidas[i].value);
		}
	}

	location.reload();
})

document.getElementById('generarEventos').addEventListener('click', (e) =>{
	e.preventDefault();

	if(confirm('Todos los eventos generados anteriormente se borraran, incluido su información de progreso. ¿Desea generar los eventos para esta competicion? ')) {
		generarEventos(selectCompeticion.value)
	}
})


export default insertModuloAsignarEquipos;
