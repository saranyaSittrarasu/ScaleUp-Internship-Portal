from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import PyPDF2
import io
import re
import os
from email.message import EmailMessage
from email.utils import formataddr
import smtplib
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("EMAIL_SMTP_SERVER") or os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("EMAIL_SMTP_PORT") or os.getenv("SMTP_PORT") or "587")
SMTP_USERNAME = os.getenv("EMAIL_SENDER") or os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("EMAIL_PASSWORD") or os.getenv("SMTP_PASSWORD")
MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USERNAME)
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", "saranya.karthik@outlook.com")


def send_application_email(sender_email: str, candidate_name: str, internship_title: str):
    if not (SMTP_HOST and SMTP_USERNAME and SMTP_PASSWORD and MAIL_FROM):
        raise HTTPException(
            status_code=500,
            detail="Email service is not configured. Missing SMTP environment variables.",
        )

    subject = f"Internship application: {candidate_name or sender_email}"
    body = f"""Hello Scale Up Team,

You have received a new internship application.

Candidate: {candidate_name or 'Unknown'}
Email: {sender_email}
Position: {internship_title}

Please follow up with the candidate when convenient.

Best regards,
Internship Hub Platform
"""

    message = EmailMessage()
    # Use the logged-in candidate email as the visible From
    display_name = candidate_name or sender_email
    message["From"] = formataddr((display_name, sender_email))
    message["To"] = RECEIVER_EMAIL
    message["Subject"] = subject
    message["Reply-To"] = sender_email
    message.set_content(body)

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(message, from_addr=MAIL_FROM, to_addrs=[RECEIVER_EMAIL])
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {exc}")

app = FastAPI(title="Resume Parser API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(pdf_file):
    """Extract text from PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

def extract_email(text):
    """Extract email from text"""
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else None

def extract_linkedin(text):
    """Extract LinkedIn URL from text"""
    linkedin_pattern = r'(?:https?://)?(?:www\.)?linkedin\.com/in/[\w-]+'
    linkedin = re.findall(linkedin_pattern, text, re.IGNORECASE)
    return linkedin[0] if linkedin else None

def extract_name(text):
    """Extract name from text (usually first line or after keywords)"""
    lines = text.split('\n')
    # Look for name patterns (usually first non-empty line or after "Name:")
    for line in lines[:10]:  # Check first 10 lines
        line = line.strip()
        if line and len(line.split()) <= 4 and not any(keyword in line.lower() for keyword in ['email', 'phone', 'address', 'linkedin', 'experience', 'education']):
            # Check if it looks like a name (contains letters, not too long)
            if re.match(r'^[A-Za-z\s\.]+$', line) and len(line) > 2:
                return line
    return None

def extract_skills(text):
    """Extract skills from text"""
    # Common skill keywords
    common_skills = [
        'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript',
        'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'Git', 'Docker',
        'AWS', 'Azure', 'Machine Learning', 'Data Analysis', 'UI/UX',
        'Agile', 'Scrum', 'REST API', 'GraphQL', 'Vue.js', 'Angular',
        'C++', 'C#', '.NET', 'Spring Boot', 'Django', 'Flask', 'Express',
        'MongoDB', 'Redis', 'Kubernetes', 'CI/CD', 'DevOps', 'Linux'
    ]
    
    found_skills = []
    text_lower = text.lower()
    
    for skill in common_skills:
        if skill.lower() in text_lower:
            found_skills.append(skill)
    
    # Also look for skills section
    skills_section = re.search(r'skills?[:\s]+(.*?)(?:\n\n|\n[A-Z])', text, re.IGNORECASE | re.DOTALL)
    if skills_section:
        skills_text = skills_section.group(1)
        # Extract comma or newline separated skills
        skills_list = re.split(r'[,•\n]', skills_text)
        for skill in skills_list:
            skill = skill.strip()
            if skill and len(skill) > 2:
                found_skills.append(skill)
    
    return list(set(found_skills))[:20]  # Return unique skills, max 20

def extract_experience(text):
    """Extract experience section"""
    experience_patterns = [
        r'experience[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
        r'work\s+experience[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
        r'employment[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
    ]
    
    for pattern in experience_patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
        if match:
            return match.group(1).strip()[:1000]  # Limit to 1000 chars
    
    return None

def extract_education(text):
    """Extract education section"""
    education_patterns = [
        r'education[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
        r'academic[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
    ]
    
    for pattern in education_patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
        if match:
            return match.group(1).strip()[:1000]  # Limit to 1000 chars
    
    return None

def extract_certifications(text):
    """Extract certifications"""
    cert_patterns = [
        r'certifications?[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
        r'certificates?[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
    ]
    
    for pattern in cert_patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
        if match:
            return match.group(1).strip()[:500]
    
    return None

def extract_courses(text):
    """Extract courses"""
    courses_patterns = [
        r'courses?[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
        r'relevant\s+courses?[:\s]+(.*?)(?:\n\n\n|\n[A-Z][a-z]+\s*:|$)',
    ]
    
    for pattern in courses_patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
        if match:
            return match.group(1).strip()[:500]
    
    return None

@app.post("/api/parse-resume")
async def parse_resume(resume: UploadFile = File(...)):
    """
    Parse a PDF resume and extract candidate information.
    
    Args:
        resume: PDF file to parse
        
    Returns:
        JSON object with extracted information
    """
    # Validate file
    if not resume.filename:
        raise HTTPException(status_code=400, detail="No file selected")
    
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        # Read PDF
        pdf_bytes = await resume.read()
        pdf_file = io.BytesIO(pdf_bytes)
        text = extract_text_from_pdf(pdf_file)
        
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        
        # Extract information
        result = {
            "name": extract_name(text),
            "email": extract_email(text),
            "linkedin": extract_linkedin(text),
            "skills": extract_skills(text),
            "experience": extract_experience(text),
            "education": extract_education(text),
            "certifications": extract_certifications(text),
            "courses": extract_courses(text),
        }
        
        return JSONResponse(content=result, status_code=200)
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error processing resume: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return JSONResponse(content={"status": "ok"}, status_code=200)

@app.post("/api/send-application-email")
async def send_application(payload: dict):
    sender = payload.get("senderEmail")
    candidate_name = payload.get("candidateName")
    internship_title = payload.get("internshipTitle")

    if not sender:
        raise HTTPException(status_code=400, detail="Sender email is required.")

    send_application_email(sender, candidate_name, internship_title)
    return JSONResponse(
        content={"message": "Application email sent successfully."}, status_code=200
    )

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Resume Parser API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
