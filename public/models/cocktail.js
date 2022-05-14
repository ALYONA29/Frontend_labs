class Cocktail {
    constructor(name, login, value, desc, ingredients) {
        this.name = name;
        this.login = login;
        this.value = value;
        this.desc = desc;
        this.ingredients = ingredients;
        this.Date = new Date();
        this.comments = [];
        this.stars = [];
        this.mark = 0;
    }
}