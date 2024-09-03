let title = document.querySelector("#title")
let price = document.querySelector("#price")
let taxes = document.querySelector("#taxes")
let ads = document.querySelector("#ads")
let discount = document.querySelector("#discount")
let total = document.querySelector("#total")
let count = document.querySelector("#count")
let category = document.querySelector("#category")
let create = document.querySelector("#create")
let search = document.querySelector("#search")
let searchTitle = document.querySelector("#searchTitle")
let searchCategory = document.querySelector("#searchCategory")
let tbody = document.querySelector("#tbody")
let mode;
let model = 'create'
//get total
    function getTotal(){
        if(price.value != ""){
            total.innerHTML = ((+price.value + +taxes.value + +ads.value) - +discount.value)
            total.style.backgroundColor = "#040"
        }
        else{
            total.style.backgroundColor = "rgb(145, 2, 2)"
            total.innerHTML = ""
        }
    }

//Create product
    let dataProducts;
    if(localStorage.product != null){
        dataProducts = JSON.parse(localStorage.product)
    }
    else{
        dataProducts = [];
    }
    function clearData(){
        title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        discount.value = ''
        total.innerHTML = ''
        count.value = ''
        category.value = ''
    }
    create.addEventListener("click", function(){
        newProduct = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase()
        }
        if(title.value != '' && price.value !='' && category.value !='' &&  newProduct.count <= 100){
            if(model === 'create'){
                if(newProduct.count >1){
                    for(let j =0; j < newProduct.count; j++){
                        dataProducts.push(newProduct)
                    }
                }else{
                    dataProducts.push(newProduct)
                }
            }else{
                    dataProducts[mode] = newProduct
                    model = 'create'
                    create.innerHTML = "Create"
                    count.style.display ="block"
            }
            clearData()
        }
        localStorage.setItem("product", JSON.stringify(dataProducts))
        showData()
    })
//read
    function showData(){
    getTotal()
    let prod = "";
    for(let i=0; i<dataProducts.length; i++){
        prod += 
        `
             <tr>
                    <td>${i +1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
                
        `
    }
    tbody.innerHTML = prod   
}
showData()
//delete
    function deleteProduct(i){
        dataProducts.splice(i,1)
        localStorage.product = JSON.stringify(dataProducts)
        showData()
    }
        let btnDelete = document.getElementById("deleteAll");
        if(dataProducts.length > 0){
            btnDelete.innerHTML = 
            `
                <button>Delete All (${dataProducts.length})</button>
            `
        }else{
            btnDelete.innerHTML = " ";
        }
        
    showData()

    deleteAll.addEventListener("click", function(){
        dataProducts.splice(0)
        localStorage.clear()
        btnDelete.innerHTML = "";
        showData()
    })


//update
   function updateDate(i){
    title.value = dataProducts[i].title
    price.value = dataProducts[i].price
    taxes.value = dataProducts[i].taxes
    ads.value = dataProducts[i].ads
    discount.value = dataProducts[i].discount
    getTotal()
    count.style.display = "none"
    category.value = dataProducts[i].category
    create.innerHTML = "Update"
    mode = i
    model = 'update'
    scroll({
        top:0,
        behavior:"smooth"
    })
        showData()
   }

//search
let searchMood = 'title'
function getSearchMood(id){
    if(id == 'searchTitle'){
        searchMood = 'title'
    }else{
        searchMood = 'category'
    }
     search.Placeholder = 'Search By '+ searchMood;
    search.focus()
    search.value =''
    showData()

}
function searchData(value){
    let prod=''
    if( searchMood == 'title'){
        for(let i = 0; i < dataProducts.length; i++){
            if(dataProducts[i].title.includes(value.toLowerCase())){
                prod += 
                `
                     <tr>
                            <td>${i +1}</td>
                            <td>${dataProducts[i].title}</td>
                            <td>${dataProducts[i].price}</td>
                            <td>${dataProducts[i].taxes}</td>
                            <td>${dataProducts[i].ads}</td>
                            <td>${dataProducts[i].discount}</td>
                            <td>${dataProducts[i].total}</td>
                            <td>${dataProducts[i].category}</td>
                            <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                        
                `
            }
        }
    }else{
        for(let i = 0; i < dataProducts.length; i++){
            if(dataProducts[i].category.includes(value.toLowerCase())){
                prod += 
                `
                     <tr>
                            <td>${i +1}</td>
                            <td>${dataProducts[i].title}</td>
                            <td>${dataProducts[i].price}</td>
                            <td>${dataProducts[i].taxes}</td>
                            <td>${dataProducts[i].ads}</td>
                            <td>${dataProducts[i].discount}</td>
                            <td>${dataProducts[i].total}</td>
                            <td>${dataProducts[i].category}</td>
                            <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                        
                `
            }
        }
    }
    tbody.innerHTML = prod
}



//clean data