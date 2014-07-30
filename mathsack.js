/**
 * Created by Manu on 23/07/14.
 */


var timer;
var loop;

var level = 1;

$('.ingame').hide();
$('#afficheur').hide();
//--------------INITIALISATION DES VARIABLES--------------

function initGame(level) {

    if (level == 1) {
        window.aim = 10;
        window.levelTime = 20;
        window.interval = 1000;
        window.steps = 5;
    }

    window.endChrono = false;
    window.nbWrong = 0;
    window.numBox = [];


    var cageWidth = $('#cage').width();

    window.jump = (cageWidth / steps);

    $('#play').empty();

}

//-----------------ACCUEIL------------------

$(document).ready(function () {
    $('#restart').click(function () {
        start();
    });
    $("#start").click(function () {

        start();
    });

    // appui touche
    $(document).keypress(function (e) {
        var char = parseInt(String.fromCharCode(e.which));
        movePlayed(char);

    });

    // click pav num
    $('.button').click(function () {
        var char = parseInt($(this).html());
        movePlayed(char);
    });
});


//------------------JEU----------------------

function start() {

    stopchrono();
    stoploop();

    initGame(1);




    $('.fadeend').css('opacity', 1);
    $('.showstart').show();
    $('.hidestart').hide();
    $('.hidestart').hide();
    $('.ok').hide();
    $('.no').hide();

    chrono(levelTime);

    newDeal(aim);
    loop = window.setInterval(function () {
        if (!endChrono) {

            newDeal(aim);

            if (isGameOver(numBox, steps)) {
                stoploop();
                end('loose');
            }
        }
        else {
            stoploop();
            end('win');
        }

    }, interval);


}


function chrono(count) {
    timer = window.setInterval(function () {
        displayInDiv('.chrono', 'Tiens le coup encore <br/> ' + count + '  secondes');
        count--;
        if (count <= 0) {
            endChrono = true;
            stopchrono();
        }
    }, 1000);

}

function stopchrono() {
    window.clearInterval(timer);
    endChrono = true;
}

function stoploop() {
    window.clearInterval(loop);
}

function newDeal(aim) {

    var newdeal = Math.floor((Math.random() * (aim - 2) + 1));

    numBox.unshift(newdeal);

    moveMonster(numBox.length, jump);

    displayInDiv("#random", "<p class='texte'>" + numBox[(numBox.length) - 1] + "</p>");

}

function movePlayed(c) {

    if (!$.isNumeric(c)) {
        displayInDiv('#warning', "<p class='texte'> un chiffre ! :)</p>");
        $('#warning p').fadeOut(1200, function () {
            $(this).empty();

        });
    } else {
        displayInDiv('#play', "<p class='texte'>" + c + "</p>");

        //SI BON COUP
        if (isSumGood(numBox[(numBox.length) - 1], c, aim)) {

            // affiche youpi
            displayInDiv('#warning', "<p class='texte'> NICE ! </p>");

//            //pouce right
//            $('.no').hide();
//            $('.ok').hide();
//            $('.ok').fadeIn(100);
//            $('.ok').fadeOut(700);


            $('#warning p').fadeOut(2000, function () {
                $(this).empty();
            });

           //change couleur en vert
            $('#play').css('background-color', 'green');

            $('#play p').fadeOut(700, function () {
                $(this).empty();
            });

            numBox.pop();

            moveMonster(numBox.length, jump);

            if (numBox.length <= 0)
                newDeal(aim);


            displayInDiv("#random", "<p class='texte'>" + numBox[(numBox.length) - 1] + "</p>");
        }
        //SINON, SI MAUVAIS COUP
        else {

            nbWrong++;

            //affiche bad
            displayInDiv('#warning', "<p class='texte'>bad...</p>");

//            //pouce wrong
//            $('.no').hide();
//            $('.ok').hide();
//            $('.no').fadeIn(100);
//            $('.no').fadeOut(700);


            $('#warning p').fadeOut(2000, function () {
                $(this).empty();
            });

            //change couleur en rouge
            $('#play').css('background-color', 'red');

            displayInDiv("#random", "<p class='texte'>" + numBox[(numBox.length) - 1] + "</p>");
        }
    }
}


function isSumGood(random, played, theaim) {

    var somme = random + played;

    return somme == theaim;
}

function isGameOver(array, aim) {

    return array.length >= aim;

}


function moveMonster(tablen, j) {


    var monsterWidth = parseInt($('#monster').width());
    if (tablen == 0) {
        j = 0;
    }
    j = j * tablen;


    j = j - monsterWidth;

    j = j + 'px';
    $('#monster').css('right', j);


}

function displayInDiv(where, what) {
    $(where).empty();
    $(where).html(what);
}

function end(why) {

    if ('win' == why) {
        displayInDiv('#afficheur p', 'Bien joué !');
        $('.showloose').hide();
        $('.showwin').show();
    }
    else {
        displayInDiv('#afficheur p', 'Dommage...');
        $('.showwin').hide();
        $('.showloose').show();
    }

    stopchrono();

    $('.fadeend').fadeTo(500, 0);
    $('.hideend').hide();
    $('.showend').fadeIn(1000);


}






