document.addEventListener("DOMContentLoaded", function() {

    // stores if we should commence playing or not
    var resetCommence = true, escCommence = true;

    // creates game
    var game = new ConnectFour(document.documentElement.clientWidth, document.documentElement.clientWidth / 1.75 * 0.2);

    // fixes hitboxes for whenever the window is resized
    resizeHitboxes(); window.addEventListener('resize', resizeHitboxes);

    // detects clicks on hitboxes
    Array.from(document.getElementsByClassName("clicker")).forEach((element, index) => {
        element.addEventListener("mousedown", function() {
            play(index);
        })
    });

    // defines the possible moves
    let moves = ['1', '2', '3', '4', '5', '6', '7'];
    let indecesMoveable = [true, true, true, true, true, true, true];

    // detects keyboard presses
    document.addEventListener("keypress", function(event) {

        // gets the index
        let index = moves.findIndex((move) => {
            if (move == event.key) {
                return true;
            }
        });

        // checks if the keypress is a 'r' (reset) or 'e' (close instructions)
        if ((event.key === 'r' || event.key === 'R') && escCommence) {
            resetGame();
        } else if (event.key === 'e' || event.key === 'E') {
            hideInstructions();
        }

        // plays if the index is valid
        else if (index !== -1 && indecesMoveable[index]) {
            indecesMoveable[index] = false;
            play(index);
        }
    });

    // listens for keyb oard lift to re-allow keyboard presses on the move
    document.addEventListener("keyup", function(event) {

        // gets the index
        let index = moves.findIndex((move) => {
            if (move == event.key) {
                return true;
            }
        });

        // checks if index is illegal
        if (index !== -1) {
            indecesMoveable[index] = true;  // makes that number moveable again
        }

    });

    // listens for resetting game
    let resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
        resetGame();
    });
    
    // detects for into button being pressed
    document.getElementById("info").addEventListener("click", function() {

        // times out game
        escCommence = false;

        // animates the div showing
        let infoText = document.querySelector(".rules");
        infoText.removeAttribute("hidden");
        anime({
            targets: infoText,
            filter: "opacity(100%)",
            duration: 150,
            easing: "linear"
        });

        // animates background blur
        let dimmer = document.querySelector(".screen-dimmer");
        dimmer.removeAttribute("hidden");
        anime({
            targets: dimmer,
            filter: "opacity(75%)",
            duration: 150,
            easing: "linear"
        });

    });

    // detects for x-button being pressed
    document.querySelector(".x-button").addEventListener("click", function() {

        // un-hides background and removes rules page
        hideInstructions();

    });

    function play(colNum) {
        
        // quits if we cannot commence with a move
        if (!resetCommence || !escCommence) {
            return;
        }
            
        // plays the piece at the index of the click
        game.placePiece(colNum);

        // swaps the piece in the turn display
        game.swapTurn();
        
        // waits for animation
        setTimeout(() => {
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
            game.resize(screenWidth, screenWidth / 1.75 * 0.2);

        })
    }   

    // hides instructions
    function hideInstructions() {

        // quits if not commenceable
        if (!resetCommence) {
            return;
        }
        
        // resets opacity and hides instructions
        document.querySelector(".rules").style.filter = "opacity(0%)";
        document.querySelector(".rules").setAttribute("hidden", "hidden");
        document.querySelector(".screen-dimmer").style.filter = "opacity(0%)";
        document.querySelector(".screen-dimmer").setAttribute("hidden", "hidden");

        // allows playing 
        escCommence = true;
    }

    // resets the game
    function resetGame() {

        // returns if another reset is happening
        if (!resetCommence) {
            return;
        }

        // times out game
        resetCommence = false;

        // resets rotation
        resetButton.style.transform = "rotate(0deg)";
        
        // animates button rotating
        anime({
            targets: resetButton,
            rotate: "360deg", 
            easing: "spring(1, 80, 10, 0)",
        });

        // animates images leaving
        let time = 1000;
        anime({
            targets: document.getElementsByClassName("piece"),
            top: {
                value: `+=${document.documentElement.clientHeight}px`
            },
            easing: "easeInQuad",
            duration: time
        })

        // clears images and allows playing
        setTimeout(() => {
            document.getElementById("imgs").innerHTML = null;
            resetCommence = true;
        }, time);
        
        // creates new game 
        game = new ConnectFour(document.documentElement.clientWidth, document.documentElement.clientWidth / 1.75 * 0.2);
    }
});