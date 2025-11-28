const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 8080;

// --- Configuration ---
const SPREADSHEET_ID = '1APRVbWbfIHv_A2WBI8X_uaC_UT56oBTgg6VUDs1W3lM';
const SHEET_NAME = 'Sheet3';
const KEY_FILE_PATH = './credentials.json';

// Maps the platform name from the frontend to the correct cell in the sheet
// Assumes headers are in row 1 and values are in row 2
const PLATFORM_TO_CELL_MAP = {
    'whatsapp': 'A2',
    'facebook': 'B2',
    'twitter':  'C2', // The platform is 'twitter' in the HTML
    'linkedin': 'D2',
    'copy':     'E2'  // The platform is 'copy' in the HTML
};
const TOTAL_RANGE = 'A2:E2'; // The range to sum up for the total count

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// --- Google Sheets API Logic ---
async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
}

app.post('/increment', async (req, res) => {
    const { platform } = req.body;
    const cellToUpdate = PLATFORM_TO_CELL_MAP[platform];

    if (!cellToUpdate) {
        return res.status(400).json({ result: 'error', message: 'Invalid platform' });
    }

    try {
        const sheets = await getGoogleSheetsClient();

        // 1. Read the current value from the specific cell
        const getResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!${cellToUpdate}`,
        });

        let currentValue = parseInt(getResponse.data.values?.[0]?.[0] || '0', 10);
        
        // 2. Increment the value
        const newValue = currentValue + 1;

        // 3. Write the new value back to the cell
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!${cellToUpdate}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[newValue]],
            },
        });

        // 4. Read all values in the row to calculate the total
        const totalResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!${TOTAL_RANGE}`,
        });

        const totalCount = totalResponse.data.values?.[0]?.reduce((sum, val) => sum + (parseInt(val, 10) || 0), 0) || 0;

        console.log(`Updated ${platform} to ${newValue}. Total shares: ${totalCount}`);

        // 5. Send the total count back to the frontend
        res.json({ result: 'success', count: totalCount });

    } catch (error) {
        console.error('Error updating Google Sheet:', error.message);
        res.status(500).json({ result: 'error', message: 'Failed to update sheet.' });
    }
});

// New GET endpoint to fetch the initial total
app.get('/total', async (req, res) => {
    try {
        const sheets = await getGoogleSheetsClient();

        // Read all values in the row to calculate the total
        const totalResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!${TOTAL_RANGE}`,
        });

        const totalCount = totalResponse.data.values?.[0]?.reduce((sum, val) => sum + (parseInt(val, 10) || 0), 0) || 0;

        console.log(`Fetched initial total: ${totalCount}`);

        // Send the total count back to the frontend
        res.json({ result: 'success', count: totalCount });

    } catch (error) {
        console.error('Error fetching total from Google Sheet:', error.message);
        res.status(500).json({ result: 'error', message: 'Failed to fetch total.' });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});
