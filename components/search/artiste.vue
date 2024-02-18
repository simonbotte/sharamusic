<script setup>
const props = defineProps({
    artist: Object,
});
const { $getArtwork } = useNuxtApp();
const hasArtwork = ref(true);
if (props?.artist?.attributes?.artwork?.url == undefined) {
    hasArtwork.value = false;
}
const artistInitials = computed(() => {
    return props.artist.attributes.name
        .split(" ")
        .map((word) => word[0])
        .join("");
});

</script>

<template>
    <NuxtLink
        v-if="hasArtwork"
        :to="`/artists/${artist.id}`"
        class="artist flex items-center border-b border-b-zinc-400 gap-2 py-2"
    >
        <div class="artist__artwork shrink-0">
            <img
                v-if="hasArtwork"
                class="rounded-md border border-zinc-400"
                :width="112"
                :src="$getArtwork(artist?.attributes?.artwork?.url, 300, 300)"
            />
            <div class="rounded-md border bg-zinc-200 text-zinc-700 border-zinc-400 w-28 h-28 flex content-center justify-center" v-else>
                <p class="text-5xl inline">{{artistInitials}}</p>
            </div>
        </div>
        <div class="artist__info max-w-full overflow-hidden">
            <p
                class="font-bold whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {{ artist.attributes.name }}
            </p>
            <p class="whitespace-nowrap overflow-hidden text-ellipsis">
                Artiste
            </p>
            <div v-if="hasArtwork" class="flex gap-2">
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${artist.attributes.artwork.textColor1}`"
                ></div>
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${artist.attributes.artwork.textColor2}`"
                ></div>
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${artist.attributes.artwork.textColor3}`"
                ></div>
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${artist.attributes.artwork.textColor4}`"
                ></div>
                <div
                    class="w-3 h-3"
                    :style="`background-color:#${artist.attributes.artwork.bgColor}`"
                ></div>
            </div>
        </div>
    </NuxtLink>
</template>
