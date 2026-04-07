export const resetCodeEmail = (code: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#1a1a2e;padding:32px;text-align:center;">
              <h1 style="margin:0;color:#c9a84c;font-size:22px;letter-spacing:1px;">
                Eternal Rhema Life Ministries
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 32px;">
              <h2 style="margin:0 0 16px;color:#1a1a2e;font-size:20px;">Password Reset Request</h2>
              <p style="margin:0 0 24px;color:#555;line-height:1.6;">
                A password reset was requested for your admin account. Use the code below to proceed.
                This code expires in <strong>15 minutes</strong>.
              </p>
              <div style="background:#f8f4e8;border:2px dashed #c9a84c;border-radius:8px;padding:24px;text-align:center;margin:0 0 24px;">
                <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Your Reset Code</p>
                <p style="margin:0;color:#1a1a2e;font-size:40px;font-weight:bold;letter-spacing:8px;">${code}</p>
              </div>
              <p style="margin:0;color:#888;font-size:13px;line-height:1.6;">
                If you did not request a password reset, you can safely ignore this email.
                Your password will not change unless you use the code above.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8f8f8;padding:20px 32px;text-align:center;border-top:1px solid #eee;">
              <p style="margin:0;color:#aaa;font-size:12px;">
                &copy; ${new Date().getFullYear()} Eternal Rhema Life Ministries. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
