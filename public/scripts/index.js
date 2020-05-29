//global vars

// on page load
$(document).ready(() => {
    $("#menu_item_home").addClass("active");

    //reset();
    
});


//detect language of inputted text using Microsoft Azure
function detectLanguage() {
    //handle capture of text and detection of language
}


// handle translate button click
function translateText() {
    $('#error_message').addClass('d-none'); //hide any error messages

    console.log('translating');

    var txt = $("#text_input").val(); //get text
    var fromLang = $("#from_select").val(); //get selected voice
    var toLang = $("#to_select").val(); //get selected style

    //check text input
    if (txt.length == 0 || txt == '') {
        $("#text_input").addClass('error');
        return;
    } else {
        $("#text_input").removeClass('error');
    }

    //show spinner
    $('#loading_spinner_row').removeClass('d-none');

    jQuery.get('/translate', { message: txt, from: fromLang, to: toLang}, function (data) {
        console.log('successfully made Record call to server');

        //hide spinner
        $('#loading_spinner_row').addClass('d-none');

    }).catch((error) => {
        console.log('error');
        console.log(error);

        //hide spinner
        $('#loading_spinner_row').addClass('d-none');

        $('#error_message').text('There was an issue with your request...');
        $('#error_message').removeClass('d-none'); //show error message
    });

    return false;

}


//handle reset button click
//reset text and audio player
function reset() {
    
    //reset language selected
    $('#voice_select').val('standard');

    //reset speed
    $("#speed_container").addClass('d-none');
    $("#speed_input").val('1'); 

    //hide style_select section
    $('#style_select_container').addClass('d-none');
    isStylistic = false;

    //clear text
    $('#text_input').val(null);
}
