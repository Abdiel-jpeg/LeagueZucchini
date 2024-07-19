import { getParams, getQueryParams } from "/js/fetchParams.js";
import insertTablaRegion from "/js/registro/registroRegion.js";

let moduloRegion;

const changeRegistro = (target) => {
	switch(target) {
		case "Region": insertTablaRegion();
			break;

		case "Ciudad": insertTablaCiudad()
			
			break;
	}
}

window.addEventListener("load", () => {
	moduloRegion = document.getElementsByClassName("moduloRegion")[0];

	changeRegistro(document.getElementById('registrar').value);
})

document.getElementById("cerrar").addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementsByClassName("popup")[0].style.display = "none";
	inputNombreRegion.innerHTML = '';
})

document.getElementById('registrar').addEventListener("change", (e) => {
	e.preventDefault();
	console.log(e.target.value);
	moduloRegion.innerHTML = "";
	
	//console.log(registrarRegion.children[1]);

	changeRegistro(e.target.value);
})
