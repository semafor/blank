window.addEventListener("load", function load(event) {
    var userId = mediadb["logged-in-user"];
    var data = user_data[userId];

    if (!userId) {
        console.log("No user.");
        return;
    }

    render_set_of_movies("loans-placeholder", data ? data.loaned : []);
    render_set_of_movies("wishlist-placeholder", data ? data.wishlist : []);
    render_set_of_movies("recently-added-placeholder", []);
    render_set_of_movies("recently-loaned-placeholder", []);
    render_set_of_movies("recommended-movies-placeholder", data.recommendations);
});
