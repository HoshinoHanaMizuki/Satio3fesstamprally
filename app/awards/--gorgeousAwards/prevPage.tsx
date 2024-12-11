import Footer from "@/app/features/common/footer";
import Header from "@/app/features/common/header";

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
    {awardName:"特賞",goodName:"Nintedo-Switch",goodImage:"/image/awards/switch.jpg"},
    {awardName:"宮崎牛賞",goodName:"宮崎牛ローススライス5,000円相当",goodImage:"/image/awards/miyazakiCow.jpg"},
    {awardName:"西都すっぽん賞",goodName:"ゆずすっぽん鍋セットＭ",goodImage:"/image/awards/nabeSet.jpg"},
];

export default function GorgeousAwards(){

    return(
        <>
            <div className="allContainer w-screen pl-2 pr-2 text-lg sm:text-xl">
                <Header />
                <div className="textContainer text-center">
                    {gorgeousnAwardsText.map((text,index)=>(
                        <div key={index} className="text">{text}</div>
                    ))}
                </div>
                <div className="title text-center text-xl sm:text-3xl m-5">【豪華景品一覧※随時更新予定】</div>
                <div className="awardList grid grid-cols-1">
                    {gorgeousAwardInformations.map((gorgeousAwardInformation,index)=>(
                        <div key={index} className="themContainer text-center">
                            <div className="title">{gorgeousAwardInformation.awardName}:{gorgeousAwardInformation.goodName}</div>
                            <div className="image flex justify-center">
                                <img src={gorgeousAwardInformation.goodImage} alt="" className="w-64 md:w-96 h-auto" loading="lazy" />
                            </div>
                        </div>
                    ))}
                </div>

                <Footer  />
            </div>
        </>
    );
}