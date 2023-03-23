document.addEventListener("DOMContentLoaded", function() {

    // creates game
    var game = new ConnectFour(document.documentElement.clientWidth);

    // fixes hitboxes for whenever the window is resized
    resizeHitboxes(); window.addEventListener('resize', resizeHitboxes);

    // detects clicks on hitboxes
    Array.from(document.getElementsByClassName("clicker")).forEach((element, index) => {
        element.addEventListener("mousedown", function() {
            play(index);
        })
    });

    // detects keyboard presses
    document.addEventListener("keypress", function(event) {
        // defines the possible moves
        let moves = ['1', '2', '3', '4', '5', '6', '7'];

        // gets the index
        let index = moves.findIndex((move) => {
            if (move == event.key) {
                return true;
            }
        });

        // plays if the index is valid
        if (index !== -1) {
            play(index);
        }
    });

    function play(colNum) {
        // defines height and width
        let width = document.documentElement.clientWidth;
            
        // plays the piece at the index of the click
        game.placePiece(colNum);
        
        // waits for animation
        setTimeout(() => {
            game.display(width);
            game.checkWin();
        }, game.time);
    }

    // changes hitboxes when screen resized
    function resizeHitboxes() {

        // defines display constants based on images and clicker hitboxes
        let screenWidth = document.documentElement.clientWidth;
        let clickerWidth = screenWidth / 1.75 * 0.1115;
        let clickerMargin = screenWidth / 125;

        // applies display to every clicker
        Array.from(document.getElementsByClassName("clicker")).forEach((element, index) => {

            // adjusts left position so they are not right on top of each other
            element.style.left = String(index * clickerWidth + clickerMargin) + "px";

            // adjusts the position of the images
            game.resize(screenWidth);

        })
    }   
});