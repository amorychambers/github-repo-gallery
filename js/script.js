const profileHeader = document.querySelector(".overview");
const username = "amorychambers";

async function fetchData (){
    const data = await fetch(`https://api.github.com/users/${username}`);
    const profileInfo = await data.json();
    displayData(profileInfo);
    console.log(profileInfo);
};

function displayData (profileInfo){
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
};

fetchData();