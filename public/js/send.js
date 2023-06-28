document.getElementById('do-login').addEventListener('click', function() {
    var username = document.getElementsByName('username')[0].value;
    var password = document.getElementsByName('password')[0].value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:4000/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({username: username, password: password}));
    xhttp.onload = function() {
        if (this.status == 200) {
            var response = JSON.parse(this.responseText);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            window.location.href = "/home";
        } else {
            // handle error
        }
    }
});
document.getElementById('do-signup').addEventListener('click', function() {
    var username = document.getElementsByName('username')[0].value;
    var password = document.getElementsByName('password')[0].value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:4000/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({username: username, password: password}));
    xhttp.onload = function() {
        if (this.status == 200) {
            // handle successful signup
        } else {
            // handle error
        }
    }
});