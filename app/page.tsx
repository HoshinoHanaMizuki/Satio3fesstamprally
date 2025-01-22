"use client"
import Link from "next/link";
import Footer from "./features/common/footer";
import Header from "./features/common/header";
import { Festival, SponsorsData } from "./types/type";
import Swiper from "./features/swiper/Swiper";
import NavBar from "./features/common/Navbar/Navbar";
import PhoneNavbar from "./features/common/Navbar/SmartPhone";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const festivalInfoArray:Festival[] = [
  {fesName:"三財へそまつり",fesLink:"Sanzai",fesImage:"/image/sanzaiThumnail.png",releaseDate:'2024-10-27',isLocked:false},
  {fesName:"都於郡城址まつり",fesLink:"Tonokoori",fesImage:"/image/Tonokoori_thumnail2.jpg",releaseDate:"2024-11-10",isLocked:false},
  {fesName:"三納ちびっこ相撲大会",fesLink:"Minou",fesImage:"/image/MinouSumou.jpg",releaseDate:"2024-12-08",isLocked:false}
]

const stamprallyIntroText:string[] = ["三財へそ祭り・都於郡城址祭り・三納ちびっ子相撲大会","３つのお祭りを回って","スタンプをゲットしよう！"];
const bannerImage:string = "/image/charactors.png";

export default function Home() {
  const [sponsorsData,setSponsorsData] = useState<SponsorsData[]>([]);
  useEffect(()=>{
    //sponsorデータを取得
    const fetchSponsor = async () => {
      const getSponsors = await getDocs(collection(db,"sponsors"));
      const sponsorsData = getSponsors.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as SponsorsData[];
      const sortedSData = sponsorsData.sort((a,b)=>a.sort_id - b.sort_id);
      setSponsorsData(sortedSData);
    };
    fetchSponsor(); 
  },[]);
  
  const partnersImages = sponsorsData.map((sponsor)=>sponsor.image);
  const partnersLink = sponsorsData.map((sponsor)=>sponsor.link);

  return(
    <>
      {/* 全体 */}
      <div className="allContainer w-screen pl-2 pr-2">
        {/* <NavBar /> */}
        <PhoneNavbar />
        <Header />
        {/* バナー画像 */}
        <div className="campaignBanner mb-5">
          <img src={bannerImage} alt="" className="w-full h-auto" loading="lazy" />
        </div>
        <h4 className="p-2 text-center">2024年度の本イベントは終了しました。<br></br>たくさんのご参加ありがとうございました！</h4>
        {/* 説明テキスト */}
        {/* <div className="campaignExplainText w-screen mb-5 text-sm md:text-xl">
          {stamprallyIntroText.map((text,index)=>(
            <div key={index} className="text text-center">{text}</div>
          ))}
        </div> */}
        {/* 参加方法 */}
        {/* <Swiper /> */}
        <h3 className="text-center text-lg mー5">【お正月抽選会結果発表！！】</h3>
        <div className="flex justify-center items-center">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/PDESFd3DON8?si=Sd-gXFPtyLXXvHLx" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>

        <div className="title text-center mt-5 text-xl">【豪華景品】</div>
        <div className="awardsLinks flex justify-center mt-5 mb-5">
          <div className="awardsLink w-72 sm:w-full">
            <Link href={`/awards/participationAwardPage`}>
              <div className="fesDetailLink cursor-pointer">
                <img src={"/image/awards/awardsLink.png"} alt="" className="w-full h-auto" loading="lazy" />
              </div>
            </Link>
          </div>
        </div>
        {/* ３つのフェスのパート */}
        <div className="title text-center mt-5 text-xl">【各お祭りの紹介】</div>
        <div className="3fesIntroContainer grid grid-cols-1 sm:grid-cols-3 text-center">
          {festivalInfoArray.map((fesInfo,index)=>(
            <div key={index} className="fesContainer m-2">
              <div className="fesImage flex justify-center items-center">
                <img src={fesInfo.fesImage} alt="" className="w-full h-auto" loading="lazy" />
              </div>
              <div className="fesTitle text-sm md:text-xl">{fesInfo.fesName}</div>
              <div className="LinkForDetail">
                {!fesInfo.isLocked && (
                  <Link href={`/festivalDetailPages/${fesInfo.fesLink}`}>
                    <div className="fesDetailLink underline text-blue-900 cursor-pointer">詳しくはこちら！</div>
                  </Link>
                )}
                {fesInfo.isLocked && (
                  <div className="comminSoon underline text-sm text-gray-400">Comming Soon</div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* 協賛一覧 */}
        <div className="title text-center mt-5 text-xl">【協賛先一覧】</div>
        <div className="partnersContainer grid grid-cols-3 sm:grid-cols-5">
          {partnersImages.map((partner,index)=>(
            <div key={index} className="partnerBanner m-1 cursor-pointer">
              <Link href={partnersLink[index]}>
                <img src={partner} alt="" className="w-full h-auto" loading="lazy" />
              </Link>
            </div>
          ))}
        </div>
        {/* SNS等リンク先記載のフッター */}
        <Footer />
      </div>
    </>
  )
}