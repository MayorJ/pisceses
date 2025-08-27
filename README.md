
# Pisceses - Static Ecommerce + Blog (Demo)

Structure: Simple static site using Bootstrap + vanilla JavaScript. Data (products, blogs, cart) are stored in localStorage so you can manage content via the Admin page.

Quick Start:
1. Unzip the folder.
2. Open index.html in your browser (or deploy the folder to Netlify / GitHub Pages).
3. Admin: admin.html — default PIN is 1234 (change in localStorage or in assets/js/utils.js).

How to change images:
- Product images are in assets/images/products/ (SVG placeholders). Replace with your own images using the same filenames or update products from the Admin panel by uploading images.

How to change admin PIN:
- Default PIN stored in localStorage under key pisceses_admin_pin_v1. You can change it from browser DevTools or modify the default in assets/js/utils.js.

Deploying to Netlify:
- Create a new Netlify site, drag & drop the unzipped folder into Netlify. The site is static and requires no server.

Notes:
- Social sharing from Admin opens compose/share windows for Facebook, X (Twitter), and LinkedIn.
- Checkout uses mailto: to send order details to ibarnconcepts@gmail.com. Replace with EmailJS or a real backend if you need automated emails.
