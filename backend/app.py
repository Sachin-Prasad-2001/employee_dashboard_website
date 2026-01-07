from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn
import json

class User(BaseModel):
    loginID: str
    password: str
    name: str
    age: int

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
def form_validation(curr_user:User):
    print(curr_user)
    
    with open("users.json","r") as f:
        users_list = json.load(f)
        for user in users_list:
            if user['loginID']==curr_user.loginID and user['password']==curr_user.password:
                return "Login successful!"
            elif user['loginID']==curr_user.loginID and user['password']!=curr_user.password:
                return "Wrong password"
            
        return "Username doesnt exist"

@app.put('/save')
def save_changes(table:List[User]):
    with open("users.json","w") as f:
        json.dump([element.model_dump() for element in table],f)


if __name__=='__main__':
    uvicorn.run("app:app",host="127.0.0.1",port=8000,reload=True)