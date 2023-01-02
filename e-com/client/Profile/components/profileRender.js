
const token = localStorage.getItem("accessToken")
if (!token) {
    window.location.replace("../SignIn/index.html");
}
const user = JSON.parse(localStorage.getItem('user'));




const profileRender = {
    render: async () => {
        let response = await axios({
            method: "GET",
            url: "http://localhost:3456/profile/" + user._id,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.data.msg=="error")
        {
            console.log(response.data.msg)
            return
        }
        try{
        const orders = await response.data.orders;
        let cartIcon = await response.data.cartLength;
        window.localStorage.setItem("cartIcon3", cartIcon);
        let rendering = await orders.map(order => `
    
        <div id=${order._id}  class="drop-shadow-lg shadow-black  w-full mb-4 p-4 h-full p-2 rounded-xl cursor-pointer  bg-gray-700 text-white majordiv "> 
        <div class="lg:col-span-4 md:col-span-6  flex items-center ">
            <ul class=" col-span-6 top-0 px-5 py-2 gap-2 flex flex-col">
            <li class="break-all"> Order Id: ${order._id}</li>
            <div class="flex flex-col">
           
            </ul>
            <div class="col-span-4 px-5 py-2 mb-2">
            <p class=" text-base  dark:text-white xl:text-lg font-semibold ">Total:
            ${order.total}</p></div>
            </div>
            ${order.products.map((product) => {
            return `<div class="flex text-left bg-white text-black rounded-md p-2">
                <img class="w-20" src="${product.productDetails.image}"/>
                <div class="pl-4">
                <h1>${product.productDetails.title}</h1>
                <p>Rs. ${product.productDetails.price}</p>
                <p>Quantity: ${product.count}</p>
                </div>
                </div>
                `
        })}

      

        </div>`);

        return { rendering }
    }
    catch(err)
    {
        console.log("Error occured in the Front end");
    }
    }
}



export default profileRender;
