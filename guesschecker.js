    const guessedwordletter = [];
    const hiddenwordletter = [];
    var no_of_guess;
    var no_of_guess_made = 0;
    var no_of_guess_good = 0;
    var no_of_guess_bad = 0;
	const setwords = (x) =>{
        document.getElementById("guessword").setAttribute("type","password");
        const word_to_array =  Array.from(x)
        for (let i=0; i < word_to_array.length; i++){
        	guessedwordletter[i] = "_";
            hiddenwordletter[i] = word_to_array[i];
        }
        no_of_guess = 2 + hiddenwordletter.length;
        document.getElementById("show").innerHTML = "It's a word of "+ hiddenwordletter.length + " letters and you have " + (1.5*hiddenwordletter.length) +" guesses to make.";
        document.getElementById("player2").classList.remove("class", "hide");
        document.getElementById("player1").classList.add("class", "hide");
        document.getElementById("showguess").classList.remove("class", "hide");
        document.getElementById("showguess").innerHTML = guessedwordletter.join('');
    }
    

    const checkguess = (x) =>{
        var goodguess = false;
        var moretoguess = false;
        if(no_of_guess_made < no_of_guess){
            no_of_guess_made +=1
            document.getElementById("progress").innerHTML = no_of_guess_made +" guesses out of "+ no_of_guess;
            for(let i=0; i < hiddenwordletter.length; i++){
                if(hiddenwordletter[i] == x){
                    guessedwordletter[i] = x;
                    goodguess = true
                }
                if(guessedwordletter[i] == "_" ){
                    moretoguess = true
                }
            }
            if(goodguess){

                document.getElementById("remark").innerHTML +="<br><br><img src='https://lloyd.funnelignition.com/wp-content/uploads/2022/09/check.png' width='30px'> Yay, You've Guessed Right";

                document.getElementById("showguess").innerHTML = guessedwordletter.join('');
                no_of_guess_good+=1

                if (!moretoguess){
                    document.getElementById("remark").innerHTML = "<br> Yay, You Won <br> With "+ no_of_guess +" guesses";
                    document.getElementById("player2").classList.add("class", "hide");
                    document.getElementById("result").classList.remove("class", "hide");
                    document.getElementById("result").setAttribute("src","https://lloyd.funnelignition.com/wp-content/uploads/2022/09/miggi-you-win.gif")
                }
            } else{

                document.getElementById("remark").innerHTML += "<br><br><img src='https://lloyd.funnelignition.com/wp-content/uploads/2022/09/wrong.png' width='30px'> Wrong Guess, You Can Do Better";
                no_of_guess_bad+=1
            }
        } 
        else{
            document.getElementById("remark").innerHTML = "You made <br><img src='https://lloyd.funnelignition.com/wp-content/uploads/2022/09/check.png' width='30px'> "+no_of_guess_good +" good guess <br><img src='https://lloyd.funnelignition.com/wp-content/uploads/2022/09/wrong.png' width='30px'> " + no_of_guess_bad +" bad ones";
            document.getElementById("player2").classList.add("class", "hide");
            document.getElementById("result").classList.remove("class", "hide");
            document.getElementById("result").setAttribute("src","https://lloyd.funnelignition.com/wp-content/uploads/2022/09/you-lose.gif")
        }
        
    } 