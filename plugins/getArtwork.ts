export default defineNuxtPlugin(() => {
    return {
        provide: {
            getArtwork: (url: string, width:number, height:number ) => url.replace("{w}", width.toString()).replace("{h}", height.toString()),
        },
    };
});
