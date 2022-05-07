const details = `
<link rel="stylesheet" href="/styles/cocktail-info.css">
<link rel="stylesheet" href="/styles/ingredients.css">
<article class="cocktail-info">
   
        <div class="cocktail-img">
            <p class="cocktail-name"></p>
            <div class="star-rating">
                <input class="star-rating-input" id="star-rating-5" type="radio" name="rating" value="5" onclick="setStar(this);">
                <label class="star-rating-icon fa fa-star" for="star-rating-5"></label>
                <input class="star-rating-input" id="star-rating-4" type="radio" name="rating" value="4" onclick="setStar(this);">
                <label class="star-rating-icon fa fa-star" for="star-rating-4"></label>
                <input class="star-rating-input" id="star-rating-3" type="radio" name="rating" value="3" onclick="setStar(this);">
                <label class="star-rating-icon fa fa-star" for="star-rating-3"></label>
                <input class="star-rating-input" id="star-rating-2" type="radio" name="rating" value="2" onclick="setStar(this);">
                <label class="star-rating-icon fa fa-star" for="star-rating-2"></label>
                <input class="star-rating-input" id="star-rating-1" type="radio" name="rating" value="1" onclick="setStar(this);">
                <label class="star-rating-icon fa fa-star" for="star-rating-1"></label>
            </div>
        </div>
        <div class="all_info">
            <div class="main-div">
                
                <div class="cocktail-desc">
                    <p>STANDARD VALUE: <span class="cocktail-value"></span> ml.</p>
                    <p>AVERAGE MARK: <span class="average-mark"></span></p>
                    <p>ADDED BY: <span class="cocktail-author"></span></p>
                </div>
                <div class="cocktail-ingr">
                    <ul class="ingredients">
                        
                    </ul>
                </div>  
            </div>
            <p class="cocktail-description">
            </p>
        </div>
</article>
<section class="comments-section">
    <form class="comment-send" onsubmit="addComment(); return false;" method="post">
        <textarea name="comment" id="comment-area" rows="3" placeholder="LEAVE YOUR COMMENT HERE..."></textarea>
        <input class="button-style" type="submit" name="send" value="SEND">
    </form>
    <ul class="comments">
    </ul>
  </section>
`