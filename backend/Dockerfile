FROM python:3.9-alpine3.17
WORKDIR /app/backend
COPY ./requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/backend/requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
