<script>
export default {
    props:["thisList"],
    data() {
        return {
            
        }
    },
}
</script>
<template>
    <div class="w-[70%] mx-auto my-12">
       <h1 class="text-2xl font-bold px-6 py-3 border-b-2 border-b-black">照片編輯</h1>
       <div class="flex text-2xl"> 
            <div class="mr-12">
                <div v-for="(item,index) in ['預算金額','執行地點','案子到期日']" class=" my-6">
                    <p class="font-bold">{{ item }}</p>
                </div>
            </div>
            <div>
                <div v-for="(item,index,arr) in {'預算金額':50000,'執行地點':'台南','案子到期日':'2023/09/30'}" class="flex items-center my-6">
                    <img width="15" class="mr-3" v-if=" arr !== 0" :src="'/src/assets/img/TackCaseImg/' + ( arr===1 ? 'location.png' : 'date.png') " alt="">
                    <p>{{ item }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
</style>