import openai
import json
import os

# Set up your OpenAI API credentials
openai.api_key = os.getenv("OPEN_AI_KEY")

def call_chat_gpt(prompt):

    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo-0613",
        messages = [
            {"role": "system", "content": " You are a helpful assistant that writes itineraries for events based on provided details. YOU ONLY RESPOND WITH JSON."},
            {"role": "user", "content": "Generate an itinerary  for an event for 6 people within 2 miles of South Lake Union in Seattle, WA that is mostly Outdoors. The group with travel via Rental Scooters/Bikes. The group would like to Explore. Include an activity in the itinerary that sends the group to Cherry Street Coffee in Belltown for a coffee stop"},
            {"role": "assistant", "content": "TODO"},
            {"role": "user", "content": prompt},
        ]   
    )

    return response["choices"][0]["message"]

#
#
def generate_event(distance, location, environment, 
                   transportation, activities, budget, 
                   duration, sponsored_location, sponsored_activity):

    template_prompt = "Generate an itinerary  for an event for 6 people within {} miles of {} that is mostly {}. The group with travel via {}. The group would like to {}. The budget of each person in the group is {} dollars. The event starts at {} and lasts for {} hours. Include an activity in the itinerary that sends the group to {} to do {}."
    prompt = template_prompt.format(distance, location, environment, transportation, activities, budget, TODO, duration, sponsored_location, sponsored_activity)
    return call_chat_gpt(prompt)


print(json.load(generate_event(
    "10", "Seattle","Outdoors",
    "Bikes", "Explore", "150",
    "5", "The George", "Eating"
)))