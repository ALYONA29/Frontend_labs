async function getCatalog() {
    let flag = await auth.isAuth();
    if (!flag) {
        let createLink = document.getElementById('create-link');
        createLink.style.display = 'none';
    }
    else {
        let createLink = document.getElementById('create-link');
        createLink.style.display = 'block';
    }
    let catalog = await db.getAllCocktails();

    let catalogArray = [];
    for (let cocktailId in catalog) {
        catalogArray.push({ id: cocktailId, value: catalog[cocktailId] });
    }
    catalog = catalogArray.reverse();

    let catalogDiv = document.getElementById('catalog-grid');
    for (let cocktail of catalog) {
        let cocktailNode = getItemCatalog(cocktail);
        catalogDiv.append(cocktailNode);
    }

}

function getItemCatalog(cocktail) {
    let cocktailNode = document.createElement("a");
    cocktailNode.setAttribute('href', '#');
    cocktailNode.classList.add('rating');
    cocktailNode.setAttribute('onclick', `onNavigate('/details?id=${cocktail.id}'); return false;`);

    let cocktailItemDiv = document.createElement("div");
    cocktailItemDiv.classList.add('box');

    let cocktailImageBox = createIngredientImageDiv(cocktail.value);
    cocktailItemDiv.appendChild(cocktailImageBox);

    let cocktailDetails = document.createElement("div");
    cocktailDetails.classList.add('details');
    cocktailItemDiv.appendChild(cocktailDetails);

    let cocktailTitle = document.createElement("p");
    cocktailTitle.classList.add('cocktail-title');
    cocktailTitle.textContent = cocktail.value.name.toUpperCase();
    cocktailDetails.appendChild(cocktailTitle);


    let ratingDiv = document.createElement("div");
    ratingDiv.classList.add('grid-item-rating');

    let mark = cocktail.value.mark;

    for (let i = 0; i < 5; i++) {
        let starSpan = document.createElement("span");
        starSpan.classList.add("fa");
        starSpan.classList.add("fa-star");
        if (mark >= i + 0.5) {
            starSpan.classList.add("checked");
        }
        ratingDiv.appendChild(starSpan);
    }
    cocktailDetails.appendChild(ratingDiv);
    cocktailNode.appendChild(cocktailItemDiv);
    return cocktailNode;
}

getCatalog();