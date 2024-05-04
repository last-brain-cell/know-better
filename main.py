from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from download.youtube import download_audio
from download.website import parse_html
from models import UserMessage

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/process")
async def process_file(option: str = Form(...), file: UploadFile = File(None), link: str = Form(None)):
    if option not in ['youtube', 'pdf', 'website']:
        raise HTTPException(status_code=400, detail="Invalid option")

    if option == 'youtube':
        if not link:
            raise HTTPException(status_code=400, detail="YouTube link is required")

        await download_audio(link)
        return {"message": f"You selected YouTube link: {link}, audio file is downloaded"}

    elif option == 'pdf':
        if not file:
            raise HTTPException(status_code=400, detail="File is required")
        contents = await file.read()
        print(contents)
        return {"message": f"You uploaded a file of type {file.content_type}"}

    elif option == 'website':
        if not link:
            raise HTTPException(status_code=400, detail="valid URL is required")

        await parse_html(link)
        return {"message": f"You selected Website link: {link}, HTML has been parsed"}


@app.get("/chat")
async def home(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})


@app.post("/chat")
async def generate_bot_response(user_message: UserMessage):
    return {"response": "The logic behind this bot is still work in progress..."}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
