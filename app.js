// Static hosting: forms post to FormSubmit (https://formsubmit.co), which emails each submission.
// Replace FORMSUBMIT_ALIAS with the hashed alias from the FormSubmit activation email.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/FORMSUBMIT_ALIAS";
/**
 * Potomac Family & Luxury Travel — Interactive Lead, Newsletter & Affiliate Engine
 * Advisor: Patrick • Fora Certified Travel Advisor
 */

const AFFILIATE_CONFIG = {
  agencyName: "Potomac Family & Luxury Travel",
  advisorFirstName: "Patrick",
  welcomePickupsLiveUrl: "https://www.book-online-transfers.com/en/fora-travel-27771",
  cjAffiliatePublisherId: "",
  amazonAssociateTag: ""
};

// Resort-specific estimates for the Perks & Price-Drop Checker.
// Values marked "typical" are general advisor-program perks and vary by date, rate and availability.
const TYPICAL = "Typical advisor perk — varies by date";
const BRAND_MODELS = {
  "beaches-tc": {
    name: "Beaches Turks & Caicos",
    promoRatePct: 0.07, flatPerksValue: 0, perDayPerksValue: 0,
    lineItems: (cost, nights) => [
      { label: "Weekly 7-7-7 check (extra 7% off IF your suite appears on a Wednesday list)", value: `up to $${Math.round(cost * 0.07).toLocaleString()}` },
      { label: "Price-drop monitoring until final payment", value: "Included" },
      { label: "Airport transfers (included in Beaches all-inclusive)", value: "Included" },
      { label: "Room-assignment & connecting-room advocacy", value: TYPICAL }
    ],
    takeoverRules: {
      "not-booked": "✅ We'll quote your dates against the current week's 7-7-7 list and standard Beaches offers.",
      "recent-deposit": "✅ Direct Sandals/Beaches bookings not yet paid in full can usually be transferred to an advisor — you keep your suite and confirmation.",
      "loyalty-desk": "✅ Booked at the on-property Loyalty Desk? Transfers are often possible before final payment; we'll check your booking's eligibility.",
      "paid-in-full": "⚠️ After final payment, agency transfers generally close — we can still help with transfers, excursions and future trips."
    }
  },
  "turks-caicos": {
    name: "Other Turks & Caicos Family Resorts (Grace Bay villas & condo-suites)",
    promoRatePct: 0, flatPerksValue: 100, perDayPerksValue: 50,
    lineItems: (cost, nights) => [
      { label: "Resort/property credit (where a preferred program applies)", value: TYPICAL },
      { label: "Daily breakfast at participating luxury hotels", value: TYPICAL },
      { label: "Upgrade / early check-in / late check-out when available", value: TYPICAL },
      { label: "Multi-bedroom suite & villa matching for your family", value: "Included" }
    ],
    takeoverRules: {
      "not-booked": "✅ Tell us ages and budget — we'll shortlist Grace Bay family resorts beyond Beaches.",
      "recent-deposit": "✅ Many refundable hotel bookings can be rebooked through an advisor program if rates match — we'll check.",
      "loyalty-desk": "✅ Preferred-program bookings generally still earn hotel loyalty points where the brand allows.",
      "paid-in-full": "⚠️ Prepaid/non-refundable rates usually can't be moved; we can still contact the property about requests."
    }
  },
  "baha-mar": {
    name: "Baha Mar — Grand Hyatt, Rosewood or SLS",
    promoRatePct: 0, flatPerksValue: 100, perDayPerksValue: 60,
    lineItems: (cost, nights) => [
      { label: "Hyatt Privé (Grand Hyatt) / Rosewood Elite (Rosewood): daily breakfast for two", value: TYPICAL },
      { label: "Property credit per stay", value: TYPICAL },
      { label: "Upgrade & early/late check-out when available", value: TYPICAL },
      { label: "Hotel-in-resort matching (Grand Hyatt vs Rosewood vs SLS) for your family", value: "Included" }
    ],
    takeoverRules: {
      "not-booked": "✅ No current Baha Mar supplier promo in our inbox — we'll quote with program perks at comparable rates.",
      "recent-deposit": "✅ Refundable direct bookings can often be rebooked under a preferred program — we'll compare.",
      "loyalty-desk": "✅ Grand Hyatt program bookings typically still earn World of Hyatt points.",
      "paid-in-full": "⚠️ If you're outside the cancellation deadline on a refundable rate, we can check a switch."
    }
  },
  "atlantis": {
    name: "Atlantis Paradise Island — The Reef, The Royal or The Cove",
    promoRatePct: 0, flatPerksValue: 100, perDayPerksValue: 40,
    lineItems: (cost, nights) => [
      { label: "Advisor-program amenities where eligible (e.g., Virtuoso / Fora Reserve)", value: TYPICAL },
      { label: "Tower matching: Reef (kitchenettes) vs Royal (central) vs Cove (all-suite)", value: "Included" },
      { label: "Cove renovation-timing check (Beach Club opening 2027)", value: "Included" },
      { label: "Aquaventure access included with resort stays", value: "Included" }
    ],
    takeoverRules: {
      "not-booked": "✅ We'll compare towers and current Atlantis offers for your dates.",
      "recent-deposit": "✅ Refundable direct bookings can often be moved to an advisor — we'll check rate parity.",
      "loyalty-desk": "✅ Ask us about connecting rooms and suite layouts for multi-gen groups.",
      "paid-in-full": "⚠️ Prepaid rates usually can't be moved; we can still help with requests."
    }
  },
  "moon-palace": {
    name: "Moon Palace Cancún / The Grand at Moon Palace / Moon Palace Punta Cana",
    promoRatePct: 0, flatPerksValue: 0, perDayPerksValue: 0,
    lineItems: (cost, nights) => [
      { label: "Current Palace offer check (last verified offer closed Sep 29, 2026)", value: "Quote on request" },
      { label: "Resort credit — explained & applied correctly when included", value: "When offered" },
      { label: "Airport transfers / kids & teens stay offers", value: "When offered" },
      { label: "The Grand vs Moon Palace Cancún room-type matching", value: "Included" }
    ],
    takeoverRules: {
      "not-booked": "✅ Palace releases new offers regularly — we'll quote whatever is current for your dates.",
      "recent-deposit": "✅ We can review your existing Palace booking against current offers.",
      "loyalty-desk": "✅ Multi-room family groups: ask about group options.",
      "paid-in-full": "⚠️ Send your current rate — we'll check what's possible under its terms."
    }
  },
  "disney-cruise": {
    name: "Also book: Disney Cruise Line + Universal Orlando",
    promoRatePct: 0, flatPerksValue: 0, perDayPerksValue: 0,
    lineItems: (cost, nights) => [
      { label: "Booking-window & deadline management", value: "Included" },
      { label: "Pre-cruise Orlando hotel with connecting-room requests", value: "Included" },
      { label: "Port transfers via partner links", value: "Optional" }
    ],
    takeoverRules: {
      "not-booked": "✅ We'll plan your sailing and pre-cruise stay.",
      "recent-deposit": "✅ Disney Cruise Line generally allows transferring a direct booking to an advisor shortly after deposit — ask us.",
      "loyalty-desk": "✅ Onboard placeholder bookings can usually be linked to an advisor.",
      "paid-in-full": "⚠️ Transfers typically close after final payment."
    }
  },
  "paradisus-melia": {
    name: "Also book: Paradisus Playa del Carmen (Meliá)",
    promoRatePct: 0, flatPerksValue: 0, perDayPerksValue: 0,
    lineItems: (cost, nights) => [
      { label: "Meliá advisor-program amenities", value: TYPICAL },
      { label: "Family Concierge suite matching", value: "Included" }
    ],
    takeoverRules: {
      "not-booked": "✅ We'll quote Family Concierge suites with any available advisor amenities.",
      "recent-deposit": "✅ Refundable bookings can often be rebooked — we'll compare.",
      "loyalty-desk": "✅ MeliáRewards membership generally still applies.",
      "paid-in-full": "⚠️ We'll check your rate's terms."
    }
  },
  "luxury-hotel": {
    name: "Other luxury hotel or resort",
    promoRatePct: 0, flatPerksValue: 100, perDayPerksValue: 50,
    lineItems: (cost, nights) => [
      { label: "Daily breakfast at participating properties", value: TYPICAL },
      { label: "Property credit", value: TYPICAL },
      { label: "Upgrade / early & late check-out when available", value: TYPICAL }
    ],
    takeoverRules: {
      "not-booked": "✅ Fora Reserve / Virtuoso / brand programs where the hotel participates.",
      "recent-deposit": "✅ Refundable direct bookings can often be rebooked under a program.",
      "loyalty-desk": "✅ Hotel points typically still earned where the brand allows.",
      "paid-in-full": "⚠️ Prepaid rates usually can't be moved."
    }
  }
};

// Embedded fallback deals (synced with deals-data.json)
const FALLBACK_DEALS = [
  {
    "id": "tci-beaches-777",
    "category": "turks-caicos",
    "badge": "WEEKLY 7-7-7 WEDNESDAY PROGRAM",
    "urgency": "New suite list every Wednesday — ask for this week's",
    "resort": "Beaches Turks & Caicos (+ Grace Bay family resorts)",
    "location": "Grace Bay, Providenciales (PLS)",
    "headline": "Weekly 7-7-7 Promo: Extra 7% Off Select Suites, Released Every Wednesday",
    "summary": "Sandals & Beaches publish a new 7-7-7 list to advisors each Wednesday. We check your dates and suite against every new list and reprice when eligible. Prefer something beyond Beaches? We also plan Grace Bay family villas and condo-style resorts.",
    "eligibleSuites": [
      "Eligible suite categories change weekly (ask for current list)",
      "Butler & Concierge family suites at Beaches Turks & Caicos",
      "Other Grace Bay family resorts: multi-bedroom condo suites & villas"
    ],
    "travelWindows": "Varies by weekly list",
    "vipPerks": [
      "Weekly 7-7-7 list monitoring against your booking",
      "Help transferring an eligible direct booking (not yet paid in full)",
      "Typical advisor perks, vary by date: room-assignment advocacy, connecting-room requests"
    ],
    "sampleSavings": "7% off eligible suites when they appear on the weekly list",
    "sourceNote": "Sandals/Beaches 7-7-7 advisor bulletins (Fora inbox)",
    "brandKey": "beaches-tc"
  },
  {
    "id": "baha-mar-perks",
    "category": "bahamas",
    "badge": "LUXURY PERK PROGRAMS",
    "urgency": "Typical advisor perks, vary by date",
    "resort": "Baha Mar — Grand Hyatt, Rosewood & SLS",
    "location": "Cable Beach, Nassau (NAS)",
    "headline": "Book Baha Mar Through an Advisor for Program Perks at Comparable Rates",
    "summary": "No current Baha Mar supplier promo in our inbox this week. Booking through Fora's preferred programs (e.g., Hyatt Privé at Grand Hyatt, Rosewood Elite at Rosewood) typically adds amenities at rates comparable to booking direct.",
    "eligibleSuites": [
      "Grand Hyatt: family-friendly rooms & suites near Baha Bay",
      "Rosewood: suites & residences for multi-gen families",
      "SLS: adult-leaning, ideal for parents' getaways"
    ],
    "travelWindows": "Year-round (subject to availability)",
    "vipPerks": [
      "Typical advisor perks, vary by date: daily breakfast for two",
      "Typical: property/resort credit per stay",
      "Typical: upgrade & early/late check-out when available"
    ],
    "sampleSavings": "Perks vary by program, rate and dates",
    "sourceNote": "No current promo in inbox — general program perks only",
    "brandKey": "baha-mar"
  },
  {
    "id": "atlantis-perks",
    "category": "bahamas",
    "badge": "THE COVE TRANSFORMATION • BEACH CLUB 2027",
    "urgency": "Typical advisor perks, vary by date",
    "resort": "Atlantis Paradise Island — The Reef, The Royal & The Cove",
    "location": "Paradise Island, Nassau (NAS)",
    "headline": "Choosing the Right Atlantis Tower — Plus News on The Cove's Reimagining",
    "summary": "Per Atlantis' Aug 2026 advisor update, The Cove is reimagining every ocean suite, shared space and pool, with a new Beach Club in 2027. No current rate promo in our inbox; we compare towers for your family and add any available advisor amenities.",
    "eligibleSuites": [
      "The Reef: condo-style suites with kitchenettes (great for families)",
      "The Royal: central, closest to Aquaventure & dining",
      "The Cove: all-suite, upscale; ask about renovation timing"
    ],
    "travelWindows": "Year-round; Cove renovation phases through 2027",
    "vipPerks": [
      "Typical advisor perks, vary by date (e.g., Virtuoso / Fora Reserve where eligible)",
      "Tower & room-type matching for your kids' ages",
      "Renovation-timing check for The Cove"
    ],
    "sampleSavings": "Perks vary by tower, rate and dates",
    "sourceNote": "Atlantis Travel Advisor Edition email (Aug 13, 2026)",
    "brandKey": "atlantis"
  },
  {
    "id": "moon-palace-palace-pro",
    "category": "mexico",
    "badge": "PALACE PRO • LAST OFFER CLOSED SEP 29",
    "urgency": "Ask for the current Palace offer",
    "resort": "Moon Palace Cancún, The Grand at Moon Palace & Moon Palace Punta Cana",
    "location": "Cancún (CUN) & Punta Cana (PUJ)",
    "headline": "Palace Resorts Credit & Kids-Stay Offers — We Track Each New Release",
    "summary": "The most recent Palace offer in our inbox (Fall sale: up to 45% off, $500 resort credit, airport transfers, free stays for kids & teens) closed for booking Sep 29, 2026. Palace releases new offers regularly; we'll quote whatever is current for your dates.",
    "eligibleSuites": [
      "The Grand at Moon Palace: larger suites, more family space",
      "Moon Palace Cancún: classic family favorite, kids' club & water park",
      "Moon Palace Punta Cana: Dominican Republic option"
    ],
    "travelWindows": "Last offer stays: through Dec 23, 2027 (booking window closed)",
    "vipPerks": [
      "Resort credit explained & applied correctly (when included in the offer)",
      "Airport transfers & kids/teens stay offers when available",
      "Typical advisor perks, vary by date: room-location requests"
    ],
    "sampleSavings": "Depends on the current Palace offer",
    "sourceNote": "Palace PRO Agents email (Sep 23, 2026)",
    "brandKey": "moon-palace"
  },
  {
    "id": "also-book-disney-mexico",
    "category": "also",
    "badge": "ALSO BOOK",
    "urgency": "Secondary services",
    "resort": "Disney Cruise Line, Universal Orlando & Riviera Maya (Paradisus)",
    "location": "Orlando / Port Canaveral & Riviera Maya",
    "headline": "Also Book: Disney Cruises, Universal Split-Stays & Riviera Maya Family Concierge",
    "summary": "Outside our four specialties we also plan Disney cruises (incl. Concierge), Universal Orlando pre-cruise stays with connecting-room requests, and Paradisus Playa del Carmen Family Concierge.",
    "eligibleSuites": [
      "Disney Cruise Line Concierge & verandah staterooms",
      "Universal Orlando hotels (connecting-room requests)",
      "Paradisus Playa del Carmen Family Concierge suites"
    ],
    "travelWindows": "Year-round",
    "vipPerks": [
      "Typical advisor perks, vary by date",
      "Deadline & booking-window management",
      "Transfers & excursions via our partner links"
    ],
    "sampleSavings": "Varies",
    "sourceNote": "General services",
    "brandKey": "disney-cruise"
  }
];

const AFFILIATE_DIRECTORY = [
  {
    id: "welcome-pickups-transfers",
    category: "transfers",
    partnerBadge: "LIVE PARTNER • WELCOME PICKUPS",
    isLiveLink: true,
    title: "Private English-Speaking Airport & Cruise Port Transfers (w/ Kids Car Seats)",
    description: "Skip chaotic taxi lines in Cancún (CUN), Montego Bay (MBJ), Nassau (NAS), Orlando/Port Canaveral (MCO), Paris (CDG), London (LHR), and Prague (PRG). Flat-rate private vans with flight monitoring and pre-installed child booster/car seats.",
    insiderWhy: "Patrick's #1 family transfer pick—used personally for his family's Europe & Caribbean trips. Book directly on our dedicated Fora partner portal.",
    priceLabel: "From $42 / private vehicle",
    ctaText: "Book Private Transfer →",
    url: AFFILIATE_CONFIG.welcomePickupsLiveUrl
  },
  {
    id: "viator-nassau-aquaventure",
    category: "excursions",
    partnerBadge: "VIATOR TAP • SHORE EXCURSIONS",
    isLiveLink: false,
    title: "Nassau Port Day: Private Catamaran Snorkel, Pearl Island & Beach Escape",
    description: "Sailing on Disney Wish, Disney Fantasy, or Royal Caribbean into Nassau? Book vetted small-group catamaran reef snorkeling, swimming pigs, or Pearl Island beach cabanas with a back-to-ship guarantee.",
    insiderWhy: "Saves 25–35% compared to big-bus ship excursions and caps group sizes so families aren't herded in lines of 80 people.",
    priceLabel: "Free cancellation up to 24h prior",
    ctaText: "Browse Vetted Nassau Tours →",
    url: `https://www.viator.com/Nassau/d420-ttd`
  },
  {
    id: "viator-turks-caicos-catamaran",
    category: "excursions",
    partnerBadge: "VIATOR TAP • GRACE BAY",
    isLiveLink: false,
    title: "Turks & Caicos: Half-Day Iguana Island, Conch Dive & Barrier Reef Cruise",
    description: "Departing right from Grace Bay beach (steps from Beaches Turks & Caicos): slide off a double-decker catamaran into turquoise reef water, visit Little Water Cay (Iguana Island), and enjoy fresh conch salad.",
    insiderWhy: "The single best off-property half-day splurge for families staying at Beaches Turks & Caicos.",
    priceLabel: "Half-Day Morning or Afternoon",
    ctaText: "Check Grace Bay Sailings →",
    url: `https://www.viator.com/Providenciales/d969-ttd`
  },
  {
    id: "gyg-riviera-maya-cenotes",
    category: "excursions",
    partnerBadge: "GETYOURGUIDE • RIVIERA MAYA",
    isLiveLink: false,
    title: "Playa del Carmen & Cancún: Private Family Cenote & Akumal Sea Turtle Swim",
    description: "Staying at Paradisus Playa del Carmen, Moon Palace, or Grand Velas? Take a private van with your own archaeologist guide to swim with wild sea turtles in Akumal and explore crystal-clear underground cenotes before tour buses arrive.",
    insiderWhy: "With a family of 4–6, a private tour costs almost the same as per-person bus tickets and lets you return to the resort pool by 1:30 PM.",
    priceLabel: "Instant mobile voucher",
    ctaText: "Explore Riviera Maya Private Tours →",
    url: `https://www.getyourguide.com/playa-del-carmen-l308/`
  },
  {
    id: "resortpass-bahamar-atlantis",
    category: "daypasses",
    partnerBadge: "CJ AFFILIATE • RESORTPASS",
    isLiveLink: false,
    title: "Cruise Port Resort Day Passes: Baha Bay at Baha Mar, Atlantis & Caribbean Pools",
    description: "In port for 8 hours on a cruise? Grab verified day passes to Grand Hyatt Baha Mar's 15-acre Baha Bay beachfront waterpark, British Colonial Nassau, Hilton Rose Hall Jamaica, or Cozumel beach clubs.",
    insiderWhy: "Often 40% cheaper than booking the exact same resort day pass through the cruise line shore-excursion desk.",
    priceLabel: "Day Passes & Private Cabanas",
    ctaText: "Check Port Day Pass Availability →",
    url: `https://www.resortpass.com/?utm_source=cj&utm_medium=affiliate&PID=${AFFILIATE_CONFIG.cjAffiliatePublisherId}`
  },
  {
    id: "merlin-theme-parks-europe",
    category: "parks",
    partnerBadge: "MERLIN / VIATOR • FAST-TRACK TICKETS",
    isLiveLink: false,
    title: "Universal Orlando, LEGOLAND, London Eye & Paris Eiffel Tower + Seine Cruise",
    description: "Skip-the-line timed entry for the London Eye, Seine River + Eiffel Tower guided access (mobility-friendly options available), LEGOLAND Florida/California, and multi-day Universal Orlando park-to-park tickets.",
    insiderWhy: "Curated from family-tested picks for Orlando and beyond.",
    priceLabel: "Verified Mobile Entry Tickets",
    ctaText: "View Fast-Track Park & City Tickets →",
    url: `https://www.viator.com/Orlando/d663-ttd`
  },
  {
    id: "gear-cruise-cabin-kit",
    category: "gear",
    partnerBadge: "AMAZON ASSOCIATES • CRUISE KIT",
    isLiveLink: false,
    title: "Disney Cruise Line & Concierge Stateroom Essentials Kit (Non-Surge + Magnetic Hooks)",
    description: "Cruise ship cabin walls and doors are heavy-gauge steel, and surge-protected power strips are confiscated at port security. Our checklist includes 100lb neodymium magnetic hooks, DCL-approved non-surge USB-C charging blocks, and over-door shoe organizers.",
    insiderWhy: "Keeps a family of 4's lanyards, wet swimsuits, and 8+ devices organized without cluttering the stateroom desk.",
    priceLabel: "$14 – $29 Prime Essentials",
    ctaText: "Shop Cruise Stateroom Checklist →",
    url: `https://www.amazon.com/s?k=cruise+approved+power+strip+magnetic+hooks&tag=${AFFILIATE_CONFIG.amazonAssociateTag}`
  },
  {
    id: "gear-waterpark-airtag-sunscreen",
    category: "gear",
    partnerBadge: "AMAZON ASSOCIATES • RESORT & PARK KIT",
    isLiveLink: false,
    title: "Waterpark & All-Inclusive Family Safety Kit (Waterproof AirTag Bands + Reef Sunscreen)",
    description: "Waterproof silicone AirTag wristbands for kids at Pirates Island / Aquaventure / Volcano Bay, biodegradable mineral SPF 50 sunscreen (required by law in Mexico cenotes & USVI), and clip-on rechargeable stroller fans.",
    insiderWhy: "Buying reef-safe sunscreen or stroller fans at the resort gift shop costs $28–$35 each; pack them before heading to IAD/DCA/BWI.",
    priceLabel: "$12 – $34 Family Pack",
    ctaText: "Shop Family Resort & Park Kit →",
    url: `https://www.amazon.com/s?k=waterproof+airtag+wristband+kids+reef+safe+sunscreen&tag=${AFFILIATE_CONFIG.amazonAssociateTag}`
  },
  {
    id: "insurance-faye-travelguard",
    category: "insurance",
    partnerBadge: "TRAVEL PROTECTION • CFAR & CRUISE",
    isLiveLink: false,
    title: "Whole-Trip Family Travel Protection & Medical Evacuation (Faye / Travel Guard)",
    description: "Cover your entire trip—including non-refundable flights, pre-cruise hotels, and hurricane-season delays—under one primary policy with 24/7 app-based claims and optional Cancel-For-Any-Reason (CFAR).",
    insiderWhy: "Cruise-line protection plans only cover the cruise fare itself (not your independent flights or pre-cruise hotel nights).",
    priceLabel: "60-Second Instant Quote",
    ctaText: "Request Protection Comparison →",
    url: "#perks-checker"
  }
];

// Utility: Show Toast Message
function showToast(message) {
  const toast = document.getElementById("site-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4800);
}

// Helper: POST JSON to backend API with graceful localStorage backup
async function postJsonWithFallback(endpoint, payload, storageKey) {
  try {
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    existing.push({ ...payload, savedAt: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(existing));
  } catch (e) {
    // ignore storage quota errors
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: endpoint === "/api/subscribe" ? "New newsletter subscriber" : "New trip quote request",
        _template: "table",
        _captcha: "false",
        form_type: endpoint === "/api/subscribe" ? "newsletter" : "quote",
        ...payload
      })
    });
    if (res.ok) {
      await res.json().catch(() => ({}));
    }
  } catch (err) {
    // Fallback when running on static-only preview
  }

  return {
    ok: true,
    message:
      endpoint === "/api/subscribe"
        ? `Welcome aboard, ${payload.firstName || "Traveler"}! You're subscribed to The Potomac Family Travel & 7-7-7 Weekly Brief.`
        : `Request received! Patrick (Fora Certified Advisor) will review your dates and send your VIP perks & rate audit within 24 hours.`
  };
}

// Engine 1A: Switch Tabs between "Perks & Price-Drop Checker" and "Custom Trip Quote Builder"
function initEngineTabs() {
  const tabBtns = document.querySelectorAll(".engine-tab-btn");
  const panels = document.querySelectorAll(".engine-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      tabBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
}

// Engine 1A Mode 1: Live VIP Perks & Price-Drop Calculator
function updateCalculator() {
  const brandSelect = document.getElementById("calc-brand");
  const costRange = document.getElementById("calc-cost");
  const nightsSelect = document.getElementById("calc-nights");
  const statusSelect = document.getElementById("calc-status");
  const detailsInput = document.getElementById("calc-details");

  if (!brandSelect || !costRange || !nightsSelect || !statusSelect) return;

  const brandKey = brandSelect.value;
  const cost = parseInt(costRange.value, 10) || 12000;
  const nights = parseInt(nightsSelect.value, 10) || 6;
  const statusKey = statusSelect.value;
  const details = detailsInput ? detailsInput.value.trim() : "";

  const costBadge = document.getElementById("calc-cost-display");
  if (costBadge) {
    costBadge.textContent = `$${cost.toLocaleString()}`;
  }

  const model = BRAND_MODELS[brandKey] || BRAND_MODELS["beaches-tc"];
  const promoSavings = Math.round(cost * model.promoRatePct);
  const perksValue = model.flatPerksValue + model.perDayPerksValue * nights;
  const totalEstimatedValue = promoSavings + perksValue;

  const statusBadge = document.getElementById("receipt-status-badge");
  if (statusBadge) {
    if (statusKey === "paid-in-full") {
      statusBadge.textContent = "Manual Rate Audit Needed";
      statusBadge.classList.add("warning");
    } else {
      statusBadge.textContent = "Eligible for Perks / Reprice";
      statusBadge.classList.remove("warning");
    }
  }

  const totalEl = document.getElementById("receipt-total-value");
  if (totalEl) {
    totalEl.textContent = `+$${totalEstimatedValue.toLocaleString()}`;
  }

  const listEl = document.getElementById("receipt-line-items");
  if (listEl) {
    const items = model.lineItems(cost, nights);
    listEl.innerHTML = items
      .map(
        (item) => `
        <li>
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </li>
      `
      )
      .join("");
  }

  const ruleEl = document.getElementById("receipt-takeover-rule");
  if (ruleEl) {
    ruleEl.textContent = model.takeoverRules[statusKey] || model.takeoverRules["not-booked"];
  }

  const summaryLines = [
    `Potomac Family & Luxury Travel — VIP Perks & Price-Drop Audit`,
    `• Resort / Cruise Brand: ${model.name}`,
    `• Estimated / Booked Rate: $${cost.toLocaleString()} (${nights} nights)`,
    `• Current Booking Status: ${statusSelect.options[statusSelect.selectedIndex].text}`,
    `• Dates / Room Category / Confirmation #: ${details || "Flexible / Will share details"}`,
    `• Calculator Estimated Value: +$${totalEstimatedValue.toLocaleString()} in perks/savings`
  ];

  window.__currentCalcPayload = {
    type: "perks-audit",
    brandKey,
    brandName: model.name,
    estimatedCost: cost,
    nights,
    bookingStatus: statusSelect.options[statusSelect.selectedIndex].text,
    details: details || "Flexible / Not specified",
    estimatedPerksValue: totalEstimatedValue
  };
  window.__currentCalcSummary = summaryLines.join("\n");
}

function initCalculatorEvents() {
  const inputs = ["calc-brand", "calc-cost", "calc-nights", "calc-status", "calc-details"];
  inputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateCalculator);
      el.addEventListener("change", updateCalculator);
    }
  });

  const auditForm = document.getElementById("receipt-audit-form");
  const confirmBanner = document.getElementById("receipt-confirm-banner");

  if (auditForm) {
    auditForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      updateCalculator();
      const name = (document.getElementById("audit-name")?.value || "").trim() || "Family Traveler";
      const email = (document.getElementById("audit-email")?.value || "").trim();
      if (!email) return;

      const payload = {
        ...(window.__currentCalcPayload || {}),
        name,
        email,
        subscribeNewsletter: true
      };

      const result = await postJsonWithFallback("/api/lead", payload, "potomac_leads");
      if (confirmBanner) {
        confirmBanner.textContent = result.message;
        confirmBanner.classList.add("active");
      }
      showToast("VIP Perks & Rate Audit submitted! Check the confirmation box below.");
    });
  }

  const copyBtn = document.getElementById("receipt-copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const text = window.__currentCalcSummary || "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast("Copied your Perks & Reprice breakdown to clipboard!");
        });
      } else {
        showToast("Summary ready!");
      }
    });
  }

  updateCalculator();
}

// Engine 1A Mode 2: Custom Trip Quote Builder
function initQuoteBuilder() {
  const form = document.getElementById("custom-quote-form");
  const copyQuoteBtn = document.getElementById("copy-custom-quote-btn");
  const confirmBanner = document.getElementById("quote-confirm-banner");
  const hubSelect = document.getElementById("quote-hub");
  const hubTip = document.getElementById("hub-insider-tip");

  const HUB_TIPS = {
    "iad": "✈️ IAD Insider Note: United runs seasonal Saturday/Sunday nonstops from Dulles (IAD) to Providenciales (PLS), Nassau (NAS), Cancún (CUN), Montego Bay (MBJ), and Aruba (AUA)—saving families a full connection day.",
    "dca": "✈️ DCA Insider Note: American & JetBlue offer convenient morning hops from Reagan National (DCA) to Orlando (MCO), Nassau (NAS), and San Juan (SJU)—ideal for Disney Cruise + Universal split stays.",
    "bwi": "✈️ BWI Insider Note: Southwest's BWI hub offers nonstop flights to Cancún (CUN), Montego Bay (MBJ), Punta Cana (PUJ), Aruba (AUA), and Orlando (MCO) with family boarding.",
    "other": "✈️ Multi-City / Other Gateway: Flying relatives in from different cities? We coordinate staggered flight arrivals with private Welcome Pickups transfers so everyone meets seamlessly at the resort."
  };

  if (hubSelect && hubTip) {
    hubSelect.addEventListener("change", () => {
      hubTip.textContent = HUB_TIPS[hubSelect.value] || HUB_TIPS["iad"];
    });
  }

  function buildQuotePayload() {
    const name = (document.getElementById("quote-name")?.value || "").trim() || "Family Traveler";
    const email = (document.getElementById("quote-email")?.value || "").trim();
    const tripType = document.getElementById("quote-type")?.value || "Caribbean / Mexico All-Inclusive";
    const roomSetup = document.getElementById("quote-rooms")?.value || "Guaranteed Connecting Rooms or 2BR Suite";
    const hub = document.getElementById("quote-hub")?.options[document.getElementById("quote-hub").selectedIndex]?.text || "Washington DC Metro (IAD/DCA/BWI)";
    const dates = (document.getElementById("quote-dates")?.value || "").trim() || "Flexible 2026/2027";
    const travelers = (document.getElementById("quote-travelers")?.value || "").trim() || "2 Adults, 2 Kids";
    const budget = document.getElementById("quote-budget")?.value || "$8,000 – $14,000";
    const notes = (document.getElementById("quote-notes")?.value || "").trim();

    const summaryText = [
      `Potomac Family & Luxury Travel — Custom Trip Quote Brief`,
      `• Name: ${name}`,
      email ? `• Email: ${email}` : null,
      `• Trip Style: ${tripType}`,
      `• Room Configuration: ${roomSetup}`,
      `• Travelers & Kids' Ages: ${travelers}`,
      `• Target Dates / School Break: ${dates}`,
      `• Departure Hub: ${hub}`,
      `• Target Budget Range: ${budget}`,
      notes ? `• Specific Resorts / Questions: ${notes}` : null
    ]
      .filter(Boolean)
      .join("\n");

    return {
      payload: {
        type: "custom-quote",
        name,
        email,
        tripType,
        roomSetup,
        hub,
        dates,
        travelers,
        budget,
        notes,
        subscribeNewsletter: true
      },
      summaryText
    };
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const { payload } = buildQuotePayload();
      const result = await postJsonWithFallback("/api/lead", payload, "potomac_leads");
      if (confirmBanner) {
        confirmBanner.textContent = result.message;
        confirmBanner.classList.add("active");
      }
      showToast("Custom trip quote request received! Patrick will reply within 24 hours.");
    });
  }

  if (copyQuoteBtn) {
    copyQuoteBtn.addEventListener("click", () => {
      const { summaryText } = buildQuotePayload();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summaryText).then(() => {
          showToast("Custom trip brief copied to clipboard!");
        });
      }
    });
  }
}

// Weekly Newsletter Signup Handler (Main Section + Footer Form)
function initNewsletterForms() {
  const mainForm = document.getElementById("newsletter-signup-form");
  const mainConfirm = document.getElementById("newsletter-confirm-banner");

  if (mainForm) {
    mainForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const firstName = (document.getElementById("nl-first-name")?.value || "").trim() || "Traveler";
      const email = (document.getElementById("nl-email")?.value || "").trim();
      if (!email) return;

      const checkedBoxes = mainForm.querySelectorAll('input[name="nl_interest"]:checked');
      const interests = Array.from(checkedBoxes).map((cb) => cb.value);

      const res = await postJsonWithFallback(
        "/api/subscribe",
        {
          firstName,
          email,
          interests: interests.length ? interests : ["All Weekly 7-7-7 & Family VIP Deals"],
          source: "main-newsletter-section"
        },
        "potomac_subscribers"
      );

      if (mainConfirm) {
        mainConfirm.innerHTML = `<strong>✓ ${res.message}</strong><br/>Watch your inbox every Thursday morning—and <a href="./newsletter/issue-1-oct-23-2026.html" style="color:#FDE68A;text-decoration:underline;font-weight:700;">read Issue #1 (Oct 23, 2026) right now &rarr;</a>`;
        mainConfirm.classList.add("active");
      }
      showToast(`Subscribed! Welcome to The Potomac Family Travel & 7-7-7 Weekly Brief.`);
      mainForm.reset();
    });
  }

  const footerForm = document.getElementById("footer-newsletter-form");
  const footerConfirm = document.getElementById("footer-nl-confirm");
  if (footerForm) {
    footerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = (document.getElementById("footer-nl-email")?.value || "").trim();
      if (!email) return;

      const res = await postJsonWithFallback(
        "/api/subscribe",
        {
          firstName: "Traveler",
          email,
          interests: ["Beaches & Sandals 7-7-7", "Disney Cruise & Universal", "Cancun / Riviera Maya All-Inclusives", "DC / IAD Nonstop Deals"],
          source: "footer-quick-signup"
        },
        "potomac_subscribers"
      );

      if (footerConfirm) {
        footerConfirm.textContent = res.message;
        footerConfirm.classList.add("active");
      }
      showToast("Subscribed to the Thursday 7-7-7 & Family Travel Brief!");
      footerForm.reset();
    });
  }
}

// Engine 1B: Render & Filter Live Advisor-Only Deals
let loadedDeals = [...FALLBACK_DEALS];

function renderDeals(filterCategory = "all") {
  const grid = document.getElementById("live-deals-grid");
  if (!grid) return;

  const filtered =
    filterCategory === "all"
      ? loadedDeals
      : loadedDeals.filter((d) => d.category === filterCategory);

  grid.innerHTML = filtered
    .map(
      (deal) => `
      <article class="deal-card" data-category="${deal.category}">
        <div>
          <div class="deal-top-meta">
            <span class="deal-badge">${deal.badge}</span>
            <span class="deal-urgency">${deal.urgency}</span>
          </div>
          <div class="deal-resort">${deal.resort} • ${deal.location}</div>
          <h3 class="deal-headline">${deal.headline}</h3>
          <p class="deal-summary">${deal.summary}</p>

          <div class="deal-suites-box">
            <span class="deal-suites-title">Eligible Suites & Room Categories</span>
            <ul class="deal-suites-list">
              ${deal.eligibleSuites.map((s) => `<li>${s}</li>`).join("")}
            </ul>
          </div>

          <ul class="deal-perks-list">
            ${deal.vipPerks.map((p) => `<li><span>✓</span> <div>${p}</div></li>`).join("")}
          </ul>
        </div>

        <div class="deal-footer">
          <div class="deal-savings-tag">${deal.sampleSavings}</div>
          <button type="button" class="btn btn-navy btn-sm lock-deal-btn" data-deal-id="${deal.id}">
            Check Dates / Lock In →
          </button>
        </div>
      </article>
    `
    )
    .join("");

  grid.querySelectorAll(".lock-deal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dealId = btn.getAttribute("data-deal-id");
      const deal = loadedDeals.find((d) => d.id === dealId);
      if (!deal) return;

      const brandMap = {
        "beaches-777-oct2026": "beaches-tc",
        "paradisus-melia-bravos": "paradisus-melia",
        "moon-palace-festive-sale": "moon-palace",
        "sandals-jamaica-comeback": "sandals",
        "atlantis-bahamar-virtuoso": "atlantis-bahamar",
        "disney-cruise-universal-combo": "disney-cruise"
      };

      const brandSelect = document.getElementById("calc-brand");
      const detailsInput = document.getElementById("calc-details");
      if (brandSelect && brandMap[dealId]) {
        brandSelect.value = brandMap[dealId];
      }
      if (detailsInput) {
        detailsInput.value = `Interested in: ${deal.resort} (${deal.badge})`;
      }

      const tab1Btn = document.querySelector('.engine-tab-btn[data-tab="panel-checker"]');
      if (tab1Btn) tab1Btn.click();
      updateCalculator();

      const engineSection = document.getElementById("perks-checker");
      if (engineSection) {
        engineSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      showToast(`Loaded "${deal.resort}" into the Perks & Price-Drop Checker!`);
    });
  });
}

async function initDealsBoard() {
  renderDeals("all");
  try {
    const res = await fetch("./deals-data.json", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.liveDeals) && data.liveDeals.length > 0) {
        loadedDeals = data.liveDeals;
        renderDeals("all");
      }
      const updatedEl = document.getElementById("deals-last-updated");
      if (updatedEl && data.lastUpdated) {
        updatedEl.textContent = `Synced from Fora Inbox: ${data.lastUpdated}`;
      }
    }
  } catch (err) {
    // Fallback already rendered
  }

  const filterBtns = document.querySelectorAll("#deals-filter-bar .filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderDeals(btn.getAttribute("data-filter") || "all");
    });
  });
}

// Engine 2: Render & Filter Self-Serve Affiliate Directory
function renderAffiliates(filterCat = "all") {
  const grid = document.getElementById("affiliate-directory-grid");
  if (!grid) return;

  const items =
    filterCat === "all"
      ? AFFILIATE_DIRECTORY
      : AFFILIATE_DIRECTORY.filter((item) => item.category === filterCat);

  grid.innerHTML = items
    .map(
      (item) => `
      <article class="affiliate-card" data-category="${item.category}">
        <div>
          <span class="affiliate-partner-tag ${item.isLiveLink ? "live" : ""}">
            ${item.partnerBadge}
          </span>
          <h3 class="affiliate-title">${item.title}</h3>
          <p class="affiliate-desc">${item.description}</p>
          <div class="affiliate-why">
            <strong>Advisor Note:</strong> ${item.insiderWhy}
          </div>
        </div>
        <div class="affiliate-footer">
          <span class="affiliate-price">${item.priceLabel}</span>
          <a href="${item.url}" ${item.url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""} class="btn btn-primary btn-sm">
            ${item.ctaText}
          </a>
        </div>
      </article>
    `
    )
    .join("");
}

function initAffiliateDirectory() {
  renderAffiliates("all");

  const filterBtns = document.querySelectorAll("#affiliate-filter-bar .filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderAffiliates(btn.getAttribute("data-filter") || "all");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initEngineTabs();
  initCalculatorEvents();
  initQuoteBuilder();
  initNewsletterForms();
  initDealsBoard();
  initAffiliateDirectory();
});

// Specialty card CTAs: pre-fill calculator with a resort
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-prefill]");
  if (!btn) return;
  e.preventDefault();
  const sel = document.getElementById("calc-brand");
  if (sel) { sel.value = btn.getAttribute("data-prefill"); sel.dispatchEvent(new Event("change", { bubbles: true })); if (typeof updateCalculator === "function") updateCalculator(); }
  const sec = document.getElementById("perks-checker");
  if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
});
// Support links like /#perks-checker?resort=atlantis or ?resort=atlantis
(function () {
  const m = (location.search + location.hash).match(/resort=([a-z-]+)/);
  if (!m) return;
  window.addEventListener("load", () => { const sel = document.getElementById("calc-brand"); if (sel) { sel.value = m[1]; if (typeof updateCalculator === "function") updateCalculator(); } });
})();
