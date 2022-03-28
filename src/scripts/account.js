let current_user = JSON.parse(window.localStorage.getItem("loggedIn_user"))

if (!current_user) {
    window.location.href = '../templates/login.html';
}

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
    // window.location.href = '../templates/login.html';
}).then(data => {
    console.log(data);
    user = data.user;
    let first_name_p = document.getElementById("first_name");
    first_name_p.appendChild(
        document.createTextNode(user.first_name)
    );
    let last_name_p = document.getElementById("last_name");
    last_name_p.appendChild(
        document.createTextNode(user.last_name)
    );
    let username_p = document.getElementById("username");
    username_p.appendChild(
        document.createTextNode(user.username)
    );
    let email_p = document.getElementById("email");
    email_p.appendChild(
        document.createTextNode(user.email)
    );
    let role_p = document.getElementById("role");
    role_p.appendChild(
        document.createTextNode(user.role)
    );
})

let logoutButton = document.getElementById("logout");
logoutButton.onclick = e => {
    e.preventDefault();
    window.localStorage.removeItem("loggedIn_user");
    window.location.href = '../templates/login.html';
}