import getProducts from "./components/getProducts.js";

const token = localStorage.getItem("accessToken")
if (!token) {
    window.location.replace("../SignIn/index.html");
}

const user = JSON.parse(localStorage.getItem('user'));
console.log(user._id)
let currentPage = 0;


document.getElementById("delete").addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    console.log(localStorage.getItem("accessToken"));
    window.location.replace("../SignIn/index.html");
});


function handleProductRoute(productId) {
    window.localStorage.setItem("currentProduct", productId);
    window.location.replace('../product/product.html')
}
function handleProfile() {
    window.location.replace('../Profile/profile.html');
}

function addEvents(products) {
    products.map((product) => {
        document.getElementById(product._id).addEventListener('click', () => handleProductRoute(product._id))
    })
}

const handleSearch = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        let value = document.getElementById("input").value;
        if(value=="")
        {
            location.reload();
        }
        else{
        value=value.toLowerCase();
        loader(value, true, null, currentPage);
        }
    }

}

const ClearAllFilters = (e) => {

    e.preventDefault();
    location.reload();

}
const handleFilter = (e) => {

    e.preventDefault();
    console.log(e);
    let price;
    for (let i = 1; i <= 5; i++) {
        console.log(e.srcElement[i]);
        if (e.srcElement[i].checked) {
            price = e.srcElement[i].value
        }


    }
    let category = [];
    for (let i = 6; i <= 9; i++) {
        if (e.srcElement[i].checked) {
            category.push(e.srcElement[i].value);
        }

    }
    let rating;
    for (let i = 10; i <= 11; i++) {
        if (e.srcElement[i].checked) {
            rating = e.srcElement[i].value
        }

    }

    const filter = { price, category, rating }

    loader(filter, null, null, currentPage)
}
const PriceSort = () => {
    loader(null, false, "def", currentPage);

}
const LowPriceSort = () => {
    loader(null, false, "low", currentPage);

}
const HighPriceSort = () => {
    loader(null, false, "high", currentPage);

}
const handlePage = (e) => {
    if (e.target.id == "up") {
        currentPage -= 1
    }
    else if (e.target.id == "down") {
        currentPage += 1
    }
    if (currentPage == 0) {
        document.getElementById("up").setAttribute("disabled", true)
    }
    else if (currentPage == 3) {
        document.getElementById("down").setAttribute("disabled", true)
    }
    else {
        document.getElementById("up").removeAttribute("disabled")
        document.getElementById("down").removeAttribute("disabled")
    }

    const page = document.getElementById("page");
    page.textContent = currentPage + 1;
    loader(null, false, null, currentPage)
}
page.textContent = currentPage + 1;
const pagebtns = document.querySelectorAll(".pagebtn");
document.getElementById("up").setAttribute("disabled", true)
for (let i = 0; i < pagebtns.length; i++) {
    pagebtns[i].addEventListener("click", handlePage)
}



async function loader(filter, search, price, currentPage) {


    const productdiv = document.getElementById("products");

    while (productdiv.firstChild) {
        productdiv.removeChild(productdiv.firstChild);
    }

    const { rendering, products } = await getProducts.render(filter, search, price, currentPage);
    rendering.map((product) => {
        var span = document.createElement("span");
        span.innerHTML = product

        productdiv.append(span)
    })

    addEvents(products)
    document.getElementById("cartIcon").innerHTML = localStorage.getItem("cartIcon");
}

window.onload = loader(null, false, null, currentPage);






document.getElementById("profile").addEventListener("click", handleProfile)
document.getElementById("input").addEventListener("keypress", handleSearch);
document.getElementById("clearAll").addEventListener("click", ClearAllFilters);
document.getElementById("clearAll1").addEventListener("click", ClearAllFilters);
document.getElementById("filter").addEventListener("submit", handleFilter);
document.getElementById("filter1").addEventListener("submit", handleFilter);
document.getElementById("low").addEventListener("click", LowPriceSort)
document.getElementById("high").addEventListener("click", HighPriceSort)
document.getElementById("default").addEventListener("click", PriceSort)






