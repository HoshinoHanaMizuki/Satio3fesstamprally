"use client";
import FestivalDetail from "@/app/features/common/festivalDetailTemplate";
import Navbar from "@/app/features/common/Navbar/SmartPhone";
import { ImportantInfo ,Sponsors,FesBaseInfo,FesContents} from "@/app/types/type";
import { db } from "@/app/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { thisYear } from "@/app/features/common/commonValue";

let introText ="";
let mapLink = "";
const sponsors : Sponsors = {
    MainSponsor :  "",
    SubSponsor : "",
    isSubSponsored : false
};
const importantInfo:ImportantInfo ={
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

const anotherInfos = ["",""];
export default function Minou(){

    const [minouFesInfo, setMinouFesInfo] = useState<FesBaseInfo>();
    const [minouFesContents, setMinouFesContents] = useState<FesContents[]>();
    useEffect(() => {
        const fetchMinouFesData = async () => {
        const getMinouFesInfo = await getDoc(doc(db,"minou_fes_info",`chibi_fes_info${thisYear}`));
        const getMinouFesContents = await getDocs(collection(db,`minou_fes_contents${thisYear}`));
        const minouFesContentsData = getMinouFesContents.docs.map((doc) => doc.data()) as FesContents[];
        const minouFesInfoData = getMinouFesInfo.data() as FesBaseInfo;
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
    let fesContents: FesContents[] = [];
    if(minouFesContents !== undefined){
        minouFesContents.map((minouFesContent) => {
            fesContents.push(minouFesContent);
        });
    }
    return(
        <>
            <Navbar />
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