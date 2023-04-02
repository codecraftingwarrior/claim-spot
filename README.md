# ClaimSpot

This is a full-stack web application for insurance management, built using Spring Boot for the backend and Angular for the frontend.

ClaimSpot is an insurance management application built with `Spring Boot` and `Angular`. Customers can log in and declare accidents while uploading pictures of their vehicles, and specialists can log in and view these declarations, inspect the pictures, and evaluate the cost of the damages. The application includes clean and modular code for easy maintenance and scalability.


## Features

- JWT based Authentication and Registration for customers and specialists
- Role & permission based authorization
- CRUD operations for several entities
- Mailing system using Java Mail
- File uploading using the uploadcare API
- Appointment scheduling system
- Customer dashboard for declaring accidents and uploading pictures
- Specialist dashboard for viewing customer declarations and evaluating damages
- Integration with a backend database for storing data
- Clean and modular codebase for easy maintenance and scalability

## Installation

To install the project, follow these steps:

- Clone the repository and navigate to the project directory.
- Install dependencies for the frontend and backend with `npm install` and `mvn install`.
- Configure the backend database settings in `application.properties`.
- Start the backend server with `mvn spring-boot:run`.
- Start the frontend server with `ng serve`.

## Usage

To use the application, open your web browser and navigate to http://localhost:4200. You can then log in as a customer or specialist to access the respective dashboards.

## Documentation

The documentation for the API endpoints is available at /swagger-ui.html when running the backend server. You can also generate a static version of the documentation with the mvn spring-boot:run command.
