let addToy = false;
const BASE_URL = "http://localhost:3000/toys";
const toyCollection = document.querySelector("#toy-collection");
const body = document.querySelector("body");
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");

addBtn.addEventListener("click", () => {
	// hide & seek with the form
	addToy = !addToy;
	if (addToy) {
		toyForm.style.display = "block";
	} else {
		toyForm.style.display = "none";
	}
});

toyForm.addEventListener("submit", (event) => {
	event.preventDefault();
	postToy(event.target);
});

function fetchToys() {
	return fetch(BASE_URL)
		.then((response) => response.json())
		.then((toys) => {
			toys.forEach(function (toy) {
				renderToy(toy);
			});
		});
}

function renderToy(toy) {
	let divCard = document.createElement("div");
	divCard.dataset.id = `${toy.id}`;
	divCard.className = "card";
	divCard.innerHTML = `
	  <h2>${toy.name}</h2>
       <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes</p>
      <button class="like-btn">Like <3</button>
    `;
	toyCollection.appendChild(divCard);
}
function postToy(toy_data) {
	let body = {
		name: toy_data.name.value,
		image: toy_data.image.value,
		likes: 0,
	};
	console.log(body);
	return fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((obj_toy) => {
			console.log(obj_toy);
			let new_toy = renderToy(obj_toy);
			toyCollection.append(new_toy);
		});
}
document.addEventListener("click", function (event) {
	if (event.target.className === "like-btn") {
		let parent = event.target.parentNode;
		let id = parent.dataset.id;
		console.log(id);
		let p = parent.querySelector("p");
		console.log(p);
		let likes = parseInt(p.innerText);
		likes++;
		p.innerText = `${likes} likes`;

		fetch(`http://localhost:3000/toys/${id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({ likes }),
		});
		// .then((response) => response.json());
	}
});

fetchToys();
