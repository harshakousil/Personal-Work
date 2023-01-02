const productId = localStorage.getItem('currentProduct');
const token = localStorage.getItem("accessToken")
if (!token) {
    window.location.replace("../SignIn/index.html");
}
const user = JSON.parse(localStorage.getItem('user'));


const cartRender = {
    render: async () => {
        let response = await axios({
            method: "GET",
            url: "http://localhost:3456/getcart/" + user._id,
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        if(response.data.msg=="error")
        {
            console.log(response.data.msg)
            return
        }
        const product = await response.data.cart;
        let cartIcon = await response.data.cartLength;
        window.localStorage.setItem("cartIcon2", cartIcon);
        let rendering = await product.map(product => `
        <div id=${product.productDetails._id}  class="drop-shadow-lg shadow-black m-12 grid grid-cols-12 h-1/2 rounded-xl cursor-pointer  bg-gray-100 text-black majordiv">
    
        <div class=" h-64 flex items-center  col-span-12 lg:col-span-4 md:col-span-3">
        <img class=" h-5/6 object-scale-down px-5 w-full p-1 m-3 rounded-lg bg-white " src=${product.productDetails.image} />
        </div>
        <div class="col-span-12 lg:col-span-4 md:col-span-6  flex items-center ">
            <ul class=" top-0 px-5 py-5 gap-2 flex flex-col">
            <li class="break-all">${product.productDetails.title}</li>
            <div class="flex">
            <li class="font-bold mr-4">Category : </li >
            <li class="font-thin"> ${product.productDetails.category}</li ></div>
            <li class="font-bold">Description : </li >
            <li class="font-thin"> ${product.productDetails.description}</li >
            <li class="text-red-600 text-lg font-bold">Rs: ${product.productDetails.price} /-</li>
            </ul>
        </div>
        <div class="col-span-12 lg:col-span-4 md:col-span-3 flex flex-col items-center justify-evenly mb-6">
            <div class="counter rounded-md bg-gray-300 flex justify-center items-center" >
            <button value="${product.productDetails._id}" class="down p-3">-</button>
            <input class="input w-12 border border-0 text-bold rounded-md text-center outline-0 "type="text" value="${product.count}">
            <button value="${product.productDetails._id}" class="up p-3 ">+</button>
        </div>
            <button
            class="deleteCartItem text-white py-2 max-md:mt-3  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4"
            type="button" value="${product.productDetails._id}">Delete From Cart
            </button>
        </div>
        </div > `);

        return { rendering, product }

    }
}



export default cartRender;
