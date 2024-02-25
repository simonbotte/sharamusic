<script setup>
const localePath = useLocalePath();
const props = defineProps({
    artist: Object,
});
const { $getArtwork } = useNuxtApp();
const hasArtwork = ref(true);
if (props?.artist?.attributes?.artwork?.url == undefined) {
    hasArtwork.value = false;
}
const contentInitials = computed(() => {
    return props.artist.attributes.name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("")
        .substring(0, 2);
});
</script>

<template>
    <NuxtLink
        v-if="hasArtwork"
        :to="localePath({name:'type-id',params:{type:'artists',id:artist.id}})"
        class="artist flex items-center border-b border-b-zinc-700 gap-2 py-2 text-zinc-50"
    >
        <div class="w-16 h-16 relative shrink-0">
            <img
                class="absolute z-10 rounded-full border w-16 h-16 border-zinc-700"
                :width="64"
                :src="$getArtwork(artist?.attributes?.artwork?.url, 128, 128)"
            />
            <p
                class="absolute z-0 rounded-full border border-zinc-700 w-16 h-16 flex items-center justify-center text-3xl"
                :style="`background-color: #${artist.attributes.artwork.bgColor}; color: #${artist.attributes.artwork.textColor2};`"
            >
                {{ contentInitials }}
            </p>
        </div>
        <div class="artist__info max-w-full overflow-hidden text-sm">
            <p
                class="font-bold whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {{ artist.attributes.name }}
            </p>
            <p class="whitespace-nowrap overflow-hidden text-ellipsis">
                {{ $t('artist') }} 
            </p>
        </div>
    </NuxtLink>
</template>
