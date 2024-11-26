<template>
  <div class="create-pet-container flex fdc alc">
    <h1 class="title">Create Your Pet</h1>

    <div class="flex middleCont">
      <div class="color-pick flex fdc alc">

        <div v-for="color in colors">
          <button type="button" :style="{ background: color.color }" class="color-button"
            @click="popupCreator(color.color)" @mouseover="showToolTip" @mouseleave="hideToolTip"></button>
        </div>

        <div v-if="isToolTipVisible" class="toolTip">
          <div class='flex volume' :focus="infocus">
            <input v-model='options.maxWidth' type='range' :min='1' :max='10' />
          </div>
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

      </div>

      <div class="popravka flex fdc">
        <div class="petsArea flex">
          <div class="drawing-area flex">
            <div id="canvas">
              <NuxtSignaturePad ref="signature" :maxWidth="options.maxWidth" :minWidth="options.maxWidth" :options="{
                penColor: options.penColor,
                backgroundColor: options.backgroundColor
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
        <div v-for=" pet  in  pets ">
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
  maxWidth: 2,
  minWidth: 2,
});
const popupCreator = (color: string) => {
  options.value.penColor = color

}
const pic = ref('\/previewR.PNG');

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
const isToolTipVisible = ref(false)
const infocus = ref(false)

const showToolTip = () => {
  infocus.value = true
  isToolTipVisible.value = true
}
const hideToolTip = () => {
  isToolTipVisible.value = false
}
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

/* transform: rotate(-90deg) translate(-138px, -119px);
    width: 280px; */
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

.toolTip {
  position: absolute;
  width: 60px;
  height: 300px;
  background-color: #ffffff6e;
  left: 100%;
  /* top: 100%; */
}

.volume {
  transform: rotate(-90deg);
  translate:(-138px, -119px);
  height: 300px;
}
</style>
<!-- https://ide.geeksforgeeks.org/ide/online-html-editor?id=6b061782-e18a-45b8-8bf4-f7b4345d674e -->
<!-- https://vue3-signature-pad.vercel.app/ -->

<!-- https://next.jqueryscript.net/nuxt/signature-pad/ -->
