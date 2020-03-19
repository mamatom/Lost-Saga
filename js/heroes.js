var heroes;
$.getJSON("./json/heroes.json", function(json) {
    console.log(json); // this will show the info it in firebug console
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


function LoadAllJsonObjects(obj) {
    var result = {}
    
    var promises = Object.entries(obj).map(function(url){
        return $.getJSON(url[1]).then(function(res){
            result[url[0]]=res
        })
    })

    return Promise.all(promises).then(function(){
        return result
    })
}