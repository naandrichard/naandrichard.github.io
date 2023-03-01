<script setup lang="ts">
const dishes = ref([
    {
        english: "Roasted Whole Suckling Pig",
        chinese: "江南脆皮乳猪全體",
    },
    {
        english: "Sautéed Dried Squid, Mussel & Greens in XO Sauce",
        chinese: "XO醬甜豆九龍吊片海蚌",
    },
    {
        english: "Cantonese Boiled Live Shrimp",
        chinese: "白灼游水蝦 (籠子上)",
    },
    {
        english: "Imperial Bird’s Nest Soup with Crabmeat Soup",
        chinese: "極品蟹肉官燕羹",
    },
    {
        english: "Whole Abalone with Black Mushroom and Sea Cucumber",
        chinese: "碧綠豪皇原隻鮑魚海參花菇",
    },
    {
        english: "Baked Half Lobsters with Cheese",
        chinese: "意大利芝士焗開邊龍蝦",
    },
    {
        english: "Forever Luck Crispy Chicken",
        chinese: "鴻運脆皮炸子雞",
    },
    {
        english: "Steamed Whole Crab & Dried Scallop in Glutinous Rice",
        chinese: "瑤柱香糯蒸羔蟹",
    },
    {
        english: "French Style Sheraton Steak",
        chinese: "法式焗牛扒",
    },
    {
        english: "Steamed Seasonal Whole Fish",
        chinese: "清蒸游水大海斑",
    },
    {
        english: "E-Fu Noodle with Dry Scallop and Mushroom",
        chinese: "瑤柱金菇伊麵",
    },
    {
        english: "Eight Treasure Rice Pudding",
        chinese: "八寶甜飯",
    },
    {
        english: "Fresh Fruit Platter",
        chinese: "合時果盤",
    },
    {
        english: "Sodas & Tea",
        chinese: "汽水、茶",
    },
])
</script>

<template>
    <div class="w-full grid grid-cols-2 gap-8 text-center">
        <div class="col-span-2">
            <h2 class="font-serif font-medium text-5xl text-center leading-loose mb-8">Dinner</h2>
            <p class="mb-4">
                Dinner will be served as a set menu of the following courses.
            </p>
            <p>
                For our friends and family with dietary restrictions, please let us know on your RSVP and we will coordinate alternative dishes.
            </p>
        </div>
        <div class="col-span-2"
             v-for="dish in dishes">
            <span class="block">{{ dish.english }}</span>
            <span>{{ dish.chinese }}</span>
        </div>
    </div>
</template>
