/**
Super simple template implementation.

Note that this will only replace {{foo}}, not {{ foo }} etc.

Author: jdr004
*/
function template(tmpl, data) {

    /* Find {{foo or 'bar'}} and do the right thing: replace foo with 'bar'
    if foo is not defined in data. */
    var fooOrBarRe = new RegExp("\{{2}([a-z]+) or [\"|\'](.*)[\"|\']\}{2}", "g");
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

Author: jdr004
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

