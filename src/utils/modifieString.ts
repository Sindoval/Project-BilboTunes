export function modificarString(str: string): string {
    return str
        .split('')            // Converte a string em um array de caracteres
        .filter(char => char !== ' ') // Remove os espaços
        .map(char => char.toLowerCase()) // Converte todas as letras para minúsculas
        .join('');             // Junta os caracteres em uma nova string
}