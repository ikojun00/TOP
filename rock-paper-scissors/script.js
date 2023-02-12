function getComputerChoice()
{
    let myArray = ['rock', 'scissors', 'paper'];
    let randomValue = myArray[Math.floor(Math.random() * myArray.length)];
    return randomValue;
}

function playRound(computerSelection) 
{
    let playerSelection = prompt("What's your sign?").toLowerCase();

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
        alert("Wrong input!");
}

function game()
{
    let counter_computer = 0;
    let counter_player = 0;
    while(counter_computer<5 && counter_player<5)
    {
        let computerSelection = getComputerChoice();
        let result = playRound(computerSelection);
        if(result === "You lose!")
        {
            counter_computer++;
            console.log("You lose! " + "Player:" + counter_player + " Computer:" + counter_computer);
        }
        else if(result === "You win!")
        {
            counter_player++;
            console.log("You win! " + "Player:" + counter_player + " Computer:" + counter_computer);
        }
        else
        {
            console.log("Tie! " + "Player:" + counter_player + " Computer:" + counter_computer);
        }
    }
    if(counter_computer === 5)
        return "Computer won!";
    else
        return "Player won!"
}

console.log(game());