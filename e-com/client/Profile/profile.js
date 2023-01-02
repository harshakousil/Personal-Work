import profileRender from "./components/profileRender.js";
//const user = JSON.parse(localStorage.getItem('user'));


document.getElementById("delete").addEventListener("click", () => {
    localStorage.removeItem("accessToken");

    window.location.replace("../SignIn/index.html");
});



async function loader() {
    const root = document.getElementById("root");
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    let renderItems = await profileRender.render();
    let render = renderItems.rendering;
    await render.map((product) => {
        var span = document.createElement("span");
        span.classList.add("w-2/5")
        span.classList.add("max-md:w-4/5")
        span.innerHTML = product

        root.append(span)
    })

    document.getElementById("cartIcon").innerHTML = window.localStorage.getItem("cartIcon3");
}
window.onload = loader();