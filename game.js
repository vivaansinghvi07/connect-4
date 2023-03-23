// class to create a game object
class ConnectFour {

    constructor(width) {

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
    
    }

    // places piece at index (x)
    placePiece(index) {
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
                    img.style.left = String(this.width / 1.75 * 0.1115 * index + this.width / 93) + "px";   // calculation to determine which column to put
                    img.style.top = "0";
                    document.getElementById("imgs").appendChild(img);

                    // calculates the row its on
                    let yPos = String(boardHeight * 0.1292 * (y-1) + boardHeight * 0.131) + "px";  

                    // sets new time
                    this.time = 175 * Math.sqrt(y)

                    // animates movement
                    anime({
                        targets: img,
                        top: yPos, // -> '250px'
                        easing: "easeInQuad", //"cubic-bezier(0.365, 0.100, 0.820, 0.335)"
                        duration: this.time
                    });
                } catch { }

                // exit loop by returning
                return;
            }
        }
    }

    // displays the game
    display(width) {

        // updates width
        this.width = width;

        // defines height (of the board) based on what the width is
        let boardHeight = width / 1.75 * 3 / 4;

        // defines and clears image container
        let container = document.getElementById("imgs");
        container.innerHTML = null;

        // iterate through every piece
        this.board.forEach((row, y) => {
            row.forEach((piece, x) => {

                // continues if the piece is a 0
                if (piece === 0) {
                    return;
                }

                // calculates the x-pos of the image
                let xPos = width / 1.75 * 0.1115 * x + width / 93;

                // calculates the y-pos of the image
                let yPos = boardHeight * 0.1292 * y + boardHeight * 0.131;

                // gets filename
                let filename = piece === 1 ? "red" : "yellow";

                // displays image
                let img = document.createElement("img");
                img.setAttribute("src", "assets/" + filename + ".png");
                img.setAttribute("class", "piece");
                img.setAttribute("id", `${y}${x}`)
                img.style.top = String(yPos) + "px";
                img.style.left = String(xPos) + "px";
                
                // adds image to document
                container.appendChild(img);


            });
        });
    }
}