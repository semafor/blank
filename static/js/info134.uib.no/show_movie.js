window.addEventListener("load", function load(event) {
    var container = document.getElementById("single-movie-placeholder");
    if (!container) {
        return;
    }

    var query_params = get_query_string_parameters();
    if (!query_params.id) {
        window.location.href = "/404.html";
        return;
    }

    // get the movie_object from the "database" movies_object
    var movie_object = movies_object[query_params.id];
    if (!movie_object) {
        window.location.href = "/404.html";
        return;
    }


    // get the genre info (if it exists)
    var genre_object = genres_object[query_params.id];
    // get the review info (if it exists)
    var review_object = reviews_object[query_params.id];

    // Slap some more stuff onto the movie_object
    movie_object.art_path = getNelsonImageUrl(query_params.id);

    // TODO: this can be made much sweeter if template() did iterative repl.
    movie_object.genre_html = "<nav class='genre-nav inline-menu'><ul>";
    for (var i = 0; i < genre_object.length; i++) {
        movie_object.genre_html += template(mediadb.templates.genre, {
            title: genre_object[i]
        });
    }
    movie_object.genre_html += "</ul></nav>";

    // TODO: this can be made much sweeter if template() did iterative repl.
    movie_object.people_html = "<ul class='actor-list'>";
    var people_list = movie_object.folk ? movie_object.folk.split(",") : [];
    for (var i = 0; i < people_list.length; i++) {
        movie_object.people_html += template(mediadb.templates.person, {
            title: people_list[i].trim()
        });
    }
    movie_object.genre_html += "</ul>";

    movie_object.trailer_html = "";
    if (movie_object["youtube trailer id"]) {
        movie_object.trailer_html = template(mediadb.templates.trailer, {
            youtube_embed: getYouTubeEmbed(movie_object["youtube trailer id"])
        });
    }

    container.innerHTML = template(mediadb.templates.movie_single, movie_object);

    // // render page
    // var title_element = document.getElementById("otitle");
    // // title_element.appendChild(document.createTextNode(movie_object["otitle"]));
    // title_element.innerHTML = movie_object["otitle"];

    // // add a "debug-table" on the bottom showing all elements from movie_object
    // stats_table = document.getElementById("movie_stat_table");
    // for (key in movie_object) {
    //     left = document.createTextNode(key);
    //     right = document.createTextNode(movie_object[key]);
    //     add_row(stats_table, left, right);
    // }

    // // add a "debug-table" on the bottom showing all genre info
    // genre_table = document.getElementById("genre_stat_table");
    // for (var i in genre_object) {
    //     left = document.createTextNode(i);
    //     right = document.createTextNode(genre_object[i]);
    //     add_row(genre_table, left, right);
    // }

    // // review object debug-table
    // review_table = document.getElementById("review_stat_table");
    // for (key in review_object) {
    //     left = document.createTextNode(key);
    //     right = document.createTextNode(review_object[key]);
    //     add_row(review_table, left, right);
    //     for (subkey in review_object[key]) {
    //         left = document.createTextNode(" -> " + subkey);
    //         right = document.createTextNode(review_object[key][subkey]);
    //         add_row(review_table, left, right);
    //     }
    // }

});

