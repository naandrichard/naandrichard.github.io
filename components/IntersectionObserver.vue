<script setup>
const props = defineProps({
    sentinelName: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["on-intersection"]);

const intersectionState = ref({
    inViewport: false,
    isBelow: true,
})

// Obtaining reference to the sentinel DOM element
const sentinel = ref(null);

watch(intersectionState, (value) => {
    emit("on-intersection", value);
});

onMounted(() => {
    const handler = (entries) => {
        if (entries[0].isIntersecting) {
            intersectionState.value = {
                inViewport: true,
                isBelow: false,
            }
        } else {
            intersectionState.value = {
                inViewport: false,
                isBelow: entries[0].boundingClientRect.y >= 0,
            }
        }
    };

    const observer = new window.IntersectionObserver(handler);

    observer.observe(sentinel.value);
});
</script>

<template>
    <div ref="sentinel" class="w-full h-px relative" />
</template>
