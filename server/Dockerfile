FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy requirements.txt to the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application to the container
COPY . .

# Expose the application's port
EXPOSE 3000

# Run the application
CMD ["python", "run.py"]
