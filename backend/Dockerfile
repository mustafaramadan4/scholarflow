FROM python:3.11-slim-bullseye 

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# 🔑 FINAL FIX: Corrected the configuration file path to resolve exit code 2.
RUN echo "deb http://cdn-fastly.deb.debian.org/debian bullseye main" > /etc/apt/sources.list && \
    echo "deb http://cdn-fastly.deb.debian.org/debian bullseye-updates main" >> /etc/apt/sources.list && \
    echo "deb http://security.debian.org/debian-security bullseye-security main" >> /etc/apt/sources.list && \
    \
    # 1. Add Network Robustness Configuration for Stable Downloads
    echo 'Acquire::Retries "5";' > /etc/apt/apt.conf.d/80-custom-fix && \
    echo 'Acquire::http::Pipeline-Depth "0";' >> /etc/apt/apt.conf.d/80-custom-fix && \
    \
    # 2. Update and force distribution upgrade to resolve conflicts
    apt-get update && \
    apt-get dist-upgrade -y && \
    \
    # 3. Install required packages
    apt-get install -y --no-install-recommends \
        gcc \
        libpq-dev \
        build-essential && \
    \
    # 4. Clean up cache and temporary config
    rm -rf /var/lib/apt/lists/* /etc/apt/apt.conf.d/80-custom-fix

# Copy requirements first
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# 🔑 Running Uvicorn as a Python module to fix relative import errors
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]