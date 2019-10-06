// TODO: alreadyAnswerd. kanske i json? spara hela det "svarade" objektet i Quiz/Question (array)
// FIXA checkifanswered metoden!!

document.addEventListener('DOMContentLoaded', (event) => {


    class Quiz {
        constructor(playerName = "player", noOfQuestions = 1) {
            this.playerName = playerName;
            this.noOfQuestions = noOfQuestions;
            this.currentQuestionNumber = 0;
            this.correctAnswers = 0;
            this.wrongAnswers = 0;
            this.alreadyAnswered = [];
            this.updateStats();
        }

        updateStats() {
            document.getElementById("questionNumber").innerHTML = "Fråga " + this.currentQuestionNumber + "/" + this.noOfQuestions;
            document.getElementById("correctNumber").innerHTML = "Antal rätt: " + this.correctAnswers;
            document.getElementById("wrongNumber").innerHTML = "Antal fel: " + this.wrongAnswers;
        }

        //fungerar inte som den ska FIXA
        checkIfAnswered() {
            for (let i = 0; i < this.alreadyAnswered.length; i++) {
                if(this.alreadyAnswered[i] == newQuestion.question) {
                    //this.getQuestion();
                    console.log("denna är redan besvarad");
                    console.log(this.alreadyAnswered[i]);
                    console.log(newQuestion.question);
                    return;
                }
            }
        }
    }

    class Question {
        constructor() {
            this.category;
            this.question;
            this.answers;
            this.checkCategoryChoice();
            this.getQuestion();
            this.printQuestion();
            
        }

        checkCategoryChoice() {
            for (radioButton of radioButtons) {
                if (radioButton.checked == true) {
                    this.category = radioButton.value;
                }
            }
        }

        getQuestion() {
            let questionIndex = Math.floor(Math.random() * 4);

            switch (this.category) {
                case "Sport":
                    this.question = json.Sport[questionIndex].Question;
                    game.checkIfAnswered();
                    game.alreadyAnswered.push(json.Sport[questionIndex].Question);
                    this.answers = json.Sport[questionIndex].Answers;
                    break;

                case "Teknik":
                    this.question = json.Teknik[questionIndex].Question;
                    game.checkIfAnswered();
                    game.alreadyAnswered.push(json.Teknik[questionIndex].Question);
                    this.answers = json.Teknik[questionIndex].Answers;
                    break;

                case "Gaming":
                    this.question = json.Gaming[questionIndex].Question;
                    game.checkIfAnswered();
                    game.alreadyAnswered.push(json.Gaming[questionIndex].Question);
                    this.answers = json.Gaming[questionIndex].Answers;
                    this
                    break;

                case "Historia":
                    this.question = json.Historia[questionIndex].Question;
                    game.checkIfAnswered();
                    game.alreadyAnswered.push(json.Historia[questionIndex].Question);
                    this.answers = json.Historia[questionIndex].Answers;
                    break;

                default:
                    break;
            }

            

        }

        // This method prints out the question and answers
        printQuestion() {
            document.getElementById("question").innerHTML = this.question;

            for (let i = 0; i < this.answers.length; i++) {
                document.getElementById("answer" + i).innerHTML = this.answers[i].Alternative;
            }

        }

        correct(array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].checked === this.answers[i].Correct) {
                    if (i == array.length - 1) {
                        game.correctAnswers++;
                        alert("rätt");
                        break;
                    }
                } else {
                    game.wrongAnswers++;
                    alert("fel");
                    break;
                }
                
            }
        }

        showAnswers() {
            game.updateStats();
            for (let i = 0; i < this.answers.length; i++) {
                if (this.answers[i].Correct == true) {
                    document.getElementById("answer" + i).parentNode.classList.add("correct");
                } else {
                    document.getElementById("answer" + i).parentNode.classList.add("wrong");
                }
            }
            //visa också vad spelaren har svarat typ "ditt svar"
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked == true) {
                    document.getElementsByClassName("yourAnswer")[i].classList.remove("hidden");
                }
            }
        }

        reset() {
            
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
                checkboxes[i].parentNode.classList.remove("selected", "correct", "wrong");
                radioButtons[i].checked = false;
                radioButtons[i].parentNode.classList.remove("selected", "correct", "wrong");
                document.getElementsByClassName("yourAnswer")[i].classList.add("hidden");
            }
        }
    }





    let radioButtons = document.getElementsByName("radio");
    // This function adds the class ".selected" to the checked radiobutton
    function selectCategory(event) {
        for (radioButton of radioButtons) {
            if (radioButton.checked == true) {
                radioButton.parentNode.classList.add("selected");
            } else {
                radioButton.parentNode.classList.remove("selected");
            }
        }
    }

    for (radioButton of radioButtons) {
        radioButton.addEventListener("change", selectCategory);
    }

    let checkboxes = document.getElementsByClassName("checkbox");
    // This function adds the class ".selected" to the checked checkboxes
    function selectAnswer(event) {
        if (event.currentTarget.checked == true) {
            event.currentTarget.parentNode.classList.add("selected");
        } else {
            event.currentTarget.parentNode.classList.remove("selected");
        }
    }

    for (checkbox of checkboxes) {
        checkbox.addEventListener("change", selectAnswer);
    }





    let json = getJSON('my_data.json');
    //console.log(json);

    //document.getElementById("question").innerHTML = json.Gaming[0].Question;

    /*
    for (let i = 0; i < json.Gaming.length; i++) {
        document.getElementById("answer" + i).innerHTML = json.Gaming[0].Answers[i].Alternative;
    }
    */





    let game;
    //game = new Quiz("Rickard", 5);
    document.getElementById("submitInputs").addEventListener("click", function (event) {
        game = new Quiz(document.getElementById("playerName").value, parseInt(document.getElementById("noOfQuestions").value));
        
        console.log(game);
        document.getElementById("inputArea").classList.add("hidden");
        document.getElementById("categoryArea").classList.remove("hidden");
    });

    let newQuestion;
    document.getElementById("submitCategory").addEventListener("click", function (event) {
        newQuestion = new Question();
        document.getElementById("stats").classList.remove("hidden");
        game.currentQuestionNumber++;
        game.updateStats();
        console.log(newQuestion);
        document.getElementById("categoryArea").classList.add("hidden");
        document.getElementById("questionArea").classList.remove("hidden");
    });

    document.getElementById("submitAnswer").addEventListener("click", function (event) {
        newQuestion.correct(checkboxes);
        newQuestion.showAnswers();
        document.getElementById("submitAnswer").classList.add("hidden");
        document.getElementById("nextQuestion").classList.remove("hidden");
    });

    document.getElementById("nextQuestion").addEventListener("click", function (event) {
        //console.log(game.correctAnswers + game.wrongAnswers);
        //console.log(game.noOfQuestions);
        newQuestion.reset();
        document.getElementById("questionArea").classList.add("hidden");
        document.getElementById("submitAnswer").classList.remove("hidden");
        document.getElementById("nextQuestion").classList.add("hidden");
        if (game.currentQuestionNumber == game.noOfQuestions) {
            document.getElementById("resultArea").classList.remove("hidden");
            document.getElementById("resultText").innerHTML = "Du svarade rätt på " + game.correctAnswers + " av " + game.noOfQuestions + " frågor!";
        } else {
            //newQuestion = new Question();
            document.getElementById("categoryArea").classList.remove("hidden");
        }
    });



});