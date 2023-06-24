# syntax=docker/dockerfile:1.3

# This dockerfile runs the contract-analysis service.

# Stage 1: base image
FROM python:3.11-slim-bullseye AS base
ENV BUILD_PATH=/build/
WORKDIR ${BUILD_PATH}

# Stage 2
# Convert poetry into requirements.txt for standard pip install.
# Some dependencies don't work well in Poetry under Docker...
FROM base as poetry
RUN pip install poetry==1.4.0
COPY poetry.lock pyproject.toml ${BUILD_PATH}
ARG POETRY_WITH
RUN poetry lock --check && poetry export --with=$POETRY_WITH -o requirements.txt

# Stage 3
# Install with pip and start the main server
FROM base as runtime
COPY --from=poetry ${BUILD_PATH}/requirements.txt ${BUILD_PATH}
RUN --mount=type=cache,target=/root/.cache pip install -r requirements.txt

# Start the main server
COPY . ${BUILD_PATH}
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
