function crearInputs() {
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let matricesDiv = document.getElementById("matrices");
    matricesDiv.innerHTML = "";

    ["Matriz 1", "Matriz 2"].forEach((nombre, index) => {
        let matrizHTML = `<h3>${nombre}</h3>`;
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                matrizHTML += `<input type="number" id="${nombre}-${i}-${j}" size="3"> `;
            }
            matrizHTML += "<br>";
        }
        matricesDiv.innerHTML += matrizHTML;
    });
}

function obtenerMatriz(nombre, filas, columnas) {
    let matriz = [];
    for (let i = 0; i < filas; i++) {
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            let valor = document.getElementById(`${nombre}-${i}-${j}`).value;
            fila.push(parseFloat(valor) || 0);
        }
        matriz.push(fila);
    }
    return matriz;
}

function enviarMatrices() {
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let matrix1 = obtenerMatriz("Matriz 1", filas, columnas);
    let matrix2 = obtenerMatriz("Matriz 2", filas, columnas);

    fetch("/api/multiply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix1, matrix2 })
    })
    .then(response => response.json())
    .then(data => {
        let resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = data.error ? `<p style="color:red;">${data.error}</p>` 
                                            : data.result.map(row => row.join(" ")).join("<br>");
    });
}
