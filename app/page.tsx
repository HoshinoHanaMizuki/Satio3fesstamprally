import Link from "next/link";
import Footer from "./features/common/footer";
import Header from "./features/common/header";
import { Festival } from "./types/type";
import Swiper from "./features/swiper/Swiper";
import NavBar from "./features/common/Navbar/Navbar";
import PhoneNavbar from "./features/common/Navbar/SmartPhone";

const festivalInfoArray:Festival[] = [
  {fesName:"三財へそまつり",fesLink:"Sanzai",fesImage:"/image/sanzaiThumnail.png",releaseDate:'2024-10-27',isLocked:false},
  {fesName:"都於郡城址まつり",fesLink:"Tonokoori",fesImage:"/image/Tonokoori_thumnail2.jpg",releaseDate:"2024-11-10",isLocked:false},
  {fesName:"三納ちびっこ相撲大会",fesLink:"Minou",fesImage:"/image/MinouSumou.jpg",releaseDate:"2024-12-08",isLocked:false}
]

const stamprallyIntroText:string[] = ["三財へそ祭り・都於郡城址祭り・三納ちびっ子相撲大会","３つのお祭りを回って","スタンプをゲットしよう！"];
const bannerImage:string = "/image/charactors.png";


const parners_num : number = 33;
let partnersImages:string[] = [];
for(let i = 0; i < parners_num; i++){
  partnersImages[i] = `/image/partners/partner_${i+1}.jpg`;
}

const partnersLink : string[] = [
  "https://miyazaki.mypl.net/shop/00000343796/",
  "https://www.hotpepper.jp/strJ003581722/",
  "https://www.instagram.com/kanoa_1023/?igsh=MWFiYW9sNmVtYmJucg%3D%3D",
  "https://www.drk.co.jp",
  "https://www.nantokasuruhoken.com/plusone/",
  "https://s-suppon.com",
  "https://maps.app.goo.gl/co1Q9kWzrbzrn5u78",
  "https://g.co/kgs/VYLjHYG",
  "https://g.co/kgs/SjTjQ6h",
  "https://g.co/kgs/id3YgkM",
  "https://x.com/dagotei_izakaya",
  "https://kimura-k.info",
  "http://www.u-irifune.com",
  "https://www.kagurashuzo.co.jp",
  "https://www.city.saito.lg.jp/kurashi/post_881.html",
  "https://g.co/kgs/hHUznik",
  "https://www.tonokurimansyo.com/",
  "https://g.co/kgs/7YcGW5k",
  "https://www.instagram.com/lifelong_burger?igsh=NHZxdnJsZ3Nvd2Fv",
  "https://g.co/kgs/zSwmMWT",
  "https://www.fd-miyazaki.com/saito/edocho",
  "https://orin.owst.jp",
  "https://g.co/kgs/nnwGyfF",
  "https://www.city.saito.lg.jp/kurashi/0118_1703310000000004.html",
  "https://corporation-create.com/",
  "http://daiku510.com/",
  "https://www.saito-kanko.jp/news-cate/2024sanzaihesofes/",
  "https://map.yahoo.co.jp/v2/place/oeN96H6UtKk",
  "https://star-fruits-company.39lively.com/",
  "https://www.instagram.com/kijyori_na/",
  "https://ja.wikipedia.org/wiki/%E5%8E%9F%E3%83%9E%E3%83%AB%E3%83%86%E3%82%A3%E3%83%8E",
  "https://dic.pixiv.net/a/%E3%82%B7%E3%83%A3%E3%83%AA%E3%82%A2%E3%83%BB%E3%83%96%E3%83%AB",
  "https://www.shiibakanko.jp/"
]




export default function Home() {

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