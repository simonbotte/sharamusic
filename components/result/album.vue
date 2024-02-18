<script setup>
    const props = defineProps({
        album: Object,
    });
    const {$getArtwork} = useNuxtApp()
</script>

<template>
    <div class="album flex items-center border-b border-b-zinc-400 gap-2 py-2">
        <div class="album__artwork">
            <img class="rounded-md border border-zinc-400" :width="150" :src="$getArtwork(album.attributes.artwork.url, 300, 300)" />
        </div>
        <div class="album__info">
            <p class="font-bold">{{ album.attributes.name }}</p>
            <p>Album · {{ album.attributes.artistName }}</p>
        </div>
    </div>
</template>