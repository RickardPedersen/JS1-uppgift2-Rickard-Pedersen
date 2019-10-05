// TODO: alreadyAnswerd. kanske i json? spara hela det "svarade" objektet i Quiz/Question (array)

document.addEventListener('DOMContentLoaded', (event) => {


    class Quiz {
        constructor(playerName = "player", noOfQuestions = 1) {
            this.playerName = playerName;
            this.noOfQuestions = noOfQuestions;
            this.correctAnswers = 0;
            this.wrongAnswers = 0;
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
                    this.answers = json.Sport[questionIndex].Answers;
                    break;

                case "Teknik":
                    this.question = json.Teknik[questionIndex].Question;
                    this.answers = json.Teknik[questionIndex].Answers;
                    break;

                case "Gaming":
                    this.question = json.Gaming[questionIndex].Question;
                    this.answers = json.Gaming[questionIndex].Answers;
                    this
                    break;
                
                case "Historia":
                    this.question = json.Historia[questionIndex].Question;
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

        correct() {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked === this.answers[i].Correct) {
                    if (i == checkboxes.length-1) {
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
    document.getElementById("submitInputs").addEventListener("click", function (event) {
        game = new Quiz(document.getElementById("playerName").value, parseInt(document.getElementById("noOfQuestions").value));
        console.log(game);
        document.getElementById("inputArea").classList.add("hidden");
        document.getElementById("categoryArea").classList.remove("hidden");
    });

    let newQuestion;
    document.getElementById("submitCategory").addEventListener("click", function (event) {
        newQuestion = new Question();
        console.log(newQuestion);
    });

    document.getElementById("submitAnswer").addEventListener("click", function (event) {
        newQuestion.correct();
    });



});