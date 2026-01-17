from datetime import datetime, timedelta, UTC
from jose import jwt, JWTError
from fastapi import HTTPException, Cookie

SECRET_KEY = 'some-key'
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(user_id: str):
    payload = {
        "sub": user_id,
        "exp": datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(access_token):
    print(access_token)
    if not access_token:
        raise HTTPException(status_code=401)
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401)
    
    return user_id