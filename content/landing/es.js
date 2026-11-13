/**
 * Copy de la landing comercial - España.
 * Tuteo, precios en EUR. Ruta: /es/diseno-web
 *
 * Regla: solo hechos verificables. Ningún testimonio, cifra ni cliente
 * se redacta acá si no viene de material real.
 */
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
    fromLabel: "Desde",
    timeLabel: "Plazo",
    listLabel: "Qué abarca",
    cta: "Pedir presupuesto",
    tiers: [
      {
        name: "Landing page",
        price: "500 €",
        description: "Para necesidades digitales concretas.",
        time: "1-2 semanas",
        items: ["Landing pages", "Lanzamientos", "Nuevos servicios", "Campañas"],
      },
      {
        name: "Web para empresas",
        price: "900 €",
        description: "Para empresas listas para replantear su presencia digital.",
        time: "Según alcance",
        items: ["Rediseño web", "Webs corporativas", "UX/UI", "Desarrollo", "Analítica", "SEO técnico básico"],
      },
      {
        name: "Web a medida",
        price: "1.200 €",
        description: "Para experiencias digitales más complejas.",
        time: "Según alcance",
        items: ["Integraciones", "CMS", "CRM", "Automatizaciones", "Contenido dinámico", "Interacciones avanzadas"],
      },
    ],
    addonsLabel: "Complementos",
    addons: [
      {
        name: "Google Ads",
        price: "A consultar",
        description: "Configuración de campañas de búsqueda y del seguimiento de conversiones, y gestión mensual con informe.",
        note: "La inversión en anuncios la pagas aparte, directamente a Google, desde tu propia cuenta.",
      },
      {
        name: "Plan mensual",
        price: "A consultar",
        description: "Mantenimiento de la web, cambios menores, revisión de datos y mejoras, con un informe cada mes.",
      },
    ],
    footnote: "Cada proyecto se define alrededor del negocio, no de una lista rígida de funcionalidades.",
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
    title: "Pequeño por diseño.",
    text: "Soy Jose Del Valle. Trabajo de forma independiente: la persona con la que hablas es la que diseña y desarrolla tu web, y la que después gestiona tus campañas.",
    facts: [
      ["Base", "Buenos Aires, Argentina"],
      ["Modalidad", "En remoto"],
      ["Trabajo con", "Empresas y pequeños negocios"],
    ],
    photoAlt: "Jose Del Valle, diseñador y desarrollador web",
  },
};

export default es;
