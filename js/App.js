const owner = 'Iheuzio';
const repo = 'TickerPricePrediction';
const pinned = "d-flex flex-wrap list-style-none gutter-condensed mb-2 js-pinned-items-reorder-list"

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

    const url = 'https://github.com/iheuzio';

fetch(url)
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const pinnedItems = doc.querySelectorAll('div.pinned-item-list-item-content');
    console.log(pinnedItems);
  })
  .catch(error => {
    console.log(error);
  });