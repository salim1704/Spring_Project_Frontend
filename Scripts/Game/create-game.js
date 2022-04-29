(function() {
    const dataTable = document.querySelector('#data-table');
    const dataForm = document.querySelector('#data-form');

    function createGameFromFormObj(dataObject) {
        const game = new Game(dataObject.title, dataObject.genre, dataObject.ageRating, dataObject.releaseYear);
        return game;
    }

    function create() {

        const formData = new FormData(dataForm);
        const formDataObject = Object.fromEntries(formData.entries());

        setStatus('PREPARING POST REQUEST');

        fetch('http://localhost:8080/game', { 
            method: 'POST', 
            body: JSON.stringify(createGameFromFormObj(formDataObject), console.log(formDataObject)),
            headers: {
                'Content-type': 'application/json' 
            }
        }).then(response => {
            setStatus('RECEIVED RESPONSE');

            if (response.ok) return response.json();
            else throw new Error('something went wrong with the request');
        })
          .then(game => {
            setStatus('RENDERING TABLE');
            
            renderGameTable([game], dataTable);
            setStatus('RESPONSE RENDERED INTO TABLE');
        })
          .catch(error => {
            setStatus('ERROR ENCOUNTERED');
            handleError(error);
        });
    }

    function handleFormSubmission(event) {
        
        event.preventDefault(); 
        create();
    }

    dataForm.addEventListener('submit', handleFormSubmission);

})();