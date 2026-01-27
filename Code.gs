/**
 * Bulk email sender (safe for ~50-100 emails per day)
 * Uses Gmail + Google Sheets
 */

const SHEET_NAME = "Sheet1"; // your google sheet name
const SUBJECT = "REPLACE_ME"; // your email's subject
const ATTACHMENTS_FOLDER_ID = "REPLACE_ME"; // your google drive's folder id
const DRY_RUN = false; // set true to test
const DELAY_MS = 1000; // (1000 here = 1 second) [tweak to 500 if urgent]
// (ATTENTION) change the email content buildEmailBody

function sendEmails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" not found`);
  }

  const attachments = getAttachments();

  for (let i = 1; i < data.length; i++) {
    const email = data[i][0];
    const name = data[i][1];

    if (!email || !name) {
      Logger.log(`Skipping row ${i + 1} (missing data)`);
      continue;
    }

    const body = buildEmailBody(name);

    if (DRY_RUN) {
      Logger.log(`[DRY-RUN] Would send to ${email}`);
    } else {
      GmailApp.sendEmail(email, SUBJECT, "HTML only", {
        htmlBody: body,
        attachments: attachments
      });
      Logger.log(`[SENT] ${email}`);
    }

    Utilities.sleep(DELAY_MS);
  }

  Logger.log("✅ All emails processed");
}

function buildEmailBody(name) {
  return `
    <p>Hi ${name},</p>

    <p>
      I hope this email finds you well. I wanted to reach out and share
      the attached document for your reference.
    </p>

    <p>
      Please feel free to reply if you have any questions.
    </p>

    <p>
      Best regards,<br>
      Your Name
    </p>
  `;
}

function getAttachments() {
  const folder = DriveApp.getFolderById(ATTACHMENTS_FOLDER_ID);
  const files = folder.getFiles();
  const attachments = [];

  while (files.hasNext()) {
    attachments.push(files.next());
  }

  return attachments;
}
