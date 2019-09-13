
// q
// limit
// rating
var gifs = ["cats", "dogs"]

// function that displays gifs array content as buttons
function renderButtons (){
    // make sure button-container is empty
    $("#button-container").empty()
    // loop through gifs array
    for(var i = 0; i < gifs.length; i++){
        // create a button element saved to var b
        var b = $("<button>");
        // add class of gif to b
        b.addClass("gifButton");
        // set attribute of data-name to be what gif[i]
        b.attr("data-name", gifs[i]);
        // set button text to be gif[i]
        b.text(gifs[i])
        // add button to the button-container
        $("#button-container").append(b)
    }
}


$(document).ready(function() {
// call renderButton()
renderButtons()

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
$(document).on("click", ".gifButton", function(){
    // get attribute data-name of button clicked
    var search = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ search + "&api_key=w37zn0TRObt76z2J4oBU2NZm2HQUVtAf";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        // loop throught response and get 10 results
        for(var i=0; i < 10; i++){
            // find image URL for max-height 
            var playGif = response.data[i].images.fixed_height.url
            // find image URL for max-height still
            var stillGif = response.data[i].images.fixed_height_still.url
            console.log(stillGif)
            // create a img to display
            var img = $("<img>")
            // add class of gif
            img.addClass("gif")
            // add gif src of stillGif
            img.attr("src", stillGif)
            // add attribute of data-still set to stillGif src
            img.attr("data-still", stillGif)
            // add attribute of data-animate set to playGif src
            img.attr("data-animate", playGif)
            // add attribute of data-state for what the gif is currently doing
            img.attr("data-state", "still")
            console.log(img)
            // append gif to id gif-container
            $("#gif-container").append(img)
        }
    })
    
});

// set click listener for .gif to play and pause the gif
$(document).on("click", ".gif", function(){
    // set data-state to a var
    var state = $(this).attr("data-state")
    // check to see if state is still, if so animate the gif
    if(state === "still"){
        // change src to data-animate
        $(this).attr("src", $(this).attr("data-animate"))
        // change data-state to animate
        $(this).attr("data-state", "animate")
    } else {
        // change src to data-still to stop playing
        $(this).attr("src", $(this).attr("data-still"))
        // change data-state to still
        $(this).attr("data-state", "still")
    }
})




});