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
            // set cookies
            const accessTokenExpires = getExpiresDate(response.accessToken);
            setCookie('accessToken', response.accessToken, accessTokenExpires);
            const refreshTokenExpires = getExpiresDate(response.refreshToken);
            setCookie('refreshToken', response.refreshToken, refreshTokenExpires);
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

// Extract expires date from JWT
function getExpiresDate(jwtToken) {
    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    return new Date(jwt.exp * 1000);
}

// Set a cookie
function setCookie(cname, cvalue, expires) {
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}