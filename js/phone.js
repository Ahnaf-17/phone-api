const loadPhone = async (searchText ='13') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones);
}

const displayPhone = phones => {
    // console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent ='';

    const showAllContainer = document.getElementById('show-all-container')
    // display all 
    if(phones.length>12){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }

    // display only 12
    phones = phones.slice(0,12);

    phones.forEach(phone => {
        // console.log(phone);
// step 2 : create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-gray-100 shadow-xl`;
        // step 3 : set inner HTML 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
        // step 4 : append child 
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading 
    toggleLoading(false);
}


// search button 
const handleSearch = () =>{
    toggleLoading(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
        // console.log(searchText)
        loadPhone(searchText);

}

// const handleSearch2 = () =>{
//     toggleLoading(true);
//     const searchField = document.getElementById('search-field-2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoading = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}


const handleShowDetail = async (id)=>{
// console.log('kaj hoise')
// load data 
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json();
console.log(data);
const phone = data.data;
showPhoneDetails(phone);

}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt=""/>
    <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
    `;

    show_details_modal.showModal()
}

loadPhone();