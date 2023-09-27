<script>
import axios from 'axios';
import { Icon } from '@iconify/vue';
import { mapActions } from 'pinia';
import dataStore from '../store/dataStore';
export default {
	components:{
		Icon,
	},
	data() {
		return {
			searchText: "",
			jobClass: null,

			mapSelect: {
				mapShow: false,
				showAllMap: [],
				jobArea: "地區不限",
				thisMapId: "",

				onsite: "",
				remote: ""
			},

			price:{
                minPrice:null,
                maxPrice:null
            },
		};
	},
	methods:{

		changeMap(index1) {
            this.mapSelect.jobArea = index1.locationName;
            this.mapSelect.mapShow = false;
			this.mapSelect.thisMapId = index1.locationId;
        },

		thisType1(index){
			if(index==="onsite"){
				this.mapSelect.showAllMap = [{locationId:"",locationName:"地區"}].concat(this.mapSelect.onsite);
			}else if(index === "remote"){
				this.mapSelect.showAllMap = [{locationId:"",locationName:"地區"}].concat(this.mapSelect.remote);
			}else{
				this.mapSelect.showAllMap = [{locationId:"",locationName:"地區"}].concat(this.mapSelect.onsite.concat(this.mapSelect.remote));
			}
		},

		searchType(){
			let search = {
				locationName:this.mapSelect.jobArea,
				locationId: this.mapSelect.thisMapId,
				caseClass: this.jobClass,
				searchKeyword: this.searchText,
				price:this.price
			};
			console.log(search.locationId);

			this.$router.push({
				path:"/tackcasepage",
				query:{
					searchTypeAll:JSON.stringify(search)
				}
			});

			return false;
		},
	},
	mounted(){
		// 所有城市變例
        axios.get("http://localhost:8080/location_api/get_"+"onsite")
            .then(data =>{
                let arr1=[];
                let arr2=[];
                let arr3=[];
                if(data.data.code==="200"){

                    Object.values(data.data.locationList).forEach(item => {
                        arr1.push(item);
                        arr3.push(item);
                    });
                    // arr2 = arr;
                    this.mapSelect.remote = arr1;
                    // this.mapSelect.showAllMap = this.mapSelect.showAllMap.concat(this.mapSelect.remote);
                    
                    axios.get("http://localhost:8080/location_api/get_"+"remote")
                    
                    .then(data2 =>{
                        if(data2.data.code==="200"){

                            Object.values(data2.data.locationList).forEach(item => {
                                arr2.push(item);
                                arr3.push(item);
                            });
                            this.mapSelect.onsite =arr2;
                            this.mapSelect.showAllMap = [{locationId:"",locationName:"地區不限"}].concat(arr3);
                        }
                        // console.log("this.mapSelect.remote: "+this.mapSelect.remote);
                        // console.log("this.mapSelect.onsite: "+this.mapSelect.onsite);
                        // console.log("this.mapSelect.showAllMap: "+this.mapSelect.showAllMap);
                        
                    })
                    .catch(err2 =>{
                        console.log(err2);
                    });


                    // if(item==="onsite"){
                        // this.mapSelect.onsite =arr;
                        // this.mapSelect.showAllMap = [{locationId:"",locationName:"地區不限"}].concat(this.mapSelect.onsite);
                    // }else{
                    //     this.mapSelect.remote = arr;
                    //     this.mapSelect.showAllMap = this.mapSelect.showAllMap.concat(this.mapSelect.remote);
                    // }
                }
            })
            .catch(err =>{
                console.log(err);
            });
	}
};
</script>

<template>
	<form @submit.prevent="searchType">
		<div class="flex items-center">
			<input type="search" id="search"
				class="block p-4 text-2xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
				placeholder="搜尋案子" v-model="searchText" />

			<!-- 地區 select -->
			<div id="jobArea" class=" relative bg-gray-50 border border-gray-300 text-gray-900 w-[200px] rounded-lg focus:ring-blue-500 focus:border-blue-500 mr-1 mx-1 cursor-pointer" 
				@mousemove="mapSelect.mapShow = true" @mouseleave="mapSelect.mapShow=false">
				<div class="flex items-center justify-evenly m-2.5">
					<p>{{ mapSelect.jobArea }}</p>
					<Icon icon="iconamoon:arrow-down-2-bold" width="20" />
				</div>
				<div v-if="mapSelect.mapShow" class="mapAndPriceSelect shadow-xl">
					<div v-for="(item, index) in mapSelect.showAllMap"
						class=" font-bold py-3 pl-3 cursor-pointer hover:bg-blue-300 hover:text-white"
						@click="changeMap(item);">
						<input type="radio" :id="'showMap' + index" name="thismap" class="mr-3 cursor-pointer" :value="item.locationId"
							:checked="mapSelect.jobArea === item.locationName">
						<label :for="'showMap' + index" class="cursor-pointer">{{ item.locationName }}</label>
					</div>
				</div>
			</div>

			<!-- 類別 select  -->
			<select id="jobClass"
				class=" cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mx-1"
				v-model="jobClass" @change="thisType1(jobClass)">
				<option :value="null" selected>類別</option>
				<option value="remote">遠端</option>
				<option value="onsite">現場</option>
			</select>

			<button type="submit"
				class="text-white right-3 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3">
				<svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
					viewBox="0 0 20 20">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
				</svg>
			</button>
		</div>
	</form>
</template>

<style lang="scss" scoped>
	// 下拉選單
	.mapAndPriceSelect {
		// padding: 0.75rem 2rem 0.75rem 1.5rem;
		width: 100%;
		position: absolute;
		background: white;
		max-height: 200px;
		overflow: auto;
		border: 2px rgb(200, 200, 200) solid;
		border-radius: 0.75rem;
		z-index: 50;

		&::-webkit-scrollbar-thumb {
			background: #9b9b9b;
			border-radius: 9999px;
		}

		&::-webkit-scrollbar {
			width: 5px;
		}
	}
</style>
