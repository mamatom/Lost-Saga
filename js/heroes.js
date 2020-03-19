$.holdReady(true);
var heroes = $.getJSON("./json/heroes.json", function(json) {
    console.log(json);
    heroes = json;
    $.holdReady(false);
    
    
});




function populateHeroes(name,isenter = false) {
    var inputs
    
   // console.log(name.value);
    if(isenter)
        inputs = name
    else
        inputs = name.value
 
    $("#resultsContainer").show();
    if( name != ""){
        var results = [];
        var found;
        var reg = '/' + inputs + '/i'
        $.each(heroes,function(_,hero){
            
            var char = hero.name;
            var reg = RegExp(inputs,'i');

            search = char.search(reg);
            if(search!=-1){
                var heroName = hero.name,
                    id = hero.id;

                results.push({'name':heroName,'id':id});
               
            }
        })
        console.log(results);
        var pos = 0,
            image = '<a class="resultsImg" style="background: url(https://sites.google.com/site/llsthum/img.jpg)'+pos+'px 0px;"></a>'
        for(i=0;i<results.length;i++){
            
            
        }


    }
}


$(document).mouseup(function(e){
    var container = $("#resultsContainer");

    // If the target of the click isn't the container
    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }
});


