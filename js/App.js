const owner = 'Iheuzio';
const repo = ['TickerPricePrediction','gpt-contextfiles'];
const count = repo.length;
const repoData = [];

for(let i=0; i<count; i++){
    fetch(`https://api.github.com/repos/${owner}/${repo[i]}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const stars = data.stargazers_count;
            const forks = data.forks_count;
            const watchers = data.subscribers_count;

            // Store the variables in an object
            const dataObj = {
                repoName: repo[i],
                stars: stars,
                forks: forks,
                watchers: watchers
            };

            // Push the object to the repoData array
            repoData.push(dataObj);

            // Store the variables in localStorage
            localStorage.setItem(`${repo[i]}_stars`, stars);
            localStorage.setItem(`${repo[i]}_forks`, forks);
            localStorage.setItem(`${repo[i]}_watchers`, watchers);
        })        .catch(error => console.error(error));
}
