from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import logging
import logging.config

from utils import is_solidity_code

from setup_vector import query_database

TRANSFORMER_MODEL = "paraphrase-MiniLM-L6-v2"


app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

cors_app = CORSMiddleware(
    app,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger()


@app.get("/")
def read_root():
    return {"Contract": "Analysis"}


@app.post("/")
async def vector_similarity(text: str):
    """
    Returns the vector for the input text.
    E.g.
        inputs = "How do I get ?",
    """
    if not is_solidity_code(text):
        logger.info("Not Solidity code?")
        return {"error": "Not Solidity code? 🙃"}
    output = query_database(text)
    return output


# Todo: Placeholder, if we want to upload a SOL file instead of a string
@app.post("/file/")
async def vector_similar_file(file: UploadFile):
    """
    Returns the vector for the input file.
    """
    contents = await file.read()
    contents_str = contents.decode("utf-8")  # Assuming the file is encoded as UTF-8
    return await vector_similarity(contents_str)


app = cors_app
