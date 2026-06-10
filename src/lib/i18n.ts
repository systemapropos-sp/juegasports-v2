export type Language = "en" | "es";

export const translations = {
  en: {
    // Navbar
    sports: "Sports",
    sportsV2: "Sports v2",
    deportes: "Sports",
    tickets: "Tickets",
    resultados: "Results",
    balance: "Balance",
    help: "Help",
    settings: "Settings",
    notifications: "Notifications",
    calendar: "Calendar",

    // Sports Sidebar
    majorLeagueBaseball: "Major League Baseball",
    ligaMexicanaBeisbol: "Liga Mexicana de Beisbol",
    nationalBasketballAssociation: "National Basketball Association",
    womensNBA: "Women's National Basketball Association",
    baseballPlayers: "Baseball Players",
    nbaSolo: "NBA Solo",
    soccer: "Soccer",

    // Odds Table
    hora: "Time",
    equipo: "Team",
    ml: "M.L.",
    overUnder: "O/U",
    rl: "R/L",
    srl: "SRL",
    soloPos: "SOLO(+)",
    soloNeg: "SOLO(-)",
    rla: "RLA",
    alML: "Al ML",
    empate: "Draw",
    categoria: "Category",
    precioMas: "Price +",
    precioMenos: "Price -",
    locked: "Locked",

    // Period tabs
    juegoCompleto: "Full Game",
    primeraMitad: "First Half",
    primeraTercia: "First Third",
    extra: "Extra",
    segundaMitad: "Second Half",
    periodo1: "Period #1",
    periodo2: "Period #2",
    periodo3: "Period #3",
    periodo4: "Period #4",

    // Bet Slip
    teaser: "Teaser",
    teaserIF: "Teaser IF",
    jugadasRegulares: "Regular Plays",
    noSelections: "No selections",
    noSelectionsMsg: "No plays selected",
    jugada: "Play",
    linea: "Line",
    premio: "Prize",
    puntos: "Points",
    activateIf: "Activate if",
    cantidad: "Amount",
    pago: "Payout",
    guardar: "SAVE",
    limpiar: "CLEAR",

    // Modals
    ayuda: "Help",
    ayudaBaseball: "Baseball",
    ayudaBaloncesto: "Basketball",
    ayudaFootball: "Football",
    ayudaHockey: "Hockey",
    ayudaSoccer: "Soccer",
    ayudaTiza: "Chalk",
    cancelar: "Cancel",
    notificacionRetiro: "Withdrawal Notification",
    fecha: "Date",
    horaLabel: "Time",
    cantidadLabel: "Amount",
    notificar: "Notify",
    generarCodigo: "Generate Withdrawal Code",
    generarCodigoTitle: "Generate code for balance withdrawal",
    generar: "Generate",
    confirmacion: "Confirmation",
    confirmacionLimpiar: "Are you sure you want to clear all plays?",
    confirmar: "Confirm",
    english: "English",
    espanol: "Spanish",

    // Rules text
    rulesBaseball:
      "Baseball rules: The game must go 8.5 innings for action. Extra innings count for all bets. Pitcher changes void listed pitcher bets only. Suspended games continue from point of suspension within 36 hours.",
    rulesBasketball:
      "Basketball rules: Games must go 43 minutes for action. Overtime counts for all bets except specific quarter/half bets. The result is official after the final buzzer.",
    rulesFootball:
      "Football rules: Games must go 55 minutes for action. Overtime counts for all bets. College football overtime rules apply accordingly.",
    rulesHockey:
      "Hockey rules: Games must go 58 minutes for action. Shootouts count for moneyline only. Overtime counts for all bets except period-specific wagers.",
    rulesSoccer:
      "Soccer rules: 90 minutes of play plus stoppage time. Extra time and penalties do not count unless specified. Own goals count for the credited team.",
    rulesTiza:
      "Chalk rules: Follow standard sport-specific rules. Maximum payout limits apply. Management reserves the right to adjust limits.",

    // Results dropdown
    mlb: "MLB",
    lmb: "LMB",
    lidom: "LIDOM",
    nba: "NBA",
    wnba: "WNBA",
    cbb: "CBB",
    nhl: "NHL",
    nfl: "NFL",
    cfb: "CFB",
    cfl: "CFL",
    ufc: "UFC",
    gallos: "GALLOS",

    // Empty states
    emptyBetSlip: "Your bet slip is empty",
    selectOdds: "Click on any odds to add selections",

    // PWA Install
    installApp: "Install App",
    installPrompt: "Install JuegaSports for quick access",
    dismiss: "Dismiss",
  },
  es: {
    // Navbar
    sports: "Deportes",
    sportsV2: "Sports v2",
    deportes: "Deportes",
    tickets: "Tickets",
    resultados: "Resultados",
    balance: "Balance",
    help: "Ayuda",
    settings: "Configuracion",
    notifications: "Notificaciones",
    calendar: "Calendario",

    // Sports Sidebar
    majorLeagueBaseball: "Major League Baseball",
    ligaMexicanaBeisbol: "Liga Mexicana de Beisbol",
    nationalBasketballAssociation: "National Basketball Association",
    womensNBA: "Women's National Basketball Association",
    baseballPlayers: "Baseball Players",
    nbaSolo: "NBA Solo",
    soccer: "Soccer",

    // Odds Table
    hora: "Hora",
    equipo: "Equipo",
    ml: "M.L.",
    overUnder: "O/U",
    rl: "R/L",
    srl: "SRL",
    soloPos: "SOLO(+)",
    soloNeg: "SOLO(-)",
    rla: "RLA",
    alML: "Al ML",
    empate: "Empate",
    categoria: "Categoria",
    precioMas: "Precio a mas",
    precioMenos: "Precio a menos",
    locked: "Bloqueado",

    // Period tabs
    juegoCompleto: "Juego Compl.",
    primeraMitad: "1ra Mitad",
    primeraTercia: "1ra Tercia",
    extra: "Extra",
    segundaMitad: "2da Mitad",
    periodo1: "Periodo #1",
    periodo2: "Periodo #2",
    periodo3: "Periodo #3",
    periodo4: "Periodo #4",

    // Bet Slip
    teaser: "Teaser",
    teaserIF: "Teaser IF",
    jugadasRegulares: "Jugadas regulares",
    noSelections: "Sin selecciones",
    noSelectionsMsg: "No hay jugadas seleccionadas",
    jugada: "Jugada",
    linea: "Linea",
    premio: "Premio",
    puntos: "Puntos",
    activateIf: "Activate if",
    cantidad: "Cantidad",
    pago: "Pago",
    guardar: "GUARDAR",
    limpiar: "LIMPIAR",

    // Modals
    ayuda: "Ayuda",
    ayudaBaseball: "Baseball",
    ayudaBaloncesto: "Baloncesto",
    ayudaFootball: "Football",
    ayudaHockey: "Hockey",
    ayudaSoccer: "Soccer",
    ayudaTiza: "Tiza",
    cancelar: "Cancelar",
    notificacionRetiro: "Notificacion de retiro",
    fecha: "Fecha",
    horaLabel: "Hora",
    cantidadLabel: "Cantidad",
    notificar: "Notificar",
    generarCodigo: "Generar codigo para retiro",
    generarCodigoTitle: "Generar codigo para retiro de balance",
    generar: "Generar",
    confirmacion: "Confirmacion",
    confirmacionLimpiar: "Esta seguro que desea limpiar todas las jugadas?",
    confirmar: "Confirmar",
    english: "English",
    espanol: "Espanol",

    // Rules text
    rulesBaseball:
      "Reglas de Baseball: El juego debe completar 8.5 entradas para accion. Entradas extras cuentan para todas las apuestas. Cambios de pitcher anulan apuestas de pitcher listado solo. Juegos suspendidos continuan desde el punto de suspension dentro de 36 horas.",
    rulesBasketball:
      "Reglas de Baloncesto: Los juegos deben completar 43 minutos para accion. El tiempo extra cuenta para todas las apuestas excepto apuestas de cuarto/mitad especificos. El resultado es oficial despues de la bocina final.",
    rulesFootball:
      "Reglas de Football: Los juegos deben completar 55 minutos para accion. El tiempo extra cuenta para todas las apuestas. Las reglas de tiempo extra de football colegial aplican en consecuencia.",
    rulesHockey:
      "Reglas de Hockey: Los juegos deben completar 58 minutos para accion. Los shootouts cuentan para moneyline solamente. El tiempo extra cuenta para todas las apuestas excepto apuestas de periodo especifico.",
    rulesSoccer:
      "Reglas de Soccer: 90 minutos de juego mas tiempo de descuento. El tiempo extra y penales no cuentan a menos que se especifique. Los autogoles cuentan para el equipo acreditado.",
    rulesTiza:
      "Reglas de Tiza: Siga las reglas estandar especificas de cada deporte. Aplican limites maximos de pago. La administracion se reserva el derecho de ajustar limites.",

    // Results dropdown
    mlb: "MLB",
    lmb: "LMB",
    lidom: "LIDOM",
    nba: "NBA",
    wnba: "WNBA",
    cbb: "CBB",
    nhl: "NHL",
    nfl: "NFL",
    cfb: "CFB",
    cfl: "CFL",
    ufc: "UFC",
    gallos: "GALLOS",

    // Empty states
    emptyBetSlip: "Tu ticket esta vacio",
    selectOdds: "Haz clic en cualquier cuota para agregar selecciones",

    // PWA Install
    installApp: "Instalar App",
    installPrompt: "Instala JuegaSports para acceso rapido",
    dismiss: "Descartar",
  },
} as const;

export type Translations = typeof translations;

export function t(lang: Language, key: keyof Translations["en"]): string {
  return translations[lang][key] || key;
}
