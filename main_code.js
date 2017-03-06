var work_status_element = document.getElementById("show_work_status");
work_status_element.innerHTML = "You don't have any tasks today.";

//save modal
$(document).on('click', '#take_notes_modal_done', function() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("notes_counter") === null) {
            localStorage.setItem("notes_counter", 1);
        }
        var notes_counter = localStorage.getItem("notes_counter");
        var notes_title = $('#take_notes_modal_heading').val();
        var notes_body = $('#take_notes_modal_body').val();
        var notes_json = {};
        notes_json[notes_title] = notes_body;
        key = "note" + notes_counter;
        localStorage.setItem(key, JSON.stringify(notes_json));
        localStorage.setItem("notes_counter", parseInt(notes_counter) + 1);
        $("#take_notes_modal").modal("hide");
    } else {
        console.log("Update Chrome");
    }
})

//expand modal
$(document).on('click', '.option_icons', function() {
    parents_list = $(this).parentsUntil('.modal');
    parents_list[2].className += " modal-lg";
    $('#take_notes_modal_body').css("height", "25vw");

})

//show existing notes
$(document).on('click', '.show_existing_notes', function() {
    var modal_body = document.getElementById('show_notes_modal_body');
    var notes_counter = localStorage.getItem("notes_counter");
    for (var counter = 1; counter < notes_counter; counter++) {
        var item = JSON.parse(localStorage.getItem("note" + counter));
        for (var key in item) {
            var note_item_span = document.createElement("span")
            var heading = document.createElement("h6");
            heading.textContent = key; //heading assigned
            var p = document.createElement("p");
            p.textContent = item[key]; //note content assigned
            var hr = document.createElement("hr");
            note_item_span.appendChild(heading);
            note_item_span.appendChild(p);
            note_item_span.appendChild(hr);
            modal_body.appendChild(note_item_span);
            // heading.
            // "<h6></h6><p>agra hejehdcqweucqwinwq ehcjewjen  w iweuc</p>"
        }
    }
    // list_block = "<h6></h6><p>agra hejehdcqweucqwinwq ehcjewjen  w iweuc</p>"
    $("#show_notes_modal").modal("show");

})

//get latest headlines

function get_headlines() {
    $.ajax({
        url: 'https://newsapi.org/v1/articles?source=the-times-of-india&sortBy=top&apiKey=364feaa102f5423e955bbca54932d768',
        type: 'GET',
        success: function(data) {
            window.data = data;
            headlines_block = document.getElementById("headlines_block");
            for (var counter = 0; counter < data['articles'].length; counter++) {
                var headline = data['articles'][counter]['title'];
                var description = data['articles'][counter]['description'];
                var url = data['articles'][counter]['url'];
                var url_image = data['articles'][counter]['urlToImage'];
                description += '<img src='+ url_image +' class="popover_image">'
                // var newsitem = '<span data-toggle="popover" title='+headline+' data-content="And here"></span>';
                // 'class="popovers" data-toggle="popover" data-content='
                news_content = document.createElement('p');
                news_content.classList = "popovers";
                news_content.setAttribute("data-toggle", "popover");
                news_content.setAttribute("data-placement", "left");
                news_content.setAttribute("data-title", headline);
                news_content.setAttribute("data-content",description);
                // news_content.setAttribute("data-content", description);
                // news_content.setAttribute("data-img", url_image);
                // news_content.innerHTML = headline;
                // news_item_image = document.createElement('img');
                // news_item_image.src = url_image;
                // news_content.appendChild(news_item_image);
                // var newsitem = '<span class=news_item><p class="popovers" data-toggle="popover" data-placement="left" data-title='+ headline +'data-content='+description+'>'+headline+'</p></span><br>';
                news_item = document.createElement('span');
                news_item.classList = "news_item";
                //create link
                news_url = document.createElement('a');
                news_url.href = url;
                news_url.target = "_blank"
                news_url.textContent = headline;
                news_content.appendChild(news_url);
                news_item.appendChild(news_content);
                document.getElementById('headlines_block').appendChild(news_item);
                br = document.createElement('br');
                document.getElementById('headlines_block').appendChild(br);
                // var newsitem = "<span class='news_item'>"+news_content+"</span><br>";
                // headlines_block.insertAdjacentHTML('beforeend', newsitem);
            }
            $(".popovers").popover({
                trigger: "hover",
                html: true
            });
        },
        error: function(error) {
            console.log("Failed to access headlines. ERROR: " + JSON.stringify(error));
            // console.error(error);
        }
    });
}

get_headlines();

// $(document).ready(function(){

// });
