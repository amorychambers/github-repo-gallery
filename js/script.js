const profileHeader = document.querySelector(".overview");
const repoSection = document.querySelector(".repos");
const repoList = document.querySelector(".repo-list");
const repoData = document.querySelector(".repo-data");
const backToGallery = document.querySelector(".view-repos");
const searchBox = document.querySelector('.filter-repos');
const username = "amorychambers";


getProfile();

async function getProfile (){
    const data = await fetch(`https://api.github.com/users/${username}`);
    const profileInfo = await data.json();
    displayProfile(profileInfo);
};
// Fetches profile data

function displayProfile (profileInfo){
    let userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
        <figure>
          <img alt="user avatar" src=${profileInfo.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${profileInfo.name}</p>
          <p><strong>Bio:</strong> ${profileInfo.bio}</p>
          <p><strong>Location:</strong> ${profileInfo.location}</p>
          <p><strong>Number of public repos:</strong> ${profileInfo.public_repos}</p>
        </div>`;
        profileHeader.append(userInfo);
        getRepos();
};
// Displays profile data

async function getRepos (){
  const data = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoInfo = await data.json();
  displayRepos(repoInfo);
};
// Fetches public repo data

function displayRepos (repos){
  searchBox.classList.remove("hide");
  for (let repo of repos){
    let listItem = document.createElement("li");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    listItem.classList.add("repo");
    repoList.append(listItem);
  };
};
// Displays public repo data

repoList.addEventListener("click", function(e){
  if (e.target.matches("h3")){
    let repoName = e.target.innerText;
    singleRepo(repoName);
  }
});
// Displays more detailed info on the repo that the user clicks

async function singleRepo (repoName){
  let data = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  let singleRepoInfo = await data.json();
  let fetchLanguages = await fetch(`${singleRepoInfo.languages_url}`);
  let languageData = await fetchLanguages.json();
  let languages = [];
  for (let key in languageData){
    languages.push(key);
  };
  displayRepoInfo(singleRepoInfo, languages);
};
// Collects specific data on one repo

function displayRepoInfo (singleRepoInfo, languages){
  repoData.innerHTML = "";
  let repoCard = document.createElement("div");
  repoCard.innerHTML = `<h3>Name: ${singleRepoInfo.name}</h3>
    <p>Description: ${singleRepoInfo.description}</p>
    <p>Default Branch: ${singleRepoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${singleRepoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(repoCard);
    repoSection.classList.add("hide");
    repoData.classList.remove("hide");
    backToGallery.classList.remove("hide");
};
// Displays the card with all the specific repo information

backToGallery.addEventListener("click", function(){
  repoSection.classList.remove("hide");
  repoData.classList.add("hide");
  backToGallery.classList.add("hide");
});
// Allows the user to switch back to the gallery view

searchBox.addEventListener("input", function(e){
  const userInput = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchTerm = userInput.toLowerCase();
  for (let repo of repos){
    repoName = repo.innerText.toLowerCase();
    if (!repoName.includes(searchTerm)){
      repo.classList.add("hide");
    } else {
      repo.classList.remove("hide");
    }
  }
});