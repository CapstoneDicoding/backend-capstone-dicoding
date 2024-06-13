# Dicoding Jobs Capstone Backend API
This is a backend project built with TypeScript, NestJS, MySQL, and Prisma ORM. It is deployed using Google Cloud services including Cloud Storage, Cloud SQL, and Cloud Run. This guide will help you get started with setting up, running, and deploying the application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Libraries](#libraries)
3. [Tools](#tools)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Database Migrations](#database-migrations)
8. [Docker Setup](#docker-setup)
9. [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Google Cloud SDK](https://cloud.google.com/sdk)

And also ensrue you have deployed these API services:

- [CV Summarization API](https://github.com/CapstoneDicoding/cv-summarization-api)
- [Recommendation System API](https://github.com/CapstoneDicoding/recommendation-system-api)

## Libraries

These are main libraries that are used to create the backend service

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)

## Tools

- **Git:** Version control system.
- **Docker:** Containerization platform.
- **Google Cloud SDK:** CLI tools for interacting with Google Cloud services.


## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/CapstoneDicoding/backend-capstone-dicoding
    cd backend-capstone-dicoding
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

## Configuration

1. **Environment Variables:**

    Create a `.env` file in the root of your project and add the following variables:

    ```env
    DATABASE_URL="mysql://user:password@host:3306/database_name"
    SECRET_KEY=your-jwt-authentication-secret-key
    GOOGLE_CLOUD_PROJECTID=your-google-cloud-project-id
    GOOGLE_CLOUD_BUCKET=your-google-cloud-storage-bucket-name

    ```

2. **Service Account:**

    Create a service account with Storage Object Creator permission in Cloud IAM and store the key in `key.json` file in the root of your project

3. **Machine Learning API**

    Change the CV Summarization API url and Recommendation System API url in `./src/curriculum_vitaes/curriculum_vitaes.controller.ts` file.

## Running the Application

1. **Start the NestJS application:**

    ```sh
    npm run start
    ```
2. **Development Mode:**

    ```sh
    npm run start:dev
    ```


## Database Migrations

1. **Generate migration:**

    ```sh
    npx prisma migrate dev --name migration_name
    ```

2. **Deploy migration:**

    ```sh
    npx prisma migrate deploy
    ```

## Docker Setup

1. **Build the Docker image:**

    ```sh
    docker build -t your-app-name .
    ```

2. **Run the Docker container:**

    ```sh
    docker run -p 8080:8080 your-app-name
    ```

## Deployment

### Cloud Storage

1. **Create a Cloud Storage bucket:**

    ```sh
    gsutil mb gs://your-bucket-name
    ```

2. **Connect to the Cloud Storage bucket:**

    Update the `GOOGLE_CLOUD_BUCKET` in your `.env` file with the Cloud Storage bucket name.



### Cloud SQL

1. **Create a Cloud SQL instance:**

    Follow the instructions [here](https://cloud.google.com/sql/docs/mysql/create-instance) to create a Cloud SQL instance.

2. **Connect to the Cloud SQL instance:**

    Update the `DATABASE_URL` in your `.env` file with the Cloud SQL connection details.

### Cloud Run

1. **Create new Arifacts repository**
    ```sh
    gcloud artifacts repositories create your-repository-name --repository-format=docker --location=asia-southeast2 --async
    ```

2. **Build and push your Docker image to Google Container Registry:**

    ```sh
    gcloud builds submit --tag asia-southeast2-docker.pkg.dev/your-project-id/your-repository-name/your-app-name:tag
    ```

3. **Deploy to Cloud Run:**

    ```sh
    gcloud run deploy --image asia-southeast2-docker.pkg.dev/your-project-id/your-repository-name/your-app-name:tag
    ```

    Follow the prompts to set the region and allow unauthenticated invocations if required.

