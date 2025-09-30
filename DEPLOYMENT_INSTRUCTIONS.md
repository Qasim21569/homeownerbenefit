# Complete Deployment Instructions

## Step 1: Set Up Google Sheets Column Headers

Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1XMTokGRT2m4lp8R0OcQCSP5TrA-zta85pg--7hhev74/edit?gid=1912516804#gid=1912516804

1. Click on the "Roofing Leads Funnel" tab (create it if it doesn't exist)
2. Add these headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Phone | Zip Code | Street Address | Project Type | Roof Material | TCPA Consent | Source | IP Address |

## Step 2: Set Up Vercel Environment Variables

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `homeownerbenefit-qasim21569-qasim-kharodias-projects`
3. Go to Settings → Environment Variables
4. Add these variables for ALL environments (Production, Preview, Development):

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=rgl-lead-form-service@ai-life-coach-458414.iam.gserviceaccount.com

GOOGLE_PRIVATE_KEY_B64=LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tDQpNSUlFdndJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLa3dnZ1NsQWdFQUFvSUJBUURPQ1J3M2tzMjhZR0JLDQp3WWxyS0tMelRldFNwVG5pVGNmWUhwK0xvYkxuMU5abHQySUVaY1pVYkNHOUI5MDh6UmFIQjRjQkRxZ0QyL2FKDQpTcUVLZGwwRmxlUlRyRTNMS3VtSmZFblBBYyt2SWo0MEhabDkycXAydFpMdjRha1EydUNGQjZibk9kQmIwZ1dlDQoramhwelYzQ1FxMW5mSEVCSUdDcUpKZ0tLbTdIU0FUWDU4c0p6WWxXUDFrSUtGR05aMXFSTzJDRU51ODBkemVIDQpPZUZVd0ZjK1BEMW5ZZURSaURoTU5OUXV3UFhETm82bnhWek1UekZqVS80Q3pNQ08rVFhxaGJOMEFobGpsakRJDQpwUEJ2ZWJqSUVIa2NjN3k0UE5rbWF2dlMyZUxiVFhrdXBNMGJQVjQyZiszUzJIQ2t4TmxGNnYraFZpOTltckpoDQpkTUNRcTBxTkFnTUJBQUVDZ2dFQUJXQ2lmbWJUL05NdElEWmQ3bENRdERYMzZ0L0tHM2g1TzFCTlRMa3JNTGJTDQo0N08rR0t4SldXRzdIYkpyV1U5bkE1NDBMVmhqRlRxei9CQlpGS3RUTVRhZ3ozaERUYWd3c3JodU9ydHEzc0RQDQppOCtyOW1kekpJY0hyMEFlQ0FVV2NCSnJqa1JwaGtQOGhwSTBUN3FlOUZlR0xCbkkzMFVua0xsRXlKc2o2Z3FRDQpuZjExTWxQU3p2U1NnRXMya05vakJNcTBiaXhHbmdETUc0R2pQNnJhVzFVRUVpOW4xbEhRWml1d05OY2w5bmhhDQo3UENVRHh4OE5tZjBPeXFnaFhmSWNsT0hJd2pUeXh4REhFa0lGSFd0bjdETkxzem44YWxBNkk1NGdrOGFBRVpUDQpkYktTbzlvcTNwcGI5ZERITGJVUk5vU2pscG1zL0MzVFpYWWUzY3hPRVFLQmdRRDlVSU5rWk5uVmt1NmFhR2xvDQphU0gwMkpSUld6RmxLSWcyR3RacUwwODBuRHhyem9VTlF4eFY4UStQSVV1M3Z4aEg4cS9ib3pTVnJhQWFPZmdmDQptZVBRNCtQMVlDY0R3RzNPN05CemdpcTE1VzBqSHhqMGgyd2VQQ3doUzVoSHBrelR5RHgxU1pGTTNPNHFFRjZmDQpYTVFJVHNEeVZLS1AwaGVJek8yOXBCUjB4UUtCZ1FEUU9FaWNRWko1cHRLQ2Vxdi96bFZ1UTBoZEZCelg1NmNtDQpmcHhmMCs5TVhJUGU0eGx2MkxUMlZxU0FuVTZDUHIwbzlIZFBYblBWa2pVYW5rVy9HYlNtVm5zMXBrNm1tSmtlDQo4NjRla0xQeWNTRVNqUVREZDFvdm16MjRxWlpyVlVmdEFyb0NUQ0Evb1dPeFV5cEZwYWZ0aWR0alB1U2dOeTFSDQpwYWxQYWlHcktRS0JnUURkWno3QVE4bUZlM3dpNXptaU1hbWxPSnRDRklPeTE5OWQ4czBQV0RSUlZuRVZCUmVUDQp4T0dDV0VUeUkvYnJMaElKNkpzK1RJS01oSW5ZQW16VktndE5xN0cxNlFtUXBPTVZKalQza0lER0pUWGpxYTJGDQpKTXdpRFJQQk1qSnlCVzlHOTgrbjc5b1lwVTFnNUpmZmtCUWk4cnAvMCt1VjZ0bjVEcXlJd1YzRHhRS0JnUUNoDQoyazVlMy8yN0FIajhJZDBYVUUxS0U1VHBmVnZhWEdDcTVKb3JSelBwT0xUdENielpHeXUzbkt2c3FkckFGWUsyDQpsaWswRWVpYXFEY05ST0JVWnVmc3NLYS9rbEhxNEEyT2FMNzlWVi83WWdMaVI2bmZReVJnZ3h6Y01UOFNtY3o2DQpLRGRzMTczdG1FZEZMSzljU2lPWjJxSWxxRnJSUzNLMzE3MGZWUkZzMlFLQmdRRGY1TXF4bzgrWENsaGNZaEhCDQplZFRmQXI3OTdRS0xzc0pMZkJpTW5qOHFCWGJkZG0vYnBjdSsrcDlGR0hzMW9mdThvOE9MQUdWdjVDS1c4WVc4DQorQmdjdXdTd2crdkpYVE1XeVVOeHRIWTRWR2dJU2c3QWg1ZHZ3K05CRmxRdGxXdlh1aTA4UUxqaFM5MjlSVkxIDQpMMm5ETDBpMjNGVmQwRFlhM3lvY2hnU2FlQT09DQotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0t

GOOGLE_SHEETS_ID=1XMTokGRT2m4lp8R0OcQCSP5TrA-zta85pg--7hhev74

ALLOWED_ORIGINS=https://homeownerbenefitguide.com,https://homeownerbenefit-qasim21569-qasim-kharodias-projects.vercel.app
```

## Step 3: Deploy to Vercel

1. Build and deploy your project:
   ```bash
   npm run build
   ```

2. The deployment should automatically happen via Vercel GitHub integration.

## Step 4: Test the Integration

### Test 1: From Vercel Domain
1. Visit: https://homeownerbenefit-qasim21569-qasim-kharodias-projects.vercel.app/
2. Fill out and submit the form
3. Check if a new row appears in your "Roofing Leads Funnel" tab

### Test 2: From Static Domain (if deployed)
1. Visit: https://homeownerbenefitguide.com/
2. Fill out and submit the form
3. Check if a new row appears in your "Roofing Leads Funnel" tab

## Step 5: Verify CORS is Working

If you're getting CORS errors when submitting from your static domain:

1. Check browser console for error messages
2. Verify the ALLOWED_ORIGINS environment variable includes your static domain
3. Make sure the environment variables are set for Production environment
4. Redeploy if you made changes to environment variables

## Expected Data in Google Sheets

After a successful form submission, you should see a new row with:
- Current timestamp
- User's first and last name
- Email and phone number
- Zip code and street address
- Selected project type (repair/replace)
- Selected roof material
- TCPA consent status (Yes/No)
- Source URL where the form was submitted
- User's IP address

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**: 
   - Make sure the Google Sheet is shared with: `rgl-lead-form-service@ai-life-coach-458414.iam.gserviceaccount.com`
   - Give it "Editor" permissions

2. **404 Sheet Not Found**:
   - Verify the sheet tab is named exactly "Roofing Leads Funnel"
   - Check the GOOGLE_SHEETS_ID environment variable

3. **CORS Errors**:
   - Verify ALLOWED_ORIGINS includes your domain
   - Make sure environment variables are set for Production environment

4. **Form Not Submitting**:
   - Check browser console for JavaScript errors
   - Verify all required fields are filled
   - Check Network tab to see API request status

### Check Vercel Function Logs:
1. Go to Vercel Dashboard → Your Project → Functions tab
2. Click on the `submit-lead` function
3. View the logs to see detailed error messages

## Security Features Enabled

✅ CORS protection (only allowed domains can submit)  
✅ Honeypot spam protection  
✅ Server-side form validation  
✅ Environment variable encryption  
✅ Request IP logging for audit  

The form is now production-ready and secure!
