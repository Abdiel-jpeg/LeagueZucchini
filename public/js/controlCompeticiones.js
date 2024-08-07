
import insertModuloCompeticion from '/js/controlCompeticiones/competicion.js';
import insertModuloAsignarEquipos from '/js/controlCompeticiones/asignarEquipos.js';
import insertModuloEvento from '/js/controlCompeticiones/eventos.js';

let moduloCompeticion;
let moduloAsignarEquipos;
let moduloEvento;

const handleOpcion = (opcion) => {
	switch(opcion) {
		case "Gestion Competicion": insertModuloCompeticion();
			break;
		case "Asignar equipos": insertModuloAsignarEquipos();
			break;
		case "Gestionar eventos": insertModuloEvento();
	}
}

window.addEventListener("load", () => {
	moduloCompeticion = document.getElementsByClassName('moduloCompeticion')[0];
	moduloAsignarEquipos = document.getElementsByClassName('moduloAsignarEquipos')[0];
	moduloEvento = document.getElementsByClassName('moduloEvento')[0];

	handleOpcion(document.getElementById('selectOpcion').value);
})

document.getElementById("selectOpcion").addEventListener("change", (e) => {
	e.preventDefault();

	moduloCompeticion.innerHTML = "";
	moduloAsignarEquipos.style.display = "none";
	moduloEvento.innerHTML = "";

	handleOpcion(e.target.value);
})

document.getElementById("cerrar").addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementsByClassName("popup")[0].style.display = "none";
})
