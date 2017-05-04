/**
Super simple template implementation.

Supported things:
    "{{foo}}" given data {foo: "bar"} will produce "bar".
    "{{foo or "baz"}}" given data {} will produce "baz".
    "{{foo or "baz"}}" given data {foo: "bar"} will produce "bar".

Note that this will only replace {{foo}}, not {{ foo }} etc.
*/
function template(tmpl, data) {

    /* Find {{foo or 'bar'}} and do the right thing: replace foo with 'bar'
    if foo is not defined in data. */
    var fooOrBarRe = new RegExp("\{{2}([a-z_]+) or [\"|\'](.*)[\"|\']\}{2}", "g");
    while (tmpl.search(fooOrBarRe) >= 0) {
        var matches = fooOrBarRe.exec(tmpl);
        var name = matches[1];
        var value;

        if (name in data && data[name]) {
            value = data[name];
        } else {
            value = matches[2];
        }
        tmpl = tmpl.replace(matches[0], value);
    }

    // Replace
    for (var k in data) {
        var exp = "{{" + k + "}}";
        tmpl.split(exp).join(data[k]);
        while (tmpl.indexOf(exp) >= 0) {
            tmpl = tmpl.replace(exp, data[k]);
        }
    }
    return tmpl;
}

/*
Given an movie ID, it will return a nelson URL.
*/
function getNelsonImageUrl(movie_id) {
    var parent = "0";
    if (movie_id > 999) {
        parent = movie_id.toString()[0];
    }
    return template("https://nelson.uib.no/o/{{parent}}/{{movie_id}}.jpg", {
        parent: parent,
        movie_id: movie_id
    });
}

/**
Given a youtube ID, it returns an embed.
*/
function getYouTubeEmbed(yid) {
    var tmpl = "<iframe width='560' height='315' src='https://www.youtube.com/embed/{{yid}}?ecver=1' frameborder='0' allowfullscreen></iframe>";
    return template(tmpl, {yid: yid})
}

function render_set_of_movies(placeholderId, movies) {
    var placeholder = document.getElementById(placeholderId);
    var tmpl = mediadb.templates.movie_summary;

    if (!placeholder) {
        return;
    }

    if (movies.length == 0) {
        placeholder.innerHTML = mediadb.templates.no_results;
        return;
    }

    for (var i = 0; i < movies.length; i++) {
        /* Use self-executing function expression so as to scope the xhr variable
         correctly. */
        (function (i) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://wildboy.uib.no/mongodb/objects/?filter_id=" + movies[i], true);
            xhr.responseType = "json";
            xhr.onload = function (e) {
                var movie_object = xhr.response.rows[0];
                if (!movie_object) {
                    console.error("Failed to load movie on URI", e.target.responseURL);
                    return;
                }
                movie_object.art_path = getNelsonImageUrl(movies[i]);
                movie_object._key = movies[i];
                placeholder.innerHTML += template(tmpl, movie_object);
            };
            xhr.send();
        })(i);
    }
}

/* escapes html */
function escape(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}
