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

            document.getElementById(`${repo[i]}_stars`).innerHTML = stars == undefined ? 0 : stars;
            document.getElementById(`${repo[i]}_forks`).innerHTML = forks == undefined ? 0 : forks;
            document.getElementById(`${repo[i]}_watchers`).innerHTML = watchers == undefined ? 0 : watchers;

        }).catch(error => console.error(error));
}
