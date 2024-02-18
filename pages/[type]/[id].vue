<script setup>
const route = useRoute();
const type = route.params.type;
const id = route.params.id;
let { data: token } = await useFetch("/api/security/token");
token = ref(token.value.token);

const content = ref({});
const canvas = ref(null);

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
console.log(content.value);
const { getGradientImageUrl } = useGrainGradient(gradiantProps);
const { getContentInfo } = useContentInfo(content.value);
const { drawRoundRect, drawImageWithBorderRadius, drawText } = useCanvasUtils();

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
        height: 716,
        borderRadius: 48,
        backgroundColor: `#${content.value.attributes.artwork.bgColor}`,
    };

    drawRoundRect(
        ctxCalc1,
        canvasProps.width / 2 - cardProps.width / 2,
        canvasProps.height / 2 - cardProps.height / 2,
        cardProps.width,
        cardProps.height,
        50,
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
            16
        );
    };

    //add textes
    const contentInfo = getContentInfo();
    console.log(contentInfo);
    const textProps = {
        title: {
            text: contentInfo.title,
            font: "bold 28px helvetica",
            color: `#${content.value.attributes.artwork.textColor1}`,
            x: canvasProps.width / 2 - 540 / 2,
            y: canvasProps.height / 2 - cardProps.height / 2 + 32 + 540 + 44,
        },
        description: {
            text: contentInfo.description,
            font: "28px helvetica",
            color: `#${content.value.attributes.artwork.textColor1}`,
            x: canvasProps.width / 2 - 540 / 2,
            y:
                canvasProps.height / 2 -
                cardProps.height / 2 +
                32 +
                540 +
                44 +
                44,
            opacity: 0.8,
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
    }, 100);

    //merge calc1 to canvas
    setTimeout(() => {
        ctx.drawImage(calc1, 0, 0);
    }, 20);
    setTimeout(() => {
        ctx.drawImage(calc2, 0, 0);
    }, 80);
};

const saveAsImage = () => {
    const link = document.createElement("a");
    link.download = "content-card.png";
    link.href = canvas.value.toDataURL("image/png");
    link.click();
};

onMounted(() => {
    buildCanvas();
});
</script>

<template>
    <!-- <div class="card grid relative">
        <h1 class="fixed">{{ type }} - {{ id }}</h1>
        <div class="background">
            <ResultContent :content="content" class="max-w-full" />
        </div>
        <div
            class="content absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full flex justify-center"
        >
            <CardContent :content="content" />
        </div>
    </div> -->
    <canvas ref="canvas" class="sharable w-96" />
    <div class="save">
        <button
            v-on:click="saveAsImage"
            class="bg-slate-600 text-white rounded-md p-2"
        >
            Save
        </button>
    </div>
</template>
