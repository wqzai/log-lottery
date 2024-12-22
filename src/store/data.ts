import { IPrizeConfig, IPersonConfig } from '@/types/storeType';
import music from '@/assets/music/春节序曲 - 纯音乐.mp3';
import earphone from '@/assets/images/earphone.webp';
import phone from '@/assets/images/phone.webp';
import pc from '@/assets/images/pc.webp';
import bg from '@/assets/images/bg.jpg';

export const defaultPersonList = <IPersonConfig[]>
    []
export const defaultMusicList = [
    {
        id: '春节序曲 - 纯音乐.mp3',
        name: '春节序曲 - 纯音乐.mp3',
        url: music
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
            name: '三等奖.png',
            url: earphone
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
            name: '二等奖.png',
            url: phone
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
            name: '一等奖.png',
            url: pc
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
        name: '三等奖.png',
        url: earphone
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
        name: '一等奖.png',
        url: pc
    },
    {
        id: '1',
        name: '二等奖.png',
        url: phone
    },
    {
        id: '2',
        name: '三等奖.png',
        url: earphone
    },
    {
        id: '3',
        name: '背景图片.png',
        url: bg
    }
]
export const defaultPatternList = [21, 38, 55, 54, 53, 70, 87, 88, 89, 23, 40, 57, 74, 91, 92, 93, 76, 59, 42, 25, 24, 27, 28, 29, 46, 63, 62, 61, 78, 95, 96, 97, 20, 19, 31, 48, 65, 66, 67, 84, 101, 100, 99, 32, 33]
