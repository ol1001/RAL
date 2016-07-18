$(function () {

    $.getJSON("http://localhost:8083/getaccident", function (data) {

        var table = $('table.accidentsList');
        var tableRow = '';
        var count = 0;

        $.each(data, function (index, item) {
            tableRow += '<tr><td>' + ++index +
            '</td><td>' + item.address +
            '</td><td>' + item.type +
            '</td><td>' + item.status +
            '</td><td>' + item.photo +
            '</td><td><a title="Delete item" href="#" class="deleteItem" rel="' + this._id + '"><img src="../../img/trash.png" alt="Delete"/></a>' +
            '<br/><a title="Update item" href="#" class="updateItem" rel="' + this._id + '"><img src="../../img/edit.png" alt="Edit"/></a></td></tr>';
            count = index;
        });
        var lastRow = '<tr class="lastRow"><td class="index" >' + ++count + '</td>' +
            '<td class="address" contenteditable="true"></td>' +
            '<td class="type" contenteditable="true"></td>' +
            '<td class="status" contenteditable="true"></td>' +
            '<td class="photo" contenteditable="true"></td>' +
            '<td><a title="Add new" href="#" class="addItem"><img src="../../img/add.png" alt="Add"/></a><br/>' +
            '<a href="#" class="uploadItem"><img src="../../img/upload.png" alt="Upload"/></a></td></tr>';

        table.append(tableRow);
        table.append(lastRow);
    });

});








