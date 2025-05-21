from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def multiply_matrices(matrix1, matrix2):
    """Multiplica dos matrices usando iteraciones"""
    if len(matrix1[0]) != len(matrix2):
        return None  # No se pueden multiplicar

    result = [[0] * len(matrix2[0]) for _ in range(len(matrix1))]
    for i in range(len(matrix1)):
        for j in range(len(matrix2[0])):
            for k in range(len(matrix2)):
                result[i][j] += matrix1[i][k] * matrix2[k][j]
    
    return result

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/multiply', methods=['POST'])
def multiply():
    data = request.json
    matrix1 = data.get("matrix1")
    matrix2 = data.get("matrix2")

    if not matrix1 or not matrix2:
        return jsonify({"error": "Faltan datos"}), 400

    result = multiply_matrices(matrix1, matrix2)
    if result is None:
        return jsonify({"error": "Dimensiones inválidas"}), 400
    
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
