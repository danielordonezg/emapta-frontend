EHR Mapping Tool – Frontend

This project is a React-based web application designed to manage EHR (Electronic Health Record) mappings. It includes registration, login, and mapping configuration features. Below is an overview of the functionality and how to set up the application.

Project Overview
Purpose: Provide a user-friendly interface to create, edit, and delete custom mappings for different EHR systems.

Key Features:

User Authentication: Registration and login pages where users can securely access the system.

EHR Mapping: Step-by-step form (wizard) to configure and review patient field mappings for various EHRs.

Bulk Operations: A dedicated section to handle bulk changes across multiple mappings.

Multi-language Support (i18n): The application supports English and Spanish through an internationalization configuration.

Technologies Used
React (functional components and hooks)

React Router for handling navigation and routing within the application

React Hook Form for form handling and validation

Material-UI (MUI) for UI components and styling

i18next for internationalization

TypeScript for type safety and better development tooling

Installation and Setup
Clone the Repository:

Download or clone this repository to your local machine.

Install Dependencies:

Navigate to the root folder of the project and run your package manager’s install command (e.g., npm install or yarn install).

Configure Environment Variables:

Create a .env file (or any similar environment file your setup requires).

Ensure you include the necessary API endpoints and any other relevant environment variables for local development.

Run the Application:

Use npm start or yarn start to launch the application in development mode.

The application will be accessible at http://localhost:3000/ (or another port if configured differently).

Using the Application
Registration:

Click on the Register link on the login page (or directly access the registration route).

Fill in the required fields (email, username, password).

Submit the form to create a new account.

Login:

Enter your registered email and password to access the main dashboard.

EHR Mappings:

Once logged in, navigate to the EHR Mappings page.

You can create a new mapping by clicking on the Create Mapping button.

A stepper (wizard) appears to guide you through the required fields (EHR name, patient fields, and final review).

Submit to save the new mapping or cancel to discard changes.

Managing Mappings:

The main table on the EHR Mappings page lists all existing mappings.

Each mapping can be reviewed or deleted.

Deleting a mapping requires confirmation.

Bulk Changes:

Access the Bulk Changes page to process changes that apply to multiple mappings simultaneously.

Multi-language Support:

The application is available in English and Spanish by default.

You can switch languages programmatically using i18n.changeLanguage('en') or i18n.changeLanguage('es').

Folder Structure (High-Level)
src

components: Contains reusable UI components.

pages: Contains the main pages (Login, Register, EHRMappings, BulkChanges).

services: Contains API service logic.

utils: Utility functions (e.g., sanitizers).

context: Context and provider components (e.g., AuthContext).

i18n.ts: Configuration for multi-language support.