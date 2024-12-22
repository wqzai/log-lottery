<!-- eslint-disable vue/no-parsing-error -->
<script setup lang='ts'>
import { ref } from 'vue';
import useStore from '@/store'
import { IPersonConfig } from '@/types/storeType';
import { storeToRefs } from 'pinia';
import DaiysuiTable from '@/components/DaiysuiTable/index.vue'
import * as XLSX from 'xlsx'

const personConfig = useStore().personConfig

const { getAllPersonList: allPersonList, getAlreadyPersonList: alreadyPersonList, getAlreadyPersonDetail: alreadyPersonDetail } = storeToRefs(personConfig)

const resetDataDialog = ref()

const resetData = () => {
    personConfig.resetAlreadyPerson()
}

const exportData = () => {
    let data = JSON.parse(JSON.stringify(alreadyPersonList.value))
    // 排除一些字段
    for (let i = 0; i < data.length; i++) {
        delete data[i].x
        delete data[i].y
        delete data[i].id
        delete data[i].createTime
        delete data[i].updateTime
        delete data[i].prizeId
        delete data[i].isWin
        delete data[i].identity
        // 修改字段名称
        // if (data[i].isWin) {
        //     data[i].isWin = '是'
        // } else {
        //     data[i].isWin = '否'
        // }
        // 格式化数组为
        data[i].prizeTime = data[i].prizeTime.join(',')
        data[i].prizeName = data[i].prizeName.join(',')
    }
    let dataString = JSON.stringify(data)
    dataString = dataString
        .replaceAll(/uid/g, '编号')
        // .replaceAll(/isWin/g, '是否中奖')
        .replaceAll(/department/g, '部门')
        .replaceAll(/name/g, '姓名')
        // .replaceAll(/identity/g, '身份')
        .replaceAll(/prizeName/g, '获奖')
        .replaceAll(/prizeTime/g, '获奖时间')

    data = JSON.parse(dataString)

    if (data.length > 0) {
        const dataBinary = XLSX.utils.json_to_sheet(data)
        const dataBinaryBinary = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(dataBinaryBinary, dataBinary, 'Sheet1')
        XLSX.writeFile(dataBinaryBinary, '中奖详情.xlsx')
    }
}

const isDetail = ref(true)
const handleMoveNotPerson = (row: IPersonConfig) => {
    personConfig.moveAlreadyToNot(row)
}

const tableColumnsList = [
    {
        label: '编号',
        props: 'uid',
        sort: true
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
    {
        label: '奖品',
        props: 'prizeName',
        sort: true
    },
    {
        label: '操作',
        actions: [
            {
                label: '移入未中奖名单',
                type: 'btn-info',
                onClick: (row: IPersonConfig) => {
                    handleMoveNotPerson(row)
                }
            },
        ]
    },
]
const tableColumnsDetail = [
    {
        label: '编号',
        props: 'uid',
        sort: true
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
    {
        label: '奖品',
        props: 'prizeName',
        sort: true
    },
    {
        label: '中奖时间',
        props: 'prizeTime',

    },
    {
        label: '操作',
        actions: [
            {
                label: '移入未中奖名单',
                type: 'btn-info',
                onClick: (row: IPersonConfig) => {
                    handleMoveNotPerson(row)
                }
            },

        ]
    }
]
</script>

<template>
  <dialog id="my_modal_1" ref="resetDataDialog" class="border-none modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">提示!</h3>
            <p class="py-4">该操作会清空中奖人员数据，是否继续？</p>
            <div class="modal-action">
                <form method="dialog" class="flex gap-3">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn" @click="resetDataDialog.close()">取消</button>
                    <button class="btn" @click="resetData">确定</button>
                </form>
            </div>
        </div>
    </dialog>

    <div class="overflow-y-auto">
        
        <h2>已中奖人员管理</h2>
        <div class="flex items-center justify-start gap-3">
            <!-- <button class="btn btn-error btn-sm" @click="deleteAll">全部删除</button> -->
            <button class="btn btn-error btn-sm" @click="resetDataDialog.showModal()">清除中奖数据</button>
            <button class="btn btn-accent btn-sm" @click="exportData">导出结果</button>
            <div>
              <span>中奖人数：</span>
              <span>{{ alreadyPersonList.length }}</span>
              <span>&nbsp;/&nbsp;</span>
              <span>{{ allPersonList.length }}</span>
            </div>
        </div>
        <DaiysuiTable v-if="!isDetail" :tableColumns="tableColumnsList" :data="alreadyPersonList"></DaiysuiTable>

        <DaiysuiTable v-if="isDetail" :tableColumns="tableColumnsDetail" :data="alreadyPersonDetail"></DaiysuiTable>
    </div>
</template>

<style lang='scss' scoped></style>
