const textDisplay = document.getElementById('text-display');
const inputBox = document.getElementById('input-box');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const resetBtn = document.getElementById('reset-btn');

// Pop-up elements
const resultPopup = document.getElementById('result-popup');
const finalTime = document.getElementById('final-time');
const finalWpm = document.getElementById('final-wpm');
const finalAccuracy = document.getElementById('final-accuracy');
const closePopup = document.getElementById('close-popup');

const paragraph = `The tech industry is one of the fastest-growing and most influential sectors in the world, driving innovation, shaping economies, and transforming the way people live, work, and communicate. From groundbreaking advancements in artificial intelligence and machine learning to the rise of cloud computing, blockchain, and the Internet of Things (IoT), technology continues to push boundaries and create new possibilities. Software development powers everything from mobile apps to enterprise solutions, while cybersecurity ensures data protection in an increasingly digital landscape. Companies invest heavily in research and development to stay ahead in a competitive market, fostering a culture of creativity and problem-solving. The industry also plays a key role in automation, making processes more efficient and reducing human effort in repetitive tasks. As remote work and digital transformation become the norm, the demand for skilled professionals in programming, networking, IT support, and cybersecurity is higher than ever. With the constant evolution of technology, the future holds endless possibilities, making the tech industry an exciting and dynamic field with limitless potential.`;

let timer = 60;
let interval;
let started = false;
let correctChars = 0;

function setTextDisplay() {
    textDisplay.innerHTML = '';

    paragraph.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        textDisplay.appendChild(span);
    });
}

document.addEventListener("DOMContentLoaded", setTextDisplay);

function startTimer() {
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerEl.textContent = timer;
        } else {
            clearInterval(interval);
            inputBox.disabled = true;
            showResultPopup();
        }
    }, 1000);
}

function updateTyping() {
    let typedText = inputBox.value;
    let characters = textDisplay.querySelectorAll("span");
    correctChars = 0;

    characters.forEach((char, index) => {
        if (typedText[index] === undefined) {
            char.classList.remove("correct", "incorrect");
        } else if (typedText[index] === char.textContent) {
            char.classList.add("correct");
            char.classList.remove("incorrect");
            correctChars++;
        } else {
            char.classList.add("incorrect");
            char.classList.remove("correct");
        }
    });

    // 🔥 Fix: Scroll to the last typed character
    let lastTypedChar = characters[typedText.length - 1];
    if (lastTypedChar) {
        lastTypedChar.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Calculate WPM
    let wordsTyped = typedText.trim().split(/\s+/).length;
    let wpm = wordsTyped * (60 / (60 - timer));

    // Calculate Accuracy
    let accuracy = (correctChars / typedText.length) * 100;

    // Update UI with calculated values
    wpmEl.textContent = isNaN(wpm) ? 0 : Math.round(wpm);
    accuracyEl.textContent = isNaN(accuracy) ? 100 : Math.round(accuracy);
}





function showResultPopup() {
    finalTime.textContent = 60 - timer;
    finalWpm.textContent = wpmEl.textContent;
    finalAccuracy.textContent = accuracyEl.textContent;
    resultPopup.style.display = "flex";
}

inputBox.addEventListener('input', () => {
    if (!started) {
        started = true;
        startTimer();
    }
    updateTyping();
});

resetBtn.addEventListener('click', () => {
    location.reload();
});

closePopup.addEventListener('click', () => {
    resultPopup.style.display = "none";
});
