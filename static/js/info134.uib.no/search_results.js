function search_for_movie(keyword, movies) {
    return movies.filter(
        m => (m.ntitle.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) ||
             (m.otitle.toLowerCase().indexOf(keyword.toLowerCase()) >= 0)
    );
}

function search_for_genre(genre, movies) {
    return movies.filter(
        m => genres_object[m._key].indexOf(genre.toLowerCase()) >= 0
    );
}

function search_for_cast(cast, movies) {
    return movies.filter(function (m) {

        if (!m.folk) {
            return false;
        }

        var folk = m.folk.split(", ");
        for (var i = 0; i < folk.length; i++) {
            var f = folk[i].toLowerCase().trim();
            if (f.indexOf(cast) >= 0) {
                return true;
            }
        }

        return false;
    });
}

function display_search_for_movie(results, container) {
    if (results.length == 0) {
        container.innerHTML = mediadb.templates.no_results;
        return;
    }

    var tmpl = mediadb.templates.movie_summary;
    container.innerHTML = "<div class='movie-section front-section'>";
    for (var i = 0; i < results.length; i++) {
        results[i].art_path = getNelsonImageUrl(results[i]._key);
        container.innerHTML += template(tmpl, results[i]);
    }
    container.innerHTML += "</div>";
}

window.addEventListener("load", function load(event) {

    // Whether or not to do a search.
    var placeholder = document.getElementById("search-results-placeholder");

    if (!placeholder) {
        return;
    }

	query_params = get_query_string_parameters(
        document.location.href.toLowerCase()
    );

    // Create an array of movie objects and preserve the key.
	search_results = [];
    for (var key in movies_object) {
        var obj = movies_object[key];
        obj["_key"] = key;
        search_results.push(obj);
    }

	if (query_params.cast) {
        var cast = query_params.cast.split(" ");
        for (var i = 0; i < cast.length; i++) {
            search_results = search_for_cast(cast[i], search_results);
        }
    }

	if (query_params.director) {
		search_results = search_results.filter(
            m => (m.dir && m.dir.toLowerCase().indexOf(query_params.director) >= 0)
        );
    }

	if (query_params.genre) {
        var genres = query_params.genre.split(",");
        for (var i = 0; i < genres.length; i++) {
            search_results = search_for_genre(genres[i].trim(), search_results);
        }
    }

    if (query_params.country) {
        search_results = search_results.filter(
            m => (m.dir && m.country.toLowerCase() == query_params.country)
        );
    }

    if (query_params.search) {
        search_results = search_for_movie(query_params.search, search_results);
    }

    display_search_for_movie(search_results, placeholder);
});
