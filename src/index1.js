// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {

//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyForm = document.querySelector(".container");
//   const toycollection =document.getElementById("toy-collection")

// const url ="http://localhost:3000/toys"

//   fetch(url).then(resp=>resp.json())
//   .then(toy=>fetchtoy(toy))



  





//     // add a new toy button
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyForm.style.display = "block";
//     } else {
//       toyForm.style.display = "none";
//     }
//   });


//   function fetchtoy(toy){

//     toy.forEach(data=>{
//         const newList=document.createElement("list")
//         newList.innerHTML=`
//         <div class="card">
//         <h2>${data.name}</h2>
//         <img src=${data.image} class="toy-avatar" />
//         <p>${data.likes} Likes </p>
//         <button class="like-btn">Like </button>
//         </div>  `

//         toycollection.append(newList)
//     })
//   }


// //like button
//   document.addEventListener("click",function(e){
//     // console.dir(e.target)
//     if(e.target.className==="like-btn"){
//         let parent=e.target.parentNode //the parent is div class="card"
//         let p=parent.querySelector('p')
//         let likes=parseInt(p.innerText)
//         likes++
//         p.innerText=`${likes} likes`

//         let id=parent.dataset.id
//       // console.dir(id)

//         fetch(`${url}/${id}`,{
//           method: "PATCH",
//           headers:{
//           "content-type": "application/json",
//            "accept":"application/json"
//           },
//           body: JSON.stringify(
//             "likes": likes)
//         })
//     }

//   })









// });



