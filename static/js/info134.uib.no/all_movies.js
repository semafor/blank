window.addEventListener("load", function load(event) {
    var container = document.getElementById("all-movies-placeholder");

    if (!container) {
        return;
    }

    var tmpl = mediadb.templates.movie_summary;

    for (var movie_id in movies_object) {
        movies_object[movie_id]._key = movie_id;
        movies_object[movie_id].art_path = getNelsonImageUrl(movie_id);
        container.innerHTML += template(tmpl, movies_object[movie_id]);
    }
});
