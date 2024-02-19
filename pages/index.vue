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
        if(query.value.length < 2) {
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
    }, 200);
};
</script>

<template>
    <section class="home px-4 pt-2 w-full max-w-5xl mx-auto">
        <div class="sticky top-0 py-4 bg-white z-20">
            <input
                class="border-slate-600 border rounded-md px-2 py-1 w-full focus:outline-zinc-600"
                placeholder="Rechercher"
                type="text"
                v-model="query"
                v-on:input="search"
            />
        </div>

        <div class="albums flex flex-col">
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
