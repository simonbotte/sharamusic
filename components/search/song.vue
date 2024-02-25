<script setup>
const localePath = useLocalePath();
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
        :to="localePath({name:'type-id',params:{type:'songs',id:song.id}})"
        class="song flex items-center border-b border-b-zinc-700 gap-2 py-2 text-zinc-50"
    >
        <div class="w-16 h-16 relative shrink-0">
            <img
                class="absolute z-10 rounded-md border w-16 h-16 border-zinc-700"
                :width="64"
                :src="$getArtwork(song?.attributes?.artwork?.url, 128, 128)"
            />
            <p
                class="absolute z-0 rounded-md border border-zinc-700 w-16 h-16 flex items-center justify-center text-3xl"
                :style="`background-color: #${song.attributes.artwork.bgColor}; color: #${song.attributes.artwork.textColor2};`"
            >
                {{ contentInitials }}
            </p>
        </div>
        <div class="song__info max-w-full overflow-hidden text-sm">
            <p
                class="font-bold whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {{ song.attributes.name }}
            </p>
            <p class="whitespace-nowrap overflow-hidden text-ellipsis">
                {{ $t('song') }}  · {{ song.attributes.artistName }}
            </p>
        </div>
    </NuxtLink>
</template>
