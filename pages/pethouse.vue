<template>
  <div class="app-container">
    <div class="header">
      <button  @click="openModal('SHOP')" class="button shop" >SHOP</button>
      <button @click="openModal('SETTINGS')" class="button settings">SETTINGS</button>
      <button @click="exitClick" class="button exit">EXIT</button>
    </div>

    <main class="main-content">
      <div class="clouds">
        <img src="/public/menuPics/cloud.png" alt="Cloud 1" class="cloud cloud-1" />
        <img src="/public/menuPics/cloud.png" alt="Cloud 2" class="cloud cloud-2" />
      </div>
      <div class="stats-container">
        <div class="stats stats-left">
          <div v-for="(stat, index) in styledStats.slice(0, 2)" :key="index" class="stat">
            <img :src="stat.style.icon" :alt="stat.label" class="icon" />
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: stat.valueMeaning + '%', background: stat.style.color }"
              ></div>
              <span class="progress-text" :style="{ color: stat.style.textcolor }">{{
                stat.label
              }}</span>
            </div>
          </div>
        </div>

        <div class="pet-area">
          <div class="pet-circle">
            <img src="/public/pethousePic/myPet.png" alt="Pet" class="pet-image" />
          </div>
        </div>

        <div class="stats stats-right">
          <div v-for="(stat, index) in styledStats.slice(2, 4)" :key="index" class="stat">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: stat.valueMeaning + '%', background: stat.style.color }"
              ></div>
              <span class="progress-text" :style="{ color: stat.style.textcolor }">{{
                stat.label
              }}</span>
            </div>
            <img :src="stat.style.icon" :alt="stat.label" class="icon" />
          </div>
        </div>
      </div>
      <div class="greenRect">
        <img src="/public/pethousePic/Rectangular.png" class="rectangular" />
      </div>
    </main>

    <div class="footer">
      <div v-for="(btn, index) in buttons" :key="index">
        <button @click="handleButtonClick(btn.label)" :class="'circle-button' + ' ' + btn.class">
          <img :src="btn.icon" :alt="btn.label" />
        </button>
        <span class="circle-button-text">{{ btn.label }}</span>
      </div>
    </div>
  </div>

  <!-- <div class="modal">
    <div class="modal__content">
      <button @click="closebtn" class="modal__close-button">Close</button>
      <h1 class="modal__title">Контент для примера</h1>
    </div>
  </div> -->
  <!-- модалка-->
  <div v-if="isModalOpen" class="modal">
    <div class="modal__content">
      <button @click="closeModal" class="modal__close-button">Close</button>
      <h1 class="modal__title">{{ modalTitle }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
const modalTitle = ref(''); 

const openModal = (title: string) => {
  modalTitle.value = title; 
  isModalOpen.value = true;  
};

const closeModal = () => {
  isModalOpen.value = false; 
};
const isPaused = ref(false);
const isTimerActive = ref(true); 
const togglePause = () => {
  openModal('PAUSE');

  if (isPaused.value) {
    isTimerActive.value = true;
    timer = setInterval(decreaseStats, 3000);
  } else {
    isTimerActive.value = false;
    clearInterval(timer);
  }
  isPaused.value = !isPaused.value;
};
const handleButtonClick = (label: string) => {
  if (label == 'PAUSE') {
    togglePause();
  } else {
    openModal(label); 
  }
};

const exitClick = () => {
  navigateTo("/");
};
const stats = ref([
  { label: "Games", valueMeaning: 70, icon: "/pethousePic/emoji-happines-happy.png" },
  { label: "Education", valueMeaning: 50, icon: "/pethousePic/emoji-happines-happy.png" },
  { label: "Feed", valueMeaning: 100, icon: "/pethousePic/emoji-happines-happy.png" },
  { label: "Wash", valueMeaning: 20, icon: "/pethousePic/emoji-happines-happy.png" },
]);
const getProgressBarStyle = (valueMeaning: number) => {
  if (valueMeaning >= 80) {
    return {
      color: "linear-gradient(#b29dd9 37.82%, rgba(57, 30, 105, 0.73))",
      icon: "/pethousePic/emoji-happines-happy.png",
      textcolor: "#443263",
    };
  } else if (valueMeaning >= 60) {
    return {
      color: "linear-gradient(#ede509 3.36%, rgba(180, 112, 74, 0.73));",
      icon: "/pethousePic/emoji-happines-normal.png",
      textcolor: "#7e692c",
    };
  } else if (valueMeaning >= 30) {
    return {
      color: "linear-gradient(rgba(248, 124, 124, 1) 51.68%, #de5858 91.6%)",
      icon: "/pethousePic/emoji-happines-sad.png",
      textcolor: "#7e2c36",
    };
  } else {
    return {
      color: "linear-gradient(rgba(226, 184, 128, 1) 23.53%, #ed5a0a 91.6%)",
      icon: "/pethousePic/emoji-happines-crying.png",
      textcolor: "#934833",
    };
  }
};
const styledStats = computed(() =>
  stats.value.map((stat) => ({
    ...stat,
    style: getProgressBarStyle(stat.valueMeaning),
  }))
);
function decreaseStats() {
  for (let i = 0; i < stats.value.length; i++) {
    const stat = stats.value[i];
    stat.valueMeaning = Math.max(stat.valueMeaning - 1, 0); 
    if (stat.valueMeaning >= 80) {
      stat.icon = "/pethousePic/emoji-happines-happy.png";
    } else if (stat.valueMeaning >= 60) {
      stat.icon = "/pethousePic/emoji-happines-normal.png";
    } else if (stat.valueMeaning >= 40) {
      stat.icon = "/pethousePic/emoji-happines-sad.png";
    } else {
      stat.icon = "/pethousePic/emoji-happines-crying.png";
    }
  }
}

let timer:any;

onMounted(() => {
  timer = setInterval(decreaseStats, 3000); 
});
const buttons = [
  {
    label: "GAMES",
    icon: "pethousePic/icon-games.png",
    class: "games-btn",
  },
  {
    label: "EDUCATION",
    icon: "pethousePic/icon-education.png",
    class: "education-btn",
  },
  {
    label: "PAUSE",
    icon: "pethousePic/icon-pause.png",
    class: "pause-btn",
  },
  {
    label: "FEED",
    icon: "pethousePic/icon-feed.png",
    class: "feed-btn",
  },
  {
    label: "WASH",
    icon: "pethousePic/icon-wash.png",
    class: "wash-btn",
  },
];
useHead({
  bodyAttrs: { class: "pthsbg" },
});

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Geo:ital@0;1&family=Kirang+Haerang&family=Mochiy+Pop+One&display=swap");

.app-container {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* header */
.header {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
.button {
  padding: 20px 50px;
  border: none;
  border-radius: 30px;
  width: 15%;
  background: linear-gradient(145deg, #f9a825, #f57c00);
  color: rgb(0, 0, 0);
  font-family: "Geo";
  font-size: 26px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), inset 0px 1px 4px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}
.button:hover {
  background: linear-gradient(145deg, #f57c00, #f9a825);
  transform: translateY(-3px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3), inset 0px 2px 6px rgba(255, 255, 255, 0.6);
}
.button:active {
  transform: translateY(0);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), inset 0px 1px 4px rgba(255, 255, 255, 0.5);
}
.shop {
  background: repeating-linear-gradient(#6bcfde, #51bbc9);
}
.shop:hover {
  background: repeating-linear-gradient(162deg, #359aa7, #6bcfde);
}
.settings {
  background: repeating-linear-gradient(#6bcfde, #51bbc9);
}
.settings:hover {
  background: repeating-linear-gradient(162deg, #359aa7, #6bcfde);
}
.exit {
  background: linear-gradient(145deg, #ef9a9a, #e57373);
}
.exit:hover {
  background: linear-gradient(145deg, #e57373, #ef9a9a);
}

/* main Content */
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.stats-container {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.stats-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.stats-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.stat {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon {
  width: 60px;
  height: 50px;
}
.progress-bar {
  width: 150px;
  height: 20px;
  background: #f1f1f1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.progress-fill {
  height: 100%;
  background: #ff8a65;
  position: absolute;
}

.pet-area {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.pet-circle {
  z-index: 1;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(14, 146, 164, 1) 49.16%,
    rgba(110, 207, 222, 1) 63.45%,
    rgba(217, 217, 217, 1) 66.39%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.pet-image {
  width: 350px;
  height: auto;
}

/* footer */
.footer {
  z-index: 1;
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
.circle-button {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: none;
  background: radial-gradient(
    circle,
    rgba(110, 207, 222, 1) 47.48%,
    rgb(94, 170, 182) 55.04%,
    rgba(217, 217, 217, 1) 63.45%
  );
  color: rgb(0, 0, 0);
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.circle-button-text {
  font-family: "Geo";
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
}
.circle-button img {
  width: 50px;
  height: 50px;
}
.circle-button span {
  margin-top: 5px;
  font-size: 12px;
}
.circle-button:hover {
  transform: scale(1.1);
}

.pause-btn {
  background: radial-gradient(
    circle,
    #ef9a9a 36.97%,
    #e57373 55.46%,
    rgba(217, 217, 217, 1) 63.45%
  );
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: none;
  color: rgb(0, 0, 0);
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
}

.stats-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

.stats-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  width: 250px;
  height: 40px;
  background: #f1f1f1;
  border-radius: 45px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 9px 6px rgba(0, 0, 0, 0.28);
}
.progress-fill {
  height: 100%;
  background: linear-gradient(#ede509 3.36%, rgba(180, 112, 74, 0.73));
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.1s ease;
}
.progress-text {
  position: absolute;
  z-index: 100;
  font-size: 14px;
  font-family: "Geo";
  font-weight: lighter;
  width: 100%;
  text-align: right;
  color: #7e692c;
}
.greenRect {
  position: absolute;
  width: 100%;
  height: auto;
  z-index: 0;
  pointer-events: none;
}
.clouds {
  position: absolute;
  width: 100%;
  height: auto;
  top: 5%;
  z-index: 0;
  pointer-events: none;
  overflow: visible;
}
.rectangular {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 200px;
}
.cloud {
  position: absolute;
  opacity: 0.9;
  animation: moveClouds 30s linear infinite;
}

.cloud-1 {
  width: 200px;
  top: 10%;
  left: -150px;
  animation-duration: 40s;
}

.cloud-2 {
  width: 250px;
  top: 25%;
  left: -250px;
  animation-duration: 55s;
}

@keyframes moveClouds {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100vw + 300px));
  }
}

/* Модальное окошко */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(117, 191, 207, 0.436);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal__content {
  background-color: #ffffff;
  padding: 20px;
  height: 600px;
  width: 600px;
  border-radius: 8px;
  text-align: center;
}

.modal__close-button {
  background-color: #ff6f61;
  border: none;
  color: white;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.modal__close-button:hover {
  background-color: #ff4f40;
}
</style>
