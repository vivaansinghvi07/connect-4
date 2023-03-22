document.addEventListener("DOMContentLoaded", function() {
    // fixes hitboxes for whenever the window is resized
    resizeHitboxes(); window.addEventListener('resize', resizeHitboxes);

    // detects clicks on hitboxes
    Array.from(document.getElementsByClassName("clicker")).forEach((element, index) => {

        element.addEventListener("click", function() {
            console.log(index + "clicked")
            // TODO: do something with the index to designate which one is being clicked
        })
    })
    
});

// changes hitboxes when screen resized
function resizeHitboxes() {

    var screenWidth = document.documentElement.clientWidth;
    var clickerWidth = screenWidth / 1.75 * 0.1115;
    var clickerMargin = screenWidth / 179.2;

    Array.from(document.getElementsByClassName("clicker")).forEach((element, index) => {

        // adjusts left position so they are not right on top of each other
        element.style.left = String(index * clickerWidth + clickerMargin) + "px";

    })
}