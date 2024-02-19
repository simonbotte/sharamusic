<template>
    <header class="bg-zinc-900 px-4">
        <div class="container mx-auto text-white">
            <div class="flex items-center justify-between py-4">
                <NuxtLink to="/" class="font-bold text-2xl">
                    <h1>SharaMusic</h1>
                </NuxtLink>
            </div>
        </div>
    </header>
    <body>
        <div class="container mx-auto">
            <div class="flex flex-col gap-4">
                <slot></slot>
            </div>
        </div>
    </body>
</template>
