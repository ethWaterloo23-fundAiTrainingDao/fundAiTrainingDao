# from dotenv import dotenv_values
# dotenv is broken on mac?


def get_org_token():
    # config = dotenv_values(".env")
    # return config["ORG_TOKEN"]
    return "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"


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
