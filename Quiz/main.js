// TODO: alreadyAnswerd. kanske i json?

window.addEventListener('DOMContentLoaded', (event) => {


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

function selectAnswer(event) {
    console.log(event.currentTarget.parentNode);
    if (event.currentTarget.checked == true) {
        event.currentTarget.parentNode.classList.add("selected");
    } else {
        event.currentTarget.parentNode.classList.remove("selected");
    }
}

document.getElementById("cb1").addEventListener("change", selectAnswer);
document.getElementById("cb2").addEventListener("change", selectAnswer);
document.getElementById("cb3").addEventListener("change", selectAnswer);
document.getElementById("cb4").addEventListener("change", selectAnswer);


let json = getJSON('my_data.json');
console.log(json);

document.getElementById("question").innerHTML = json.Gaming[0].fråga;

for (let i = 0; i < json.Gaming.length ; i++) {
    document.getElementById("answer"+i).innerHTML = json.Gaming[0].answers[i].alternativ;
}

document.getElementById("chooseButton").addEventListener("click", function (event) {
    
    for (let i = 0; i < document.getElementsByClassName("cb").length; i++) {
        if (document.getElementsByClassName("cb")[i].checked === json.Gaming[0].answers[i].correct) {
            if (i == 3) {
                alert("rätt");
                break;
            }
        } else {
            alert("fel");
            break;
        }
    }
    
   
    //console.log(document.getElementsByClassName("cb")[0].checked)
    //console.log(json.Gaming[0].answers[0].correct)
})



});

