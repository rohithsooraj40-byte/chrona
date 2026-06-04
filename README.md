# Chrona

An interactive Flask website that teaches time travel concepts through science explanations and visual simulations.

## Tech Stack

- Python
- Flask
- HTML
- CSS
- JavaScript

## Local Run

```bash
pip install -r requirements.txt
python app.py
```

The app runs at `http://127.0.0.1:5000` locally. Debug mode is off by default; set
`FLASK_DEBUG=1` only while developing.

## Production Notes

For Render or Heroku-style hosts, the included `Procfile` starts the app with Gunicorn:

```bash
web: gunicorn app:app
```

MathJax is loaded from a CDN in `templates/base.html`, so equations render as formatted math when
the browser has network access.

## Render Deployment

This project includes `render.yaml` for Render Blueprint deployment.

Manual Render settings:

- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn app:app`
- Runtime: Python
- Environment variable: `FLASK_DEBUG=0`

Render deploys from a GitHub/GitLab/Bitbucket repository. After the first deploy, every push to the
linked branch can automatically rebuild the live `onrender.com` site.

## Run Locally

```bash
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.
