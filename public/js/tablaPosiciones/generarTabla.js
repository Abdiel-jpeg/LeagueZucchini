
let container = document.getElementById('tableContainer')

const generarTabla = (lista) => {
	let table = document.createElement('table')
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
	let trCabecera = document.createElement('tr');

	let cabecerasTitulos = [
		'Posicion',
		'Equipo',
		'Grupo',
		'PG',
		'PE',
		'PP',
		'GF',
		'GC',
		'Dif',
		'Puntos'
	]

	cabecerasTitulos.forEach(titulo => {
		let th = document.createElement('th');
		th.appendChild(document.createTextNode(titulo));
		trCabecera.appendChild(th);
	});

	thead.appendChild(trCabecera);

	for(let i = 0; i < lista.length; i++){
		let tr = document.createElement('tr');

		let datos = [
			i + 1,
			`${lista[i].participante.grado} | ${lista[i].participante.grupo}`,
			lista[i].participante.nombreGrupo,
			lista[i].partidosGanados,
			lista[i].partidosEmpatados,
			lista[i].partidosPerdidos,
			lista[i].golesAFavor,
			lista[i].golesEnContra,
			lista[i].diferenciaGoles,
			lista[i].puntos
		]

		datos.forEach( dato => {
			let th = document.createElement('th');
			th.appendChild(document.createTextNode(dato));
			tr.appendChild(th)
		} );

		tbody.appendChild(tr)
	}

	table.appendChild(thead);
	table.appendChild(tbody);
	container.appendChild(table);
}

export default generarTabla;
