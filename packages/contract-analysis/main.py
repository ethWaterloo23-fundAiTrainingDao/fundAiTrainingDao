from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import logging
import logging.config

from utils import is_solidity_code

from setup_vector import query_database

from utils import get_org_token

TRANSFORMER_MODEL = "paraphrase-MiniLM-L6-v2"
# obviously no token in the code, it's in .env
ORG_TOKEN = get_org_token()


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
        return {"error": "Not Solidity code?"}
    output = query_database(text)
    return output


# Todo: Placeholder, if we want to upload a SOL file instead of a string
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}


app = cors_app
