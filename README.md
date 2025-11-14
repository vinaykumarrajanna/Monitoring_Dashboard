# Monitoring Dashboard

This repository demonstrates a simple two-service monitoring dashboard for real-time metrics collection and visualization.  
It’s designed to be easy to test, run, and debug locally, with Docker Compose, or on Kubernetes.

---

## Full File & Directory Structure

```
monitoring_dashboard/
├── monitoring-backend/
│   ├── app.py                    # Flask backend, exposes /metrics and /health
│   └── Dockerfile                # Backend container definition
├── monitoring-frontend/
│   ├── index.html                # Main dashboard UI
│   ├── app.js                    # Dashboard logic, Chart.js metrics fetch
│   └── Dockerfile                # Frontend container definition
├── docker-compose.yml            # Compose file for orchestration
├── namespace.yaml                # Kubernetes namespace manifest
├── backend-deployment.yaml       # K8s backend deployment + NodePort service
├── frontend-deployment.yaml      # K8s frontend deployment + NodePort service
├── .github/
│   └── workflows/
│       └── cicd.yml              # GitHub Actions workflow for CI/CD (build & push images)
└── README.md                     # This documentation
```

---

## Table of Contents
- [Project Overview](#project-overview)
- [Local Development & Testing](#local-development--testing)
- [Docker Compose](#docker-compose)
- [Kubernetes (Minikube)](#kubernetes-minikube)

---

## Project Overview

**Architecture:**  
- **Backend** (Python/Flask): Simulates metrics for CPU usage, latency, and request count at `/metrics`. CORS enabled for cross-origin.
- **Frontend** (HTML/JavaScript): Polls the backend’s `/metrics` and displays real-time metrics in a chart and stats format.
- **CI/CD:** GitHub Actions workflow (`.github/workflows/cicd.yml`) automatically builds and pushes Docker images to Docker Hub when you push code.

Both services are containerized and can be orchestrated with Docker or deployed on Kubernetes (Minikube).

---

## Local Development & Testing

### 1. Backend
```sh
cd monitoring-backend
pip install flask flask-cors
python app.py
```
- Backend runs at: [http://localhost:8080/metrics](http://localhost:8080/metrics)

### 2. Frontend

- Open `index.html` directly in your browser from the `monitoring-frontend` folder.
  - For example, double-click `index.html`, or drag it into a browser tab.

The frontend (`app.js`) fetches metrics from `http://localhost:8080/metrics` by default for local testing.

---

## Docker Compose

Run both services in containers.

### 1. Build and Start Services
```sh
docker-compose up --build
```

### 2. Test Setup

- After both containers are running:
  - Open `index.html` directly from your local file system in your browser (from the `monitoring-frontend` folder).
  - Backend metrics: [http://localhost:8080/metrics](http://localhost:8080/metrics)

For Docker Compose, update the fetch URL in `app.js` to `http://localhost:8080/metrics` if needed.

---

## Kubernetes (Minikube)

Production-like setup for cluster-based deployments.

### 1. Build and Push Images  

```sh
docker build -t vinaykumarrajanna/monitoring-backend:latest ./monitoring-backend
docker build -t vinaykumarrajanna/monitoring-frontend:latest ./monitoring-frontend

docker push vinaykumarrajanna/monitoring-backend:latest
docker push vinaykumarrajanna/monitoring-frontend:latest
```

### 2. Deploy on Minikube

```sh
minikube start
kubectl apply -f namespace.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

### 3. Port Forward to Test Locally

#### Backend (metrics):
```sh
kubectl port-forward svc/backend-svc 8082:8080 -n monitoring-dashboard
```
#### Frontend (dashboard):
```sh
kubectl port-forward svc/frontend-svc 8081:80 -n monitoring-dashboard
```

- Test endpoints:
  - Backend: [http://localhost:8082/metrics](http://localhost:8082/metrics)
  - Frontend: [http://localhost:8081](http://localhost:8081)

Open `index.html` directly from your local machine, and make sure the fetch URL in `app.js` uses `http://localhost:8082/metrics` for testing with Kubernetes port-forward.

---

**Note:**  
A GitHub Actions workflow (`.github/workflows/cicd.yml`) is included and automatically builds and pushes the Docker images to Docker Hub on code push.  
This enables seamless CI/CD and guarantees images are available for Kubernetes deployments.

---
