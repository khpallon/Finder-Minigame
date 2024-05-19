let numberList = [];
let answer;
let playerLocation = [64, 65, 66, 67]
let numLoc;
let submit = "";
let play;

function main(){
    randomize();
    window.addEventListener("keydown", movement)
    play = setInterval(update, 2000);


}

function reset(){
    document.getElementById("minigame").innerHTML = "";
    clearInterval(play)
    numberList = []
    playerLocation = []
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
            console.log(submit)
            console.log(answer)
            if (answer === submit){
                console.log("YAAAAAAAAAAAA")
                clearInterval(play)
                window.removeEventListener('keydown', movement)

            } else {
                console.log("NAAAAAAAAAAAAAAA")
                for (let i = 0; i < playerLocation.length; i++){
                let element = document.getElementsByClassName("chars")[playerLocation[i]];
                element.classList.remove('green')
                element.classList.add('red')

                }
                clearInterval(play)
                window.removeEventListener('keydown', movement)
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
            console.clear();

            event.preventDefault();
            for (let i = 0; i < playerLocation.length; i++){
            let element = document.getElementsByClassName("chars")[playerLocation[i]];
            element.classList.remove('green')
            if (playerLocation[i] > 87 && playerLocation[i] <= 98) {
                playerLocation[i] = playerLocation[i] - 88;
            } else {
                playerLocation[i] = playerLocation[i] + 11;
            }
            console.log(playerLocation[i])
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

function randomize(){
    for (let i = 0; i < 99 ; i++){
        let combo = Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString();
        numberList.push(combo); 

        if (i > (playerLocation[0]-1) && i < (playerLocation[3]+1)){
            var template = htmlToElement(`<div class="chars green ${i}">${combo}</div>`)
        } else {
            var template = htmlToElement(`<div class="chars ${i}">${combo}</div>`)
        }

        
        document.getElementById("minigame").appendChild(template);
    }

    


    let start = Math.floor(Math.random() * 99) 

    answer = numberList[start] + " " + numberList[start+1] + " " + numberList[start+2] + " " + numberList[start+3]
    
    document.getElementById("findthis").innerText = answer

    answer = answer.replace(/ /g, "")
}

function update(){
    numberList.push(numberList.shift());
    document.getElementById("minigame").innerHTML = "";

    

    for (let i = 0; i < numberList.length ; i++){
        if (playerLocation.includes(i)){
            var template = htmlToElement(`<div class="chars green ${i}">${numberList[i]}</div>`)
        } else {
            var template = htmlToElement(`<div class="chars ${i}">${numberList[i]}</div>`)
        }
        document.getElementById("minigame").appendChild(template);
    }


}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); 
    template.innerHTML = html;
    return template.content.firstChild;
}