"use client"
import Link from "next/link";
import Footer from "../features/common/footer";
import Header from "../features/common/header";
import { useRouter } from "next/navigation";
import NavBar from "../features/common/Navbar/Navbar";
import PhoneNavbar from "../features/common/Navbar/SmartPhone";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, doc, getDoc,getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { SubmitResult } from "../types/type";
import { thisYear,isHold } from "../features/common/commonValue";
export default function Lottery(){
    const router = useRouter();
    const LinkToSumou = function(){
        router.push("/festivals/Minou");
    }
    const [submitResult,setSubmitResult] = useState<SubmitResult>();
    useEffect(()=>{
        const fetchSubmitresult = async () => {
            const getSubmitResult= await getDoc(doc(db,"submitResult",`contents${thisYear}`));
            const submitResultData = getSubmitResult.data() as SubmitResult;
            setSubmitResult(submitResultData);
        }
        fetchSubmitresult();
        console.log(submitResult?.result_movie_link);
        
    },[]);
    return(
        <>
            {/* 全体 */}
            <div className="allContainer w-screen pl-2 pr-2">
                {/* <NavBar /> */}
                <PhoneNavbar />
                <Header />
                <div className="normalLotteryContianer w-full mb-5">
                    {isHold ? (
                        <>
                            <div className="text-lg">{submitResult?.sub_oshougatsu}</div>
                        </>
                    ) : (
                        <>
                            <h4 className="p-2 text-center">2024年度の抽選会は終了しました。<br></br>たくさんのご参加ありがとうございました！</h4>
                            <div className="lotteryTitle w-full text-center m-2 text-xl">【お正月抽選会】</div>
                            <div className="howToChallenge w-full text-center">
                                <div className="underline"><span>Youtubeチャンネル「だご亭ほろ酔いラジオ」</span></div>
                                <p className="p-2">にて当選者を発表中！</p>
                                <div className="flex justify-center items-center">
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                                        {submitResult?.result_movie_link && (
                                            <Link href={submitResult?.result_movie_link}>
                                                Youtubeで見る！
                                            </Link>
                                        )}
                                        <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/PDESFd3DON8?si=Sd-gXFPtyLXXvHLx" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="perfectLotteryContianer w-full">
                    <div className="howToChallenge w-full text-center">
                        <div className="lotteryTitle w-full text-center text-xl m-2">【パーフェクト抽選会】</div>
                        {isHold ? (
                            <>
                                <div className="text-lg">{submitResult?.sub_perfect}</div>
                            </>
                        ) : (
                            <p className="p-2">ー終了ー</p>
                        )}
                        
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}