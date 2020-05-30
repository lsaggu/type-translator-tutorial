//global vars
var languages;

// on page load
$(document).ready(() => {
    $("#menu_item_home").addClass("active");

    reset();

    languages = JSON.parse($('#language_json').html());

    jQuery.get('/translate', { message: 'hello', to: 'ja' }, function (data) {

        //update page to show translation
        var result = JSON.parse(data)[0].translations[0].text;
        $('#konnichiwa').text(result);

    }).catch((error) => {
        $('#konnichiwa').text('Try typing hello into the translator and translating it to Japanese!');
    });
        
});


//detect language of inputted text using Microsoft Azure
function detectLanguage() {
    //handle capture of text and detection of language

    $('#error_message').addClass('d-none'); //hide error message

    //debounce
    window.clearTimeout(this.delayTimeout);
    const text = $('#text_input').val(); //get text
    this.delayTimeout = setTimeout(() => {
        //perform callout
        jQuery.get('/detect-language', { message: text }, function (data) {
            //handle results
            
            let result = JSON.parse(data)[0];
            let language = languages.translation[result.language].name;

            //update detected language
            $('#detected_language').text(language);

        }).catch((error) => {
            console.log('error');
            console.log(error);

            //hide spinner
            $('#loading_spinner_row').addClass('d-none');

            $('#error_message').text('Unable to detect language...');
            $('#error_message').removeClass('d-none'); //show error message
        });
    }, 500);
}


// handle translate button click
function translateText() {
    $('#error_message').addClass('d-none'); //hide any error messages

    var txt = $("#text_input").val(); //get text
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

    jQuery.get('/translate', { message: txt, to: toLang}, function (data) {
        
        //hide spinner
        $('#loading_spinner_row').addClass('d-none');

        //update page to show translation
        var result = JSON.parse(data)[0].translations[0].text;
        $('#translation_output').text(result);
        console.log(result);

        $('#output_row').removeClass('d-none');

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
    //hide error message
    $('#error_message').addClass('d-none');

    //reset language selected
    $('#to_select').val('af');

    //reset detected language
    $('#detected_language').text('None');

    //clear translated text
    $('#output_row').addClass('d-none');

    //clear text
    $('#text_input').val(null);
}
