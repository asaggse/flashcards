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
generateButton.addEventListener('click', async function () {
    // Recupera il testo inserito dall'utente
    topic = textArea.value.trim();

    // Se il testo è vuoto, mostra un messaggio di errore
if (!topic) {
        alert('Per favore, inserisci un argomento valido.');
        return;
    }

    // Mostra un messaggio di caricamento
    main.className = 'loading';

    // Chiedere a Gemini di generare le flashcard
    await getCardsFromGemini();

    // Monto le flashcard
    renderCards();

    // Passo alla fase di visualizzazione
    main.className = 'result';
})

// Al click del pulsante "Nuove Flashcard"
newCardButton.addEventListener('click', function () {
    // Resetta lo stato della pagina
    cards = [];
    topic = '';

    // Svuoto la textarea
    textArea.value = '';

    // Svuoto il contenitore dei risultati
    resultContainer.innerHTML = '';

    // Torno alla fase di preparazione
    main.className = 'building';

    // Riporto il focus sulla textarea
    textArea.focus();
})

