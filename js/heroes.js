var lastResultsId = [];
$.holdReady(true);
var heroesJson = $.getJSON("./json/heroes.json", function (heroes_json) {
    //console.log(heroes_json);
    heroesJson = heroes_json;
    $.holdReady(false);


});

$(document).ready(
    function populateHeroes() {
        var image;
        //console.log(heroesJson);
        $.each(heroesJson, function (_, hero) {
            var imgPos = -1 * ((hero.id - 1) * 48);
            var image = '<a class="resultsImg" style="background: url(./img/heroFace.jpg) ' + imgPos + 'px 0px;"></a>';
            var list = '<div class="result" onclick="selectHero(heroesJson.heroId' + hero.id + ')" id="heroId' + hero.id + '">' + image + '<div class="resultsTxt">' + hero.name + '</div></div>'
            $("#resultsContainer").append(list);
            lastResultsId.push(hero.id);
        })
        $("#resultsContainer").hide();

        selectHero(heroesJson.heroId1, true);
    }
);




function newJson() {
    $.each(heroesJson, function (_, hero) {
        var id = hero.id;
        if (!dataJson['heroId' + id]) {
            dataJson['heroId' + id] = {};
        }
        var data = dataJson['heroId' + id];


        if (!data.rarity)
            data.rarity = "";
        if (!data.evo)
            data.evo = "";
        if (!data.d)
            data.d = [];
        if (!data.hold_d)
            data.hold_d = [];
        if (!data.half_d)
            data.half_d = [];
        if (!data.dash)
            data.dash = [];
        if (!data.dash_half_d)
            data.dash_half_d = [];
        if (!data.dash_hold_d)
            data.dash_hold_d = [];
        if (!data.air_d)
            data.air_d = [];
        if (!data.air_half_d)
            data.air_half_d = [];
        if (!data.air_hold_d)
            data.air_hold_d = [];
        if (!data.air_dash)
            data.air_dash = [];
        if (!data.special)
            data.special = [];
        if (!data.counter)
            data.counter = [];
        if (!data.sd)
            data.sd = [];
        if (!data.tester)
            data.tester = "";
        if (!data.note)
            data.note = "";




        newhero = {
            "name": hero.name,
            "id": hero.id,
            "type": hero.type,
            "rarity": data.rarity,
            "evo": data.evo,
            "d": data.d,
            "hold_d": data.hold_d,
            "half_d": data.half_d,
            "dash": data.dash,
            "dash_half_d": data.dash_half_d,
            "dash_hold_d": data.dash_hold_d,
            "air_d": data.air_d,
            "air_half_d": data.air_half_d,
            "air_hold_d": data.air_hold_d,
            "air_dash": data.air_dash,
            "special": data.special,
            "counter": data.counter,
            "sd": data.sd,
            "tester": data.tester,
            "note": data.note

        }

        allData['heroId' + id] = newhero;

    });
    //console.log(allData);
    console.log(JSON.stringify(allData));

}

function selectHero(heroId, pageLoad = false) {
    //console.log(heroId.id);
    var timer = 1000;
    if (pageLoad) {
        timer = 0;
    }
    $('#resultsContainer').hide();
    var id = ('00' + (heroId.id)).slice(-3);
    $('#heroImg').attr('style', 'background-image: url("img/heroes sprite/' + id + '_M.png");');
    console.log(id);
    //$('.damageContainer').hide(1000);

    let hero = heroesJson['heroId' + heroId.id];
    $('.heroNameContainer')[0].innerHTML = hero.name;
    $('.heroType')[0].innerHTML = hero.type;
    $('.heroRarit')[0].innerHTML = hero.rarity;

    var slot = [
        "id",
        "type",
        "rarity",
        "note"
    ]
    for (i = 0; i < slot.length; i++) {
        var infoSlot = document.getElementsByClassName(slot[i])[0];
        infoSlot = infoSlot.getElementsByClassName('info')[0];
        infoSlot = infoSlot.getElementsByTagName('p')[0];
        infoSlot.innerHTML = hero[slot[i]];
        if (hero[slot[i]].length == 0 && i == 2) {
            infoSlot.innerHTML = 'ไม่มีข้อมูล'
        }
        if (hero[slot[i]].length == 0 && i == slot.length-1) {
            infoSlot.innerHTML = 'ไม่มีหมายเหตุ'
        }
    }

    slot = [
        "d",
        "hold_d",
        "half_d",
        "dash",
        "dash_half_d",
        "dash_hold_d",
        "air_d",
        "air_half_d",
        "air_hold_d",
        "air_dash",
        "special",
        "counter",
        "sd"
    ]
    for (i = 0; i < slot.length; i++) {
        var damageSlot = document.getElementsByClassName(slot[i])[0];
        damageSlot = damageSlot.getElementsByClassName('damage')[0];
        damageSlot = damageSlot.getElementsByTagName('p')[0];
        damageSlot.innerHTML = hero[slot[i]];
        if (i != 12) {
            if (hero[slot[i]].length == 0) {
                $('.' + slot[i]).hide(timer);
            } else {
                $('.' + slot[i]).show(timer);
            }
        } else {
            if (hero[slot[i]].length == 0) {
                damageSlot.innerHTML = 'ไม่มีข้อมูล'
            }
        }
    }
}


function switchGender(gender) {
    var genderHeroId = $('.infoContainer.id .info p')[0].innerHTML;
    genderHeroId = ('00' + (genderHeroId)).slice(-3);
    if (gender == 'm') {
        console.log('men')
        $('.men ')[0].className = 'men active';
        $('.women')[0].className = 'women';
        $('#heroImg').attr('style', 'background-image: url("img/heroes sprite/' + genderHeroId + '_M.png");')
    }
    if (gender == 'w') {
        $('#heroImg').attr('style', 'background-image: url("img/heroes sprite/' + genderHeroId + '_W.png");')
        $('.women')[0].className = 'women active';
        $('.men')[0].className = 'men';
        console.log('women')
    }
}





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
        $.each(heroesJson, function (_, hero) {
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