<script>
import { RouterLink, RouterView} from 'vue-router';
export default {
    comments:{
        RouterLink
    }
}
</script>
<template >
    <header class="w-100">
        <div class="flex justify-between items-center py-6 px-14 bg-[#D9D9D9]">
            <div class=" flex items-baseline">
                <h1 class="text-4xl font-bold">Speed接案網</h1>
                <h2 class="mx-6 font-bold">你的專案，我的專長</h2>
            </div> 
            <RouterLink class="headerBtn" to="/">我要發案</RouterLink>
        </div>
        <div class="flex px-16 py-3 bg-[#FF6E6E] justify-between">
            <div class="flex">
                <RouterLink class="navBtn" to="/">首頁</RouterLink>
                <RouterLink class="navBtn" to="/tackcasepage">我要接案</RouterLink>
            </div>
            <RouterLink class="navBtn" to="/personal_info">我的帳號</RouterLink>
        </div>
        
    </header>
</template>

<style lang="scss" scoped>
    .headerBtn{
        background-color: #FF6E6E;
        padding: 0.75rem 1.5rem;
        font-size: 1.5rem;
        line-height: 2rem;
        border-radius: 0.5rem;
        font-weight: 700;

        &:hover{
            scale: 1.05;
        }
        &:active{
            scale: 0.95;
        }
    }

    .navBtn{
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2rem;
        margin: 0 1.5rem;

        &:hover{
            scale: 1.05;
            color: red;
        }
        &:active{
            scale: 0.95;
            color: blue;
        }
    }
</style>