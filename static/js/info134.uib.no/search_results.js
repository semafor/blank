function search_for_movie(keyword, movies) {
    return movies.filter(
        m => (m.ntitle.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) ||
             (m.otitle.toLowerCase().indexOf(keyword.toLowerCase()) >= 0)
    );
}

function display_search_for_movie(results, container) {
    var tmpl = mediadb.templates.movie_summary;

    container.innerHTML = "<div class='movie-section front-section'>";
    for (var i = 0; i < results.length; i++) {
        results[i].art_path = getNelsonImageUrl(results[i]._key);
        console.log(getNelsonImageUrl(results[i]._key))
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

	query_params = get_query_string_parameters();

    // Create an array of movie objects and preserve the key.
	search_results = [];
    for (var key in movies_object) {
        var obj = movies_object[key];
        obj["_key"] = key;
        search_results.push(obj);
    }

	if (query_params.film_title) {
        film_title = document.getElementById("film_title");
    }

	if (query_params.actor) {
        actor = document.getElementById("actor");
		actor.innerHTML = query_params.actor;
    }

	if (query_params.director) {
		director = document.getElementById("director");
		director.innerHTML = query_params.director;
    }

	if (query_params.genre) {
        genre = document.getElementById("genre");
		genre.innerHTML = query_params.genre;
    }

	if (query_params.country) {
        country = document.getElementById("country");
		country.innerHTML = query_params.country;
    }

    if (query_params["search"]) {
        search_results = search_for_movie(query_params["search"], search_results);
    }

    console.log(search_results)
    display_search_for_movie(search_results, placeholder);

	//Her kan dere for eksempel kalle en (display) funksjon som viser søkeresultater
});
