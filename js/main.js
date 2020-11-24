// start regex 
// let regex = /^[A-Z][a-z]{3,6}$/;

// let prodName = "Toshibaa";
// if(regex.test(prodName) == true){
// console.log("valid"); 
// }else{
//     console.log("alaai");
// }
 
// start main 
let nameInput = document.getElementById("name");
let priceInput = document.getElementById("price");
let cateInput = document.getElementById("cate");
let descInput = document.getElementById("desc");
let searchInput = document.getElementById("searchInput");
let adderBtn = document.getElementById("adder");

let productNameAlert = document.getElementById('prodNameAlert');

let tbody = document.getElementById("tablebody");
let productList;

// for saving and retrieving from local storage 
if(localStorage.getItem('products') == null){
    productList =[];
}else{
    productList =JSON.parse(localStorage.getItem('products'));
    displayProducts(productList);
}

// main function to add products to the table 
adderBtn.addEventListener('click',function(){
let singleProduct = {
    nameInputValue : nameInput.value,
    priceInputValue : priceInput.value,
    cateInputValue : cateInput.value,
    descInputtValue :descInput.value,
}

productList.unshift(singleProduct);
localStorage.setItem('products',JSON.stringify(productList));
displayProducts(productList);
clear();

});

// reuse this one to be able to dispaly every update and change 
function displayProducts(anyArray){
    // date 
    let dailyDate = new Date();
    let days = dailyDate.getDate().toString();
    let months = (dailyDate.getMonth()+1).toString();
    // 
    let container = "";
    for(let i = 0 ; i < anyArray.length;i++){
        container+=`<tr> 
        <td>${i}</td>
        <td>${days}-${months}</td>
        <td>${anyArray[i].nameInputValue}</td>
        <td>${anyArray[i].priceInputValue}</td>
        <td>${anyArray[i].cateInputValue}</td>
        <td>${anyArray[i].descInputtValue}</td>
        <td><button onclick="updater(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleter(${i})" class="btn btn-danger">Delete</button></td>
        <tr>`    
    }
    tbody.innerHTML=container;
}

// clear the input after every submit 
function clear(){
nameInput.value=""; 
priceInput.value="";
cateInput.value=""; 
descInput.value=""; 
}

// delete function
function deleter(index){
    productList.splice(index,1);
    localStorage.setItem('products',JSON.stringify(productList));
    displayProducts(productList);
}

// update function retrieving the date to the input placeholder
function updater(index){
nameInput.value=productList[index].nameInputValue; 
priceInput.value=productList[index].priceInputValue;
cateInput.value=productList[index].cateInputValue; 
descInput.value=productList[index].descInputtValue; 
deleter(index);
}


// search function 
function searchProducts(){
    let neededProduct = [];
    let term = searchInput.value;
    for(let i = 0; i < productList.length; i++){
        if(productList[i].nameInputValue.toLowerCase().includes(term.toLowerCase() )){
            neededProduct.unshift(productList[i]);
        }
    }
    displayProducts(neededProduct);

}


// start validation 
function validateProName(prodName){
    let regex = /^[A-Z][a-z]{3,7}$/;
    if(regex.test(prodName)==true){
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
        productNameAlert.classList.add("d-none");
    }else{
        nameInput.classList.remove("is-valid");
        nameInput.classList.add("is-invalid");
        productNameAlert.classList.remove("d-none");
    }
}

nameInput.addEventListener('keyup',function(){
    validateProName(nameInput.value);
});

// validating price not to be more than 10000 

function validateProPrice(ProdPrice){
    let regex = /^([1-9][0-9]{2,3}|10000)$/;
    if(regex.test(ProdPrice)==true){
        priceInput.classList.remove("is-invalid");
        priceInput.classList.add("is-valid");
        prodPriceAlert.classList.add("d-none");
    }else{
        priceInput.classList.remove("is-valid");
        priceInput.classList.add("is-invalid");
        prodPriceAlert.classList.remove("d-none");
    }
}

priceInput.addEventListener('keyup',function(){
    validateProPrice(priceInput.value);
});