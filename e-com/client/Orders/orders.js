import ordersRender from "./components/ordersrender.js"

const token = localStorage.getItem("accessToken")
const user = JSON.parse(localStorage.getItem('user'));
if (!token) {
    window.location.replace("../SignIn/index.html");
}

async function handleOrders() {
    let renderItems = await ordersRender.render();
    // let product = renderItems.product
    let total = renderItems.total;
    total += 40;
    let response = await axios({
        method: "POST",
        url: "http://localhost:3456/orders/" + user._id,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data:
        {

            total: total
        }

    })
    if (response.data.msg == "success") {
        console.log(document.getElementById("toastItem"));
        document.getElementById("toastItem").classList.remove('hidden')
        document.getElementById("toastItem").classList.add('visible')
        console.log(document.getElementById("toastItem"));
    }
}



async function loader() {
    const root = document.getElementById("root");
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    let renderItems = await ordersRender.render();
    // let product = renderItems.product
    let subtotal = renderItems.total;
    // for (let i = 0; i < product.length; i++) {
    //     subtotal = Math.floor(subtotal + product[i].productDetails.price * product[i].count)
    // }
    document.getElementById("para").innerHTML = subtotal;
    document.getElementById("para1").innerHTML = subtotal + 40;

    let render = renderItems.rendering;
    await render.map((product) => {
        var span = document.createElement("div");
        span.innerHTML = product

        root.append(span)
    })
    document.getElementById("place").addEventListener("click", handleOrders);
    document.getElementById("cartIcon").innerHTML = window.localStorage.getItem("cartIcon2");

}
window.onload = loader();