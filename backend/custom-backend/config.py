import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    JWT_SECRET_KEY = os.getenv('JWT_KEY')
    firebase_json = os.getenv('FIREBASE_CRED_PATH')
    firebase_id = os.getenv('FIREBASE_PROJECT_ID')