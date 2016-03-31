/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
var guessModel = function (min, max) {
    this.init(min, max);
    //this.generateNumber();
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
    }
};





/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */

var guessView = function () {
    this.initialize();
};

guessView.prototype = {
    /**
     * guess - conditionals to check for correct or incorrect number
     * @param guess
     * @returns {boolean}
     */
    button_element:null,
    guess: function(guess) {
        model.totalGuesses++;
        console.log(guess);
        console.log(model.randomNumber);
        console.log("Total Guesses = "+ model.totalGuesses);

        if (guess < model.randomNumber) {
            console.log("Too Low Bro");
            ($("#response_div").html("Too Low Bro!").fadeToggle(300).fadeIn(2000));
            return false;
        }
        else if (guess > model.randomNumber) {
            console.log("Too High Sly");
            ($("#response_div").html("Too High!").fadeToggle(300).fadeIn(2000));
            return false;
        }
        else {
            console.log("Congratulations, " + guess + " is correct!");
            ($("#response_div").html("You guessed it!").fadeToggle(3200).fadeOut(3500));
            this.reset();
            ($("#reset").html("The Number has been Reset! Guess Again!").fadeIn(3000).fadeOut(8000));
            return true;
        }
    },
    /**
     * numberCheck - checks to if user's guess is a number
     * @params none
     * @returns {boolean}
     */
    numberCheck: function() {
        var str = $('#guess_input').val();
        if (str && !isNaN(str)) {
            var int = parseInt(str, 10);
            this.guess(int);
        }else{
            console.log("Not a Number, Guess Again");
            ($("#response_div").html("Numbers only!").fadeOut(3000));
            return false;
        }
    },
    /**
     * reset - resets guesses and the random number and calls on generateNumber to insert a new random number
     */
    reset: function(){
        model.generateNumber();
        model.totalGuesses = 0;
        console.log("the total number of Guesses:" + model.totalGuesses);
        console.log("reset the RandomNumber to:" + model.randomNumber);
    },
    initialize: function (){
        this.button_element = $("#buttonid");
        this.button_element.click(function () {
            view.numberCheck();
        });
        $('#guess_input').keypress(function(e) {  // upon pressing the ENTER key the submit button is triggered
            if (e.which == 13) {
                $('#buttonid').click();
                $('#guess_input').val('');
            }
        });
    }
};

var model;
var view;


$(function () {  //doc ready
    model = new guessModel();
    view = new guessView();
});