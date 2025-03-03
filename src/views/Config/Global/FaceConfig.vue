<script setup lang='ts'>
import { ref, watch, onMounted } from 'vue'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
import { themeChange } from 'theme-change';
import zod from 'zod';
import daisyuiThemes from 'daisyui/src/theming/themes'
import { ColorPicker } from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';
import { isRgbOrRgba, isHex } from '@/utils/color'
import PatternSetting from './components/PatternSetting.vue'

const globalConfig = useStore().globalConfig
const personConfig = useStore().personConfig
const prizeConfig = useStore().prizeConfig
const { getTopTitle: topTitle,
    getTheme: localTheme,
    getPatterColor: patternColor,
    getPatternList: patternList,
    getCardColor: cardColor,
    getLuckyColor: luckyCardColor,
    getTextColor: textColor,
    getCardSize: cardSize,
    getTextSize: textSize,
    getRowCount: rowCount,
    getIsShowPrizeList: isShowPrizeList,
    getBackground: backgroundImage,
    getImageList: imageList
} = storeToRefs(globalConfig)
const { getAlreadyPersonList: alreadyPersonList, getNotPersonList: notPersonList } = storeToRefs(personConfig)
const colorPickerRef = ref()
const resetDataDialogRef = ref()
interface ThemeDaType {
    [key: string]: any
}
const isRowCountChange = ref(0) //0未改变，1改变,2加载中
const themeValue = ref(localTheme.value.name)
const topTitleValue = ref(structuredClone(topTitle.value))
const cardColorValue = ref(structuredClone(cardColor.value))
const luckyCardColorValue = ref(structuredClone(luckyCardColor.value))
const textColorValue = ref(structuredClone(textColor.value))
const cardSizeValue = ref(structuredClone(cardSize.value))
const textSizeValue = ref(structuredClone(textSize.value))
const rowCountValue = ref(structuredClone(rowCount.value))
const isShowPrizeListValue = ref(structuredClone(isShowPrizeList.value))
const patternColorValue = ref(structuredClone(patternColor.value))
const themeList = ref(Object.keys(daisyuiThemes))
const daisyuiThemeList = ref<ThemeDaType>(daisyuiThemes)
const backgroundImageValue = ref(backgroundImage.value)
const formData = ref({
    rowCount: rowCountValue,
})
const formErr = ref({
    rowCount: '',
})
const schema = zod.object({
    rowCount: zod.number({
        required_error: '必填项',
        invalid_type_error: '必须填入数字',
    })
        .min(1, '最小为1')
        .max(100, '最大为100')
    // 格式化


})
type ValidatePayload = zod.infer<typeof schema>
const payload: ValidatePayload = {
    rowCount: formData.value.rowCount,
}
const parseSchema = (props: ValidatePayload) => {
    return schema.parseAsync(props)
}

const resetPersonLayout = () => {
    isRowCountChange.value = 2
    setTimeout(() => {
        const alreadyLen = alreadyPersonList.value.length
        const notLen = notPersonList.value.length
        if (alreadyLen <= 0 && notLen <= 0) {
            return
        }
        const allPersonList = alreadyPersonList.value.concat(notPersonList.value)
        const newAlreadyPersonList = allPersonList.slice(0, alreadyLen)
        const newNotPersonList = allPersonList.slice(alreadyLen, notLen + alreadyLen)
        personConfig.deleteAllPerson()
        personConfig.addNotPersonList(newNotPersonList)
        personConfig.addAlreadyPersonList(newAlreadyPersonList, null)

        isRowCountChange.value = 0
    }, 1000)
}

const clearPattern = () => {
    globalConfig.setPatternList([] as number[])
}
const resetPattern = () => {
    globalConfig.resetPatternList()
}

const resetData = () => {
    globalConfig.reset();
    personConfig.reset();
    prizeConfig.resetDefault();
    // 刷新页面
    window.location.reload()
}

// const handleChangeShowFields = (fieldItem: any) => {
//     formData.value.showField.map((item) => {
//         if (item.label === fieldItem.label) {
//             item.value = !item.value
//         }
//     })
// }

watch(() => formData.value.rowCount, () => {
    payload.rowCount = formData.value.rowCount
    parseSchema(payload).then(res => {
        if (res.rowCount) {
            isRowCountChange.value = 1
            globalConfig.setRowCount(res.rowCount)
        }
    })
        .catch(err => {
            formErr.value.rowCount = err.issues[0].message
        })
})
watch(topTitleValue, (val) => {
    globalConfig.setTopTitle(val)
}),

    watch(themeValue, (val: any) => {
        const selectedThemeDetail = daisyuiThemeList.value[val]
        globalConfig.setTheme({ name: val, detail: selectedThemeDetail })
        themeChange(val)
        if (selectedThemeDetail.primary && (isHex(selectedThemeDetail.primary) || isRgbOrRgba(selectedThemeDetail.primary))) {
            globalConfig.setCardColor(selectedThemeDetail.primary)
        }
    }, { deep: true })

watch(cardColorValue, (val: string) => {
    globalConfig.setCardColor(val)
}, { deep: true })
watch(luckyCardColorValue, (val: string) => {
    globalConfig.setLuckyCardColor(val)
}, { deep: true })
watch(patternColorValue, (val: string) => {
    globalConfig.setPatterColor(val)
})
watch(textColorValue, (val: string) => {
    globalConfig.setTextColor(val)
}, { deep: true })
watch(cardSizeValue, (val: { width: number; height: number; }) => {
    globalConfig.setCardSize(val)
}, { deep: true }),
watch(textSizeValue, (val: number) => {
    globalConfig.setTextSize(val)
})
    watch(isShowPrizeListValue, () => {
        globalConfig.setIsShowPrizeList(isShowPrizeListValue.value)
    })
watch(backgroundImageValue, (val: {}) => {
    globalConfig.setBackground(val)
})
onMounted(() => {
})
</script>

<template>
    <dialog id="my_modal_1" ref="resetDataDialogRef" class="border-none modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">提示!</h3>
            <p class="py-4">该操作会重置所有数据，是否继续？</p>
            <div class="modal-action">
                <form method="dialog" class="flex gap-3">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn" @click="resetDataDialogRef.close()">取消</button>
                    <button class="btn" @click="resetData">确定</button>
                </form>
            </div>
        </div>
    </dialog>
    <div>
        <h2>全局配置</h2>
        <div class="mb-8">
            <button class="btn btn-sm btn-primary" @click="resetDataDialogRef.showModal()">重置所有数据</button>
        </div>
        <label class="flex flex-row items-center w-full gap-24 mb-10 form-control">
            <div class="">
                <div class="label">
                    <span class="label-text">标题</span>
                </div>
                <input type="text" v-model="topTitleValue" placeholder="输入标题"
                    class="w-full max-w-xs input input-bordered" />
            </div>
        </label>
        <label class="flex flex-row items-center w-full gap-24 mb-10 form-control">
            <div class="">
                <div class="label">
                    <span class="label-text">列数</span>
                </div>
                <input type="number" v-model="formData.rowCount" placeholder="Type here"
                    class="w-full max-w-xs input input-bordered" />
                <div class="help">
                    <span class="text-sm text-red-400 help-text" v-if="formErr.rowCount">
                        {{ formErr.rowCount }}
                    </span>
                </div>
            </div>
            <div>
                <div class="tooltip" data-tip="该项比较耗费时间和性能">
                    <button class="mt-5 btn btn-info btn-sm" :disabled="isRowCountChange != 1"
                        @click="resetPersonLayout">
                        <span>重设布局</span>
                        <span class="loading loading-ring loading-md" v-show="isRowCountChange == 2"></span>
                    </button>
                </div>
            </div>
        </label>
        <label class="w-full max-w-xs form-control mb-10">
            <div class="label">
                <span class="label-text">选择主题</span>
            </div>
            <select data-choose-theme class="w-full max-w-xs border-solid select select-bordered border-1" v-model="themeValue">
                <option disabled selected>选取主题</option>
                <option v-for="(item, index) in themeList" :key="index" :value="item">{{ item }}</option>
            </select>
        </label>
        <label class="w-full max-w-xs form-control mb-10">
            <div class="label">
                <span class="label-text">选择背景图片</span>
            </div>
            <select data-choose-theme class="w-full max-w-xs border-solid select select-bordered border-1"
                v-model="backgroundImageValue">
                <option disabled selected>选取背景图片</option>
                <option v-for="(item, index) in [{ name: '默认', url: '', id: '' }, ...imageList]" :key="index"
                    :value="item">{{ item.name }}</option>
            </select>
          <div style="width: 300px; margin-top: 15px;" v-if="backgroundImageValue.url !== ''">
            <ImageSync :key="backgroundImageValue.id" :imgItem="backgroundImageValue"
                       style="width: 100%"></ImageSync>
          </div>
        </label>
        <label class="w-full max-w-xs form-control mb-10">
            <div class="label">
                <span class="label-text">卡片颜色</span>
            </div>
            <ColorPicker ref="colorPickerRef" v-model="cardColorValue" v-model:pure-color="cardColorValue">
            </ColorPicker>
        </label>
        <label class="w-full max-w-xs form-control mb-10">
            <div class="label">
                <span class="label-text">中奖卡片颜色</span>
            </div>
            <ColorPicker ref="colorPickerRef" v-model="luckyCardColorValue" v-model:pure-color="luckyCardColorValue">
            </ColorPicker>
        </label>

        <label class="w-full max-w-xs form-control mb-10">
            <div class="label">
                <span class="label-text">文字颜色</span>
            </div>
            <ColorPicker ref="colorPickerRef" v-model="textColorValue" v-model:pure-color="textColorValue">
            </ColorPicker>
        </label>
        <label class="flex flex-row w-full max-w-xs gap-10 mb-10 form-control">
            <div>
                <div class="label">
                    <span class="label-text">卡片宽度</span>
                </div>
                <input type="number" v-model="cardSizeValue.width" placeholder="Type here"
                    class="w-full max-w-xs input input-bordered" />
            </div>
            <div>
                <div class="label">
                    <span class="label-text">卡片高度</span>
                </div>
                <input type="number" v-model="cardSizeValue.height" placeholder="Type here"
                    class="w-full max-w-xs input input-bordered" />
            </div>
        </label>
        <label class="w-full max-w-xs mb-10 form-control">
            <div class="label">
                <span class="label-text">文字大小</span>
            </div>
            <input type="number" v-model="textSizeValue" placeholder="Type here"
                class="w-full max-w-xs input input-bordered" />
        </label>
        <label class="w-full max-w-xs form-control mb-10">
            <div class="label">
                <span class="label-text">高亮颜色</span>
            </div>
            <ColorPicker ref="colorPickerRef" v-model="patternColorValue" v-model:pure-color="patternColorValue">
            </ColorPicker>
        </label>
        <label class="flex flex-row items-center w-full gap-24 mb-3 form-control">
            <div>
                <div class="label">
                    <span class="label-text">图案设置</span>
                </div>
                <div class="h-auto">
                    <PatternSetting :rowCount="rowCount" :cardColor="cardColor" :patternColor="patternColor"
                        :patternList="patternList"></PatternSetting>
                </div>
            </div>
        </label>
        <div class="flex w-full gap-3 mb-10">
            <button class="btn btn-info btn-sm" @click.stop="clearPattern">
                <span>清空图案设置</span>
            </button>
            <div class="tooltip" data-tip="默认图案设置针对17列时有效，其他列数请自行设置">
                <button class="btn btn-info btn-sm" @click="resetPattern">
                    <span>默认图案设置</span>
                </button>
            </div>
        </div>

        <label class="w-full max-w-xs mb-10 form-control">
            <div class="label">
                <span class="label-text">是否常显奖品列表</span>
            </div>
            <input type="checkbox" :checked="isShowPrizeListValue"
                @change="isShowPrizeListValue = !isShowPrizeListValue"
                class="mt-2 border-solid checkbox checkbox-secondary border-1" />
        </label>

    </div>
</template>

<style lang='scss' scoped></style>
