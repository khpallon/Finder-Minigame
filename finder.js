let numberList = [];
let answer;
let playerLocation = [75, 76, 77, 78]
let numLoc;

function main(){
    document.getElementById("minigame").innerHTML = "";
    randomize();
    movement();
    setInterval(update, 4000);


}

function movement(){

    window.addEventListener("keydown", (event) => {
        // UP
        if (event.keyCode === 38) {
            console.log('yo')
          for (let i = 0; i < playerLocation.length; i++){
            let element = document.getElementsByClassName("chars")[playerLocation[i]];
            element.style.color = "black";
            element.classList.remove('green')
            playerLocation[i] = playerLocation[i] - 10;
            element.classList.add('green');


          }
        }
        // DOWN
        if (event.keyCode === 40) {
            return;
          }
        // LEFT
        if (event.keyCode === 37) {
            return;
          }
        // RIGHT
        if (event.keyCode === 39) {
            return;
          }
      });

}

function randomize(){
    for (let i = 0; i < 140 ; i++){
        let combo = Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString();
        numberList.push(combo); 

        if (i > (playerLocation[0]-1) && i < (playerLocation[3]+1)){
            var template = htmlToElement(`<div class="chars green">${combo}</div>`)
        } else {
            var template = htmlToElement(`<div class="chars">${combo}</div>`)
        }

        
        document.getElementById("minigame").appendChild(template);
    }

    


    let start = Math.floor(Math.random() * 136) 

    answer = numberList[start] + numberList[start+1] + numberList[start+2] + numberList[start+3]

    console.log(answer)

    console.log(numberList.length)
}

function update(){
    numberList.push(numberList.shift());
    document.getElementById("minigame").innerHTML = "";

    for (let i = 0; i < numberList.length ; i++){

        if (i > (playerLocation[0]-1) && i < (playerLocation[3]+1)){
            var template = htmlToElement(`<div class="chars green">${numberList[i]}</div>`)
        } else {
            var template = htmlToElement(`<div class="chars">${numberList[i]}</div>`)
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