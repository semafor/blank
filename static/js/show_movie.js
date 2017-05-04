window.addEventListener("load", function load(event) {
    var container = document.getElementById("single-movie-placeholder");
    if (!container) {
        return;
    }

    var query_params = get_query_string_parameters(document.location.href);
    if (!query_params.id) {
        window.location.href = "/404.html";
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://wildboy.uib.no/mongodb/objects/?filter_id=" + query_params.id, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        movie_object = xhr.response.rows[0];

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

        // Genre stuffs.
        movie_object.genre_html = "<nav class='genre-nav inline-menu'><ul>";
        for (var k in genre_object) {
            movie_object.genre_html += template(mediadb.templates.genre, {
                title: k
            });
        }
        movie_object.genre_html += "</ul></nav>";

        // People stuff.
        movie_object.people_html = "<ul class='actor-list'>";
        var people_list = movie_object.folk ? movie_object.folk.split(",") : [];
        for (var i = 0; i < people_list.length; i++) {
            movie_object.people_html += template(mediadb.templates.person, {
                title: people_list[i].trim()
            });
        }
        movie_object.people_html += "</ul>";

        // Trailer stuff.
        movie_object.trailer_html = "";
        if (movie_object["youtube trailer id"]) {
            movie_object.trailer_html = template(mediadb.templates.trailer, {
                youtube_embed: getYouTubeEmbed(movie_object["youtube trailer id"])
            });
        }

        // Set up reviews html.
        if (review_object) {
            movie_object.reviews_html = "<ul class='reviews'>";
            var avg = 0;
            var numReviews = 0;
            var reviews = "";
            for (var reviewId in review_object) {
                avg += review_object[reviewId].rating;
                numReviews++;
                reviews += template(mediadb.templates.review, review_object[reviewId]);
            }

            if (numReviews) {
                var tmpl = mediadb.templates.rating_average;
                avg = avg / numReviews;
                avg = avg.toFixed(1);
                movie_object.reviews_html += template(tmpl, {'avg': avg});
            }
            movie_object.reviews_html += reviews;
            movie_object.reviews_html += "</ul>";
        }

        container.innerHTML = template(mediadb.templates.movie_single, movie_object);
    }

    xhr.send();
});
