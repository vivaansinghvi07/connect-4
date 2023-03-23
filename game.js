// class to create a game object
class ConnectFour {

    constructor() {

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
    
    }

    // places piece at index (x)
    placePiece(index) {
        for (let y = 0; y < 7; y++) {   // goes down a column

            // breaks when a piece is reached
            if (y === 6 || this.board[y][index] != 0) {

                // tries to place a piece above the other
                try {
                    this.board[y-1][index] = this.redTurn ? 1 : -1;
                    this.redTurn = !this.redTurn;
                } catch { }

                // exit loop by returning
                return;
            }
        }
    }

    // displays the game
    display(width) {

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
                img.setAttribute("id", y + "" + x);
                img.setAttribute("class", "piece");
                img.style.top = String(yPos) + "px";
                img.style.left = String(xPos) + "px";
                
                // adds image to document
                container.appendChild(img);


            });
        });
    }
}