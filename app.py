from flask import Flask, jsonify, request, render_template
import json, os
app=Flask(__name__)
DATA=os.path.join("data","cities.json")
@app.route("/")
def home(): return render_template("index.html")
@app.route("/api/cities")
def get(): return jsonify(json.load(open(DATA,encoding="utf-8")))
@app.route("/api/cities",methods=["POST"])
def post():
 c=request.json; cs=json.load(open(DATA,encoding="utf-8")); cs=[x for x in cs if x["id"]!=c["id"]]; cs.append(c); json.dump(cs,open(DATA,"w",encoding="utf-8"),ensure_ascii=False,indent=2); return jsonify({"ok":True})
if __name__=="__main__": app.run()