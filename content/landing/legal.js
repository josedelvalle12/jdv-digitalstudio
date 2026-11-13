/**
 * Textos legales de la landing (política de privacidad y aviso legal), por mercado.
 *
 * BORRADOR: redactado a partir de cómo funciona hoy el sitio (formulario por
 * email, sin medición). Antes de lanzar conviene que los revise un asesor, y
 * hay que actualizarlos cuando se sume GA4 / Google Ads (etapa 8).
 *
 * Cada documento: { slug, title, updated, intro, sections: [{ h, p?: [], list?: [] }] }.
 */
import { CONTACT } from "./contact";

export const OWNER = {
  name: "José Ruben Del Valle Martínez",
  cuit: "20-43574906-3",
  address: "Av. Directorio 2351, CP 1406, Ciudad Autónoma de Buenos Aires, Argentina",
  phone: "+54 9 11 3819-8682",
  email: CONTACT.email,
  brand: "JDV Digital Studio",
};

const UPDATED = "13 de noviembre de 2026";
const { name, cuit, address, phone, email, brand } = OWNER;

/* ------------------------------------------------------------------ */
/* Argentina                                                           */
/* ------------------------------------------------------------------ */
export const legalAr = {
  privacy: {
    slug: "privacidad",
    title: "Política de privacidad",
    updated: `Última actualización: ${UPDATED}`,
    intro: "Acá te cuento qué datos recibo cuando me escribís, para qué los uso y qué derechos tenés sobre ellos.",
    sections: [
      {
        h: "Quién es el responsable",
        p: [
          `El responsable del tratamiento de tus datos es ${name}, CUIT ${cuit}, con domicilio en ${address}. Trabajo bajo la marca ${brand}.`,
          `Para cualquier consulta sobre tus datos, escribime a ${email}.`,
        ],
      },
      {
        h: "Qué datos recibo",
        p: ["Solo los que completás vos en el formulario de contacto:"],
        list: ["Nombre", "Email", "WhatsApp (opcional)", "Qué necesitás", "Mensaje (opcional)"],
        after: [
          "Si preferís escribirme por WhatsApp o por email, recibo los datos que aparecen en ese canal, como tu número y el nombre de tu perfil.",
          "No necesito datos sensibles. Te pido que no los incluyas en el mensaje.",
        ],
      },
      {
        h: "Para qué los uso",
        p: [
          "Para responder tu consulta y, si corresponde, enviarte una propuesta por escrito. No uso tus datos para mandarte boletines ni publicidad, y no los vendo ni los cedo a terceros con fines comerciales.",
        ],
      },
      {
        h: "Por qué puedo usarlos",
        p: [
          "Trato tus datos con tu consentimiento, que das al enviar el formulario o al escribirme por otro canal. Podés retirarlo en cualquier momento escribiéndome a mi email.",
        ],
      },
      {
        h: "Con quién los comparto",
        p: ["Para poder recibir y responder tu consulta uso estos proveedores:"],
        list: [
          "Resend: envía a mi casilla el correo con lo que completaste en el formulario.",
          "Google (Gmail): recibo y respondo mis correos.",
          "Google (Analytics y Ads): medición de visitas y de anuncios, según tu elección en el aviso de cookies.",
          "Railway: aloja este sitio y procesa el envío del formulario.",
          "WhatsApp (Meta): solo si me escribís por ese canal.",
        ],
        after: [
          "Estos proveedores pueden almacenar o procesar información en servidores fuera de Argentina, incluido Estados Unidos. No comparto tus datos con nadie más, salvo que una autoridad me lo exija legalmente.",
        ],
      },
      {
        h: "Cuánto tiempo los conservo",
        p: [
          "Mientras sea necesario para atender tu consulta y, si trabajamos juntos, durante los plazos que exijan las obligaciones contables e impositivas. Podés pedirme que borre tu consulta cuando quieras.",
        ],
      },
      {
        h: "Tus derechos",
        p: [
          `Tenés derecho a acceder a tus datos, rectificarlos, actualizarlos y pedir que se supriman (Ley 25.326). Para ejercerlos, escribime a ${email}. Te respondo dentro de los plazos que fija la ley.`,
          "La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.",
        ],
      },
      {
        h: "Cookies y medición",
        p: [
          "Este sitio usa Google Analytics y Google Ads para medir las visitas, saber desde qué anuncio llegaste y si enviaste una consulta. Estas herramientas usan cookies y reciben datos como tu dirección IP, el dispositivo y las páginas que visitás.",
          "Te aviso con un cartel al entrar. Podés no permitirlo en ese momento o cambiar tu decisión cuando quieras desde “Preferencias de medición”, en el pie de la página. Si no lo permitís, no se instalan cookies de medición ni de publicidad; Google puede recibir señales de visita sin cookies ni identificadores, que usa para estimar resultados agregados.",
          "No uso estas herramientas para mostrarte publicidad personalizada ni para crear listas de remarketing. Las tipografías se cargan desde Google Fonts, por lo que Google recibe tu dirección IP cuando abrís la página.",
        ],
      },
      {
        h: "Seguridad",
        p: [
          "El sitio usa conexión cifrada (HTTPS) y el formulario tiene medidas contra el envío automatizado. Ningún sistema es infalible, pero cuido los datos que me confiás.",
        ],
      },
      {
        h: "Cambios en esta política",
        p: ["Si cambio algo importante, actualizo esta página y la fecha de arriba."],
      },
    ],
  },

  notice: {
    slug: "aviso-legal",
    title: "Aviso legal",
    updated: `Última actualización: ${UPDATED}`,
    intro: "Datos de quien está detrás de este sitio y condiciones básicas de uso.",
    sections: [
      {
        h: "Titular del sitio",
        list: [
          `Titular: ${name}`,
          `Marca: ${brand}`,
          `CUIT: ${cuit}`,
          `Domicilio: ${address}`,
          `Email: ${email}`,
          `WhatsApp: ${phone}`,
          "Actividad: diseño y desarrollo web, y gestión de campañas de publicidad online.",
        ],
      },
      {
        h: "Uso del sitio",
        p: [
          "Este sitio presenta mis servicios y permite enviarme consultas. Al usarlo aceptás hacerlo de buena fe y sin interferir en su funcionamiento.",
        ],
      },
      {
        h: "Precios y contratación",
        p: [
          "Los precios que figuran con la palabra “Desde” son orientativos y no constituyen una oferta vinculante. Cada trabajo se formaliza con una propuesta y un contrato por escrito, donde se detallan alcance, plazos e inversión.",
        ],
      },
      {
        h: "Propiedad intelectual",
        p: [
          `Los textos, diseños, imágenes y el código de este sitio son de ${name}, salvo que se indique otra cosa. Las capturas de proyectos de clientes pertenecen a sus respectivos titulares y se muestran como referencia. No podés copiar ni reutilizar el contenido sin mi autorización previa.`,
        ],
      },
      {
        h: "Responsabilidad",
        p: [
          "Me esfuerzo por mantener la información actualizada, pero no garantizo que esté libre de errores ni que el sitio funcione sin interrupciones. Sobre la publicidad online: no se pueden garantizar resultados, y nada en este sitio debe leerse como una promesa de ventas o consultas.",
        ],
      },
      {
        h: "Enlaces a otros sitios",
        p: [
          "Este sitio puede enlazar a páginas de terceros, como los proyectos que mostré. No controlo su contenido y no me hago responsable de él.",
        ],
      },
      {
        h: "Datos personales",
        p: ["El tratamiento de tus datos se explica en la política de privacidad."],
        link: "privacy",
      },
      {
        h: "Ley aplicable",
        p: [
          "Este aviso se rige por las leyes de la República Argentina. Para cualquier controversia, serán competentes los tribunales que correspondan según la normativa vigente, sin perjuicio de los derechos que la ley te reconozca como consumidor.",
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* España                                                              */
/* ------------------------------------------------------------------ */
export const legalEs = {
  privacy: {
    slug: "privacidad",
    title: "Política de privacidad",
    updated: `Última actualización: ${UPDATED}`,
    intro: "Aquí te cuento qué datos recibo cuando me escribes, para qué los uso y qué derechos tienes sobre ellos.",
    sections: [
      {
        h: "Quién es el responsable",
        p: [
          `El responsable del tratamiento de tus datos es ${name}, CUIT ${cuit} (número de identificación fiscal argentino), con domicilio en ${address}. Trabajo bajo la marca ${brand}.`,
          `Para cualquier consulta sobre tus datos, escríbeme a ${email}.`,
        ],
      },
      {
        h: "Qué datos recibo",
        p: ["Solo los que rellenas tú en el formulario de contacto:"],
        list: ["Nombre", "Email", "WhatsApp (opcional)", "Qué necesitas", "Mensaje (opcional)"],
        after: [
          "Si prefieres escribirme por WhatsApp o por email, recibo los datos que aparecen en ese canal, como tu número y el nombre de tu perfil.",
          "No necesito datos sensibles. Te pido que no los incluyas en el mensaje.",
        ],
      },
      {
        h: "Para qué los uso",
        p: [
          "Para responder a tu consulta y, si corresponde, enviarte un presupuesto por escrito. No uso tus datos para enviarte boletines ni publicidad, y no los vendo ni los cedo a terceros con fines comerciales.",
        ],
      },
      {
        h: "Base legal",
        p: [
          "Trato tus datos con tu consentimiento (artículo 6.1.a del RGPD), que das al enviar el formulario o al escribirme por otro canal, y para aplicar medidas precontractuales a petición tuya, como preparar un presupuesto (artículo 6.1.b). Puedes retirar tu consentimiento en cualquier momento escribiéndome a mi email.",
        ],
      },
      {
        h: "Con quién los comparto",
        p: ["Para poder recibir y responder tu consulta uso estos proveedores:"],
        list: [
          "Resend: envía a mi casilla el correo con lo que has rellenado en el formulario.",
          "Google (Gmail): recibo y respondo mis correos.",
          "Google (Analytics y Ads): medición de visitas y de anuncios, según tu elección en el aviso de cookies.",
          "Railway: aloja este sitio y procesa el envío del formulario.",
          "WhatsApp (Meta): solo si me escribes por ese canal.",
        ],
        after: [
          "No comparto tus datos con nadie más, salvo que una autoridad me lo exija legalmente.",
        ],
      },
      {
        h: "Transferencias internacionales",
        p: [
          "Como me encuentro en Argentina, tus datos se tratan fuera de la Unión Europea. Argentina cuenta con una decisión de adecuación de la Comisión Europea. Además, algunos de los proveedores anteriores pueden procesar información en Estados Unidos y declaran aplicar las garantías que prevé el RGPD, como las cláusulas contractuales tipo o el Marco de Privacidad de Datos UE-EE. UU., según el caso.",
        ],
      },
      {
        h: "Cuánto tiempo los conservo",
        p: [
          "Mientras sea necesario para atender tu consulta y, si trabajamos juntos, durante los plazos que exijan las obligaciones contables y fiscales. Puedes pedirme que borre tu consulta cuando quieras.",
        ],
      },
      {
        h: "Tus derechos",
        p: [
          `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiéndome a ${email}. Te responderé en el plazo de un mes.`,
          "Si consideras que no he tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
        ],
      },
      {
        h: "Cookies y medición",
        p: [
          "Este sitio usa Google Analytics y Google Ads para medir las visitas, saber desde qué anuncio llegas y si envías una consulta. Estas herramientas usan cookies y reciben datos como tu dirección IP, el dispositivo y las páginas que visitas.",
          "Solo las activo si las aceptas en el aviso que aparece al entrar. Si las rechazas o ignoras el aviso, no se instalan cookies de medición ni de publicidad; Google puede recibir señales de visita sin cookies ni identificadores, que usa para estimar resultados agregados. Puedes cambiar tu decisión cuando quieras desde “Configurar cookies”, en el pie de la página.",
          "No uso estas herramientas para mostrarte publicidad personalizada ni para crear listas de remarketing. Las tipografías se cargan desde Google Fonts, por lo que Google recibe tu dirección IP cuando abres la página.",
        ],
      },
      {
        h: "Seguridad",
        p: [
          "El sitio usa conexión cifrada (HTTPS) y el formulario tiene medidas contra el envío automatizado. Ningún sistema es infalible, pero cuido los datos que me confías.",
        ],
      },
      {
        h: "Cambios en esta política",
        p: ["Si cambio algo importante, actualizo esta página y la fecha de arriba."],
      },
    ],
  },

  notice: {
    slug: "aviso-legal",
    title: "Aviso legal",
    updated: `Última actualización: ${UPDATED}`,
    intro: "Datos de quien está detrás de este sitio y condiciones básicas de uso.",
    sections: [
      {
        h: "Titular del sitio",
        list: [
          `Titular: ${name}`,
          `Marca: ${brand}`,
          `CUIT (número de identificación fiscal argentino): ${cuit}`,
          `Domicilio: ${address}`,
          `Email: ${email}`,
          `WhatsApp: ${phone}`,
          "Actividad: diseño y desarrollo web, y gestión de campañas de publicidad online.",
        ],
      },
      {
        h: "Uso del sitio",
        p: [
          "Este sitio presenta mis servicios y permite enviarme consultas. Al usarlo aceptas hacerlo de buena fe y sin interferir en su funcionamiento.",
        ],
      },
      {
        h: "Precios y contratación",
        p: [
          "Los precios que figuran con la palabra “Desde” son orientativos y no constituyen una oferta vinculante. Cada trabajo se formaliza con una propuesta y un contrato por escrito, donde se detallan alcance, plazos e inversión.",
          "Facturo desde Argentina como servicio al exterior, por lo que la factura no incluye IVA.",
        ],
      },
      {
        h: "Propiedad intelectual",
        p: [
          `Los textos, diseños, imágenes y el código de este sitio son de ${name}, salvo que se indique otra cosa. Las capturas de proyectos de clientes pertenecen a sus respectivos titulares y se muestran como referencia. No puedes copiar ni reutilizar el contenido sin mi autorización previa.`,
        ],
      },
      {
        h: "Responsabilidad",
        p: [
          "Me esfuerzo por mantener la información actualizada, pero no garantizo que esté libre de errores ni que el sitio funcione sin interrupciones. Sobre la publicidad online: no se pueden garantizar resultados, y nada en este sitio debe leerse como una promesa de ventas o clientes.",
        ],
      },
      {
        h: "Enlaces a otros sitios",
        p: [
          "Este sitio puede enlazar a páginas de terceros, como los proyectos que muestro. No controlo su contenido y no me hago responsable de él.",
        ],
      },
      {
        h: "Datos personales",
        p: ["El tratamiento de tus datos se explica en la política de privacidad."],
        link: "privacy",
      },
      {
        h: "Ley aplicable",
        p: [
          "Este aviso se rige por las leyes de la República Argentina. Para cualquier controversia, serán competentes los tribunales que correspondan según la normativa vigente, sin perjuicio de los derechos que la ley te reconozca como consumidor.",
        ],
      },
    ],
  },
};
