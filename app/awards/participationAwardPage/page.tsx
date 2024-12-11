import Link from "next/link";
import { participationAwardsPartner } from "@/app/types/type";
import Header from "../../features/common/header";
import Footer from "../../features/common/footer";
import NavBar from "../../features/common/Navbar/Navbar";
import PhoneNavbar from "../../features/common/Navbar/SmartPhone";

const participationAwardsText:string[] = [
    "参加賞は",
    "西都市内の飲食店で使える",
    "グルメサービス券！！！",
    "(有効期限：2025年1月31日)"
];
const attentionText:string[] = [
    "-参加賞の注意点-",
    "・各サービスは店舗スタッフにお声がけを！",
    "・サービスは各店舗につき1度まで！",
    "・サービス対象は、参加賞1枚につきお１人様まで！"
];

const participationAwardsPartners:participationAwardsPartner[] = [
    {name:"O輪",image:"/image/partners/partner_22.jpg",link:"https://orin.owst.jp",award:["ドリンク１杯","無料"]},
    {name:"だご亭",image:"/image/partners/partner_11.jpg",link:"https://x.com/dagotei_izakaya",award:["テイクアウト","唐揚げ1個増量"]},
    {name:"キジョリーナ",image:"/image/partners/partner_30.jpg",link:"https://www.instagram.com/kijyori_na/",award:["会計100円引き"]},
    {name:"ブルーノ",image:"/image/partners/partner_1.jpg",link:"https://miyazaki.mypl.net/shop/00000343796/",award:["会計100円引き"]},
    {name:"ライフロング",image:"/image/partners/partner_19.jpg",link:"https://www.instagram.com/lifelong_burger?igsh=NHZxdnJsZ3Nvd2Fv",award:["ポテト注文時","増量"]},
    {name:"江戸長",image:"/image/partners/partner_21.jpg",link:"https://www.fd-miyazaki.com/saito/edocho",award:["握り１ネタ","サービス"]}
];


const gorgeousnAwardsText:string[] = [
    "抽選で当たる豪華景品は",
    "スタンプを集めるごとに",
    "当たりやすく、より豪華に！！"
];

type gorgeousAwardInformation = {
    awardName:string;
    goodName:string;
    goodImage:string;
}

const gorgeousAwardInformations:gorgeousAwardInformation[] = [
    {awardName:"特賞(パーフェクト)",goodName:"チューナーレス大型TV",goodImage:"/image/awards/tv.png"},
    {awardName:"特賞（お正月）",goodName:"Nintedo-Switch",goodImage:"/image/awards/switch.png"},
    {awardName:"宮崎牛賞",goodName:"宮崎牛ローススライス5,000円相当",goodImage:"/image/awards/miyazakiCow.png"},
    {awardName:"西都すっぽん賞",goodName:"ゆずすっぽん鍋セットＭ",goodImage:"/image/awards/nabeSet.png"},
    {awardName:"椎葉村物産賞",goodName:"椎葉の物産品セット",goodImage:"/image/awards/shiiba.png"}
];

export default function ParticipationAward(){
    return(
        <>
            <div className="allContainer w-screen pl-2 pr-2 text-lg sm:text-xl">
                {/* <NavBar /> */}
                <PhoneNavbar />
                <Header />
                <div className="title text-center text-xl sm:text-3xl m-5">【参加賞について】</div>
                <div className="textContainer text-center mb-5">
                    {participationAwardsText.map((text,index)=>(
                        <div key={index} className="text">{text}</div>
                    ))}
                </div>
                <div className="textContainer text-sm text-center mb-8">
                    {attentionText.map((text,index)=>(
                        <div key={index} className="text">{text}</div>
                    ))}
                </div>
                <div className="title text-center text-xl sm:text-3xl m-5">【参加賞サービス一覧】</div>
                <div className="participationAwardsListContainer grid grid-cols-2 sm:grid-cols-3">
                    {participationAwardsPartners.map((participationAwardsPartner,index)=>(
                        <>
                            <div key={index} className="themContainer m-5">
                                <div key={index}  className="partnerName text-center">{participationAwardsPartner.name}</div>
                                <div className="partnerImage cursor-pointer">
                                    <Link href={participationAwardsPartner.link}>
                                        <img src={participationAwardsPartner.image} alt="" className="w-full h-auto" loading="lazy" />
                                    </Link>
                                </div>
                                <div className="partnerAward text-center">
                                    {participationAwardsPartner.award.map((text,index)=>(
                                        <>
                                            <div key={index} className="text">{text}</div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </>
                    
                    ))}
                </div>

                <div className="textContainer text-center">
                    {gorgeousnAwardsText.map((text,index)=>(
                        <div key={index} className="text">{text}</div>
                    ))}
                </div>
                <div className="title text-center text-xl sm:text-3xl m-5">【豪華景品一覧※随時更新予定】</div>
                <div className="awardList grid grid-cols-1 md:grid-cols-2">
                    {gorgeousAwardInformations.map((gorgeousAwardInformation,index)=>(
                        <div key={index} className="themContainer text-center">
                            <div className="title text-base">{gorgeousAwardInformation.awardName}:{gorgeousAwardInformation.goodName}</div>
                            <div className="image flex justify-center">
                                <img src={gorgeousAwardInformation.goodImage} alt="" className="w-64 md:w-96 h-auto" loading="lazy" />
                            </div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}