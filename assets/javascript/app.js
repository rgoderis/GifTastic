var key = "api_key=w37zn0TRObt76z2J4oBU2NZm2HQUVtAf";
var URL = "api.giphy.com/v1/gifs/search?q=";
// q
// limit
// rating
var gifs = []
$(document).ready(function() {

// create buttons based on what the user enters in the search input
// set click listener for submit button
$("#submit").on("click", function(event){
    event.preventDefault();
    // grab the value that was entered in the input and save to a var
    let gif = $("#search").val().trim()
    console.log(gif)
    // add gif to the gifs array
    gifs.push(gif)
})




});