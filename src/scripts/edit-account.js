let current_user = JSON.parse(window.localStorage.getItem("loggedIn_user"))

if (!current_user) {
    window.location.href = '../templates/login.html';
}

let form = document.querySelector('.form');

let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(current_user.username + ":" + current_user.password));
headers.set('content-type', 'application/json');

fetch('http://localhost:8089/api/v1/user/' + current_user.username, {
    method: 'GET',
    headers: headers
}).then((response) => {
    if (response.status === 200) {
        return response.json();
    }
    window.location.href = '../login.html';
}).then(data => {
    console.log(data);
    user = data.user;
    form["first_name"].value = user.first_name;
    form["last_name"].value = user.last_name;
    form["username"].value = user.username;
    form["email"].value = user.email;
    form["password"].value = current_user.password;
    form["confirm_password"].value = current_user.password;
    form["role"].value = user.role;
})

let editButton = document.querySelector('.edit-button');
let error = document.querySelector('.error');

editButton.onclick = e => {
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

        fetch('http://localhost:8089/api/v1/user/' + current_user.username, {
            method: 'PUT',
            body: JSON.stringify(request_body),
            headers: headers
        }).then(response => {
            if (response.status === 200) {
                current_user.username = request_body['username'];
                current_user.password = request_body['password'];
                window.localStorage.setItem('loggedIn_user', JSON.stringify(current_user));
                window.location.href = '../templates/account.html';
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

let deleteButton = document.querySelector('.delete-button');

deleteButton.onclick = e => {
    e.preventDefault();

    fetch('http://localhost:8089/api/v1/user/' + current_user.username, {
        method: 'DELETE',
        headers: headers
    }).then(response => {
        if (response.status === 200) {
            window.localStorage.removeItem('loggedIn_user');
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

let logoutButton = document.getElementById("logout");
logoutButton.onclick = e => {
    e.preventDefault();
    window.localStorage.removeItem("loggedIn_user");
    window.location.href = '../templates/login.html';
}