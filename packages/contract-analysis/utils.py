from dotenv import load_dotenv
import os

load_dotenv()


def get_org_token():
    return os.getenv("ORG_TOKEN")


def is_solidity_code(code):
    solidity_keywords = [
        "pragma",
        "contract",
        "function",
        "modifier",
        "event",
        "enum",
        "mapping",
        "struct",
    ]
    for keyword in solidity_keywords:
        if keyword in code:
            return True
    return False
