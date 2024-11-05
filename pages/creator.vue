<template class="temp2">
    <div class="flex wrapper">
        <div class="flex upperPart ">
            <button @click="btnClick">back</button>
            <h2>Create Your Pet</h2>
        </div>
    
        <div class="flex middlePART ">
            <div class="flex palitra">
                <div class="circle blue">1</div>
                <div class="circle red">2</div>
                <div class="circle black">3</div>
                <div class="circle white">4</div>
                <div class="circle green">5</div>
                <div class="circle orange">6</div>
            </div>
            <div class="drawWindowColumn">
                <div class="drawWindow draw-window-1"></div>
                <button>Save Pet</button>
            </div>
            <div class="drawWindowColumn">
                <div class="drawWindow draw-window-2"></div>
                <button>Start Game</button>
            </div>
            <div class="choosePetID">
                <div class="animal dog1">1</div>
                <div class="animal dog2">2</div>
                <div class="animal dog3">3</div>
                <div class="animal cat1">4</div>
                <div class="animal cat2">5</div>
            </div>
        </div>

    </div>
    
</template>
<script setup lang="ts">

onMounted(()=>{
    document.body.className = 'crbg'
})

const btnClick = () => {
    navigateTo('/')
}

</script>
<style>
.wrapper{
    flex-direction: column;
    gap: 30px;
}
.upperPart{
    align-items: first baseline;
}
.flex {
    display: flex;
}
</style>