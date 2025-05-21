def sum_matrices(matriz1, matriz2):
    if len(matriz1) != len(matriz2) or len(matriz1[0]) != len(matriz2[0]):
        raise ValueError("Las matrices deben tener las mismas dimensiones")
    
    resultado = [[matriz1[i][j] + matriz2[i][j] for j in range(len(matriz1[0]))] for i in range(len(matriz1))]
    return resultado