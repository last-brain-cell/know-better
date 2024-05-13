from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth, OAuthError

from backend.download.youtube import process_audio
from backend.download.website import process_link
from backend.download.document import process_document
from .models import UserMessage, Option
from config import CLIENT_ID, CLIENT_SECRET

app = FastAPI(title="KnowBetter Web Application", description="", version="v2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="knowbetterapp")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


oauth = OAuth()
oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    client_kwargs={
        "scope": "email openid profile",
        "redirect_url": "http://localhost:8000/auth",
    },
)


@app.get("/")
def index(request: Request):
    user = request.session.get("user")
    if user:
        return RedirectResponse("welcome")

    return templates.TemplateResponse(name="signin.html", context={"request": request})


@app.get("/welcome")
def welcome(request: Request):
    user = request.session.get("user")
    if not user:
        return RedirectResponse("/")
    return templates.TemplateResponse(
        name="index.html", context={"request": request, "user": user}
    )


@app.get("/login")
async def login(request: Request):
    url = request.url_for("auth")
    return await oauth.google.authorize_redirect(request, url)


@app.get("/auth")
async def auth(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as e:
        return templates.TemplateResponse(
            name="error.html", context={"request": request, "error": e.error}
        )
    user = token.get("userinfo")
    if user:
        request.session["user"] = dict(user)
    return RedirectResponse("http://localhost:3000/home")


@app.get("/logout")
def logout(request: Request):
    request.session.pop("user")
    request.session.clear()
    return RedirectResponse("/")


@app.post("/process")
async def process_file(
    option: Option = Form(...),
    file: UploadFile = File(None),
    link: str = Form(None),
    user_id: int = Form(None),
):
    if option not in Option:
        raise HTTPException(status_code=400, detail="Invalid option")

    if option == Option.yt:
        if not link:
            raise HTTPException(status_code=400, detail="YouTube link is required")

        transcription = await process_audio(link, 4)
        return {
            "message": f"You selected YouTube link: {link}, audio file is downloaded and transcribed",
            "transcript": transcription,
        }

    elif option == Option.pdf:
        if not file:
            raise HTTPException(status_code=400, detail="File is required")
        file_content = file.read()
        contents = await process_document(file_content)
        print(contents)
        return {
            "message": f"You uploaded a file of type {file.content_type}",
            "content": contents,
        }

    elif option == Option.website:
        if not link:
            raise HTTPException(status_code=400, detail="valid URL is required")

        contents = await process_link(link)
        return {
            "message": f"You selected Website link: {link}, HTML has been parsed",
            "content": contents,
        }


@app.get("/chat")
async def home(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})


@app.post("/chat")
async def generate_bot_response(user_message: UserMessage):
    return {
        "response": "The logic behind this bot is still work in progress...",
        "user": user_message.message,
    }
