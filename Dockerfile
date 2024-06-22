# Use the official Python image from the Docker Hub
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY Pipfile Pipfile.lock /app/
RUN pip install pipenv && pipenv install --deploy --ignore-pipfile

# Copy project
COPY . /app/

# Collect static files
RUN pipenv run python manage.py collectstatic --noinput

# Expose port 8000
EXPOSE 8000

# Run the application
CMD ["pipenv", "run", "gunicorn", "--bind", "0.0.0.0:8000", "silicon.wsgi:application"]


# diabetes-425015 