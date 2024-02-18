<script setup>
const props = defineProps({
    album: Object,
});

const backgroundColor = ref("#000000");
const gradientColor1 = ref("#000000");
const gradientColor2 = ref("#000000");
const gradientRotate1 = ref(0);
const gradientRotate2 = ref(0);

const svgElement = ref(null);
const initSVG = () => {
    backgroundColor.value = `#${props.album.attributes.artwork.bgColor.toString()}`;
    gradientColor1.value = `#${props.album.attributes.artwork.textColor3.toString()}`;
    gradientColor2.value = `#${props.album.attributes.artwork.textColor4.toString()}`;
    gradientRotate1.value = Math.floor(Math.random() * 360);
    gradientRotate2.value = Math.floor(Math.random() * 360);
};

const gradientMove = () => {
    gradientRotate1.value += 0.3;
    if(gradientRotate1.value > 360)
        gradientRotate1.value -= 360;

    gradientRotate2.value -= 0.7;
    if(gradientRotate2.value < 0)
        gradientRotate2.value += 360;

};

onMounted(() => {
    initSVG();
    setInterval(() => {
        gradientMove();
    }, 40);
});
</script>


<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
        viewBox="0 0 1080 1920"
        width="1080"
        ref="svgElement"
    >
        <defs>
            <linearGradient
                :gradientTransform="`rotate(${gradientRotate1}, 0.5, 0.5)`"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                :id="`gggrain-gradient2-${props.album.id}`"
            >
                <stop
                    id="bgColor2"
                    :stop-color="gradientColor1"
                    stop-opacity="1"
                    offset="-0%"
                ></stop>
                <stop
                    stop-color="rgba(255,255,255,0)"
                    stop-opacity="0"
                    offset="100%"
                ></stop>
            </linearGradient>
            <linearGradient
                :gradientTransform="`rotate(${gradientRotate2}, 0.5, 0.5)`"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                :id="`gggrain-gradient3-${props.album.id}`"
            >
                <stop id="bgColor3" :stop-color="gradientColor2" stop-opacity="1"></stop>
                <stop
                    stop-color="rgba(255,255,255,0)"
                    stop-opacity="0.5"
                    offset="100%"
                ></stop>
            </linearGradient>
            <filter
                id="gggrain-filter"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.4"
                    numOctaves="2"
                    seed="2"
                    stitchTiles="stitch"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    result="turbulence"
                ></feTurbulence>
                <feColorMatrix
                    type="saturate"
                    values="0"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="turbulence"
                    result="colormatrix"
                ></feColorMatrix>
                <feComponentTransfer
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="colormatrix"
                    result="componentTransfer"
                >
                    <feFuncR type="linear" slope="3"></feFuncR>
                    <feFuncG type="linear" slope="3"></feFuncG>
                    <feFuncB type="linear" slope="3"></feFuncB>
                </feComponentTransfer>
                <feColorMatrix
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="componentTransfer"
                    result="colormatrix2"
                    type="matrix"
                    values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 19 -11"
                ></feColorMatrix>
            </filter>
            <filter
                id="gggrain-saturate"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feColorMatrix
                    type="saturate"
                    values="3"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="SourceGraphic"
                    result="colormatrix"
                ></feColorMatrix>
            </filter>
        </defs>
        <g filter="url(#gggrain-saturate)">
            <rect id="bgColor1" width="100%" height="100%" :fill="backgroundColor"></rect>
            <rect
                width="100%"
                height="100%"
                :fill="`url(#gggrain-gradient3-${props.album.id})`"
            ></rect>
            <rect
                width="100%"
                height="100%"
                :fill="`url(#gggrain-gradient2-${props.album.id})`"
            ></rect>
            <rect
                width="100%"
                height="100%"
                fill="transparent"
                filter="url(#gggrain-filter)"
                opacity="1"
                style="mix-blend-mode: soft-light"
            ></rect>
        </g>
    </svg>
</template>
