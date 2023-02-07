const token = localStorage.getItem("accessToken")
const user = JSON.parse(localStorage.getItem('user'));
let userId = user._id;

const handleFilter = (item, price, category, rating) => {
    let filter = true;

    // console.log(item);

    if (price) {
        if (price == 100) filter = item.price < 100
        else filter = item.price > price
        if (!filter) return filter
    }
    if (category.length) {
        console.log(category.indexOf(item.category));
        filter = category.indexOf(item.category) != -1;
        if (!filter) return filter
    }
    if (rating) {
        filter = item.rating.rate > rating

    }

    console.log(filter);

    return filter
}



const getProducts = {
    render: async function (filter, search, price, currentPage) {
        if (filter || search || price) {
            document.getElementById("pageDiv").style.display = "none"
        }
        else {
            document.getElementById("pageDiv").style.display = "block"
        }
        let response = await axios({
            method: "POST",
            url: "http://localhost:3456/getallproducts/" + userId + "/" + currentPage,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: {
                filter: filter,
                search: search,
                price: price
            }

        })
        if(response.data.msg=="error")
        {
            // console.log("hiii");
            let err=document.createElement("div")
            err.innerHTML="Internal Error"
            document.getElementById("static").appendChild(err)
            return
        }
    else{
        //console.log(response);
        var products = response.data.productData;
        var cartLength = response.data.cartLength;
        
        

        window.localStorage.setItem("cartIcon", cartLength);
        //console.log(products)

        if (search) {
            products = products.filter((item) => item.title.toLowerCase().includes(filter));
        }
        if (filter && (filter.price || filter.category || filter.rating)) {
            products = products.filter((item) => handleFilter(item, filter.price, filter.category, filter.rating));
        }
        if (price === "low") {
            products.sort(function (a, b) {
                return a.price - b.price;
            })
        }
        if (price === "high") {
            products.sort(function (a, b) {
                return b.price - a.price;
            })
        }


        const rendering = products.map((product) => `
        <div  id=${product._id} class="mb-10 overflow-hidden rounded-lg bg-white flex flex-col justify-evenly h-[500px] items-center shadow shadow-gray-400 p-1 m-2">
            <div class=" w-3/6 h-3/6">
                 <img  alt="image" class=" object-scale-down w-[380px] min-lg:w-1/2 h-full min-md:h-1/2  " src=${product.image} />
            </div>
            <div class=" flex flex-col p-8 items-start w-full sm:p-9 md:p-7 xl:p-9">
            <h3 class="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">${product.title}</h3>
                <p class="text-body-color mb-2 text-base leading-relaxed">${product.category}</p>
                <p class="text-body-color mb-2 text-base leading-relaxed"> ${product.rating.rate}</p>
                <p class="text-red-600 text-lg font-bold mb-2 text-base leading-relaxed"> Rs: ${product.price} </p>
            </div>
        </div>
</div >`)



        return { rendering, products }
    }
}
}

export default getProducts;





// const rendering = products.map((product) => `
//         <div id=${product._id}  class=" flex flex-col rounded-xl cursor-pointer min-h-full bg-white text-black ">
//         <div class="flex h-56  justify-center w-full">
//         <img class=" object-scale-down px-5 w-1/2 p-3 " src=${product.image} />
//         </div>
//         <div class="">
//             <ul class=" top-0 px-5 py-5">
//             <li class="break-all">${product.title}</li>
//             <li class="font-thin">Category : ${product.category}</li >
//             <li class="font-thin">Rating : ${product.rating.rate}</li>
//             <li class="text-red-600 text-lg font-bold">Rs: ${product.price} /-</li>
//             </ul>
//         </div>
//         </div > `)