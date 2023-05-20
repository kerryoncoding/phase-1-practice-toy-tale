let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  
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

function getToys(){
  fetch("http://localhost:3000/toys")
  .then((response) => {return response.json()})
  .then((data)=>{
    data.forEach(element => {
      renderSingleCard(element)
  })
  //activateLikeButton()
  })
}


function renderSingleCard(element) {
  let div = document.createElement("div")
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let p = document.createElement("p")
  let btn = document.createElement("button")

  let totalLikes = element.likes

  div.className = "card"
  h2.textContent = element.name
  img.src = element.image
  img.className = "toy-avatar"
  p = `${element.likes} Likes`
  btn.className = "like-btn"
  btn.textContent = "Like ❤️" 

  div.append(h2, img, p, btn)
  document.getElementById("toy-collection").append(div)

  btn.addEventListener("click", ()=>{
    fetch(`http://localhost:3000/toys/${element.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({likes: totalLikes+1})
      //Likes update with Refresh of screen.. not sure why it isn't automatic - might revisit this
    })
    //renderSingleCard(element.p)

  })
 
  
}


//POST

document.querySelector("form").addEventListener("submit", handleForm)

function handleForm(e) {
  e.preventDefault()
  const toyData = {
    name: (e.target.name.value),
    image: (e.target.image.value),
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
       Accept: "application/json"
    },
    body: JSON.stringify(toyData)
  })
  .then(response => response.json())
  .then(data => {
    renderSingleCard(data)
  })
  .catch(error=>{console.log(error)})
  document.querySelector("form").reset();
}


//PATCH
/*
function activateLikeButton(){
  let likeButton = document.querySelectorAll(".like-btn")
  let btnArr = Array.from(likeButton)
  console.log(btnArr)
  btnArr.forEach(element => element.addEventListener("click", whenLiked))
}


function whenLiked(e){
  console.log("do something")
 
}

*/

