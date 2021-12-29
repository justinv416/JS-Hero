const app = {}

//Array containing srcs for enemy images
app.enemyImgs = [
    './Assets/Enemies/knight.png',
    './Assets/Enemies/dragon.png',
    './Assets/Enemies/skeleton-warrior.png',
    './Assets/Enemies/grim-reaper.png',
    './Assets/Enemies/wizard.png'
];

//Array containing enemy taunts.
app.enemySpeech = [
    "Prepare to lose!",
    "Got any last words?",
    "I hope this is a challenge, for a change.",
    "It's too late to run!",
    "No mercy for you!",
    "You can still surrender.",
    "Yawn...."    
];

// Class constructors for player and enemies
// Class constructors maybe a little redundant might change in future. 
app.player = class Player {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
    }
}

app.currentPlayer = new app.player('', 100);

app.enemy = class Enemy {
    constructor(name, src) {
        this.name = name;
        this.src = src;
    };
};

// Array containing constructed enemies.
//May need to remove the array wrap/refactor at some point. 
app.enemies = [
    currentEnemy1 = new app.enemy('Knight', app.enemyImgs[0]),
    currentEnemy2 = new app.enemy('Dragon', app.enemyImgs[1]),
    currentEnemy3 = new app.enemy('Skeleton Warrior', app.enemyImgs[2]),
    currentEnemy4 = new app.enemy('Grim Reaper', app.enemyImgs[3]),
    currentEnemy5 = new app.enemy('Wizard', app.enemyImgs[4]),
];

//Sounds for game.
app.hitSound = new Howl({
    src: ['./Assets/Sounds/mixkit-martial-arts-fast-punch-2047.wav'],
    volume: 0.1,
    autoplay: false
});

app.takeHitSound = new Howl({
    src: ['./Assets/Sounds/mixkit-punch-with-a-hard-whistle-2050.wav'],
    volume: 0.1,
    autoplay: false
});

app.winSound = new Howl({
    src: ['./Assets/Sounds/mixkit-medieval-show-fanfare-announcement-226.wav'],
    volume: 0.02,
    autoplay: false
});

//Function to initialize game
app.init = function(){
    app.hideOnInit();
    app.gameControls();
    app.answerLogic($('.logic__question--button'));
    app.resetGame();
};

//Questions for game. 
app.questions = [
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
            a: 'var, const',
            b: 'let, const',
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
app.bossQuestions = [
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

//function to show name input container
app.nameInputStart = function(){
    $('.title__screen').hide();
    $('.name__form--container').show();
};

//Function for game introduction. 
app.gameIntro = function(){
    $('.name__form--container').hide();
    $('.introduction__container').show();
    const introduction = `Welcome ${$('#player__name--input').val()}, to win this game you must successfully answer 10 javascript questions and defeat the final boss. Are you ready?`;
    $('.introduction__message').text(introduction);
};

//Function to display the user name
app.nameOutput = function(name){
    $('.player__name--output').text(name)
};

//function to generate a random enemy, working but should refactor.
app.generateEnemy = function(currentEnemy){
    const enemyIndex = Math.floor(Math.random() * app.enemies.length);
    const speechIndex = Math.floor(Math.random() * app.enemySpeech.length);
    currentEnemy.attr('src', app.enemies[enemyIndex].src);
    $('.enemy__name--output').text(app.enemies[enemyIndex].name);
    $('.enemy__speech--output').text(app.enemySpeech[speechIndex]); 
    if(app.finalBoss) {
        $('.enemy__image').attr('src', './Assets/Enemies/final-boss.png');
        $('.enemy__name--output').text('Grand Dragon');
        $('.enemy__speech--output').text("You won't solve these");
        $('#final-boss-heading').show();
    }
};

//Function to display question
app.questionIndex = -1;
app.finalBoss = false;
app.displayQuestion = function(){
    app.questionIndex++;
    if (app.questionIndex < app.questions.length) {
        $('.logic__question--output').text(`${app.questions[app.questionIndex].question}`);
        $('#a').text(app.questions[app.questionIndex].options.a);
        $('#b').text(app.questions[app.questionIndex].options.b);
        $('#c').text(app.questions[app.questionIndex].options.c);
    } else if (app.questionIndex === app.questions.length) {
        app.finalBoss = true;
        if(app.finalBoss) {
            app.questionIndex = 0;
            app.displayBossQuestions();
        };
    };
};

//Function to start game.
app.startGame = function(){
    $('.title__screen').hide();
    $('.name__form--container').hide();
    $('.introduction__container').hide();
    $('.logic__container').show();
    $('.enemy__container').show();
    $('.player__hp--output').text(app.currentPlayer.hp);
    $('#enemy-speech').text(currentEnemy1.taunt);
    app.nameOutput($('#player__name--input').val());
    app.resetGame();
    app.runTimeInterval();
    app.displayQuestion();
    app.generateEnemy($('.enemy__image'));
}

// Function to generate next enemy, 
// with a setTimeout to give enough time for doDamage function to trigger properly.
app.generateNextEnemy = function(){
    setTimeout(function(){
        app.generateEnemy($('.enemy__image'));
    }, 600);
};

//Time for questions 
app.time = 60;
//Function that runs setinterval
app.timeInterval;
app.runTimeInterval = function(){
    app.timeInterval = setInterval(app.questionTime, 1000);
};

//Function that clears the time countdown
app.clearTimeInterval = function(){
    clearInterval(app.timeInterval);
};

//Function for question timer. 
app.questionTime = function(){
    app.time--;
    $('.player__time--output').text(app.time);
    if(app.time <= 0) {
        app.clearTimeInterval();
        app.takeHit();
        app.displayQuestion();
        app.time = 60;
        app.runTimeInterval();
        app.gameOver();
    };
};

//Function to take 
app.takeHit = function(){
    app.currentPlayer.hp -= 25;
    $('.player__hp--output').text(app.currentPlayer.hp);
    $('#damage-overlay').addClass('damage');
    app.takeHitSound.play();
    setTimeout(function() {
        $('#damage-overlay').removeClass('damage');
    }, 400);
    if (app.currentPlayer.hp === 0) {
        app.currentPlayer.hp === 0;
    };
}

//Function to trigger animation to do damage to enemy. 
app.doDamage = function(currentEnemy){
    currentEnemy.addClass('shake');
    setTimeout(function() {
        currentEnemy.removeClass('shake');
    }, 400);
};

//function to indicate game over
app.gameOver = function(){
    if (app.currentPlayer.hp === 0) {
        $('.gameOver__screen').show();
        $('.logic__container').hide();
        $('.enemy__container').hide();
    };
};

//Function to display game win screen.
app.gameWon = function(){
    $('.logic__container').hide();
    $('.enemy__container').hide();
    $('.gameWin__message').text(`Congratulations ${app.currentPlayer.name}! You have successfully 
    defeated the dragon and won the game, please play again!`); 
    $('.gameWin__screen').show();
    app.winSound.play();
};

//Function to display boss questions
app.displayBossQuestions = function(){
    $('.logic__question--output').text(`${app.bossQuestions[app.questionIndex].question}`);
    $('#a').text(app.bossQuestions[app.questionIndex].options.a);
    $('#b').text(app.bossQuestions[app.questionIndex].options.b);
    $('#c').text(app.bossQuestions[app.questionIndex].options.c);
}

//Binds a function to each option button to check if answer is correct/incorrect
app.answerLogic = function(button, buttonId){
    button.click(function() {
    //Should change to dataset instead of id in the future
    buttonId = ($(this).attr('id'));
    if (buttonId === app.questions[app.questionIndex].answer && !app.finalBoss) {
        $('.player__answer--output').text('correct');
        $('.player__answer--output').css('color', 'lawngreen');
        app.time = 60;
        app.doDamage($('.enemy__image'));
        app.displayQuestion();
        app.generateNextEnemy();
        app.clearTimeInterval();
        app.runTimeInterval();
        app.hitSound.play();
    } else if (app.finalBoss && buttonId === app.bossQuestions[app.questionIndex].answer) {
        app.questionIndex++;
        app.doDamage($('.enemy__image'));
        app.hitSound.play();
        if (app.questionIndex === app.bossQuestions.length){
            app.finalBoss = false;
            app.gameWon();
            app.clearTimeInterval();
        } else {
            app.displayBossQuestions();
        };
        } else {
            $('.player__answer--output').text('incorrect');
            $('.player__answer--output').css('color', 'red');
            app.takeHit();
            app.time = 60;
            app.clearTimeInterval();
            app.runTimeInterval();
            app.gameOver();
        };
    });
};

//function to reset game 
app.returnToTitle = function(){
    $('.title__screen').show();
    app.init();
}

// Various ui controls. 
app.gameControls = function(){
    $('#title__screen--button').on('click', app.nameInputStart);
    $('#player__name--submit').on('click', app.gameIntro);
    $('.introduction__button').on('click', app.startGame)
    $('.fa-home').on('click', app.returnToTitle);
    $('.replay__button').on('click', app.returnToTitle);
    $('.return__home').on('click', app.returnToTitle);
}

app.resetGame = function(){
    app.questionIndex = -1;
    app.time = 60;
    app.clearTimeInterval();
    app.currentPlayer.hp = 100;
    app.finalBoss = false;
    $('.player__hp--output').text(app.currentPlayer.hp);
    $('player__answer--output').text('');
}

app.hideOnInit = function() {
    $('.name__form--container').hide();
    $('.enemy__container').hide();
    $('.logic__container').hide();
    $('.gameOver__screen').hide();
    $('.gameWin__screen').hide();
    $('#final-boss-heading').hide();
    $('.introduction__container').hide();
}

app.init();