import random
import sys

def survey_defaults():
    environments = ["Indoors", "Outdoors"]
    transportations = ["Walking", "Biking", "Driving"]
    budgets = [15, 50, 100, 150]
    activities = ["Eat", "Relax", "Explore"]
    distances = [1, 5, 7, 10]
    duration = [1, 1.5, 2, 3]

    return {
        'environment': environments,
        'transportation': transportations,
        'budget': budgets,
        'activities': activities,
        'distance': distances,
        'duration': duration
    }

def randomize(values):
    new_dict = {}
    for key, value in values.items():
        new_dict[key] = random.choice(value)

    return new_dict

def distance(actual, goal, values):
    # Find the positions of the actual and goal values in the values array
    actual_position = values.index(actual)
    goal_position = values.index(goal)

    # Calculate the distance between the actual position and the goal position
    distance = abs(actual_position - goal_position)
    return distance


def get_best_event(survey, event_map):
    categories = survey_defaults()

    best_score = sys.maxsize
    best_event = None
    best_event_id = None

    for event_id, event in event_map.items():
        score = 0
        for category, values in categories.items():
            try:
                score += distance(event[category], survey[category], values)
            except Exception as e:
                print(f"Issue during survey parsing: Category: {category} Error: {e}")

        if score < best_score:
            best_event = event
            best_event_id = event_id
            best_score = score

    return best_event_id, best_event
