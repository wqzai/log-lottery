<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { configRoutes } from '../../router';


const router = useRouter();
const route = useRoute();
const menuList = ref<any[]>(configRoutes.children)

const cleanMenuList = (menu: any) => {
    const newList = menu;
    for (let i = 0; i < newList.length; i++) {
        if (newList[i].children) {
            cleanMenuList(newList[i].children);
        }
        if (!newList[i].meta) {
            newList.splice(i, 1);
            i--;
        }
    }

    return newList;
}

menuList.value = cleanMenuList(menuList.value);

const skip = (path: string) => {
    router.push(path);
}


</script>

<template>
    <div class="flex min-h-[calc(100%-280px)]">
        <ul class="w-56 m-0 mr-3 menu bg-base-200 pt-14">
            <li v-for="item in menuList" :key="item.name">
                <details open v-if="item.children">
                    <summary>{{ item.meta.title }}</summary>
                    <ul>
                        <li v-for="subItem in item.children" :key="subItem.name">
                            <details open v-if="subItem.children">
                                <summary>{{ subItem.meta!.title }}</summary>
                                <ul>
                                    <li v-for="subSubItem in subItem.children" :key="subSubItem.name">
                                        <a @click="skip(subItem.path)"
                                            :style="subSubItem.name == route.name ? 'background-color:rgba(12,12,12,0.2)' : ''">{{
                                                subSubItem.meta!.title }}</a>
                                    </li>
                                </ul>
                            </details>
                            <a v-else @click="skip(subItem.path)"
                                :style="subItem.name == route.name ? 'background-color:rgba(12,12,12,0.2)' : ''">{{
                                    subItem.meta!.title }}</a>
                        </li>
                    </ul>
                </details>
                <a v-else @click="skip(item.path)"
                    :style="item.name == route.name ? 'background-color:rgba(12,12,12,0.2)' : ''">{{ item.meta!.title }}</a>
            </li>
        </ul>
        <router-view class="mt-5"></router-view>
    </div>
    <footer class="p-10 rounded footer footer-center bg-base-200 text-base-content">
        <aside>
          <p>Copyright © 2025
            <a href="https://wqzai.cn/" target="_blank" class="cursor-pointer link link-hover text-inherit">wqzai.</a>
            All Rights Reserved.
          </p>
        </aside>
    </footer>
</template>

<style scoped></style>
