from flask import Flask, render_template, url_for
import tmdbsimple as tmdb
import rtsimple as rt
from random import choice
import json
import requests
import os

app = Flask(__name__)

APP__ROOT = os.path.dirname(os.path.abspath(__file__))


@app.route('/')
def hello_world():
    tmdb.API_KEY = '77361ec1e5766470409b32417bc7594b'
    api_key = tmdb.API_KEY

    a = [json.loads(f)['id'] for f in open(f'movie_ids.json')]
    movie_id = choice(a)
    movie_selection = tmdb.Movies(movie_id)
    movie_info = movie_selection.info()

    movie_title = movie_selection.title

    if len(movie_info['genres']) > 0:
        genre_request = movie_info['genres'][0]
        genre = genre_request['name']
    else:
        genre = "No genre specified"

    runtime = movie_info.get('runtime')

    if runtime != None and runtime > 0:
        hours = int(runtime / 60)
        minutes = int(runtime % 60)
        runtime = f"{hours} hours and {minutes} minutes"
    elif runtime == 'None':
        runtime = "No runtime specified"
    elif runtime == 0:
        runtime = "No runtime specified"
    else:
        runtime = "No runtime specified"

    if movie_info.get('poster_path') == None:
        poster_image_path = "./static/images/no_poster.png"
    else:
        poster = movie_info.get('poster_path')
        poster_image_path = 'https://image.tmdb.org/t/p/w1280' + str(poster)

    release_date = movie_info.get('release_date')

    if movie_info.get('overview') == "":
        plot = "No plot given."
    else:
        plot = movie_info.get('overview')

    return render_template("index.html", movie_title=movie_title, genre=genre,
                           runtime=runtime, release_date=release_date, plot=plot,
                           poster_image_path=poster_image_path)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
