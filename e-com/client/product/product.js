import productRender from "./components/productRender.js";
let productId = window.localStorage.getItem('currentProduct');

const token = localStorage.getItem("accessToken")
const user = JSON.parse(localStorage.getItem('user'));
if (!token) {
    window.location.replace("../SignIn/index.html");
}

document.getElementById("delete").addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    window.location.replace("../SignIn/index.html");
});

async function handleCart() {
    const value = document.getElementById("number").value;
    if(value<=0)
    {
        console.log(document.getElementById("toastItem1"));
        document.getElementById("toastItem1").classList.remove('hidden')
        document.getElementById("toastItem1").classList.add('visible')
        console.log(document.getElementById("toastItem1"));
        document.getElementById("number").value = "";
    }
    else{
    await handleAddCart(productId, value);
    }
}
async function handleAddCart(productId, value) {
    let response = await axios({
        method: "PUT",
        url: `http://localhost:3456/addcart/${user._id}/${productId}/${value}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    let response1=await response;

console.log(response1);
if(response1.data.msg=="error")
{
    console.log(response1.data.msg);
    return
}
    if (response1.data.msg == "Added") {
        console.log(document.getElementById("toastItem"));
        document.getElementById("toastItem").classList.remove('hidden')
        document.getElementById("toastItem").classList.add('visible')
        console.log(document.getElementById("toastItem"));
        document.getElementById("number").value = "";

    }


}


async function loader() {

    const root = document.getElementById("root");
    root.innerHTML = await productRender.render();
    document.getElementById("gotocart").addEventListener("click", handleCart);
    window.document.getElementById("cartIcon").innerHTML = window.localStorage.getItem("cartIcon1");


}

window.onload = loader();

