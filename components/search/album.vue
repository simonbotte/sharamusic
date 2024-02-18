<script setup>
const props = defineProps({
    album: Object,
});
const { $getArtwork } = useNuxtApp();
const hasArtwork = ref(true);
if (props?.album?.attributes?.artwork?.url == undefined) {
    hasArtwork.value = false;
}
</script>

<template>
    <NuxtLink
        v-if="hasArtwork"
        :to="`/albums/${album.id}`"
        class="album flex items-center border-b border-b-zinc-400 gap-2 py-2"
    >
        <div class="album__artwork shrink-0">
            <img
                class="rounded-md border border-zinc-400"
                :width="100"
                :src="$getArtwork(album.attributes.artwork.url, 300, 300)"
            />
        </div>
        <div class="album__info max-w-full overflow-hidden">
            <p
                class="font-bold whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {{ album.attributes.name }}
            </p>
            <p class="whitespace-nowrap overflow-hidden text-ellipsis">
                Album · {{ album.attributes.artistName }}
            </p>
            <div class="flex gap-2">
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${album.attributes.artwork.textColor1}`"
                ></div>
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${album.attributes.artwork.textColor2}`"
                ></div>
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${album.attributes.artwork.textColor3}`"
                ></div>
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${album.attributes.artwork.textColor4}`"
                ></div>
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${album.attributes.artwork.bgColor}`"
                ></div>
            </div>
        </div>
    </NuxtLink>
</template>
