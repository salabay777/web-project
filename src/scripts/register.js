let submitButton = document.querySelector('.submit-button');
let error = document.querySelector('.error');

let current_user = window.localStorage.getItem("loggedIn_user")
if (current_user) {
    window.location.href = '../templates/account.html';
}

submitButton.onclick = e => {
    e.preventDefault();
    let form = document.querySelector('.form');

    if (form.checkValidity()) {
        let request_body = {
            username: form["username"].value,
            first_name: form["first_name"].value,
            last_name: form["last_name"].value,
            email: form["email"].value,
            password: form["password"].value,
            role: form["role"].value
        };
        let confirm_password = form["confirm_password"].value;

        if (request_body['password'] !== confirm_password) {
            error.innerHTML = "Passwords do not match.";
            return
        }

        // console.log(request_body)

        fetch('http://localhost:8089/api/v1/user', {
            method: 'POST',
            body: JSON.stringify(request_body),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.status === 200) {
                window.location.href = '../templates/login.html';
            }
            else {
                response.text().then((data) => {
                    throw data;
                }).catch(e => {
                    if (e) {
                        error.innerHTML = e;
                        console.log(e);
                    }
                });
            }
        }).catch(e => {
            console.log(e)
        })
    }
    else {
        error.innerHTML = "All fields are required and should be valid!";
        console.log(e);
    }
}