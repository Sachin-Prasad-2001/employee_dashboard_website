from fastapi import FastAPI, Request, Response, HTTPException, Depends, Cookie
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn
import json
from auth import create_access_token, get_current_user
from jose import jwt

class User(BaseModel):
    loginID: str
    password: str

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def hello():
    return "hello"

@app.get('/dashboard')
def get_users():
    with open("users.json","r") as f:
        users_list = json.load(f)
        print(users_list)
        return users_list

@app.post('/login')
def form_validation(curr_user:User, response:Response):
    logged_in = False
    with open("users.json","r") as f:
        users_list = json.load(f)
        for user in users_list:
            if user['loginID']==curr_user.loginID and user['password']==curr_user.password:
                logged_in = True
                break 
    if not logged_in:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    token = create_access_token(curr_user.loginID)
    response.set_cookie(
        key = "access_token",
        value = token,
        httponly = True,
        samesite = "lax",
        secure = False
    )
    return {"loginID":curr_user.loginID}

'''
@app.get('/me')
def me(user=Depends(get_current_user)):
    return {"loginID":user}
'''
@app.get('/me')
def me(request: Request):
    access_token = request.cookies.get("access_token")
    user = get_current_user(access_token)
    return {'LoginID': user}

@app.put('/save')
def save_changes(table:List[User]):
    with open("users.json","w") as f:
        json.dump([element.model_dump() for element in table],f)

