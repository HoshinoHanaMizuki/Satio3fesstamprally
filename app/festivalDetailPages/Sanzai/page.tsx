import FestivalDetail from "@/app/features/common/festivalDetailTemplate";
import { FestivalContents, ImportantInfo, Sponsors } from "@/app/types/type";

const introText:string[] = [
    "宮崎県の地理上の中心に位置する三財地区では「三財へそ祭り」と称したお祭りを開催しています。",
    "地元参加者が「へそ踊り」としてお腹に顔を絵描き、ユーモラスな踊りを披露します。",
    "特産品の販売や伝統芸能も楽しめる地域密着のイベントです。"
];
const sponsors : Sponsors = {
    MainSponsor :  "三財地域づくり協議会",
    SubSponsor : "西都市・三財商工会",
    isSubSponsored : true
};
const importantInfo:ImportantInfo = {
    date : "2024-10-27（午前9時〜午後3時）",
    Sponsors : sponsors,
    place : "三財小中学校グラウンド（雨天時：同体育館）"
};


const fesContents:FestivalContents[] = [
    {
        contentImage : "/image/sanzaiFesContents/hesoDance.jpg",
        contentTitle : "へそ踊り",
    },
    {
        contentImage : "/image/sanzaiFesContents/hesoZumou.jpg",
        contentTitle : "へそ相撲",
    },
    {
        contentImage : "/image/sanzaiFesContents/stamp_rally.png",
        contentTitle : "スタンプラリー",
    },
    {
        contentImage : "/image/sanzaiFesContents/tyuusen.png",
        contentTitle : "お楽しみ抽選会",
    },
    {
        contentImage : "/image/sanzaiFesContents/fish_tsukamidori.png",
        contentTitle : "アユつかみ取り",
    },
    {
        contentImage : "/image/sanzaiFesContents/tonjiru.png",
        contentTitle : "ふるまい（豚汁）",
    },
    {
        contentImage : "/image/sanzaiFesContents/manju.png",
        contentTitle : "ふるまい（まんじゅう）",
    },
    {
        contentImage : "/image/sanzaiFesContents/sengu.png",
        contentTitle : "せんぐまき",
    },
    {
        contentImage : "/image/sanzaiFesContents/bando.png",
        contentTitle : "バンド演奏"
    },
    {
        contentImage : "/image/sanzaiFesContents/suisougaku.png",
        contentTitle : "吹奏楽部演奏"
    },
    {
        contentImage : "/image/sanzaiFesContents/taiko.png",
        contentTitle : "和太鼓"
    },
    {
        contentImage : "/image/sanzaiFesContents/fuladance.png",
        contentTitle : "フラダンス"
    },
    {
        contentImage : "/image/sanzaiFesContents/yakisoba.png",
        contentTitle : "出店（焼きそば)"
    },
    {
        contentImage : "/image/sanzaiFesContents/jidori.png",
        contentTitle : "出店（焼き鳥)"
    },
    {
        contentImage : "/image/sanzaiFesContents/burger.png",
        contentTitle : "出店（バーガー)"
    },
    {
        contentImage : "/image/sanzaiFesContents/softcream.png",
        contentTitle : "出店（ソフトクリーム)"
    }
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

const anotherInfos = [
    "【備 考】会場内にゴミ箱は設置されていません。",
    "【問合せ先】第１７回 三財へそ祭り実行委員会事務局（三財地域づくり協議会内）",
    "（電話）44-5831 （FAX）44-5831"];
export default function Sanzai(){

    return(
        <>
            <FestivalDetail 
                introText={introText} 
                festivalContents={fesContents}
                importantInfo={importantInfo} 
                garallyPhotos={garallyPhotos} 
                mapLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1690.4547519435168!2d131.33916743889606!3d32.07169631635479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3538adc800fff835%3A0x10d7ab0c435fc2d9!2z6KW_6YO95biC56uL5LiJ6LKh5bCP5a2m5qCh!5e0!3m2!1sja!2sjp!4v1729701984999!5m2!1sja!2sjp" 
                anotherInfos={anotherInfos}
            />
        </>
       
    );
}

