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
    postalCode: "L1S 1N4",
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
      day: "Monday",
      time: "5:00 AM – 5:30 AM",
      name: "Morning Prayer",
      description: "Starting the week together in prayer, seeking God before the day begins.",
    },
    {
      day: "Thursday",
      time: "6:00 PM – 7:00 PM",
      name: "Bible Study & Prayer",
      description: "Digging into Scripture together and getting the spiritual connection through prayer.",
    },
    {
      day: "Every day",                    // "Every day" shows first and is labelled "Daily"
      time: "12:00 AM – 1:00 AM",
      name: "Midnight Prayers",
      description: "A night of deliverance. Our Liberation prayer service, praying together through the midnight hour.",
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
  // bio: each "quoted line" is one paragraph.
  leaders: [
    {
      name: "Bishop George Lwamba",
      role: "Bishop",
      photo: "bishop-lwamba.jpg",           // file in assets/images ("" shows initials)
      bio: [
        "Bishop George Lwamba is a devoted servant of God, a visionary spiritual leader, and a passionate preacher of the Gospel of Jesus Christ at Citywide Praise and Worship Church.",
        "With a heart for God and His people, Bishop George Lwamba is committed to transforming lives through biblical teachings, prayer, praise, and worship. His ministry is anchored in faith, love, compassion, integrity, and spiritual excellence.",
        "He is passionate about winning souls for Christ, strengthening families, nurturing spiritual leaders, and empowering individuals to discover and fulfill their God-given purpose.",
        "Through his leadership at Citywide Praise and Worship Church, he seeks to create an atmosphere where people can experience the presence of God, receive spiritual restoration, and grow in their relationship with Jesus Christ.",
        "His vision is to advance the Kingdom of God, inspire generations, and make a lasting impact on communities for the glory of God.",
      ],
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
