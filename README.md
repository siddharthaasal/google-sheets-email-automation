# Google Sheets Bulk Email Sender

Send personalized emails (with attachments) using Gmail + Google Sheets.

## Features
- Reads email + name from Google Sheets
- HTML email body
- Google Drive attachments
- Dry-run mode
- Safe rate limiting

## Sheet format
| email | name |

## Setup
1. Open Google Sheets
2. Extensions → Apps Script
3. Paste `Code.gs`
4. Set constants at the top
5. Run `sendEmails`

## Notes
- Recommended limit: ≤100 emails/day
- Do not use for spam or cold outreach
