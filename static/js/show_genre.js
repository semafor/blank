window.addEventListener("load", function load(event) {
    var placeholder = document.getElementById("single-genre-placeholder");
    if (!placeholder) {
        return;
    }

    var query_params = get_query_string_parameters(document.location.href);
    var genre = query_params.title;
    var movies = [];
    console.log(genres_object)

    for (var movieId in genres_object) {
        for (var genreName in genres_object[movieId]) {
            if (genreName.indexOf(genre) >= 0) {
                movies.push(movieId);
            }
        }
    }

    var tmp = document.createElement('div');
    tmp.innerHTML = template(
        mediadb.templates.genre_single, { title: genre }
    );
    placeholder.parentNode.insertBefore(tmp, placeholder);

    render_set_of_movies("single-genre-placeholder", movies);
});
