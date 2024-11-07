<template>
    <div class="create-pet-container flex">
        <h1 class="title">Create Your Pet</h1>

        <div class="color-pick flex">
            <button class="color-button" style="background-color: rgb(185, 63, 88);"></button>
            <button class="color-button" style="background-color: rgb(71, 78, 185);"></button>
            <button class="color-button" style="background-color: rgb(226, 231, 149);"></button>
            <button class="color-button" style="background-color: rgb(110, 204, 91);"></button>
            <button class="color-button" style="background-color: rgb(206, 124, 103);"></button>
        </div>

        <div class="drawing-area flex">
            <div class="drawing-board flex">
                <div id="canvas">
                    <NuxtSignaturePad ref="signature" :options="{
                        penColor: options.penColor,
                        backgroundColor: options.backgroundColor,
                    }" />
                </div>
            </div>
            <div class="premade-pets flex">
                <div class="premade-pet pet 1">
                    <img src="\public\pethousePic\emoji-happines-sad.png" alt="">
                </div>
                <div class="premade-pet pet 2">
                    <img src="\public\pethousePic\emoji-happines-sad.png" alt="">
                </div>
                <div class="premade-pet pet 3">
                    <img src="\public\pethousePic\emoji-happines-sad.png" alt="">
                </div>
                <div class="premade-pet pet 4">
                    <img src="\public\pethousePic\emoji-happines-sad.png" alt="">
                </div>
                <div class="premade-pet pet 5">
                    <img src="\public\pethousePic\emoji-happines-sad.png" alt="">
                </div>
            </div>
        </div>

        <div class="action-buttons flex">
            <button class="save">Save Pet</button>
            <button class="start">Start Game</button>
        </div>
    </div>
</template>
<script setup lang="ts">
const options = ref({
    penColor: 'rgb(0,0,0)',
    backgroundColor: 'rgb(255, 255, 255)'
})

const colors = [
    {
        color: 'rgb(51, 133, 255)',
    },
    {
        color: 'rgb(85, 255, 51)',
    },
    {
        color: 'rgb(255, 85, 51)',
    },
]

const signature = ref()
useHead({
    bodyAttrs: { class: 'crbg' }
})

const btnClick = () => {
    navigateTo('/')
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Geo:ital@0;1&family=Kirang+Haerang&family=Mochiy+Pop+One&display=swap');

#canvas {
    background-color: aliceblue;
    height: 250px;
    width: 250px;
}

.create-pet-container {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin: auto;
}

.title {
    font-family: "Mochiy Pop One";
    color: #06578B;
    font-size: 50px;
}

.color-pick {
    gap: 10px;
    margin-bottom: 20px;
}

.color-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
}

.drawing-area {
    gap: 20px;
}

.drawing-board {
    widows: 250px;
    height: 300px;
    align-items: center;
    justify-content: center;
}

.premade-pets {
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.premade-pet {
    display: flex;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
}

.action-buttons {
    gap: 20px;
    margin-top: 20px;
}

.save,
.start {
    background-color: #215d92;
    color: white;
    font-size: 15px;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(2, 3, 95, 0.747);
}

.save:hover,
.start:hover {
    background-color: #3582c4;
}

.flex {
    display: flex;
}
</style>
<!-- https://ide.geeksforgeeks.org/ide/online-html-editor?id=6b061782-e18a-45b8-8bf4-f7b4345d674e -->
<!-- https://vue3-signature-pad.vercel.app/ -->
<!-- https://next.jqueryscript.net/nuxt/signature-pad/ -->