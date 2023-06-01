const loginButton = document.getElementById('Login');
const registerButton = document.getElementById('Register');

loginButton.addEventListener('click', async (event) => {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    try {

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        });

        const result = res.json();
        const data = await result;

        const { redirectUrl } = data;

        window.location.href = redirectUrl;

    } catch (err) {
        console.log(err);
        alert("wrong credentials!");
    }

});

registerButton.addEventListener('click', async (event) => {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // sending a post request to the server /register

        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        });

        const status = res.status;

        console.log(status);

        if (status === 500) {
            alert("failed to register user");
        } else {

            const result = res.json();
            const data = await result;

            const { redirectUrl } = data;

            window.location.href = redirectUrl;

            alert("welcome" + " " + username + "!");

        } 

});
