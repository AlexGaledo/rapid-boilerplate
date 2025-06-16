import firebase_admin
from firebase_admin import credentials, firestore
from config import Config

cred = credentials.Certificate(Config.firebase_json)

#ensure only 1 firebase setup
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)


db = firestore.client()

#return boolean if user exists
def getuser_by_username(username):
    users_ref = db.collection('users')
    query = users_ref.where('username','==',username).get()
    
    for doc in query:
        user_data = doc.to_dict()
        user_data['id'] = doc.id
        return user_data
    
    return None
    
 
#create new user, encrypted pass thru bcrypt
def create_user(username, hashed_pw):
    users_ref = db.collection('users')
    new_user_ref = users_ref.document()
    new_user_ref.set({
        'username':username,
        'password':hashed_pw
    })
    print("creating user: ",username)









