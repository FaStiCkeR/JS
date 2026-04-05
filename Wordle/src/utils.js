const words = ['домик', 'рыбка', 'дымок']

function wordGenerator() {
    return words[Math.floor((Math.random() * words.length))].toUpperCase();
}

export {wordGenerator};