<script setup>
const query = ref("");
const { data } = await useFetch("/api/security/token");
const token = ref(data.value.token);
const temporizer = ref(null);
const albums = ref([]);
const songs = ref([]);
const search = async () => {
    if (temporizer.value) {
        clearTimeout(temporizer.value);
    }
    temporizer.value = setTimeout(async () => {
        let querySerialized = query.value;
        querySerialized = querySerialized.replace(/\s/g, "+");
        const url = `https://api.music.apple.com/v1/catalog/fr/search?term=${querySerialized}&types=albums,songs&limit=15`;
        const { data, error } = await useFetch(url, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });
        albums.value = data.value.results.albums.data;
        songs.value = data.value.results.songs.data;
    }, 500);
};
const getArtwork = (url, width, height) => {
    return url.replace("{w}", width).replace("{h}", height);
};
</script>

<template>
    <section class="home px-8 max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold underline">Home</h1>
        <input class="border-slate-600 border rounded" type="text" v-model="query" v-on:input="search" />
        <div class="albums flex flex-col">
            <ResultAlbum v-for="album in albums" :key="album.id" :album="album" />
        </div>
    </section>
</template>
