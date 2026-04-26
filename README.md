# Google Sheets Bulk Email Sender

Send personalized, HTML emails (with attachments) to a list of recipients using **Gmail + Google Sheets + Google Apps Script** — no third-party tools required.

---

## Features

- Reads **email**, **name**, and **gender** from a Google Sheet
- Generates a personalized salutation (`Sir` / `Ma'am`) based on gender
- Sends **HTML email** with inline formatting
- Attaches **all files** from a specified Google Drive folder
- **Dry-run mode** — logs emails without sending (great for testing)
- Built-in **rate limiting** to stay within Gmail's daily quota

---

## Sheet Format

Your sheet must be named `Sheet1` (configurable via `SHEET_NAME`) and follow this column layout:

| A (email)                  | B (name)          | C (gender) |
|----------------------------|-------------------|------------|
| elon@spacex.com            | Elon Musk         | M          |
| jeff@blueorigin.com        | Jeff Bezos        | M          |
| melinda@gatesfoundation.org| Melinda Gates     | F          |

> **Column details:**
> - **A — email**: Recipient's email address *(required)*
> - **B — name**: Recipient's full or first name *(required)*
> - **C — gender**: `M` for Sir, `F` for Ma'am; leave blank to omit the suffix *(optional)*

Row 1 is treated as a **header row** and is always skipped.

---

## Setup

1. **Create your Google Sheet** — add your recipient data following the format above.
2. Open **Extensions → Apps Script** from within the sheet.
3. **Paste the contents of `Code.gs`** into the script editor.
4. Configure the constants at the top of the file:

   | Constant               | Default       | Description                                                  |
   |------------------------|---------------|--------------------------------------------------------------|
   | `SHEET_NAME`           | `"Sheet1"`    | Name of the sheet tab with your recipient list               |
   | `SUBJECT`              | `"REPLACE_ME"`| Email subject line                                           |
   | `ATTACHMENTS_FOLDER_ID`| `"REPLACE_ME"`| Google Drive folder ID containing files to attach            |
   | `DRY_RUN`              | `false`       | Set `true` to log emails without sending                     |
   | `DELAY_MS`             | `1000`        | Delay between emails in milliseconds (1000 ms = 1 second)    |

5. **Edit `buildEmailBody()`** to customise the email body and sign-off.
6. Grant the required permissions when prompted (Gmail, Drive, Sheets).
7. Run the `sendEmails` function.

### Finding your Google Drive Folder ID

Open the folder in Google Drive — the ID is the last segment of the URL:

```
https://drive.google.com/drive/folders/<FOLDER_ID_IS_HERE>
```

---

## Dry-Run Mode

Set `DRY_RUN = true` to test your setup safely. No emails will be sent — instead, the Apps Script **Logger** will print what *would* have been sent:

```
[DRY-RUN] Would send to alice@example.com (Hi Alice Sharma Ma'am)
[DRY-RUN] Would send to bob@example.com (Hi Bob Mehta Sir)
✅ All emails processed
```

View the output under **View → Logs** in the Apps Script editor.

---

## Notes

- **Gmail daily limit**: Google accounts can send ~100 emails/day via Apps Script; Google Workspace accounts allow up to ~1,500.
- **Rate limiting**: The default 1-second delay (`DELAY_MS = 1000`) keeps you well within quota. Lower to `500` only if speed is critical.
- **Rows with missing email or name are skipped** automatically and logged.
- Do **not** use this tool for spam, cold outreach, or unsolicited emails.
