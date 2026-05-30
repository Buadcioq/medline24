from flask import Flask, jsonify, request, render_template
import json, os
app = Flask(__name__)
DATA = os.path.join(os.path.dirname(__file__), "data", "cities.json")

def load():
    with open(DATA, "r", encoding="utf-8") as f:
        return json.load(f)

def save(d):
    with open(DATA, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/api/cities")
def get_cities():
    return jsonify(load())

@app.route("/api/cities", methods=["POST"])
def add_city():
    city = request.json
    cities = load()
    cities = [c for c in cities if c["id"] != city["id"]]
    # ensure doctors/reviews exist
    if "doctors" not in city:
        city["doctors"] = []
    if "reviews" not in city:
        city["reviews"] = []
    cities.append(city)
    save(cities)
    return jsonify({"ok": True})

if __name__ == "__main__":
    app.run(debug=True)
