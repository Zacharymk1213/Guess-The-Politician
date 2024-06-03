var politician_names,politician_file_names, loaded,image_chosen,counter;
init();


//use jquery to do the following
//if an element of class btn is clicked on then change the image with the class politician
// the image to be chosen should be based on the value of random_num(16)
//so if random_num(16) is 1 then the image should be politician_file_names[1]
// change the text of each of the btns to randomly selected values from politician_names,
// prevent repeats by copying selected values to loaded, if a conflict choose a number from the index again


$(document).ready(function() {

    function random_num(n) {
        return Math.floor(Math.random() * n);
    }

    function resetGame() {
        //get politician image. Keep resetting until unselected
        var index;
        do {
            index = random_num(16);
        } while (image_chosen[index] === 1);        
        console.log(index);
        $('.politician').attr('src', politician_file_names[index]);

        var loaded_names = [];
        var correct_answer_present = false;

        do {
            loaded_names = [];
            $('.btn').each(function() {
                //check for duplicates
                var index;
                do {
                    index = random_num(politician_names.length);
                } while (loaded_names.includes(politician_names[index]));
        
                loaded_names.push(index);
                $(this).text(politician_names[index]);
        
                // check if the index of the text of any of the buttons matches the index of the image
                var img_src = $('.politician').attr('src');
                var img_index = politician_file_names.indexOf(img_src);
                if (index === img_index) {
                    correct_answer_present = true;
                }
            });
        } while (!correct_answer_present);
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

        }
        else {
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
            $('#play-again').css('display', 'block'); // make the button visible

            $('#play-again').click(function() {
                counter = 0; // reset counter
                image_chosen.fill(0); // reset image_chosen array
                $('#heading').text('Guess the politician!');
                $('#play-again').css('display', 'none'); // make the button invisible again

                resetGame(); // reset the game
            });        
        }
        else {
            resetGame();
        }
    });
});


//used to getting politican names as well as image
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
    ]
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
