from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash
import openai
import os
from dotenv import dotenv_values
import pandas as pd
from flask import jsonify

app = Flask(__name__, static_url_path='/static')
config_details = dotenv_values(".env")
openai.api_type = 'azure'
openai.api_base = config_details['OPENAI_API_BASE']
openai.api_version = config_details['OPENAI_API_VERSION']
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api',methods=['GET'])
def get_api_welcome():
    return {
        'message': 'Welcome to the API', 'status': 'OK', 'timestamp': datetime.now()
    }

@app.route("/api/get", methods=['GET'])
def get_completion_response():
    user_input = request.args.get('userinput')
    print("User Text: ", user_input)
    response = get_response_from_aoai(user_input)
    print("AOAI Response: ", response)
    return str(response)


@app.route("/api/process-file", methods=['POST'])
def process_file_and_get_response():
    try:
        # Check if the request includes a file
        if 'file' not in request.files:
            uploaded_file = request.files['file']
            if uploaded_file.filename == '':
                return 'No selected file'
            user_input = request.args.get('user_input')
            # Process the file content
            processed_content = process_file_content(uploaded_file)
            # Get response from the function
            response = get_response_from_aoai(user_input, processed_content)
        else:
            # No file present, use the user input directly
            user_input = request.args.get('userinput')
            response = get_response_from_aoai(user_input)
            processed_content = user_input

        # Generate OpenAI response based on processed content
        response = get_response_from_aoai(processed_content)
        print("AOAI Response: ", response)
        return jsonify({
            'processed_content': processed_content,
            'openai_response': response
        })
    except Exception as e:
        print("An exception has occurred:", str(e))
        return jsonify({'message': 'An error occurred while processing the request.'}), 500



def process_file_content(file):
    # Check if the file is a PDF
    if file.filename.lower().endswith('.pdf'):
        # Add PDF processing logic here (e.g., using a PDF processing library)
        # For now, let's just return a success message
        return 'PDF file processing is not implemented yet.'

    # Check if the file is a CSV
    elif file.filename.lower().endswith('.csv'):
        # Add CSV processing logic here (e.g., using Pandas)
        df = pd.read_csv(file)

        # For now, let's just return the first few rows of the CSV as JSON
        return df.head().to_json(orient='records')

    else:
        return 'Unsupported file format.'

def get_response_from_aoai(user_input):
    # Check if the user input is "halo"
    if user_input.lower() == "halo":
        return "Output: Halo! Apa yang bisa saya bantu?"
    
    # If not "halo," proceed with OpenAI completion
    user_prompt = f"User Input: {user_input}\n\n"

    try:
        response = openai.Completion.create(
            engine=config_details['COMPLETIONS_MODEL'],
            prompt=user_prompt,
            temperature=0,
            max_tokens=150,
            top_p=0.5,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None
        )

        answer = response.choices[0].text
        return answer
    except Exception as e:
        print("An exception has occurred:", str(e))
        return "An error occurred while processing the request."

if __name__ == "__main__":
    app.run(debug=True)