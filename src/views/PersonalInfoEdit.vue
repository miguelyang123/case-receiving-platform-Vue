<script>
export default {
    
}
</script>
<template >
    <div class="w-[70%] mx-auto my-6">
        <form action="/personalinfoedit" method="post" target="_self">
            <h1 class="bg-[#f56666] text-[white] text-2xl font-bold p-6 rounded-lg">修改個人資料</h1>
            <div class="my-6">
                <table class="w-full rounded-lg" style="border: 0.15vw #f4f2ff solid;border: 1;" rules="rows">
                    <thead class="text-xl font-bold bg-slate-300 ">
                        <tr>
                            <th colspan="2" class="p-6 text-start py-3">基本資料</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>E-mail</th>
                            <td>
                                <input type="text" placeholder="E-mail">
                            </td>
                        </tr>
                        <tr>
                            <th>密碼</th>
                            <td>
                                <input type="text" disabled>
                            </td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td>
                                <input type="text" placeholder="姓名">
                                <p>請填入您的中文姓名，勿使用假名或暱稱</p>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <input type="submit" class=" text-white rounded-lg bg-[#FF6E6E] py-3 px-6 text-2xl font-bold hover:scale-105 active:scale-95" value="修改">
        </form>
    </div>
</template>

<style lang="scss" scoped>
    
</style>