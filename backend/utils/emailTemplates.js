function baseTemplate(title, content) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body{
        margin:0;
        padding:0;
        background:#f5f7fb;
        font-family:Arial,sans-serif;
      }

      .container{
        max-width:650px;
        margin:30px auto;
        background:#ffffff;
        border-radius:14px;
        overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,.08);
      }

      .header{
        background:linear-gradient(135deg,#07406e,#1a7fc1);
        color:white;
        text-align:center;
        padding:35px;
      }

      .header h1{
        margin:0;
        font-size:30px;
      }

      .content{
        padding:35px;
        color:#333;
        line-height:1.7;
        font-size:16px;
      }

      .button{
        display:inline-block;
        margin-top:25px;
        background:#ff8a00;
        color:white !important;
        text-decoration:none;
        padding:14px 28px;
        border-radius:8px;
        font-weight:bold;
      }

      .footer{
        background:#f4f4f4;
        text-align:center;
        padding:20px;
        color:#666;
        font-size:13px;
      }

    </style>
  </head>

  <body>

    <div class="container">

      <div class="header">
        <h1>🌍 GlobeTrekker</h1>
        <p>${title}</p>
      </div>

      <div class="content">
        ${content}
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} GlobeTrekker<br>
        Travel Beyond Limits ✈️
      </div>

    </div>

  </body>
  </html>
  `;
}

function welcomeTemplate(username){

return baseTemplate(
"Welcome to GlobeTrekker",

`
<h2>Hello ${username}! 👋</h2>

<p>
Thank you for joining
<b>GlobeTrekker</b>.
</p>

<p>
Your account has been created successfully.
</p>

<ul>
<li>🌍 Explore Destinations</li>
<li>🤖 Chat with GlobeBot</li>
<li>❤️ Save Wishlist</li>
<li>🧳 Book Amazing Trips</li>
</ul>

<p>
We're excited to be part of your next adventure.
</p>

<a href="https://globetrekker-rho.vercel.app"
class="button">
Visit GlobeTrekker
</a>

`
);

}

function bookingTemplate(booking) {

return baseTemplate(

"Booking Confirmed 🎉",

`

<h2>Hello ${booking.name}! 👋</h2>

<p>Your booking has been confirmed successfully.</p>

<table
style="
width:100%;
border-collapse:collapse;
margin-top:20px;
">

<tr>
<td><strong>📍 Destination</strong></td>
<td>${booking.destination}</td>
</tr>

<tr>
<td><strong>📦 Package</strong></td>
<td>${booking.package}</td>
</tr>

<tr>
<td><strong>📅 Travel Date</strong></td>
<td>${booking.date}</td>
</tr>

<tr>
<td><strong>👥 Travelers</strong></td>
<td>${booking.travelers}</td>
</tr>

<tr>
<td><strong>💰 Total Amount</strong></td>
<td>₹${Number(booking.totalPrice || 0).toLocaleString()}</td>
</tr>

<tr>
<td><strong>🆔 Booking ID</strong></td>
<td>${booking.bookingId}</td>
</tr>

</table>

<p style="margin-top:25px;">
Our travel team will contact you shortly with your itinerary.
</p>

<a
href="https://globetrekker-rho.vercel.app"
class="button">
Visit GlobeTrekker
</a>

`

);

}

function subscribeTemplate(email) {

  return baseTemplate(

    "Newsletter Subscription 🎉",

    `

    <h2>Welcome to GlobeTrekker! 🌍</h2>

    <p>
    Thank you for subscribing to our newsletter.
    </p>

    <p>
    Registered Email:
    <b>${email}</b>
    </p>

    <p>
    You'll now receive:
    </p>

    <ul>
      <li>✈️ Exclusive Travel Deals</li>
      <li>🌍 New Destination Guides</li>
      <li>🏝️ Seasonal Vacation Offers</li>
      <li>💰 Discount Coupons</li>
      <li>🤖 AI Travel Tips</li>
    </ul>

    <p>
    Stay tuned for amazing adventures!
    </p>

    <a
    href="https://globetrekker-rho.vercel.app"
    class="button">
    Explore GlobeTrekker
    </a>

    `

  );

}

function contactReceivedTemplate(name) {

  return baseTemplate(

    "We've Received Your Message",

    `

    <h2>Hello ${name}! 👋</h2>

    <p>
    Thank you for contacting
    <b>GlobeTrekker.</b>
    </p>

    <p>
    Your message has been received successfully.
    </p>

    <p>
    Our support team usually replies within
    <b>24 hours.</b>
    </p>

    <p>
    Meanwhile you can continue exploring destinations,
    AI trip planning and exclusive packages.
    </p>

    <a
    href="https://globetrekker-rho.vercel.app"
    class="button">
    Visit GlobeTrekker
    </a>

    `

  );

}

module.exports = {
  baseTemplate,
  welcomeTemplate,
  bookingTemplate,
  subscribeTemplate,
  contactReceivedTemplate
};