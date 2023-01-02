document.getElementById('register').addEventListener("submit", registration)

const para = document.getElementById("msg")

async function registration(e) {
    e.preventDefault();
    const username = e.srcElement[0].value;
    const emailid = e.srcElement[1].value;
    const password = e.srcElement[2].value;
    let details = {
        username: username,
        email: emailid,
        password: password
    }
    //console.log(details);

    const data = await fetch("http://localhost:3456/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(details),

        })
    const response = await data.json();
    console.log(response)
    if (response.msg == "Email already Exist's") {

        para.style.display = "block";
        para.textContent = response.msg
    }
    else {
        window.localStorage.setItem("accessToken", response.accessToken);
        window.localStorage.setItem("user", JSON.stringify(response.user));
        window.location.replace("../Home/home_page.html")
    }
}

