<script setup>
const props = defineProps({
    album: Object,
});
const { $getArtwork } = useNuxtApp();
const hasArtwork = ref(true);
if (props?.album?.attributes?.artwork?.url == undefined) {
    hasArtwork.value = false;
}

const contentInitials = computed(() => {
    return props.album.attributes.name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("")
        .substring(0, 2);
});
</script>

<template>
    <NuxtLink
        v-if="hasArtwork"
        :to="`/albums/${album.id}`"
        class="album flex items-center border-b border-b-zinc-400 gap-2 py-2"
    >
        <div class="w-24 h-24 relative shrink-0">
            <img
                class="absolute z-10 rounded-md border border-zinc-400"
                :width="96"
                :src="$getArtwork(album?.attributes?.artwork?.url, 336, 336)"
            />
            <p
                class="absolute z-0 rounded-md border border-zinc-400 w-24 h-24 flex items-center justify-center text-5xl"
                :style="`background-color: #${album.attributes.artwork.bgColor}; color: #${album.attributes.artwork.textColor2};`"
            >
                {{ contentInitials }}
            </p>
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
            
        </div>
    </NuxtLink>
</template>
