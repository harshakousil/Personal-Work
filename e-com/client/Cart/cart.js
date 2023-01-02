import cartRender from "./components/cartRender.js";

const token = localStorage.getItem("accessToken")
const user = JSON.parse(localStorage.getItem('user'));
if (!token) {
    window.location.replace("../SignIn/index.html");
}

document.getElementById("delete").addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    window.location.replace("../SignIn/index.html");
});

async function deleteCartItem(e) {
    const productId = e.target.value
    console.log(productId);

    const response = await axios({
        method: "POST",
        url: `http://localhost:3456/deleteCartItem/${user._id}/${productId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(response)
    const { msg } = response.data;
    if(msg=="error")
    
    {
        console.log(msg)
        return
    }
    if (msg == "success") {
        // alert("Item delted..");
        console.log(document.getElementById("toastItem"));
        document.getElementById("toastItem").classList.remove('hidden')
        document.getElementById("toastItem").classList.add('visible')
        console.log(document.getElementById("toastItem"));
        // loader()
    }

}
function increaseCount(i) {
    let value = document.getElementsByClassName("input")[i].value
    // console.log(value);
    value = isNaN(value) ? 0 : value;
    value++;
    console.log(value);
    // document.getElementById("product.productDetails._id").value = value
    document.getElementsByClassName("input")[i].value = value;
    //console.log(document.getElementsByClassName("input").value)
}

function decreaseCount(i) {
    let value = document.getElementsByClassName("input")[i].value
    let val = document.getElementsByClassName("down")[i].value
    console.log(val);

    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        document.getElementsByClassName("input")[i].value = value
        // document.getElementsByClassName("input").value = value;
    }
}

async function handleCheckout() {
    let len = document.getElementsByClassName("majordiv").length;
    if(len==0)
    {
        console.log("cart is empty you can't checkout");
        console.log(document.getElementById("toastItem1"));
        document.getElementById("toastItem1").classList.remove('hidden')
        document.getElementById("toastItem1").classList.add('visible')
        console.log(document.getElementById("toastItem1"));
    }
    else{
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(document.getElementsByClassName("down")[i].value)
        arr.push(document.getElementsByClassName("input")[i].value)
    }
    console.log(arr);
    //console.log(user._id);
    let response = await axios({
        method: "PUT",
        url: `http://localhost:3456/editcart/${user._id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data:
        {
            cartArr: arr
        }
    })
    if (response.data.msg == "Added") {
        //write toaster function here;
        window.location.replace("../Orders/orders.html")
    }
    console.log(document.getElementsByClassName("down")[0].value)
    console.log(document.getElementsByClassName("input")[0].value)
}

}
async function loader() {
    const root = document.getElementById("root");
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    let renderItems = await cartRender.render();
    let render = renderItems.rendering;
    await render.map((product) => {
        var span = document.createElement("span");
        span.innerHTML = product

        root.append(span)
    })

    document.getElementById("cartIcon").innerHTML = window.localStorage.getItem("cartIcon2");

    let cartItems = document.getElementsByClassName("deleteCartItem")
    let downButton = document.getElementsByClassName("down")
    let upButton = document.getElementsByClassName("up")
    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].addEventListener("click", deleteCartItem);
    }
    for (let i = 0; i < downButton.length; i++) {
        downButton[i].addEventListener("click", function () {
            decreaseCount(i);
        });
    }
    for (let i = 0; i < upButton.length; i++) {
        upButton[i].addEventListener("click", function () {
            increaseCount(i);
        })
    }
    document.getElementById("checkout").addEventListener("click", handleCheckout);

}
window.onload = loader();



