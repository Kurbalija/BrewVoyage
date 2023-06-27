const authForm = document.querySelector('#authForm');
const usernameInput = authForm.querySelector('input[name="username"]');
const passwordInput = authForm.querySelector('input[name="password"]');
const doLoginBtn = document.querySelector("#do-login");
const doSignupBtn = document.querySelector("#do-signup");

// Event listeners for login and sign-up
doLoginBtn.addEventListener("click", handleAuth("/login"));
doSignupBtn.addEventListener("click", handleAuth("/signup", true));

function handleAuth(route, needsLengthCheck) {
    return (event) => {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (needsLengthCheck && (username.length < 4 || password.length < 4)) {
            alert("Username and password must be at least 4 characters long.");
            return;
        }

        fetch(route, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    window.location.href = "/home";
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };
}
