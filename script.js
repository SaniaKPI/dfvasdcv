var $phrase = $("#phrase");
var $table = $("#tableBody");

function send() {
    var searchPhrase = $phrase.val();
    $.ajax('https://jsonplaceholder.typicode.com/comments')
        .then(comments => {
            var result = comments.filter(comment => comment.body.includes(searchPhrase));
            $table.html(generateTableHtml(result));
        })
}

function cancel() {
    $phrase.val('');
    $table.html('');
}

function generateTableHtml(comments) {
    if (comments.length) {
        return comments.map(comment =>
            `<tr>
                <th scope="row">${comment.id}</th>
                <td>${comment.name}</td>
                <td>${comment.email}</td>
                <td>${comment.body}</td>
            </tr>
    </tr>`).join();
    } else {
        return '<p>No results</p>'
    }


}