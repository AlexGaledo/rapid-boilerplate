from flask import request,jsonify,Blueprint
from flask_jwt_extended import jwt_required


sample_bp = Blueprint("sample",__name__)

#sample route lock to prevent access in routes if not logged in
@sample_bp.route('/')
@jwt_required()
def sample_protection():
    return jsonify({
        "msg":"your are authorized"
    })