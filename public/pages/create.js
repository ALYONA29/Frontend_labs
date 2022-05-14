const create = `
<link rel="stylesheet" href="/styles/create-cocktail.css">
<link rel="stylesheet" href="/styles/ingredients.css">
<form class="create-cocktail-form" onsubmit="addForm(); return false;">
        <div class="cocktail-main-div">
          <div class="cocktail-round-image">
            <div class="cocktail-left-div">
                <div class="cocktail-image">
                    <img src="/images/empty.png" alt="empty">
                </div>
            </div>
          </div>
          <div class="cocktail-right-div">
            <div class="cocktail-value-div">
                <input type="text" id="beauty-input" name="cocktail-name" value="" placeholder="ENTER A NAME HERE..." required>
                <div class="cocktail-value-str">
                  <label for="cocktail-value">STANDARD VALUE:</label>
                  <input type="number" id="beauty-input-number" name="cocktail-value" value="" placeholder="ml" min="100" max="500" oninput="changeImage();" required>
                </div>
            </div>
            <div class="ingredients-menu">
              <ol class="ingredients-list">
                    <li class="ingredient-desc">
                        <div class="ingredient-value">
                            <select class="ingredients-select" name="ingredients-select" onchange="changeImage();">
                            <option value="ice-cream">ice-cream</option>
                            <option value="milk">milk</option>
                            <option value="strawberry">strawberry</option>
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
                        </div>
                    </li>
              </ol>
              <button id="add-ingredient" type="button" name="add-ingredient" onclick="addIngredient();"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
        <div class="create-final">
          <textarea id="description" name="name" rows="3" placeholder="DESCRIPTION"></textarea>
          <button id="create-button" type="submit" name="create-button">CREATE</button>
        </div>
      </form>
</section>
`