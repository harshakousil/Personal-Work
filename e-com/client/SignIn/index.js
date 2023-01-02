
document.getElementById("signin").addEventListener("submit", signin);


async function signin(e) {
    e.preventDefault();
    const email = e.srcElement[1].value;
    const password = e.srcElement[2].value;
    const details = {
        email: email,
        password: password,
    };
    try {
        const data = await fetch("http://localhost:3456/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        });
        const response = await data.json();
        const status = document.getElementById('status')
        if (response.msg == "success") {

            window.localStorage.setItem("accessToken", response.accessToken);
            window.localStorage.setItem("user", JSON.stringify(response.user));
            //console.log(JSON.stringify(response.user))

            window.location.replace("../Home/home_page.html");
        }
        else if (response.msg == "Invalid Password") {
            status.style.display = "block"
            status.textContent = ""
            status.textContent = response.msg
        }
        else if (response.msg == "User doesn't exists") {
            status.style.display = "block"
            status.textContent = ""
            status.textContent = response.msg
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}


