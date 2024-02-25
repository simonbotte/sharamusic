export default defineI18nConfig(() => ({
    legacy: false,
    locales: ["fr", "us", "de", "it"],
    locale: "fr",
    messages: {
        us: {
            album: "Album",
            song: "Song",
            artist: "Artist",
            share: "Share",
            search: "Search",
            redirecting: "Redirecting...",
        },
        fr: {
            album: "Album",
            song: "Morceau",
            artist: "Artiste",
            share: "Partager",
            search: "Rechercher",
            redirecting: "Redirection...",
        },
        de:{
            album: "Album",
            song: "Lied",
            artist: "Künstler",
            share: "Teilen",
            search: "Suche",
            redirecting: "Umleiten...",
        },
        it:{
            album: "Album",
            song: "Canzone",
            artist: "Artista",
            share: "Condividi",
            search: "Cerca",
            redirecting: "Reindirizzamento...",
        }
    },
}));
