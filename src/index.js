let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => fetchToys(), 2000)
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection');
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    name = toyForm.getElementsByClassName('input-text')[0].value 
    image = toyForm.getElementsByClassName('input-text')[1].value 
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
        body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
        })
      })
      fetchToys()
  })

  function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(toys) {
    toyOrganizer(toys)
  })
  }

  function toyOrganizer(toyObj) {
    toyCollection.innerHTML = ''
    toyObj.forEach(toy => {
      let newDiv = document.createElement('div')
      newDiv.className = 'card'
      newDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" data-id="${toy.id}">Like <3</button>`
      toyCollection.appendChild(newDiv);
    });
  }

  // Like button

  let likeButton = document.querySelectorAll('.like-btn')


  document.addEventListener('click', function(e){
    
    if (e.target.className === 'like-btn') {
      let currentLikeText = e.target.parentNode.querySelector('p').textContent
      currentLikes = parseInt(currentLikeText)
      currentLikes++
      e.target.parentNode.querySelector('p').textContent = `${currentLikes} Likes`
      
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: 'PATCH', 
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
          body: JSON.stringify({
          likes: `${currentLikes}`
        })
      })
    }

  });

});