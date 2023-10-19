const questao = document.getElementById("questao");
const contEscolhas = Array.from(document.getElementsByClassName('choice-container'));
const escolhas = Array.from(document.getElementsByClassName('choice-text'));
const questaoBloco = document.getElementsByClassName('question');
const img = questaoBloco[0].getElementsByTagName('img')[0];
const rodadaId = document.getElementById('rodada');
const game = document.getElementById("game");

if (!localStorage.getItem("round")) {
    localStorage.setItem("round", 1);
    localStorage.setItem("points", 0);
}

var actualRound = localStorage.getItem("round");
var actualPoints = localStorage.getItem("points");

var questaoAtual = {};
var questions = [
    {"text": "What is the purpose of HTML tags and elements?",
"choices": ["To add style and design to web pages", "To structure and organize content on web pages", "To create server-side scripts", "To define the colors and fonts of text"],
"correct": "To structure and organize content on web pages"},

{"text": "What is the role of the <head> section in an HTML document?",
"choices": ["To define the main content of the page", "To specify visible content", "To include meta information and links to stylesheets", "To add images and multimedia content"], "correct": "To include meta information and links to stylesheets"},

{"text": "Which HTML element is used to create hyperlinks on a web page?",
"choices": ["<link>", "<a>", "<href>", "<navigate>"], 
"correct": "<a>"},

{"text": "Which HTML element is used to create web forms for user input?",
"choices": ["<form>", "<input>", "<div>", "<p>"],
"correct": "<p>"},

    {"question": "JavaScript",
    "text":"What is the primary use of JavaScript?",
    "choices": ["Server-side development", "Building mobile applications", "Creating dynamic content on web pages", "Data analysis and computation"],
    "correct": "Creating dynamic content on web pages"},


    {"question": "JavaScript",
    "text":"What type of scripting language is JavaScript?",
    "choices": ["Lightweight and compiled", "Compiled and statically-typed", "Lightweight and interpreted", "Interpreted and statically-typed"],
    "correct": "Lightweight and interpreted"},


    {"question": "JavaScript",
    "text":"Which of the following languages is commonly used alongside JavaScript in web development?",
    "choices": ["HTML", "Java", "Python", "C++"],
    "correct": "HTML"},

    {"question": "JavaScript",
    "text":"What programming paradigm does JavaScript primarily follow for object-oriented programming?",
    "choices": ["Class-based", "Functional", "Prototype-based", "Component-based"],
    "correct": "Prototype-based"},
]  

game.classList.remove("hidden"); 

function shuffle(array) { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}

function setQuestion() {
    let actual = questions[actualRound-1];
    let choices = shuffle(actual.choices);
    let correct = actual.correct;
    let correctIndex = choices.indexOf(correct);

    questao.innerHTML = actual.text
    escolhas.forEach(e => {
        const n = e.dataset['number'];
        e.innerHTML = choices[n-1];
        if (n-1 == correctIndex) {
            e.classList.add("correct-answer");
        }
        else {
            if (e.classList.contains("correct-answer")) {
                e.classList.remove("correct-answer");
            }
        }
    })
}

setQuestion()

function selectChoice(el) {
    let children = el.children;
    let choice = children[1];


    if (choice.classList.contains("correct-answer")) {
        choice.classList.add("correct");
        CorrectAnswer();
        setTimeout(() => {
            NextRound();
            choice.classList.remove("correct");
        }, 1000);
    }
    else {
        choice.classList.add("incorrect");    
        setTimeout(() => {
            NextRound();
            choice.classList.remove("incorrect");
        }, 1000);
    }
}

function CorrectAnswer(){
    localStorage.setItem("points", actualPoints++);
}

function NextRound(){
    if (actualRound >= 8) {
        location.href="final.html";
    }
    localStorage.setItem("round", actualRound++);
    setQuestion(); 
}