var politician_names, politician_file_names, image_chosen, counter;
init();

$(document).ready(function() {
    var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox's unique property
    if(isFirefox) {
        alert("Your browser is not officially supported. Some people have reported errors on this browser. If issues occur play in Chrome, Brave or some other Browser using Chrome's engine.");
        
    }

    function random_num(n) {
        return Math.floor(Math.random() * n);
    }

    function resetGame() {
        var index;
        do {
            index = random_num(16);
        } while (image_chosen[index] === 1);

        console.log(index);
        $('.politician').attr('src', politician_file_names[index]);

        var correctAnswer = politician_names[index];
        var loaded_names = [index]; // Include the correct answer in the loaded_names array

        var buttonNames = [correctAnswer]; // Ensure the correct answer is included
        while (buttonNames.length < 4) { // Assuming there are 4 buttons
            var buttonIndex = random_num(politician_names.length);
            if (!loaded_names.includes(buttonIndex)) {
                loaded_names.push(buttonIndex);
                buttonNames.push(politician_names[buttonIndex]);
            }
        }

        // Shuffle buttonNames
        for (var i = buttonNames.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = buttonNames[i];
            buttonNames[i] = buttonNames[j];
            buttonNames[j] = temp;
        }

        $('.btn').each(function(index) {
            $(this).text(buttonNames[index]);
        });
    }

    resetGame();

    $('.btn').click(function() {
        var btn_text = $(this).text();
        var btn_index = politician_names.indexOf(btn_text);
        var img_src = $('.politician').attr('src');
        var img_index = politician_file_names.indexOf(img_src);
        if (btn_index === img_index) {
            image_chosen[img_index] = 1;
            counter++;

        } else {
            //fill image chosen with 0's
            //reset counter to 0
            for (var i = 0; i < politician_file_names.length; i++) {
                image_chosen[i] = 0;
            }
            counter = 0;
        }
        console.log(image_chosen);
        // modify text of h1 with id of heading to the text Correct Answers: {counter}
        $('#counter').text('Correct Sequential Answers: ' + counter);
        if (counter === 16) {
            $('#heading').text('You Won!');
            // add a button at the bottom using Jquery. If it's pressed load image_chosen with 0's, reset counter to 0. Once the button is pressed destroy the button using jquery
            $('body').append('<button id="resetButton">Reset</button>');

            // Initialize image_chosen array and counter

            // When the button is pressed
            $('#resetButton').click(function() {
                // Load image_chosen with 0's
                image_chosen = Array(image_chosen.length).fill(0);
                // Reset counter to 0
                counter = 0;
                // Destroy the button
                $(this).remove();
                $('#counter').text('Correct Sequential Answers: ' + counter);
                $('#heading').text('Guess the Politician');

                resetGame();
            });
        } else {
            resetGame();
        }
    });
});

function init() {
    counter = 0;
    politician_names = [
        "Marine Le Pen",
        "Emmanuel Macron",
        "Jean Luc Melenchon",
        "Eric Zemmour",
        "Yoav Gallant",
        "Yair Lapid",
        "Avigdor Lieberman",
        "Benjamin Netanyahu",
        "Alexei Navalny",
        "Dmitry Medevev",
        "Nikolay Kharitonov",
        "Vladamir Putin",
        "Joe Biden",
        "Mike Johnson",
        "Mitch Mcconnell",
        "Donald Trump"
    ];
    politician_file_names = [
        "images/france/le_pen.jpeg",
        "images/france/macron.jpeg",
        "images/france/melenchon.jpeg",
        "images/france/zemmour.jpeg",
        "images/israel/gallant.jpeg",
        "images/israel/lapid.jpeg",
        "images/israel/lieberman.jpg",
        "images/israel/netanyahu.jpeg",
        "images/russia/alexei_navalny.jpeg",
        "images/russia/dmitry_medevev.jpeg",
        "images/russia/nikolay_kharitonov.jpg",
        "images/russia/putin.jpg",
        "images/united_states/biden.jpeg",
        "images/united_states/johnson.jpeg",
        "images/united_states/mcconnell.jpeg",
        "images/united_states/trump.jpeg"
    ];
    image_chosen = [
        0, 0, 0, 0, 
        0, 0, 0, 0, 
        0, 0, 0, 0, 
        0, 0, 0, 0
    ];
}
