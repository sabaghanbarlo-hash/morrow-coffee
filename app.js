function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

/* ------------------------------------------------------------------ */
/*  Content / data                                                     */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [{
  id: "home",
  label: "Home"
}, {
  id: "menu",
  label: "Menu"
}, {
  id: "about",
  label: "About"
}, {
  id: "visit",
  label: "Visit"
}];
const MENU_CATEGORIES = [{
  id: "espresso",
  label: "Espresso",
  note: "Pulled on our house blend, roasted in Hackney.",
  items: [{
    name: "Espresso",
    desc: "Single origin, pulled short and bright.",
    price: "£2.80"
  }, {
    name: "Flat White",
    desc: "Double ristretto with silky steamed milk.",
    price: "£3.60"
  }, {
    name: "Cortado",
    desc: "Equal parts espresso and warm milk, Spanish-style.",
    price: "£3.40"
  }]
}, {
  id: "filter",
  label: "Filter",
  note: "Brewed fresh, one cup or one pot at a time.",
  items: [{
    name: "House Filter",
    desc: "Our everyday blend, filtered fresh every thirty minutes.",
    price: "£3.50"
  }, {
    name: "Single Origin",
    desc: "Rotating single origin, brewed to order with a tasting note card.",
    price: "£4.20"
  }]
}, {
  id: "matcha",
  label: "Matcha",
  note: "Ceremonial grade, whisked by hand.",
  items: [{
    name: "Classic Matcha",
    desc: "Whisked to order and lightly sweetened.",
    price: "£4.20"
  }, {
    name: "Iced Matcha",
    desc: "The same, over ice, with oat milk as standard.",
    price: "£4.50"
  }]
}, {
  id: "pastries",
  label: "Pastries",
  note: "Delivered each morning from Rye Bakery, two streets over.",
  items: [{
    name: "Butter Croissant",
    desc: "Laminated dough, baked until deeply golden.",
    price: "£3.20"
  }, {
    name: "Cinnamon Bun",
    desc: "Slow-proved and glazed while still warm.",
    price: "£3.80"
  }, {
    name: "Almond Croissant",
    desc: "Twice-baked and filled with frangipane.",
    price: "£3.90"
  }]
}, {
  id: "seasonal",
  label: "Seasonal",
  note: "Changing with the season — this is what's pouring now.",
  items: [{
    name: "Morrow Latte",
    desc: "Espresso, steamed milk and a subtle seasonal sweetness.",
    price: "£4.80"
  }, {
    name: "Seasonal Cold Brew",
    desc: "Cold brew finished with a rotating seasonal note.",
    price: "£4.50"
  }]
}];
const TESTIMONIALS = [{
  quote: "Beautiful coffee, thoughtful service, and exactly the kind of place you want to spend a slow Saturday morning.",
  name: "Priya N.",
  meta: "Local designer, Shoreditch"
}, {
  quote: "One of the best flat whites I've had in London. The space is just as good as the coffee.",
  name: "Tom H.",
  meta: "Regular since 2023"
}, {
  quote: "Quiet, warm, and beautifully designed. Morrow has quickly become my favourite neighbourhood café.",
  name: "Aisha K.",
  meta: "Product manager"
}];
const GALLERY_IMAGES = [{
  src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  alt: "Barista pouring milk into a coffee cup at the counter",
  span: "tall"
}, {
  src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
  alt: "Close-up of roasted specialty coffee beans",
  span: "normal"
}, {
  src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  alt: "Fresh pastries and croissants laid out on the counter",
  span: "normal"
}, {
  src: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
  alt: "Customers sitting and talking inside the coffee shop",
  span: "wide"
}, {
  src: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=900&q=80",
  alt: "Latte with delicate latte art on a wooden table",
  span: "normal"
}, {
  src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
  alt: "Close-up detail of coffee beans in a roasting scoop",
  span: "tall"
}];
const PROCESS_STEPS = [{
  num: "01",
  title: "Sourced",
  desc: "Carefully selected specialty beans from responsible producers we know by name."
}, {
  num: "02",
  title: "Roasted",
  desc: "Roasted in small batches to highlight the natural character of each coffee."
}, {
  num: "03",
  title: "Brewed",
  desc: "Prepared with precision, patience, and attention to detail, cup by cup."
}];
const ABOUT_DETAILS = ["Small batch", "Seasonal menu", "Independent"];
const PHONE_DISPLAY = "+44 20 0000 0000";
const PHONE_TEL = "+442000000000";
const EMAIL = "hello@morrowncoffee.example";
const ADDRESS_LINE1 = "18 Willow Street";
const ADDRESS_LINE2 = "London, UK";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=18+Willow+Street+London";
const INSTAGRAM_URL = "https://instagram.com/morrowncoffee";
const INSTAGRAM_HANDLE = "@morrowncoffee";
const SITE_URL = "https://sabaghanbarlo-hash.github.io/morrow-coffee/";

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    className: `reveal ${visible ? "is-visible" : ""} ${className}`,
    style: {
      transitionDelay: visible ? `${delay}ms` : "0ms"
    }
  }, rest), children);
}
function Header({
  scrolled,
  mobileOpen,
  onToggleMobile,
  onNavigate,
  onOrderClick
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: `site-header ${scrolled ? "is-scrolled" : ""} ${mobileOpen ? "nav-open" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    className: "logo",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    }
  }, "MORROW"), /*#__PURE__*/React.createElement("nav", {
    className: "primary-nav",
    "aria-label": "Primary"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.id,
    href: `#${link.id}`,
    onClick: e => {
      e.preventDefault();
      onNavigate(link.id);
    }
  }, link.label))), /*#__PURE__*/React.createElement("div", {
    className: "header-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary btn-small",
    onClick: onOrderClick
  }, "Order Coffee"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `hamburger ${mobileOpen ? "is-open" : ""}`,
    "aria-label": mobileOpen ? "Close menu" : "Open menu",
    "aria-expanded": mobileOpen,
    "aria-controls": "mobile-nav",
    onClick: onToggleMobile
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", {
    id: "mobile-nav",
    className: `mobile-nav ${mobileOpen ? "is-open" : ""}`,
    "aria-hidden": !mobileOpen
  }, /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Mobile"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.id,
    href: `#${link.id}`,
    tabIndex: mobileOpen ? 0 : -1,
    onClick: e => {
      e.preventDefault();
      onNavigate(link.id);
    }
  }, link.label))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    tabIndex: mobileOpen ? 0 : -1,
    onClick: () => {
      onToggleMobile();
      onOrderClick();
    }
  }, "Order Coffee")));
}
function Hero({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "home",
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=80",
    alt: "Warm morning light inside Morrow Coffee, with a barista working behind the counter"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-overlay"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-content"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow eyebrow-light"
  }, "Willow Street, London"), /*#__PURE__*/React.createElement("h1", null, "Good coffee.", /*#__PURE__*/React.createElement("br", null), "Slow mornings."), /*#__PURE__*/React.createElement("p", {
    className: "hero-lede"
  }, "Specialty coffee, seasonal food, and slow mornings in the heart of London."), /*#__PURE__*/React.createElement("div", {
    className: "hero-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-light",
    onClick: () => onNavigate("menu")
  }, "View Menu"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost-light",
    onClick: () => onNavigate("visit")
  }, "Visit Us"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "scroll-cue",
    onClick: () => onNavigate("menu"),
    "aria-label": "Scroll to menu"
  }, /*#__PURE__*/React.createElement("span", {
    className: "scroll-cue-line"
  })));
}
function BrandStatement() {
  return /*#__PURE__*/React.createElement("section", {
    className: "brand-statement",
    "aria-labelledby": "brand-statement-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container brand-statement-inner"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    id: "brand-statement-heading"
  }, "Coffee worth slowing down for."), /*#__PURE__*/React.createElement("p", null, "We source carefully, prepare thoughtfully, and let the season decide what's on the board. It's a small, calm room on a quiet London street \u2014 the kind of place built for a coffee you actually sit down with."))));
}
function FeaturedMenu({
  onOrder
}) {
  const [activeId, setActiveId] = useState(MENU_CATEGORIES[0].id);
  const active = MENU_CATEGORIES.find(c => c.id === activeId) ?? MENU_CATEGORIES[0];
  return /*#__PURE__*/React.createElement("section", {
    id: "menu",
    className: "section",
    "aria-labelledby": "menu-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "The Menu"), /*#__PURE__*/React.createElement("h2", {
    id: "menu-heading"
  }, "A short list, done properly")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-tabs",
    role: "tablist",
    "aria-label": "Menu categories"
  }, MENU_CATEGORIES.map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat.id,
    type: "button",
    role: "tab",
    id: `tab-${cat.id}`,
    "aria-selected": cat.id === activeId,
    "aria-controls": `panel-${cat.id}`,
    className: `menu-tab ${cat.id === activeId ? "is-active" : ""}`,
    onClick: () => setActiveId(cat.id)
  }, cat.label)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120,
    className: "menu-panel-wrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "menu-note"
  }, active.note), /*#__PURE__*/React.createElement("div", {
    className: "menu-list",
    role: "tabpanel",
    id: `panel-${active.id}`,
    "aria-labelledby": `tab-${active.id}`
  }, active.items.map(item => /*#__PURE__*/React.createElement("div", {
    className: "menu-row",
    key: item.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-row-text"
  }, /*#__PURE__*/React.createElement("h3", null, item.name), /*#__PURE__*/React.createElement("p", null, item.desc)), /*#__PURE__*/React.createElement("div", {
    className: "menu-row-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-price"
  }, item.price), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "menu-order-link",
    onClick: () => onOrder(item.name)
  }, "Order"))))))));
}
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    className: "section section-alt",
    "aria-labelledby": "about-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container about-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    className: "about-media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    alt: "Interior of Morrow Coffee showing wooden counters and hanging pendant lights"
  })), /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    delay: 120,
    className: "about-text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "About Morrow"), /*#__PURE__*/React.createElement("h2", {
    id: "about-heading"
  }, "Made for slow mornings."), /*#__PURE__*/React.createElement("p", null, "Morrow started with a simple idea: coffee shouldn't be rushed. We work closely with a small roaster to source beans we trust, build the food menu around what's in season, and keep the room quiet enough that you'll actually want to stay for a second cup."), /*#__PURE__*/React.createElement("ul", {
    className: "about-detail-list"
  }, ABOUT_DETAILS.map(d => /*#__PURE__*/React.createElement("li", {
    key: d
  }, d))))));
}
function OurCoffee() {
  return /*#__PURE__*/React.createElement("section", {
    className: "process",
    "aria-labelledby": "process-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Our Coffee"), /*#__PURE__*/React.createElement("h2", {
    id: "process-heading"
  }, "From origin to cup.")), /*#__PURE__*/React.createElement("div", {
    className: "process-grid"
  }, PROCESS_STEPS.map((step, i) => /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    key: step.num,
    delay: i * 100,
    className: "process-step"
  }, /*#__PURE__*/React.createElement("span", {
    className: "process-num"
  }, step.num), /*#__PURE__*/React.createElement("h3", null, step.title), /*#__PURE__*/React.createElement("p", null, step.desc))))));
}
function SignatureDrink({
  onOrder
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "signature",
    "aria-labelledby": "signature-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container signature-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    className: "signature-text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow eyebrow-light"
  }, "The Signature"), /*#__PURE__*/React.createElement("h2", {
    id: "signature-heading"
  }, "The Morrow Latte"), /*#__PURE__*/React.createElement("p", null, "Our signature espresso drink with silky steamed milk and a subtle seasonal sweetness. It's the drink we built the shop around \u2014 the one regulars order without looking at the board."), /*#__PURE__*/React.createElement("div", {
    className: "signature-price-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "signature-price"
  }, "\xA34.80"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-light",
    onClick: () => onOrder("Morrow Latte")
  }, "Discover Morrow Latte"))), /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    delay: 120,
    className: "signature-media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1100&q=80",
    alt: "The Morrow Latte, topped with a dusting of cocoa, served on a wooden table"
  }))));
}
function Gallery() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    "aria-labelledby": "gallery-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "From the Shop"), /*#__PURE__*/React.createElement("h2", {
    id: "gallery-heading"
  }, "Mornings at Morrow")), /*#__PURE__*/React.createElement("div", {
    className: "gallery-grid"
  }, GALLERY_IMAGES.map((img, i) => /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    key: img.src,
    delay: i * 60,
    className: `gallery-item gallery-${img.span}`
  }, /*#__PURE__*/React.createElement("img", {
    src: img.src,
    alt: img.alt,
    loading: "lazy"
  }))))));
}
function Testimonials() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    "aria-labelledby": "testimonials-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Word of Mouth"), /*#__PURE__*/React.createElement("h2", {
    id: "testimonials-heading"
  }, "Good things people say.")), /*#__PURE__*/React.createElement("div", {
    className: "testimonial-grid"
  }, TESTIMONIALS.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    as: "figure",
    key: t.name,
    delay: i * 90,
    className: "testimonial-card"
  }, /*#__PURE__*/React.createElement("blockquote", null, "\u201C", t.quote, "\u201D"), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("span", {
    className: "testimonial-name"
  }, t.name), /*#__PURE__*/React.createElement("span", {
    className: "testimonial-meta"
  }, t.meta)))))));
}
function InstagramSection() {
  const images = GALLERY_IMAGES.slice(0, 4);
  return /*#__PURE__*/React.createElement("section", {
    className: "social",
    "aria-labelledby": "social-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "social-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Follow Along"), /*#__PURE__*/React.createElement("h2", {
    id: "social-heading"
  }, INSTAGRAM_HANDLE)), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-secondary",
    href: INSTAGRAM_URL,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Follow on Instagram")), /*#__PURE__*/React.createElement("div", {
    className: "social-grid"
  }, images.map((img, i) => /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    key: img.src,
    delay: i * 60,
    className: "social-item"
  }, /*#__PURE__*/React.createElement("img", {
    src: img.src,
    alt: img.alt,
    loading: "lazy"
  }))))));
}
function ShopMap() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "shop-map",
    viewBox: "0 0 400 320",
    role: "img",
    "aria-label": "Simplified map showing Morrow Coffee on Willow Street, London"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "320",
    fill: "var(--cream-deep)"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#c9bfa8",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "70",
    x2: "400",
    y2: "70"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "210",
    x2: "400",
    y2: "210"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "120",
    y1: "0",
    x2: "120",
    y2: "320"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "280",
    y1: "0",
    x2: "280",
    y2: "320"
  })), /*#__PURE__*/React.createElement("g", {
    stroke: "#b3a688",
    strokeWidth: "1",
    strokeDasharray: "3 5"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "140",
    x2: "400",
    y2: "140"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "200",
    y1: "0",
    x2: "200",
    y2: "320"
  })), /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "62",
    className: "map-label"
  }, "Old Street"), /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "202",
    className: "map-label"
  }, "Rivington Rd"), /*#__PURE__*/React.createElement("text", {
    x: "128",
    y: "18",
    className: "map-label"
  }, "Willow Street"), /*#__PURE__*/React.createElement("circle", {
    cx: "200",
    cy: "140",
    r: "7",
    fill: "var(--espresso)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M200 105 C 214 105 225 116 225 130 C 225 149 200 172 200 172 C 200 172 175 149 175 130 C 175 116 186 105 200 105 Z",
    fill: "var(--espresso)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "200",
    cy: "129",
    r: "6.5",
    fill: "var(--cream)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "200",
    y: "196",
    textAnchor: "middle",
    className: "map-pin-label"
  }, "Morrow Coffee"));
}
function Visit() {
  return /*#__PURE__*/React.createElement("section", {
    id: "visit",
    className: "section",
    "aria-labelledby": "visit-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container visit-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    as: "div"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Visit Us"), /*#__PURE__*/React.createElement("h2", {
    id: "visit-heading"
  }, "Come by."), /*#__PURE__*/React.createElement("div", {
    className: "visit-block"
  }, /*#__PURE__*/React.createElement("h3", null, "Address"), /*#__PURE__*/React.createElement("p", null, "Morrow Coffee", /*#__PURE__*/React.createElement("br", null), ADDRESS_LINE1, /*#__PURE__*/React.createElement("br", null), ADDRESS_LINE2)), /*#__PURE__*/React.createElement("div", {
    className: "visit-block"
  }, /*#__PURE__*/React.createElement("h3", null, "Opening Hours"), /*#__PURE__*/React.createElement("dl", {
    className: "hours-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hours-row"
  }, /*#__PURE__*/React.createElement("dt", null, "Monday \u2013 Friday"), /*#__PURE__*/React.createElement("dd", null, "7:30 AM \u2013 5:00 PM")), /*#__PURE__*/React.createElement("div", {
    className: "hours-row"
  }, /*#__PURE__*/React.createElement("dt", null, "Saturday \u2013 Sunday"), /*#__PURE__*/React.createElement("dd", null, "8:00 AM \u2013 6:00 PM")))), /*#__PURE__*/React.createElement("div", {
    className: "visit-block"
  }, /*#__PURE__*/React.createElement("h3", null, "Contact"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    className: "text-link",
    href: `tel:${PHONE_TEL}`
  }, PHONE_DISPLAY), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    className: "text-link",
    href: `mailto:${EMAIL}`
  }, EMAIL))), /*#__PURE__*/React.createElement("div", {
    className: "visit-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary",
    href: MAPS_URL,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Get Directions"), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-secondary",
    href: "#contact"
  }, "Contact Us"))), /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    delay: 120,
    className: "map-wrap"
  }, /*#__PURE__*/React.createElement(ShopMap, null))));
}
function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = field => e => {
    setValues(v => ({
      ...v,
      [field]: e.target.value
    }));
  };
  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!emailPattern.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Please add a short message.";
    return next;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  };
  if (submitted) {
    return /*#__PURE__*/React.createElement("section", {
      id: "contact",
      className: "section section-alt",
      "aria-labelledby": "contact-heading"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container contact-narrow"
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
      className: "eyebrow"
    }, "Get in touch"), /*#__PURE__*/React.createElement("h2", {
      id: "contact-heading"
    }, "Thank you."), /*#__PURE__*/React.createElement("p", {
      role: "status",
      className: "form-success"
    }, "Your message has been received in this demo. In a live version of this site, we'd reply from ", EMAIL, "."), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      onClick: () => {
        setValues({
          name: "",
          email: "",
          message: ""
        });
        setErrors({});
        setSubmitted(false);
      }
    }, "Send another message"))));
  }
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "section section-alt",
    "aria-labelledby": "contact-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container contact-narrow"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Get in touch"), /*#__PURE__*/React.createElement("h2", {
    id: "contact-heading"
  }, "Get in touch"), /*#__PURE__*/React.createElement("p", {
    className: "contact-lede"
  }, "Questions, feedback, or a private booking enquiry \u2014 send us a note and we'll get back to you.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100,
    as: "form",
    className: "contact-form",
    onSubmit: handleSubmit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "contact-name"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    id: "contact-name",
    type: "text",
    value: values.name,
    onChange: handleChange("name"),
    "aria-invalid": Boolean(errors.name),
    "aria-describedby": errors.name ? "contact-name-error" : undefined
  }), errors.name && /*#__PURE__*/React.createElement("span", {
    id: "contact-name-error",
    className: "form-error"
  }, errors.name)), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "contact-email"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    id: "contact-email",
    type: "email",
    value: values.email,
    onChange: handleChange("email"),
    "aria-invalid": Boolean(errors.email),
    "aria-describedby": errors.email ? "contact-email-error" : undefined
  }), errors.email && /*#__PURE__*/React.createElement("span", {
    id: "contact-email-error",
    className: "form-error"
  }, errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "contact-message"
  }, "Message"), /*#__PURE__*/React.createElement("textarea", {
    id: "contact-message",
    rows: 4,
    value: values.message,
    onChange: handleChange("message"),
    "aria-invalid": Boolean(errors.message),
    "aria-describedby": errors.message ? "contact-message-error" : undefined
  }), errors.message && /*#__PURE__*/React.createElement("span", {
    id: "contact-message-error",
    className: "form-error"
  }, errors.message)), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Send Message"))));
}
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = e => {
    e.preventDefault();
    if (!email.trim() || !emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };
  if (subscribed) {
    return /*#__PURE__*/React.createElement("p", {
      className: "newsletter-success",
      role: "status"
    }, "You're on the list \u2014 thanks for the demo signup.");
  }
  return /*#__PURE__*/React.createElement("form", {
    className: "newsletter-form",
    onSubmit: handleSubmit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "newsletter-email",
    className: "sr-only"
  }, "Email address"), /*#__PURE__*/React.createElement("div", {
    className: "newsletter-row"
  }, /*#__PURE__*/React.createElement("input", {
    id: "newsletter-email",
    type: "email",
    placeholder: "you@example.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? "newsletter-error" : undefined
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-secondary btn-small"
  }, "Subscribe")), error && /*#__PURE__*/React.createElement("span", {
    id: "newsletter-error",
    className: "form-error"
  }, error));
}
function Footer({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand"
  }, /*#__PURE__*/React.createElement("p", {
    className: "logo logo-footer"
  }, "MORROW"), /*#__PURE__*/React.createElement("p", {
    className: "footer-tagline"
  }, "Good coffee. Slow mornings."), /*#__PURE__*/React.createElement("p", null, ADDRESS_LINE1, /*#__PURE__*/React.createElement("br", null), ADDRESS_LINE2), /*#__PURE__*/React.createElement("p", null, "Mon\u2013Fri \xB7 7:30\u201317:00", /*#__PURE__*/React.createElement("br", null), "Sat\u2013Sun \xB7 8:00\u201318:00")), /*#__PURE__*/React.createElement("div", {
    className: "footer-nav"
  }, /*#__PURE__*/React.createElement("h3", null, "Explore"), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Footer"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.id,
    href: `#${link.id}`,
    onClick: e => {
      e.preventDefault();
      onNavigate(link.id);
    }
  }, link.label)))), /*#__PURE__*/React.createElement("div", {
    className: "footer-contact"
  }, /*#__PURE__*/React.createElement("h3", null, "Contact"), /*#__PURE__*/React.createElement("a", {
    className: "text-link text-link-light",
    href: `tel:${PHONE_TEL}`
  }, PHONE_DISPLAY), /*#__PURE__*/React.createElement("a", {
    className: "text-link text-link-light",
    href: `mailto:${EMAIL}`
  }, EMAIL), /*#__PURE__*/React.createElement("a", {
    className: "text-link text-link-light",
    href: INSTAGRAM_URL,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Instagram \u2197")), /*#__PURE__*/React.createElement("div", {
    className: "footer-newsletter"
  }, /*#__PURE__*/React.createElement("h3", null, "Occasional notes from Morrow"), /*#__PURE__*/React.createElement(NewsletterForm, null))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container footer-bottom-inner"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 2026 Morrow Coffee. All rights reserved."), /*#__PURE__*/React.createElement("p", {
    className: "footer-demo-note"
  }, "Demo project \u2014 Morrow Coffee is a fictional brand built for portfolio purposes."))));
}
function OrderModal({
  itemName,
  onClose
}) {
  const closeBtnRef = useRef(null);
  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = e => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onMouseDown: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "order-modal-heading",
    onMouseDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "modal-close",
    onClick: onClose,
    "aria-label": "Close dialog",
    ref: closeBtnRef
  }, "\xD7"), /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Order Ahead"), /*#__PURE__*/React.createElement("h3", {
    id: "order-modal-heading"
  }, itemName ? `You'd like the ${itemName}?` : "Ready to order?"), /*#__PURE__*/React.createElement("p", null, "We keep ordering simple \u2014 no app required. Call the shop and we'll have your order ready when you arrive, or walk in any time we're open."), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary",
    href: `tel:${PHONE_TEL}`
  }, "Call ", PHONE_DISPLAY), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-secondary",
    href: MAPS_URL,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Get Directions")), /*#__PURE__*/React.createElement("p", {
    className: "modal-footnote"
  }, ADDRESS_LINE1, ", ", ADDRESS_LINE2)));
}
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orderItem, setOrderItem] = useState(null);
  const [orderOpen, setOrderOpen] = useState(false);
  useEffect(() => {
    document.title = "Morrow Coffee | Specialty Coffee in London";
    const description = "Morrow Coffee is a modern specialty coffee shop in London serving carefully sourced coffee, seasonal drinks, and simple food in a warm neighborhood setting.";
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", description);
    setMeta("property", "og:title", "Morrow Coffee | Specialty Coffee in London");
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", SITE_URL);
    setMeta("property", "og:image", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", "Morrow Coffee | Specialty Coffee in London");
    setMeta("name", "twitter:description", description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", SITE_URL);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navigate = useCallback(id => {
    const el = document.getElementById(id);
    setMobileOpen(false);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start"
      });
    }
  }, []);
  const openOrder = useCallback(name => {
    setOrderItem(name ?? null);
    setOrderOpen(true);
  }, []);
  const closeOrder = useCallback(() => {
    setOrderOpen(false);
    setOrderItem(null);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "morrow-app"
  }, /*#__PURE__*/React.createElement(GlobalStyles, null), /*#__PURE__*/React.createElement("a", {
    href: "#main",
    className: "skip-link"
  }, "Skip to content"), /*#__PURE__*/React.createElement(Header, {
    scrolled: scrolled,
    mobileOpen: mobileOpen,
    onToggleMobile: () => setMobileOpen(v => !v),
    onNavigate: navigate,
    onOrderClick: () => openOrder(null)
  }), /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement(Hero, {
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement(BrandStatement, null), /*#__PURE__*/React.createElement(FeaturedMenu, {
    onOrder: openOrder
  }), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(OurCoffee, null), /*#__PURE__*/React.createElement(SignatureDrink, {
    onOrder: openOrder
  }), /*#__PURE__*/React.createElement(Gallery, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(InstagramSection, null), /*#__PURE__*/React.createElement(Visit, null), /*#__PURE__*/React.createElement(ContactForm, null)), /*#__PURE__*/React.createElement(Footer, {
    onNavigate: navigate
  }), orderOpen && /*#__PURE__*/React.createElement(OrderModal, {
    itemName: orderItem,
    onClose: closeOrder
  }));
}
function GlobalStyles() {
  return /*#__PURE__*/React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Public+Sans:wght@400;500;600;700&display=swap');

      :root {
        --cream: #f6f1e6;
        --cream-deep: #ece2cd;
        --espresso: #3a2a1e;
        --charcoal: #211d19;
        --sage: #75816a;
        --sage-dark: #565f4d;
        --line: rgba(58, 42, 30, 0.14);
        --line-light: rgba(246, 241, 230, 0.28);
        --error: #a3402f;
        --font-display: 'Fraunces', Georgia, serif;
        --font-sans: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        --header-h: 84px;
      }

      .morrow-app * { box-sizing: border-box; }
      .morrow-app {
        font-family: var(--font-sans);
        color: var(--espresso);
        background: var(--cream);
        -webkit-font-smoothing: antialiased;
        line-height: 1.65;
        font-size: 16px;
      }
      .morrow-app img { max-width: 100%; display: block; }
      .morrow-app h1, .morrow-app h2, .morrow-app h3 {
        font-family: var(--font-display);
        font-weight: 500;
        line-height: 1.15;
        margin: 0 0 0.5em 0;
        color: var(--espresso);
      }
      .morrow-app p { margin: 0 0 1em 0; color: rgba(58,42,30,0.82); max-width: 62ch; }
      .morrow-app a { color: inherit; text-decoration: none; }
      .morrow-app button { font-family: inherit; }
      .morrow-app label { font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 0.4rem; }

      .sr-only {
        position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
        overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
      }

      .skip-link {
        position: absolute; left: -9999px; top: 0; z-index: 200;
        background: var(--espresso); color: var(--cream); padding: 0.8rem 1.2rem;
      }
      .skip-link:focus { left: 1rem; top: 1rem; }

      .morrow-app :focus-visible {
        outline: 2px solid var(--sage);
        outline-offset: 3px;
      }

      .container {
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 1.75rem;
      }

      .eyebrow {
        font-size: 0.78rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--sage-dark);
        margin: 0 0 0.9rem 0;
      }
      .eyebrow-light { color: rgba(246,241,230,0.85); }

      .section { padding: 6.5rem 0; }
      .section-alt { background: var(--cream-deep); }
      .section h2 { font-size: clamp(2rem, 3.4vw, 2.75rem); max-width: 30ch; }

      #home, #menu, #about, #visit, #contact { scroll-margin-top: var(--header-h); }

      .reveal {
        opacity: 0;
        transform: translateY(22px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      .reveal.is-visible { opacity: 1; transform: translateY(0); }
      @media (prefers-reduced-motion: reduce) {
        .reveal { opacity: 1; transform: none; transition: none; }
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.95rem 1.9rem;
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border: 1px solid transparent;
        cursor: pointer;
        transition: background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease;
        white-space: nowrap;
        min-height: 44px;
      }
      .btn-primary { background: var(--espresso); color: var(--cream); border-color: var(--espresso); }
      .btn-primary:hover { background: var(--charcoal); border-color: var(--charcoal); }
      .btn-secondary { background: transparent; color: var(--espresso); border-color: var(--espresso); }
      .btn-secondary:hover { background: var(--espresso); color: var(--cream); }
      .btn-light { background: var(--cream); color: var(--espresso); border-color: var(--cream); }
      .btn-light:hover { background: transparent; color: var(--cream); border-color: var(--cream); }
      .btn-ghost-light { background: transparent; color: var(--cream); border-color: rgba(246,241,230,0.55); }
      .btn-ghost-light:hover { background: rgba(246,241,230,0.12); border-color: var(--cream); }
      .btn-small { padding: 0.68rem 1.35rem; font-size: 0.72rem; min-height: 40px; }

      .site-header {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100;
        background: transparent;
        transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color .3s ease;
        border-bottom: 1px solid transparent;
      }
      .site-header.is-scrolled, .site-header.nav-open {
        background: rgba(246,241,230,0.97);
        backdrop-filter: blur(8px);
        border-bottom-color: var(--line);
      }
      .header-inner {
        max-width: 1180px; margin: 0 auto; padding: 0 1.75rem;
        height: var(--header-h);
        display: flex; align-items: center; justify-content: space-between;
      }
      .logo {
        font-family: var(--font-display);
        font-size: 1.35rem;
        letter-spacing: 0.16em;
        color: var(--cream);
        transition: color 0.3s ease;
      }
      .is-scrolled .logo, .nav-open .logo { color: var(--espresso); }
      .primary-nav { display: flex; gap: 2.25rem; }
      .primary-nav a {
        font-size: 0.86rem; font-weight: 500; letter-spacing: 0.02em;
        color: var(--cream); position: relative; padding: 0.3rem 0;
        transition: color 0.3s ease;
      }
      .is-scrolled .primary-nav a, .nav-open .primary-nav a { color: var(--espresso); }
      .primary-nav a::after {
        content: ''; position: absolute; left: 0; right: 100%; bottom: -2px; height: 1px;
        background: currentColor; transition: right 0.25s ease;
      }
      .primary-nav a:hover::after { right: 0; }

      .header-actions { display: flex; align-items: center; gap: 1.25rem; }
      .header-actions .btn-primary {
        background: var(--cream); color: var(--espresso); border-color: var(--cream);
      }
      .is-scrolled .header-actions .btn-primary, .nav-open .header-actions .btn-primary {
        background: var(--espresso); color: var(--cream); border-color: var(--espresso);
      }
      .header-actions .btn-primary:hover { opacity: 0.85; }

      .hamburger {
        display: none; flex-direction: column; justify-content: center; gap: 5px;
        width: 44px; height: 44px; background: none; border: none; cursor: pointer; padding: 0;
      }
      .hamburger span {
        display: block; height: 1.5px; width: 22px; margin: 0 auto; background: var(--cream);
        transition: background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
      }
      .is-scrolled .hamburger span, .nav-open .hamburger span { background: var(--espresso); }
      .hamburger.is-open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
      .hamburger.is-open span:nth-child(2) { opacity: 0; }
      .hamburger.is-open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

      .mobile-nav {
        position: fixed; inset: var(--header-h) 0 0 0;
        background: var(--cream);
        display: flex; flex-direction: column; align-items: flex-start;
        justify-content: center; gap: 2rem; padding: 2rem 1.75rem 4rem;
        transform: translateY(-8px);
        opacity: 0; pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 99;
      }
      .mobile-nav.is-open { opacity: 1; pointer-events: auto; transform: translateY(0); }
      .mobile-nav nav { display: flex; flex-direction: column; gap: 1.5rem; }
      .mobile-nav a { font-family: var(--font-display); font-size: 2rem; display: block; padding: 0.25rem 0; }

      .hero {
        position: relative; min-height: 100vh; display: flex; align-items: flex-end;
        overflow: hidden;
      }
      .hero-media { position: absolute; inset: 0; }
      .hero-media img { width: 100%; height: 100%; object-fit: cover; }
      .hero-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(33,29,25,0.35) 0%, rgba(33,29,25,0.32) 45%, rgba(33,29,25,0.84) 100%);
      }
      .hero-content {
        position: relative; z-index: 2; max-width: 1180px; margin: 0 auto; width: 100%;
        padding: 0 1.75rem 6.5rem;
      }
      .hero h1 {
        color: var(--cream);
        font-size: clamp(2.75rem, 7vw, 5.2rem);
        font-weight: 400;
        max-width: 14ch;
      }
      .hero-lede { color: rgba(246,241,230,0.9); max-width: 42ch; font-size: 1.1rem; margin-bottom: 2.2rem; }
      .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

      .scroll-cue {
        position: absolute; right: 2.25rem; bottom: 2.25rem; z-index: 2;
        width: 1px; height: 64px; background: none; border: none; cursor: pointer; padding: 0;
      }
      .scroll-cue-line { display: block; width: 1px; height: 100%; background: rgba(246,241,230,0.55); position: relative; }
      .scroll-cue-line::after {
        content: ''; position: absolute; top: 0; left: -2px; width: 5px; height: 5px;
        border-radius: 50%; background: var(--cream);
        animation: cueMove 2.2s ease-in-out infinite;
      }
      @keyframes cueMove { 0%{top:0; opacity:1;} 90%{opacity:1;} 100%{top:90%; opacity:0;} }
      @media (prefers-reduced-motion: reduce) { .scroll-cue-line::after { animation: none; top: 40%; } }

      /* brand statement */
      .brand-statement { padding: 6rem 0; background: var(--cream); }
      .brand-statement-inner { max-width: 720px; text-align: center; margin: 0 auto; }
      .brand-statement h2 { font-size: clamp(1.9rem, 3.2vw, 2.5rem); }
      .brand-statement p { margin: 0 auto; font-size: 1.05rem; }

      .menu-tabs {
        display: flex; flex-wrap: wrap; gap: 0.5rem 2rem;
        border-bottom: 1px solid var(--line);
        margin: 2.5rem 0 0;
      }
      .menu-tab {
        background: none; border: none; cursor: pointer;
        padding: 0.9rem 0; font-size: 0.85rem; font-weight: 600;
        letter-spacing: 0.03em; color: rgba(58,42,30,0.55);
        border-bottom: 2px solid transparent; margin-bottom: -1px;
        transition: color 0.2s ease, border-color 0.2s ease;
        min-height: 44px;
      }
      .menu-tab:hover { color: var(--espresso); }
      .menu-tab.is-active { color: var(--espresso); border-bottom-color: var(--sage); }

      .menu-panel-wrap { padding-top: 2.25rem; }
      .menu-note { font-style: italic; color: rgba(58,42,30,0.55); font-size: 0.92rem; margin-bottom: 1.75rem; }
      .menu-list { display: flex; flex-direction: column; }
      .menu-row {
        display: flex; justify-content: space-between; align-items: flex-start;
        gap: 2rem; padding: 1.65rem 0; border-top: 1px solid var(--line);
      }
      .menu-row:last-child { border-bottom: 1px solid var(--line); }
      .menu-row-text h3 { font-size: 1.2rem; margin-bottom: 0.25rem; }
      .menu-row-text p { margin: 0; font-size: 0.95rem; max-width: 46ch; }
      .menu-row-right { display: flex; align-items: center; gap: 1.1rem; flex-shrink: 0; padding-top: 0.15rem; }
      .menu-price { font-family: var(--font-display); font-size: 1.15rem; font-variant-numeric: tabular-nums; }
      .menu-order-link {
        background: none; border: 1px solid var(--line); cursor: pointer;
        font-size: 0.72rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
        padding: 0.45rem 0.85rem; color: var(--sage-dark); min-height: 36px;
        transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
      }
      .menu-order-link:hover { background: var(--espresso); border-color: var(--espresso); color: var(--cream); }

      .about-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 4.5rem; align-items: center; }
      .about-media img { width: 100%; height: 100%; object-fit: cover; aspect-ratio: 4/5; }
      .about-text p:last-of-type { margin-bottom: 1.5rem; }
      .about-detail-list {
        display: flex; flex-wrap: wrap; gap: 0 1.75rem; list-style: none; margin: 0; padding: 1.25rem 0 0;
        border-top: 1px solid var(--line);
      }
      .about-detail-list li {
        font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;
        color: var(--sage-dark); padding: 0.4rem 0;
      }

      /* our coffee / process */
      .process { padding: 6.5rem 0; background: var(--cream); }
      .process-grid { margin-top: 3rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
      .process-step { border-top: 1px solid var(--line); padding-top: 1.5rem; }
      .process-num { font-family: var(--font-display); font-size: 0.95rem; color: var(--sage-dark); }
      .process-step h3 { font-size: 1.3rem; margin-top: 0.5rem; }
      .process-step p { font-size: 0.95rem; }

      .signature { background: var(--charcoal); padding: 6.5rem 0; }
      .signature-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: 4.5rem; align-items: center; }
      .signature h2 { color: var(--cream); font-size: clamp(2.25rem, 4vw, 3.4rem); }
      .signature-text p { color: rgba(246,241,230,0.78); max-width: 42ch; }
      .signature-price-row { display: flex; align-items: center; gap: 1.75rem; margin-top: 1.5rem; flex-wrap: wrap; }
      .signature-price { font-family: var(--font-display); font-size: 1.6rem; color: var(--cream); }
      .signature-media img { width: 100%; aspect-ratio: 5/4; object-fit: cover; }

      .gallery-grid {
        margin-top: 2.75rem;
        display: grid; grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 190px; gap: 0.85rem;
      }
      .gallery-item, .social-item { overflow: hidden; }
      .gallery-item img, .social-item img {
        width: 100%; height: 100%; object-fit: cover;
        transition: transform 0.6s ease, opacity 0.3s ease;
      }
      .gallery-item:hover img, .social-item:hover img { transform: scale(1.045); opacity: 0.92; }
      .gallery-tall { grid-row: span 2; }
      .gallery-wide { grid-column: span 2; }
      @media (prefers-reduced-motion: reduce) { .gallery-item img, .social-item img { transition: none; } }

      .testimonial-grid { margin-top: 2.75rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
      .testimonial-card { border-top: 2px solid var(--sage); padding-top: 1.5rem; }
      .testimonial-card blockquote {
        margin: 0 0 1.5rem 0; font-family: var(--font-display); font-size: 1.2rem;
        font-weight: 400; line-height: 1.45; color: var(--espresso);
      }
      .testimonial-card figcaption { display: flex; flex-direction: column; font-size: 0.85rem; }
      .testimonial-name { font-weight: 600; }
      .testimonial-meta { color: rgba(58,42,30,0.55); }

      /* social / instagram */
      .social { padding: 6.5rem 0; background: var(--cream-deep); }
      .social-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem; }
      .social-header h2 { margin: 0; font-size: clamp(1.8rem, 3vw, 2.4rem); }
      .social-grid { margin-top: 2.5rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.85rem; }
      .social-item img { aspect-ratio: 1/1; }

      .visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5rem; align-items: start; }
      .visit-block { margin-top: 2rem; }
      .visit-block:first-of-type { margin-top: 1.75rem; }
      .visit-block h3 {
        font-family: var(--font-sans); font-size: 0.78rem; text-transform: uppercase;
        letter-spacing: 0.1em; font-weight: 700; color: var(--sage-dark); margin-bottom: 0.6rem;
      }
      .hours-list { margin: 0; }
      .hours-row { display: flex; justify-content: space-between; max-width: 360px; padding: 0.55rem 0; border-top: 1px solid var(--line); }
      .hours-row:last-child { border-bottom: 1px solid var(--line); }
      .hours-row dt, .hours-row dd { margin: 0; font-size: 0.95rem; }
      .hours-row dd { color: rgba(58,42,30,0.82); }
      .visit-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2.25rem; }
      .text-link { color: var(--sage-dark); font-weight: 600; font-size: 0.92rem; border-bottom: 1px solid transparent; transition: border-color 0.2s ease; }
      .text-link:hover { border-color: var(--sage-dark); }
      .map-wrap { border: 1px solid var(--line); }
      .shop-map { display: block; width: 100%; height: auto; }
      .map-label { font-family: var(--font-sans); font-size: 10px; fill: rgba(58,42,30,0.55); letter-spacing: 0.04em; }
      .map-pin-label { font-family: var(--font-display); font-size: 13px; fill: var(--espresso); }

      /* contact form */
      .contact-narrow { max-width: 640px; }
      .contact-lede { font-size: 1rem; }
      .contact-form { margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
      .form-field { display: flex; flex-direction: column; }
      .form-field input, .form-field textarea {
        font-family: var(--font-sans); font-size: 1rem; padding: 0.85rem 1rem;
        border: 1px solid var(--line); background: var(--cream); color: var(--espresso);
        resize: vertical;
      }
      .form-field input:focus, .form-field textarea:focus { border-color: var(--sage-dark); }
      .form-field input[aria-invalid="true"], .form-field textarea[aria-invalid="true"] { border-color: var(--error); }
      .form-error { color: var(--error); font-size: 0.82rem; margin-top: 0.4rem; }
      .form-success { font-size: 1.05rem; max-width: 52ch; }
      .contact-form .btn { align-self: flex-start; }

      /* newsletter */
      .newsletter-row { display: flex; gap: 0.6rem; }
      .newsletter-row input {
        flex: 1; min-width: 0; font-family: var(--font-sans); font-size: 0.9rem;
        padding: 0.7rem 0.9rem; border: 1px solid var(--line-light); background: rgba(246,241,230,0.06);
        color: var(--cream);
      }
      .newsletter-row input::placeholder { color: rgba(246,241,230,0.45); }
      .newsletter-row .btn { flex-shrink: 0; }
      .footer-newsletter .form-error { color: #e2a08f; }
      .newsletter-success { font-size: 0.9rem; color: rgba(246,241,230,0.85); max-width: 30ch; }

      .site-footer { background: var(--charcoal); color: rgba(246,241,230,0.82); padding-top: 5rem; }
      .footer-grid {
        display: grid; grid-template-columns: 1.3fr 0.8fr 0.9fr 1fr; gap: 3rem; padding-bottom: 3.5rem;
        border-bottom: 1px solid var(--line-light);
      }
      .footer-brand p { color: rgba(246,241,230,0.72); font-size: 0.9rem; }
      .footer-tagline { font-family: var(--font-display); font-size: 1.05rem; color: rgba(246,241,230,0.9); }
      .logo-footer { color: var(--cream); font-size: 1.3rem; letter-spacing: 0.16em; margin-bottom: 0.6rem; }
      .footer-nav h3, .footer-contact h3, .footer-newsletter h3 {
        font-family: var(--font-sans); font-size: 0.75rem; text-transform: uppercase;
        letter-spacing: 0.1em; color: rgba(246,241,230,0.55); margin-bottom: 1.1rem; font-weight: 700;
      }
      .footer-nav nav, .footer-contact { display: flex; flex-direction: column; gap: 0.8rem; }
      .text-link-light { color: rgba(246,241,230,0.82); font-weight: 500; }
      .text-link-light:hover { color: var(--cream); }
      .footer-bottom-inner {
        display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;
        padding: 1.75rem 0; font-size: 0.8rem; color: rgba(246,241,230,0.55);
      }
      .footer-demo-note { font-style: italic; }

      .modal-backdrop {
        position: fixed; inset: 0; background: rgba(33,29,25,0.6); z-index: 200;
        display: flex; align-items: center; justify-content: center; padding: 1.5rem;
      }
      .modal {
        position: relative; background: var(--cream); max-width: 440px; width: 100%;
        padding: 2.75rem 2.25rem 2.25rem; border-top: 3px solid var(--sage);
      }
      .modal-close {
        position: absolute; top: 0.9rem; right: 1rem; background: none; border: none;
        font-size: 1.75rem; line-height: 1; cursor: pointer; color: var(--espresso);
        width: 44px; height: 44px;
      }
      .modal h3 { font-size: 1.6rem; }
      .modal-actions { display: flex; gap: 0.9rem; flex-wrap: wrap; margin: 1.5rem 0 1rem; }
      .modal-footnote { font-size: 0.85rem; color: rgba(58,42,30,0.55); margin-bottom: 0; }

      @media (max-width: 980px) {
        .about-grid, .signature-grid, .visit-grid { grid-template-columns: 1fr; gap: 2.75rem; }
        .about-media, .signature-media { order: -1; }
        .about-media img, .signature-media img { aspect-ratio: 16/10; }
        .process-grid { grid-template-columns: 1fr; gap: 2rem; }
        .testimonial-grid { grid-template-columns: 1fr 1fr; }
        .footer-grid { grid-template-columns: 1fr 1fr; }
        .footer-brand { grid-column: span 2; }
        .footer-newsletter { grid-column: span 2; }
        .social-grid { grid-template-columns: repeat(4, 1fr); }
      }

      @media (max-width: 860px) {
        .primary-nav { display: none; }
        .header-actions .btn-primary.btn-small { display: none; }
        .hamburger { display: flex; }
        .section { padding: 4.5rem 0; }
        .brand-statement, .process, .social { padding: 4.5rem 0; }
        .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
        .gallery-wide { grid-column: span 2; }
        .social-grid { grid-template-columns: repeat(2, 1fr); }
      }

      @media (max-width: 640px) {
        .header-inner { padding: 0 1.25rem; }
        .container { padding: 0 1.25rem; }
        .hero-content { padding: 0 1.25rem 4rem; }
        .hero h1 { max-width: 100%; font-size: clamp(2.35rem, 9vw, 3.2rem); }
        .hero-lede { font-size: 1rem; }
        .hero-actions { width: 100%; }
        .hero-actions .btn { flex: 1; }
        .scroll-cue { display: none; }
        .menu-row { flex-direction: column; gap: 0.75rem; }
        .menu-row-right { padding-top: 0; }
        .testimonial-grid { grid-template-columns: 1fr; }
        .footer-grid { grid-template-columns: 1fr; }
        .footer-brand, .footer-newsletter { grid-column: span 1; }
        .modal-actions .btn { flex: 1; }
        .visit-actions { flex-direction: column; }
        .visit-actions .btn { width: 100%; }
        .social-header { flex-direction: column; align-items: flex-start; }
        .newsletter-row { flex-direction: column; }
      }
    `);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
