"use client"
import Link from "next/link";
import Footer from "../features/common/footer";
import Header from "../features/common/header";
import { useRouter } from "next/navigation";
import NavBar from "../features/common/Navbar/Navbar";
import PhoneNavbar from "../features/common/Navbar/SmartPhone";

export default function Lottery(){
    const router = useRouter();
    const LinkToSumou = function(){
        router.push("/festivals/Minou");
    }
    return(
        <>
            {/* 全体 */}
            <div className="allContainer w-screen pl-2 pr-2">
                {/* <NavBar /> */}
                <PhoneNavbar />
                <Header />
                <div className="title text-center p-8">(後日更新予定)</div>
                <div className="normalLotteryContianer w-full mb-5">
                    <div className="lotteryTitle w-full text-center m-2 text-xl">【お正月抽選会】</div>
                    <div className="howToChallenge w-full text-center">
                        <p className="p-2">ー応募方法と結果の告知についてー</p>
                        <p className="p-2">各お祭りの会場ブースにて、</p>
                        <p className="p-2">スタンプ2個〜応募可能！</p>
                        <p className="p-2">2025年1月1日（元日）0時〜</p>
                        <Link href={"https://www.youtube.com/@Dagotei_izakaya"}>
                            <div className="underline"><span className="text-blue-500">Youtubeチャンネル「だご亭ほろ酔いラジオ」</span></div>
                            <p className="p-2">にて当選者を発表！</p>
                        </Link>
                        
                    </div>
                </div>
                <div className="perfectLotteryContianer w-full">
                    <div className="howToChallenge w-full text-center">
                        <div className="lotteryTitle w-full text-center text-xl m-2">【パーフェクト抽選会】</div>
                        <p className="p-2">ー応募方法と結果の告知についてー</p>
                        <p  onClick={LinkToSumou}><span className="text-blue-500 underline">ちびっ子相撲大会会場</span>にて、</p>
                        <p className="p-2">スタンプ3個〜応募可能！</p>
                        <p className="p-2">2025年1月1日（元日）0時〜</p>
                        <p className="p-2">相撲大会当日、同会場にて当選者を発表！</p>
                        
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}