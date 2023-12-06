document.addEventListener("DOMContentLoaded", function () {
    var playContainer = document.getElementById("play-container");

    var totalNumbers = 50; // num total de celdas en el juego
    var visibleNumbers = 25; // num inicial de celdas visibles
    var currentVisibleNumber = 1; // num actualmente visible por el jugador

    // genera array de numeros dentro del rango dado
    function generateNumbers(start, end) {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }

    // suffle los numeros
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function handleNumberClick(numero) {
        var clickedCell = document.querySelector('.grid-cell[data-number="' + numero + '"]');
        
        // verifica si el numero clicado es el proximo numero esperado
        if (numero === currentVisibleNumber) {
            // Marca la celda como transparente en lugar de ocultarla
            clickedCell.classList.add("transparent-cell");
            currentVisibleNumber++;

            // cuando aun haya numeros por mostrar
            if (currentVisibleNumber <= totalNumbers) {
                // calcula el siguiente numero
                var nextNumber = currentVisibleNumber + visibleNumbers - 1;

                // si el siguiente numero esta dentro del rango total
                if (nextNumber <= totalNumbers) {
                    // crea una nueva celda con el siguiente numero
                    var nextCell = createGridCell(nextNumber);
                    // reemplaza la celda clicada con la nueva celda
                    playContainer.replaceChild(nextCell, clickedCell);
                }
            }

            // si se han clicado todos los números, muestra el mensajere
            if (currentVisibleNumber > totalNumbers) {
                alert("¡Has ganado!");
                resetGame(); // llama a la función para resetear el juego
            }
        }
    }

    // funcion para reiniciar el juego
    function resetGame() {
        // elimina todas las celdas actuales
        playContainer.innerHTML = "";

        // reinicia las variables
        currentVisibleNumber = 1;
        var numeros = generateNumbers(1, visibleNumbers);
        numeros = shuffleArray(numeros);

        // crea las nuevas celdas
        numeros.forEach(function (numero) {
            var gridCell = createGridCell(numero);
            playContainer.appendChild(gridCell);
        });
    }

    // función que crea una celda con un número dado
    function createGridCell(numero) {
        var gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.setAttribute("data-number", numero);
        gridCell.textContent = numero;

        // agrega un evento de clic a la celda para manejar el juego
        gridCell.addEventListener("click", function () {
            handleNumberClick(numero);
        });

        return gridCell;
    }

    // genera un array de números consecutivos y lo mezcla
    var numeros = generateNumbers(1, visibleNumbers);
    numeros = shuffleArray(numeros);

    // crea una celda para cada número y las agrega al contenedor de juego
    numeros.forEach(function (numero) {
        var gridCell = createGridCell(numero);
        playContainer.appendChild(gridCell);
    });
});
