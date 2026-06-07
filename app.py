from flask import Flask, jsonify, request, render_template, abort
import json, os
import urllib.parse
import urllib.request

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


@app.route("/api/lead", methods=["POST"])
def api_lead():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    city_name = (data.get("city") or "").strip()
    comment = (data.get("comment") or "").strip()

    if not phone:
        return jsonify({"ok": False, "error": "phone_required"}), 400

    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")

    if not token or not chat_id:
        return jsonify({"ok": False, "error": "telegram_not_configured"}), 500

    message = (
        "📩 Новая заявка с Medline24.kz\n\n"
        f"Имя: {name or 'Не указано'}\n"
        f"Телефон: {phone}\n"
        f"Город: {city_name or 'Не указан'}\n"
        f"Комментарий: {comment or 'Не указан'}"
    )

    payload = urllib.parse.urlencode({
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    }).encode("utf-8")

    try:
        req = urllib.request.Request(
            f"https://api.telegram.org/bot{token}/sendMessage",
            data=payload,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status >= 400:
                return jsonify({"ok": False, "error": "telegram_error"}), 500
    except Exception:
        return jsonify({"ok": False, "error": "telegram_error"}), 500

    return jsonify({"ok": True})

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
