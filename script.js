/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
var guessModel = function (min, max) {
    this.init(min, max);
};

guessModel.prototype = {

    totalGuesses: 0,

    minNumber: 1,

    maxNumber: 10,

    randomNumber: null,

    /**
     * init - starts the random number and logs max and min number
     * @param min
     * @param max
     */
    init: function (min, max) {

        this.loadSound();
        this.generateNumber();
        console.log(this.minNumber, this.maxNumber);
    },
    /**
     * generateNumber - computes the random number with minNumber and maxNumber
     * @params none
     */
    generateNumber: function () {
        this.randomNumber = Math.floor(this.minNumber + (Math.random() * this.maxNumber));
        console.log("Number Generated:" + this.randomNumber);
    },

    loadSound: function () {
        this.sound = new Audio('44magnum.mp3');
        this.quoteSound = new Audio('day.wav');
        this.winSound = new Audio('hail.wav');
        this.lowSound = new Audio('ricochet.wav');
        this.highSound = new Audio('ricochet2.wav');
    }
};




/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */

var guessView = function (targ) {
    this.initialize(targ);
};

guessView.prototype = {
    button_element: null,

    targets: 10,
    /**
     * guess - conditionals to check for correct or incorrect number
     * @param guess
     * @returns {boolean}
     */

    guess: function (guess) {
        model.totalGuesses++;
        console.log(guess);
        console.log(model.randomNumber);
        console.log("Total Guesses = " + model.totalGuesses);

        if (guess < model.randomNumber) {
            model.lowSound.play();
            console.log("Too Low Bro");
            ($("#response_div").html("Too Low Bro!").fadeToggle(300).fadeIn(2000));
            return false;
        }
        else if (guess > model.randomNumber) {
            model.highSound.play();
            console.log("Too High Sly");
            ($("#response_div").html("Too High!").fadeToggle(300).fadeIn(2000));
            return false;
        }
        else {
            model.winSound.play();
            $('#guess_input').val('');
            console.log("Congratulations, " + guess + " is correct!");
            ($("#response_div").html("You guessed it!").fadeToggle(3000).fadeOut(3500));
                this.reset();
            ($("#reset").html("Number Reset! Guess Again!").fadeIn(3000).fadeOut(8000));
            return true;
        }
    },
    /**
     * numberCheck - checks to if user's guess is a number
     * @params none
     * @returns {boolean}
     */
    numberCheck: function () {
        var str = $('#guess_input').val();
        if (str && !isNaN(str)) {
            var int = parseInt(str, 10);
            this.guess(int);
        } else {
            console.log("Not a Number, Guess Again");
            ($("#response_div").html("Numbers only!").fadeOut(3000));
            return false;
        }
    },
    /**
     * reset - resets guesses and the random number and calls on generateNumber to insert a new random number
     */
    reset: function () {
        model.generateNumber();
        model.totalGuesses = 0;
        console.log("the total number of Guesses:" + model.totalGuesses);
        console.log("reset the RandomNumber to:" + model.randomNumber);
    },
    /**
     * initialize - calls functions essential for the game
     *  @param none
     */
    initialize: function (targ) {
        this.createTargets(this.targets);
        this.shootTarg();
        this.button_element = $("#buttonid");
        this.button_element.click(function () {
            view.numberCheck();
            //$('#guess_input').val('');

        });
        $('#guess_input').keypress(function (e) {  // upon pressing the ENTER key the submit button is triggered
            if (e.which == 13) {
                $('#buttonid').click();
                $('#guess_input').val('');
            }
        });
    },
    /**
     * createTargets - dynamically creates the shooting range targets
     * @param num
     */
    createTargets: function (targ) {
        var arr = [];
        for (var i = 0; i < targ; i++) {
            arr.push(targ);
            $('#targets').append('<div class="box col-xs-1 col-md-1" id="box' + i + '">' + arr.length + '</div>');
        }
    },
    /**
     * shootTarg - user clicks a target and a number input for the guess is registered
     * @param none
     */
    shootTarg: function () {
        $('#box0').click(function () {
            $('#guess_input').val(1);
            $('#buttonid').click();
        });

        $('#box1').click(function (){
            $('#guess_input').val(2);
            $('#buttonid').click();
        });
        $('#box2').click(function () {
            $('#guess_input').val(3);
            $('#buttonid').click();
        });
        $('#box3').click(function (){
            $('#guess_input').val(4);
            $('#buttonid').click();
        });
        $('#box4').click(function () {
            $('#guess_input').val(5);
            $('#buttonid').click();
        });
        $('#box5').click(function (){
            $('#guess_input').val(6);
            $('#buttonid').click();
        });
        $('#box6').click(function () {
            $('#guess_input').val(7);
            $('#buttonid').click();
        });
        $('#box7').click(function (){
            $('#guess_input').val(8);
            $('#buttonid').click();
        });
        $('#box8').click(function () {
            $('#guess_input').val(9);
            $('#buttonid').click();
        });
        $('#box9').click(function (){
            $('#guess_input').val(10);
            $('#buttonid').click();
        });

    }
};


//global variables
var model;
var view;
//var x = 10;  //set number of targets to 10;

$(function () {  //doc ready
    model = new guessModel();
    view = new guessView();
    $('#targets').click(function () {
        model.sound.play();
        model.sound.currentTime=0;
    })
    model.quoteSound.play();

});