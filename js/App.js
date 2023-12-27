"use strict";
const owner = 'Iheuzio';
let repo = [];

async function fetchRepos() {
    const cacheKey = 'repos';
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheKey + '_time');

    if (cachedData && cacheTime && new Date().getTime() - cacheTime < 86400000) {
        repo = JSON.parse(cachedData);
        return;
    }

    await fetch(`https://api.github.com/users/${owner}/starred`)
        .then(response => response.json())
        .then(data => {
            const count = data.length;
            for(let i=0; i<count; i++){
                if (data[i].owner.login != owner)
                    continue;
                repo.push(data[i]);
            }
            localStorage.setItem(cacheKey, JSON.stringify(repo));
            localStorage.setItem(cacheKey + '_time', new Date().getTime());
        }).catch(error => {
            console.error(error);
        });
}

async function fetchImages() {
    const cacheKey = 'images';
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheKey + '_time');

    if (cachedData && cacheTime && new Date().getTime() - cacheTime < 86400000) {
        repo = JSON.parse(cachedData);
        return;
    }

    for(let i=0; i<repo.length; i++){
        const name = repo[i].name.match(/^(.*?)\-/)?.[1] || repo[i].name;
        const image_link = `https://api.github.com/repos/${owner}/${repo[i].name}/contents/images/${name}-icon.jpg`;
        repo[i].image = image_link;
        await fetch(image_link)
            .then(response => response.json())
            .then(data => {
                repo[i].image = data.download_url;
            }).catch(error => {
                console.error(error);
            });
    }
    localStorage.setItem(cacheKey, JSON.stringify(repo));
    localStorage.setItem(cacheKey + '_time', new Date().getTime());
}

async function fetchWatchers() {
    const cacheKey = 'watchers';
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheKey + '_time');

    if (cachedData && cacheTime && new Date().getTime() - cacheTime < 86400000) {
        repo = JSON.parse(cachedData);
        return;
    }

    for(let i=0; i<repo.length; i++){
        const watchers_link = `https://api.github.com/repos/${owner}/${repo[i].name}/subscribers`;
        await fetch(watchers_link)
            .then(response => response.json())
            .then(data => {
                repo[i].watchers = data.length;
            }).catch(error => {
                console.error(error);
            });
    }
    localStorage.setItem(cacheKey, JSON.stringify(repo));
    localStorage.setItem(cacheKey + '_time', new Date().getTime());
}

window.addEventListener('unload', function() {
    localStorage.removeItem('repos');
    localStorage.removeItem('repos_time');
    localStorage.removeItem('images');
    localStorage.removeItem('images_time');
    localStorage.removeItem('watchers');
    localStorage.removeItem('watchers_time');
});
async function populateCards() {
    
    await fetchRepos();
    await fetchImages();
    await fetchWatchers();
    // sort the items in repo list by starred, then watch list then forks
    const newrepo = repo.sort((a, b) => {
        if (a.watchers > b.watchers) return -1;
        if (a.watchers < b.watchers) return 1;
        if (a.stars > b.stars) return -1;
        if (a.stars < b.stars) return 1;
        if (a.forks > b.forks) return -1;
        if (a.forks < b.forks) return 1;
        return 0;
    });

    const projectList = document.getElementById('project_list');
    newrepo.forEach(data => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="https://github.com/${owner}/${data.name}" target="_blank" rel="noopener noreferrer" class="nav_link">
            <h3 class="projects_title">${data.language != null ? data.language : "Other"}</h3>
            <h4 class="projects_subtitle">${data.name}</h4>
            <p class="projects_description">${data.description}</p>
            <img src="${data.image != null ? data.image : './images/default.jpg'}" alt="${data.name}" />
            ${
            data.homepage != "" ? 
                (
                    data.homepage.includes("marketplace") ? 
                        `<a href="${data.homepage}" target="_blank" rel="noopener noreferrer" class="description_link">View on Visual Studio Marketplace</a>` 
                            :
                                `<a href="${data.homepage}" target="_blank" rel="noopener noreferrer" class="description_link">View Project</a>`
                ) 
                    :
                        ""
            }
            <div class="info">
                <div>
                <svg viewBox="0 0 16 16" version="1.1" width="20" height="20" aria-hidden="true">
                    <path fillrule="evenodd" fill="#586069" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                </svg>
                <span id="${data.name}_stars">${data.stargazers_count || 0}</span>
                </div>
                <div>
                <svg viewBox="0 0 16 16" version="1.1" width="20" height="20" aria-hidden="true">
                <path fillrule="evenodd" fill="#586069" d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"></path>
                </svg>
                <span id="${data.name}_watchers">${data.watchers || 0}</span>
                </div>
                <div>
                <svg viewBox="0 0 16 16" version="1.1" width="20" height="20" aria-hidden="true">
                    <path fillrule="evenodd" fill="#586069" d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                </svg>
                <span id="${data.name}_forks">${data.forks || 0}</span>
                </div>
            </div>
            </a>
        `;
        projectList.appendChild(listItem);
    });
}

populateCards();
