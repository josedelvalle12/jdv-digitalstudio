/**
 * Copy de la landing comercial - Argentina.
 * Voseo, precios en USD. Ruta: /diseno-web
 *
 * Regla: solo hechos verificables. Ningún testimonio, cifra ni cliente
 * se redacta acá si no viene de material real.
 */
import { legalAr } from "./legal";

const ar = {
  market: "ar",
  lang: "es-AR",
  path: "/diseno-web",

  meta: {
    title: "Diseño web para empresas | JDV Digital Studio",
    description:
      "Diseño y desarrollo de páginas web para empresas y pequeños negocios, pensadas para generar consultas. Además, configuro y gestiono tus campañas de Google Ads.",
    ogLocale: "es_AR",
  },

  nav: {
    cta: "Pedir presupuesto",
    whatsapp: "WhatsApp",
  },

  hero: {
    eyebrow: "Diseño y desarrollo web · Google Ads - Estudio independiente",
    title: "Diseño web para empresas que necesitan más consultas, no solo una página linda.",
    subtitle:
      "Diseño y desarrollo tu sitio para que explique bien lo que hacés y lleve a cada visitante a contactarte. Y si querés tráfico desde el primer día, también configuro y gestiono tus campañas de Google Ads.",
    primary: "Pedir presupuesto",
    secondary: "Escribime por WhatsApp",
    note: "Sin compromiso. Recibís una propuesta por escrito con alcance, plazos e inversión.",
  },

  /** Mensaje con el que se abre WhatsApp. */
  whatsappText: "Hola Jose, vi tu web y quiero pedir un presupuesto.",

  /**
   * Franja de confianza. Cada punto sale del contrato o la propuesta reales:
   * contrato cláusulas 4.2 (pago), 10.1 (soporte) y 11 (titularidad).
   * Plazo de landing confirmado por Jose: semana 1 charla sobre el negocio y
   * propuesta de diseño, semana 2 desarrollo. Los sitios completos dependen
   * del alcance: su plazo va en cada propuesta, no acá.
   */
  trust: {
    label: "Cómo trabajo",
    items: [
      "Trato directo con quien diseña y desarrolla tu sitio",
      "Propuesta y contrato por escrito",
      "Pago en dos partes: al inicio y antes de publicar",
      "14 días de soporte después de publicar",
      "Dominio, hosting y cuentas a tu nombre",
      "Landing lista en 1-2 semanas",
    ],
  },

  problem: {
    label: "El problema",
    title: "Tener una web no alcanza si no trae consultas.",
    intro:
      "Muchas webs de empresas cumplen con estar, pero no ayudan a vender. Suele pasar por alguna de estas razones:",
    points: [
      {
        title: "No se entiende qué ofrecés",
        text: "El visitante tiene que adivinar en qué podés ayudarlo, y en los primeros segundos decide si se queda.",
      },
      {
        title: "No dice qué hacer después",
        text: "Se ve bien, pero no hay un camino claro para escribirte o pedir presupuesto.",
      },
      {
        title: "En el celular cuesta usarla",
        text: "Carga lento, el texto es chico o los botones no se encuentran.",
      },
      {
        title: "La publicidad lleva a una página que no convierte",
        text: "Pagás cada clic, pero la página no está pensada para que ese visitante te contacte.",
      },
    ],
  },

  /** Web como servicio principal; Google Ads y plan mensual como continuación. */
  method: {
    label: "Cómo te ayudo",
    title: "Un solo responsable para todo el recorrido.",
    intro: "Hablás con la misma persona desde la primera charla hasta el reporte de cada mes.",
    steps: [
      {
        tag: "Servicio principal",
        title: "Una web que explica y convierte",
        text: "Diseño y desarrollo tu sitio para que se entienda rápido, funcione bien en el celular y lleve al visitante a escribirte o pedir presupuesto.",
      },
      {
        tag: "Complemento",
        title: "Tráfico de gente que ya busca lo que ofrecés",
        text: "Si querés acelerar, configuro y gestiono campañas de búsqueda en Google Ads que llevan a esa web, con la medición de consultas lista desde el primer día.",
      },
      {
        tag: "Plan mensual",
        title: "Medición y mejora mes a mes",
        text: "Con datos reales de visitas y consultas ajusto textos, secciones y campañas, y te envío un reporte claro cada mes.",
      },
    ],
    cta: "Contame qué necesitás",
  },

  /**
   * Caso real (contado por Jose). Sin testimonio todavía: no se muestra
   * ninguno. Imperium queda fuera: es un producto propio que no refleja el
   * servicio que ofrece la landing.
   */
  work: {
    label: "Trabajo reciente",
    title: "De un sitio de plantilla a una web que transmite confianza.",
    name: "Estudio Aduanero Pablo L. Zecca",
    sector: "Despachante de aduana · Buenos Aires",
    details: [
      ["Qué necesitaba", "Su sitio estaba armado con una plantilla y no transmitía la seriedad ni la trayectoria del estudio."],
      ["Qué hice", "Un rediseño visual más premium y profesional, y una reorganización del contenido para que cada servicio se entienda más rápido."],
      ["Mi rol", "Diseño y desarrollo"],
    ],
    before: {
      caption: "Antes: sitio hecho con plantilla",
      alt: "Inicio anterior de Estudio Aduanero, hecho con plantilla: foto de contenedores de fondo, texto chico y un formulario de newsletter en el centro.",
    },
    after: {
      caption: "Después: rediseño",
      alt: "Inicio rediseñado de Estudio Aduanero: fondo oscuro, titular grande «Comercio exterior, despachado con precisión.» y botones para ver servicios y contactar.",
    },
    link: "Ver el rediseño",
  },

  /**
   * Base copiada de la sección Servicios de la home (descripciones y listas),
   * con nombres concretos y moneda explícita. A revisar con Jose.
   * Google Ads y plan mensual: precio todavía sin definir.
   */
  services: {
    label: "Servicios e inversión",
    title: "Elegí la escala de tu proyecto.",
    intro: "Precios de referencia en dólares (USD). Cada propuesta se arma según tu negocio, con alcance, plazos e inversión por escrito.",
    currency: "USD",
    fromLabel: "Desde",
    timeLabel: "Plazo",
    listLabel: "Qué abarca",
    cta: "Pedir presupuesto",
    tiers: [
      {
        name: "Landing page",
        price: "USD 500",
        amount: 500,
        description: "Una página diseñada para presentar un producto, servicio o negocio y convertir visitas en consultas.",
        time: "1-2 semanas",
        items: [
          "Una única página de entre 5 y 7 secciones",
          "Diseño visual personalizado",
          "Estructura de contenido orientada a la conversión",
          "Desarrollo responsive (móvil, tablet y escritorio)",
          "Formularios de contacto y/o integración con WhatsApp",
          "Botones y llamadas a la acción",
          "Configuración SEO básica",
          "Publicación y pruebas de funcionamiento",
        ],
      },
      {
        name: "Sitio web para empresas",
        price: "USD 900",
        amount: 900,
        description: "Una presencia digital completa para empresas y negocios que necesitan presentar su propuesta, organizar sus servicios y transmitir confianza.",
        time: "3-4 semanas",
        items: [
          "Sitio multipágina de entre 4 y 5 páginas",
          "Diseño visual personalizado",
          "Arquitectura y organización del contenido",
          "Inicio, empresa, servicios y contacto, según las necesidades del negocio",
          "Desarrollo responsive",
          "Formularios e integraciones de contacto",
          "Configuración de Analytics",
          "SEO técnico básico",
          "Publicación y pruebas de funcionamiento",
        ],
        note: "Las páginas adicionales se presupuestan por separado.",
      },
      {
        name: "Sitio a medida",
        price: "USD 1.200",
        amount: 1200,
        description: "Soluciones digitales personalizadas para proyectos que requieren funcionalidades específicas, integraciones o experiencias más complejas.",
        time: "Según alcance",
        listLabel: "Alcance orientativo",
        items: [
          "Diseño y desarrollo personalizado",
          "Arquitectura adaptada al proyecto",
          "Funcionalidades específicas",
          "Integraciones con servicios externos",
          "CMS y contenido dinámico cuando corresponda",
          "Automatizaciones o conexiones con otros sistemas",
          "Pruebas y puesta en producción",
        ],
        note: "El precio y el plazo se definen según el alcance y la complejidad del proyecto.",
      },
    ],
    domainNote: "El dominio y el hosting se contratan directamente a nombre del cliente. Te acompañamos en la elección, gestión y configuración para poner tu sitio en funcionamiento.",
    addonsLabel: "Complementos",
    addons: [
      {
        name: "Google Ads",
        price: "USD 150 a 250 por mes",
        description: "Configuración de campañas de búsqueda y del seguimiento de conversiones, y gestión mensual con reporte.",
        note: "La puesta en marcha se cotiza según el alcance. La inversión en anuncios la pagás directo a Google, desde tu propia cuenta.",
      },
      {
        name: "Plan mensual",
        price: "USD 60 a 100 por mes",
        description: "Mantenimiento del sitio, cambios menores, revisión de datos y mejoras, con un reporte cada mes.",
      },
    ],
    footnote: "Cada proyecto se define alrededor del negocio, no de una lista rígida de funcionalidades.",
  },

  /**
   * Adquisición digital: continuación natural de la web. Sin promesas de
   * resultados. Precio de gestión mensual desde USD 150; la puesta en marcha
   * se cotiza según el alcance (no se publica precio fijo).
   */
  acquisition: {
    label: "Después de publicar",
    title: "Tu web es el comienzo, no el final.",
    intro:
      "Una vez publicada, podemos trabajar en atraer potenciales clientes y convertir tu presencia digital en un canal de adquisición. Analizamos tu negocio y elegimos las plataformas que mejor se adaptan a tus objetivos.",
    channels: [
      {
        name: "Google Ads",
        text: "Captá personas que ya están buscando tus productos o servicios mediante campañas en Google.",
      },
      {
        name: "Meta Ads",
        text: "Llegá a nuevas audiencias y promocioná tus productos o servicios mediante campañas en Instagram y Facebook.",
      },
    ],
    loopLabel: "Cómo se complementan",
    loop: [
      "La web presenta tu oferta",
      "Las campañas atraen visitantes potencialmente interesados",
      "La experiencia de la página facilita el contacto",
      "La medición permite detectar oportunidades de mejora",
    ],
    stepsLabel: "Cómo trabajamos",
    steps: [
      "Análisis del negocio y definición de objetivos",
      "Configuración de campañas, anuncios y medición",
      "Gestión, seguimiento y optimización continua",
    ],
    closing: "Una estrategia adaptada a lo que vendés, a quién querés llegar y a los objetivos de tu negocio.",
    price: "Gestión mensual desde USD 150",
    priceNote: "La inversión publicitaria se abona por separado.",
    cta: "Consultar por campañas",
  },

  /** Base: sección Proceso de la home, resumida a 5 pasos. */
  process: {
    label: "Proceso",
    title: "De la primera charla al lanzamiento.",
    steps: [
      { title: "Charla inicial", text: "Conozco tu negocio, tu público y qué tiene que lograr la web." },
      { title: "Propuesta", text: "Te envío alcance, plazos e inversión por escrito." },
      { title: "Diseño", text: "Estructura primero, diseño después. Lo revisás y ajustamos antes de desarrollar." },
      { title: "Desarrollo y pruebas", text: "Construyo el sitio y lo pruebo en celular y computadora." },
      { title: "Lanzamiento", text: "Publicación, medición configurada y últimos ajustes." },
    ],
    note: "En una landing, la charla, la propuesta y el diseño llevan la primera semana, y el desarrollo la segunda.",
    closing: "Alcance claro. Comunicación clara. Sin sorpresas.",
  },

  about: {
    label: "Quién soy",
    title: "Una sola persona, de la charla al anuncio.",
    text: "Soy Jose Del Valle. Trabajo de forma independiente: la persona con la que hablás es la que diseña y desarrolla tu sitio, y la que después gestiona tus campañas.",
    facts: [
      ["Base", "Buenos Aires, Argentina"],
      ["Modalidad", "Remoto"],
      ["Trabajo con", "Empresas y pequeños negocios"],
    ],
    photoAlt: "Jose Del Valle, diseñador y desarrollador web",
  },

  /**
   * Respuestas con datos confirmados por Jose: dominio y hosting los paga el
   * cliente; los cambios entran en el plan mensual; soporte de 14 días
   * (contrato, cláusula 10); pago en dos partes (cláusula 4.2).
   */
  faq: {
    label: "Preguntas frecuentes",
    title: "Lo que suelen preguntarme antes de empezar.",
    items: [
      {
        q: "¿Cuánto cuesta y cómo se paga?",
        a: "Los precios de referencia están más arriba. Después de la charla inicial recibís una propuesta por escrito con el monto exacto. Se paga en dos partes: al inicio y antes de publicar.",
      },
      {
        q: "¿El dominio y el hosting están incluidos?",
        a: "No. Se contratan a tu nombre y los pagás directamente vos. Te ayudo a elegirlos y a configurarlos, y quedan siempre bajo tu titularidad.",
      },
      {
        q: "¿Puedo actualizar la web yo mismo?",
        a: "Los cambios los hago yo dentro del plan mensual, así no tenés que ocuparte de la parte técnica. Si vas a actualizar contenido seguido, en un sitio a medida se puede sumar un gestor de contenidos.",
      },
      {
        q: "¿Qué necesito para empezar?",
        a: "Contarme a qué se dedica tu negocio, a quién le vende y qué querés lograr con la web. Con eso preparo la propuesta.",
      },
      {
        q: "¿Qué pasa después de publicar?",
        a: "Tenés 14 días de soporte para corregir errores y hacer ajustes menores. Después, si querés, seguimos con el plan mensual de mantenimiento y mejoras.",
      },
      {
        q: "¿Garantizás resultados con Google Ads?",
        a: "No. Nadie puede garantizarlos con seriedad. Lo que sí te garantizo es medición clara, un reporte cada mes y acceso total a tu cuenta.",
      },
      {
        q: "¿Cuánto hay que invertir en publicidad?",
        a: "Depende del rubro y de la zona. Antes de empezar reviso cuánto cuesta cada clic en tus búsquedas y te propongo un presupuesto inicial. Ese dinero lo pagás directo a Google.",
      },
    ],
  },

  contact: {
    label: "Contacto",
    title: "Contame qué necesitás y te respondo con una propuesta concreta.",
    response: "Te respondo en menos de 24 horas hábiles.",
    direct: "¿Preferís escribir directo?",
    whatsapp: "Escribime por WhatsApp",
  },

  form: {
    name: "Nombre",
    email: "Email",
    phone: "WhatsApp (opcional)",
    need: "¿Qué necesitás?",
    needOptions: ["Sitio nuevo", "Rediseño", "Landing page", "Google Ads", "No estoy seguro"],
    message: "Contame un poco más (opcional)",
    messagePlaceholder: "Por ejemplo: a qué se dedica tu negocio y qué te gustaría lograr.",
    submit: "Enviar consulta",
    sending: "Enviando...",
    privacy: "Al enviar, aceptás que use tus datos solo para responder tu consulta. Más información en la",
    privacyLink: "política de privacidad",
    error: "No se pudo enviar la consulta. Probá de nuevo o escribime por WhatsApp.",
  },

  /** Página de gracias (/diseno-web/gracias): destino del formulario y conversión. */
  thanks: {
    title: "Gracias, recibí tu consulta.",
    text: "Te respondo en menos de 24 horas hábiles al email que dejaste.",
    whatsapp: "Si es urgente, escribime por WhatsApp",
    back: "Volver a la página",
  },

  footer: {
    tagline: "Estudio independiente de Jose Del Valle.",
    location: "Buenos Aires, Argentina",
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    legal: "Aviso legal",
    consent: "Preferencias de medición",
  },

  /** Textos legales: /privacidad y /aviso-legal. */
  legal: legalAr,
};

export default ar;
