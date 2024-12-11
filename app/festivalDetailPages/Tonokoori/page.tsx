"use client";
import FestivalDetail from "@/app/features/common/festivalDetailTemplate";
import Navbar from "@/app/features/common/Navbar/SmartPhone";
import { FestivalContents, ImportantInfo ,Sponsors} from "@/app/types/type";
import Image from "next/image";
import { useState } from "react";


const introText: string[] = [
  "都於郡城址まつりは、「都小っ子まつり」と「高屋山上陵祭」から成る西都市の4大まつりの一つで、",
  "地元の小学生による武者行列が見どころです。",
  "様々なステージイベントやゲーム、せんぐまき等も行われます。",
];
const sponsors: Sponsors = {
  MainSponsor: "都於郡城址まつり実行委員会",
  SubSponsor: "西都市",
  isSubSponsored: true,
};
const importantInfo: ImportantInfo = {
  date: "2024-11-10",
  Sponsors: sponsors,
  place: "都於郡条跡",
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
const flyerImage = "/image/tonokooriFesContents/joushi2024.jpg";
const garallyPhotos: string[] = [
  "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
];

const anotherInfos = [
  "乗馬体験や多彩なステージ、遊び体験などまだまだたくさんのイベントをご用意しています!",
];

export default function Tonokoori() {
  const [showFlyerDialog, setShowFlyerDialog] = useState(false);

  return (
    <>
      <Navbar />
      <FestivalDetail
        introText={introText}
        festivalContents={fesContents}
        importantInfo={importantInfo}
        garallyPhotos={garallyPhotos}
        mapLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.309709327911!2d131.3720668762382!3d32.06087102023835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3538af3498b3b48b%3A0xe15bb688dff5f552!2z6YO95pa86YOh5Z-OIOacrOS4uOi3oQ!5e0!3m2!1sja!2sjp!4v1729702532910!5m2!1sja!2sjp"
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