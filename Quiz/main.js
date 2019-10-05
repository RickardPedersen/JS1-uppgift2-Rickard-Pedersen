// TODO: alreadyAnswerd. kanske i json? spara hela det "svarade" objektet i Quiz/Question (array)

document.addEventListener('DOMContentLoaded', (event) => {


class Quiz {
    constructor(playerName, noOfQuestions) {
        this.playerName = playerName;
        this.noOfQuestions = noOfQuestions;
        this.correctAnswers = 0;
        //this.wroingAnswer = 0;
    }
}

class Question {
    constructor() {
        this.category;
        this.question;
        this.answer = false;
    }
}

function selectAnswer(event) {
    if (event.currentTarget.checked == true) {
        event.currentTarget.parentNode.classList.add("selected");
    } else {
        event.currentTarget.parentNode.classList.remove("selected");
    }
}

for (element of document.getElementsByClassName("checkbox")) {
    element.addEventListener("change", selectAnswer);
}
/*
document.getElementById("checkbox2").addEventListener("change", selectAnswer);
document.getElementById("checkbox3").addEventListener("change", selectAnswer);
document.getElementById("checkbox4").addEventListener("change", selectAnswer);
*/


let json = getJSON('my_data.json');
console.log(json);

document.getElementById("question").innerHTML = json.Gaming[0].fråga;

for (let i = 0; i < json.Gaming.length ; i++) {
    document.getElementById("answer"+i).innerHTML = json.Gaming[0].answers[i].alternativ;
}

document.getElementById("submitAnswer").addEventListener("click", function (event) {
    
    for (let i = 0; i < document.getElementsByClassName("checkbox").length; i++) {
        if (document.getElementsByClassName("checkbox")[i].checked === json.Gaming[0].answers[i].correct) {
            if (i == 3) {
                alert("rätt");
                break;
            }
        } else {
            alert("fel");
            break;
        }
    }
    
   
    //console.log(document.getElementsByClassName("checkbox")[0].checked)
    //console.log(json.Gaming[0].answers[0].correct)
})



});