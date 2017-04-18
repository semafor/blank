window.addEventListener("load", function load(event) {
    var placeholder = document.getElementById("single-genre-placeholder");
    if (!placeholder) {
        return;
    }

    var query_params = get_query_string_parameters(document.location.href);
    var genre = query_params.title;
    var movies = [];

    for (var k in genres_object) {
        if (genres_object[k].indexOf(genre) >= 0) {
            movies.push(k);
        }
    }

    var tmp = document.createElement('div');
    tmp.innerHTML = template(
        mediadb.templates.genre_single, { title: genre }
    );
    placeholder.parentNode.insertBefore(tmp, placeholder);

    render_set_of_movies("single-genre-placeholder", movies);
});
