import csv
import os
import random

def suggest_tasks(goal, characteristics, age, interests, available_time, selected_week, used_tasks, sports_interest=None):
    all_tasks = []
    weekly_task_count = 8

    def collect_tasks(task_list):
        for task, difficulty in task_list:
            if task not in used_tasks:
                short_diff = {"Easy": "e", "Medium": "m", "Hard": "h"}[difficulty]
                all_tasks.append((task, short_diff))
               

    goal_tasks = {
        "confident": [
            ("Let your child lead a pretend class or storytelling session.", "Medium"),
            ("Encourage them to introduce themselves during a family video call.", "Hard"),
            ("Do a daily 'today I felt proud when…' reflection.", "Easy"),
            ("Play confidence-boosting games like charades.", "Easy"),
            ("Record a video of them presenting something.", "Hard"),
            ("Let them order at a restaurant or shop.", "Medium"),
            ("Give them a small leadership role in a group game.", "Medium"),
            ("Have them create and present a mini project.", "Hard")
        ],
        "independent": [
            ("Give them a simple daily task like setting the table.", "Easy"),
            ("Let them choose their clothes and explain their choices.", "Medium"),
            ("Encourage them to pack their own school bag.", "Medium"),
            ("Ask them to make their own snack.", "Hard"),
            ("Create a checklist for their morning routine.", "Easy"),
            ("Teach them to tie shoelaces or button shirts.", "Medium"),
            ("Ask them to plan a family game night.", "Hard"),
            ("Set small goals and track progress with stickers.", "Medium")
        ],
        "curious": [
            ("Have a 'why' question jar and explore answers together.", "Medium"),
            ("Start a small garden or science experiment.", "Hard"),
            ("Go on a nature walk and collect interesting things to discuss.", "Easy"),
            ("Make a question board at home.", "Easy"),
            ("Visit a museum or science center.", "Hard"),
            ("Build things from cardboard or kits.", "Medium"),
            ("Create a mystery box with clues and solve it.", "Hard"),
            ("Watch documentaries for kids and discuss them.", "Medium")
        ],
        "disciplined": [
            ("Use a visual routine chart.", "Easy"),
            ("Introduce a reward system for task completion.", "Medium"),
            ("Set up a quiet focus time with a timer.", "Hard"),
            ("Practice mindful breathing.", "Easy"),
            ("Use a chore wheel.", "Medium"),
            ("Write a weekly goal and check it off.", "Medium"),
            ("Introduce journaling to track good habits.", "Hard"),
            ("Establish screen time rules together.", "Medium")
        ]
    }

    char_tasks = {
        "shy": [
            ("Use puppets or toys to role-play social situations.", "Easy"),
            ("Do mirror talk or affirmations together.", "Medium"),
            ("Have small group playdates instead of large gatherings.", "Hard")
        ],
        "creative": [
            ("Start a storybook where they draw and narrate their ideas.", "Medium"),
            ("Do open-ended art projects with recyclables.", "Easy"),
            ("Have a costume day and act out a scene.", "Hard")
        ],
        "energetic": [
            ("Set up a fun indoor scavenger hunt.", "Medium"),
            ("Have timed races to clean up toys or books.", "Easy"),
            ("Do yoga or dancing to music.", "Medium")
        ],
        "sensitive": [
            ("Read books about emotions and talk about the characters.", "Easy"),
            ("Create a feelings chart and check in daily.", "Medium"),
            ("Make a calm corner with soft toys and sensory tools.", "Medium")
        ],
        "athletic": [
            ("Do a family relay race or sports day.", "Medium"),
            ("Teach warm-up routines.", "Easy"),
            ("Let them lead a mini workout session.", "Hard")
        ],
        "playful": [
            ("Have a silly dress-up day.", "Easy"),
            ("Invent a new game together.", "Medium"),
            ("Play an active pretend game like pirate treasure hunt.", "Hard")
        ]
    }

    interest_tasks = {
        "sports": [
            ("Play a new outdoor sport together.", "Medium"),
            ("Teach them basic stretching or warm-up exercises.", "Easy"),
            ("Watch a sports match and explain the rules.", "Medium"),
            ("Practice a sport skill for 15 minutes.", "Medium"),
            ("Create a fun obstacle course.", "Hard")
        ],
        "dance": [
            ("Learn a simple dance routine together.", "Medium"),
            ("Watch and copy dance videos.", "Easy"),
            ("Make a fun freestyle dance competition.", "Hard"),
            ("Record a dance performance.", "Medium")
        ],
        "singing": [
            ("Have a karaoke night.", "Medium"),
            ("Learn and sing new songs.", "Easy"),
            ("Record them singing and play it back.", "Hard"),
            ("Sing songs in different languages.", "Medium")
        ],
        "drawing": [
            ("Draw their favorite cartoon character.", "Easy"),
            ("Create a comic strip.", "Medium"),
            ("Join an online drawing challenge.", "Hard"),
            ("Make greeting cards.", "Medium")
        ]
    }

    interest_aliases = {
        "sports": "sports",
        "sport": "sports",
        "dance": "dance",
        "dancing": "dance",
        "sing": "singing",
        "singing": "singing",
        "art": "drawing",
        "drawing": "drawing",
        "draw": "drawing"
    }

    normalized_interests = set()
    for i in interests:
        key = interest_aliases.get(i.strip().lower(), None)
        if key:
            normalized_interests.add(key)

    if goal.lower() in goal_tasks:
        collect_tasks(goal_tasks[goal.lower()])

    for c in [x.strip().lower() for x in characteristics.split(",")]:
        if c in char_tasks:
            collect_tasks(char_tasks[c])

    for interest in normalized_interests:
        if interest in interest_tasks:
            collect_tasks(interest_tasks[interest])

    random.shuffle(all_tasks)
    selected_tasks = all_tasks[:weekly_task_count]
    suggestions = [(task, diff) for task, diff in selected_tasks]

    for task, _ in suggestions:
        used_tasks.add(task)

    return suggestions


if __name__ == "__main__":
    goal = input("What is your long-term goal for your child? (e.g., confident, curious): ")
    characteristics = input("Describe your child's characteristics (e.g., shy, creative, energetic): ")
    age = int(input("What is your child's age?: "))
    interests_input = input("List your child's interests separated by commas (e.g., drawing, music, sports): ")
    sports_interest = None
    if "sports" in interests_input.lower():
        sports_interest = input("Which sports does your child enjoy? (e.g., football, basketball, cricket): ").lower()
    available_time = input("When are you available? (morning, afternoon, evening): ")
    interests = [interest.strip().lower() for interest in interests_input.split(",")]

    selected_week = 1
    used_tasks = set()

    print(f"\nGenerating tasks for Week {selected_week}...")
    tasks = suggest_tasks(goal, characteristics, age, interests, available_time, selected_week, used_tasks, sports_interest)

    print(f"\nSuggested Tasks for Week {selected_week}:")
    if tasks:
        for task, diff in tasks:
            print(f"{task} (Difficulty: {diff})")
    else:
        print("No tasks found for the selected inputs.")

    # Save to CSV
    data_row = {
        "goal": goal,
        "characteristics": characteristics,
        "age": age,
        "interests": ", ".join(interests),
        "sports_interest": sports_interest or "",
        "available_time": available_time,
        "selected_week": selected_week,
        "tasks": " | ".join([f"{task} (Difficulty: {diff})" for task, diff in tasks])
    }

    csv_file = "child_task_suggestions.csv"
    file_exists = os.path.isfile(csv_file)

    fieldnames = [
        "goal",
        "characteristics",
        "age",
        "interests",
        "sports_interest",
        "available_time",
        "selected_week",
        "tasks"
    ]

    with open(csv_file, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow(data_row)

    print(f"\nWeek {selected_week} data saved to {csv_file}")
