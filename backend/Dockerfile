FROM python:3.9
WORKDIR /app/backend
COPY ./requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/backend/requirements.txt
COPY ./ app/backend/
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
