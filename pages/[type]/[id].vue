<script setup>
const route = useRoute();
const type = route.params.type;
const id = route.params.id;
let { data: token } = await useFetch("/api/security/token");
token = ref(token.value.token);

const content = ref({});
const generatedImage = ref(null);
const canvas = ref(null);
const canShare = ref(false);

const url = `https://api.music.apple.com/v1/catalog/fr/${type}/${id}`;
const { data, error } = await useFetch(url, {
    headers: {
        Authorization: `Bearer ${token.value}`,
    },
});
content.value = data.value.data[0];

const gradiantProps = {
    gradientRotate1: Math.floor(Math.random() * 360),
    gradientRotate2: Math.floor(Math.random() * 360),
    gradientColor1: `#${content.value.attributes.artwork.textColor3}`,
    gradientColor2: `#${content.value.attributes.artwork.textColor4}`,
    backgroundColor: `#${content.value.attributes.artwork.bgColor}`,
    content: content.value,
};

const { getGradientImageUrl } = useGrainGradient(gradiantProps);
const { getContentInfo } = useContentInfo(content.value);
const { drawRoundRect, drawImageWithBorderRadius, drawText } = useCanvasUtils();
const contentInfo = getContentInfo();

useHead({
    title: `${contentInfo.title} | SharaMusic`,
    meta: [
        {
            name: "description",
            content: `${contentInfo.title} · ${contentInfo.description}`,
        },
    ],
});

const buildCanvas = async () => {
    const canvasProps = {
        width: 1080,
        height: 1920,
    };

    const ctx = canvas.value.getContext("2d");
    canvas.value.width = canvasProps.width;
    canvas.value.height = canvasProps.height;

    //create 2 canvas to have calcs to handle z-index
    const calc1 = document.createElement("canvas");
    const calc2 = document.createElement("canvas");
    const ctxCalc1 = calc1.getContext("2d");
    const ctxCalc2 = calc2.getContext("2d");

    calc1.width = canvasProps.width;
    calc1.height = canvasProps.height;
    calc2.width = canvasProps.width;
    calc2.height = canvasProps.height;

    //add gradient background
    const gradientImageUrl = await getGradientImageUrl();
    const gradientImg = new Image();
    gradientImg.src = gradientImageUrl;
    gradientImg.onload = () => {
        ctx.drawImage(gradientImg, 0, 0);
    };

    //create the card
    const cardProps = {
        width: 604,
        height: 732,
        borderRadius: 40,
        backgroundColor: `#${content.value.attributes.artwork.bgColor}`,
    };

    drawRoundRect(
        ctxCalc1,
        canvasProps.width / 2 - cardProps.width / 2,
        canvasProps.height / 2 - cardProps.height / 2,
        cardProps.width,
        cardProps.height,
        cardProps.borderRadius,
        `#${content.value.attributes.artwork.bgColor}`
    );

    //add the content artwork
    const imageProps = {
        width: 540,
        height: 540,
    };
    let imageSource = content.value.attributes.artwork.url
        .replace("{w}", 1080)
        .replace("{h}", 1080);
    const img = new Image();

    img.src = imageSource;
    img.crossOrigin = "anonymous";

    img.onload = () => {
        drawImageWithBorderRadius(
            ctxCalc2,
            img,
            canvasProps.width / 2 - imageProps.width / 2,
            canvasProps.height / 2 - cardProps.height / 2 + 32,
            imageProps.width,
            imageProps.height,
            8
        );
        setTimeout(() => {
            ctx.drawImage(calc2, 0, 0);
        }, 80);
    };

    //add textes
    const contentInfo = getContentInfo();
    console.log(contentInfo);
    const textProps = {
        title: {
            text: contentInfo.title,
            font: "bold 28px SF-PRO-TEXT",
            color: `#${content.value.attributes.artwork.textColor1}`,
            x: canvasProps.width / 2 - 540 / 2,
            y: canvasProps.height / 2 - cardProps.height / 2 + 32 + 540 + 44,
        },
        description: {
            text: contentInfo.description,
            font: "28px SF-PRO-TEXT",
            color: `#${content.value.attributes.artwork.textColor1}`,
            x: canvasProps.width / 2 - 540 / 2,
            y:
                canvasProps.height / 2 -
                cardProps.height / 2 +
                32 +
                540 +
                44 +
                40,
            opacity: 0.8,
        },
        brand: {
            text: "Apple Music",
            font: "20px SF-PRO-TEXT",
            color: `#${content.value.attributes.artwork.textColor1}`,
            x: canvasProps.width / 2 - 540 / 2,
            y:
                canvasProps.height / 2 -
                cardProps.height / 2 +
                32 +
                540 +
                44 +
                44 +
                40,
            opacity: 0.6,
        },
    };
    setTimeout(() => {
        drawText(
            ctx,
            textProps.title.text,
            textProps.title.x,
            textProps.title.y,
            textProps.title.font,
            textProps.title.color,
            1,
            540,
            28
        );
        drawText(
            ctx,
            textProps.description.text,
            textProps.description.x,
            textProps.description.y,
            textProps.description.font,
            textProps.description.color,
            textProps.description.opacity,
            540,
            28
        );
        drawText(
            ctx,
            textProps.brand.text,
            textProps.brand.x,
            textProps.brand.y,
            textProps.brand.font,
            textProps.brand.color,
            textProps.brand.opacity,
            540,
            28
        );
    }, 200);
    setTimeout(() => {
        ctx.drawImage(calc1, 0, 0);
    }, 20);
    setTimeout(() => {
        generatedImage.value.src = canvas.value.toDataURL("image/png");
    }, 200);
};

const share = () => {
    if (navigator.share) {
        navigator
            .share({
                title: contentInfo.title,
                text: contentInfo.description,
                url: window.location.href,
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
    }
};

onMounted(() => {
    buildCanvas();
    if (navigator.share) {
        canShare.value = true;
    }
});
</script>

<template>
    <div
        class="result flex flex-col relative w-full items-center justify-center pt-4"
    >
        <canvas ref="canvas" class="hidden" />
        <img class="sharable w-full max-w-96" ref="generatedImage" />
        <div class="save fixed bottom-10">
            <button
                v-show="canShare"
                v-on:click="share"
                class="bg-zinc-700/30 text-white rounded-md px-4 py-2"
            >
                Partager
            </button>
        </div>
    </div>
</template>
