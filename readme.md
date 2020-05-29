![logo](https://i.imgur.com/JE5v1H6.png)

MovieMatch! is a web app that I decided to create after having a hard time with my significant other when trying to figure out what to watch on any given night.

## Why it was created
After watching a youtube video for a similar idea I decided to try and create something similar but implement my own wants/needs into the web app.

The current iteration is actually very simple. When the page reloads a new random movie is shown with it's release date, runtime, poster, and a short plot. Currently it grabs from a json file that includes every single movie ever made to date. There are no other functions other than reloading for now. 

In the next version I will be adding/changing/removing some things. Some of the major ones to note would be that it will only show movies from main stream streaming services such as Netflix, Hulu, Amazon Prime, and Disney Plus. It will also have the option to select which of those to show from so you don't see movies that you don't have access too. It will also have a way to actually save the movies you've liked to a profile to where you can keep them stored so you won't ever have to remember the ones you thought about watching or the ones you really wanted to watch but can't remember the name of at any given time. The last major feature to be implemented will be a button, pretty much a button that says Watch!, that will take you directly to that movie on the given streaming service that it is on.

The project will also probably be renamed to something that will fit it more since it will also be showing shows/tv shows rather than just movies alone.

Alongside the above I'll also be migrating from Flask to Django so that I can use their already created code for the admin panel and more!

## How to run it

To use the app you will need create a virtual env and install everything that is included in the requirements.txt (well really not everything, some are left over from when I was using Anaconda as my env manager but have since moved to Pipenv). 

Once all everything is installed you will just need to go into your terminal of choice and run
`flask run`

Or you can view a version I already have up at [Heroku](https://themoviematcher.herokuapp.com/)
*Note that the version on Heroku will not always be the most up to date one as I rarely push to there.

## Dependencies

Python 3.8.2
[Flask](https://flask.palletsprojects.com/en/1.1.x/)
[The Movie Database Python API Wrapper](https://pypi.org/project/tmdbsimple/)
[Bootstrap](https://getbootstrap.com/)
[Fontawesome](https://fontawesome.com/)
