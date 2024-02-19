<script setup>
const props = defineProps({
    song: Object,
});
const { $getArtwork } = useNuxtApp();
const hasArtwork = ref(true);
if (props?.song?.attributes?.artwork?.url == undefined) {
    hasArtwork.value = false;
}

const contentInitials = computed(() => {
    return props.song.attributes.name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("")
        .substring(0, 2);
});
</script>

<template>
    <NuxtLink
        v-if="hasArtwork"
        :to="`/songs/${song.id}`"
        class="song flex items-center border-b border-b-zinc-400 gap-2 py-2"
    >
        <div class="w-24 h-24 relative shrink-0">
            <img
                class="absolute z-10 rounded-md border border-zinc-400"
                :width="96"
                :src="$getArtwork(song?.attributes?.artwork?.url, 336, 336)"
            />
            <p
                class="absolute z-0 rounded-md border border-zinc-400 w-24 h-24 flex items-center justify-center text-5xl"
                :style="`background-color: #${song.attributes.artwork.bgColor}; color: #${song.attributes.artwork.textColor2};`"
            >
                {{ contentInitials }}
            </p>
        </div>
        <div class="song__info max-w-full overflow-hidden">
            <p
                class="font-bold whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {{ song.attributes.name }}
            </p>
            <p class="whitespace-nowrap overflow-hidden text-ellipsis">
                Morceau · {{ song.attributes.artistName }}
            </p>
        </div>
    </NuxtLink>
</template>
