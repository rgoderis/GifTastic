var key = "api_key=w37zn0TRObt76z2J4oBU2NZm2HQUVtAf";
var URL = "api.giphy.com/v1/gifs/search?q=";
// q
// limit
// rating
var gifs = []

// function that displays gifs array content as buttons
function renderButtons (){
    // make sure button-container is empty
    $("#button-container").empty()
    // loop through gifs array
    for(var i = 0; i < gifs.length; i++){
        // create a button element saved to var b
        var b = $("<button>");
        // add class of gif to b
        b.addClass("gif");
        // set attribute of data-name to be what gif[i]
        b.attr("data-name", gifs[i]);
        // set button text to be gif[i]
        b.text(gifs[i])
        // add button to the button-container
        $("#button-container").append(b)
    }
}


$(document).ready(function() {

// create buttons based on what the user enters in the search input
// set click listener for submit button
$("#submit").on("click", function(event){
    event.preventDefault();
    // grab the value that was entered in the input and save to a var
    let gif = $("#search").val().trim();
    // add gif to the gifs array
    gifs.push(gif);
    // call renderButton()
    renderButtons()
});

// set click listener for created gif button to display gifs
$(document).on("click", ".gif", function(){
    // get attribute data-name of button clicked
    console.log($(this).attr("data-name"))
})




});