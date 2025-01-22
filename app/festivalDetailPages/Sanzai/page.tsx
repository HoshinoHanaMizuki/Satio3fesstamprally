"use client";
import FestivalDetail from "@/app/features/common/festivalDetailTemplate";
import { FestivalContents, ImportantInfo, Sponsors ,FesBaseInfo,FesContents} from "@/app/types/type";
import { thisYear } from "@/app/features/common/commonValue";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const sponsors : Sponsors = {
    MainSponsor :  "三財地域づくり協議会",
    SubSponsor : "西都市・三財商工会",
    isSubSponsored : true
};
const importantInfo:ImportantInfo = {
    date : "2024-10-27（午前9時〜午後3時）",
    Sponsors : sponsors,
    place : "三財小中学校グラウンド（雨天時：同体育館）"
};


const fesContents:FestivalContents[] = [
    {
        contentImage : "/image/sanzaiFesContents/hesoDance.jpg",
        contentTitle : "へそ踊り",
    },
    {
        contentImage : "/image/sanzaiFesContents/hesoZumou.jpg",
        contentTitle : "へそ相撲",
    },
    {
        contentImage : "/image/sanzaiFesContents/stamp_rally.png",
        contentTitle : "スタンプラリー",
    },
    {
        contentImage : "/image/sanzaiFesContents/tyuusen.png",
        contentTitle : "お楽しみ抽選会",
    },
    {
        contentImage : "/image/sanzaiFesContents/fish_tsukamidori.png",
        contentTitle : "アユつかみ取り",
    },
    {
        contentImage : "/image/sanzaiFesContents/tonjiru.png",
        contentTitle : "ふるまい（豚汁）",
    },
    {
        contentImage : "/image/sanzaiFesContents/manju.png",
        contentTitle : "ふるまい（まんじゅう）",
    },
    {
        contentImage : "/image/sanzaiFesContents/sengu.png",
        contentTitle : "せんぐまき",
    },
    {
        contentImage : "/image/sanzaiFesContents/bando.png",
        contentTitle : "バンド演奏"
    },
    {
        contentImage : "/image/sanzaiFesContents/suisougaku.png",
        contentTitle : "吹奏楽部演奏"
    },
    {
        contentImage : "/image/sanzaiFesContents/taiko.png",
        contentTitle : "和太鼓"
    },
    {
        contentImage : "/image/sanzaiFesContents/fuladance.png",
        contentTitle : "フラダンス"
    },
    {
        contentImage : "/image/sanzaiFesContents/yakisoba.png",
        contentTitle : "出店（焼きそば)"
    },
    {
        contentImage : "/image/sanzaiFesContents/jidori.png",
        contentTitle : "出店（焼き鳥)"
    },
    {
        contentImage : "/image/sanzaiFesContents/burger.png",
        contentTitle : "出店（バーガー)"
    },
    {
        contentImage : "/image/sanzaiFesContents/softcream.png",
        contentTitle : "出店（ソフトクリーム)"
    }
];

const garallyPhotos:string[] = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let introText = "";
let mapLink = "";

const anotherInfos = [
    "【備 考】会場内にゴミ箱は設置されていません。",
    "【問合せ先】第１７回 三財へそ祭り実行委員会事務局（三財地域づくり協議会内）",
    "（電話）44-5831 （FAX）44-5831"];
export default function Sanzai(){

    const [sanzaiFesInfo, setSanzaiFesInfo] = useState<FesBaseInfo>();
    const [sanzaiFesContents, setSanzaiFesContents] = useState<FesContents[]>();
    useEffect(() => {
        const fetchSanzaiFesData = async () => {
        const getSanzaiFesInfo = await getDocs(collection(db,"sanzai_fes_info"));
        const getSanzaiFesContents = await getDocs(collection(db,`sanzai_fes_contents${thisYear}`));
        const sanzaiFesContentsData = getSanzaiFesContents.docs.map((doc) => doc.data()) as FesContents[];
        const sanzaiFesInfoData = getSanzaiFesInfo.docs[0].data() as FesBaseInfo;
        setSanzaiFesInfo(sanzaiFesInfoData);
        setSanzaiFesContents(sanzaiFesContentsData);
        }
        fetchSanzaiFesData();
    },[]);

    if(sanzaiFesInfo !== undefined){
        importantInfo.date = sanzaiFesInfo.date;
        importantInfo.place = sanzaiFesInfo.place;
        sponsors.MainSponsor = sanzaiFesInfo.management
        sponsors.SubSponsor = sanzaiFesInfo.sponsor;
    
        introText = sanzaiFesInfo.intro_text;
        mapLink = sanzaiFesInfo.place_map_link;
    }
    
    if(sanzaiFesContents !== undefined){
        fesContents.forEach((content,index) => {
        // content.contentImage = sanzaiFesContents[index].image;
        // content.contentTitle = sanzaiFesContents[index].name;
        });
    }

    return(
        <>
            <FestivalDetail 
                introText={introText} 
                festivalContents={fesContents}
                importantInfo={importantInfo} 
                garallyPhotos={garallyPhotos} 
                mapLink={mapLink}
                anotherInfos={anotherInfos}
            />
        </>
       
    );
}

