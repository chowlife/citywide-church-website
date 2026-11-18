/* ==========================================================================
   SITE DATA — THIS IS THE FILE YOU EDIT MOST OFTEN
   --------------------------------------------------------------------------
   Change the text between the quotes "like this", save, and refresh the page.
   Rules: keep the quotes, keep the commas at the end of lines, and don't
   delete the curly { } or square [ ] brackets.
   ========================================================================== */

window.SITE = {
  name: "Citywide Praise and Worship Baptist Church",
  shortName: "Citywide Praise & Worship",
  tagline: "My church, my community, my city — the place where everyone is somebody.",

  // ---- Location & contact --------------------------------------------------
  address: {
    street: "80 Falby Court",
    city: "Ajax",
    province: "ON",
    postalCode: "",                       // e.g. "L1S 0A0"
  },
  phone: "905-686-1757",
  cell: "289-388-1705",
  email: "citywidepraise7@gmail.com",     // shown on Plan a Visit + footer (hidden while empty)

  // Leave a link empty ("") and its icon is hidden automatically.
  social: {
    facebook: "",
    youtube: "",
    instagram: "",
  },

  // ---- Weekly services -----------------------------------------------------
  services: [
    {
      day: "Sunday",
      time: "10:30 AM – 12:30 PM",
      name: "Sunday Worship Service",
      description: "Praise, prayer and the preaching of God's Word. Everyone is welcome — come as you are.",
      featured: true,
    },
    {
      day: "Tuesday",
      time: "7:00 PM – 8:30 PM",
      name: "Reach Out",
      description: "Caring for one another — visiting and praying with families in our community.",
    },
    {
      day: "Thursday",
      time: "7:00 PM – 8:30 PM",
      name: "Bible Study & Prayer",
      description: "Digging into Scripture together and getting the spiritual connection through prayer.",
    },
  ],

  // ---- Upcoming events -----------------------------------------------------
  // Dates are "YYYY-MM-DD". Events disappear by themselves the day after they
  // end, so the site never shows old events. Copy a block to add another.
  events: [
    // {
    //   title: "Women's Conference: Life, Love and Marriage",
    //   start: "2027-03-12",
    //   end:   "2027-03-14",              // optional, for multi-day events
    //   time:  "7:00 PM",                 // optional
    //   description: "Three days of worship, teaching and fellowship for women of all ages.",
    // },
  ],

  // ---- Leadership ----------------------------------------------------------
  // photo: put the picture in assets/images/ and write its file name here.
  leaders: [
    {
      name: "Rev. George Lwamba",
      role: "Pastor",
      bio: "",
      photo: "",
    },
  ],

  // ---- Giving --------------------------------------------------------------
  giving: {
    canadaHelps: "https://www.canadahelps.org/en/charities/citywide-praise-and-worship-baptist-church/",
    etransferEmail: "citywidepraise7@gmail.com", // Interac e-Transfer, autodeposit on (hidden while empty)
    paypalEmail: "citywidepraise7@gmail.com",    // PayPal "Send" (hidden while empty)
    charityNumber: "839404886RR0001",
  },
};
