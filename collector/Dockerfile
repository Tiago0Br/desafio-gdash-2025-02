# Build stage: install Python dependencies using uv
FROM python:3.12-slim-bookworm AS builder

# Copy uv package manager from official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Optimize uv: compile bytecode and copy dependencies
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy

WORKDIR /app

# Copy dependency specification files
COPY pyproject.toml uv.lock ./

# Install production dependencies only
RUN uv sync --frozen --no-install-project --no-dev

# Production stage: minimal runtime image
FROM python:3.12-slim-bookworm

WORKDIR /app

# Copy virtual environment from builder stage
COPY --from=builder /app/.venv /app/.venv

# Copy application source code
COPY . .

# Add virtual environment to PATH
ENV PATH="/app/.venv/bin:$PATH"

# Run the weather collector
CMD ["python", "main.py"]