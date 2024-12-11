import FestivalDetail from "@/app/features/common/festivalDetailTemplate";
import Navbar from "@/app/features/common/Navbar/SmartPhone";
import { FestivalContents, ImportantInfo ,Sponsors} from "@/app/types/type";

const introText:string[] = [
    "三納ちびっこ相撲大会は、西都市平郡の神社で毎年開催される子どもたちの相撲大会です。",
    "大会は各年齢別でが行われます。地域の伝統文化を大切にし、",
    "子どもたちは力と技を競い合いながら、礼儀や勇気を学び、絆を深めます。",
    "観客の応援も大いに盛り上がる、地元全体で次世代に地域交流を伝えるイベントです。"
];
const sponsors : Sponsors = {
    MainSponsor :  "ちびっ子相撲大会実行委員会",
    SubSponsor : "",
    isSubSponsored : false
};
const importantInfo:ImportantInfo = {
    date : "2024-12-08",
    Sponsors : sponsors,
    place : "矢久度神社"
}

const fesContents:FestivalContents[] = [
    {
        contentImage : "",
        contentTitle : "CommingSoon・・",
    },
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

const anotherInfos = ["",""];
export default function Minou(){

    return(
        <>
            <Navbar />
            <FestivalDetail 
                introText={introText} 
                festivalContents={fesContents}
                importantInfo={importantInfo} 
                garallyPhotos={garallyPhotos} 
                mapLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.2126557355937!2d131.37132347623887!3d32.09053781875049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3538af993668ce37%3A0x3375b4749ed0e04a!2z55-i5LmF5bqm56We56S-!5e0!3m2!1sja!2sjp!4v1729702434384!5m2!1sja!2sjp"
                anotherInfos={anotherInfos}
            />
        </>
       
    );
}