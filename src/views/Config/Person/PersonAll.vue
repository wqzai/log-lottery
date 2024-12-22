<!-- eslint-disable vue/no-parsing-error -->
<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import useStore from '@/store'
import { IPersonConfig } from '@/types/storeType';
import { storeToRefs } from 'pinia'
import * as XLSX from 'xlsx'
import { readFileBinary } from '@/utils/file'
import { addOtherInfo } from '@/utils'
import DaiysuiTable from '@/components/DaiysuiTable/index.vue'

const personConfig = useStore().personConfig
const { getAllPersonList: allPersonList} = storeToRefs(personConfig)
const limitType = '.xlsx,.xls'
// const personList = ref<any[]>([])

const delAllDataDialog = ref()

const handleFileChange = async (e: Event) => {
    let dataBinary = await readFileBinary(((e.target as HTMLInputElement).files as FileList)[0]!)
    let workBook = XLSX.read(dataBinary, { type: 'binary', cellDates: true })
    let workSheet = workBook.Sheets[workBook.SheetNames[0]]
    const excelData = XLSX.utils.sheet_to_json(workSheet)
    const allData = addOtherInfo(excelData);
    personConfig.resetPerson()
    personConfig.addNotPersonList(allData)
}

const deleteAll = () => {
    personConfig.deleteAllPerson()
}

const delPersonItem = (row: IPersonConfig) => {
    personConfig.deletePerson(row)
}

const tableColumns = [
    {
        label: '编号',
        props: 'uid',
    },
    {
        label: '姓名',
        props: 'name',
    },
    {
        label: '部门',
        props: 'department',
    },
    // {
    //     label: '身份',
    //     props: 'identity',
    // },
    // {
    //     label: '是否已中奖',
    //     props: 'isWin',
    //     formatValue(row: IPersonConfig) {
    //         return row.isWin ? '是' : '否'
    //     }
    // },
    {
        label: '操作',
        actions: [
            {
                label: '删除',
                type: 'btn-error',
                onClick: (row: IPersonConfig) => {
                    delPersonItem(row)
                }
            },
        ]
    },
]
onMounted(() => {
})
</script>

<template>
    <dialog id="my_modal_1" ref="delAllDataDialog" class="border-none modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">提示!</h3>
            <p class="py-4">该操作会删除所有人员数据，是否继续？</p>
            <div class="modal-action">
                <form method="dialog" class="flex gap-3">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn" @click="delAllDataDialog.close()">取消</button>
                    <button class="btn" @click="deleteAll">确定</button>
                </form>
            </div>
        </div>
    </dialog>
    <div class="min-w-1000px">

        <h2>人员管理</h2>
        <div class="flex gap-3">
            <button class="btn btn-error btn-sm" @click="delAllDataDialog.showModal()">全部删除</button>
            <div class="tooltip tooltip-bottom" data-tip="下载文件后，请在excel中填写数据，并保存为xlsx格式">
                <a class="no-underline btn btn-secondary btn-sm" download="人员登记表.xlsx" target="_blank"
                    href="/log-lottery/人员登记表.xlsx">下载模板</a>
            </div>
            <div class="">
                <label for="explore">

                    <div class="tooltip tooltip-bottom" data-tip="上传修改好的excel文件">
                        <input type="file" class="" id="explore" style="display: none" @change="handleFileChange"
                            :accept="limitType" />

                        <span class="btn btn-primary btn-sm">导入人员数据</span>
                    </div>
                </label>
            </div>
        </div>
        <DaiysuiTable :tableColumns="tableColumns" :data="allPersonList"></DaiysuiTable>
    </div>
</template>

<style lang='scss' scoped></style>
