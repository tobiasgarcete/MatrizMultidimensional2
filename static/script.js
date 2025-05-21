function generarMatrices() {
    let filas = document.getElementById('filas').value;
    let columnas = document.getElementById('columnas').value;
    let contenedor = document.getElementById('matrices');
    contenedor.innerHTML = '';
    
    for (let k = 1; k <= 2; k++) {
        let titulo = document.createElement('h3');
        titulo.textContent = `Matriz ${k}`;
        contenedor.appendChild(titulo);
        
        let tabla = document.createElement('table');
        for (let i = 0; i < filas; i++) {
            let fila = document.createElement('tr');
            for (let j = 0; j < columnas; j++) {
                let celda = document.createElement('td');
                let input = document.createElement('input');
                input.type = 'number';
                input.setAttribute('data-matriz', k);
                input.setAttribute('data-fila', i);
                input.setAttribute('data-columna', j);
                celda.appendChild(input);
                fila.appendChild(celda);
            }
            tabla.appendChild(fila);
        }
        contenedor.appendChild(tabla);
    }
}

function sumarMatrices() {
    let filas = document.getElementById('filas').value;
    let columnas = document.getElementById('columnas').value;
    let matriz1 = Array.from({ length: filas }, () => Array(columnas).fill(0));
    let matriz2 = Array.from({ length: filas }, () => Array(columnas).fill(0));
    
    document.querySelectorAll('input[data-matriz="1"]').forEach(input => {
        let i = input.getAttribute('data-fila');
        let j = input.getAttribute('data-columna');
        matriz1[i][j] = parseInt(input.value) || 0;
    });
    
    document.querySelectorAll('input[data-matriz="2"]').forEach(input => {
        let i = input.getAttribute('data-fila');
        let j = input.getAttribute('data-columna');
        matriz2[i][j] = parseInt(input.value) || 0;
    });
    
    fetch('/sumar_matrices', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('resultado').innerText = 'Error: ' + data.error;
        } else {
            let res = data.resultado.map(row => row.join(' ')).join('\n');
            document.getElementById('resultado').innerText = 'Resultado:\n' + res;
        }
    });
}
