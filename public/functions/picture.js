function createIngredientImageDiv(cocktail) {
    let cocktailImageDiv = document.createElement("div");
    cocktailImageDiv.classList.add('image-box');

    let cocktailImage = document.createElement("img");
    cocktailImage.setAttribute('src', "/images/empty.png");
    cocktailImage.setAttribute('alt', "empty");

    cocktailImageDiv.appendChild(cocktailImage);


    let glassValue = 500;
    let percentValues = 0;
    let reductionFactor = 0;

    for (let ingredient of cocktail.ingredients) {
        percentValues += ingredient.value;
    }

    if (cocktail.value > glassValue) {
        reductionFactor = 1;
    }
    else {
        reductionFactor = cocktail.value / glassValue;
    }

    if (cocktail.value < glassValue) {
        percentValues = (percentValues * reductionFactor) | 0;
    }

    for (let ingredient of cocktail.ingredients) {
        let ingredientDiv = document.createElement("div");
        ingredientDiv.classList.add('cocktail-ingredient_n');
        ingredientDiv.classList.add(ingredient.name);
        ingredientDiv.setAttribute('style', getIngredientStyleString(100 - percentValues | 0));
        percentValues -= ingredient.value * reductionFactor;
        cocktailImageDiv.appendChild(ingredientDiv);
    }

    return cocktailImageDiv;
}

function getIngredientStyleString(value) {
    return `clip-path: polygon(0 ${value}%, 100% ${value}%, 100% 100%, 0% 100%);
    -webkit-clip-path: polygon(0 ${value}%, 100% ${value}%, 100% 100%, 0% 100%);`;
}