# BKJS "Coming Soon" Page with Share Counter

This project contains the code for a "Coming Soon" landing page that features a real-time social media share counter. The counter is powered by a Node.js backend that securely communicates with a Google Sheet to track the number of shares for different platforms.

## Project Structure

```
/
├── index.html              # The main frontend page
├── assets/                 # CSS, JS, images, and other static files for the frontend
└── backend/
    ├── server.js           # The Node.js backend server (Express)
    ├── package.json        # Defines backend dependencies and scripts
    └── credentials.json    # (You must create this) Google Cloud service account key
```

## Prerequisites

Before you begin, you will need:
1.  **Node.js and npm**: [Download and install Node.js](https://nodejs.org/en/download/) (npm is included).
2.  **A Google Cloud Platform (GCP) Project**: If you don't have one, create one at the [Google Cloud Console](https://console.cloud.google.com/).
3.  **A Google Account**: To create and manage the Google Sheet.

---

## Setup Instructions

Follow these steps carefully to get the project running.

### Step 1: Google Sheet and API Setup

1.  **Create a Google Sheet**:
    *   Create a new Google Sheet.
    *   Rename the first tab to `Sheet3`.
    *   In the first row, enter the column headers exactly as follows:
        *   Cell A1: `wats app`
        *   Cell B1: `facebook`
        *   Cell C1: `X`
        *   Cell D1: `linked in`
        *   Cell E1: `link copied`
    *   Note your **Spreadsheet ID** from the URL. It's the long string of characters between `/d/` and `/edit`.

2.  **Enable the Google Sheets API**:
    *   Go to the [Google Sheets API page](https://console.cloud.google.com/apis/library/sheets.googleapis.com) in the GCP Console.
    *   Make sure your GCP project is selected.
    *   Click **ENABLE**.

3.  **Create a Service Account**:
    *   Go to the [Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts) in the GCP Console.
    *   Click **+ CREATE SERVICE ACCOUNT**.
    *   Give it a name (e.g., `bkjs-share-counter`) and click **CREATE AND CONTINUE**.
    *   In the "Grant this service account access to project" step, select the role **Basic > Editor**. Click **CONTINUE**, then **DONE**.

4.  **Generate a JSON Key**:
    *   Find the service account you just created.
    *   Click the three-dots menu under "Actions" and select **Manage keys**.
    *   Click **ADD KEY > Create new key**.
    *   Select **JSON** and click **CREATE**. A JSON key file will be downloaded.

5.  **Configure Project Credentials**:
    *   Rename the downloaded JSON file to `credentials.json`.
    *   Move this file into the `backend/` directory of the project.

6.  **Share the Google Sheet**:
    *   Open the `credentials.json` file and find the `client_email` address (e.g., `...gserviceaccount.com`). Copy this email.
    *   Go back to your Google Sheet and click the **Share** button.
    *   Paste the service account's email address, assign it the **Editor** role, and click **Share**.

### Step 2: Local Backend Setup

1.  **Navigate to the Backend Directory**:
    ```bash
    cd backend
    ```

2.  **Install Dependencies**:
    Run `npm install` to download the required libraries (Express, CORS, and Google APIs).
    ```bash
    npm install
    ```

---

## Running the Application

To run the project, you need to start both the backend and the frontend servers in separate terminals.

### 1. Start the Backend Server

*   Make sure you are in the `backend` directory.
*   Run the following command:
    ```bash
    npm start
    ```
*   You should see the confirmation message: `Backend server listening on port 8080`.
*   Keep this terminal window open.

### 2. Start the Frontend Server

*   Open a **new** terminal window.
*   Navigate to the **root directory** of the project (the one containing `index.html`).
*   Run the following command to start a simple live server:
    ```bash
    npx live-server
    ```
*   Your default web browser will automatically open the `index.html` page.

### 3. Test the Application

*   With both servers running, click on any of the share buttons on the webpage.
*   You should see the "Community Reach" counter on the page increment.
*   Check your Google Sheet; the corresponding column for the platform you clicked should have its value increased by 1.
*   The backend terminal will log the updates, for example: `Updated whatsapp to 1. Total shares: 1`.
