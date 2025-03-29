import os
import uuid
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

app = Flask(__name__)
CORS(app)

# Use an environment variable for the secret key in production.
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'testest')

# In-memory user store (for demo purposes only)
users = []

# --- Create special users manually if they do not already exist ---

# Create bank admin ("messi") with password "password"
admin = next((u for u in users if u.get("username") == "messi" and u.get("role") == "admin"), None)
if not admin:
    admin = {
        'id': str(uuid.uuid4()),
        'username': 'messi',
        'email': 'messi@bank.com',
        'password': generate_password_hash("password", method='pbkdf2:sha256'),
        'role': 'admin'
    }
    users.append(admin)

# Create a sample bank employee ("employee") with password "employee123"
employee = next((u for u in users if u.get("username") == "employee" and u.get("role") == "employee"), None)
if not employee:
    employee = {
        'id': str(uuid.uuid4()),
        'username': 'employee',
        'email': 'employee@bank.com',
        'password': generate_password_hash("employee123", method='pbkdf2:sha256'),
        'role': 'employee'
    }
    users.append(employee)

# --- Normal user registration and login ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    # Normal users are registered with role "normal" by default.
    if not username or not email or not password:
        return jsonify({'message': 'Please fill in all fields.'}), 400
    if any(user['email'] == email for user in users):
        return jsonify({'message': 'User already exists.'}), 400
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = {
        'id': str(uuid.uuid4()),
        'username': username,
        'email': email,
        'password': hashed_password,
        'role': 'normal'
    }
    users.append(new_user)
    return jsonify({'message': 'User registered successfully.', 'role': 'normal'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    # This endpoint is for normal user login.
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'message': 'Please fill in all fields.'}), 400
    user = next((user for user in users if user['email'] == email and user['role'] == 'normal'), None)
    if not user:
        return jsonify({'message': 'User not found.'}), 400
    if not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials.'}), 400
    token = jwt.encode({
        'id': user['id'],
        'email': user['email'],
        'role': user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token, 'message': 'Logged in successfully.', 'role': user['role']}), 200

# --- Admin login endpoint ---

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # Check if the credentials match the admin ("messi")
    admin_user = next((u for u in users if u.get("username") == "messi" and u.get("role") == "admin"), None)
    if not admin_user:
        return jsonify({'message': 'Admin user not found.'}), 400
    if username != admin_user['username'] or not check_password_hash(admin_user['password'], password):
        return jsonify({'message': 'Invalid admin credentials.'}), 400
    token = jwt.encode({
        'id': admin_user['id'],
        'email': admin_user['email'],
        'role': admin_user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    # Ensure token is a string if it's a bytes object
    if isinstance(token, bytes):
        token = token.decode('utf-8')
    return jsonify({'token': token, 'message': 'Admin logged in successfully.', 'role': admin_user['role']}), 200



# --- Employee login endpoint ---

@app.route('/api/employee/login', methods=['POST'])
def employee_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    employee_user = next((u for u in users if u.get("username") == username and u.get("role") == "employee"), None)
    if not employee_user:
        return jsonify({'message': 'Employee not found.'}), 400
    if not check_password_hash(employee_user['password'], password):
        return jsonify({'message': 'Invalid credentials.'}), 400
    token = jwt.encode({
        'id': employee_user['id'],
        'email': employee_user['email'],
        'role': employee_user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token, 'message': 'Employee logged in successfully.', 'role': employee_user['role']}), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    # In a stateless JWT setup, logout is handled on the client side.
    return jsonify({'message': 'Logged out successfully.'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
