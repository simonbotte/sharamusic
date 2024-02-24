<script setup>
import { createCanvas, Canvas, loadImage } from "canvas";
const route = useRoute();
const link64 = route.params.link;
const link = ref(atob(link64));
const regex = /\/(album|song|artist)\/([^\/]+)\/([^\/?]+).*?(?:\?i=([^&]+))?/;
const match = link.value.match(regex);

if (match) {
    const urlType = match[1]; // Type : album
    const urlIdMainContent = match[3]; // Identifiant de la chanson (peut être undefined)
    const urlIdSong = match[4]; // Deuxième identifiant de la chanson (peut être undefined)
    const type = ref("");
    const contentId = ref("");
    if(urlType === "artist") {
        type.value = "artists";
        contentId.value = urlIdMainContent;
    } else if(urlType === "song" && urlIdSong) {
        type.value = "songs";
        contentId.value = urlIdSong;
    } else {
        type.value = "albums";
        contentId.value = urlIdMainContent;
    }

    const redirect = `/${type.value}/${contentId.value}`;
    await navigateTo(redirect);
} else {
    console.log("Le lien ne correspond pas au modèle spécifié.");
}
</script>

<template>
    <span class="text-zinc-50">
        {{ link }}
    </span>
</template>
