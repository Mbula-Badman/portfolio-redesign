from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/profile-photo')
def profile_photo():
    return send_from_directory(app.root_path, 'passport.jpeg')

@app.route('/')
def home():
    return render_template('index.html', current_year=2026)

@app.route('/about')
def about():
    return render_template('about.html', current_year=2026)

@app.route('/skills')
def skills():
    return render_template('skills.html', current_year=2026)

@app.route('/projects')
def projects():
    return render_template('projects.html', current_year=2026)

@app.route('/cv')
def cv():
    return render_template('cv.html', current_year=2026)

@app.route('/services')
def services():
    return render_template('services.html', current_year=2026)

@app.route('/contact')
def contact():
    return render_template('contact.html', current_year=2026)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
