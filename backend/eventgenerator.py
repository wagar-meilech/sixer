import openai
import json
import os
import datetime
import pytz

# Set up your OpenAI API credentials
openai.api_key = os.getenv("OPEN_AI_KEY")

def call_chat_gpt(messages):

    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo-0613",
        messages = messages
    )

    return response["choices"][0]["message"]

def generate_event(distance, location, environment, 
                   transportation, activities, budget, 
                   duration, sponsored_location, sponsored_activity):

    template_prompt = "Generate an itinerary  for an event for 6 people within {} miles of {} that is mostly {}. The group with travel via {}. The group would like to {}. The budget of each person in the group is {} dollars. The event starts at {} and lasts for {} hours. Include an activity in the itinerary that sends the group to {} to do {}."
    
    now = datetime.datetime.now().astimezone(pytz.timezone('US/Pacific')).strftime("%H:%M")
    
    prompt = template_prompt.format(distance, location, environment, transportation, activities, budget, now, duration, sponsored_location, sponsored_activity)

    script_directory = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_directory, "sample_response.json")

    with open(file_path, 'r') as file:
        json_data = json.load(file)
    
    sample_response = json.dumps(json_data)

    messages = [
        {"role": "system", "content": " You are a helpful assistant that writes itineraries for events based on provided details. YOU ONLY RESPOND WITH JSON."},
        {"role": "user", "content": "Generate an itinerary  for an event for 6 people within 2 miles of South Lake Union in Seattle, WA that is mostly Outdoors. The group with travel via Rental Scooters/Bikes. The group would like to Explore. The budget of each person in the group is 120 dollars. The event starts at 10:50 and lasts for 4 hours. Include an activity in the itinerary that sends the group to Cherry Street Coffee (2719 1st Ave, Seattle, WA 98121) to do playing Monopoly."},
        {"role": "assistant", "content": sample_response},
        {"role": "user", "content": prompt},
    ]  
    
    return call_chat_gpt(messages)


event = json.loads(generate_event(
        "10", "Seattle","Outdoors",
        "Bikes", "Explore", "150",
        "5", "The George", "Eating").to_dict()['content'])

with open("event.json", 'w') as file:
    json.dump(event, file)