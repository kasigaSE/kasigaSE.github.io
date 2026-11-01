KASIGA MARKET - works on any website (no PHP needed)

STEP 1 - Make the score store (free, 3 minutes)
 1. Go to script.google.com and click New project.
 2. Delete everything there, paste all of Code.gs, then set your own
    ADMIN_ID and ADMIN_PASSWORD at the top.
 3. Click Deploy > New deployment > type: Web app.
    Execute as: Me.  Who has access: Anyone.  Click Deploy and allow access.
 4. Copy the Web app URL (ends with /exec).

STEP 2 - Put the URL in both pages
 Open game.html and admin.html in a text editor. Find:
   var API='PASTE_YOUR_WEB_APP_URL_HERE';
 and replace the text with your URL. Save both.

STEP 3 - Upload index.html, game.html and admin.html to your website.
 Players open index.html (the homepage). Admins use the small Admin button at the bottom.

If you change Code.gs later: Deploy > Manage deployments > Edit > New version.
