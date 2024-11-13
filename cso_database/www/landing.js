$(document).ready(function() {
    //main method	  
    })


    $("#search_btn").click(function (event) {
        event.preventDefault();
        //$("#proceed"). attr("disabled", true);
        console.log($("#search").val());
        window.location.href = 
        "/organisations?query="+$("#search").val();
    })