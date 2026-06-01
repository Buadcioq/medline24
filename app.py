from flask import Flask, jsonify, request, render_template, abort
import json, os

app = Flask(__name__)
DATA = os.path.join(os.path.dirname(__file__), "data", "cities.json")

def load_cities():
    with open(DATA, "r", encoding="utf-8") as f:
        return json.load(f)

def save_cities(cities):
    with open(DATA, "w", encoding="utf-8") as f:
        json.dump(cities, f, ensure_ascii=False, indent=2)

def get_city(city_id):
    return next((c for c in load_cities() if c["id"] == city_id), None)

@app.route("/")
def home():
    cities = load_cities()
    city = cities[0] if cities else None
    return render_template("index.html", city=city, cities=cities)

@app.route("/<city_id>")
def city_page(city_id):
    city = get_city(city_id)
    if not city:
        abort(404)
    return render_template("index.html", city=city, cities=load_cities())

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/api/cities")
def api_get():
    return jsonify(load_cities())

@app.route("/api/cities", methods=["POST"])
def api_post():
    city = request.json
    cities = load_cities()
    cities = [c for c in cities if c["id"] != city["id"]]
    cities.append(city)
    save_cities(cities)
    return jsonify({"ok": True, "url": f"/{city['id']}"})

if __name__ == "__main__":
    app.run(debug=True)
