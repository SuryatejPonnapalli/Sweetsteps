from flask import Flask, request, jsonify
from task_model import suggest_tasks

app = Flask(__name__)

@app.route('/')
def index():
    return open('index.html').read()

@app.route('/suggest_tasks', methods=['POST'])
def get_task_suggestions():
    data = request.get_json()

    goal = data.get("goal", "")
    characteristics = data.get("characteristics", "")
    age = data.get("age", 0)
    interests = data.get("interests", [])
    available_time = data.get("available_time", "")
    
    used_tasks = set()
    week = 1  # Only one week
    tasks = suggest_tasks(goal, characteristics, age, interests, available_time, week, used_tasks)
    all_week_tasks = {f"week_{week}": tasks}

    return jsonify(all_week_tasks)

if __name__ == "__main__":
    app.run(debug=True)

