let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Page loads- GET request to Fetch toys object and make "cards"
fetchToys();
//---------------------------------------------------------------------
//Functions::
//Takes a toy and renders a card on the DOM
function renderCard(toy){
  let card = document.createElement('p')
  card.className = "card"
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <h4>
    <span class="like-count">${toy.likes} </span> likes
    </h4>
    <button class="like-btn" id="likeBtn">Like</button>
    </div>`
 document.querySelector('#toy-collection').appendChild(card)
 card.querySelector("#likeBtn").addEventListener("click", () =>{
    toy.likes+= 1
   card.querySelector('span').textContent = toy.likes
   updateLike(toy)
 })
}


//-------------------------------------------------------------------
//Fetches::
//Fetches toys from the server right when the page first loads
function fetchToys(){
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(toys => { 
    for(const toy of toys){
      renderCard(toy);
    }
  })
}

//--------------------------------------------------------------------
//Need to be able to add Toys: POST?
//const addToyBtn = 
document.querySelector('.add-toy-form').addEventListener("submit", newToy)

function newToy(e){
  e.preventDefault()
  fetch(`http://localhost:3000/toys`, {
    
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({
      "name": Array.from(e.target.querySelectorAll('input')).find(i => i.name==="name").value,
      "image": Array.from(e.target.querySelectorAll('input')).find(i => i.name==="image").value,
      "likes": 0
    }),
  })
  .then(res => res.json())
  .then(newToy => renderCard(newToy))
  document.querySelector('.add-toy-form').reset();  //resets form!
}

//------------------------------------------------------------------
//Need to be able to "Like" and add to the total on server and DOM
function updateLike(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(response => response.json())
  .then(toy => console.log(toy))
}