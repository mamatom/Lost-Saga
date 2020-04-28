var lastResultsId = [];
$.holdReady(true);
var heroesJson = $.getJSON("./json/Heroes.json", function (heroes_json) {
    console.log(heroes_json);
    heroesJson = heroes_json;
    $.holdReady(false);
    

});


var allData = {}; 





function newJson(){
    $.each(heroesJson, function (_,hero){
        var id = hero.id;
        if(!dataJson['heroId'+id]){
            dataJson['heroId'+id]= {};
        }
        var data = dataJson['heroId'+id];


        if(!data.rarity)
            data.rarity = "";
        if(!data.evo)
            data.evo = "";
        if(!data.d)
            data.d = [];
        if(!data.hold_d)
            data.hold_d =[];
        if(!data.half_d)
            data.half_d =[];
        if(!data.dash)
            data.dash = [];
        if(!data.dash_half_d)
            data.dash_half_d =[];
        if(!data.dash_hold_d)
            data.dash_hold_d = [];
        if(!data.air_d)
            data.air_d = [];
        if(!data.air_half_d)
            data.air_half_d = [];
        if(!data.air_hold_d)
            data.air_hold_d = [];
        if(!data.air_dash)
            data.air_dash = [];
        if(!data.special)
            data.special = [];
        if(!data.counter)
            data.counter = [];
        if(!data.sd)
            data.sd = [];
        if(!data.tester)
            data.tester = "";
        if(!data.note)
            data.note = "";




            newhero = {
            "name":hero.name,
            "id":hero.id,
            "type":hero.type,
            "rarity": data.rarity,
            "evo": data.evo,
            "d": data.d,
            "hold_d": data.hold_d,
            "half_d":data.half_d,
            "dash":data.dash,
            "dash_half_d":data.dash_half_d,
            "dash_hold_d":data.dash_hold_d,
            "air_d":data.air_d,
            "air_half_d":data.air_half_d,
            "air_hold_d":data.air_hold_d,
            "air_dash":data.air_dash,
            "special":data.special,
            "counter":data.counter,
            "sd":data.sd,
            "tester":data.tester,
            "note":data.note

            }

        allData['heroId'+id] = newhero;

    });
    //console.log(allData);
    console.log(JSON.stringify(allData));

}

function selectHero(heroId) {
    $('#resultsContainer').hide();
    var id = ('00' + (heroId.id)).slice(-3);
    $('#heroImg').attr('style', 'background-image: url("img/heroes sprite/'+ id +'_M.png");');
    console.log(id);
}



$(document).ready(function populateHeroes() {

    var image;
    $.each(heroesJson, function (_, hero) {
        var imgPos = -1 * ((hero.id - 1) * 48);
        var image = '<a class="resultsImg" style="background: url(./img/heroFace.jpg) ' + imgPos + 'px 0px;"></a>';
        var list = '<div class="result" onclick="selectHero(heroesJson.heroId' + hero.id + ')" id="heroId' + hero.id + '">' + image + '<div class="resultsTxt">' + hero.name + '</div></div>'
        $("#resultsContainer").append(list);
        lastResultsId.push(hero.id);
    })
    $("#resultsContainer").hide();
});
1


function filterHeroes(name, isenter = false) {
    var inputs
    if (isenter)
        inputs = name
    else
        inputs = name.value
    if (inputs != "") {
        var results = [];
        var newResultsId = [];
        var found;
        var reg = '/' + inputs + '/i'
        $.each(heroesJson, function (_,hero) {
            var char = hero.name;
            var reg = RegExp(inputs, 'i');
            search = char.search(reg);
            if (search != -1) {
                var string = [],
                    hlString = [];
                newResultsId.push(hero.id);
                while (char.search(reg) != -1) {
                    search = char.search(reg);
                    string.push(char.slice(0, search));
                    hlString.push(char.slice(search, search + inputs.length));
                    char = char.substr(search + inputs.length);
                }
                string.push(char);
                results.push({
                    'name': hero.name,
                    'id': hero.id,
                    'hlTxt': hlString,
                    'txt': string
                });
            }
        })
        var toRemove = lastResultsId.filter(x => !newResultsId.includes(x));
        for (i = 0; i < toRemove.length; i++) {
            if (i < 8) {
                $("#heroId" + toRemove[i]).hide(500);
            } else {
                $("#heroId" + toRemove[i]).hide();
            }

        }
        lastResultsId = [];
        $(".resultsTxt").remove();
        $("#resultsContainer").show(250);
        var text = '';
        for (i = 0; i < results.length; i++) {
            text = '';
            for (j = 0; j < results[i].txt.length; j++) {
                var txt = '<a class="txt">' + results[i].txt[j] + '</a>',
                    hlTxt = '<a class="hlTxt">' + results[i].hlTxt[j] + '</a>';
                text = text + txt;
                if (j != results[i].txt.length - 1) {
                    text = text + hlTxt;
                }
            }
            $("#heroId" + results[i].id).append('<div class="resultsTxt">' + text + '</div>')
            if (i < 8) {
                $("#heroId" + results[i].id).show(500);
            } else {
                $("#heroId" + results[i].id).show();
            }
            lastResultsId.push(results[i].id);
        }
    } else {
        $("#resultsContainer").hide(250);
    }
}


$(document).mouseup(function (e) {
    var container = $("#resultsContainer"),
        alt = $(".heroInput");
    // If the target of the click isn't the container
    if (!(container.is(e.target) || alt.is(e.target)) && container.has(e.target).length === 0) {
        container.hide('linear');
    }
});