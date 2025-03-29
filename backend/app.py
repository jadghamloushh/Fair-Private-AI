import os
import uuid
import datetime
from functools import wraps

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

app = Flask(__name__)
CORS(app)

# Use environment variable for secret key (set a secure key in production)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'testest')

# In-memory user store (for demo purposes only)
users = []

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Token is expected in the x-access-token header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = next((user for user in users if user['id'] == data['id']), None)
            if not current_user:
                raise Exception("User not found")
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401

        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided.'}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    # Validate required fields
    if not username or not email or not password:
        return jsonify({'message': 'Please fill in all fields.'}), 400

    # Check if user already exists
    if any(user['email'] == email for user in users):
        return jsonify({'message': 'User already exists.'}), 400

    # Hash the password and generate a unique id
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = {
        'id': str(uuid.uuid4()),
        'username': username,
        'email': email,
        'password': hashed_password
    }
    users.append(new_user)
    return jsonify({'message': 'User registered successfully.'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided.'}), 400

    email = data.get('email')
    password = data.get('password')
    
    # Validate required fields
    if not email or not password:
        return jsonify({'message': 'Please fill in all fields.'}), 400

    # Find the user by email
    user = next((user for user in users if user['email'] == email), None)
    if not user:
        return jsonify({'message': 'User not found.'}), 400

    # Verify the password
    if not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials.'}), 400

    # Create JWT token (expires in 1 hour)
    token = jwt.encode({
        'id': user['id'],
        'email': user['email'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'token': token, 'message': 'Logged in successfully.'}), 200


@app.route('/api/logout', methods=['POST'])
def logout():
    # For a stateless JWT approach, logout is handled on the client-side by removing the token.
    # Here, we simply return a success message.
    return jsonify({'message': 'Logged out successfully.'}), 200


# @app.route('/api/profile', methods=['GET'])
# @token_required
# def profile(current_user):
#     # Return the current user's profile information (excluding the password)
#     user_data = {
#         'id': current_user['id'],
#         'username': current_user['username'],
#         'email': current_user['email']
#     }
#     return jsonify({'user': user_data}), 200

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
