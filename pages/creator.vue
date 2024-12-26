<template>
  <div class="create-pet-container flex fdc alc">
    <h1 class="title">Create Your Pet</h1>

    <div class="desktop-layout">

      <div class="tool-panel">
        <h2>Tools</h2>
        <div class="color-pick">
          <div class="color-column">
            <button
              v-for="(color, index) in colors.slice(0, 6)"
              :key="color.color"
              :style="{ background: color.color }"
              class="color-button"
              @click="popupCreator(color.color)"
            ></button>
          </div>
          <div class="color-column">
            <button
              v-for="(color, index) in colors.slice(6, 12)"
              :key="color.color"
              :style="{ background: color.color }"
              class="color-button"
              @click="popupCreator(color.color)"
            ></button>
          </div>
        </div>

        <div class="tool-actions">
          <label for="brush-width">Width:</label>
          <input
            id="brush-width"
            v-model="options.maxWidth"
            type="range"
            :min="1"
            :max="10"
          />
          <div class="instruments">
            <button :class="{ 'pulse': isPremadePetActive }" class="tool-btn pastel-btn" @click="handleClearCanvas">Erase</button>
            <button class="tool-btn pastel-btn" @click="handleSaveSignature">Save</button>
            <button class="tool-btn pastel-btn" @click="handleUndo">Undo</button>
          </div>
        </div>
      </div>

      <div class="main-panel">
        <div class="drawing-area">
          <NuxtSignaturePad
            ref="signature"
            id="petCanvas"
            :disabled="isPremadePetActive"
            :maxWidth="options.maxWidth"
            :options="{
              penColor: options.penColor,
              backgroundColor: options.backgroundColor,
            }"
          />
        </div>
        <div class="logsData">
          <input type="text" class="input-boxs pastel-input" placeholder="Pet Name" />
          <input
            type="password"
            class="input-boxs pastel-input"
            autocomplete="on"
            placeholder="Password"
          />
        </div>
        <div class="action-buttons">
          <button class="action-btn pastel-btn">Start Game</button>
        </div>
      </div>

      <div class="premade-pets">
        <h2>Premade </h2>
        <div v-for="pet in pets" :key="pet.petSrc" class="premade-pet">
          <img
            :src="pet.petSrc"
            alt="Pet"
            class="pet-img pastel-border"
            @click="choosenPet(pet.petSrc)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const savePet = () => {
  pic.value = signature.value?.saveSignature();
};
const options = ref({
  penColor: "rgb(0,0,0)",
  backgroundColor: "rgb(255, 255, 255)",
  maxWidth: 1,
  minWidth: 10,
});
const popupCreator = (color: string) => {
  options.value.penColor = color;
};
const pic = ref("/previewR.PNG");

const choosenPet = (srcM: string) => {
  isPremadePetActive.value = true; 
  pic.value = srcM;
  drawImageOnCanvas(srcM);
};

const handleClearCanvas = () => {
  signature.value?.clearCanvas && signature.value?.clearCanvas();
  isPremadePetActive.value = false; // Разрешаем рисование
};
const handleSaveSignature = () => {
  return signature.value?.saveSignature("image/jpeg") && console.log(signature.value?.saveSignature("image/svg"));
};
const handleUndo = () => {
  signature.value?.undo && signature.value?.undo();
  if (signature.value?.isEmpty) {
    isPremadePetActive.value = false; 
  }
};
const colors = [
  { color: "rgb(185, 63, 88)" }, // Красный
  { color: "rgb(71, 78, 185)" }, // Синий
  { color: "rgb(226, 231, 149)" }, // Желтовато-зеленый
  { color: "rgb(110, 204, 91)" }, // Зеленый
  { color: "rgb(206, 124, 103)" }, // Коричневато-розовый
  { color: "rgb(0, 0, 0)" }, // Черный
  { color: "rgb(255, 255, 255)" }, // Белый
  { color: "rgb(156, 39, 176)" }, // Ярко-фиолетовый
  { color: "rgb(144, 202, 249)" }, // Светло-голубой
  { color: "rgb(174, 213, 129)" }, // Светло-зеленый
  { color: "rgb(240, 98, 146)" }, // Розовый
  { color: "rgb(255, 87, 34)" }, // Оранжевый
];

const pets = [
  {
    petSrc: "creatorPics/catExample.png",
  },
  {
    petSrc: "creatorPics/dogExample.png",
  },
  {
    petSrc: "creatorPics/rabbitExample.png",
  },
  {
    petSrc: "creatorPics/snakeExample.png",
  },
];

const signature = ref();
useHead({
  bodyAttrs: { class: "crbg" },
});
const drawImageOnCanvas = (imageSrc: string) => {
  const canvas = document.querySelector("canvas"); 
  const ctx = canvas?.getContext("2d");

  if (canvas && ctx) {
    const image = new Image(); 
    image.src = imageSrc;

    image.onload = () => {
      const imageWidth = canvas.width * 0.5
      const imageHeight = canvas.height * 0.5; 
      const x = (canvas.width - imageWidth) / 2; 
      const y = (canvas.height - imageHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, x, y, imageWidth, imageHeight);
    };
  }
};
const isPremadePetActive = ref(false);

const btnClick = () => {
  navigateTo("/");
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Geo:ital@0;1&family=Kirang+Haerang&family=Mochiy+Pop+One&display=swap");
.create-pet-container {
  font-family: "Geo";
  font-weight: bold;
  font-size: 20px;
  color: rgb(255, 255, 255);
  background: #9699b42e;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.desktop-layout {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}
.tool-panel,
.main-panel,
.premade-pets {
  background: #8b9bbe;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
}

.title {
  text-shadow: 4px 1px 7px rgba(0, 0, 0, 0.11);
  font-family: "Mochiy Pop One";
  background: radial-gradient(rgba(11, 219, 198, 0.581) 0.42%, #5085b5 69.33%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 50px;
}

.color-pick {
  display: flex;
  justify-content: center;
  gap: 20px; 
  padding: 20px 0;
  border-radius: 20px;
  background-color: #5085b5;
  width: 90%;
}

.color-column {
  display: flex;
  flex-direction: column;
  gap: 10px; 
}

.color-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  box-shadow: inset 0px 4px 6px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.color-button:hover {
  transform: scale(1.1);
}

.color-button:focus {
  box-shadow: inset 0px 0px 12px rgb(255, 255, 255);
}


.drawing-area {
  width: 500px;
  height: 400px;
  border: 2px solid #5b7aab;
  border-radius: 10px;
  background: #e0eff07b;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.input-boxs {
  box-shadow: 0 4px 8px rgba(48, 194, 104, 1) inset, 0 6px 12px rgba(63, 136, 126, 1);
  background: #e0eff07b;
  border: 1px solid #e0eff07b;
  padding: 10px;
  border-radius: 8px;
  color: #0000008a;
  margin-bottom: 10px;
  width: 60%;
  padding: 15px;
  border-radius: 90px;
  font-weight: bold;
  font-size: 15px;
  transition: box-shadow 0.2s ease;
}

.input-boxs:focus {
  box-shadow: inset 0px 4px 8px rgb(238, 1, 1), 0px 6px 12px rgba(255, 0, 0, 0.15);
}
.color-button:hover {
  transform: scale(1.1);
}
.pastel-btn {
  background: #5085b5;
  color: #ffffff;
  padding: 10px 20px;
  border: 1px solid #f0e4e1;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.pastel-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.jc {
  justify-content: center;
}

.alc {
  align-items: center;
}

.action-buttons,
.logsData {
  display: flex;
  gap: 10px;
  justify-content: space-around;
  margin-top: 20px;
}
.premade-pet {
  width: 70px;
  height: 70px;
  border-radius: 90%;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.pet-img {
  width: 90px;
  height: 90px;
}

.premade-pet:hover {
  transform: scale(1.1);
  box-shadow: 11px 29px 39px #00f260;
}
.premade-pets {
  display: flex;
  flex-direction: column;
  gap: 40px;
  
}
.instruments {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tool-actions {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.tool-panel{
  display: flex;
  flex-direction: column;
  align-items: center;
}


.action-btn {
  font-family: "Geo" ;
  box-shadow: 0px 4px 5.5px 5px rgba(30, 30, 30, 0.42);
  color: #ffffff;
  text-transform: uppercase;
  border-radius: 90px;
  border: none;
  cursor: pointer;
  width: 40%;
  font-weight: bold;
  transition: 0.4s ease;
  font-size: 28px; 
}

.action-btn:hover {
  background: #3f9c64;
}

input[type="range"] {
  -webkit-appearance: none; 
  width: 100%; 
  height: 8px; 
  border-radius: 5px;
  background: linear-gradient(to right, #4bafbc, #5085b5); 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); 
  transition: background 0.3s ease;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; 
  appearance: none;
  width: 20px; 
  height: 20px;
  border-radius: 50%;
  background: #ffffff; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); 
  border: 2px solid #4bafbc;
  cursor: grab;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2); 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid #4bafbc;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}
@keyframes pulse-animation {
  0% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  }
}

.pulse {
  animation: pulse-animation 1s infinite;
}



</style>
<!-- https://ide.geeksforgeeks.org/ide/online-html-editor?id=6b061782-e18a-45b8-8bf4-f7b4345d674e -->
<!-- https://vue3-signature-pad.vercel.app/ -->

<!-- https://next.jqueryscript.net/nuxt/signature-pad/ -->
