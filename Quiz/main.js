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
            this.sportQuestions = [];
            this.teknikQuestions = [];
            this.gamingQuestions = [];
            this.historiaQuestions = [];
            this.arrayOfArrays = [this.sportQuestions, this.teknikQuestions, this.gamingQuestions, this.historiaQuestions]

            for (let i = 0; i < json.Sport.length; i++) {
                this.sportQuestions.push(json.Sport[i]);
            }
            for (let i = 0; i < json.Teknik.length; i++) {
                this.teknikQuestions.push(json.Teknik[i]);
            }
            for (let i = 0; i < json.Gaming.length; i++) {
                this.gamingQuestions.push(json.Gaming[i]);
            }
            for (let i = 0; i < json.Historia.length; i++) {
                this.historiaQuestions.push(json.Historia[i]);
            }

            this.updateStats();
        }

        updateStats() {
            document.getElementById("questionNumber").innerHTML = "Fråga " + this.currentQuestionNumber + "/" + this.noOfQuestions;
            document.getElementById("correctNumber").innerHTML = "Antal rätt: " + this.correctAnswers;
            document.getElementById("wrongNumber").innerHTML = "Antal fel: " + this.wrongAnswers;
        }

        //fungerar inte som den ska FIXA
        //newQuestion.question-värdet uppdateras inte sen den förra frågan
        /*
        checkIfAnswered(questionToBeChecked) {
            for (let i = 0; i < this.alreadyAnswered.length; i++) {
                if (this.alreadyAnswered[i] == questionToBeChecked) {
                    newQuestion.getQuestion();
                    console.log("denna är redan besvarad");

                    //console.log(this.alreadyAnswered[i]);
                    //console.log(questionToBeChecked);

                }
            }
        }
        */
    }

    class Question {
        constructor() {
            this.category;
            this.questionArray;
            this.question;
            this.answers;
            this.checkCategoryChoice();
            //this.getQuestion();
            this.getQuestion2(this.category, this.questionArray);
            this.printQuestion();

        }

        checkCategoryChoice() {
            /*
            for (radioButton of radioButtons) {
                if (radioButton.checked == true) {
                    this.category = radioButton.value;
                }
            }
            */
           for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked == true) {
                this.category = radioButtons[i].value;
                this.questionArray = game.arrayOfArrays[i];
            }
        }
        }

        getQuestion2(id, array) {
            let questionIndex = Math.floor(Math.random() * array.length);
            
                    this.question = array[questionIndex].Question;
                    this.answers = array[questionIndex].Answers;
                    array.splice(questionIndex, 1);

                    if (array.length == 0) {
                        document.getElementById(id).disabled = true;
                        document.getElementById(id).parentNode.classList.add("disabled");
                    }
        }

        // används inte längre
        /*
        getQuestion() {
            let questionIndex;

            switch (this.category) {
                case "Sport":
                    questionIndex = Math.floor(Math.random() * game.sportQuestions.length);
                    this.question = game.sportQuestions[questionIndex].Question;
                    this.answers = game.sportQuestions[questionIndex].Answers;
                    game.sportQuestions.splice(questionIndex, 1);

                    if (game.sportQuestions.length == 0) {
                        document.getElementById("sport").disabled = true;
                        document.getElementById("sport").parentNode.classList.add("disabled");
                    }
                    //game.answeredSport++;
                    break;

                case "Teknik":
                    questionIndex = Math.floor(Math.random() * game.teknikQuestions.length);
                    this.question = game.teknikQuestions[questionIndex].Question;
                    this.answers = game.teknikQuestions[questionIndex].Answers;
                    game.teknikQuestions.splice(questionIndex, 1);

                    if (game.teknikQuestions.length == 0) {
                        document.getElementById("sport").disabled = true;
                        document.getElementById("sport").parentNode.classList.add("disabled");
                    }
                    ///game.answeredTeknik++;
                    break;

                case "Gaming":
                    questionIndex = Math.floor(Math.random() * game.sportQuestions.length);
                    this.question = game.sportQuestions[questionIndex].Question;
                    this.answers = game.sportQuestions[questionIndex].Answers;
                    game.sportQuestions.splice(questionIndex, 1);

                    if (game.sportQuestions.length == 0) {
                        document.getElementById("sport").disabled = true;
                        document.getElementById("sport").parentNode.classList.add("disabled");
                    }
                    //game.answeredGaming++;
                    break;

                case "Historia":
                    questionIndex = Math.floor(Math.random() * game.sportQuestions.length);
                    this.question = game.sportQuestions[questionIndex].Question;
                    this.answers = game.sportQuestions[questionIndex].Answers;
                    game.sportQuestions.splice(questionIndex, 1);

                    if (game.sportQuestions.length == 0) {
                        document.getElementById("sport").disabled = true;
                        document.getElementById("sport").parentNode.classList.add("disabled");
                    }
                    //game.answeredHistoria++;
                    break;

                default:
                    break;
            }
            


        }
        */

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
            /*
            if (game.answeredSport == json.Sport.length) {
                document.getElementById("sport").disabled = true;
            }
            if (game.answeredSport == json.Sport.length) {
                document.getElementById("teknik").disabled = true;
            }
            if (game.answeredSport == json.Sport.length) {
                document.getElementById("gaming").disabled = true;
            }
            if (game.answeredSport == json.Sport.length) {
                document.getElementById("historia").disabled = true;
            }

            */
            document.getElementById("categoryArea").classList.remove("hidden");

        }
    });

    //document.getElementById("sport").disabled = true;

});