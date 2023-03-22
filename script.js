document.addEventListener("DOMContentLoaded", function() {
    // width of screen
    const SCREENWIDTH = document.documentElement.clientWidth;
    const CLICKERWIDTH = SCREENWIDTH / 1.75 * 0.1115;
    const CLICKERMARGIN = SCREENWIDTH / 179.2

    Array.from(document.getElementsByClassName("clicker")).forEach((element, index) => {

        // adjusts left position so they are not right on top of each other
        element.style.left = String(index * CLICKERWIDTH + CLICKERMARGIN) + "px";

        element.addEventListener("click", function() {
            console.log(index + "clicked")
            // TODO: do something with the index to designate which one is being clicked
        })
    })
});