import { getParams, getQueryParams } from "/js/fetchParams.js";
import insertTablaRegion from "/js/registro/registroRegion.js";
import insertModuloCiudad from "/js/registro/registroCiudad.js";
import insertModuloInstitucion from "/js/registro/registroInstitucion.js";
import insertModuloEquipo from "/js/registro/registroEquipo.js";

let moduloRegion;
let moduloCiudad;
let moduloInstitucion;
let moduloEquipo;
let moduloParticipante;

const changeRegistro = (target) => {
	switch(target) {
		case "Region": insertTablaRegion();
			break;

		case "Ciudad": insertModuloCiudad()
			
			break;
		case "Institucion": insertModuloInstitucion();

			break;
		case "Equipo": insertModuloEquipo();

		case "Participante": moduloParticipante.style.display = 'flex';
	}
}

window.addEventListener("load", () => {
	moduloRegion = document.getElementsByClassName("moduloRegion")[0];
	moduloCiudad = document.getElementsByClassName('moduloCiudad')[0];
	moduloInstitucion = document.getElementsByClassName('moduloInstitucion')[0];
	moduloEquipo = document.getElementsByClassName('moduloEquipo')[0];
	moduloParticipante = document.getElementsByClassName('moduloParticipante')[0];

	changeRegistro(document.getElementById('registrar').value);
})

document.getElementById("cerrar").addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementsByClassName("popup")[0].style.display = "none";
	inputNombreRegion.innerHTML = '';
})

document.getElementById('registrar').addEventListener("change", (e) => {
	e.preventDefault();
	moduloRegion.innerHTML = "";
	moduloCiudad.innerHTML = "";
	moduloInstitucion.innerHTML = "";
	moduloEquipo.innerHTMl = "";

	moduloRegion.style.display = 'none';
	moduloCiudad.style.display = 'none';
	moduloInstitucion.style.display = 'none';
	moduloEquipo.style.display = 'none';
	moduloParticipante.style.display = 'none';
	//console.log(registrarRegion.children[1]);

	changeRegistro(e.target.value);
})
