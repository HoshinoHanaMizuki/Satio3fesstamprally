"use client";
import FestivalDetail from "@/app/features/common/festivalDetailTemplate";
import { ImportantInfo, Sponsors ,FesBaseInfo,FesContents} from "@/app/types/type";
import { thisYear } from "@/app/features/common/commonValue";
import { db } from "@/app/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const sponsors : Sponsors = {
    MainSponsor :  "",
    SubSponsor : "",
    isSubSponsored : true
};
const importantInfo:ImportantInfo = {
    date : "",
    sponsors : sponsors,
    place : ""
};
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
        const getSanzaiFesInfo = await getDoc(doc(db,"sanzai_fes_info",`heso_fes_info${thisYear}`));
        const getSanzaiFesContents = await getDocs(collection(db,`sanzai_fes_contents${thisYear}`));
        const sanzaiFesContentsData = getSanzaiFesContents.docs.map((doc) => doc.data()) as FesContents[];
        const sanzaiFesInfoData = getSanzaiFesInfo.data() as FesBaseInfo;
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

    let fesContents: FesContents[] = [];
    if(sanzaiFesContents !== undefined){
        sanzaiFesContents.map((sanzaiFesContent) => {
            fesContents.push(sanzaiFesContent);
        });
    }

    return(
        <>
            <FestivalDetail 
                introText={introText} 
                fesContents={fesContents}
                importantInfo={importantInfo} 
                garallyPhotos={garallyPhotos} 
                mapLink={mapLink}
                anotherInfos={anotherInfos}
            />
        </>
       
    );
}

