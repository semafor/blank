var current_user = "bruker1"

window.addEventListener("load", function load(event) {

    var xhr = new XMLHttpRequest();
    var userNameContainer = document.getElementById("user-name");

    xhr.open("GET", "http://wildboy.uib.no/mongodb/profiles/?filter_username=" + current_user + "&limit=1", true);
    xhr.responseType = "json";
    xhr.onload = function() {
        profile = xhr.response.rows[0];
        userNameContainer.innerHTML = profile.username;
        render_set_of_movies("loans-placeholder", profile ? profile.loans : []);
        render_set_of_movies("wishlist-placeholder", profile ? profile.mylist : []);
    }
    xhr.send();

    render_set_of_movies("recently-added-placeholder", [1080, 1637, 1509]);
    render_set_of_movies("recently-loaned-placeholder", [3828, 3221, 3214]);
    render_set_of_movies("recommended-movies-placeholder", [3134, 3256, 1217]);
});
