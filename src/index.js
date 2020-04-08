let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  const formSend = document.querySelector('.add-toy-form')
  const mainDiv = document.getElementById('toy-collection')


  getToys()





  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";

    } else {
      toyForm.style.display = "none";
    }
  });


  formSend.addEventListener('submit',function(event){
    let objName = formSend.name.value
    let objImage = formSend.image.value

    let finalObj = {
      "name": objName,
      "image": objImage,
      "likes": 0
    }

    newToy(mainDiv,finalObj)

  })

  mainDiv.addEventListener('click' , function(){
    if(event.target.className === "like-btn"){
      console.log(event.target.parentNode)
      likes(event)

    }
  })


});


function getToys(){
  let mainDiv = document.getElementById('toy-collection')
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(function(data){
    data.forEach(function(toyObj){
    pageLoader(mainDiv,toyObj)
      
    })
  })
}

function newToy(bigdiv , obj){

  let reqObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(obj)
}


fetch('http://localhost:3000/toys', reqObj)
.then(resp => resp.json())
.then(function(data){
    pageLoader(bigdiv,data)
})


}

function pageLoader(bigdiv,obj){
  let div = document.createElement('div')
  div.className = 'card'
  div.innerHTML = 
  `<h2>${obj.name}</h2>
   <img src= ${obj.image} class="toy-avatar" />
   <p>${obj.likes} </p>
   <button class="like-btn"> Like <3</button>`

   bigdiv.appendChild(div)
}

function likes(e) {

  e.preventDefault()

  let more = parseInt(e.target.previousElementSibling.innerText) + 1



fetch(`http://localhost:3000/toys/${e.target.parentNode.id}`, {

      method: "PATCH",

      headers: {

        "Content-Type": "application/json",

        "Accept": "application/json"

      },

      body: JSON.stringify({

        "likes": more

      })

    })

    .then(res => res.json())

    .then((like_obj => {

      e.target.previousElementSibling.innerText = `${more} likes`;

    }))

}


