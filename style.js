// # FASE DI PREPARAZIONE

// Raccogliamo gli elementi di interesse della pagina
const main = document.querySelector('main');
const textArea = document.querySelector('textarea');
const generateButton = document.querySelector('#generate');
const resultContainer = document.querySelector('#result-container');
const newCardButton = document.querySelector('#new-cards');

// Preparare i dati iniziali
let topic = '';
let cards = [];
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=METTI QUI LA TUA API KEY';

// # FASE DI INTERAZIONE
// Al click del pulsante "Genera"