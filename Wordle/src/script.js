import {renderBoard, renderKeyboard} from './ui.js'
import {wordGenerator} from './utils.js'

const wordForGuess = wordGenerator();
console.log(wordForGuess);

renderBoard();
renderKeyboard();