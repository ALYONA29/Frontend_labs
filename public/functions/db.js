const config = {
    apiKey: "AIzaSyC04qyzOnqvtSDTFtcZkVMCGWvKzKE6Uq0",
    authDomain: "mycocktails-ac311.firebaseapp.com",
    databaseURL: "https://mycocktails-ac311-default-rtdb.firebaseio.com"
};

class MyDb {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.database = firebase.database();
    }

    async getAllCocktails() {
        return (await this.database.ref('cocktails/').once('value')).val();
    }

    addCocktail(cocktail) {
        this.database.ref('cocktails/').push({
            name: cocktail.name,
            login: cocktail.login,
            value: cocktail.value,
            desc: cocktail.desc,
            ingredients: cocktail.ingredients,
            Date: cocktail.Date.toISOString().slice(0, 10) + ' ' + cocktail.Date.toTimeString().slice(0, 8)
        })
    }

    async getCocktail(id) {
        return (await this.database.ref('cocktails/' + id).once('value')).val();
    }

    setStar(cocktailId, userId, mark) {
        this.database.ref(`cocktails/${cocktailId}/stars/${userId}`).set(+mark);
    }

    setMark(cocktailId, userId, mark) {
        this.database.ref(`cocktails/${cocktailId}/mark/`).set(+mark);
    }

    async getMark(cocktailId) {
        return (await this.database.ref(`cocktails/${cocktailId}/mark/`).once('value')).val();
    }

    async getStarByUser(cocktailId, userId) {
        return (await this.database.ref(`cocktails/${cocktailId}/stars/${userId}`).once('value')).val();
    }

    addComment(cocktailId, comment) {
        this.database.ref(`cocktails/${cocktailId}/comments/`).push({
            login: comment.login,
            comment: comment.comment,
            date: comment.date.toISOString().slice(0, 10) + ' ' + comment.date.toTimeString().slice(0, 8)
        })
    }
}

let db = new MyDb();
