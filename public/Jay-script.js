const restaurants = [];

fetch('/api',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => restaurants.push(...jsonFromServer))
    .catch((err) => {
      console.log(err);
    });

function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex) || place.address_line_1.match(regex) 
        || place.city.match(regex) || place.zip.match(regex) || place.state.match(regex) 
    });
}

function displayMatches() {
    
    //$('#content').empty();
   // $('#content').append(`<ul class="results"></ul>`);
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
        return `
        <li>
            
            <span class="name">${place.name}</span></br>
            <span class="category">${place.category}</span></br>
            <span class="address_line_1">${place.address_line_1}</span></br>
            <span class="city">${place.city}, ${place.state}</span>
            <span class="zip">${place.zip}</span>
        </li>
        `;
    }).join('');
    //$('.results').append(html);
    suggestions.innerHTML = html;
    
   console.log(matchArray);
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
