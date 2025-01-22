"use client"
import Footer from "@/app/features/common/footer";
import Header from "@/app/features/common/header";
import { FestivalDetails } from "@/app/types/type";
import NavBar from "./Navbar/Navbar";
import PhoneNavbar from "./Navbar/SmartPhone";

export default function FestivalDetail({introText,festivalContents,importantInfo,garallyPhotos,mapLink,anotherInfos}:FestivalDetails){

    return(
        <>
            {/* 全体 */}
            <div className="allContainer w-screen pl-2 pr-2">
                {/* <NavBar /> */}
                <PhoneNavbar />
                <Header />
                {/* 祭りのサムネイル */}
                <div className="fesThumnail mb-5">
                    <img src="/image/fesThumnail.png" alt="" className="w-full h-auto" loading="lazy" />
                </div>
                {/* 祭りの紹介テキスト */}
                <div className="festivalIntroText text-center border-b-4 border-black mb-3">
                    <div className="text-sm md:text-xl p-2">{introText}</div>
                
                </div>

                {/* 開催日程・主催・会場 */}
                <div className="importantInfo border-4  border-black text-center m-2 mb-5">
                    <div className="text-sm md:text-xl p-1">開催日時：{importantInfo.date}</div>
                    <div className="text-sm md:text-xl p-1">主催：{importantInfo.Sponsors.MainSponsor}</div>
                    {importantInfo.Sponsors.isSubSponsored && (
                        <div className="text-sm md:text-xl p-1">後援：{importantInfo.Sponsors.SubSponsor}</div>
                    )}
                    <div className="text-sm md:text-xl p-1">開催場所：{importantInfo.place}</div>
                </div>
                {/* 祭りのコンテンツ */}
                <div className="sectionTitle text-center text-xl m-2">【祭りのコンテンツ】</div>
                <div className="festivalContentsContainer grid grid-cols-3 sm:grid-cols-5 mb-3 ">
                {festivalContents.map((festivalContent, index) => (
                    <div key={index} className="fesImage p-1">
                        <img src={festivalContent.contentImage} alt="" className="w-full h-auto" loading="lazy" />
                        <p className="fesTitle text-sm text-center">{festivalContent.contentTitle}</p>
                    </div>
                ))}
                </div>

                {/* ギャラリー */}
                <div className="Garally grid grid-cols-3 sm:grid-cols-5">
                    {garallyPhotos.map((photo,index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img src={photo} alt="" className="w-full h-auto" loading="lazy" />
                        </div>
                    ))}
                </div>
                {/* アクセスマップ */}
                <div className="accessMap">
                    <iframe className="w-full h-80 sm:h-64" src={mapLink} loading="lazy"></iframe>
                </div>

                {/* その他の情報 */}
                <div className="anotherFooter text-center mt-3">
                    {anotherInfos.map((anotherInfo,index)=>(
                        <div key = {index} className="info p-1">{anotherInfo}</div>
                    ))}
                </div>
                <Footer />
            </div>
        </>
       
    );
}
