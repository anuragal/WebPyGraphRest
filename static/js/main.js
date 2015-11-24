/* BOOK Library API's

Defined Library book API's
- GET Books List
- Add New Book
- Delete Book
*/

function get_book_list()
{
    jQuery('#lblError').html("");
    $.ajax(
    {
        type: "GET",
        url: "book_list", 
        success: function(result) {
            var json_result = JSON.parse(result);
            var book_html = "";
            $.each(json_result, function(index, value) {
                book_html += "<div class='col-md-10 removed-padding'><div class='col-md-2 removed-padding '>"
                book_html += index + 1;
                book_html += "</div><div class='col-md-9 reduced-padding'>";
                book_html += value;
                book_html += "</div></div>"
            });
            jQuery('#ctrlBookList').html(book_html);
        }
    });
}

function add_book()
{
    jQuery('#lblError').html("");
    var book_name = jQuery('#txtBookName').val();
    if(book_name)
    {
        $.ajax(
        {
            type: "POST",
            url: "book_list/" + book_name,
            success: function(result) {
                get_book_list();
            }
        });
    }
    else
        jQuery('#lblError').html("Please enter book name");
}

function delete_book()
{
    jQuery('#lblError').html("");
    var book_name = jQuery('#txtBookName').val();
    if(book_name)
    {
        $.ajax(
        {
            type: "DELETE",
            url: "book_list/" + jQuery('#txtBookName').val(),
            success: function(result) {
                get_book_list();
            }
        });
    }
    else
        jQuery('#lblError').html("Please enter book name");
}
