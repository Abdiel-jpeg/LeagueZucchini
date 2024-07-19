
import { getParams, getQueryParams } from '/js/fetchParams.js';

//Como este documento es cargado en la funcion lad de window.addEventListener. 
//Podemos programar sin miedo a cosas raras que suceden a la carga pasiva de 
//código por el navegador. Justo aquí abajo definimos los objetos que son 
//necesarios para este modulo. Registrar Region es un pedazo de html que se
//mostrará en caso de que Region esté seleccionado. popup y popupContent
//es la ventana emergente que aparece al darle al boton editar de los registros

let moduloRegion = document.getElementsByClassName('moduloRegion')[0];
let	popup = document.getElementsByClassName("popup")[0];
let	popupContent = document.getElementsByClassName("popup-content")[0];

//----------------------- AREA API  -----------------------------

const fetchRegion = async () => {
	const response = await fetch('/api/region', getParams);
	const json = await response.json();
	return json;
}

const fetchIndividualRegion = async ( { idRegion } ) => {
	const response = await fetch(`/api/region/${idRegion}`, getParams);
	const json = await response.json();
	return json;	
}

const fetchAddRegion = async (registro) => {
	const query = {
		"nombreRegion": registro
	}

	const response = await fetch('/api/region', getQueryParams('POST', query));
	const json = await response.json();
	return json;
}

const fetchDelRegion = async (id) => {
	const query = {
		"idRegion": id
	}

	const response = await fetch('/api/region', getQueryParams('DELETE', query));
	const json = await response.json();
	return json;
}

const fetchUpdateRegion = async (idRegion, nombreRegion) => {
	const query = {
		"idRegion": idRegion,
		"nombreRegion": nombreRegion
	}

	const response = await fetch('/api/region', getQueryParams('PUT', query));
	const json = await response.json();
	return json;
}

//------------------- AREA FUNCIONES MODULO -----------------

const insertTablaRegion = () => {
	moduloRegion.style.display = "flex"; //Hacemos visible al modulo Region

	let form = document.createElement('form');
	let labelNombreRegion = document.createElement('label');
	let inputNombreRegion = document.createElement('input');
	let botonRegistrar = document.createElement('button');

	labelNombreRegion.setAttribute('for', 'inputNombreRegion');
	labelNombreRegion.setAttribute('id', 'labelNombreRegion');

	inputNombreRegion.setAttribute('type', 'text');
	inputNombreRegion.setAttribute('id', 'inputNombreRegion');
	inputNombreRegion.setAttribute('name', 'inputNombreRegion');
	inputNombreRegion.required = true;

	botonRegistrar.setAttribute('type', 'submit');
	botonRegistrar.setAttribute('id', 'nuevoRegistro');

	botonRegistrar.addEventListener("click", (e) => {
		e.preventDefault();

		const nombreRegion = document.getElementById('inputNombreRegion').value;

		fetchAddRegion(nombreRegion).then( (json) => {
			if (json.error) {
				alert("Hubo un problema al registrar la Region");
			} else {
				alert("El registro se ha añadido con éxito")
				location.reload();
			}
		})
	})

	labelNombreRegion.appendChild(document.createTextNode("Nombre de la región:"));
	botonRegistrar.appendChild(document.createTextNode("Registrar Región"));

	form.appendChild(labelNombreRegion);
	form.appendChild(inputNombreRegion);
	form.appendChild(botonRegistrar);
	
	moduloRegion.appendChild(form);

	//Explicación. al utilizar la API obtenemos un array de todos los elementos que
	//la BBDD nos regresó. Este está en req.body. El cual seguidamente lo exploramos
	//con un bucle for. Por cada iteracion nos mostrará una fila en patalla.
	//Llamando a la función insertRowsTablaRegion

	fetchRegion().then(({ body }) => {
		for(let i = 0; i < body.length; i++) {
			insertRowsTablaRegion(body[i]);
		}
	});
}

const insertRowsTablaRegion = (item) => {
	let row = document.createElement('div');
	let botonEditar = document.createElement('button');

	botonEditar.setAttribute('type', 'button');
	botonEditar.setAttribute('name', 'editar');
	botonEditar.setAttribute('id', 'editar');

	botonEditar.addEventListener('click', (e) => {
		e.preventDefault();
	
		//Al darle al boton editar, deberia salirnos el popup, llamándolo con la
		//siguiente función
		insertPopupContent(item);
	})

	botonEditar.appendChild(document.createTextNode("editar"));

	row.setAttribute("id", item.idRegion);

	row.appendChild(document.createTextNode(item.nombreRegion));
	row.appendChild(botonEditar)	

	moduloRegion.appendChild(row);
}

const insertPopupContent = (item) => {
	popupContent.innerHTML = ""; //Limpiamos antes de iniciar
	popup.style.display = "flex"; //Aparecemos el popup

	let regionItem;

	let botonCerrar = document.createElement('button');
	let formPopup = document.createElement('form');
	let labelPopupNombreRegion = document.createElement('label');
	let inputPopupNombreRegion = document.createElement('input');
	let botonGuardar = document.createElement('button');
	let botonEliminar = document.createElement('button');

	labelPopupNombreRegion.setAttribute('for', 'inputPopupNombreRegion');
	labelPopupNombreRegion.setAttribute('id', 'labelPopupNombreRegion');

	inputPopupNombreRegion.setAttribute('type', 'text');
	inputPopupNombreRegion.setAttribute('id', 'inputPopupNombreRegion');
	inputPopupNombreRegion.setAttribute('name', 'inputPopupNombreRegion');
	inputPopupNombreRegion.required = true;

	botonGuardar.setAttribute('type', 'submit');
	botonGuardar.setAttribute('id', 'guardarRegistro');

	botonEliminar.setAttribute('type', 'button');

	//Explicación. Para obtener la info que se va a modificar se le solicita 
	//directamente a la BBDD el elemento indiviudal.
	fetchIndividualRegion(item).then( (json) => {
		regionItem = json.body[0]
		inputPopupNombreRegion.value = regionItem.nombreRegion;
	})

	botonCerrar.appendChild(document.createTextNode("Cerrar"));
	labelNombreRegion.appendChild(document.createTextNode("Nombre de la región:"));
	botonGuardar.appendChild(document.createTextNode("Guardar Región"));
	botonEliminar.appendChild(document.createTextNode("Eliminar Region"));

	botonCerrar.addEventListener("click", (e) => {
		moduloRegion.innerHTML = "";
		popup.style.display = 'none';
		location.reload(); //Cosas raras suceden si no recargamos la página
	})

	botonGuardar.addEventListener("click", (e) => {
		e.preventDefault();

		const newNombreRegion = document.getElementById('inputPopupNombreRegion').value

		if(!confirm("¿Estas seguro de guardar cambios?")) {
			return 0;
		}

		fetchUpdateRegion(regionItem.idRegion, newNombreRegion).then( (json) => {
			if (json.error) {
				alert("Hubo un error al actualizar los datos");
				console.log(json)
				return 0;
			}

			alert("El guardado de los datos ha sido exitoso");
			location.reload();
		} )
	})

	botonEliminar.addEventListener("click", (e) => {
		e.preventDefault();

		if (!confirm("¿Seguro que quieres eliminar el registro?")) {
			return 0;
		}

		fetchDelRegion(regionItem.idRegion).then( (json) => {
			console.log(json);
			if(json.error) {
				alert("Hubo un error al eliminar el registro")
				return 0;
			}

			alert("El registro ha sido eliminado con éxito!");
			location.reload();
			}
		)``
	})

	formPopup.appendChild(labelPopupNombreRegion);
	formPopup.appendChild(inputPopupNombreRegion);
	formPopup.appendChild(botonGuardar);
	
	popupContent.appendChild(botonCerrar);
	popupContent.appendChild(formPopup);
	popupContent.appendChild(botonEliminar);
}

export default insertTablaRegion;
