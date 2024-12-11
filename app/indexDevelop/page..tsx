import Image from "next/image";
import Header from "../features/common/header";
import Footer from "../features/common/footer";
type Festival ={
  fesName:string;
  fesImage:string;
  introText:string[];
  releaseDate:string;
  isLocked:boolean;
}

const festivalInfoArray:Festival[] = [
  {fesName:"三財へそまつり",fesImage:"/image/MinouSumou.JPG",introText:["A","B","C"],releaseDate:'2024-10-20',isLocked:false},
  {fesName:"都於郡城址まつり",fesImage:"/image/MinouSumou.JPG",introText:["A","B","C"],releaseDate:"2024-11-10",isLocked:true},
  {fesName:"三納ちびっこ相撲",fesImage:"/image/MinouSumou.JPG",introText:["A","B","C"],releaseDate:"2024-12-08",isLocked:true}
]

const stamprallyIntroText:string[] = festivalInfoArray.map((fesInfo,index)=>{
  return(
    `${festivalInfoArray[index].fesName}:${festivalInfoArray[index].releaseDate}`
  )
})

const bannerImage:string = "/image/charactors.png";
const partnersImages:string[] = [
  "/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG",
  "/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG",
  "/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG"
];


export default function Home() {

  return(
    <>
      {/* 全体 */}
      <div className="allContainer w-screen pl-2 pr-2">
        <Header />
        {/* バナー画像 */}
        <div className="campaignBanner mb-5">
          <img src={bannerImage} alt="" className="w-full h-auto" loading="lazy" />
        </div>
        {/* 説明テキスト */}
        <div className="campaignExplainText mb-5 grid grid-cols-1 sm:grid-cols-3">
          {festivalInfoArray.map((festivalInfo,index)=>(
            <div key={index} className="text text-center text-blue-800 mb-3 text-lg">
              <p>{festivalInfo.fesName}</p>
              <p>{festivalInfo.releaseDate} (日)</p>
            </div>
          ))}
        </div>
        <div className="comingSoon text-center text-2xl mb-10">Coming Soon...</div>
        <Footer />
      </div>
    </>
  )
}