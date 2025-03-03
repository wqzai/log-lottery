<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue'
import { IImage } from '@/types/storeType'
import { readFileData } from '@/utils/file'
import localforage from 'localforage'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
import ImageSync from '@/components/ImageSync/index.vue'


const globalConfig= useStore().globalConfig
const { getImageList:localImageList} = storeToRefs(globalConfig)
const limitType = ref('image/*')
const imgUploadToast = ref(0) //0是不显示，1是成功，2是失败,3是不是图片
const imageDbStore = localforage.createInstance({
    name: 'imgStore'
})
const handleFileChange = async (e: Event) => {
    const files = (e.target as HTMLInputElement).files as FileList
    let isAnyImage = false
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const isImage = /image*/.test(file.type)
        if (!isImage) {
            imgUploadToast.value = 3

            return
        }
        isAnyImage = true
        let { dataUrl, fileName } = await readFileData(file)
        imageDbStore.setItem(fileName, dataUrl)
            .then(() => {
                imgUploadToast.value = 1
                getImageDbStore()
            })
            .catch(() => {
                imgUploadToast.value = 2
            })
    }
    if (!isAnyImage) {
        imgUploadToast.value = 3
    }
}

const getImageDbStore =async () => {
    const keys =await imageDbStore.keys()
    if(keys.length>0){
        await imageDbStore.iterate((value, key) => {
            globalConfig.addImage({
                id:key,
                name:key,
                url:'Storage'
            })
        })
    }
}

const removeImage=(item:IImage)=>{
    if(item.url=='Storage'){
        imageDbStore.removeItem(item.id).then(() => {
            globalConfig.removeImage(item.id)
        })
    }
    globalConfig.removeImage(item.id)
}

const resetImage = () => {
    globalConfig.resetImageList()
    globalConfig.setBackground({ name: '无', url: '', id: '' })
    imageDbStore.clear()
}

const deleteAll = () => {
    globalConfig.clearImageList()
    imageDbStore.clear()
}

onMounted(() => {
    // getImageDbStore()
})
watch(() => imgUploadToast.value, (val) => {
    if (val !== 0) {
        setTimeout(() => {
            imgUploadToast.value = 0
        }, 2000)
    }
})
</script>

<template>
    <div class="toast toast-top toast-end">
        <div class="alert alert-error" v-if="imgUploadToast == 2">
            <span>上传失败</span>
        </div>
        <div class="alert alert-success" v-if="imgUploadToast == 1">
            <span>上传成功</span>
        </div>
        <div class="alert alert-error" v-if="imgUploadToast == 3">
            <span>不是图片</span>
        </div>
    </div>

    <div>
        <div class="pt-7">
            <button class="btn btn-primary btn-sm" @click="resetImage">重置图片列表</button>
            <label for="explore">
                <input type="file" class="" id="explore" style="display: none" @change="handleFileChange"
                    :accept="limitType" multiple/>
                <span class="btn btn-primary btn-sm mr-3 ml-3">上传图片</span>
            </label>
            <button class="btn btn-error btn-sm" @click="deleteAll">删除所有</button>
        </div>
        <ul class="p-0">
            <li v-for="item in localImageList" :key="item.id" class="mb-3">
                <div class="flex items-center gap-8">
                    <div class="avatar h-14">
                        <div class="w-12 h-12 mask mask-squircle hover:w-14 hover:h-14">
                            <!-- <img v-if="item.url!=='Storage'" :src="item.url" alt="Avatar Tailwind CSS Component" /> -->
                            <ImageSync :imgItem="item"></ImageSync>
                        </div>
                    </div>
                    <div class="w-64">
                        <div class="overflow-hidden font-bold whitespace-nowrap text-ellipsis">{{ item.name}}</div>
                    </div>
                    <div>
                        <button class="btn btn-error btn-xs" @click="removeImage(item)">删除</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang='scss' scoped></style>
