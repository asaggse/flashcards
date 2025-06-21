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

// # FASE DI FUNZIONI
// Funzione per recuperare le flashcard da Gemini
async function getCardsFromGemini() {
    // preparare il prompt per Gemini
    const prompt = `
    Genera 3 domande di cultura generale su ${topic}.
    Sto costruendo un'app che ha bisogno di JSON puro come output. Non aggiungere alcuna formattazione, markdown o codice. Solo JSON puro nel formato seguente (nulla prima e dopo): 

    Il JSON deve essere un array di oggetti, dove ogni oggetto ha le chiavi "question" e "answer".`;

    // Preparare l'oggetto di configurazione
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { response_mime_type: 'application/json' }
        })
    }

    // Effettuare la richiesta a Gemini
    const response = await fetch(API_ENDPOINT, config);
    const data = await response.json();

    // Estrarre le flashcard dal JSON restituito
    const suggestedCards = JSON.parse(data.candidates[0].parts[0].text);

    // Aggiungere le flashcard all'array delle carte
    cards = suggestedCards;

    console.log(cards);
}

// Funzione per montare le flashcard nella pagina
function renderCards() {
    // Per ogni carta nell'array delle carte
    cards.forEach(function (card) {
        // Prepariamo un template HTML per la carta
        const cardTemplate = `
            <div class="card">
                <p class="question">${card.question}</p>
                <button class="answer-button">Mostra Risposta</button>
            </div>
        `

        // Lo montiamo nel contenitore dei risultati
        resultContainer.innerHTML += cardTemplate;
        // Recuperiamo l'ultimo elemento aggiunto
    });

    // Abilitiamo i pulsanti di risposta
    enableAnswerButtons();
}

// Funzione per abilitare i pulsanti di risposta
function enableAnswerButtons() {
    // Recuperiamo tutti i pulsanti di risposta
    const answerButtons = document.querySelectorAll('.answer-button')

    // Per ogni pulsante
    answerButtons.forEach(function (button, index) {
        // Aggiungiamo un evento di click
        button.addEventListener('click', function () {
            // Mostriamo la risposta della carta corrispondente
            const answer = cards[index].answer;

            // sostituiamo il testo del pulsante con la risposta
            button.textContent = `<div class="answer-box">${answer}</div>`
        })
    })
}