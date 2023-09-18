<script>
import { RouterLink, RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
export default {
    components:{
        RouterLink,Icon
    },
    data() {
        return {
            user:{
                email:"asdf@gmail.com",
                pwd:"123456",
                user_name:"",
                phone:"0123456789"
            },    

           trueEmail: new RegExp("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"),
           truePhone: new RegExp("^0[\\d]{1}[\\d]{4}[\\d]{4}$"),
        }
    },
    methods:{
        editPersomInfo(){
            if(!this.trueEmail.test(this.user.email) || !this.truePhone.test(this.user.phone)){
                return false;
            }

            // fetch("...",{
            //     method:"post",
            //     mode:"no-cors",
            //     headers:{
            //         "Accect":"application/json, text/plain, */*",
            //         "Content-Type": "application/x-www-form-urlencoded"
            //     },
            //     body: "email" + this.user.email+
            //         "pwd" + this.user.pwd+
            //         "user_name" + this.user.user_name+
            //         "phone" + this.user.phone
            // })
            // .then(respone => respone.json())
            // .then(data =>{
            //     console.log(data);
            // })

            return false;
        },
    }
}
</script>
<template >
    <div class="w-[500px] mx-auto my-6">
        <form action="#" method="post" @submit.prevent="editPersomInfo">
            <div>
                <table class="w-full rounded-lg" style="border: 1px #d6d6d6 solid;" rules="rows">
                    <thead class="text-lg font-bold bg-slate-300 ">
                        <tr>
                            <th colspan="2" class="bg-[#a7a7a7] text-[white] text-xl font-bold px-6 py-3 rounded-lg">修改個人資料</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="w-[30%]">E-mail</th>
                            <td>
                                <div class="flex items-center">
                                    <input type="email" class="bg-[#f0eeee]" placeholder="E-mail" v-model="user.email" required>
                                    <Icon v-if="trueEmail.test(user.email)" icon="ri:checkbox-circle-fill" class="text-[#0fa958] ml-3 text-2xl"></Icon>
                                    <Icon v-if="!trueEmail.test(user.email)" icon="fluent-mdl2:status-error-full" class="text-[red] ml-3 text-xl"></Icon>
                                </div>
                                <p v-if="!trueEmail.test(user.email)" class="text-[red]">請輸入正確的電子郵件格式</p>
                            </td>
                        </tr>
                        <tr>
                            <th>密碼</th>
                            <td>
                                <input type="password" class="bg-[#cfcfcf]" v-model="user.pwd" disabled>
                                <RouterLink class="editPwd" to="#"> 修改</RouterLink>
                            </td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td>
                                <input type="text" class="bg-[#f0eeee]" placeholder="姓名" v-model="user.user_name" required>
                            </td>
                        </tr>
                        <tr>
                            <th>手機</th>
                            <td>
                                <div class="flex items-center">
                                    <input type="tel" class="bg-[#f0eeee]" placeholder="手機號碼" v-model="user.phone" required>
                                    <Icon v-if="truePhone.test(user.phone)" icon="ri:checkbox-circle-fill" class="text-[#0fa958] ml-3 text-2xl"></Icon>
                                    <Icon v-if="!truePhone.test(user.phone)" icon="fluent-mdl2:status-error-full" class="text-[red] ml-3 text-xl"></Icon>
                                </div>
                                <p v-if="!truePhone.test(user.phone)" class="text-[red]">請輸入符合格式的手機號碼 (0xxxxxxxxx)</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <input type="submit" class=" flex text-white rounded-lg bg-[#FF6E6E] py-3 px-12 mx-auto my-3 text-2xl font-bold hover:scale-105 active:scale-95" value="修改">
        </form>
    </div>
</template>

<style lang="scss" scoped>

    tbody{
        tr{
            border-bottom: 0.01rem rgb(209, 209, 209) solid;
            td{
                padding: 0.5rem 0;
                input{
                    padding: 0.25rem 0.75rem;
                    outline: none;
                    border-radius: 0.25rem;
                }
            }
        }
    }

    .editPwd{
        color: blue;
        border-bottom: 1px blue solid;
        margin-left: 0.5rem;

        &:hover{
            scale: 1.1;
            color: red;
            border-bottom: 1px red solid;
        }
        &:active{
            scale: 0.9;
            color: blue;
            border-bottom: 1px blue solid;
        }
    }
</style>