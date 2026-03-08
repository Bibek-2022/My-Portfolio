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
