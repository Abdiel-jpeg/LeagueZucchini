
import { getQueryParams } from '/js/fetchParams.js';

let username;
let password;
let localStorage;

window.onload = function() {
	if (!localStorage) {
		localStorage = JSON.stringify({
			"0": {
				"USERNAME": "Abdiel@gmail.com",
				"PASS": "1234"
			},
			"1": {
				"USERNAME": "Javier@gmail.com",
				"PASS": "1234"
			},
			"2": {
				"USERNAME": "Eder@gmail.com",
				"PASS": "1234"
			}
		});
	}
}

const loginLocalStorage = () => {
	let usersDB = JSON.parse(localStorage);

	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	console.log(`Username: ${username}\nPassword: ${password}`);

	for (let n in usersDB) {
		let user = usersDB[n];
		console.log(user);

		if (username == user.USERNAME && password == user.PASS) {
			alert("Inicio de sesión");	
			window.location.href = "/";
		}
	}

	alert("El usuario o la contraseña son incorrectos");
}

const loginFetch = async () => {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;

	const query = {
		nombreUsuario: username,
		contraseniaUsuario: password,
	}

	const JSON = await fetch('http://localhost:4000/api/usuarioTest', getQueryParams('POST', query));

	const response = await JSON.json();

	if (response.error) {
		//Si tenemos un error de inicio de sesión, imprímimos el mensaje
		//que este contiene en forma de alert.
		alert(response.body)
	} else {
		window.location.href = "/admin/";
	}

	console.log(response);
}

const signUp = () => {
	console.log(localStorage);
}

document.getElementById("login").addEventListener("click", (e) => {
	e.preventDefault();
	loginFetch();
});

document.getElementById("sign up").addEventListener("click", (e) => {
	e.preventDefault();
	signUp();
});




