export const locales = ["bg", "en", "ro"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";
export const localeCookieName = "lang";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type Messages = {
  siteName: string;
  header: {
    nav: {
      home: string;
      services: string;
      portfolio: string;
      about: string;
      contact: string;
      requestQuote: string;
    };
    auth: {
      profile: string;
      signOut: string;
      login: string;
      register: string;
    };
    language: {
      label: string;
      bg: string;
      en: string;
      ro: string;
    };
  };
  footer: {
    description: string;
    rights: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    ctaQuote: string;
    ctaPortfolio: string;
    servicesTitle: string;
    galleryTitle: string;
    testimonialsTitle: string;
    testimonials: string[];
  };
  services: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    requestService: string;
  };
  portfolio: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    all: string;
    close: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    storyTitle: string;
    storyText: string;
    missionTitle: string;
    missionText: string;
    teamTitle: string;
    statsEvents: string;
    statsClients: string;
    statsAwards: string;
  };
  contact: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    formTitle: string;
    officeTitle: string;
    officeAddress: string;
    mapTitle: string;
    socialTitle: string;
    phone: string;
    email: string;
    linkedin: string;
  };
  requestQuote: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    formTitle: string;
  };
  quoteForm: {
    requiredName: string;
    invalidEmail: string;
    requiredEventType: string;
    sendError: string;
    sendSuccess: string;
    name: string;
    email: string;
    eventType: string;
    selectEventType: string;
    eventTypes: string[];
    guests: string;
    budget: string;
    location: string;
    date: string;
    phone: string;
    details: string;
    submitting: string;
    submit: string;
  };
  contactForm: {
    requiredName: string;
    invalidEmail: string;
    shortMessage: string;
    sendError: string;
    sendSuccess: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    eventDate: string;
    message: string;
    requiredNote: string;
    submitting: string;
    submit: string;
  };
};

const bg: Messages = {
  siteName: "Събития Колеви",
  header: {
    nav: {
      home: "Начало",
      services: "Услуги",
      portfolio: "Портфолио",
      about: "За нас",
      contact: "Контакти",
      requestQuote: "Заяви оферта",
    },
    auth: {
      profile: "Профил",
      signOut: "Изход",
      login: "Вход",
      register: "Регистрация",
    },
    language: { label: "Език", bg: "BG", en: "EN", ro: "RO" },
  },
  footer: {
    description: "Премиум организация на корпоративни събития, сватби и частни празници с внимание към всеки детайл.",
    rights: "Всички права запазени.",
  },
  home: {
    eyebrow: "Премиум организация на събития",
    title: "Създаваме събития с характер и стил.",
    description: "В Събития Колеви обединяваме креативност, опит и прецизност, за да превърнем всяка идея в преживяване.",
    ctaQuote: "Заяви оферта",
    ctaPortfolio: "Виж портфолио",
    servicesTitle: "Услуги",
    galleryTitle: "Избрана галерия",
    testimonialsTitle: "Отзиви",
    testimonials: [
      "Екипът на Събития Колеви превърна нашата годишна гала в незабравимо преживяване. — Меридиан Груп",
      "Всяка част от сватбения ни уикенд беше стилна, лична и спокойна за нас. — Елена и Виктор",
      "Перфектна организация, ясна комуникация и безупречно изпълнение. — Axis Tech",
    ],
  },
  services: {
    heroEyebrow: "Нашите услуги",
    heroTitle: "Цялостни решения за всеки тип събитие",
    heroDescription: "Открийте услугите на Събития Колеви, създадени за високо качество, стил и безпроблемна организация.",
    requestService: "Заяви тази услуга",
  },
  portfolio: {
    heroEyebrow: "Портфолио",
    heroTitle: "Подбрани събития на Събития Колеви",
    heroDescription: "Филтрирайте по категория и разгледайте реализирани проекти с визуални акценти и кратки описания.",
    all: "Всички",
    close: "Затвори",
  },
  about: {
    heroEyebrow: "За нас",
    heroTitle: "Екип, който създава стойностни преживявания",
    heroDescription: "Събития Колеви съчетава естетика, стратегия и внимание към хората, за да реализира събития с истинско въздействие.",
    storyTitle: "Нашата история",
    storyText: "Започнахме с идеята да предложим по-висок стандарт в организацията на събития и днес помагаме на клиенти от различни индустрии да постигат силни резултати.",
    missionTitle: "Мисия и визия",
    missionText: "Мисия: безупречна организация и запомнящи се емоции. Визия: да бъдем водеща агенция за премиум събития в региона.",
    teamTitle: "Екип",
    statsEvents: "Реализирани събития",
    statsClients: "Доволни клиенти",
    statsAwards: "Професионални отличия",
  },
  contact: {
    heroEyebrow: "Контакти",
    heroTitle: "Нека планираме вашето следващо събитие",
    heroDescription: "Изпратете запитване и екипът на Събития Колеви ще ви предложи подходящ формат, визия и план за реализация.",
    formTitle: "Форма за контакт",
    officeTitle: "Нашият офис",
    officeAddress: "ул. Борисова 56, Русе, България",
    mapTitle: "Карта на Събития Колеви",
    socialTitle: "Социални мрежи и връзка",
    phone: "Телефон",
    email: "Имейл",
    linkedin: "LinkedIn",
  },
  requestQuote: {
    heroEyebrow: "Заяви оферта",
    heroTitle: "Разкажете ни за вашето събитие",
    heroDescription: "Споделете основните параметри и ще подготвим персонализирана оферта с концепция, бюджет и времеви план.",
    formTitle: "Форма за запитване",
  },
  quoteForm: {
    requiredName: "Името е задължително.",
    invalidEmail: "Въведете валиден имейл.",
    requiredEventType: "Изберете тип събитие.",
    sendError: "Неуспешно изпращане. Опитайте отново.",
    sendSuccess: "Запитването е изпратено успешно.",
    name: "Име и фамилия",
    email: "Имейл",
    eventType: "Тип събитие",
    selectEventType: "Изберете тип събитие",
    eventTypes: ["Корпоративно събитие", "Сватба", "Частно парти", "Конференция", "Тиймбилдинг", "Персонализирано събитие"],
    guests: "Очакван брой гости",
    budget: "Бюджетен диапазон",
    location: "Предпочитана локация",
    date: "Дата",
    phone: "Телефон",
    details: "Детайли",
    submitting: "Изпращане...",
    submit: "Изпрати запитване",
  },
  contactForm: {
    requiredName: "Моля, въведете вашето име.",
    invalidEmail: "Моля, въведете валиден имейл адрес.",
    shortMessage: "Съобщението трябва да е поне 10 символа.",
    sendError: "Неуспешно изпращане. Опитайте отново.",
    sendSuccess: "Запитването е изпратено успешно.",
    name: "Вашето име",
    email: "Имейл адрес",
    phone: "Телефон",
    company: "Компания",
    subject: "Тема",
    eventDate: "Дата на събитие (по желание)",
    message: "С какво можем да помогнем?",
    requiredNote: "Полетата име, имейл и съобщение са задължителни.",
    submitting: "Изпращане...",
    submit: "Изпрати съобщение",
  },
};

const en: Messages = {
  ...bg,
  header: {
    nav: { home: "Home", services: "Services", portfolio: "Portfolio", about: "About", contact: "Contact", requestQuote: "Request Quote" },
    auth: { profile: "Profile", signOut: "Sign Out", login: "Login", register: "Register" },
    language: { label: "Language", bg: "BG", en: "EN", ro: "RO" },
  },
  footer: {
    description: "Premium planning for corporate events, weddings, and private celebrations with attention to every detail.",
    rights: "All rights reserved.",
  },
  home: {
    eyebrow: "Premium event planning",
    title: "We create events with character and style.",
    description: "At Sabitia Kolevi, we combine creativity, experience, and precision to turn every idea into an experience.",
    ctaQuote: "Request Quote",
    ctaPortfolio: "View Portfolio",
    servicesTitle: "Services",
    galleryTitle: "Selected Gallery",
    testimonialsTitle: "Testimonials",
    testimonials: [
      "The Sabitia Kolevi team turned our annual gala into an unforgettable experience. — Meridian Group",
      "Every part of our wedding weekend felt stylish, personal, and stress-free. — Elena and Viktor",
      "Perfect planning, clear communication, and flawless execution. — Axis Tech",
    ],
  },
  services: {
    heroEyebrow: "Our services",
    heroTitle: "End-to-end solutions for every event type",
    heroDescription: "Explore Sabitia Kolevi services built for high quality, style, and seamless execution.",
    requestService: "Request this service",
  },
  portfolio: {
    heroEyebrow: "Portfolio",
    heroTitle: "Selected events by Sabitia Kolevi",
    heroDescription: "Filter by category and browse completed projects with visual highlights and short descriptions.",
    all: "All",
    close: "Close",
  },
  about: {
    heroEyebrow: "About us",
    heroTitle: "A team that creates meaningful experiences",
    heroDescription: "Sabitia Kolevi blends aesthetics, strategy, and human-centered thinking to deliver events with real impact.",
    storyTitle: "Our story",
    storyText: "We started with the idea of raising the event planning standard, and today we help clients from different industries achieve strong results.",
    missionTitle: "Mission and vision",
    missionText: "Mission: flawless planning and memorable emotions. Vision: become a leading premium event agency in the region.",
    teamTitle: "Team",
    statsEvents: "Completed events",
    statsClients: "Satisfied clients",
    statsAwards: "Professional awards",
  },
  contact: {
    heroEyebrow: "Contact",
    heroTitle: "Let us plan your next event",
    heroDescription: "Send an inquiry and the Sabitia Kolevi team will propose the right format, visual concept, and execution plan.",
    formTitle: "Contact form",
    officeTitle: "Our office",
    officeAddress: "12 Events Square, Sofia, Bulgaria",
    mapTitle: "Sabitia Kolevi map",
    socialTitle: "Social links and contact",
    phone: "Phone",
    email: "Email",
    linkedin: "LinkedIn",
  },
  requestQuote: {
    heroEyebrow: "Request quote",
    heroTitle: "Tell us about your event",
    heroDescription: "Share the main details and we will prepare a custom quote with concept, budget, and timeline.",
    formTitle: "Inquiry form",
  },
  quoteForm: {
    requiredName: "Name is required.",
    invalidEmail: "Enter a valid email.",
    requiredEventType: "Select an event type.",
    sendError: "Sending failed. Please try again.",
    sendSuccess: "Your request was sent successfully.",
    name: "Full name",
    email: "Email",
    eventType: "Event type",
    selectEventType: "Select event type",
    eventTypes: ["Corporate event", "Wedding", "Private party", "Conference", "Team building", "Custom event"],
    guests: "Expected guests",
    budget: "Budget range",
    location: "Preferred location",
    date: "Date",
    phone: "Phone",
    details: "Details",
    submitting: "Sending...",
    submit: "Send request",
  },
  contactForm: {
    requiredName: "Please enter your name.",
    invalidEmail: "Please enter a valid email address.",
    shortMessage: "Message must be at least 10 characters.",
    sendError: "Sending failed. Please try again.",
    sendSuccess: "Your request was sent successfully.",
    name: "Your name",
    email: "Email address",
    phone: "Phone",
    company: "Company",
    subject: "Subject",
    eventDate: "Event date (optional)",
    message: "How can we help?",
    requiredNote: "Name, email, and message are required.",
    submitting: "Sending...",
    submit: "Send message",
  },
};

const ro: Messages = {
  ...bg,
  header: {
    nav: { home: "Acasă", services: "Servicii", portfolio: "Portofoliu", about: "Despre noi", contact: "Contact", requestQuote: "Cere ofertă" },
    auth: { profile: "Profil", signOut: "Ieșire", login: "Autentificare", register: "Înregistrare" },
    language: { label: "Limbă", bg: "BG", en: "EN", ro: "RO" },
  },
  footer: {
    description: "Organizare premium pentru evenimente corporate, nunți și petreceri private, cu atenție la fiecare detaliu.",
    rights: "Toate drepturile rezervate.",
  },
  home: {
    eyebrow: "Organizare premium de evenimente",
    title: "Creăm evenimente cu personalitate și stil.",
    description: "La Sabitia Kolevi combinăm creativitatea, experiența și precizia pentru a transforma fiecare idee într-o experiență.",
    ctaQuote: "Cere ofertă",
    ctaPortfolio: "Vezi portofoliul",
    servicesTitle: "Servicii",
    galleryTitle: "Galerie selectată",
    testimonialsTitle: "Testimoniale",
    testimonials: [
      "Echipa Sabitia Kolevi a transformat gala noastră anuală într-o experiență de neuitat. — Meridian Group",
      "Fiecare parte a weekendului nostru de nuntă a fost elegantă, personală și lipsită de stres. — Elena și Viktor",
      "Organizare perfectă, comunicare clară și execuție impecabilă. — Axis Tech",
    ],
  },
  services: {
    heroEyebrow: "Serviciile noastre",
    heroTitle: "Soluții complete pentru orice tip de eveniment",
    heroDescription: "Descoperă serviciile Sabitia Kolevi create pentru calitate înaltă, stil și organizare fără probleme.",
    requestService: "Solicită acest serviciu",
  },
  portfolio: {
    heroEyebrow: "Portofoliu",
    heroTitle: "Evenimente selectate de Sabitia Kolevi",
    heroDescription: "Filtrează după categorie și descoperă proiecte realizate, cu accente vizuale și descrieri scurte.",
    all: "Toate",
    close: "Închide",
  },
  about: {
    heroEyebrow: "Despre noi",
    heroTitle: "O echipă care creează experiențe valoroase",
    heroDescription: "Sabitia Kolevi îmbină estetica, strategia și atenția pentru oameni pentru a realiza evenimente cu impact real.",
    storyTitle: "Povestea noastră",
    storyText: "Am început cu ideea de a ridica standardul organizării de evenimente, iar astăzi ajutăm clienți din industrii diferite să obțină rezultate puternice.",
    missionTitle: "Misiune și viziune",
    missionText: "Misiune: organizare impecabilă și emoții memorabile. Viziune: să devenim o agenție lider pentru evenimente premium în regiune.",
    teamTitle: "Echipă",
    statsEvents: "Evenimente realizate",
    statsClients: "Clienți mulțumiți",
    statsAwards: "Premii profesionale",
  },
  contact: {
    heroEyebrow: "Contact",
    heroTitle: "Hai să planificăm următorul tău eveniment",
    heroDescription: "Trimite o solicitare, iar echipa Sabitia Kolevi îți va propune formatul, direcția vizuală și planul de implementare potrivite.",
    formTitle: "Formular de contact",
    officeTitle: "Biroul nostru",
    officeAddress: "Piața Evenimente 12, Sofia, Bulgaria",
    mapTitle: "Harta Sabitia Kolevi",
    socialTitle: "Rețele sociale și contact",
    phone: "Telefon",
    email: "Email",
    linkedin: "LinkedIn",
  },
  requestQuote: {
    heroEyebrow: "Cere ofertă",
    heroTitle: "Spune-ne despre evenimentul tău",
    heroDescription: "Trimite detaliile principale și vom pregăti o ofertă personalizată cu concept, buget și calendar.",
    formTitle: "Formular solicitare",
  },
  quoteForm: {
    requiredName: "Numele este obligatoriu.",
    invalidEmail: "Introduceți un email valid.",
    requiredEventType: "Selectați tipul evenimentului.",
    sendError: "Trimiterea a eșuat. Încearcă din nou.",
    sendSuccess: "Solicitarea a fost trimisă cu succes.",
    name: "Nume și prenume",
    email: "Email",
    eventType: "Tip eveniment",
    selectEventType: "Selectați tipul evenimentului",
    eventTypes: ["Eveniment corporate", "Nuntă", "Petrecere privată", "Conferință", "Team building", "Eveniment personalizat"],
    guests: "Număr estimat de invitați",
    budget: "Interval buget",
    location: "Locație preferată",
    date: "Dată",
    phone: "Telefon",
    details: "Detalii",
    submitting: "Se trimite...",
    submit: "Trimite solicitarea",
  },
  contactForm: {
    requiredName: "Te rugăm să introduci numele.",
    invalidEmail: "Te rugăm să introduci un email valid.",
    shortMessage: "Mesajul trebuie să aibă cel puțin 10 caractere.",
    sendError: "Trimiterea a eșuat. Încearcă din nou.",
    sendSuccess: "Solicitarea a fost trimisă cu succes.",
    name: "Numele tău",
    email: "Adresa de email",
    phone: "Telefon",
    company: "Companie",
    subject: "Subiect",
    eventDate: "Data evenimentului (opțional)",
    message: "Cu ce te putem ajuta?",
    requiredNote: "Câmpurile nume, email și mesaj sunt obligatorii.",
    submitting: "Se trimite...",
    submit: "Trimite mesajul",
  },
};

const dictionary: Record<Locale, Messages> = { bg, en, ro };

export function getMessages(locale: Locale): Messages {
  return dictionary[locale] ?? dictionary[defaultLocale];
}
