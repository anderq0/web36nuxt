<template>
    <div class="create-pet-container flex">
        <h1 class="title">Create Your Pet</h1>

        <div class="flex middleCont">
            <div class="color-pick flex">
                <div v-for="color in colors">
                    <button type="button" :style='{ background: color.color }' class='color-button'
                        @click='options.penColor = color.color'>
                    </button>
                </div>
                <div class="actionBtbs">
                    <button type="button" class="erase" style="width: 60px;height: 60px;" @click='handleClearCanvas'>
                        <img src="\public\creatorPics\mop.png" alt="" style="width: 60px;height: 60px;">
                    </button>
                    <button type="button" class="savePic" style="width: 60px;height: 60px;"
                        @click='handleSaveSignature'>Save</button>
                </div>
            </div>

            <div class="petsArea flex">
                <div class="drawing-area flex">

                    <div id="canvas">
                        <NuxtSignaturePad ref="signature" :options="{
                            penColor: options.penColor,
                            backgroundColor: options.backgroundColor,
                        }" />
                    </div>
                </div>

                <div class="premadePet flex" style="align-items: center;justify-content: center;"><img :src="pic" alt="" style="width: 100px;height: 100px;"></div>
            </div>

            <div class="premade-pets flex">
                <div v-for="pet in pets">
                    <div class="premade-pet" @click="choosenPet(pet.petSrc)"> <img :src="pet.petSrc" alt=""></div>
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
const pic = ref()

const choosenPet = (srcM:string)=>{
    pic.value = srcM
}
const handleClearCanvas=()=> {
    return signature.value?.clearCanvas && signature.value?.clearCanvas()
}
const handleSaveSignature=()=> {
    return signature.value?.saveSignature && console.log(signature.value?.saveSignature())
}
const colors = [
    {
        color: 'rgb(185, 63, 88)',
    },
    {
        color: 'rgb(71, 78, 185)',
    },
    {
        color: 'rgb(226, 231, 149)',
    },
    {
        color: 'rgb(110, 204, 91)',
    },
    {
        color: 'rgb(206, 124, 103)',
    },

]
const pets = [
    {
        petSrc: "pethousePic\/emoji-happines-sad.png",
    },
    {
        petSrc: "pethousePic\/emoji-happines-happy.png",
    },
    {
        petSrc: "pethousePic\/emoji-happines-crying.png",
    },
    {
        petSrc: "pethousePic\/emoji-happines-normal.png",
    }
    

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

#canvas,
.premadePet {
    box-shadow:0px 0px 0px 18px rgba(3, 75, 115, 1);
    margin: 15px;
    border-radius: 20px;
    background-color: rgb(233, 216, 210);
    height: 350px;
    width: 300px;
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
    text-shadow: -1px 4px 9px #694b4b;
    font-family: "Mochiy Pop One";
    color: #06578B;
    font-size: 50px;
}

.color-pick {
    width: 60px;
    align-items: center;
    border-radius: 20px;
    background-color: #3582c4;
    gap: 10px;
    padding: 20px 0px 20px 0;
    flex-direction: column;
}

.color-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    box-shadow: inset 0px 4px 6px rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.color-button:focus {
    box-shadow: inset 0px 0px 12px rgb(255, 255, 255);
}

.drawing-area {
    gap: 20px;
}

.drawing-board {
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
    gap: 40px;
}
</style>
<!-- https://ide.geeksforgeeks.org/ide/online-html-editor?id=6b061782-e18a-45b8-8bf4-f7b4345d674e -->
<!-- https://vue3-signature-pad.vercel.app/ -->
<!-- https://next.jqueryscript.net/nuxt/signature-pad/ -->