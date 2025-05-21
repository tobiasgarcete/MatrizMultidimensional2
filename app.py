from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from matriz_operacion import sum_matrices

app = Flask(__name__)
CORS(app)  # Permitir solicitudes desde otros dispositivos

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sumar_matrices', methods=['POST'])
def sumar_matrices():
    data = request.get_json()
    matriz1 = data.get('matriz1')
    matriz2 = data.get('matriz2')
    
    if not matriz1 or not matriz2:
        return jsonify({'error': 'Datos inválidos'}), 400
    
    try:
        resultado = sum_matrices(matriz1, matriz2)
        return jsonify({'resultado': resultado})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
