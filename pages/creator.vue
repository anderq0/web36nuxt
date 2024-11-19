<template>
  <div class="create-pet-container flex fdc alc">
    <h1 class="title">Create Your Pet</h1>

    <div class="flex middleCont">
      <div class="color-pick flex fdc alc">
        <div v-for="color in colors">
          <button type="button" :style="{ background: color.color }" class="color-button"
            @click="options.penColor = color.color"></button>
        </div>
        <div class="actionBtbs fdc flex">
          <button type="button" class="erase" style="width: 60px; height: 60px" @click="handleClearCanvas">
            <img src="/public/creatorPics/eraser.png" alt="" style="width: 50px; height: 50px" />
          </button>
          <button type="button" class="savePic" style="width: 60px; height: 60px" @click="handleSaveSignature">
            Save
          </button>
          <button type="button" class="handleUndo" style="width: 60px; height: 60px" @click="handleUndo">
            Undo
          </button>
        </div>
        <div class='flex items-center space-x-4'>
            <input v-model='options.maxWidth' type='range' :min='1' :max='10' />
            <p>{{ options.maxWidth }}</p>
          </div>
      </div>

      <div class="popravka flex fdc">
        <div class="petsArea flex">
          <div class="drawing-area flex">
            <div id="canvas">
              <NuxtSignaturePad ref="signature" :options="{
                penColor: options.penColor,
                backgroundColor: options.backgroundColor,
                maxWidth:options.maxWidth,
                minWidth:options.minWidth
              }" />
            </div>
          </div>

          <div class="premadePet flex alc jc">
            <img :src="pic" alt="" style="width: 200px; height: 250px" />
          </div>
        </div>

        <div class="buttonsAmount fdc flex">
          <div class="action-buttons flex">
            <button @click="savePet" class="save">Save Pet</button>
            <button class="start">Start Game</button>
          </div>
          <div class="logsData flex">
            <div>
              <input type="text" class="input-box2" placeholder="Pet Name" />
            </div>

            <div>
              <input type="password" class="input-box2" autocomplete="on" placeholder="Password" />
            </div>
          </div>
        </div>
      </div>

      <div class="premade-pets flex fdc alc">
        <div v-for="pet in pets">
          <div class="premade-pet alc jc flex" @click="choosenPet(pet.petSrc)">
            <img :src="pet.petSrc" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const savePet = () => {
  console.log("dadadam");
  pic.value = signature.value?.saveSignature();
  
};

const options = ref({
  penColor: "rgb(0,0,0)",
  backgroundColor: "rgb(255, 255, 255)",
  maxWidth: 9,
  minWidth: 9,
});
const pic = ref('data:image/png;base64,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');

const choosenPet = (srcM: string) => {
  pic.value = srcM;
};
const handleClearCanvas = () => {
  return signature.value?.clearCanvas && signature.value?.clearCanvas();
};
const handleSaveSignature = () => {
  return signature.value?.saveSignature && console.log(signature.value?.saveSignature());
};
const handleUndo = () => {
  return signature.value?.undo && signature.value?.undo();
};
const colors = [
  {
    color: "rgb(185, 63, 88)",
  },
  {
    color: "rgb(71, 78, 185)",
  },
  {
    color: "rgb(226, 231, 149)",
  },
  {
    color: "rgb(110, 204, 91)",
  },
  {
    color: "rgb(206, 124, 103)",
  },
  {
    color: "rgb(000, 000, 000)",
  },
];
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
  },
];

const signature = ref();
useHead({
  bodyAttrs: { class: "crbg" },
});

const btnClick = () => {
  navigateTo("/");
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Geo:ital@0;1&family=Kirang+Haerang&family=Mochiy+Pop+One&display=swap");

.input-box2 {
  padding: 15px;
  border-radius: 90px;
  border: none;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: inset 0px 4px 8px rgba(11, 219, 198, 0.581),
    0px 6px 12px rgba(21, 133, 105, 0.581);
  outline: none;
  transition: box-shadow 0.2s ease;
}

#canvas {
  overflow: hidden;
  background-color: #87bbbb;
  margin-top: 15px;
  height: 360px;
  width: 310px;
  border-radius: 10%;
}

/* #canvas, */
.premadePet {
  background-image: url("/public/creatorPics/clipboard.PNG");
  background-size: cover;
  height: 375px;
  width: 310px;
}

.fdc {
  flex-direction: column;
}

.create-pet-container {
  position: relative;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
}

.title {
  text-shadow: -1px 4px 9px #694b4b;
  font-family: "Mochiy Pop One";
  color: #06578b;
  font-size: 50px;
}

.color-pick {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -10%;
  width: 60px;
  border-radius: 20px;
  background-color: #5085b5;
  gap: 10px;
  padding: 20px 0px 20px 0;
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

.color-button:hover {
  transform: scale(1.05);
}

.premade-pet {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
}

.jc {
  justify-content: center;
}

.alc {
  align-items: center;
}

.action-buttons,
.logsData {
  justify-content: space-around;
  margin-top: 20px;
}

.save,
.start {
  background-color: #5085b5;
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
  transform: scale(1.05);
  background-color: #25547d;
}

.premade-pet:hover {
  transform: scale(1.05);
}

.flex {
  display: flex;
  gap: 40px;
}

.actionBtbs {
  gap: 1vh;
}
</style>
<!-- https://ide.geeksforgeeks.org/ide/online-html-editor?id=6b061782-e18a-45b8-8bf4-f7b4345d674e -->
<!-- https://vue3-signature-pad.vercel.app/ -->

<!-- https://next.jqueryscript.net/nuxt/signature-pad/ -->
