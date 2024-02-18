<script setup>
const props = defineProps({
    album: Object,
});
const { $getArtwork } = useNuxtApp();
</script>

<template>
    <div
        class="album flex flex-col items-center gap-2 py-4 px-3 w-1/2 rounded-md"
        :style="`background-color:#${album.attributes.artwork.bgColor}; color:#${album.attributes.artwork.textColor1}`"
    >
        <div class="album__artwork shrink-0 flex w-full mb-4">
            <img
                class="rounded-md"
                :src="$getArtwork(album.attributes.artwork.url, 1080, 1080)"
            />
        </div>
        <div class="album__info overflow-hidden w-full flex flex-col gap-1">
            <p
                class="font-bold whitespace-nowrap overflow-hidden text-ellipsis leading-4"
            >
                {{ album.attributes.name }}
            </p>
            <p class="whitespace-nowrap overflow-hidden text-ellipsis opacity-70 leading-4">
                Album · {{ album.attributes.artistName }}
            </p>
        </div>
        <div class="album__info overflow-hidden w-full flex">
            <p class="text-xs opacity-70 leading-3">On Apple Music</p>
        </div>
    </div>
</template>
