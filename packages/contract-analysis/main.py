from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import logging
import logging.config

from utils import is_solidity_code

from setup_vector import query_vector

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

# initialize logging config
logging.config.dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "format": "%(asctime)s [%(levelname)s] %(name)s.%(funcName)s:%(lineno)d - %(message)s",
                "datefmt": "%Y-%m-%d %H:%M:%S",
            },
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "default",
            },
        },
        "loggers": {
            "": {
                "handlers": ["console"],
                "level": "INFO",
            },
        },
    }
)


@app.get("/")
def read_root():
    return {"Contract": "Analysis"}


# Placeholder, if the user wants to upload a file instead of a string
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}


@app.get("/analysis")
async def upload_file(contents: str):
    if not is_solidity_code(contents):
        logger.info("Not Solidity code?")
        return {"contract": "Not Solidity code"}
    return {"contents": f"placeholder: {len(contents)}"}


@app.get("/vector")
async def vector(inputs: list[str]):
    """
    Returns the vector for the input strings.
    E.g.

        inputs = [
            "How do I get ?",
            "What is the ?",
        ]

    """
    output = query_vector(inputs)
    return output


app = cors_app
