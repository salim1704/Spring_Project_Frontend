(function() {
    const formInputs = document.querySelectorAll(".container input");
    const id = document.querySelector("#id");
    const dataForm = document.querySelector("#data-form");
    const dataTable = document.querySelector("#data-table");

    function createGameFromFormObj(dataObject) {
        const game = new Game(dataObject.title, dataObject.genre, dataObject.ageRating, dataObject.releaseYear);
        return game;
    }

    function updateGame() {
        const formData = new FormData(dataForm);
        const formDataObject = Object.fromEntries(formData.entries());

        setStatus("PREPARING UPDATE REQUEST");

        fetch(`http://localhost:8080/game/${id.value}`, {
                method: "PUT", 
                body: JSON.stringify(createGameFromFormObj(formDataObject)),
                headers: {
                    "Content-type": "application/json", 
                },
            })
            .then((response) => {
                setStatus("RECEIVED RESPONSE");
                if (response.ok) return response.json();
                else throw new Error("Uh oh, something went wrong...");
            })
            .then((game) => {
                setStatus("RENDERING TABLE");
                renderGameTable([game], dataTable);
                setStatus("RESPONSE RENDERED INTO TABLE");
            })
            .catch((error) => {
                setStatus("ERROR ENCOUNTERED");
                handleError(error);
            });
    }

    function readById() {
        setStatus("PREPARING GET REQUEST");

        return fetch(`http://localhost:8080/game/${id.value}`, {
                method: "GET",
            })
            .then((response) => {
                setStatus("RECEIVED RESPONSE");
                if (response.ok) return response.json();
                else throw new Error("Uh oh, something went wrong...");
            })
            .then((game) => {
                return game;
            })
            .catch((error) => {
                setStatus("ERROR ENCOUNTERED");
                handleError(error);
            });
    }

    id.addEventListener("change", function(event) {
        readById(id.value).then((game) => {

            formInputs[1].value = game.title;
            formInputs[2].value = game.genre;
            formInputs[3].value = game.ageRating;
            formInputs[4].value = game.releaseYear;
        });
    });

    function handleFormSubmission(event) {
        event.preventDefault();
        updateGame();
    }

    dataForm.addEventListener("submit", handleFormSubmission);
})();