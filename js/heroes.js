
var lastResultsId = [];
$.holdReady(true);
var heroes = $.getJSON("./json/heroes.json", function (json) {
    //console.log(json);
    heroes = json;
    $.holdReady(false);
});

$(document).ready(function populateHeroes() {
    var image;
    $.each(heroes, function (_, hero) {
        var imgPos = -1 * ((hero.id - 1) * 48);
        var image = '<a class="resultsImg" style="background: url(./img/heroFace.jpg) ' + imgPos + 'px 0px;"></a>';
        var list = '<li class="resultsList" id="heroId' + hero.id + '">' + image + '<div class="resultsTxt">' + hero.name + '</div></li>'
        $("#resultsContainer").append(list);
        lastResultsId.push(hero.id);
    })
    $("#resultsContainer").hide();
});


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
        $.each(heroes, function (_, hero) {
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