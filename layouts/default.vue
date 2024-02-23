<script setup>
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
                <slot></slot>
            </div>
        </div>
    </main>
</template>
