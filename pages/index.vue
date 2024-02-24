<script setup>
const query = ref("");
const { data } = await useFetch("/api/security/token");
const token = ref(data.value.token);
const temporizer = ref(null);
const albums = ref([]);
const songs = ref([]);
const artists = ref([]);
const search = async () => {
    if (temporizer.value) {
        clearTimeout(temporizer.value);
    }
    temporizer.value = setTimeout(async () => {
        if (query.value.length < 2) {
            albums.value = [];
            songs.value = [];
            artists.value = [];
            return;
        }
        let querySerialized = query.value;
        querySerialized = querySerialized.replace(/\s/g, "+");
        const url = `https://api.music.apple.com/v1/catalog/fr/search?term=${querySerialized}&types=albums,songs,artists&limit=15`;
        const { data, error } = await useFetch(url, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });
        albums.value = data.value.results.albums.data;
        songs.value = data.value.results.songs.data;
        artists.value = data.value.results.artists.data;

        artists.value = artists.value.slice(0, 3);
        albums.value = albums.value.slice(0, 5);
    }, 200);
};
</script>

<template>
    <section class="home pt-0 w-full mx-auto">
        <div
            class="sticky container mx-auto px-4 top-0 py-4 bg-zinc-900/40 z-20 backdrop-blur-sm"
        >
            <div class="relative">
                <input
                    class="border-zinc-700 border rounded-md pl-8 py-1 pr-4 w-full bg-zinc-900 focus:outline-zinc-600 text-zinc-50 placeholder:text-zinc-400"
                    placeholder="Rechercher"
                    type="text"
                    v-model="query"
                    v-on:input="search"
                />
                <SymboleMagnifyingGlass
                    class="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                />
            </div>
        </div>

        <div class="flex flex-col pt-0 container px-4 mx-auto">
            <SearchArtiste
                v-for="artist in artists"
                :key="artist.id"
                :artist="artist"
            />
            <SearchAlbum
                v-for="album in albums"
                :key="album.id"
                :album="album"
            />
            <SearchSong v-for="song in songs" :key="song.id" :song="song" />
        </div>
    </section>
</template>
