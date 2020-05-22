//global vars
var recordingsCount;
var audioElement;
var isPlayerBarHidden;
var isStylistic;

// on page load
$(document).ready(() => {
    $("#menu_item_home").addClass("active");

    reset();
    
    recordingsCount = 0;
    isPlayerBarHidden = true;
    //$('.toast').toast('show');

    isStylistic = false;
});


function handleDeleteRow(event) {
    event.currentTarget.parentNode.parentNode.parentNode.remove();  

    if (document.getElementById('recordings_table').rows.length == 1) {
        $('#empty_table_msg').removeClass('d-none');
    }

    recordingsCount--;

    return false;
}

//on voice select list change
function handleVoiceChange(event) {
    //console.log('voice changed:', event.currentTarget.value);

    var voice = event.currentTarget.value;
    var styleArray;
    var styleSelect = document.getElementById('style_select');

    //show or hide the speed select
    if (voice != 'standard') {
        $("#speed_container").removeClass('d-none');
    } else {
        $("#speed_container").addClass('d-none');
        $("#speed_input").val('1'); //reset speed
    }

    //show or hide the style select option
    if (voice == 'en-US-AriaNeural') {
        styleArray = {
            newscast: 'News Cast',
            customerservice: 'Customer Service',
            chat: 'Chat',
            cheerful: 'Cheerful',
            empathetic: 'Empathetic'
        };

        styleSelect.options.length = 0;

        for (item in styleArray) {
            styleSelect.options[styleSelect.options.length] = new Option(styleArray[item], item);
        }

        $('#style_select_container').removeClass('d-none');

        isStylistic = true;
    }
    else if (voice == 'zh-CN-XiaoxiaoNeural') {
        styleArray = {
            newscast: 'News Cast',
            customerservice: 'Customer Service',
            assistant: 'Assistant',
            lyrical: 'Lyrical'
        };

        styleSelect.options.length = 0;

        for (item in styleArray) {
            styleSelect.options[styleSelect.options.length] = new Option(styleArray[item], item);
        }

        $('#style_select_container').removeClass('d-none');

        isStylistic = true;
    }
    else {
        $('#style_select_container').addClass('d-none');
        isStylistic = false;
    }
}

// handle record button click
function record() {
    $('#error_message').addClass('d-none'); //hide any error messages

    var txt = $("#text_input").val(); //get text
    var voice = $("#voice_select").val(); //get selected voice
    var style = $("#style_select").val(); //get selected style
    var speed = $("#speed_input").val(); //get speed

    //check text input
    if (txt.length == 0 || txt == '') {
        $("#text_input").addClass('error');
        return;
    } else {
        $("#text_input").removeClass('error');
    }

    //check speed input
    if (speed == null || speed == "" || speed < 0) {
        $('#error_message').text('Speed cannot be blank, and it must be greater than 0.');
        $('#error_message').removeClass('d-none'); //show error message
        return;
    }

    //show spinner
    $('#loading_spinner_row').removeClass('d-none');

    jQuery.get('/record', { message: txt, voice: voice, style: style, speed: speed }, function (data) {
        //console.log('successfully made Record call to server');
        
        //add data to datatable
        var table = document.getElementById('recordings_table');
        var row = table.insertRow();
        var numberCell = row.insertCell(0);
        var textCell = row.insertCell(1);
        var voiceCell = row.insertCell(2);
        var typeCell = row.insertCell(3);
        var speedCell = row.insertCell(4);
        var dateTimeCell = row.insertCell(5);
        var audioCell = row.insertCell(6);
        var closeCell = row.insertCell(7);

        numberCell.innerHTML = recordingsCount + 1; //set number column

        textCell.innerHTML = '<div>' + txt + '</div>'; //set text column

        let filePath = data.split("/");
        filePath = filePath[filePath.length - 1].split("\\");
        let fileName = filePath[filePath.length - 1]; //set filename column

        voiceCell.innerHTML = $('#voice_select option:selected').text(); //set voice column

        if (isStylistic) {
            voiceCell.innerHTML += ' | ' + $('#style_select option:selected').text();
        }

        typeCell.innerHTML = $('#voice_select option:selected').data('type'); //set type column

        speedCell.innerHTML = $('#speed_input').val(); //set speed column

        let currentDate = new Date();
        dateTimeCell.innerHTML = currentDate.toISOString(); //set date/time column
        
        audioCell.innerHTML = '<audio controls><source src="/audio/' + fileName + '" type="audio/wav"></source></audio>'; //set audio player column

        //set close/actions column
        closeCell.innerHTML = '<div class="btn-group" role="group" aria-label="Row Actions">' + 
            '<a class="btn btn-primary" href="/audio/' + fileName + '" title="Download" download>' +
            '<svg class="bi bi-download" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '    <path fill-rule="evenodd" d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8z" clip-rule="evenodd" />' +
            '    <path fill-rule="evenodd" d="M5 7.5a.5.5 0 01.707 0L8 9.793 10.293 7.5a.5.5 0 11.707.707l-2.646 2.647a.5.5 0 01-.708 0L5 8.207A.5.5 0 015 7.5z" clip-rule="evenodd" />' +
            '    <path fill-rule="evenodd" d="M8 1a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 1z" clip-rule="evenodd" />' +
            '</svg>' +
            '</a>' +
            '<button id="delete_' + (recordingsCount + 1) + '" class="btn btn-light delete" title="Remove" onclick="handleDeleteRow(event);">' +
            '<svg class="bi bi-trash" width = "1em" height = "1em" viewBox = "0 0 16 16" fill = "currentColor" xmlns = "http://www.w3.org/2000/svg" >' +
            '    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />' +
            '    <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd" />' +
            '</svg >' +
            '</button>' +
            '</div>';

        //hide spinner
        $('#loading_spinner_row').addClass('d-none');
        //show success toast
        $('.toast').toast('show');

        recordingsCount++; //increment recordings count
        
        //hide table empty message
        if (recordingsCount > 0) {
            isTableEmpty = false;
            $('#empty_table_msg').addClass('d-none'); //hide table empty div
        }

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

// handle play button click
function play() {
    $('#error_message').addClass('d-none'); //hide any error messages

    var txt = $("#text_input").val();
    var voice = $('#voice_select').val();
    var style = $("#style_select").val(); //get selected style
    var speed = $("#speed_input").val();

    if (txt.length == 0 || txt == '') {
        $("#text_input").addClass('error');
        return;
    } else {
        $("#text_input").removeClass('error');
    }

    //check speed input
    if (speed == null || speed == "" || speed < 0) {
        $('#error_message').text('Speed cannot be blank, and it must be greater than 0.');
        $('#error_message').removeClass('d-none'); //show error message
        return;
    }

    //show spinner
    $('#loading_spinner_row').removeClass('d-none');
    
    jQuery.get('/play', { message: txt, voice: voice, style: style, speed: speed }, function (data) {
        //console.log('successfully made Play call to server');

        try { //play back audio
            audioElement = new Audio("data:audio/wav;base64," + data);
            audioElement.ontimeupdate = updateBar;
            audioElement.onplay = function () {
                //show progress bar
                jQuery('.progress').removeClass('d-none');
            };
            audioElement.onended = function () {
                //hide progress bar
                $('#progress_bar').addClass('d-none');
                $('.progress-bar').width('0%');
            }


            $('#loading_spinner_row').addClass('d-none'); //hide main spinner
            

            audioElement.play(); //play audio!

            //code to show audio element
            /*
            var audioPlayer = document.getElementById('audio_player');
            audioPlayer.src = "data:audio/wav;base64," + data;
            audioPlayer.controls = true;
            */

        } catch (e) {
            //error creating audio element
            $('#error_message').text('Your browser does not support audio playback');
            $('#error_message').removeClass('d-none');
        }

    }).catch((error) => {
        console.log('error');
        console.log(error);

        //hide spinner
        $('#loading_spinner_row').addClass('d-none');

        $('#error_message').text('There was an issue with your request...');
        $('#error_message').removeClass('d-none'); //show error message
    });

}

//pause function
function pause() {

}

//handle reset button click
//reset text and audio player
function reset() {
    //check if audioElement is initialized
    if (audioElement) {
        //reset audio element
        audioElement.pause();
        audioElement.currentTime = 0;

        //hide progress bar
        $('#progress_bar').addClass('d-none');
        $('.progress-bar').width('0%');
    }

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

// update progress bar
function updateBar() {

    var duration = audioElement.duration;
    var currTime = audioElement.currentTime;
    var progress = (currTime / duration) * 100;

    $('.progress-bar').width(progress + '%');
}