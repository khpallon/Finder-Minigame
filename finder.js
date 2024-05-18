let numberList = [];
let answer;

function main(){
    document.getElementById("minigame").innerHTML = "";
    randomize();
}

function randomize(){
    for (let i = 0; i < 140 ; i++){
        let combo = Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString();
        numberList.push(combo); 

        var template = htmlToElement(`<div class="chars">${combo}</div>`)
        document.getElementById("minigame").appendChild(template);
    }

    let start = Math.floor(Math.random() * 136) 

    answer = numberList[start] + numberList[start+1] + numberList[start+2] + numberList[start+3]

    console.log(answer)



    console.log(numberList.length)



    setInterval(update, 4000);
    
}

function update(){
    numberList.push(numberList.shift());
    document.getElementById("minigame").innerHTML = "";

    for (let i = 0; i < numberList.length ; i++){
        var template = htmlToElement(`<div class="chars">${numberList[i]}</div>`)
        document.getElementById("minigame").appendChild(template);
    }


}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); 
    template.innerHTML = html;
    return template.content.firstChild;
}