from flask import Flask, render_template, jsonify, request, redirect, url_for, session  
from flask_cors import CORS  
import mysql.connector  

app = Flask(__name__)  
app.secret_key = 'your_secret_key'  
CORS(app)  

# Configure MySQL connection  
db_config = {  
    'user': 'your_username',  
    'password': 'your_password',  
    'host': 'localhost',  
    'database': 'countries_emerging',  
}  
conn = mysql.connector.connect(**db_config)  

@app.route('/')  
def index():  
    return render_template('index.html')  

@app.route('/api/countries', methods=['GET'])  
def get_countries():  
    cursor = conn.cursor(dictionary=True)  
    cursor.execute("SELECT * FROM countries")  
    countries = cursor.fetchall()  
    cursor.close()  
    return jsonify(countries)  

@app.route('/api/technologies/<int:country_id>', methods=['GET'])  
def get_technologies(country_id):  
    cursor = conn.cursor(dictionary=True)  
    cursor.execute("SELECT * FROM technologies WHERE country_id = %s", (country_id,))  
    technologies = cursor.fetchall()  
    cursor.close()  
    return jsonify(technologies)  

@app.route('/login', methods=['GET', 'POST'])  
def login():  
    if request.method == 'POST':  
        # Authentication logic here  
        username = request.form['username']  
        password = request.form['password']  
        # Simple example: hard-coded username/password check  
        if username == 'admin' and password == 'password':  
            session['user'] = username  
            return redirect(url_for('index'))  
    return render_template('login.html')  

@app.route('/logout')  
def logout():  
    session.pop('user', None)  
    return redirect(url_for('index'))  

if __name__ == '__main__':  
    app.run(debug=True)