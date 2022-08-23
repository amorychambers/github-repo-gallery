const profileHeader = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
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
  for (let repo of repos){
    let listItem = document.createElement("li");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    listItem.classList.add("repo");
    repoList.append(listItem);
  };
};
// Displays public repo data