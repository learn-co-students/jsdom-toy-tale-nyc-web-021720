let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  let url=" http://localhost:3000/toys"
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  
  // fetch all the toy objects
    fetch(url).then(response=>response.json()).then(
    toys =>{
      toys.forEach(function(toy){
        fetchToy(toy)
      })
    })

// add a new toy button
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

// create a toy button
let addtoyform=document.querySelector(".add-toy-form")

addtoyform.addEventListener("submit", function(e){
    let input =document.getElementsByClassName("input-text")
  
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({
      "name": input[0].value,
      "image": input[1].value,
      "likes": 0
    })
  })
})

document.addEventListener("click",function(e){

  if(e.target.className=== "like-btn"){
    let button=e.target
    let parent=button.parentNode
    let id=parent.dataset.id
    let p =parent.querySelector("p")
    let likes=parseInt(p.innerText)
    likes++
    p.innerText=likes

    fetch(`http://localhost:3000/toys/${id}`,{

    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "accept":"application/json"
    },
    body:JSON.stringify({likes})
    })
  }
})



});







function fetchToy(toy){
  const toycollection=document.getElementById("toy-collection")

  let newToy=document.createElement("list")

  newToy.innerHTML= `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  
  `
   toycollection.append(newToy)
}