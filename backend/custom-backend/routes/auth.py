from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from utils.firebase import getuser_by_username, create_user
import bcrypt


login_bp = Blueprint('login',__name__)
register_bp = Blueprint('register',__name__)

#register handling
@register_bp.route('/',methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if getuser_by_username(username):
        return jsonify({
            "response":"user already exists"
        }),409
    
    hashed_pw = bcrypt.hashpw(password.encode(),bcrypt.gensalt()).decode()
    create_user(username,hashed_pw)
    return jsonify({
        "response":"account created"
    }),201

#login handling
@login_bp.route('/',methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user_doc = getuser_by_username(username)

    if not user_doc:
        return jsonify({
            "response":"user not found"
        }),404

    if not bcrypt.checkpw(password.encode(),user_doc['password'].encode()):
        return jsonify({
            "response":"incorrect password"
        }),401
    
    token = create_access_token(identity=user_doc['id'])
    return jsonify(access_token=token),200


