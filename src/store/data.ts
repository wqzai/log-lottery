import { IPrizeConfig, IPersonConfig } from '@/types/storeType';
export const defaultPersonList = <IPersonConfig[]>
    []
export const defaultMusicList = [
    {
        id: '春节序曲 - 纯音乐.mp3' + new Date().getTime().toString(),
        name: '春节序曲 - 纯音乐.mp3',
        url: 'https://img.cdn.apipost.cn/upload/user/0/file/5e472697-276c-4987-8aed-e08b2eef7ecc.mp3'
    }
]

export const defaultPrizeList = <IPrizeConfig[]>[
    {
        id: '001',
        name: '三等奖',
        sort: 1,
        isAll: false,
        count: 3,
        isUsedCount: 0,
        picture: {
            id: '2',
            name: '三等奖',
            url: 'https://img.cdn.apipost.cn/upload/user/0/file/dc71db53-6976-46fd-80b0-bcbfe961e0fc.png'
        },
        separateCount: {
            enable: true,
            countList: []
        },
        desc: '三等奖',
        isShow: true,
        isUsed: false,
        frequency: 1,
    },
    {
        id: '002',
        name: '二等奖',
        sort: 2,
        isAll: false,
        count: 2,
        isUsedCount: 0,
        picture: {
            id: '1',
            name: '二等奖',
            url: 'https://img.cdn.apipost.cn/upload/user/0/file/be60409a-3174-4ba2-9e2d-c9ebd74aa9ae.png'
        },
        separateCount: {
            enable: false,
            countList: []
        },
        desc: '二等奖',
        isShow: true,
        isUsed: false,
        frequency: 1,
    },
    {
        id: '003',
        name: '一等奖',
        sort: 3,
        isAll: false,
        count: 1,
        isUsedCount: 0,
        picture: {
            id: '0',
            name: '一等奖',
            url: 'https://img.cdn.apipost.cn/upload/user/0/file/4141d4ae-29c5-4ba8-aef2-0577385f6e82.png'
        },
        separateCount: {
            enable: false,
            countList: []
        },
        desc: '一等奖',
        isShow: true,
        isUsed: false,
        frequency: 1,
    }
]
export const defaultCurrentPrize = <IPrizeConfig>{
    id: '001',
    name: '三等奖',
    sort: 1,
    isAll: false,
    count: 12,
    isUsedCount: 0,
    picture: {
        id: '2',
        name: '三等奖',
        url: 'https://img.cdn.apipost.cn/upload/user/0/file/dc71db53-6976-46fd-80b0-bcbfe961e0fc.png'
    },
    separateCount: {
        enable: true,
        countList: []
    },
    desc: '三等奖',
    isShow: true,
    isUsed: false,
    frequency: 1,
}

export const defaultImageList = [
    {
        id: '0',
        name: '一等奖',
        url: 'https://img.cdn.apipost.cn/upload/user/0/file/4141d4ae-29c5-4ba8-aef2-0577385f6e82.png'
    },
    {
        id: '1',
        name: '二等奖',
        url: 'https://img.cdn.apipost.cn/upload/user/0/file/be60409a-3174-4ba2-9e2d-c9ebd74aa9ae.png'
    },
    {
        id: '2',
        name: '三等奖',
        url: 'https://img.cdn.apipost.cn/upload/user/0/file/dc71db53-6976-46fd-80b0-bcbfe961e0fc.png'
    },
    {
        id: '3',
        name: '背景图片',
        url: 'https://img.cdn.apipost.cn/upload/user/0/file/2e18d92d-d129-459a-88a7-d71ae96486a8.jpg'
    }
]
export const defaultPatternList = [21, 38, 55, 54, 53, 70, 87, 88, 89, 23, 40, 57, 74, 91, 92, 93, 76, 59, 42, 25, 24, 27, 28, 29, 46, 63, 62, 61, 78, 95, 96, 97, 20, 19, 31, 48, 65, 66, 67, 84, 101, 100, 99, 32, 33]
