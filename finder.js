let numberList = [];
let answer;
let playerLocation = [47, 48, 49, 50]
let correct = [];
let numLoc;
let submit = "";
let play;
let gameTimer;
let timeout;
let choice = [];
let alphabet = "abcdefghijklmnopqrstuvwxyz"
let alphanum = "abcdefghijklmnopqrstuvwxyz0123456789"
let number = "0123456789"


document.addEventListener('DOMContentLoaded', (event) => {
    let slider = document.getElementById('slider');
    let value = document.getElementById('radialValue');

    slider.addEventListener('input', () => {
    value.textContent = "Time: " + slider.value;
});
});


function main(){
    if (document.getElementById("alphabet").checked === true){
        choice.push(alphabet)
    }
    if (document.getElementById("number").checked === true){
        choice.push(number)
    }
    if (document.getElementById("alphanum").checked === true){
        choice.push(alphanum)
    }
    randomize(choice);
    window.addEventListener("keydown", movement)
    play = setInterval(update, 1500);
    document.getElementById('timer').innerHTML = setTime;
    gameTimer = setInterval(timer, 1000)

    timeout = setTimeout(function(){
        clearInterval(gameTimer)
        document.getElementById('timer').innerHTML = 0;
        failGame();
    }, setTime * 1000)


}

function randomize(choice){
    let symbol = Math.floor(Math.random() * choice.length);
    var characters = choice[symbol]
    console.log(choice)

    for (let i = 0; i < 99 ; i++){
        let first = Math.floor(Math.random() * characters.length);
        let second = Math.floor(Math.random() * characters.length);

        combo = characters[first] + characters[second]

        numberList.push(combo); 

        if (i > (playerLocation[0]-1) && i < (playerLocation[3]+1)){
            var template = htmlToElement(`<div class="chars green ${i}">${combo.toUpperCase()}</div>`)
        } else {
            var template = htmlToElement(`<div class="chars ${i}">${combo.toUpperCase()}</div>`)
        }

        
        document.getElementById("minigame").appendChild(template);
    }

    


    let start = Math.floor(Math.random() * 96) 

    answer = numberList[start] + " " + numberList[start+1] + " " + numberList[start+2] + " " + numberList[start+3]

    correct = [start, start+1, start+2, start+3];
    
    document.getElementById("findthis").innerText = answer.toUpperCase()
    document.getElementById("findthis").style.display = "inline-block"

    answer = answer.replace(/ /g, "")
}

function failGame(){
    for (let i = 0; i < playerLocation.length; i++){
        let element = document.getElementsByClassName("chars")[playerLocation[i]];
        let correctA = document.getElementsByClassName("chars")[correct[i]];
        correctA.classList.add('correct')
        element.classList.remove('green')
        element.classList.add('red')

        }
        clearInterval(play)
        clearInterval(gameTimer)
        clearTimeout(timeout)
        window.removeEventListener('keydown', movement)
}

function timer(){
    setTime--
    document.getElementById('timer').innerHTML = setTime;
}

function reset(){
    setTime = document.getElementById('slider').value;
    choice = [];
    document.getElementById("minigame").innerHTML = "";
    clearInterval(play)
    clearInterval(gameTimer)
    clearTimeout(timeout)
    numberList = []
    playerLocation = [47, 48, 49, 50]
    submit = "";
    
    main();
}



function movement(){
        if (event.keyCode === 13){
            event.preventDefault();
            for (let i = 0; i < playerLocation.length; i++){
            let element = document.getElementsByClassName("chars")[playerLocation[i]].innerHTML;
                submit += element
            }
            if (answer === submit){
                clearInterval(play)
                clearInterval(gameTimer)
                clearTimeout(timeout)
                window.removeEventListener('keydown', movement)
                for (let i = 0; i < playerLocation.length; i++){
                    let element = document.getElementsByClassName("chars")[playerLocation[i]];
                    element.classList.add("correct") 
                }

            } else {
                failGame();
            }
        }


        // UP
        if (event.keyCode === 38) {
            event.preventDefault();
          for (let i = 0; i < playerLocation.length; i++){
            let element = document.getElementsByClassName("chars")[playerLocation[i]];
            element.classList.remove('green')

            if (playerLocation[i] >= 0 && playerLocation[i] < 11) {
                playerLocation[i] = playerLocation[i] + 88;
            } else {
                playerLocation[i] = playerLocation[i] - 11;
            }
            document.getElementsByClassName("chars")[playerLocation[i]].classList.add('green');

            


          }
        }
        // DOWN
        if (event.keyCode === 40) {

            event.preventDefault();
            for (let i = 0; i < playerLocation.length; i++){
            let element = document.getElementsByClassName("chars")[playerLocation[i]];
            element.classList.remove('green')
            if (playerLocation[i] > 87 && playerLocation[i] <= 98) {
                playerLocation[i] = playerLocation[i] - 88;
            } else {
                playerLocation[i] = playerLocation[i] + 11;
            }
            document.getElementsByClassName("chars")[playerLocation[i]].classList.add('green');


          }
          }
        // LEFT
        if (event.keyCode === 37) {
            event.preventDefault();
            for (let i = 0; i < playerLocation.length; i++){
            document.getElementsByClassName("chars")[playerLocation[i]].classList.remove('green');

            if (playerLocation[i] === 0) {
                playerLocation[i] = 98;
                document.getElementsByClassName("chars")[98].classList.add('green');
                continue

            } else {
                playerLocation[i] = playerLocation[i] - 1;
            }
            document.getElementsByClassName("chars")[playerLocation[i]].classList.add('green');


          }
          }
        // RIGHT
        if (event.keyCode === 39) { 

            event.preventDefault();

            for (let i = 0; i < playerLocation.length; i++){

                if (i === 0){
                    document.getElementsByClassName("chars")[playerLocation[i]].classList.remove('green');

                    if (playerLocation[i] === 98) {
                        playerLocation[i] = 0;
                        document.getElementsByClassName("chars")[0].classList.add('green');
                        continue
        
                    } else {
                        playerLocation[i] = playerLocation[i] + 1;
                    }

                    continue
                }
            if (playerLocation[i] === 98) {
                playerLocation[i] = 0;
                document.getElementsByClassName("chars")[0].classList.add('green');
                continue

            } else {
                playerLocation[i] = playerLocation[i] + 1;
            }

            document.getElementsByClassName("chars")[playerLocation[i]].classList.add('green');
            


          }
          }

}



function update(){
    numberList.push(numberList.shift());
    document.getElementById("minigame").innerHTML = "";

    for (let i = 0; i < numberList.length ; i++){
        if (playerLocation.includes(i)){
            var template = htmlToElement(`<div class="chars green ${i}">${numberList[i].toUpperCase()}</div>`)
        } else {
            var template = htmlToElement(`<div class="chars ${i}">${numberList[i].toUpperCase()}</div>`)
        }
        document.getElementById("minigame").appendChild(template);
    }

    for (var entry = 0; entry < correct.length; entry++){
        if (correct[entry] === 0){
            correct[entry] = 99;
        }
        correct[entry] = correct[entry]-1
    }

}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); 
    template.innerHTML = html;
    return template.content.firstChild;
}