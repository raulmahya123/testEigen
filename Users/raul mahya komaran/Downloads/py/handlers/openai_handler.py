# handlers/openai_handler.py
from openai import Completion
from dotenv import dotenv_values
import os
from datetime import datetime

config_details = dotenv_values(".env")
api_key = os.getenv('OPENAI_API_KEY')

def get_response_from_aoai(user_input):
    user_prompt = f"User Input: {user_input}\n\n"

    try:
        response = Completion.create(
            engine=config_details['COMPLETIONS_MODEL'],
            prompt=user_prompt,
            temperature=0.1,
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
