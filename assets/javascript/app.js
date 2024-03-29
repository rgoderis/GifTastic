const topics = ["Jedi", "Stormtrooper", "Yoda", "Darth Vader", "Star Wars", "Han Solo", "Chewbacca", "Luke Skywalker", "Obi Wan Kenobi", "Anakin Skywalker"];

// function that displays gifs array content as buttons
renderButtons=()=>{
    // make sure button-container is empty
    $("#button-container").empty()
    // loop through gifs array
    for(let i = 0; i < topics.length; i++){
        // create a button element saved to var b
        let b = $("<button>");
        // add class of gif to b
        b.addClass("gifButton btn btn-dark");
        // set attribute of data-name to be what gif[i]
        b.attr("data-name", topics[i]);
        // set button text to be gif[i]
        b.text(topics[i]);
        // add button to the button-container
        $("#button-container").append(b);
    }
}


$(document).ready(()=> {
    // call renderButton()
    renderButtons();
    // create buttons based on what the user enters in the search input
    // set click listener for submit button
    $("#submit").on("click", event=>{
        event.preventDefault();
        // grab the value that was entered in the input and save to a var
        let gif = $("#search").val().trim();
        // add gif to the gifs array
        topics.push(gif);
        // call renderButton()
        renderButtons();
        $("#search").val("");
    });

    // set click listener for created gif button to display gifs
    $(document).on("click", ".gifButton", function(){
        // clear gif-container
        $("#gif-container").empty();
        // get attribute data-name of button clicked
        let search = $(this).attr("data-name")
        let queryURL = "https://api.giphy.com/v1/gifs/search?q="+ search + "&api_key=w37zn0TRObt76z2J4oBU2NZm2HQUVtAf";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(response=>{
            // loop throught response and get 10 results
            for(let i=0; i < 10; i++){
                // find image URL for max-height 
                let playGif = response.data[i].images.fixed_height.url;
                // find image URL for max-height still
                let stillGif = response.data[i].images.fixed_height_still.url;
                // set rating to a var
                let rating = response.data[i].rating;
                // create div to put img in
                let div = $("<div>");
                div.addClass("gifDiv");
                // append rating to div
                div.append("<p class='text-center'><strong>Rated: " + rating + "</strong></p>");
                // create a img to display
                let img = $("<img>");
                // add class of gif
                img.addClass("gif");
                // add gif src of stillGif
                img.attr("src", stillGif);
                // add attribute of data-still set to stillGif src
                img.attr("data-still", stillGif);
                // add attribute of data-animate set to playGif src
                img.attr("data-animate", playGif);
                // add attribute of data-state for what the gif is currently doing
                img.attr("data-state", "still");
                // append img to div
                div.append(img);
                // append div to id gif-container
                $("#gif-container").append(div);
            }
        });
    });

    // set click listener for .gif to play and pause the gif
    $(document).on("click", ".gif", function(){
        // set data-state to a var
        let state = $(this).attr("data-state");
        // check to see if state is still, if so animate the gif
        if(state === "still"){
            // change src to data-animate
            $(this).attr("src", $(this).attr("data-animate"));
            // change data-state to animate
            $(this).attr("data-state", "animate");
        } else {
            // change src to data-still to stop playing
            $(this).attr("src", $(this).attr("data-still"));
            // change data-state to still
            $(this).attr("data-state", "still");
        }
    });

    $("#reset").on("click", ()=>{
        $("#search-container").empty();
        $("#gif-container").empty();
        topics = ["Jedi", "Stormtrooper", "Yoda", "Darth Vader", "Star Wars", "Han Solo", "Chewbacca", "Luke Skywalker", "Obi Wan Kenobi", "Anakin Skywalker"];
        renderButtons();
    });
});
