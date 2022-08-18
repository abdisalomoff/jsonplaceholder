// ----------------Create HTML element-------------------

const elUsersTemplate = document.querySelector("#users__template").content;
const elPostsTemplate = document.querySelector("#posts__template").content;
const elCommentsTemplate = document.querySelector("#comments__template").content;
const elUsersList = document.querySelector(".users__list");
const elPostsList = document.querySelector(".posts__list");
const elCommentsList = document.querySelector(".comments__list");


// -------------------Users Render-------------------

function renderUser(array){
  elUsersList.innerHTML = null;

  let usersFragment = document.createDocumentFragment();

  array.forEach(item => {
    
  const clonedTemplate = elUsersTemplate.cloneNode(true);

  clonedTemplate.querySelector(".users__item").dataset.userId = item.id;
  clonedTemplate.querySelector(".users__name").textContent = item.username;
  clonedTemplate.querySelector(".users__title").textContent = item.name;
  clonedTemplate.querySelector(".users__id").textContent = item.id;
  clonedTemplate.querySelector(".users__address").textContent =item.address.street+" "+item.address.suite+" "+item.address.city+" "+item.address.zipcode;
  clonedTemplate.querySelector(".company__name").textContent = item.company.name;
  clonedTemplate.querySelector(".company__catchPhrase").textContent = item.company.catchPhrase;
  clonedTemplate.querySelector(".company__bs").textContent = item.company.bs;
  clonedTemplate.querySelector(".users__tel").textContent = item.phone;
  clonedTemplate.querySelector(".users__tel").setAttribute("href", `tel:${item.phone}`);

  clonedTemplate.querySelector(".users__loc").textContent = "GeoLocation";
  clonedTemplate.querySelector(".users__loc").setAttribute("href", `https://www.google.com/maps/place/${item.address.geo.lat},${item.address.geo.lng}`);

  clonedTemplate.querySelector(".users__website").textContent = item.website;
  clonedTemplate.querySelector(".users__website").setAttribute("href", `https://${item.website}`);

  clonedTemplate.querySelector(".users__mail").textContent = item.email;
  clonedTemplate.querySelector(".users__mail").setAttribute("href", `mailto:${item.email}`);

  usersFragment.appendChild(clonedTemplate);
  
});

elUsersList.appendChild(usersFragment)

}

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(data => renderUser(data))


// -------------------Posts Render-------------------

elUsersList.addEventListener("click" , function(evt) {
  let datasetId = evt.target.dataset.userId;

  if (datasetId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${datasetId}/posts`)
    .then(response => response.json())
    .then(data => renderPost(data));
  }

      function renderPost(array){

        elPostsList.innerHTML = null;
        const postsFragment = document.createDocumentFragment();
        
        array.forEach(item => {
        
          const clonedTemplate = elPostsTemplate.cloneNode(true);

          clonedTemplate.querySelector(".posts__item").dataset.postId = item.id;
          clonedTemplate.querySelector(".posts__title").textContent = item.title;
          clonedTemplate.querySelector(".posts__text").textContent = item.body;

        postsFragment.appendChild(clonedTemplate);

        });
        elPostsList.appendChild(postsFragment)
      }
});


// -------------------Comments Render-------------------

elPostsList.addEventListener("click" , function(evt){
    let IdComment = evt.target.dataset.postId;

    if (IdComment) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${IdComment}/comments`)
      .then(response => response.json())
      .then(data => renderComment(data));
    }
    
      function renderComment(array){

        elCommentsList.innerHTML = null;
        const commentFragment = document.createDocumentFragment();
    
        array.forEach(item => {

        
          const clonedTemplate = elCommentsTemplate.cloneNode(true);

          clonedTemplate.querySelector(".comments__item").dataset.postId = item.id;
          clonedTemplate.querySelector(".comments__title").textContent = item.name;
          clonedTemplate.querySelector(".comments__link").textContent = item.email;
          clonedTemplate.querySelector(".comments__link").setAttribute("href",`mailto:${item.email}`);
          clonedTemplate.querySelector(".comments__text").textContent = item.body;

          commentFragment.appendChild(clonedTemplate);
        
        });
        elCommentsList.appendChild(commentFragment);
  }
    
});

