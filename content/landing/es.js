/**
 * Copy de la landing comercial - España.
 * Tuteo, precios en EUR. Ruta: /es/diseno-web
 *
 * Regla: solo hechos verificables. Ningún testimonio, cifra ni cliente
 * se redacta acá si no viene de material real.
 */
import { legalEs } from "./legal";

const es = {
  market: "es",
  lang: "es-ES",
  path: "/es/diseno-web",

  meta: {
    title: "Diseño web para empresas | JDV Digital Studio",
    description:
      "Diseño y desarrollo de páginas web para empresas y pequeños negocios, pensadas para conseguir clientes. Además, configuro y gestiono tus campañas de Google Ads.",
    ogLocale: "es_ES",
  },

  nav: {
    cta: "Pedir presupuesto",
    whatsapp: "WhatsApp",
  },

  hero: {
    eyebrow: "Diseño y desarrollo web · Google Ads - Estudio independiente",
    title: "Diseño web para empresas que necesitan más clientes, no solo una web bonita.",
    subtitle:
      "Diseño y desarrollo tu web para que explique bien lo que haces y lleve a cada visita a contactarte. Y si quieres tráfico desde el primer día, también configuro y gestiono tus campañas de Google Ads.",
    primary: "Pedir presupuesto",
    secondary: "Escribir por WhatsApp",
    note: "Sin compromiso. Recibes una propuesta por escrito con alcance, plazos e inversión.",
  },

  /** Mensaje con el que se abre WhatsApp. */
  whatsappText: "Hola Jose, he visto tu web y quiero pedir presupuesto.",

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
      "Trato directo con quien diseña y desarrolla tu web",
      "Presupuesto y contrato por escrito",
      "Pago en dos partes: al inicio y antes de publicar",
      "14 días de soporte después de publicar",
      "Dominio, hosting y cuentas a tu nombre",
      "Landing lista en 1-2 semanas",
    ],
  },

  problem: {
    label: "El problema",
    title: "Tener una web no basta si no te trae clientes.",
    intro:
      "Muchas webs de empresa cumplen con estar, pero no ayudan a vender. Suele pasar por alguna de estas razones:",
    points: [
      {
        title: "No se entiende qué ofreces",
        text: "Quien entra tiene que adivinar en qué puedes ayudarle, y en los primeros segundos decide si se queda.",
      },
      {
        title: "No dice qué hacer después",
        text: "Se ve bien, pero no hay un camino claro para escribirte o pedir presupuesto.",
      },
      {
        title: "En el móvil cuesta usarla",
        text: "Carga lenta, el texto es pequeño o los botones no se encuentran.",
      },
      {
        title: "La publicidad lleva a una página que no convierte",
        text: "Pagas cada clic, pero la página no está pensada para que esa visita te contacte.",
      },
    ],
  },

  /** Web como servicio principal; Google Ads y plan mensual como continuación. */
  method: {
    label: "Cómo te ayudo",
    title: "Un solo responsable para todo el recorrido.",
    intro: "Hablas con la misma persona desde la primera conversación hasta el informe de cada mes.",
    steps: [
      {
        tag: "Servicio principal",
        title: "Una web que explica y convierte",
        text: "Diseño y desarrollo tu web para que se entienda rápido, funcione bien en el móvil y lleve a cada visita a escribirte o pedir presupuesto.",
      },
      {
        tag: "Complemento",
        title: "Tráfico de gente que ya busca lo que ofreces",
        text: "Si quieres acelerar, configuro y gestiono campañas de búsqueda en Google Ads que llevan a esa web, con la medición de contactos lista desde el primer día.",
      },
      {
        tag: "Plan mensual",
        title: "Medición y mejora mes a mes",
        text: "Con datos reales de visitas y contactos ajusto textos, secciones y campañas, y te envío un informe claro cada mes.",
      },
    ],
    cta: "Cuéntame qué necesitas",
  },

  /**
   * Caso real (contado por Jose). Sin testimonio todavía: no se muestra
   * ninguno. Imperium queda fuera: es un producto propio que no refleja el
   * servicio que ofrece la landing.
   */
  work: {
    label: "Trabajo reciente",
    title: "De una web de plantilla a una que transmite confianza.",
    name: "Estudio Aduanero Pablo L. Zecca",
    sector: "Agente de aduanas · Buenos Aires, Argentina",
    details: [
      ["Qué necesitaba", "Su web estaba hecha con una plantilla y no transmitía la seriedad ni la trayectoria del estudio."],
      ["Qué hice", "Un rediseño visual más premium y profesional, y una reorganización del contenido para que cada servicio se entienda más rápido."],
      ["Mi papel", "Diseño y desarrollo"],
    ],
    before: {
      caption: "Antes: web hecha con plantilla",
      alt: "Inicio anterior de Estudio Aduanero, hecho con plantilla: foto de contenedores de fondo, texto pequeño y un formulario de newsletter en el centro.",
    },
    after: {
      caption: "Después: rediseño",
      alt: "Inicio rediseñado de Estudio Aduanero: fondo oscuro, titular grande «Comercio exterior, despachado con precisión.» y botones para ver servicios y contactar.",
    },
    link: "Ver el rediseño",
  },

  /**
   * Base copiada de la sección Servicios de la home (descripciones y listas),
   * con nombres concretos y los mismos importes en euros. A revisar con Jose.
   * Google Ads y plan mensual: precio todavía sin definir.
   * Pendiente: aclarar si los precios llevan IVA y cómo se factura a España.
   */
  services: {
    label: "Servicios e inversión",
    title: "Elige la escala de tu proyecto.",
    intro: "Precios de referencia en euros (EUR). Cada presupuesto se prepara según tu negocio, con alcance, plazos e inversión por escrito.",
    currency: "EUR",
    fromLabel: "Desde",
    timeLabel: "Plazo",
    listLabel: "Qué abarca",
    cta: "Pedir presupuesto",
    tiers: [
      {
        name: "Landing page",
        price: "500 €",
        amount: 500,
        description: "Una página diseñada para presentar un producto, servicio o negocio y convertir visitas en consultas.",
        time: "1-2 semanas",
        items: [
          "Una única página de entre 5 y 7 secciones",
          "Diseño visual personalizado",
          "Estructura de contenido orientada a la conversión",
          "Desarrollo responsive (móvil, tablet y ordenador)",
          "Formularios de contacto y/o integración con WhatsApp",
          "Botones y llamadas a la acción",
          "Configuración SEO básica",
          "Publicación y pruebas de funcionamiento",
        ],
      },
      {
        name: "Web para empresas",
        price: "900 €",
        amount: 900,
        description: "Una presencia digital completa para empresas y negocios que necesitan presentar su propuesta, organizar sus servicios y transmitir confianza.",
        time: "3-4 semanas",
        items: [
          "Web multipágina de entre 4 y 5 páginas",
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
        name: "Web a medida",
        price: "1.200 €",
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
        price: "250 a 400 € al mes",
        description: "Configuración de campañas de búsqueda y del seguimiento de conversiones, y gestión mensual con informe.",
        note: "La puesta en marcha se presupuesta según el alcance. La inversión en anuncios la pagas directamente a Google, desde tu propia cuenta.",
      },
      {
        name: "Plan mensual",
        price: "80 a 120 € al mes",
        description: "Mantenimiento de la web, cambios menores, revisión de datos y mejoras, con un informe cada mes.",
      },
    ],
    footnote: "Cada proyecto se define alrededor del negocio, no de una lista rígida de funcionalidades.",
  },

  /**
   * Adquisición digital: continuación natural de la web. Sin promesas de
   * resultados. Gestión mensual desde 250 € (mínimo del complemento Google Ads
   * de este mercado); la puesta en marcha se presupuesta según el alcance.
   */
  acquisition: {
    label: "Después de publicar",
    title: "Tu web es el comienzo, no el final.",
    intro:
      "Una vez publicada, podemos trabajar en atraer potenciales clientes y convertir tu presencia digital en un canal de adquisición. Analizamos tu negocio y elegimos las plataformas que mejor se adaptan a tus objetivos.",
    channels: [
      {
        name: "Google Ads",
        text: "Capta personas que ya están buscando tus productos o servicios mediante campañas en Google.",
      },
      {
        name: "Meta Ads",
        text: "Llega a nuevas audiencias y promociona tus productos o servicios mediante campañas en Instagram y Facebook.",
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
    closing: "Una estrategia adaptada a lo que vendes, a quién quieres llegar y a los objetivos de tu negocio.",
    price: "Gestión mensual desde 250 €",
    priceNote: "La inversión publicitaria se abona por separado.",
    cta: "Consultar por campañas",
  },

  /** Base: sección Proceso de la home, resumida a 5 pasos. */
  process: {
    label: "Proceso",
    title: "De la primera conversación al lanzamiento.",
    steps: [
      { title: "Primera conversación", text: "Conozco tu negocio, tu público y qué tiene que conseguir la web." },
      { title: "Presupuesto", text: "Te envío alcance, plazos e inversión por escrito." },
      { title: "Diseño", text: "Estructura primero, diseño después. Lo revisas y ajustamos antes de desarrollar." },
      { title: "Desarrollo y pruebas", text: "Construyo la web y la pruebo en móvil y ordenador." },
      { title: "Lanzamiento", text: "Publicación, medición configurada y últimos ajustes." },
    ],
    note: "En una landing, la conversación, el presupuesto y el diseño ocupan la primera semana, y el desarrollo la segunda.",
    closing: "Alcance claro. Comunicación clara. Sin sorpresas.",
  },

  about: {
    label: "Quién soy",
    title: "Una sola persona, de la charla al anuncio.",
    text: "Soy Jose Del Valle. Trabajo de forma independiente: la persona con la que hablas es la que diseña y desarrolla tu web, y la que después gestiona tus campañas.",
    facts: [
      ["Base", "Buenos Aires, Argentina"],
      ["Modalidad", "En remoto"],
      ["Trabajo con", "Empresas y pequeños negocios"],
    ],
    photoAlt: "Jose Del Valle, diseñador y desarrollador web",
  },

  /**
   * Respuestas con datos confirmados por Jose: dominio y hosting los paga el
   * cliente; los cambios entran en el plan mensual; soporte de 14 días
   * (contrato, cláusula 10); pago en dos partes (cláusula 4.2).
   * Facturación: Jose factura como servicio al exterior (factura C o E), sin
   * IVA. Confirmar con su contador antes del lanzamiento.
   */
  faq: {
    label: "Preguntas frecuentes",
    title: "Lo que suelen preguntarme antes de empezar.",
    items: [
      {
        q: "¿Cuánto cuesta y cómo se paga?",
        a: "Tienes los precios de referencia más arriba. Después de la primera conversación recibes un presupuesto por escrito con el importe exacto. Se paga en dos partes: al inicio y antes de publicar.",
      },
      {
        q: "¿El dominio y el hosting están incluidos?",
        a: "No. Se contratan a tu nombre y los pagas directamente tú. Te ayudo a elegirlos y a configurarlos, y siempre quedan bajo tu titularidad.",
      },
      {
        q: "¿Puedo actualizar la web yo mismo?",
        a: "Los cambios los hago yo dentro del plan mensual, así no tienes que ocuparte de la parte técnica. Si vas a actualizar contenido a menudo, en una web a medida se puede añadir un gestor de contenidos.",
      },
      {
        q: "¿Qué necesito para empezar?",
        a: "Contarme a qué se dedica tu negocio, a quién vende y qué quieres conseguir con la web. Con eso preparo el presupuesto.",
      },
      {
        q: "¿Qué pasa después de publicar?",
        a: "Tienes 14 días de soporte para corregir errores y hacer ajustes menores. Después, si quieres, seguimos con el plan mensual de mantenimiento y mejoras.",
      },
      {
        q: "¿Garantizas resultados con Google Ads?",
        a: "No. Nadie puede garantizarlos con seriedad. Lo que sí garantizo es medición clara, un informe cada mes y acceso total a tu cuenta.",
      },
      {
        q: "¿Cuánto hay que invertir en publicidad?",
        a: "Depende del sector y de la zona. Antes de empezar reviso cuánto cuesta cada clic en tus búsquedas y te propongo un presupuesto inicial. Ese dinero lo pagas directamente a Google.",
      },
      {
        q: "¿Cómo trabajamos a distancia y cómo facturas?",
        a: "Por videollamada, WhatsApp y email. Facturo desde Argentina como servicio al exterior, por lo que la factura no incluye IVA. Si tu empresa está en España, tu gestoría te indicará cómo declararla.",
      },
    ],
  },

  contact: {
    label: "Contacto",
    title: "Cuéntame qué necesitas y te respondo con un presupuesto concreto.",
    response: "Te respondo en menos de 24 horas laborables.",
    direct: "¿Prefieres escribir directamente?",
    whatsapp: "Escribir por WhatsApp",
  },

  form: {
    name: "Nombre",
    email: "Email",
    phone: "WhatsApp o teléfono (opcional)",
    need: "¿Qué necesitas?",
    needOptions: ["Web nueva", "Rediseño", "Landing page", "Google Ads", "No lo tengo claro"],
    message: "Cuéntame un poco más (opcional)",
    messagePlaceholder: "Por ejemplo: a qué se dedica tu negocio y qué te gustaría conseguir.",
    submit: "Enviar consulta",
    sending: "Enviando...",
    privacy: "Responsable: José Ruben Del Valle Martínez. Finalidad: responder a tu consulta. Derechos de acceso, rectificación y supresión escribiendo a hola@josedelvalle.dev. Más información en la",
    privacyLink: "política de privacidad",
    error: "No se ha podido enviar la consulta. Inténtalo de nuevo o escríbeme por WhatsApp.",
  },

  /** Página de gracias (/es/diseno-web/gracias): destino del formulario y conversión. */
  thanks: {
    title: "Gracias, he recibido tu consulta.",
    text: "Te respondo en menos de 24 horas laborables al email que has dejado.",
    whatsapp: "Si es urgente, escríbeme por WhatsApp",
    back: "Volver a la página",
  },

  footer: {
    tagline: "Estudio independiente de Jose Del Valle.",
    location: "Buenos Aires, Argentina",
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    legal: "Aviso legal",
    consent: "Configurar cookies",
  },

  /** Textos legales: /privacidad y /aviso-legal. */
  legal: legalEs,
};

export default es;
