/**
 * Copy de la landing comercial - Argentina.
 * Voseo, precios en USD. Ruta: /diseno-web
 *
 * Regla: solo hechos verificables. Ningún testimonio, cifra ni cliente
 * se redacta acá si no viene de material real.
 */
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

  about: {
    label: "Quién soy",
    title: "Pequeño por diseño.",
    text: "Soy Jose Del Valle. Trabajo de forma independiente: la persona con la que hablás es la que diseña y desarrolla tu sitio, y la que después gestiona tus campañas.",
    facts: [
      ["Base", "Buenos Aires, Argentina"],
      ["Modalidad", "Remoto"],
      ["Trabajo con", "Empresas y pequeños negocios"],
    ],
    photoAlt: "Jose Del Valle, diseñador y desarrollador web",
  },
};

export default ar;
