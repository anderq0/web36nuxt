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

  <!-- модалка-->
  <div v-if="isModalOpen" class="modal">
    <div class="modal__content">
      <button @click="closeModal(modalTitle)" class="modal__close-button">Close</button>
      <h1 class="modal__title">{{ modalTitle }}</h1>
      <div v-if="modalTitle=='SHOP'">
        <p>There you can find a list of boosters for your pet</p>
          <div v-for="(prod) in listOfProducts" class="flex">
            <div class="footer-list flex"> 
              <div class="product"></div>
              <div class="flex listik">
                <p>Name - {{prod.name}}</p>
                <p>Cost - {{ prod.cost }}</p>
                <p>Description - {{ prod.desc }}</p>
              </div>
            </div>

          </div>
      </div>
      <div v-if="modalTitle=='SETTINGS'">
        <p>There you can choose your preferences for comfortable gameplay</p>

      </div>
      <div v-if="modalTitle=='GAMES'">
        <p>Choose a game to boost games-bar</p>

      </div>
      <div v-if="modalTitle=='EDUCATION'">
        <p>Choose an educational activity to boost education-bar</p>

      </div>
      <div v-if="modalTitle=='FEED'">
        <p>Buy food for your pet to boost feed-bar</p>

      </div>
      <div v-if="modalTitle=='WASH'">
        <p>Wash your pet to boost wash-bar</p>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const listOfProducts = ref([
  {id:1, name:'change pet name', cost:1300, desc:'why did not you choose a name responsibly?'},
  {id:2, name:'auto-washer', cost:2300, desc:'cannot you just wash your pet instead of buying this booster?slacker...'},
  {id:2, name:'auto-teacher', cost:5300, desc:'damn, try to pay attention to education at least in the game, looser'},
])

const isModalOpen = ref(false);
const modalTitle = ref(''); 

const openModal = (title: string) => {
  modalTitle.value = title; 
  isModalOpen.value = true;  
};

const closeModal = (label:string) => {
  isModalOpen.value = false; 
  if(label == 'PAUSE'){
    timer = setInterval(decreaseStats, 1000);
    isTimerActive.value = true;
  }
};
const isPaused = ref(false); // поставлено на паузу или нет
const isTimerActive = ref(true); // таймер активен или нет
const togglePause = () => {
  openModal('PAUSE');
  if (isPaused.value == false) {
    isTimerActive.value = false;
    clearInterval(timer);
  } 
};
const handleButtonClick = (label: string) => {
  if (label == 'PAUSE') {
    togglePause();
  } else {
    openModal(label); 
  }
};
let timer:any

onMounted(() => {
  timer = setInterval(decreaseStats, 1000); 
})

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
      color: "linear-gradient(#72cbff 3.36%, rgb(25 68 120 / 72%));",
      icon: "/pethousePic/emoji-happines-happy.png",
      textcolor: "#443263",
    };
  } else if (valueMeaning >= 60) {
    return {
      color: "linear-gradient(#77f54d 37.82%, rgb(40 137 21));",
      icon: "/pethousePic/emoji-happines-normal.png",
      textcolor: "#7e692c",
    };
  } else if (valueMeaning >= 30) {
    return {
      color: "linear-gradient(#ede509 3.36%, rgba(180, 112, 74, 0.73));",
      icon: "/pethousePic/emoji-happines-sad.png",
      textcolor: "#7e2c36",
    };
  } else {
    return {
      color: "linear-gradient(rgba(248, 124, 124, 1) 51.68%, #de5858 91.6%)",
      icon: "/pethousePic/emoji-happines-crying.png",
      textcolor: "#934833",
    };
  }
};
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

const styledStats = computed(() =>
  stats.value.map((stat) => ({...stat,style: getProgressBarStyle(stat.valueMeaning)}))
);
useHead({
  bodyAttrs: { class: "pthsbg" },
});

</script>

<style >
.product{
  height: 50px;
  width: 50px;
  box-shadow: 0 9px 6px rgba(0, 0, 0, 0.28);
}
.listik{
  flex-direction: column;
  align-items: flex-start;
}
.footer-list{
  border: 1px solid #ff4f40;
  height: 100%;
  width: 100%;
}
</style>
