# routes/api_routes.py
from flask import Blueprint, request, render_template
from datetime import datetime
from handlers.openai_handler import get_response_from_aoai

api_routes = Blueprint('api_routes', __name__)

@api_routes.route('/')
def index():
    return render_template('index.html')

@api_routes.route('/api', methods=['GET'])
def get_api_welcome():
    return {
        'message': 'Welcome to the API', 'status': 'OK', 'timestamp': datetime.now()
    }

@api_routes.route("/api/get", methods=['GET'])
def get_completion_response():
    user_input = request.args.get('userinput')
    print("User Text: ", user_input)
    response = get_response_from_aoai(user_input)
    print("AOAI Response: ", response)
    return str(response)
