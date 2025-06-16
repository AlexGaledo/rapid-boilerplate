from flask import Flask,jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes.auth import login_bp, register_bp
from routes.sample import sample_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
jwt = JWTManager(app)


#app.register_blueprint(import route_bp from file, url prefix =)
app.register_blueprint(login_bp, url_prefix = '/login')
app.register_blueprint(register_bp, url_prefix = '/register')
app.register_blueprint(sample_bp, url_prefix = '/sample')


@app.route('/')
def home():
    return jsonify({
        "response":"Welcome to custom boilerplate v0.1"
    })


if __name__ == "__main__":
    app.run(debug=True)
