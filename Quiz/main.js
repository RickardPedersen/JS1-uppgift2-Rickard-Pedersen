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

console.log(Quiz);
console.log(Question);