<script>
import { RouterLink, RouterView } from 'vue-router';
import { mapActions } from 'pinia';
import  defineStore  from '../store/dataStore';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import router from '../router';
export default {
    components:{
        RouterLink,Icon
    },
    data() {
        return {

            /** @param {boolean} userBtn 更改可編輯用戶表單 */
            userBtn:false, 
            /** @param {object} oldUser 用戶資料 */
            oldUser:{
                uuid:"",
                email:"adada",
                pwd:"**********",
                user_name:"",
                phone:"",
                rating:0
            },
           /**  @param {object} user 修改用戶資料時要存的站存檔 */ 
            user:{
                uuid:"",
                email:"",
                pwd:"**********",
                user_name:"",
                phone:"",
                rating:0
            },   
            

           trueEmail: new RegExp("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"),
           truePhone: new RegExp("^0[\\d]{1}[\\d]{4}[\\d]{4}$"),
           truePwd: new RegExp(".{8,30}$"),


            // 修改密碼
            editPwd:false,  // 修改狀態
            editPwdCheck:false,
            bgc:false,
            editPwdPage:{
                old_password:"",
                new_password:"",
                checkNewPwd:""
            },
            editStatus:{
                text:"",
                icon:"icon-park-solid:check-one",
                icon_style:"",
                meesage:""
            }
        }
    },
    methods:{

        ...mapActions(defineStore,["getUserInfo","setUserInfo"]),

        editPersomInfo(){
            if(!this.trueEmail.test(this.user.email) || !this.truePhone.test(this.user.phone)){
                alert("Email格式 或 手機格式 填寫錯誤")
                return false;
            }
            axios.post("http://localhost:8080/api/edit_user",{
                uuid:this.user.uuid,
                email:this.user.email,
                user_name:this.user.user_name,
                phone:this.user.phone
            })
            .then(data =>{
                if(data.data.code==="200"){
                    alert(data.data.message);
                    // this.setUserInfo(data.data.userInfo);
                    // this.userData = this.getUserInfo();
                    // this.user={
                    //     email:this.user.email,
                    //     pwd:"**********",
                    //     user_name:this.user.user_name,
                    //     phone:this.user.phone,
                    //     rating:this.user.rating
                    // }

                    this.oldUser = JSON.parse(JSON.stringify(this.user));
                    this.userBtn = false;
                }else{
                    alert(data.data.message);
                }
                console.log(data);
            })

            return false;
        },


        //修改密碼檢查
        editCheck(){
            if(this.editPwdPage.checkNewPwd!==this.editPwdPage.new_password){
                alert("密碼與確認密碼不一致!!!");
                return;
            }
            if(!this.truePwd.test(this.editPwdPage.new_password)){
                alert("密碼格式錯誤!!!");
                return;
            }
            axios.post("http://localhost:8080/api/change_pwd",{
                old_password:this.editPwdPage.old_password,
                new_password:this.editPwdPage.new_password
            },{ withCredentials: true })
            .then((data) => {
                console.log(data);
                console.log(this.editPwdPage);
                this.editPwdCheck=true;
                this.editPwd=false;

                if(data.data.code==="200"){
                    this.editStatus.text="修改成功";
                    this.editStatus.icon="icon-park-solid:check-one";
                    this.editStatus.icon_style="text-[green]";
                    this.editStatus.meesage="";

                    setTimeout(()=>{
                        this.editPwdCheck=false;
                        this.bgc=false;
                    },"2000");

                }else{
                    this.editStatus.text="修改失敗";
                    this.editStatus.icon="fluent-mdl2:status-error-full";
                    this.editStatus.icon_style="text-[red]";
                    this.editStatus.meesage="密碼格式錯誤";
                }
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    created(){
        axios.get("http://localhost:8080/api/get_balance",{ withCredentials: true })
        .then(res => {
            console.log(res);
            if(res.data.code==="200"){
                const userData = res.data.userInfo;
                this.user={
                    uuid:userData.uuid,
                    email:userData.email,
                    pwd:"**********",
                    user_name:userData.user_name,
                    phone:userData.phone,
                    rating: !userData.rating ? 0 : userData.rating
                };

                this.oldUser={
                    uuid:userData.uuid,
                    email:userData.email,
                    pwd:"**********",
                    user_name:userData.user_name,
                    phone:userData.phone,
                    rating: !userData.rating ? 0 : userData.rating
                }
            }else{
                router.push("/login_page");
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
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
                            <td v-if="userBtn">
                                <div class="flex items-center">
                                    <input type="email" class="bg-[#f0eeee]" placeholder="E-mail" v-model="user.email" required>
                                    <Icon :icon="trueEmail.test(user.email) ? 'ri:checkbox-circle-fill' : 'fluent-mdl2:status-error-full'" :class="'ml-3 text-2xl '+ (trueEmail.test(user.email) ? 'text-[green]':'text-[red]')"></Icon>
                                </div>
                                <p v-if="!trueEmail.test(user.email)" class="text-[red]">請輸入正確的電子郵件格式</p>
                            </td>
                            <td v-else>
                                <p>{{ oldUser.email }}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>密碼</th>
                            <td v-if="userBtn">
                                <input type="password" class="bg-[#cfcfcf]" v-model="user.pwd" autocomplete="on" disabled>
                                <button type="button" class="editPwd" @click="editPwd=true,bgc=true"> 修改</button>
                            </td>
                            <td v-else>
                                <p>{{ oldUser.pwd }}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td v-if="userBtn">
                                <input type="text" class="bg-[#f0eeee]" placeholder="姓名" v-model="user.user_name" required>
                            </td>
                            <td v-else>
                                <p>{{ oldUser.user_name }}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>手機</th>
                            <td v-if="userBtn">
                                <div class="flex items-center">
                                    <input type="tel" class="bg-[#f0eeee]" placeholder="手機號碼" v-model="user.phone" required>
                                    <Icon :icon="truePhone.test(user.phone) ? 'ri:checkbox-circle-fill' : 'fluent-mdl2:status-error-full'" :class="'ml-3 text-2xl '+ (truePhone.test(user.phone) ? 'text-[green]':'text-[red]')"></Icon>
                                </div>
                                <p v-show="!truePhone.test(user.phone)" class="text-[red]">請輸入符合格式的手機號碼 (0xxxxxxxxx)</p>
                            </td>
                            <td v-else>
                                <p>{{ oldUser.phone }}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>個人評價</th>
                            <td>
                                <div class="flex items-center">
                                    <div class="ratings">
                                        <div class="empty_star">★★★★★</div>
                                        <div :class="'full_star'" :style="'width:'+user.rating*20+'%'">★★★★★</div>
                                    </div>
                                    <p class="text-2xl mx-3 font-bold">{{ user.rating }}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="userBtn" class="flex justify-center">
                <input type="button" class=" block text-white rounded-lg bg-[#888888] cursor-pointer py-3 px-6 mx-3 my-6 text-2xl font-bold hover:scale-105 active:scale-95" value="取消" @click="userBtn=!userBtn">
                <input type="submit" class=" block text-white rounded-lg bg-[#FF6E6E] cursor-pointer py-3 px-6 mx-3 my-6 text-2xl font-bold hover:scale-105 active:scale-95" value="確定修改">      
            </div>
            <input v-else type="button" class=" flex text-white rounded-lg bg-[#FF6E6E] cursor-pointer py-3 px-6 mx-auto my-3 text-2xl font-bold hover:scale-105 active:scale-95" value="修改" @click="userBtn=!userBtn,user=JSON.parse(JSON.stringify(oldUser))">
        </form>
    </div>


    <!-- 修改密碼 -->
    <div v-if="editPwd" class=" fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] border-[black] border p-6 rounded-2xl z-10">
        <form action="#" method="post" @submit.prevent="editCheck">
            <h1 class="text-center text-3xl font-bold my-3">修改密碼</h1>
            <ul class=" editContent">
                <li>
                    <label for="oldPwd">舊密碼: </label>
                    <div>
                        <input id="oldPwd" type="text" v-model="editPwdPage.old_password" placeholder="請輸入舊密碼"  required>
                    </div>         
                </li>
                <li>  
                    <label for="newPwd">新密碼: </label>
                    <div>
                        <input id="newPwd" type="text" v-model="editPwdPage.new_password" placeholder="請輸入新密碼"  required>
                    </div>      
                </li>
                <li>  
                    <label for="checkNewPwd">確認密碼: </label>
                    <div>
                        <input id="checkNewPwd" type="text" v-model="editPwdPage.checkNewPwd" placeholder="請輸入確認密碼" required>
                    </div>
                </li>
            </ul>
            <div class="flex justify-center">
                <button type="button" class="py-3 px-6 bg-[#949494] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="bgc=false,editPwd=false">取消</button>
                <button type="submit" class="py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95">修改</button>
            </div>
        </form>
    </div>

    <!-- 修改成功 -->
    <div v-if="editPwdCheck" class="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] border-[black] border py-6 px-32 rounded-2xl z-10">
        <h1 class="text-center text-3xl font-bold my-3">{{ editStatus.text }}</h1>
        <p class="text-center text-3xl my-3 text-[red]">{{ editStatus.meesage }}</p>
        <Icon :icon="editStatus.icon" :class="'my-6 mx-auto '+ editStatus.icon_style" width="120" />
        <button v-if="editStatus.text==='修改失敗'" type="button" class="block mx-auto my-3 py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="editPwdCheck=false,bgc=false">確定</button>
    </div>

    <!-- 背景 -->
    <div v-if="bgc" class="fixed top-0 left-0 w-full h-[100vh] bg-[#00000083] z-0" @click="bgc=false,editPwd=false,editPwdCheck=false"></div>
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

                .ratings {
                    position: relative;
                    vertical-align: middle;
                    display: inline-block;
                    color: #a2a2a2; /*背景星星顏色*/
                    overflow: hidden;
                    font-size: 1.5rem; /*調整字體大小可放大縮小星星*/
                    text-shadow: 0px 1px 0 #999;

                    .full_star {
                        /*調整寬度可變更星等*/
                        position: absolute;
                        left: 0;
                        top: 0;
                        white-space: nowrap;
                        overflow: hidden;
                        color: #ff7300; /*前景星星顏色*/
                    }
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

    // 修改內容
    .editContent{
        margin: 2.5rem 5rem;
        li{
            display: flex;
            align-items: center;
            margin: 1rem 0;
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.5rem;

            label{
                margin-right: 0.75rem;
            }
            div{
                background-color: #b7b7b7;
                border-radius: 0.25rem;
                padding: 0.5rem 0.75rem;
                margin: 0 0.5rem;

                input[type="text"]{
                    border-bottom: 1px #757575 solid;
                    outline: none;
                    background-color: transparent;

                    &:-webkit-autofill{
                        
                        -webkit-text-fill-color: rgb(0, 0, 0);
                        -webkit-box-shadow: 0 0 0px 1000px #b7b7b7 inset;
                        transition: background-color 5000s ease-in-out 0s;
                        box-shadow: transparent;
                    }

                    &::placeholder{
                        color: #3d3d3d;
                    }
                }
   
            }   
        }
    }
</style>