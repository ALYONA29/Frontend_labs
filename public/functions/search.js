let searchInput = document.getElementById('search-input');

searchInput.oninput = function () {
  if (this.value.length > 20) {
      this.value = this.value.slice(0,20); 
  }
}

async function searchCocktail() {
    let searchTextPrepair = document.getElementById("search-input");
    let searchText = searchTextPrepair.value.trim().toLowerCase();
    if (searchText != "") {
        let catalog = await db.getAllCocktails();
        let catalogArray = [];
        for (let cocktailId in catalog) {
            catalogArray.push({ id: cocktailId, value: catalog[cocktailId] });
        }
        catalog = catalogArray.reverse();
        let newCatalog = [];
        for (let id in catalog) {
            let cocktailName = catalog[id].value.name.toLowerCase();

            if (cocktailName.includes(searchText) || searchText.includes(cocktailName)) {
                newCatalog.push(catalog[id]);
            }
        }
        if (newCatalog.length > 0) {
            newCatalog.sort(function (a, b) {
                var nameA = a.value.name.toLowerCase(), nameB = b.value.name.toLowerCase();
                if (nameA.indexOf(searchText) < nameB.indexOf(searchText)) {
                    return -1;
                }
                if (nameA.indexOf(searchText) > nameB.indexOf(searchText)) {
                    return 1;
                }
                if (nameA.indexOf(searchText) == nameB.indexOf(searchText)) {
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    else return 0;
                }

            });
            newCatalog = newCatalog.slice(0, 3);
            newCatalog = newCatalog.reverse();

            let searchResult = document.getElementById('search-result');
            searchResult.innerHTML = '';
            for (let cocktail of newCatalog) {
                let cocktailNode = getSearchItem(cocktail);
                searchResult.prepend(cocktailNode);
            }
        }
        else {
            let searchResult = document.getElementById('search-result');
            searchResult.innerHTML = '';
            let result = document.createElement("li");
            let cocktailres = document.createElement("p");
            cocktailres.classList.add('empty_res');
            cocktailres.textContent = 'Sorry, nothing found'
            result.appendChild(cocktailres);
            searchResult.prepend(result);
        }
    }
    else {
        let searchResult = document.getElementById('search-result');
        searchResult.innerHTML = '';
    }
}


function getSearchItem(cocktail) {
    let result = document.createElement("li");
    let cocktailNode = document.createElement("a");

    let cocktailImg = document.createElement('i');

    let cocktailName = document.createElement("p");
    cocktailName.textContent = cocktail.value.name.toUpperCase();
    cocktailNode.setAttribute('onclick',
        `let searchTextPrepair = document.getElementById("search-input");
         searchTextPrepair.value = "";
         let searchResult = document.getElementById('search-result');
         searchResult.innerHTML = '';
         //searchResult.style.display = 'none';
         onNavigate('/details?id=${cocktail.id}'); 
         return false;`);


    cocktailNode.appendChild(cocktailImg);
    cocktailNode.appendChild(cocktailName);
    result.appendChild(cocktailNode);
    return result;
}

