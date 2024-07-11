{
    // console.log("hello world")

    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    function getComputerChoice(){
        let x = ["rock", "paper", "scissor"];
        // console.log(getRandomInt(0,2))
        return x[getRandomInt(0,2)];
    }

    function getHumanChoice(){
        let input = prompt("rock, paper, or scissors?")
        return input.toLowerCase();
    }

    function playRound(humanScore, computerScore){
        const cChoice = getComputerChoice();
        const hChoice = getHumanChoice();
        console.log("Computer chose: " + cChoice);
        console.log("Human chose: " + hChoice);

        if(cChoice == hChoice){
            console.log("Tied. Play again to determine winner.")
            playRound(humanScore, computerScore);
        }
        else if(cChoice == "paper" && hChoice == "rock" || cChoice == "rock" && hChoice == "scissor" || cChoice =="scissor" && hChoice == "paper"){
            computerScore += 1;
            console.log("Computer won!");
            console.log("Human Score: " + humanScore);
            console.log("Computer Score: " + computerScore);
        }
        else{
            humanScore += 1;
            console.log("Human won!");
            console.log("Human Score: " + humanScore);
            console.log("Computer Score: " + computerScore);
        }

        return humanScore, computerScore;
    }

    // console.log(getComputerChoice());
    // console.log(getHumanChoice());

    let humanScore = 0;
    let computerScore = 0;
    // console.log(humanScore)

    humanScore, computerScore = playRound(humanScore, computerScore)
}