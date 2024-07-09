
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

const login = () => {
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

const signUp = () => {
	console.log(localStorage);
	console.log(Object.getOwnPropertyNames(localStorage).length);
}

document.getElementById("login").addEventListener("click", (e) => {
	e.preventDefault();
	login();
});

document.getElementById("sign up").addEventListener("click", (e) => {
	e.preventDefault();
	signUp();
});




