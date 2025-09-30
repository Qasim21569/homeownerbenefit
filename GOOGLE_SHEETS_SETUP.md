# Google Sheets Integration Setup Guide

## Environment Variables for Vercel

You need to set these environment variables in your Vercel project settings:

### Required Variables:

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**
   ```
   rgl-lead-form-service@ai-life-coach-458414.iam.gserviceaccount.com
   ```

2. **GOOGLE_PRIVATE_KEY_B64** (Base64 encoded private key)
   ```
   LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tDQpNSUlFdndJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLa3dnZ1NsQWdFQUFvSUJBUURPQ1J3M2tzMjhZR0JLDQp3WWxyS0tMelRldFNwVG5pVGNmWUhwK0xvYkxuMU5abHQySUVaY1pVYkNHOUI5MDh6UmFIQjRjQkRxZ0QyL2FKDQpTcUVLZGwwRmxlUlRyRTNMS3VtSmZFblBBYyt2SWo0MEhabDkycXAydFpMdjRha1EydUNGQjZibk9kQmIwZ1dlDQoramhwelYzQ1FxMW5mSEVCSUdDcUpKZ0tLbTdIU0FUWDU4c0p6WWxXUDFrSUtGR05aMXFSTzJDRU51ODBkemVIDQpPZUZVd0ZjK1BEMW5ZZURSaURoTU5OUXV3UFhETm82bnhWek1UekZqVS80Q3pNQ08rVFhxaGJOMEFobGpsakRJDQpwUEJ2ZWJqSUVIa2NjN3k0UE5rbWF2dlMyZUxiVFhrdXBNMGJQVjQyZiszUzJIQ2t4TmxGNnYraFZpOTltckpoDQpkTUNRcTBxTkFnTUJBQUVDZ2dFQUJXQ2lmbWJUL05NdElEWmQ3bENRdERYMzZ0L0tHM2g1TzFCTlRMa3JNTGJTDQo0N08rR0t4SldXRzdIYkpyV1U5bkE1NDBMVmhqRlRxei9CQlpGS3RUTVRhZ3ozaERUYWd3c3JodU9ydHEzc0RQDQppOCtyOW1kekpJY0hyMEFlQ0FVV2NCSnJqa1JwaGtQOGhwSTBUN3FlOUZlR0xCbkkzMFVua0xsRXlKc2o2Z3FRDQpuZjExTWxQU3p2U1NnRXMya05vakJNcTBiaXhHbmdETUc0R2pQNnJhVzFVRUVpOW4xbEhRWml1d05OY2w5bmhhDQo3UENVRHh4OE5tZjBPeXFnaFhmSWNsT0hJd2pUeXh4REhFa0lGSFd0bjdETkxzem44YWxBNkk1NGdrOGFBRVpUDQpkYktTbzlvcTNwcGI5ZERITGJVUk5vU2pscG1zL0MzVFpYWWUzY3hPRVFLQmdRRDlVSU5rWk5uVmt1NmFhR2xvDQphU0gwMkpSUld6RmxLSWcyR3RacUwwODBuRHhyem9VTlF4eFY4UStQSVV1M3Z4aEg4cS9ib3pTVnJhQWFPZmdmDQptZVBRNCtQMVlDY0R3RzNPN05CemdpcTE1VzBqSHhqMGgyd2VQQ3doUzVoSHBrelR5RHgxU1pGTTNPNHFFRjZmDQpYTVFJVHNEeVZLS1AwaGVJek8yOXBCUjB4UUtCZ1FEUU9FaWNRWko1cHRLQ2Vxdi96bFZ1UTBoZEZCelg1NmNtDQpmcHhmMCs5TVhJUGU0eGx2MkxUMlZxU0FuVTZDUHIwbzlIZFBYblBWa2pVYW5rVy9HYlNtVm5zMXBrNm1tSmtlDQo4NjRla0xQeWNTRVNqUVREZDFvdm16MjRxWlpyVlVmdEFyb0NUQ0Evb1dPeFV5cEZwYWZ0aWR0alB1U2dOeTFSDQpwYWxQYWlHcktRS0JnUURkWno3QVE4bUZlM3dpNXptaU1hbWxPSnRDRklPeTE5OWQ4czBQV0RSUlZuRVZCUmVUDQp4T0dDV0VUeUkvYnJMaElKNkpzK1RJS01oSW5ZQW16VktndE5xN0cxNlFtUXBPTVZKalQza0lER0pUWGpxYTJGDQpKTXdpRFJQQk1qSnlCVzlHOTgrbjc5b1lwVTFnNUpmZmtCUWk4cnAvMCt1VjZ0bjVEcXlJd1YzRHhRS0JnUUNoDQoyazVlMy8yN0FIajhJZDBYVUUxS0U1VHBmVnZhWEdDcTVKb3JSelBwT0xUdENielpHeXUzbkt2c3FkckFGWUsyDQpsaWswRWVpYXFEY05ST0JVWnVmc3NLYS9rbEhxNEEyT2FMNzlWVi83WWdMaVI2bmZReVJnZ3h6Y01UOFNtY3o2DQpLRGRzMTczdG1FZEZMSzljU2lPWjJxSWxxRnJSUzNLMzE3MGZWUkZzMlFLQmdRRGY1TXF4bzgrWENsaGNZaEhCDQplZFRmQXI3OTdRS0xzc0pMZkJpTW5qOHFCWGJkZG0vYnBjdSsrcDlGR0hzMW9mdThvOE9MQUdWdjVDS1c4WVc4DQorQmdjdXdTd2crdkpYVE1XeVVOeHRIWTRWR2dJU2c3QWg1ZHZ3K05CRmxRdGxXdlh1aTA4UUxqaFM5MjlSVkxIDQpMMm5ETDBpMjNGVmQwRFlhM3lvY2hnU2FlQT09DQotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0t
   ```

3. **GOOGLE_SHEETS_ID**
   ```
   1XMTokGRT2m4lp8R0OcQCSP5TrA-zta85pg--7hhev74
   ```
   dewdewdwe;k

### Optional Variables:

4. **ALLOWED_ORIGINS** (comma separated)
   ```
   https://homeownerbenefitguide.com,https://homeownerbenefit-qasim21569-qasim-kharodias-projects.vercel.app
   ```

5. **RECAPTCHA_SECRET** (if you want reCAPTCHA protection)
   ```
   your_recaptcha_secret_key_here
   ```

## Google Sheets Column Headers

Add these headers to row 1 of your "Roofing Leads Funnel" tab:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Phone | Zip Code | Street Address | Project Type | Roof Material | TCPA Consent | Source | IP Address |

## How to Set Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" tab
4. Click on "Environment Variables"
5. Add each variable above with its corresponding value
6. Make sure to select all environments (Production, Preview, Development)

## Test the Integration:

After setting up the environment variables and column headers:

1. Deploy your changes to Vercel
2. Submit a test form from your live site
3. Check that a new row appears in your "Roofing Leads Funnel" tab

## Troubleshooting:

- If you get a 403 error, make sure the Google Sheet is shared with your service account email
- If you get a 404 error on the sheet tab, make sure the tab name is exactly "Roofing Leads Funnel"
- Check Vercel function logs for detailed error messages
