document.addEventListener('DOMContentLoaded', (event) => {

    class Quiz {
        constructor(playerName, noOfQuestions) {
            this.reset();
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

            // pushes the questions into the correct array.
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

        // Displays your "stats" on the screen.
        updateStats() {
            document.getElementById("questionNumber").innerHTML = "Fråga " + this.currentQuestionNumber + "/" + this.noOfQuestions;
            document.getElementById("correctNumber").innerHTML = "Antal rätt: " + this.correctAnswers;
            document.getElementById("wrongNumber").innerHTML = "Antal fel: " + this.wrongAnswers;
        }

        // Unchecks checked radio buttons.
        reset() {
            for (let i = 0; i < radioButtons.length; i++) {
                radioButtons[i].parentNode.classList.remove("disabled")
                radioButtons[i].disabled = false;
            }
        }
    }

    class Question {
        constructor() {
            this.category;
            this.questionArray;
            this.question;
            this.answers;
            this.checkCategoryChoice();
            this.getQuestion(this.category, this.questionArray);
            this.printQuestion();

        }

        // Checks which category the player has chosen.
        checkCategoryChoice() {
            for (let i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked == true) {
                    this.category = radioButtons[i].value;
                    this.questionArray = game.arrayOfArrays[i];
                }
            }
        }

        // Gets a random question from the chosen category array.
        getQuestion(id, array) {
            let questionIndex = Math.floor(Math.random() * array.length);

            this.question = array[questionIndex].Question;
            this.answers = array[questionIndex].Answers;
            array.splice(questionIndex, 1);

            if (array.length == 0) {
                document.getElementById(id).disabled = true;
                document.getElementById(id).parentNode.classList.add("disabled");
            }
        }

        // Prints out the question and answers on the screen.
        printQuestion() {
            document.getElementById("question").innerHTML = this.question;

            for (let i = 0; i < this.answers.length; i++) {
                document.getElementById("answer" + i).innerHTML = this.answers[i].Alternative;
            }

        }

        // Checks if the answers the player has selected are correct.
        // Compares the checkboxes "checked" boolean with the answers "Correct" boolean.
        // All booleans must "line up" for the answer to be correct.
        correct(array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].checked === this.answers[i].Correct) {
                    if (i == array.length - 1) {
                        game.correctAnswers++;
                        break;
                    }
                } else {
                    game.wrongAnswers++;
                    break;
                }

            }
        }

        // Shows the player which answers were correct.
        showAnswers() {
            game.updateStats();
            for (let i = 0; i < this.answers.length; i++) {
                if (this.answers[i].Correct == true) {
                    document.getElementById("answer" + i).parentNode.classList.add("correct");
                } else {
                    document.getElementById("answer" + i).parentNode.classList.add("wrong");
                }
            }

            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked == true) {
                    document.getElementsByClassName("yourAnswer")[i].classList.remove("hidden");
                }
            }
        }

        // Unchecks any checked checkbox or radio button.
        reset() {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
                checkboxes[i].parentNode.classList.remove("selected", "correct", "wrong");
                radioButtons[i].checked = false;
                radioButtons[i].parentNode.classList.remove("selected");
                document.getElementsByClassName("yourAnswer")[i].classList.add("hidden");
            }
        }
    }

    // Loads the .json file. The function is in a different .js file.
    let json = getJSON('my_data.json');

    // This function adds the class ".selected" to the checked radio button.
    let radioButtons = document.getElementsByName("radio");

    function selectCategory(event) {
        for (radioButton of radioButtons) {
            if (radioButton.checked == true) {
                radioButton.parentNode.classList.add("selected");
            } else {
                radioButton.parentNode.classList.remove("selected");
            }
        }
    }

    // Adds event listener to all radio buttons.
    for (radioButton of radioButtons) {
        radioButton.addEventListener("change", selectCategory);
    }

    // This function adds the class ".selected" to all the checked checkboxes.
    let checkboxes = document.getElementsByClassName("checkbox");

    function selectAnswer(event) {
        if (event.currentTarget.checked == true) {
            event.currentTarget.parentNode.classList.add("selected");
        } else {
            event.currentTarget.parentNode.classList.remove("selected");
        }
    }

    // Adds event listener to all checkboxes.
    for (checkbox of checkboxes) {
        checkbox.addEventListener("change", selectAnswer);
    }

    // Adds event listener for the "Starta" button.
    document.getElementById("startButton").addEventListener("click", function (event) {
        document.getElementById("startArea").classList.add("hidden");
        document.getElementById("inputArea").classList.remove("hidden");
    });


    // Adds event listener for the "Spela" button. This Starts the game.
    let game;
    document.getElementById("submitInputs").addEventListener("click", function (event) {

        // Function stops if the input fields contain the wrong information.
        if (document.getElementById("noOfQuestions").value == "" ||
            document.getElementById("noOfQuestions").value < 1 ||
            document.getElementById("noOfQuestions").value > 16 ||
            document.getElementById("playerName").value == "") {
            return;
        }

        // Creates the "game" object.
        game = new Quiz(document.getElementById("playerName").value, parseInt(document.getElementById("noOfQuestions").value));
        document.getElementById("inputArea").classList.add("hidden");
        document.getElementById("categoryArea").classList.remove("hidden");
    });

    // Adds event listener for the "Välj" category button.
    let newQuestion;
    document.getElementById("submitCategory").addEventListener("click", function (event) {

        // This loop makes sure the player has selected a category.
        // You have to select a category to continue.
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked == true) {
                newQuestion = new Question();
                document.getElementById("stats").classList.remove("hidden");
                game.currentQuestionNumber++;
                game.updateStats();
                document.getElementById("categoryArea").classList.add("hidden");
                document.getElementById("questionArea").classList.remove("hidden");
            } else if (i == radioButtons.length - 1) {
                return;
            }
        }
    });

    // Adds event listener for the "Välj" answers button. 
    document.getElementById("submitAnswer").addEventListener("click", function (event) {
        newQuestion.correct(checkboxes);
        newQuestion.showAnswers();
        document.getElementById("submitAnswer").classList.add("hidden");
        document.getElementById("nextQuestion").classList.remove("hidden");
    });

    // Adds event listener for the "Fortsätt" button.
    document.getElementById("nextQuestion").addEventListener("click", function (event) {
        newQuestion.reset();
        document.getElementById("questionArea").classList.add("hidden");
        document.getElementById("submitAnswer").classList.remove("hidden");
        document.getElementById("nextQuestion").classList.add("hidden");

        // Checks if all the questions has been answered.
        if (game.currentQuestionNumber == game.noOfQuestions) {
            document.getElementById("resultArea").classList.remove("hidden");
            document.getElementById("stats").classList.add("hidden");
            document.getElementById("resultText").innerHTML = game.playerName + " svarade rätt på " + game.correctAnswers + " av " + game.noOfQuestions + " frågor!";
        } else {
            document.getElementById("categoryArea").classList.remove("hidden");

        }
    });

    // Adds event listener for the "Avsulta button".
    document.getElementById("quitButton").addEventListener("click", function () {
        document.getElementById("resultArea").classList.add("hidden");
        document.getElementById("startArea").classList.remove("hidden");
    });

    // Makes it impossible to enter anything other then numbers in the noOfQuestions input.
    document.getElementById("noOfQuestions").oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    }

    // Makes it impossible to enter anything other then letters in the playerName input.
    document.getElementById("playerName").oninput = function () {
        this.value = this.value.replace(/[^a-öA-Ö]/g, '');
    }

});