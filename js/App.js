const owner = 'Iheuzio';
const repo = 'TickerPricePrediction';

fetch(`https://api.github.com/repos/${owner}/${repo}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const stars = data.stargazers_count;
        const forks = data.forks_count;
        const watchers = data.subscribers_count;

        // Store the variables in localStorage
        localStorage.setItem('stars', stars);
        localStorage.setItem('forks', forks);
        localStorage.setItem('watchers', watchers);
    })
    .catch(error => console.error(error));