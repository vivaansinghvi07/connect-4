// class to create a game object
class ConnectFour {

    static FLIPTIME = 100;

    constructor(width, turnImageWidth) {

        // creates array of pieces
        this.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];

        // defines the animation that needs to be done
        this.animation = {startX: -1, destX: -1, startY: -1, destY: -1};

        // defines the turn
        this.redTurn = true;
        
        // gets the width of the screen
        this.width = width;

        // sets time of animation
        this.time = 0;

        // stores if the game is over
        this.over = false;

        // sets the width of the turn image
        this.turnImageWidth = turnImageWidth;

        // sets the image
        this.swapTurn();
    
    }

    // checks for a win
    checkWin() {
        // horizontal check
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 4; x++) {
                if (Math.abs(this.board[y][x] + this.board[y][x+1] + this.board[y][x+2] + this.board[y][x+3]) === 4) {
                    this.highlight(y, x, 0, 1);
                }
            }
        }

        // vertical check
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 3; y++) {
                if (Math.abs(this.board[y][x] + this.board[y+1][x] + this.board[y+2][x] + this.board[y+3][x]) === 4) {
                    this.highlight(y, x, 1, 0);
                }
            }
        }
        // ascending diagonal check
        for (let y = 3; y < 6; y++) {
            for (let x = 0; x < 4; x++) {
                if (Math.abs(this.board[y][x] + this.board[y-1][x+1] + this.board[y-2][x+2] + this.board[y-3][x+3]) === 4) {
                    this.highlight(y, x, -1, 1);
                }
            }
        }

        // descending diagonal check
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 4; x++) {
                if (Math.abs(this.board[y][x] + this.board[y+1][x+1] + this.board[y+2][x+2] + this.board[y+3][x+3]) === 4) {
                    this.highlight(y, x, 1, 1);
                }
            }
        }
    }

    // highlights winning pieces
    highlight(y, x, ySign, xSign) {
        // returns if game is over
        if (this.over) {
            return;
        }

        // fills id array with the ids of winning pieces
        let excludedIds = new Array();
        for (let i = 0; i < 4; i++) {
            excludedIds.push(`${y+ySign*i}${x+xSign*i}`);
        }

        // gets an array of ids do animation on
        let ids = new Array();
        Array.from(document.getElementsByClassName("piece")).forEach((ele) => {
            if (!excludedIds.includes(ele.getAttribute("id"))) {
                ids.push(ele.getAttribute("id"));
            }
        });

        // converts these ids to elements while also adding filters to the elements
        let elements = ids.map((id) => {
            let ele = document.getElementById(id);
            ele.style.filter = "brightness(100%)";
            return ele;
        })

        // animation highlighting the winning pieces
        anime({
            targets: elements,
            filter: "brightness(40%)", 
            easing: "easeInQuad",
            duration: 500
        });

        // sets game to be over
        this.over = true;
    }

    // places piece at index (x)
    placePiece(index) {

        // exits if over
        if (this.over) {
            return;
        }

        for (let y = 0; y < 7; y++) {   // goes down a column

            // breaks when a piece is reached
            if (y === 6 || this.board[y][index] != 0) {

                this.time = 0;

                // tries to place a piece above the other
                try {
                    // places piece and switches turn 
                    this.board[y-1][index] = this.redTurn ? 1 : -1;
                    this.redTurn = !this.redTurn;

                    // gets the image file for the piece
                    let filename = !this.redTurn ? "red" : "yellow";

                    // calculates board height
                    let boardHeight = this.width / 1.75 * 3 / 4;

                    // creates image
                    let img = document.createElement("img");
                    img.setAttribute("src", "assets/" + filename + ".png");
                    img.setAttribute("class", "piece");
                    img.setAttribute("id", (y-1)+""+index);
                    img.style.left = String(this.width / 1.75 * 0.1116 * index + this.width / 92) + "px";   // calculation to determine which column to put
                    img.style.top = "0";
                    document.getElementById("imgs").appendChild(img);

                    // calculates the row its on
                    let yPos = String(boardHeight * 0.1292 * (y-1) + boardHeight * 0.133) + "px";  

                    // sets new time
                    this.time = 175 * Math.sqrt(y)

                    // animates movement
                    anime({
                        targets: img,
                        top: yPos,
                        easing: "easeInQuad",
                        duration: this.time
                    });
                } catch { }

                // exit loop by returning
                return;
            }
        }
    }

    // resizes images
    resize(width, turnImageWidth) {

        // calculates height
        let boardHeight = width / 1.75 * 3 / 4;

        // updates widths
        this.width = width;
        this.turnImageWidth = turnImageWidth;

        // goes through every piece
        Array.from(document.getElementsByClassName("piece")).forEach((img)=>{

            // determines y and x indeces based on id
            let [y, x] = Array.from(img.getAttribute("id")).map((x) => { return parseInt(x) });

            // sets the location based on calculation and the indeces
            img.style.top = String(boardHeight * 0.1292 * y + boardHeight * 0.133) + "px";
            img.style.left = String(width / 1.75 * 0.1116 * x + width / 92) + "px";
        });

        // updates the turn indicator
        let turnIndicator = document.getElementById("turn-indicator");
        turnIndicator.style.width = turnImageWidth + "px";
        turnIndicator.style.height = turnImageWidth + "px";
    }

    // swaps the image in the turn display
    swapTurn() {

        // returns if the game is over
        if (this.over) {
            return;
        }

        // gets image
        let img = document.getElementById("turn-indicator");

        // animate the thing becoming narrower
        anime({
            targets: img,
            width: "0px",
            left: String(this.turnImageWidth / 2) + "px",
            easing: "linear",
            duration: ConnectFour.FLIPTIME
        });


        // waits for the previous animation to finish
        setTimeout(() => {

            // switches image
            let filename = this.redTurn ? "red" : "yellow";
            img.setAttribute("src", `assets/${filename}.png`);

            // animate becoming wider
            anime({
                targets: img,
                width: this.turnImageWidth + "px",
                left: "0px",
                easing: "linear",
                duration: ConnectFour.FLIPTIME
            });
        }, ConnectFour.FLIPTIME);
    }
}