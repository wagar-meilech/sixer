import sys

def survey_defaults():
    environments = ["Indoors", "Outdoors"]
    transportations = ["Walking", "Biking", "Driving"]
    budgets = [15, 50, 100, 150]
    activities = ["Eat", "Relax", "Explore"]
    distances = [1, 5, 7, 10]
    duration = [1, 1.5, 2, 3]

    return {
        'environments': environments,
        'transportations': transportations,
        'budgets': budgets,
        'activities': activities,
        'distances': distances,
        'duration': duration
    }

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

    for event_id, event in event_map.items():
        score = 0
        for category, values in categories.items():
            score += distance(event[category], survey[category], values)

        if score < best_score:
            best_event = event
            best_score = score

    return best_event
