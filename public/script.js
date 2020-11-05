const restaurants = [];

fetch('/api',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
});
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => restaurants.push(...jsonFromServer))
    .catch((err) => {
      console.log(err);
    });

function findMatches(wordToMatch, resturants){
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex) || place.address_line_1.match(regex) 
        || place.city.match(regex) || place.zip.match(regex);
    });
}

function displayMatches(){
    const matchArray = findMatch(this.value, restaurants);
    const html = matchArray.map(place => {
        return `
        <li>
            <span class="name">${place.name}</span>
            <span class="category">${place.category}</span>
            <span class="address_line_1">${place.address_line_1}</span>
            <span class="city">${place.city}</span>
            <span class="zip">${place.zip}</span>
        </li>
        `;
    }).join('');
}

const searchInput = document.querySelector('.search');

searchInput.addEventListener('change', displayMatches);