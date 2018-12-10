var aText = new Array(
    "개발하고 놀 사람,",
    "여기여기 모여라!"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("typedtext");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
    if (iTextPos++ == iArrLength) {
        iTextPos = 0; iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}
typewriter();

$(document).ready(function () {
    // set up text to print, each item in array is new line
    $('a[href*=#]').bind('click', function (e) {
        e.preventDefault(); // prevent hard jump, the default behavior
        var target = $(this).attr("href"); // Set the target as variable
        // perform animated scrolling by getting top-position of target-element and set it as scroll target
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 600, function () {
            location.hash = target; //attach the hash (#jumptarget) to the pageurl
        });
        return false;
    });
});

$(window).scroll(function () {
    var scrollDistance = $(window).scrollTop();
    var midOfScreen = $(window).height() / 2;
    // Assign active class to nav links while scolling
    if ( $('#home').position().top - midOfScreen <= scrollDistance) {
        $('.main-navigation ul li a.active').removeClass('active');
    }
    $('.main section:nth-child(n+2)>div').each(function (i) {
        if ($(this).position().top - midOfScreen <= scrollDistance) {
            $('.main-navigation ul li a.active').removeClass('active');
            $('.main-navigation ul li a').eq(i).addClass('active');
        }
    });
}).scroll();