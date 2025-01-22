"use client";
import FestivalDetail from "@/app/features/common/festivalDetailTemplate";
import Navbar from "@/app/features/common/Navbar/SmartPhone";
import { db } from "@/app/firebase";
import { FestivalContents, ImportantInfo ,Sponsors ,FesBaseInfo,FesContents} from "@/app/types/type";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { thisYear } from "@/app/features/common/commonValue";

let sponsors: Sponsors = {
  MainSponsor: "",
  SubSponsor: "",
  isSubSponsored: true,
};
let importantInfo: ImportantInfo = {
  date: "",
  Sponsors: sponsors,
  place: "",
};


const fesContents: FestivalContents[] = [
  {
    contentImage: "/image/tonokooriFesContents/gacha.png",
    contentTitle: "抽選会",
  },
  {
    contentImage: "/image/tonokooriFesContents/struckout.png",
    contentTitle: "ストラックアウト",
  },
  {
    contentImage: "/image/tonokooriFesContents/wanage.png",
    contentTitle: "輪投げ",
  },
  {
    contentImage: "/image/sanzaiFesContents/sengu.png",
    contentTitle: "せんぐまき",
  },
];
let introText = "";
let mapLink = "";
const flyerImage = "/image/tonokooriFesContents/joushi2024.jpg";
const garallyPhotos: string[] = [
  "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
];

const anotherInfos = [
  "乗馬体験や多彩なステージ、遊び体験などまだまだたくさんのイベントをご用意しています!",
];

export default function Tonokoori() {
  const [tonoFesInfo, setTonoFesInfo] = useState<FesBaseInfo>();
  const [tonoFesContents, setTonoFesContents] = useState<FesContents[]>();
  useEffect(() => {
    const fetchTonoFesData = async () => {
      const getTonoFesInfo = await getDocs(collection(db,"tono_fes_info"));
      const getTonoFesContents = await getDocs(collection(db,`tono_fes_contents${thisYear}`));
      const tonoFesContentsData = getTonoFesContents.docs.map((doc) => doc.data()) as FesContents[];
      const tonoFesInfoData = getTonoFesInfo.docs[1].data() as FesBaseInfo;
      setTonoFesInfo(tonoFesInfoData);
      setTonoFesContents(tonoFesContentsData);
    }
    fetchTonoFesData();
  },[]);
  const [showFlyerDialog, setShowFlyerDialog] = useState(false);

  if(tonoFesInfo !== undefined){
    importantInfo.date = tonoFesInfo.date;
    importantInfo.place = tonoFesInfo.place;
    sponsors.MainSponsor = tonoFesInfo.management
    sponsors.SubSponsor = tonoFesInfo.sponsor;
  
    introText = tonoFesInfo.intro_text;
    mapLink = tonoFesInfo.place_map_link;
  }
  
  if(tonoFesContents !== undefined){
    fesContents.forEach((content,index) => {
      // content.contentImage = tonoFesContents[index].image;
      content.contentTitle = tonoFesContents[index].name;
    });
  }
  return (
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

      {showFlyerDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">都於郡城址祭りチラシ</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowFlyerDialog(false)}
              >
                閉じる
              </button>
            </div>
            <div>
            <img src={flyerImage} alt="" className="w-64 md:w-96 h-auto" loading="lazy" />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 w-full bg-gray-100 py-4 flex justify-center">
        <button
          onClick={() => setShowFlyerDialog(true)}
          className="text-blue-500 hover:text-blue-700"
        >
          もっと詳しく見る！
        </button>
      </div>
    </>
  );
}