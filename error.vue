<script setup>
const props = defineProps({
    error: {
        type: Object,
        required: true,
    },
});

useHead({
    title: "SharaMusic | Partage tes musiques préférées",
    link: [
        {
            rel: "icon",
            href: "/favicon.svg",
            type: "image/svg+xml",
        },
    ],
    meta: [
        {
            name: "description",
            content:
                "Partage tes musiques préférées avec SharaMusic grace au générateur de contenu",
        },
    ],
    bodyAttrs: {
        class: "bg-zinc-900",
    },
});
</script>

<template>
    <header class="bg-zinc-900 mx-auto">
        <div class="container px-4 mx-auto text-white">
            <div class="flex items-center justify-between pt-4">
                <NuxtLink to="/" class="font-bold text-2xl">
                    <h1>SharaMusic</h1>
                </NuxtLink>
            </div>
        </div>
    </header>
    <main class="bg-zinc-900">
        <div class="mx-auto">
            <div class="flex flex-col gap-4">
                <div
                    class="flex flex-col items-center justify-center h-full mt-12"
                >
                    <h1 class="text-4xl font-bold text-zinc-50">
                        {{ error.statusCode }}
                    </h1>
                    <p class="text-zinc-50">
                        {{ error.message }}
                    </p>
                    <NuxtLink
                        to="/"
                        class="bg-zinc-700/30 text-white rounded-md px-4 py-2 mt-8"
                    >
                        Faire une recherche
                    </NuxtLink>
                </div>
            </div>
        </div>
    </main>
</template>
