from flask import Flask, abort, render_template, send_from_directory

app = Flask(__name__)

CERTIFICATES = {
    'ethical-hacker': 'Ethical_Hacker_certificate_mwendwa-mbula23-students-dkut-ac-ke_c5eb70c2-7596-4e10-a2f7-d26a16b339f6.pdf',
    'networking-essentials': 'Network_Technician_Career_Path_certificate_mwendwa-mbula23-students-dkut-ac-ke_0eda3734-2b31-4fa2-8310-8198522e46ea.pdf',
    'linux-essentials': '_certificate_mwendwa-mbula23-students-dkut-ac-ke_bb4a01b3-4dc0-4315-bdf0-5b07d2c0d005.pdf',
    'cyber-threat-management': 'Cyber_Threat_Management_certificate_mwendwa-mbula23-students-dkut-ac-ke_452097ba-25e3-459b-9a4e-4326bc2f278d.pdf',
    'managing-a-business-venture': 'Managing_a_Business_Venture_certificate_mwendwa-mbula23-students-dkut-ac-ke_dbf1a1eb-195e-4519-8546-c21db96867d1.pdf',
    'ai-for-beginners': 'AI for Beginners.pdf',
    'agile-project-management': 'Agile Project Management.pdf',
    'customer-experience-cx': 'Customer Experience (CX) for Business Success.pdf',
    'cybersecurity-awareness': 'Introduction to Cybersecurity Awareness.pdf',
    'business-email': 'Business Email.pdf',
    'effective-leadership': 'Effective Leadership.pdf',
    'selling-online': 'Selling Online.pdf',
    'resume-writing-job-interviewing': 'Resume Writing and Job Interviewing.pdf',
    'starting-small-business': 'Starting a Small Business.pdf',
}

PORTFOLIO_PHOTOS = {
    'electronics-workspace': 'WhatsApp Image 2026-11-03 at 11.02.39 AM.jpeg',
    'technology-shop': 'WhatsApp Image 2026-11-03 at 11.04.42 AM.jpeg',
    'professional-portrait': 'WhatsApp Image 2026-11-03 at 11.45.27 AM.jpeg',
}

CERTIFICATE_TITLES = {
    'ai-for-beginners': 'AI for Beginners',
    'customer-experience-cx': 'Customer Experience (CX) for Business Success',
}


@app.route('/certificates/<certificate>')
def certificate(certificate):
    filename = CERTIFICATES.get(certificate)
    if filename is None:
        abort(404)
    return send_from_directory(app.root_path, filename, mimetype='application/pdf')


@app.route('/certificate-preview/<certificate>')
def certificate_preview(certificate):
    if certificate not in CERTIFICATES:
        abort(404)
    title = CERTIFICATE_TITLES.get(certificate, certificate.replace('-', ' ').title())
    return render_template(
        'certificate_preview.html',
        certificate=certificate,
        certificate_title=title,
        current_year=2026,
    )


@app.route('/portfolio-photos/<photo>')
def portfolio_photo(photo):
    filename = PORTFOLIO_PHOTOS.get(photo)
    if filename is None:
        abort(404)
    return send_from_directory(app.root_path, filename, mimetype='image/jpeg')


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
