class Quiz {
    constructor(playerName, questions) {
        this.playerName = playerName;
        this.questions = questions;
        this.correctAnswer = 0;
        this.wroingAnswer = 0;
    }
}

class Question {
    constructor() {
        this.category;
        this.question;
        this.answer = false;
    }
}

function selectAnswer() {
    alert("Checked");
}

document.getElementById("cb1").addEventListener("click", selectAnswer);
document.getElementById("cb2").addEventListener("click", selectAnswer);
document.getElementById("cb3").addEventListener("click", selectAnswer);
document.getElementById("cb4").addEventListener("click", selectAnswer);

