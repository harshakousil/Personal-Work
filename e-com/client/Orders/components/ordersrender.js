const productId = localStorage.getItem('currentProduct');
const token = localStorage.getItem("accessToken")
if (!token) {
    window.location.replace("../SignIn/index.html");
}
const user = JSON.parse(localStorage.getItem('user'));


const ordersRender = {
    render: async () => {
        let response = await axios({
            method: "GET",
            url: "http://localhost:3456/getcart/" + user._id,
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        let total = 0;
        const product = await response.data.cart;
        let cartIcon = await response.data.cartLength;
        window.localStorage.setItem("cartIcon2", cartIcon);
        let rendering = await product.map(product => {
            total = total+ Math.floor(product.productDetails.price * product.count); return `<div id=${product.productDetails._id}
        class="border-b border-gray-900 md:flex-row  bg-white flex-col flex justify-evenly items-start w-full pt-8 pb-8 space-y-4 md:space-y-0">
        <img class=" h-44 object-scale-down  px-5 w-1/2 p-3 " src=${product.productDetails.image} />
        <div class="w-full flex flex-col justify-start text-black items-start space-y-8">
            <h3 class="text-xl dark:text-black-900 xl:text-2xl font-semibold leading-6 text-gray-800">
                ${product.productDetails.title}</h3>
            <div class="flex justify-start items-start flex-col space-y-2">
                <p class="text-sm dark:text-black-900 leading-none text-gray-800"><span
                        class="dark:text-gray-400 text-gray-300">Category: </span> ${product.productDetails.category}</p>
            </div>
        </div>
        <div class="flex justify-around space-x-8  items-center h-24 w-full">
            <p class="text-base dark:text-red-400 lg:text-lg leading-6">${product.productDetails.price} /- <span></span>
            <p class="text-base dark:text-black-900 xl:text-lg leading-6 text-gray-800">${product.count} items </p>
            <p class="text-base dark:text-black-900 xl:text-lg font-semibold leading-6 text-gray-800">RS :
                ${Math.floor(product.productDetails.price * product.count)}</p>
        </div>
    </div>`});

        return { rendering, product, total }

    }
}



export default ordersRender;
// `
// <div id=${product.productDetails._id}  class="drop-shadow-lg shadow-black m-12 grid grid-cols-12 h-1/2 rounded-xl cursor-pointer  bg-gray-100 text-black majordiv">
// <div class=" h-64 flex items-center col-span-12 lg:col-span-4 md:col-span-3">
// <img class=" h-5/6 object-scale-down px-5 w-full p-3 " src=${product.productDetails.image} />
// </div>
// <div class="col-span-12 lg:col-span-4 md:col-span-6  flex items-center ">
//     <ul class=" top-0 px-5 py-5 gap-2 flex flex-col">
//     <li class="break-all">${product.productDetails.title}</li>
//     <div class="flex">
//     <li class="font-bold mr-4">Category : </li >
//     <li class="font-thin"> ${product.productDetails.category}</li ></div>
//     <li class="font-bold">Description : </li >
//     <li class="font-thin"> ${product.productDetails.description}</li >
//     <li class="text-red-600 text-lg font-bold">Rs: ${product.productDetails.price} /-</li>
//     </ul>
// </div>
// <div class="col-span-12 lg:col-span-4 md:col-span-3 flex flex-col items-center justify-evenly mb-6">
//     <div class="counter rounded-md bg-gray-300 flex justify-center items-center" >
//     <button value="${product.productDetails._id}" class="down p-3">-</button>
//     <input class="input w-12 border border-0 text-bold  text-center outline-0 "type="text" value="${product.count}">
//     <button value="${product.productDetails._id}" class="up p-3 ">+</button>
// </div>
//     <button
//     class="deleteCartItem text-white py-2  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//     type="button" value="${product.productDetails._id}">Delete From Cart
//     </button>
// </div>
// </div > `