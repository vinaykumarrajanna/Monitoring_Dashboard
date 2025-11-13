# ---------- Stage 1: Builder ----------
FROM python:3.11-slim AS builder

# Set working directory
WORKDIR /app

# Copy only requirement installation layer first (for caching)
COPY app.py .
RUN pip install --user flask flask-cors

# ---------- Stage 2: Final Runtime ----------
FROM python:3.11-alpine

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Copy application code
COPY app.py .

EXPOSE 8080

# Run the Flask app
CMD ["python", "app.py"]
