<template>
    <div>
        <NuxtWelcome />
    </div>
</template>

<script setup>
const { data } = await useFetch("/api/security/token");

// const url = "https://api.music.apple.com/v1/catalog/fr/search?term=daft+punk&types=albums";
const url = "https://api.music.apple.com/v1/catalog/fr/albums/617154241";

const response = await useFetch(
    url,
    {
        headers: {
            Authorization: `Bearer ${data.value.token}`,
        },
    }
);
console.log(response);
</script>
