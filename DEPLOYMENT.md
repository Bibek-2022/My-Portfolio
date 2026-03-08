# GoDaddy Hosting Configuration Guide

This site is ready for standard GoDaddy Linux hosting with PHP support.

## 1) Upload files
Upload these files/folders to your domain web root (usually `public_html/`):

- `index.html`
- `style.css`
- `script.js`
- `contact.php`
- `assets/`

## 2) Verify PHP is enabled
In GoDaddy cPanel, make sure your domain is using a PHP version supported by this script (PHP 7.4+ recommended).

## 3) Contact form recipient
Open `contact.php` and set the destination inbox in `$to` if needed:

```php
$to = 'shresthabibek2022@gmail.com';
```

## 4) Email deliverability (recommended)
For reliable outgoing email from hosting:

- Configure SPF for your domain.
- Configure DKIM in your DNS/hosting panel if available.
- If GoDaddy mail restrictions apply, consider SMTP relay (plugin/service) instead of `mail()`.

## 5) Test in production
After deployment:

1. Open the website.
2. Submit the contact form.
3. Confirm the success message appears.
4. Confirm the message arrives at the configured recipient.

If email fails, the UI shows a fallback message with the direct contact email.

## 6) Vercel Node.js version setting
If deploying through Vercel, set **Project Settings → Node.js Version** to **24.x**.
This repository now also pins Node via:

- `package.json` → `"engines": { "node": "24.x" }`
- `.nvmrc` → `24`

This resolves the error: `Found invalid or discontinued Node.js Version: "14.x"`.

## 7) Vercel output directory fix
If Vercel reports `No Output Directory named "public" found`, this repo now includes `vercel.json` with:

- `"outputDirectory": "."`

This tells Vercel to deploy the repository root directly (where `index.html` lives), instead of expecting a generated `public/` directory.

Framework preset can be left as **Auto** in Vercel Project Settings; the repo-level `vercel.json` now only pins commands and output directory.
