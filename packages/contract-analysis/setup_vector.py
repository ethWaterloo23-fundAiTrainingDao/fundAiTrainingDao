# This file indexes all the vulnerabilities and their descriptions
# into an embedding vector, and then adds the embedding vector to the
# database. The user can then query the database with a vulnerability
# with their solidity code, and the database will return the closest matching
# vulnerability.


"""
For all files inside the vulnerabilities folder, index the vulnerabilities.
"""

import os

import requests
import chromadb
from chromadb.config import Settings


# Langchain doesn't have a SolidtyLoader, so we'll use the TextLoader
from langchain.document_loaders import (
    DirectoryLoader,
    TextLoader,
    UnstructuredMarkdownLoader,
)
from langchain.schema import Document


def query_vector(texts: list[str]) -> list[float]:
    """
    Takes input a list of strings and returns a list of vectors.
    Uses the HuggingFace pipeline API.
    Returns a list of 384 vectors.
    """

    model_id = "sentence-transformers/all-MiniLM-L6-v2"
    hf_token = "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"

    api_url = (
        f"https://api-inference.huggingface.co/pipeline/feature-extraction/{model_id}"
    )
    headers = {"Authorization": f"Bearer {hf_token}"}

    response = requests.post(
        api_url,
        headers=headers,
        json={"inputs": texts, "options": {"wait_for_model": True}},
    )
    return response.json()


def load_vulnerabilities() -> list[Document]:
    """
    Loads all the vulnerabilities from the vulnerabilities folder.
    """
    sol_loader = DirectoryLoader(
        "vulnerabilities", glob="**/*.sol", loader_cls=TextLoader
    )

    return sol_loader.load()


def load_markdowns() -> list[Document]:
    """
    Loads all the markdowns from the vulnerabilities folder.
    """
    md_loader = DirectoryLoader(
        "vulnerabilities", glob="**/*.md", loader_cls=UnstructuredMarkdownLoader
    )

    return md_loader.load()


def add_to_db():
    pass


def get_filename_from_path(file_path):
    """
    Extract the filename from a given path.
    E.g. /abc/def.txt -> def.txt
    """
    filename = os.path.basename(file_path)
    return filename


def main():
    """
    Loads all the vulnerabilities from the vulnerabilities folder,
    and then indexes them into an embedding vector.
    """

    # Load the documents
    print("Loading documents...")
    vulnerabilities = load_vulnerabilities()
    markdowns = load_markdowns()

    # Get the embeddings
    print("Getting embeddings...")
    vulnerability_vectors = query_vector([v.code for v in vulnerabilities])
    markdown_vectors = query_vector([m.text for m in markdowns])

    # Add the embeddings to the database
    print("Creating database...")
    client = chromadb.Client(
        Settings(
            chroma_db_impl="duckdb+parquet",
            persist_directory="solidity_vulnerabilities.chromadb",
        )
    )
    collection = client.create_collection("solidity_vulnerabilities")

    # Add the vulnerabilities to the database
    print("Adding vulnerabilities...")
    collection.add(
        embeddings=vulnerability_vectors,
        metadatas=[doc.metadata for doc in vulnerabilities],
        documents=[doc.page_content for doc in vulnerabilities],
        ids=[doc.metadata["source"] for doc in vulnerabilities],
    )

    # Add the markdowns to the database
    print("Adding markdowns...")
    collection.add(
        embeddings=markdown_vectors,
        metadatas=[doc.metadata for doc in markdowns],
        documents=[doc.page_content for doc in markdowns],
        ids=[doc.metadata["source"] for doc in markdowns],
    )

    # Persist the database
    print("Persisting database...")
    client.persist()

    print("Done!")


if __name__ == "__main__":
    main()
