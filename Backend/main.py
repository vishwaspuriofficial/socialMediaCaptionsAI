import io
from typing import Union
import google.generativeai as genai
import PIL.Image
import uvicorn
import os
from fastapi import FastAPI, File, Form, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def readRoot():
    return {"Health":"Healthy"}

@app.post("/generate_captions/")
async def getCaptions(file: UploadFile = File(...)):
    filename = file.filename
    contents = await file.read()
    with open(filename, 'wb') as f:
        f.write(contents)
    print("success")

    genai.configure(api_key="[ENTER API KEY]")
    img = PIL.Image.open(io.BytesIO(contents))
    # try:
    #     img = await PIL.Image.open(file)
    # except FileNotFoundError:
    #     return {"error": "Image file not found."}
    # except Exception as e:
    #     return {"error": str(e)}

    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(["Analyze the attached image and generate 3 engaging captions for social media that accurately describe the scene, evoke emotion, and potentially include relevant hashtags. Split each caption (including its hashtags and emojis) by ***, start  with number of caption, no more signs, emojis are allowed.", img])
    print(response.text)
    return response.text


@app.post("/upload_file/")
async def create_upload_file(file: UploadFile = File(...)):
    filename = file.filename
    contents = await file.read()
    with open(filename, 'wb') as f:
        f.write(contents)
    print("success")
    return file.filename
    
# @app.post("/uploadfile/")
# async def create_upload_file(file: UploadFile = Form()):
#     contents = await file.read()
#     with open(file.filename, 'wb') as f:
#         f.write(contents)
#     return {"filename": file.filename}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)