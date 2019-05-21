        /*
        * Create a list that holds all of your cards
        */
    var interval = 0 ;
    function timing (){
    date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0, 0);
    interval = setInterval(function () {
        document.getElementById("h").innerHTML = date.getHours();
        document.getElementById("m").innerHTML = date.getMinutes();
        document.getElementById("s").innerHTML = date.getSeconds();
        date.setTime(date.getTime() + 1000);
    }, 1000);
        }
    timing();
        var movement  = 0;
        var moveElement = document.querySelector('.moves');

        var cardClass =['fa-diamond','fa-diamond'
                        ,'fa-anchor','fa-anchor'
                        ,'fa-bolt' ,'fa-bolt'
                        ,'fa-bicycle','fa-bicycle'
                        ,'fa-bomb','fa-bomb'
                        ,'fa-leaf','fa-leaf'
                        ,'fa-paper-plane-o','fa-paper-plane-o'
                        ,'fa-cube','fa-cube'
        ];
        function cardGenerateHTML(card){
            return `<li class="card" data-cardid=" ${card} "> <i class="fa ${card} "></i></li>` ;

        }
        
        function startGame(){
            var deck = document.querySelector('.deck');
            var cardTag = shuffle(cardClass).map(function(card){
                return cardGenerateHTML(card);
            });
            deck.innerHTML = cardTag.join('');
        }
        startGame();
        proceduar();
        let restart = document.querySelector('.restart');  
        restart.addEventListener('click',function(){
        movement=0;
        moveElement.innerHTML = movement;
        startGame();
        proceduar();
        timing();
        });  
        function proceduar(){
        var allCards = document.querySelectorAll('.card');
        let stars = document.querySelectorAll('.fa-star');
        var openning = [];
        var targetCardIndex =[];
        let matches = 0;
        let starsNum = 3;
        allCards.forEach(function(card){
                        card.addEventListener('click',function(){
                                            openning.push(card);
                                            card.classList.add('open','show'); 
                                            let cardIndex = Array.from(allCards).indexOf(card) ;
                                            targetCardIndex.push(cardIndex);
                                            if(openning.length>=2){
                                                movement++;

                                                if(movement==13){
                                                    stars[0].parentNode.removeChild(stars[0]);
                                                    starsNum--;
                                                }else{
                                                    if(movement==18){
                                                        stars[1].parentNode.removeChild(stars[1]);
                                                        starsNum--;
                                                    }
                                                }
                                                moveElement.innerHTML = movement;
                                                if(targetCardIndex[0] != targetCardIndex[1] &&openning[0].dataset.cardid == openning[1].dataset.cardid ){
                                                    matches++;
                                                    if(matches == 1){
                                                        let hour = document.getElementById("h").innerHTML;
                                                        let min = document.getElementById("m").innerHTML;
                                                        let second = document.getElementById("s").innerHTML;
                                                        let timervalue = ` with Time ${hour}:${min}:${second}`;
                                                        clearInterval(interval);
                                                        document.body.innerHTML="";
                                                        let total = document.createElement('div');
                                                        let largeDiv = document.createElement('div');
                                                        largeDiv.style.fontSize="50px";
                                                        largeDiv.style.margin = "40% 20%";
                                                        largeDiv.innerHTML = "Congratulation You Won !!";
                                                        
                                                        total.style.fontSize="40%";
                                                        total.style.margin = "3% 20%";
                                                        total.innerHTML = `with ${movement} and star ${starsNum}  ${timervalue}`;
                                                        largeDiv.appendChild(total);

                                                        var button = document.createElement("input");
                                                        button.type = "button";
                                                        button.style.backgroundColor = '#00e68a';                                                ;
                                                        button.style.margin = '15% 17%';
                                                        button.style.fontSize="30px"
                                                        button.value = "play agin";
                                                        button.onclick = function (){
                                                            window.location.reload();
                                                        };
                                                        total.appendChild(button);
                                                        document.body.append( largeDiv);
                                                    }
                                                    openning[0].classList.add('open');
                                                    openning[0].classList.add('show');
                                                    openning[0].classList.add('match');

                                                    openning[1].classList.add('match');
                                                    openning[1].classList.add('open');
                                                    openning[1].classList.add('show');
                                                    openning.length = 0;
                                                    targetCardIndex.length = 0;
                                                    
                                                    }else{
                                                    setTimeout(function(){ 
                                                        openning.forEach( function(card){
                                                        card.classList.remove('open','show');
                                                        });
                                                        openning.length=0;
                                                        targetCardIndex.length = 0;
                                                    },1000);
                                                }
                                            }
                                                    });});

                                                
                                                }   
                                                
                                                
                                                
        /*
        * Display the cards on the page
        *   - shuffle the list of cards using the provided "shuffle" method below
        *   - loop through each card and create its HTML
        *   - add each card's HTML to the page
        */

        // Shuffle function from http://stackoverflow.com/a/2450976
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
        /*
        * set up the event listener for a card. If a card is clicked:
        *  - display the card's symbol (put this functionality in another function that you call from this one)
        *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
        *  - if the list already has another card, check to see if the two cards match
        *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
        *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
        *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
        *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
        */
