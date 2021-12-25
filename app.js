//Array containing srcs for enemy images
const enemyImgs = [
    './Assets/Enemies/knight.png',
    './Assets/Enemies/dragon.png',
    './Assets/Enemies/skeleton-warrior.png',
    './Assets/Enemies/grim-reaper.png',
    './Assets/Enemies/wizard.png'
];

//Array containing enemy taunts.
const enemySpeech = [
    "Prepare to lose!",
    "Got any last words?",
    "I hope this is a challenge, for a change.",
    "It's too late to run!",
    "No mercy for you!",
    "You can still surrender.",
    "Yawn...."    
];

// Class contructors for player and enemies
// Class contructors maybe a little redundant might change in future. 
class Player {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
    }
}

currentPlayer = new Player('', 100);

class Enemy {
    constructor(name, src) {
        this.name = name;
        this.src = src;
    };
};

// Array containing constructed enemies.
//May need to remove the array wrap/refactor at some point. 
const enemies = [
    currentEnemy1 = new Enemy('Knight', enemyImgs[0]),
    currentEnemy2 = new Enemy('Dragon', enemyImgs[1]),
    currentEnemy3 = new Enemy('Skeleton Warrior', enemyImgs[2]),
    currentEnemy4 = new Enemy('Grim Reaper', enemyImgs[3]),
    currentEnemy5 = new Enemy('Wizard', enemyImgs[4]),
];

//Sounds for game.
const hitSound = new Howl({
    src: ['./Assets/Sounds/mixkit-martial-arts-fast-punch-2047.wav'],
    volume: 0.1,
    autoplay: false
});

const takeHitSound = new Howl({
    src: ['./Assets/Sounds/mixkit-punch-with-a-hard-whistle-2050.wav'],
    volume: 0.1,
    autoplay: false
});

const winSound = new Howl({
    src: ['./Assets/Sounds/mixkit-medieval-show-fanfare-announcement-226.wav'],
    volume: 0.02,
    autoplay: false
});


//Questions for game. 
//Should store in a seperate file at some point, and either import/fetch. 
const questions = [
    {
        question: 'What is the correct syntax for a template literal?',
        options: {
            a: '${}',
            b: '$()',
            c: '$[]'
        },
        answer: 'a'
    },
    {
        question: 'What are the correct ways to declare a variable in javascript?',
        options: {
            a: 'let, const',
            b: 'var, let, const',
            c: 'bleh, blah, boo'
        },
        answer: 'b'
    },
    { 
        question: "typeof 'lemon'",
        options: {
            a: 'fruit',
            b: 'string',
            c: 'lemon !== fruit'
        },
        answer: 'b'
    },
    {
        question: "(2 * 10) + 10 * (2 * 2) - 10",
        options: {
            a: 'Im bad at math',
            b: '60',
            c: '50'
        },
        answer: 'c'
    },
    {
        question: "What will this print to the console? for(let i = 0; i < 5; i++){console.log(i)}",
        options: {
            a: 'undefined',
            b: '0,1,2,3,4',
            c: '0,1,2,3,4,5'
        },
        answer: 'b'
    },
    {
        question: "Where is the correct way to insert the <script> tag?",
        options: {
            a: '<head> and <body>',
            b: '<body>',
            c: '<feet>'
        },
        answer: 'a'
    },
    {
        question: "How do you alert 'Hello World'?",
        options: {
            a: "alert('Hello World');",
            b: "alert('hello world');",
            c: "ALERT('HI WORLD!');"
        },
        answer: 'a'
    },
    {
        question: "How do you call a function named 'myFunction'",
        options: {
            a: "1-800-myFunction",
            b: "myFunction();",
            c: "myFunction;"
        },
        answer: 'b'
    },
    {
        question: "how do you get the second number of this array: let arr = [1,2,3,4,5]",
        options: {
            a: "arr[two];",
            b: "[2];",
            c: "arr[1];"
        },
        answer: 'c'
    },
    {
        question: "Which of the following would declare an object literal called 'pizza'",
        options: {
            a: "const pizza = {};",
            b: "let object literally = pizza;",
            c: "let pizza = [];"
        },
        answer: 'a'
    },
];

//Final boss specific questions. 
const bossQuestions = [
    {
        question: "Boolean('pizza' < 'salad')",
        options: {
            a: "false",
            b: "true",
            c: "this is a trick question"
        },
        answer: 'b'
    },
    {
        question: "const pants = ['jeans', 'sweats']; pants.length = 0; pants[0]? ",
        options: {
            a: "jeans",
            b: "sweats",
            c: "undefined"
        },
        answer: 'c'
    },
    {
        question: "function getThis() {console.log(this)}; What will 'this' log?",
        options: {
            a: "The 'window' object",
            b: "'this'",
            c: "'that'"
        },
        answer: 'a'
    },
    {
        question: "What will the following log? for(let i = 0; i < 3; i++);{console.log(i)}",
        options: {
            a: "1,2,3",
            b: "0,1,2",
            c: "An error"
        },
        answer: 'c'
    },
];

//Function to initialize game
function init() {
    $('.name__form--container').hide();
    $('#enemy-container').hide();
    $('#logic-container').hide();
    $('#game-over-screen').hide();
    $('#home-icon').hide();
    $('#game-win').hide();
    $('#final-boss-heading').hide();
    $('.introduction__container').hide();
};
init();

//function to show name input container
function nameInputStart() {
    $('.title__screen--heroes').hide();
    $('#header-btn-container').hide();
    $('.name__form--container').show();
    $('#home-icon').show();
};
//show name input on click
$('#start-btn').on('click', nameInputStart);

//Function for game introduction. 
function gameIntro() {
    //Maybe put this message in html instead add use a span for name.
    $('.name__form--container').hide();
    $('.introduction__container').show();
    const introduction = `Welcome ${$('#name-input').val()}, to win this game you must successfully answer 10 javascript questions and defeat the final boss. Are you ready?`;
    $('.introduction__message').text(introduction);
};
//Call and display game intro after name input submit. 
$('#name-submit').on('click', gameIntro);

//Function to display the user name
function nameOutput() {
    currentPlayer.name = $('#name-input').val();
    $('#player-name-output').text(currentPlayer.name)
};

//function to generate a random enemy, working but should refactor.
//Not sure if im using parameters correctly, should look into it at some point. 
const currentEnemy = $('.enemy');
function generateEnemy() {
    const enemyIndex = Math.floor(Math.random() * enemies.length);
    const speechIndex = Math.floor(Math.random() * enemySpeech.length);
    currentEnemy.attr('src', enemies[enemyIndex].src);
    $('#enemy-name-output').text(enemies[enemyIndex].name);
    $('#enemy-speech-output').text(enemySpeech[speechIndex]); 
    if(finalBoss) {
        $('.enemy').attr('src', './Assets/Enemies/final-boss.png');
        $('#enemy-name-output').text('Grand Dragon');
        $('#enemy-speech-output').text("You won't solve these");
        $('#final-boss-heading').show();
    }
};

// Function to generate next enemy, 
// with a settimeout to give enough time for doDamage function to trigger properly.
function generateNextEnemy() {
    setTimeout(function(){
        generateEnemy();
    }, 600);
};

//Function to start game.
function startGame() {
    $('#title__screen').hide();
    $('.name__form--container').hide();
    $('.introduction__container').hide();
    $('#logic-container').show();
    $('#enemy-container').show();
    $('#hp-output').text(currentPlayer.hp);
    $('#enemy-speech').text(currentEnemy1.taunt);
    nameOutput();
    runTimeInterval();
    displayQuestion();
    generateEnemy();
}
//Submit name and start game
$('.introduction__button').on('click', startGame)

//Time for questions 
//Need to rename the following to be more semantic
let time = 60;
function questionTime() {
    time--;
    $('#time-output').text(time)
    if(time <= 0) {
        clearTimeInterval();
        takeHit();
        displayQuestion();
        time = 60;
        runTimeInterval();
        gameOver();
    }
};

//Funtion that clears the time countdown
function clearTimeInterval() {
    clearInterval(timeinterval);
};

//Function that runs setinterval
let timeinterval;
function runTimeInterval() {
    timeinterval = setInterval(questionTime, 1000);
};

//function to reset game 
function returnToTitle() {
    $('#title__screen').show();
    $('#header-btn-container').show();
    $('.title__screen--heroes').show();
    $('#logic-container').hide();
    $('#hp-output').text(currentPlayer.hp);
    $('#answer-output').text('');
    currentPlayer.hp = 100;
    time = 60;
    questionIndex = -1;
    finalBoss = false;
    clearTimeInterval();
    init();
}
//Runs above function on click
$('#home-icon').click(returnToTitle);
$('#replay').on('click', returnToTitle);
$('#return-home').on('click', returnToTitle);

//Function to take 
function takeHit() {
    currentPlayer.hp -= 25;
    $('#hp-output').text(currentPlayer.hp);
    $('#damage-overlay').addClass('damage');
    takeHitSound.play();
    setTimeout(function() {
        $('#damage-overlay').removeClass('damage');
    }, 400);
    if (currentPlayer.hp === 0) {
        currentPlayer.hp === 0;
    };
}

//Function to trigger animation to do damage to enemy. 
//Currently buggy, need to delay the generate enemy to give more time for animation to trigger.
function doDamage() {
    currentEnemy.addClass('shake');
    setTimeout(function() {
        currentEnemy.removeClass('shake');
    }, 400);
};

//function to indicate game over
function gameOver() {
    if (currentPlayer.hp === 0) {
        $('#game-over-screen').show();
        $('#logic-container').hide();
        $('#enemy-container').hide();
    };
};

//Function to display game win screen.
function gameWon() {
    $('#logic-container').hide();
    $('#enemy-container').hide();
    $('#game-win-message').text(`Congratulations ${currentPlayer.name}! You have successfully 
    defeated the dragon and won the game, please play again!`); 
    $('#game-win').show();
    winSound.play();
};

//Function to display boss questions
function displayBossQuestions() {
    $('#question-output').text(`${bossQuestions[questionIndex].question}`);
    $('#a').text(bossQuestions[questionIndex].options.a);
    $('#b').text(bossQuestions[questionIndex].options.b);
    $('#c').text(bossQuestions[questionIndex].options.c);
}

//Function to display question
let questionIndex = -1;
let finalBoss = false;
function displayQuestion() {
    questionIndex++;
    if (questionIndex < questions.length) {
        $('#question-output').text(`${questions[questionIndex].question}`);
        $('#a').text(questions[questionIndex].options.a);
        $('#b').text(questions[questionIndex].options.b);
        $('#c').text(questions[questionIndex].options.c);
    } else if (questionIndex === questions.length) {
        finalBoss = true;
        if(finalBoss) {
            questionIndex = 0;
            displayBossQuestions();
        };
    };
};

//Binds a function to each option button to check if answer is correct/incorrect
const optionBtn = $('.option-btn');
optionBtn.click(function() {
    //Should change to dataset instead of id in the future
    let btnid = ($(this).attr('id'));
    if (btnid === questions[questionIndex].answer && !finalBoss) {
        $('#answer-output').text('correct');
        $('#answer-output').css('color', 'lawngreen');
        time = 60;
        doDamage();
        displayQuestion();
        generateNextEnemy();
        clearTimeInterval();
        runTimeInterval();
        hitSound.play();
    } else if (finalBoss && btnid === bossQuestions[questionIndex].answer) {
        questionIndex++;
        doDamage();
        hitSound.play();
        if (questionIndex === bossQuestions.length){
            finalBoss = false;
            gameWon();
            clearTimeInterval();
        } else {
            displayBossQuestions();
        };
    } else {
        $('#answer-output').text('incorrect');
        $('#answer-output').css('color', 'red');
        takeHit();
        time = 60;
        clearTimeInterval();
        runTimeInterval();
        gameOver();
    };
});

/* Notes:

There is a slight bug where sometimes when inputting name will return to title screen, please ignore and try again, will work on subsequent tries. 

*/