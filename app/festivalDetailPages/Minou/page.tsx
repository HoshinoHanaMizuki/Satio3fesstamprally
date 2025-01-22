"use client";
import FestivalDetail from "@/app/features/common/festivalDetailTemplate";
import Navbar from "@/app/features/common/Navbar/SmartPhone";
import { FestivalContents, ImportantInfo ,Sponsors,FesBaseInfo,FesContents} from "@/app/types/type";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { thisYear } from "@/app/features/common/commonValue";

let introText ="";
let mapLink = "";
const sponsors : Sponsors = {
    MainSponsor :  "ちびっ子相撲大会実行委員会",
    SubSponsor : "",
    isSubSponsored : false
};
const importantInfo:ImportantInfo = {
    date : "2024-12-08",
    Sponsors : sponsors,
    place : "矢久度神社"
}

const fesContents:FestivalContents[] = [
    {
        contentImage : "",
        contentTitle : "CommingSoon・・",
    },
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

const anotherInfos = ["",""];
export default function Minou(){

    const [minouFesInfo, setMinouFesInfo] = useState<FesBaseInfo>();
    const [minouFesContents, setMinouFesContents] = useState<FesContents[]>();
    useEffect(() => {
        const fetchMinouFesData = async () => {
        const getMinouFesInfo = await getDocs(collection(db,"minou_fes_info"));
        const getMinouFesContents = await getDocs(collection(db,`minou_fes_contents${thisYear}`));
        const minouFesContentsData = getMinouFesContents.docs.map((doc) => doc.data()) as FesContents[];
        const minouFesInfoData = getMinouFesInfo.docs[0].data() as FesBaseInfo;
        setMinouFesInfo(minouFesInfoData);
        setMinouFesContents(minouFesContentsData);
        }
        fetchMinouFesData();
    });

    if(minouFesInfo !== undefined){
        importantInfo.date = minouFesInfo.date;
        importantInfo.place = minouFesInfo.place;
        sponsors.MainSponsor = minouFesInfo.management
        sponsors.SubSponsor = minouFesInfo.sponsor;
    
        introText = minouFesInfo.intro_text;
        mapLink = minouFesInfo.place_map_link;
    }
    
    if(minouFesContents !== undefined){
        fesContents.forEach((content,index) => {
        // content.contentImage = minouFesContents[index].image;
        content.contentTitle = minouFesContents[index].name;
        });
    }
    return(
        <>
            <Navbar />
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