function Review(game, rating, review, id = null) {
    this.game = new Game(game.title, game.genre, game.ageRatimg, game.releaseYear);
    this.rating = rating;
    this.review = review;
    this.id = id;
}

function renderReviewsTable(reviews, containerElement) {
    const tableManager = new TableManager();
    const table = tableManager.createTable(CommentsHeaders, reviews);
    containerElement.replaceChildren(table);
}

const reviewHeaders = ['id', 'game', 'rating', 'review'];