
var heroes;
$.getJSON("./json/heroes.json", function(json) {
    console.log(json);
    heroes = json;
    
    
});




function populateHeroes(name,isenter = false) {
    var inputs
    console.log(name);
    if(isenter)
        inputs = name
    else
        inputs = name.value
 
    $("#resultsContainer").show();
    if( name != ""){
        var results = [];
        $.each(heroes,function(hero){

        })


    }
}


$(document).mouseup(function(e){
    var container = $("#resultsContainer");

    // If the target of the click isn't the container
    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }
});


