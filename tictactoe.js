function rpsGame(choice) {

    var human_choice, bot_choice;
    human_choice = choice;
    var element = document.getElementById('flex-box-rps-div').children;
    bot_choice = element[Math.floor(Math.random() * 3)];
    var winner = decideWinner(human_choice, bot_choice);
    var message = finalMessage(winner);
    rpsResultFunction(human_choice, bot_choice, message);
}
function finalMessage(winner) {
    if (winner == 1) {
        return { 'message': 'You Won', 'color': 'green' };
    }
    else if (winner == 0.5) {
        return { 'message': 'Its a tie', 'color': 'yellow' };
    }
    else {
        return { 'message': 'You Lost', 'color': 'red' };
    }
}


function decideWinner(human_choice, bot_choice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 }
    }
    var yourScore = rpsDatabase[human_choice.id][bot_choice.id];
    var botScore = rpsDatabase[bot_choice.id][human_choice.id];
    console.log("your score" + yourScore);
    console.log("Bot score" + botScore);
    return yourScore;
}
function rpsResultFunction(human_choice, bot_choice, message) {
    var human_image = document.createElement('img');
    human_image.id = human_choice.id;
    human_image.src = human_choice.src;
    human_image.height = human_choice.height;
    human_image.width = human_choice.width;
    console.log("Human Image" + human_image.id);


    var bot_image = document.createElement('img');
    bot_image.id = bot_choice.id;
    bot_image.src = bot_choice.src;
    bot_image.height = bot_choice.height;
    bot_image.width = bot_choice.width;
    console.log("Bot Image" + bot_image);


    document.getElementById('flex-box-rps-div').remove();

    var parentDiv = document.getElementsByClassName('container-3');
    console.log(parentDiv);

    //messageDiv.innerHtml(<h1 style='color+message['color'])
    var header = document.createElement('h1');
    var text = document.createTextNode(message['message']);
    header.setAttribute('id', 'message');
    header.style.color = message['color'];
    header.style.fontSize = "60px";
    header.style.padding = "20px";

    //header.setAttribute('color',message['color']);
    console.log(message['color']);
    header.appendChild(text);

    var div = document.createElement('div');
    div.id = 'flex-box-rps-div';
    div.className = 'flex-box-rps';
    div.appendChild(human_image);
    div.appendChild(header);
    div.appendChild(bot_image);
    //div.innerHTML = "<img src='"+imageDb[human_choice]+"'height=150 width:250"
    parentDiv[0].appendChild(div);
    console.log(div);
    console.log(div.children);

    //console.log(document.getElementsByTagName("button"));   
}