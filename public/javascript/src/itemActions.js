$(function () {
    $('table.accidentsList').on('click', 'td a.deleteItem', deleteItem)
        .on('click', 'td a.addItem', addItem)
        .on('click', 'td a.updateItem', updateItem)
        .on('click', 'td a.saveItem', saveItem);
});

function saveItem(event) {
    event.preventDefault();

    var updateAccident = {
        'address': $('td.updating')[0].textContent,
        'type': $('td.updating')[1].textContent,
        'status': $('td.updating')[2].textContent,
        'photo': $('td.updating')[3].textContent
    };

    $.ajax({
        url: "/update/" + $(this).attr('rel'),
        type: "POST",
        data: updateAccident
    }).done(function (response) {
        location.reload();
    }).error(function (err) {
        console.log("Error " + err);
    });

}
function updateItem(event) {
    event.preventDefault();

    // make cells editable
    var thisTdArray = $(this).parentsUntil('table')[1].childNodes;
    for (var i = 1; i < 5; i++) {
        thisTdArray[i].setAttribute('contenteditable', 'true');
        thisTdArray[i].className = 'updating';
    }

    // change class name
    $(this)[0].className = 'saveItem';
    // change icon image
    var img = $(this)[0].childNodes[0];
    img.setAttribute('src', '../img/save.png');
}
function deleteItem(event) {
    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this accident?');

    if (confirmation === true) {

        $.ajax({
            type: "DELETE",
            url: "/delete/" + $(this).attr('rel')
        }).done(function (response) {
            location.reload();
        }).error(function (err) {
            console.log("Error " + err);
        });
    }
    else {
        return false;
    }
}

function addItem(event) {
    event.preventDefault();

    var newAccident = {
        'address': $('td.address')[0].textContent,
        'type': $('td.type')[0].textContent,
        'status': $('td.status')[0].textContent,
        'photo': $('td.photo')[0].textContent
    };

    $.ajax({
        url: "/save",
        type: "POST",
        data: newAccident
    }).done(function (response) {
        location.reload();
    }).error(function (err) {
        console.log("Error " + err);
    });

}