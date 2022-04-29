(function() {
    const dataForm = document.querySelector('#data-form');
    const id = document.querySelector('#id');

    function findById() {
        setStatus('Finding game to delete...')
        fetch(`http://localhost:8080/game/${id.value}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) return response.json();
            else throw new Error('Uh oh, something went wrong...');
        })
          .then(game => {
            confirm = window.confirm("Are you sure you want to delete " + game.title + "?")
            if (confirm) {
                remove();
            }
        })
          .catch(error => {
            setStatus('ERROR ENCOUNTERED');
            handleError(error);
        });
    }

    function remove() {
        fetch(`http://localhost:8080/game/${id.value}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) return response.json();
            else throw new Error('Uh oh, something went wrong...');
        }).then(json => {
            setStatus('game DELETED');
            console.log(json);
        }).catch(error => {
            setStatus('FAILED TO DELETE game');
            handleError(error);
        });
    }

    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        findById();
    });

})();