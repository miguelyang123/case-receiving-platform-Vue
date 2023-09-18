<script>
export default {
    data() {
        return {
            allUsers:{
                user1:{
                    email:"asdf@gmail.com",
                    // pwd:"123456",
                    user_name:"凱薩",
                    phone:"0123456789",
                    rating:4,
                    is_administrator:'否',
                    locked_status:'否'
                },   
                user2:{
                    email:"dasdsdeasx@gmail.com",
                    // pwd:"123456",
                    user_name:"凱蒂",
                    phone:"0987654321",
                    rating:3,
                    is_administrator:'否',
                    locked_status:'否'
                },   
            }  
        }
    },
}
</script>
<template>
    <div class="w-[70%] mx-auto">
       <table class="border-2 border-black border-collapse w-full my-12">
        <thead>
            <tr>
                <th class="border-2 border-black whitespace-pre" v-for="(item,index) in ['','E-Mail','姓名','手機','評價','身分權限 \n (管理者)','鎖定狀態']">{{ item }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item1,index1) in allUsers">
                <td class="border-2 border-black text-center py-2">
                    <button type="button" class="editBtn">修改</button>
                </td>
                <td class="border-2 border-black text-center text-lg" v-for="(item2,index2) in item1">{{ item2 }}</td>
            </tr>
        </tbody>
        <tfoot></tfoot>
       </table>
    </div>
</template>
<style lang="scss" scoped>
    .editBtn{
        background-color: #FF6E6E;
        color: white;
        padding: 0.75rem;
        font-size: 1.125rem/* 18px */; line-height: 1.75rem/* 28px */;
        border-radius: 0.5rem;
        font-weight: 700;

        &:hover{
            scale: 1.05;
            background-color: blue;
        }
        &:active{
            scale: 0.95;
            background-color: #FF6E6E;
        }
    }
</style>