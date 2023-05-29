function getComputerChoice()
{
    let myArray = ['rock', 'scissors', 'paper'];
    let randomValue = myArray[Math.floor(Math.random() * myArray.length)];
    return randomValue;
}

function playRound(computerSelection, playerSelection) 
{
    if (playerSelection === "rock" || playerSelection === "scissors" || playerSelection === "paper") 
    {
        if(playerSelection === computerSelection)
            return "Tie!";
        else if(playerSelection === "paper" && computerSelection === "scissors" 
        || playerSelection === "scissors" && computerSelection === "rock" 
        || playerSelection === "rock" && computerSelection === "paper")
            return "You lose!";
        else
            return "You win!";
    }
    else
        return -1;
        //console.log("ERROR: playRound()");
}

function createDOM(result)
{
    const answer = document.querySelector('.answer');
    const content = document.createElement('p');
    content.classList.add('content');
    if(result === "You lose!")
        content.textContent = 'You lose!';
    else if(result === "You win!")
        content.textContent = 'You win!';
    else if(result === "Tie!")
        content.textContent = 'Tie!';
    else
        return -1;
        //console.log("ERROR: createDOM()");
    answer.insertBefore(content, answer.firstChild);
}

function displayResults(button) 
{
    if(document.querySelector('.answer').style.display === 'flex')
    {
        document.querySelector('.answer').style.display = 'none';
        document.getElementById(button).innerHTML = 'Show all results';
    }   
    else
    {
        document.querySelector('.answer').style.display = 'flex';
        document.getElementById(button).innerHTML = 'Hide all results';
    } 
}

function game(playerSelection)
{
    const span_computer = document.getElementById("computer-score");
    const span_player = document.getElementById("player-score");

    let counter_computer = parseInt(span_computer.innerText);
    let counter_player = parseInt(span_player.innerText);

    let computerSelection = getComputerChoice();
    let result = playRound(computerSelection, playerSelection);
    if(result === "You lose!")
    {
        counter_computer++;
        span_computer.textContent = counter_computer;
        createDOM(result);
        document.getElementById('result').innerHTML = 'You lose!';
        console.log("You lose! " + "Player:" + counter_player + " Computer:" + counter_computer);
        if(counter_computer === 5)
        {
            alert("Computer won!");
            window.location.reload();
        }
    }
    else if(result === "You win!")
    {
        counter_player++;
        span_player.textContent = counter_player;
        createDOM(result);
        document.getElementById('result').innerHTML = 'You win!';
        console.log("You win! " + "Player:" + counter_player + " Computer:" + counter_computer);
        if(counter_player === 5)
        {
            alert("Player won!");
            window.location.reload();
        }
    }
    else if(result == "Tie!")
    {
        createDOM(result);
        document.getElementById('result').innerHTML = 'Tie!';
        console.log("Tie! " + "Player:" + counter_player + " Computer:" + counter_computer);
    }
    else
        return -1;
        //console.log("ERROR: game()");
}

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.id === 'results') displayResults(button.id);
        else game(button.id);
    });
    });


