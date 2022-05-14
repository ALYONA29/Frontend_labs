async function createDetailsPage() {
    let CocktailId = getURLParam('id');
    let Cocktail = await db.getCocktail(CocktailId);
    if (Cocktail == null) {
        onNavigate('/404');
        return;
    }
    else {

        document.querySelector('.cocktail-name').textContent = Cocktail.name.toUpperCase();
        document.querySelector('.cocktail-value').textContent = Cocktail.value;
        document.querySelector('.cocktail-author').textContent = Cocktail.login;
        document.querySelector('.cocktail-description').textContent = Cocktail.desc;
        setImageDiv(Cocktail);
        setIngredients(Cocktail);
        showComments(Cocktail);
        getStars(Cocktail);
    }
}

function setImageDiv(Cocktail) {
    let pictureInfoDiv = document.querySelector('.cocktail-img');
    pictureInfoDiv.prepend(createIngredientImageInfoDiv(Cocktail));
}
function createIngredientImageInfoDiv(cocktail) {
    let cocktailImageDiv = document.createElement("div");
    cocktailImageDiv.classList.add('cocktail-image');

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
        ingredientDiv.classList.add('cocktail-ingredient');
        ingredientDiv.classList.add(ingredient.name);
        ingredientDiv.setAttribute('style', getIngredientStyleString(100 - percentValues | 0));
        percentValues -= ingredient.value * reductionFactor;
        cocktailImageDiv.appendChild(ingredientDiv);
    }

    return cocktailImageDiv;
}

function setIngredients(Cocktail) {
    let ingredientsList = document.querySelector('.ingredients');
    for (let ingredient of Cocktail.ingredients) {
        let ingredientItem = document.createElement("li");
        ingredientItem.classList.add('ingredient');

        let ingredientValue = document.createElement("span");
        ingredientValue.classList.add('ingedient-value');
        ingredientValue.textContent = `${ingredient.value}% `;

        let ingredientName = document.createElement("span");
        ingredientName.classList.add('ingedient-name');
        ingredientName.textContent = ingredient.name.toUpperCase();

        ingredientItem.appendChild(ingredientValue);
        ingredientItem.appendChild(ingredientName);
        ingredientsList.prepend(ingredientItem);
    }
}

async function setStar(button) {
    let flag = await auth.isAuth();
    if (!flag) {
        alert('Sign up to rate cocktails!');
        return;
    }

    let star_mark = button.value;
    let CocktailId = getURLParam('id');
    db.setStar(CocktailId, auth.user.uid, star_mark);

    let Cocktail = await db.getCocktail(CocktailId);

    let mark = 0;
    let stars = Object.values(Cocktail.stars);
    if (stars.length != 0) {
        mark = stars.reduce((a, b) => (a + b)) / stars.length;
    }

    db.setMark(CocktailId, auth.user.uid, mark.toFixed(2));

    document.querySelector('.average-mark').textContent = mark.toFixed(2);
}

async function addComment() {
    let flag = await auth.isAuth();
    if (!flag) {
        alert('Sign up to rate your drinks!');
        return;
    }
    let comment_area = document.getElementById('comment-area');
    let text = comment_area.value;

    if (text.trim() != "") {
        comment_area.value = "";
        let comment = new Comment(auth.user.email, text);
        let CocktailId = getURLParam('id');
        db.addComment(CocktailId, comment);
        let Cocktail = await db.getCocktail(CocktailId);
        showComments(Cocktail);
    }

}


function showComments(Cocktail) {
    if (Cocktail.comments) {
        let comments = Object.values(Cocktail.comments);
        if (comments.length != 0) {
            let commentsList = document.querySelector('.comments');
            commentsList.innerHTML = "";
            for (let comment of comments) {
                let commentItem = document.createElement("li");
                commentItem.classList.add('comment-beauty');

                let commentDiv = document.createElement("div");
                commentDiv.classList.add('comment');

                let AuthDateInfo = document.createElement("div");
                AuthDateInfo.classList.add('comment-left');

                let commentAuthor = document.createElement("p");
                commentAuthor.classList.add('comment-author');
                commentAuthor.textContent = comment.login;
                AuthDateInfo.appendChild(commentAuthor);

                let time = document.createElement("time");
                time.setAttribute('datetime', comment.date);
                time.textContent = comment.date;
                AuthDateInfo.appendChild(time);

                let commentText = document.createElement("p");
                commentText.classList.add('comment-text');
                commentText.textContent = comment.comment;

                commentDiv.appendChild(AuthDateInfo);
                commentDiv.appendChild(commentText);

                commentItem.appendChild(commentDiv);
                commentsList.prepend(commentItem);
            }
        }
    }
}

async function getStars(Cocktail) {
    if (Cocktail.stars) {

        document.querySelector('.average-mark').textContent = Cocktail.mark;

        if (await auth.isAuth()) {
            let mark_by_user = await db.getStarByUser(getURLParam('id'), auth.user.uid);

            if (mark_by_user) {
                let input = document.getElementsByClassName('star-rating-input');
                input[5 - mark_by_user].checked = true;
            }
        }
    }
}

createDetailsPage()