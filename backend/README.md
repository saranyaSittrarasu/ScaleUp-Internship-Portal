# Backend API for Resume Parsing

This is a FastAPI backend service that parses PDF resumes and extracts candidate information.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the FastAPI server using uvicorn:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 5000
```

Or run directly:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/parse-resume
Parses a PDF resume and extracts candidate information.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `resume` (PDF file)

**Response:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "skills": ["Python", "JavaScript", "React"],
  "experience": "5 years of software development...",
  "education": "Bachelor's in Computer Science...",
  "certifications": "AWS Certified...",
  "courses": "Machine Learning, Data Science..."
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

### GET /
Root endpoint with API information.

**Response:**
```json
{
  "message": "Resume Parser API",
  "version": "1.0.0"
}
```

## API Documentation

FastAPI automatically generates interactive API documentation:
- Swagger UI: `http://localhost:5000/docs`
- ReDoc: `http://localhost:5000/redoc`

## Notes

- The resume parser uses PyPDF2 to extract text from PDF files
- It uses regex patterns to extract information like email, LinkedIn URL, skills, etc.
- The extraction is basic and may not work perfectly for all resume formats
- For production use, consider using more advanced NLP libraries or services
- The `--reload` flag enables auto-reload on code changes (development only)

