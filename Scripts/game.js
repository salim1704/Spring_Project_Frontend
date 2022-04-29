function Game(title, genre, ageRating, releaseYear, id = null) {
    this.title = title;
    this.genre = genre;
    this.ageRating = ageRating
    this.releaseYear = releaseYear;
    this.id = id;
    this.toString = function() {
        let output = `${title}\n${genre}\n${ageRating}\n${releaseYear}`
        return output;
    }
}

const gameHeaders = ['id', 'title', 'genre','ageRating', 'releaseYear'];

function renderMovieTable(games, containerElement) {
    const tableManager = new TableManager();
    const table = tableManager.createTable(gameHeaders, games);
    containerElement.replaceChildren(table);
}