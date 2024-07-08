
import { getParams } from '/js/fetchParams.js';

let clubContainer;

const fetchParticipantes = async() => {
	const response = await fetch('/api/torneo/participantes', getParams);
	const json = await response.json();
	return json;
}

const addParticipantes = (item) => {
	let div = document.createElement("div");
	let h3 = document.createElement("h3");
	let p = document.createElement("p");

	div.setAttribute("class", "club");
	
	h3.appendChild(document.createTextNode(item.nombreGrupo));
	p.appendChild(document.createTextNode(item.grupo));
	div.appendChild(h3);
	div.appendChild(p);

	clubContainer.appendChild(div);
}

window.addEventListener('load', () => {
	clubContainer = document.getElementsByClassName("club-container")[0];

	fetchParticipantes().then(( { body: participantes } ) => {
		for(let i = 0; i < participantes.length; i++) {
			addParticipantes(participantes[i]);
		}
	});
});
