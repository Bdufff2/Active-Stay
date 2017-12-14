//Variable created to hold the trails that return from the hiking API.
var trails = [];

//Created a function that calls the hiking API to retireve the lat, lon from the weather API and display name, location, length, summary, and link of each trail in a table.
//function is called in the form.on(submit) function.
function hiking(lat, lon) {
    var hikingAPIKey = "7033803-9068238db793b0bd33d891cbb1a9277c";
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&key=" + hikingAPIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
//Saving off the trails returned from the API to the global trails variable (see above), to be used with details modal.   
        trails = response.trails;
        //loop thru the trails array.    
        for (var i = 0; i < response.trails.length; i++) {
//Save various data points as variables to display in table.
            var hikeName = response.trails[i].name;
            var hikeLocation = response.trails[i].location;
            var hikeLength = response.trails[i].length;
            var hikeSummary = response.trails[i].summary;
            var hikeLink = response.trails[i].url;

//Dynamically creating the content that populates the hiking table.     
//Saving off the index of the trail we're displaying as data-hiking-index on the details button so we know which button the user clicked.       
            $(".hikingTable > tbody").append("<tr><td><a href='" + hikeLink + "' target='_blank'>" + hikeName + "</a></td><td>" + hikeLocation + "</td><td>" + hikeLength + "</td><td class='hidden-sm hidden-xs'>" + hikeSummary + "</td><td><button type='button' class='btn-xs' data-toggle='modal' data-hiking-index='" + i + "'data-target='#hikingModal'>Details</button></td></tr>")
        }
    })
}

//Created a function that will show certain content in the modal of the details button when it is clicked.
$("#hikingModal").on("show.bs.modal", function (event) {
//The event that is getting the button that was clicked.    
    var button = $(event.relatedTarget);
//Retrieve hiking index from the button attr.     
    var hikingIndexValue = button.data("hiking-index");
//Using hiking index value to get the correct trail from the global trails array.
    $("#hike-name").text(trails[hikingIndexValue].name);
    $("#hike-location").text(trails[hikingIndexValue].location);
    $("#hike-summary").text(trails[hikingIndexValue].summary);
    $("#hike-image").attr("src", trails[hikingIndexValue].imgSmallMed);

});


$(document).ready(function () {

    $(".second-page").hide();

    $("form").on("submit", function (event) {
        event.preventDefault();

        $(".main-page").hide();
        $(".second-page").show();

        var userInput = $("#addZip").val();
        var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";;
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + userInput + "&units=imperial&appid=" + weatherAPIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            var cityName = $("<div>");
            cityName.text(response.name);
            $(".city-name").text("City Name: " + response.name);

            var weather = $("<div>");
            weather.text(response.weather[0].description);
            $(".weather").text("Weather: " + response.weather[0].description);

            var temp = $("<div>");
            temp.text(response.main.temp);
            $(".temp").html("<p>" + "Current Temperature: " + response.main.temp + "°F" + "</p>");
            $(".temp").append("<p>" + "High: " + response.main.temp_max + "°F" + "</p>");
            $(".temp").append("<p>" + "Low: " + response.main.temp_min + "°F" + "</p>");

            hiking(response.coord.lat, response.coord.lon);

        });


        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }




    });

    $(".back").on("click", function (event) {
        $(".main-page").show();
        $(".second-page").hide();
        $("#addZip").val("");
    });

});