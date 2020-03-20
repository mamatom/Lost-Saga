$.holdReady(true);
var heroes = $.getJSON("./json/heroes.json", function(json) {
    //console.log(json);
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
 
    
    if( inputs != ""){
        var results = [];
        var found;
        var reg = '/' + inputs + '/i'
        $.each(heroes,function(_,hero){
            
            var char = hero.name;
            var reg = RegExp(inputs,'i');
            search = char.search(reg);
            if(search!=-1){ 
                var string = [],
                    hlString = [];
            //    console.log(char.search(reg) != -1);
                while (char.search(reg)!= -1) {
                    search = char.search(reg);
                    string.push(char.slice(0,search));
                    hlString.push(char.slice(search,search+inputs.length));
                    char = char.substr(search+inputs.length);   
                }
                string.push(char);
                
                results.push({'name':hero.name,'id':hero.id,'hlTxt':hlString,'txt':string});
               
            }
        })
        //console.log(results);
        $("#resultsContainer").empty();
        $("#resultsContainer").show();
        var list,imgPos = 0,text = '',image;
        for(i=0;i<results.length;i++){
            imgPos = -1*((results[i].id-1)*48);
            text ='';
            //console.log(results[i].txt);
            image = '<a class="resultsImg" style="background: url(./img/heroFace.jpg) '+ imgPos +'px 0px;"></a>';
            for(j=0 ; j < results[i].txt.length ; j++){
                var txt = '<a class="txt">' + results[i].txt[j] + '</a>',
                    hlTxt = '<a class="hlTxt">' + results[i].hlTxt[j] +'</a>';

                text = text + txt;
                if(j != results[i].txt.length-1){
                    text = text + hlTxt;
                }  
            }
            list = '<li class="resultsList">'+image+'<div class="resultsTxt">'+text+'</div></li>'
            $("#resultsContainer").append(list);

            
        }


    }
}


$(document).mouseup(function(e){
    var container = $("#resultsContainer"),
        alt = $(".heroInput");



    // If the target of the click isn't the container
    if(!(container.is(e.target)||alt.is(e.target)) && container.has(e.target).length === 0){
        container.hide();
    }
});


