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

const { locale } = useI18n();
const localePath = useLocalePath();
const languageSelector = ref(null);
useI18n().setLocale(locale.value);
const switchLocalePath = useSwitchLocalePath();
const changeLanguage = async () => {
    const newLang = languageSelector.value.value;
    const newPath = switchLocalePath(newLang);
    await navigateTo(newPath);
};
</script>

<template>
    <header class="bg-zinc-900 mx-auto">
        <div class="container px-4 mx-auto text-white">
            <div class="flex items-center justify-between pt-4">
                <NuxtLink :to="localePath('index')" class="font-bold text-2xl">
                    <h1>SharaMusic</h1>
                </NuxtLink>
                <select
                    class="border-zinc-700 border rounded-md py-1 px-4 appearance-none bg-zinc-900 focus:outline-zinc-600 text-zinc-50"
                    v-model="locale"
                    v-on:input="changeLanguage"
                    ref="languageSelector"
                >
                    <option value="fr">Français</option>
                    <option value="us">English</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                </select>
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
