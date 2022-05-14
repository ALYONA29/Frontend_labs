let titleInput = document.getElementById('beauty-input');

titleInput.oninput = function () {
  if (this.value.length > 20) {
      this.value = this.value.slice(0,20); 
  }
}

async function addForm() {
    let name = document.getElementById('beauty-input').value;
    let value = document.getElementById('beauty-input-number').value;
    let desc = document.getElementById('description').value;
    let user = auth.user.email;

    let isValid = await checkValue(name.trim().toLowerCase(), value, desc);
    if (!isValid) {
        return;
    }

    let ingredientsChoice = document.getElementsByClassName('ingredients-select');
    let ingredientsValue = document.getElementsByClassName('input_value');

    let sum = 0;
    for (let value of ingredientsValue) {
        sum += +value.value;
    }

    if (sum < 90) {
        alert('The glass must be at least 90 percent full');
        return;
    }
    else if (sum > 100) {
        alert('The glass is more than 100 percent full');
        return;
    }

    let ingrLst = new Map();
    for (let i = ingredientsChoice.length - 1; i >= 0; i--) {
        let name = ingredientsChoice[i].options[ingredientsChoice[i].selectedIndex].value;
        let value =+ ingredientsValue[i].value;
        if (ingrLst.has(name)) {
            let newValue = ingrLst.get(name) + value;
            ingrLst.delete(name);
            ingrLst.set(name, newValue);
        }
        else {
            ingrLst.set(name, value);
        }
    }

    let ingredientsList = [];

    for (let pair of ingrLst.entries()) {
        ingredientsList.push(new Ingredient(pair[0], pair[1]));
    }


    let cocktail = new Cocktail(name.trim().toLowerCase(), user, value, desc, ingredientsList);
    db.addCocktail(cocktail);
    onNavigate('/');
}


function addIngredient() {
    let ingredientListItem =
        ` <div class="ingredient-value">
            <select class="ingredients-select" name="ingredients-select" onchange="changeImage();">
                <option value="strawberry">strawberry</option>
                <option value="ice-cream">ice-cream</option>
                <option value="milk">milk</option>
                <option value="banana">banana</option>
                <option value="chocolate">chocolate</option>
                <option value="honey">honey</option>
                <option value="mint">mint</option>
                <option value="caramel">caramel</option>
                <option value="pineapple">pineapple</option>
                <option value="cherry">cherry</option>
                <option value="raspberry">raspberry</option>
                <option value="currant">currant</option>
            </select>
            <input class="input_value" type="number" name="ingredient-value" value="" placeholder="VALUE" min="1" max="100" oninput="changeImage();" required>
            <button class="remove-ingredient" type="button" name="remove-ingredient" onclick="deleteIngredient();"><i class="fas fa-minus"></i></button>
        </div>
        
    `

    const max = 5;
    let ingredients = document.getElementsByClassName('ingredient-desc');

    if (ingredients.length == max - 1) {
      let addButton = document.getElementById('add-ingredient');
      addButton.style.display = 'none';
    }

    if (ingredients.length < max) {

      let ingredientsList = document.querySelector('.ingredients-list');
      let ingredientItem = document.createElement('li');
      ingredientItem.classList.add('ingredient-desc');
      ingredientItem.innerHTML = ingredientListItem;
      ingredientsList.appendChild(ingredientItem);
    }
}

function deleteIngredient() {
    let igredients = document.getElementsByClassName('ingredient-desc');

    const max = 5;
    if (igredients.length == max) {
      let addButton = document.getElementById('add-ingredient');
      addButton.style.display = 'block';
    }
    let ingredient = event.srcElement.closest(".ingredient-desc");
    ingredient.parentNode.removeChild(ingredient);
    changeImage();
}

async function checkValue(name, value, description) {

    if (name == "") {
        alert('Name is empty!');
        return false;
    }

    if (value == "") {
        alert('Value is empty!');
        return false;
    }

    if (description == "") {
        alert('Description is empty!');
        return false;
    }

    let cocktails = await db.getAllCocktails();
    for (let id in cocktails) {
        if (cocktails[id].name == name) {
            alert('Name already exists! Change name of your Cocktail');
            return false;
        }
    }

    return true;
}

function changeImage() {
    let ingredientDivs = document.getElementsByClassName('cocktail-ingredient');
    while (ingredientDivs.length != 0) {
      ingredientDivs[0].parentNode.removeChild(ingredientDivs[0]);
    }
  
    let cocktailValue = document.getElementById('beauty-input-number').value;
  
    let ingredientsChoice = document.getElementsByClassName('ingredients-select');
    let ingredientsValues = document.getElementsByClassName('input_value');
  
    let ingredientsCount = ingredientsChoice.length;
    let sum = 0;
    for (let value of ingredientsValues) {
      sum += +value.value;
    }
  
    const max = 100;
    if (sum > max) {
      return;
    }
  
    const regularValue = 500;
  
    if (cocktailValue == "") {
      cocktailValue = regularValue;
    }
  
    let reductionFactor = cocktailValue / regularValue;
    if (reductionFactor > 1) {
      reductionFactor = 1;
    }
    if (cocktailValue < regularValue) {
      sum = (sum * reductionFactor) | 0;
    }
  
    if (sum <= 100 && sum >= 0) {
      let cocktailImageDiv = document.querySelector('.cocktail-image');
      for (let i = ingredientsCount - 1; i >= 0; i--) {
        let value = ingredientsValues[i].value;
        if (value != "") {
          let ingredientDiv = document.createElement("div");
          ingredientDiv.classList.add('cocktail-ingredient');
          ingredientDiv.classList.add(ingredientsChoice[i].options[ingredientsChoice[i].selectedIndex].value);
          ingredientDiv.setAttribute('style', getIngredientStyleString(100 - sum | 0));
          sum -= value * reductionFactor;
          cocktailImageDiv.appendChild(ingredientDiv);
        }
      }
    }
  }