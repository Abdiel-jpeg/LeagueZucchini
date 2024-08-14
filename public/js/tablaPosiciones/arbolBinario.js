
import { getParams } from '/js/fetchParams.js';

//-------------- AREA API -----------------------

const fetchArbolBinario = async (nombreCompeticion) => {
	const response = await fetch(`/api/competicion/eliminacionDirecta/participantes/${nombreCompeticion}`)
	const json = await response.json();
	return json;
}


const fetchEvento = async (nombreCompeticion) => {
	const response = await fetch(`/api/evento/${nombreCompeticion}/0/0`);
	const json = await response.json();
	return json;
}


//------------------ AREA CODIGO ----------------------------

const generarArbolBinario = async (nombreCompeticion) => {
	const { body } = await fetchArbolBinario(nombreCompeticion);
	const { body: bodyEventos } = await fetchEvento(nombreCompeticion);

	// Función para crear nodos en el árbol
	const createNode = (id, equipo1, equipo2, grupo1, grupo2) => {
		const li = document.createElement('li');
		const divContainer = document.createElement('div')
		const divEquipo1 = document.createElement('div');
		const divEquipo2 = document.createElement('div');

		divEquipo1.appendChild(document.createTextNode(`Equipo: ${grupo1}`));
		divEquipo2.appendChild(document.createTextNode(`Equipo: ${grupo2}`));

		divContainer.setAttribute('class', 'contenedor_equipo');
		divEquipo1.setAttribute('class', 'equipo_info')
		divEquipo2.setAttribute('class', 'equipo_info')

		bodyEventos.forEach( evento => {
			if(id == evento.idCompeticionEliminacionDirectaParticipante - 1) {
				if(evento.ganadorPartido == 'Equipo 1') {
					divEquipo1.setAttribute('id', 'ganador');
				} else {
					divEquipo2.setAttribute('id', 'ganador');
				}
			}
		} )

		divContainer.appendChild(divEquipo1);
		divContainer.appendChild(divEquipo2);

		li.appendChild(divContainer);

		const ul = document.createElement('ul');
		if(id) ul.setAttribute('class', 'nodo_arbol');
		li.appendChild(ul);
		return li;
	}

	// Función para construir el árbol binario
	const buildTree = (rootElement, nodes, rootNodeId = null) => {
		nodes
			.filter(node => node.idLinkTo === rootNodeId)
			.forEach(node => {
				const treeNode = createNode(node.idCompeticionEliminacionDirectaParticipante, node.idEquipo1, node.idEquipo2, node.grupoEquipo1, node.grupoEquipo2);
				rootElement.appendChild(treeNode);
				buildTree(treeNode.querySelector('ul'), nodes, node.idCompeticionEliminacionDirectaParticipante);
		});
	}

	const treeRoot = document.getElementById('treeRoot');
	buildTree(treeRoot, body);
}

export default generarArbolBinario;
