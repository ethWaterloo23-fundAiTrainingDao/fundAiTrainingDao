# Contract Analysis

This is a service to detect and analyze Solidty smart contracts with known vulnerabilities.

## How it works

The service is composed of two parts:

- A [server](main.py) that receives the contract source code and returns the analysis results.

- A [worker](analysis.py) that runs the analysis on known vulnerabilities and stores the results in a database.


Existing known vulnerabilities are stored in the `vulnerabilities` directory. Each vulnerability is a directory with the following structure:

```
vulnerabilities
└── vulnerability-name
    ├── README.md
    ├── analysis.py
    ├── main.py
    └── vulnerabilities.sol
```

See https://github.com/crytic/not-so-smart-contracts for more information on the vulnerability.

## Usage

Install the requirements:

```
curl -sSL https://install.python-poetry.org | python3
python3 -m venv .venv
source .venv/bin/activate
poetry install
```

Run the server:

```
uvicorn main:app --reload
```
