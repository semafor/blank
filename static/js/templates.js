var mediadb = {};

mediadb["templates"] = {};
mediadb["templates"]["movie_summary"] = `
    <article class='summary'>
        <a href='show_movie.html?id={{_key}}'>
            <div class='preview-image' style='background-image: url({{art_path}})'>
            </div>
            <h3>
                {{otitle}}
            </h3>
        </a>
    </article>
`;

mediadb["templates"]["movie_single"] = `
<main class="film-single single-view">
    <article>
        <div class="meta">

            <img alt="{{otitle}}" class="main-art" src="{{art_path}}">

            <ul class="meta-menu">
                <li class="rate-movie"><a href="javascript:openDialog()">Vurdér film</a></li>
                <li class="add-movie"><a>Liste</a></li>
            </ul>

        </div>

        <div class="film-information">
            <h1>{{otitle}}</h1>
            <p class="film-year-origin">{{year}} — {{country}}</p>
            <p class="film-summary">{{description or ''}}</p>


            <h2>Regissør</h2>
            <p>{{dir}}</p>

            <h2>Medvirkende</h2>
            <ul class="actor-list">
                {{people_html}}
            </ul>

            <h2>Sjangre</h2>
            <nav class="genre-nav inline-menu">
                <ul>
                    {{genre_html}}
                </ul>
            </nav>

            <h2>Spilletid</h2>
            <p>{{length or 'Ukjent antall'}} minutter</p>

            {{trailer_html}}

            <h2>Vurderinger</h2>
            {{reviews_html or '<p>Filmen er ikke vurdert.</p>'}}
        </div>

    </article>

</main>

<div class="rating-dialog dialog">
    <a href="javascript:closeDialog()" class="dialog-close">×</a>
    <p class="dialog-title">Hva synes du om denne filmen?</p>
    <select name="rating">
        <option>Vennligst velg…</option>
        <option value="5">5 - Fantastisk</option>
        <option value="4">4 - Bra</option>
        <option value="3">3 - Ok</option>
        <option value="2">2 - Ikke bra</option>
        <option value="1">1 - Dårlig</option>
    </select>

    <button class="action-button button" onclick="closeDialog()">Lagre</button>
</div>
`;

mediadb["templates"]["genre"] = `
    <li>{{title}}</li>
`;

mediadb["templates"]["person"] = `
    <li>{{title}}</li>
`;

mediadb["templates"]["trailer"] = `
    <h2>Trailer</h2>
    {{youtube_embed}}
`;

mediadb["templates"]["review"] = `
    <li class="review">
        <span class="username">{{username}}</span>
        <span class="comment">{{comment or "Ingen kommentar."}}</span>
        <span class="rating rating-{{rating}}"></span>
    </li>
`;

mediadb["templates"]["no_results"] = `
    <p>Vi kunne ikke finne noen filmer som passet forespørselen.</p>
`;
