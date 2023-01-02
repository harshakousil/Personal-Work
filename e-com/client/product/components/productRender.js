const productId = localStorage.getItem('currentProduct');
const token = localStorage.getItem("accessToken")
const user = JSON.parse(localStorage.getItem('user'));
let userId = user._id;
const productRender = {
    render: async () => {
        let response = await axios({
            method: "GET",
            url: `http://localhost:3456/getproduct/${productId}/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        const product = response.data.product;
        let cartIcon1 = response.data.cartLength;
        window.localStorage.setItem("cartIcon1", cartIcon1);
        console.log(product);
        return `
        <div id=${product._id}  class="w-5/6 items-center px-4 lg:px-0 shadow shadow-gray-400">
        <div class="p-12 bg-white rounded ">
            <div class="flex  md:flex-col lg: flex-col 2xl:flex-col ">
                <div class=" items-end lg:w-4/6  mb-5 h-62 lg:mb-0">
                    <img src="${product.image} "
                         class=" w-52  rounded">
                </div>
                <div class="flex-col flex p-2 justify-evenly">
                    <div class="flex flex-wrap ">
                           <div class="flex items-start mb-2 justify-between w-full min-w-0 ">
                            <label class="text-xl pr-5 max-md:w-full max-md:pr-2" for="title" >Title: </label>
                                <h2 class="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                                ${product.title}
                                </h2>
                            </div>
                            <div class="flex items-start mb-2 justify-between w-full min-w-0 "> 
                            <label class="text-xl pr-5 max-md:w-full max-md:pr-2" for="title" >Category :</label>
                                <h2 class="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                                ${product.category}
                                </h2>
                            </div>
                            <div class="flex items-start mb-2 justify-between w-full min-w-0 "> 
                            <label class="text-xl pr-5 max-md:w-full max-md:pr-2" for="title" >Rating : </label>
                                <h2 class="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                                ${product.rating.rate}
                                </h2>
                            </div>
                            <div class="flex items-start justify-between w-full min-w-0 "> 
                            <label class="text-xl text-black-200 pr-5 mb-5 max-md:w-full max-md:pr-2" for="title" > Description: 
                                <h3 class="mr-auto text-lg cursor-pointer break-evenly hover:text-gray-900 ">
                                ${product.description}
                                </h3>
                                </label>
                             </div>
                    </div>
                    <div class="mt-1  text-red-500 text-2xl font-semibold">${product.price} /-</div>
                </div>
            </div>
        </div>
    </div>  `
    }
}


export default productRender;