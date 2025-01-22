"use client"
import Image from "next/image";
import { useState ,useEffect, useReducer } from "react";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { thisYear } from "../features/common/commonValue";
import {} from "next/navigation";
interface Mode{
    mode:boolean
}
interface CopyRight{
    copyRight:string
}
interface SponsorsData{
    id:string,
    image:string,
    link:string,
    name:string,
    sort_id:number
}
interface SubmitResult{
    result_movie_link:string,
    sub_oshougatsu:string,
    sub_perfect:string
}
interface FesContents{
    id:string,
    image:string,
    name:string
}
interface FesBaseInfo{
    date:string,
    intro_text:string,
    management:string,
    place:string,
    place_map_link:string,
    sponsor:string,
}
interface GetAllDataTypes{
    mode: Mode,
    copyRight: CopyRight,
    sponsors:SponsorsData[],
    submitResult:SubmitResult,
    hesoFes:FesBaseInfo,
    joushiFes:FesBaseInfo,
    chibiSumoFes:FesBaseInfo
}
const today = new Date();
const startDate = new Date('2025-10-08');
const endDate = new Date('2026-01-01');
const isHold :boolean = today >= startDate && today <= endDate;
console.log(isHold);

// const router = useRouter();
//編集できる情報は、メインバナー画像・期間中か終了時かのFlag・協賛先情報・お祭り紹介テキスト
// 開催日時、主催、講演、開催場所、祭りのコンテンツ、アクセス情報、抽選会の応募条件や結果発表方法当選発表リンク
export default function pageEditing() {
    // データベースからデータを取得する
    const [currentSponsors, setCurrentSponsors] = useState<SponsorsData[]>();
    const [addSponsor, setAddSponsor] = useState<SponsorsData>();
    const [deleteSponsor, setDeleteSponsor] = useState<string>("No Change");
    const [editSponsor, setEditSponsor] = useState<SponsorsData>();
    const [editSponsorTarget, setEditSponsorTarget] = useState<string>();

    const [currentSubmitResult, setCurrentSubmitResult] = useState<SubmitResult>();
    const [editSubmitResult, setEditSubmitResult] = useState<SubmitResult>();

    const [currentSanzaiFesContents, setCurrentSanzaiFesContents] = useState<FesContents[]>();
    const [addSanzaiFesContents, setAddSanzaiFesContents] = useState<FesContents>();
    const [deleteSanzaiFesContents, setDeleteSanzaiFesContents] = useState<string>("No Change");
    const [editSanzaiFesContents, setEditSanzaiFesContents] = useState<FesContents>();
    const [editSanzaiFesContentTarget, setEditSanzaiFesContentTarget] = useState<string>("No Change");

    const [currentSanzaiFesInfo, setCurrentSanzaiFesInfo] = useState<FesBaseInfo>();
    const [editSanzaiFesInfo, setEditSanzaiFesInfo] = useState<FesBaseInfo>();

    const [currentTonoFesContents, setCurrentTonoFesContents] = useState<FesContents[]>();
    const [addTonoFesContents, setAddTonoFesContents] = useState<FesContents>();
    const [deleteTonoFesContents, setDeleteTonoFesContents] = useState<string>("No Change");
    const [editTonoFesContents, setEditTonoFesContents] = useState<FesContents>();    
    const [editTonoFesContentTarget, setEditTonoFesContentTarget] = useState<string>("No Change");

    const [currentTonoFesInfo, setCurrentTonoFesInfo] = useState<FesBaseInfo>();
    const [editTonoFesInfo, setEditTonoFesInfo] = useState<FesBaseInfo>();

    const [currentMinouFesContents, setCurrentMinouFesContents] = useState<FesContents[]>();
    const [addMinouFesContents, setAddMinouFesContents] = useState<FesContents>();
    const [deleteMinouFesContents, setDeleteMinouFesContents] = useState<string>("No Change");
    const [editMinouFesContents, setEditMinouFesContents] = useState<FesContents>();
    const [editMinouFesContentTarget, setEditMinouFesContentTarget] = useState<string>("No Change");
    
    const [currentMinouFesInfo, setCurrentMinouFesInfo] = useState<FesBaseInfo>();
    const [editMinouFesInfo, setEditMinouFesInfo] = useState<FesBaseInfo>();
    

    const [isSponsorsDetailPartOpen, setIsSponsorsDetailPartOpen] = useState<boolean>(false);
    const [isSubmitDetailPartOpen, setIsSubmitDetailPartOpen] = useState<boolean>(false);
    const [isSanzaiDetailPartOpen, setIsSanzaiDetailPartOpen] = useState<boolean>(false);
    const [isTonoDetailPartOpen, setIsTonoDetailPartOpen] = useState<boolean>(false);
    const [isMinouDetailPartOpen, setIsMinouDetailPartOpen] = useState<boolean>(false);

    const [sponsorEditMode, setSponsorEditMode] = useState<string>("追加");
    const [sanzaiEditMode, setSanzaiEditMode] = useState<string>("追加");
    const [tonoEditMode, setTonoEditMode] = useState<string>("追加");
    const [minouEditMode, setMinouEditMode] = useState<string>("追加");

    const [isDisplayDialog, setIsDisplayDialog] = useState<boolean>(false);
    
    // データベースからデータ取得
    useEffect(() => {
        const fetchData = async () => {
            // データの取得
            const getSponsors = await getDocs(collection(db,"sponsors"));
            const getSubmitResult = await getDocs(collection(db,"submit_resultPage"));
            const getSanzaiFesInfo = await getDocs(collection(db,"sanzai_fes_info"));
            const getSanzaiFesContents = await getDocs(collection(db,`sanzai_fes_contents${thisYear+1}`));
            const getTonoFesInfo = await getDocs(collection(db,"tono_fes_info"));
            const getTonoFesContents = await getDocs(collection(db,`tono_fes_contents${thisYear+1}`));
            const getMinouFesInfo = await getDocs(collection(db,"minou_fes_info"));
            const getMinouFesContents = await getDocs(collection(db,`minou_fes_contents${thisYear+1}`));
            
            // データの格納とセット            
            const sponsorsData = getSponsors.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as SponsorsData[];
            setCurrentSponsors(sponsorsData);

            const submitResultData = getSubmitResult.docs[2].data() as SubmitResult;
            setCurrentSubmitResult(submitResultData);

            const sanzaiFesContentsData = getSanzaiFesContents.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as FesContents[];
            setCurrentSanzaiFesContents(sanzaiFesContentsData);
            const sanzaiFesInfoData = getSanzaiFesInfo.docs[0].data() as FesBaseInfo;
            setCurrentSanzaiFesInfo(sanzaiFesInfoData);
            const tonoFesContentsData = getTonoFesContents.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as FesContents[];
            
            setCurrentTonoFesContents(tonoFesContentsData);
            const tonoFesInfoData = getTonoFesInfo.docs[1].data() as FesBaseInfo;
            setCurrentTonoFesInfo(tonoFesInfoData);

            const minouFesContentsData = getMinouFesContents.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as FesContents[];
            setCurrentMinouFesContents(minouFesContentsData);
            const minouFesInfoData = getMinouFesInfo.docs[0].data() as FesBaseInfo;
            setCurrentMinouFesInfo(minouFesInfoData);    
        };
        fetchData();
        
    },[]);
    
    const isOpenDetailPart = (isState?:boolean,setState?:any) => {
        setState(!isState);
    }
    const displayDialog = () => {
        setIsDisplayDialog(true);
        // ダイアログを表示する

    }
    const closeDialog = () => {
        setIsDisplayDialog(false);
        // ダイアログを閉じる
    }

    const confirmEditAll = async ()=>{
        // --------データベースにデータを送信する--------
        //協賛先情報
        if(addSponsor && addSponsor.name){
            await addDoc(collection(db,"sponsors"),addSponsor);
        }
        await deleteDoc(doc(db,"sponsors",deleteSponsor));
        const updateSponsor ={
            //もし、editSponsorが空だった場合は、currentSponsorsのデータを使う。currentSponsorの１つ１つのドキュメントにおいて、id === editSponsorTargetのものをname,linknに設定
            name:editSponsor?.name || currentSponsors?.find((sponsor) => sponsor.id === editSponsorTarget)?.name,
            link:editSponsor?.link || currentSponsors?.find((sponsor) => sponsor.id === editSponsorTarget)?.link,
            // image:editSponsor?.image
        }
        if (editSponsorTarget && editSponsorTarget !== "No Change") {
            await updateDoc(doc(db, "sponsors", editSponsorTarget), { name: updateSponsor.name, link: updateSponsor.link });
        }

        //応募方法と抽選結果
        const updateSubmitResult = {
            result_movie_link: editSubmitResult?.result_movie_link || currentSubmitResult?.result_movie_link,
            sub_oshougatsu: editSubmitResult?.sub_oshougatsu || currentSubmitResult?.sub_oshougatsu,
            sub_perfect: editSubmitResult?.sub_perfect || currentSubmitResult?.sub_perfect
        };
        await updateDoc(doc(db,"submit_resultPage",`contents${thisYear}`),updateSubmitResult);

        //へそ祭り情報
        const updateSanzaiFesInfo = {
            date:editSanzaiFesInfo?.date || currentSanzaiFesInfo?.date,
            intro_text:editSanzaiFesInfo?.intro_text || currentSanzaiFesInfo?.intro_text,
            management:editSanzaiFesInfo?.management || currentSanzaiFesInfo?.management,
            place:editSanzaiFesInfo?.place || currentSanzaiFesInfo?.place,
            place_map_link:editSanzaiFesInfo?.place_map_link || currentSanzaiFesInfo?.place_map_link,
            sponsor:editSanzaiFesInfo?.sponsor || currentSanzaiFesInfo?.sponsor
        };
    
        await updateDoc(doc(db,"sanzai_fes_info",`heso_fes_info${thisYear+1}`),updateSanzaiFesInfo);
        if(addSanzaiFesContents ){
            await addDoc(collection(db,`sanzai_fes_contents${thisYear+1}`),addSanzaiFesContents);
        }
        await deleteDoc(doc(db,`sanzai_fes_contents${thisYear+1}`,deleteSanzaiFesContents));
        const updateSanzaiFesContents = {
            name:editSanzaiFesContents?.name || currentSanzaiFesContents?.find((content) => content.id === editSanzaiFesContentTarget)?.name
        }
        if (editSanzaiFesContentTarget && editSanzaiFesContentTarget !== "No Change") {
            await updateDoc(doc(db,`sanzai_fes_contents${thisYear+1}`,editSanzaiFesContentTarget),{name:updateSanzaiFesContents?.name});
        }


        //城址祭り情報
        const updatedTonoFesInfo = {
            date:editTonoFesInfo?.date || currentTonoFesInfo?.date,
            intro_text:editTonoFesInfo?.intro_text || currentTonoFesInfo?.intro_text,
            management:editTonoFesInfo?.management || currentTonoFesInfo?.management,
            place:editTonoFesInfo?.place || currentTonoFesInfo?.place,
            place_map_link:editTonoFesInfo?.place_map_link || currentTonoFesInfo?.place_map_link,
            sponsor:editTonoFesInfo?.sponsor || currentTonoFesInfo?.sponsor
        };
        await updateDoc(doc(db,"tono_fes_info",`joushi_fes_info${thisYear+1}`),updatedTonoFesInfo);
        if(addTonoFesContents){
            await addDoc(collection(db,`tono_fes_contents${thisYear+1}`),addTonoFesContents);
        }
        await deleteDoc(doc(db,`tono_fes_contents${thisYear+1}`,deleteTonoFesContents));
        const updateTonoFesContents = {
            name:editTonoFesContents?.name || currentTonoFesContents?.find((content) => content.id === editTonoFesContentTarget)?.name
        }
        if (editTonoFesContentTarget && editTonoFesContentTarget !== "No Change") {
            await updateDoc(doc(db,`tono_fes_contents${thisYear+1}`,editTonoFesContentTarget),{name:updateTonoFesContents?.name});
        }
        
        //相撲大会情報
        const updateMinouFesInfo = {
            date:editMinouFesInfo?.date || currentMinouFesInfo?.date,
            intro_text:editMinouFesInfo?.intro_text || currentMinouFesInfo?.intro_text,
            management:editMinouFesInfo?.management || currentMinouFesInfo?.management,
            place:editMinouFesInfo?.place || currentMinouFesInfo?.place,
            place_map_link:editMinouFesInfo?.place_map_link || currentMinouFesInfo?.place_map_link,
            sponsor:editMinouFesInfo?.sponsor || currentMinouFesInfo?.sponsor
        };
        await updateDoc(doc(db,"minou_fes_info",`chibi_fes_info${thisYear+1}`),updateMinouFesInfo);
        if(addMinouFesContents){
            await addDoc(collection(db,`minou_fes_contents${thisYear+1}`),addMinouFesContents);
        }
        await deleteDoc(doc(db,`minou_fes_contents${thisYear+1}`,deleteMinouFesContents));
        const updateMinouFesContents = {
            name:editMinouFesContents?.name || currentMinouFesContents?.find((content) => content.id === editMinouFesContentTarget)?.name
        };
        if (editMinouFesContentTarget && editMinouFesContentTarget !== "No Change") {
            await updateDoc(doc(db,`minou_fes_contents${thisYear+1}`,editMinouFesContentTarget),{name:updateMinouFesContents?.name});
        }

        closeDialog();
    }
    return (
        <>
            <h2 className="text-center text-xl m-5 md:m-10">公式サイトの内容編集</h2>
            <div className="allContainer grid grid-cols-1 md:grid-cols-2 gap-4 text-center w-screen pl-2 pr-2 mt-3">
                <div className="topPageData max-h-52 mb-5 md:mb-10">
                    {/* 協賛先情報　画像データはアプデにて一旦先送り */}

                    {/* ----------協賛先情報------------- */}
                    <div className="editTitle flex justify-center items-center" onClick={() => isOpenDetailPart(isSponsorsDetailPartOpen, setIsSponsorsDetailPartOpen)}>
                        <div className="detailVector text-left">凸</div>
                        <div className="titleText text-right">協賛先一覧</div>
                    </div>
                    {isSponsorsDetailPartOpen && (
                        <div className="detailPart">
                            <div className="sponsorsList">
                                {/* 追加・削除・編集 */}
                                <div className="radio">
                                    <input type="radio" name="sponsor" value="追加" checked={sponsorEditMode === "追加"} onChange={() => setSponsorEditMode("追加")} />
                                    <label className="pl-1 pr-1">追加</label>
                                    <input type="radio" name="sponsor" value="削除" checked={sponsorEditMode === "削除"} onChange={() => setSponsorEditMode("削除")} />
                                    <label className="pl-1 pr-1">削除</label>
                                    <input type="radio" name="sponsor" value="更新" checked={sponsorEditMode === "更新"} onChange={() => setSponsorEditMode("更新")} />
                                    <label className="pl-1 pr-1">更新</label>
                                </div>
                                {/* 追加モード時の表示 */}
                                {sponsorEditMode === "追加" && (
                                    <div className="addSponsor">
                                        {/* <div className="sponsorImage">
                                            <input type="file" accept="image/*" />
                                        </div> */}
                                        <div className="sponsorName">
                                            <input type="text" defaultValue={addSponsor?.name} placeholder="協賛先名" onChange={(e) => setAddSponsor(prev => ({ ...prev, name: e.target.value } as SponsorsData))}/>
                                        </div>
                                        <div className="sponsorLink">
                                            <input type="text" defaultValue={addSponsor?.link}  placeholder="リンク" onChange={(e) => setAddSponsor(prev => ({ ...prev, link: e.target.value } as SponsorsData))} />
                                        </div>
                                    </div>
                                )}
                                {/* 削除モード時の表示 */}
                                {sponsorEditMode === "削除" && (
                                    <div className="deleteSponsor">
                                        <h4>削除する協賛先を選択してください。</h4>
                                        {/* 削除する協賛先のリスト */}
                                        <select defaultValue={deleteSponsor} onChange={(e) => setDeleteSponsor(e.target.value)}>
                                            <option value="No Change"></option>
                                            {currentSponsors?.map((sponsor,index) => (
                                                <option key={index} value={sponsor.id}>{sponsor.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {/* 更新モード時の表示 */}
                                {sponsorEditMode === "更新" && (
                                    <div className="updateSponsor">
                                        <h4>更新する協賛先を選択してください。</h4>
                                        <select defaultValue={editSponsorTarget} onChange={(e) => setEditSponsorTarget(e.target.value)}>
                                            <option value="No Change"></option>
                                            {currentSponsors?.map((sponsor,index) => (
                                                <option key={index} value={sponsor.id}>{sponsor.name}</option>
                                            ))}
                                        </select>
                                        <div className="updateInputer">
                                            {/* <div className="SponsorImage">
                                                <input type="file" accept="image/*" onChange={(e) => setEditSponsor(prev => ({ ...prev, image: e.target.value } as FesContents))}/>
                                            </div> */}
                                            <div className="sponsorName">
                                                <input type="text" defaultValue={editSponsor?.name} placeholder="協賛様名" onChange={(e) => setEditSponsor(prev => ({ ...prev, name: e.target.value } as SponsorsData))}/>
                                            </div>
                                            <div className="sponsorLink">
                                                <input type="text" defaultValue={editSponsor?.link} placeholder="協賛様リンク" onChange={(e) => setEditSponsor(prev => ({ ...prev, link: e.target.value } as SponsorsData))}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="submit_resultPageData max-h-52 mb-5 md:mb-10">
                    {/* 応募条件テキスト（お正月・パーフェクト）・結果発表動画リンク */}
                    <div className="editTitle flex justify-center items-center" onClick={() => isOpenDetailPart(isSubmitDetailPartOpen,setIsSubmitDetailPartOpen)}>
                        <div className="detailVector text-left">凸</div>
                        <div className="titleText text-right">応募方法と抽選結果</div>
                    </div>
                    {isSubmitDetailPartOpen && (
                        <div className="detailPart">
                            <div className="submitResultInput">
                                <div className="submitResultMovieLink">
                                    <input type="text" defaultValue={editSubmitResult?.result_movie_link} placeholder="結果発表動画リンク" onChange={(e)=> setEditSubmitResult(prev => ({ ...prev, result_movie_link: e.target.value } as SubmitResult))}/>
                                </div>
                                <div className="submitResultText">
                                    <div className="submitOshogatsu">
                                        <input type="text" defaultValue={editSubmitResult?.sub_oshougatsu} placeholder="お正月抽選会結果発表" onChange={(e)=> setEditSubmitResult(prev => ({ ...prev, sub_oshougatsu: e.target.value } as SubmitResult))}/>
                                    </div>
                                    <div className="submitPerfect">
                                        <input type="text" defaultValue={editSubmitResult?.sub_perfect} placeholder="パーフェクト抽選会結果発表" onChange={(e)=> setEditSubmitResult(prev => ({ ...prev, sub_perfect: e.target.value } as SubmitResult))}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="sanzaiPageData max-h-96 mb-5 md:mb-10">
                    {/* 紹介テキスト・開催日時・主催・後援・開催場所・祭りのコンテンツ・開催場所マップリンク */}
                    <div className="editTitle flex justify-center items-center" onClick={() => isOpenDetailPart(isSanzaiDetailPartOpen, setIsSanzaiDetailPartOpen)}>
                        <div className="detailVector text-left">凸</div>
                        <div className="titleText text-right">へそ祭り情報</div>
                    </div>
                    {isSanzaiDetailPartOpen && (
                        <div className="detailPart">
                            <div className="sanzaiFesInfo">
                                <div className="sanzaiFesDate">
                                    <input type="text" defaultValue={editSanzaiFesInfo?.date} placeholder={currentSanzaiFesInfo?.date} onChange={(e) => setEditSanzaiFesInfo(prev => ({ ...prev, date: e.target.value } as FesBaseInfo))} />
                                </div>
                                <div className="sanzaiFesIntroText">
                                    <input type="text" defaultValue={editSanzaiFesInfo?.intro_text} placeholder={currentSanzaiFesInfo?.intro_text} onChange={(e) => setEditSanzaiFesInfo(prev => ({ ...prev, intro_text: e.target.value } as FesBaseInfo))} />
                                </div>
                                <div className="sanzaiFesManagement">
                                    <input type="text" defaultValue={editSanzaiFesInfo?.management} placeholder={currentSanzaiFesInfo?.management} onChange={(e) => setEditSanzaiFesInfo(prev => ({ ...prev, management: e.target.value } as FesBaseInfo))} />
                                </div>
                                <div className="sanzaiFesPlace">
                                    <input type="text" defaultValue={editSanzaiFesInfo?.place} placeholder={currentSanzaiFesInfo?.place} onChange={(e) => setEditSanzaiFesInfo(prev => ({ ...prev, place: e.target.value } as FesBaseInfo))} />
                                </div>
                                <div className="sanzaiFesPlaceMapLink">
                                    <input type="text" defaultValue={editSanzaiFesInfo?.place_map_link} placeholder={currentSanzaiFesInfo?.place_map_link} onChange={(e) => setEditSanzaiFesInfo(prev => ({ ...prev, place_map_link: e.target.value } as FesBaseInfo))} />
                                </div>
                                <div className="sponsor">
                                    <input type="text" defaultValue={editSanzaiFesInfo?.sponsor} placeholder={currentSanzaiFesInfo?.sponsor} onChange={(e) => setEditSanzaiFesInfo(prev => ({ ...prev, sponsor: e.target.value } as FesBaseInfo))} />
                                </div>
                            </div>
                            <div className="sanzaiFesContents">
                                {/* 追加・削除・編集 */}
                                <div className="title">祭りのコンテンツ</div>
                                <div className="radio">
                                    <input type="radio" name="sanzaiFesContents" value="追加" checked={sanzaiEditMode === "追加"} onChange={() => setSanzaiEditMode("追加")} />
                                    <label className="pl-1 pr-1">追加</label>
                                    <input type="radio" name="sanzaiFesContents" value="削除" checked={sanzaiEditMode === "削除"} onChange={() => setSanzaiEditMode("削除")} />
                                    <label className="pl-1 pr-1">削除</label>
                                    <input type="radio" name="sanzaiFesContents" value="更新" checked={sanzaiEditMode === "更新"} onChange={() => setSanzaiEditMode("更新")} />
                                    <label className="pl-1 pr-1">更新</label>
                                </div>
                                {sanzaiEditMode === "追加" && (
                                    <div className="addSanzaiFesContents">
                                        {/* <div className="sanzaiFesContentsImage">
                                            <input type="file" accept="image/*" onChange={(e) => setAddSanzaiFesContents(prev => ({ ...prev, image: e.target.value } as FesContents))} />
                                        </div> */}
                                        <div className="sanzaiFesContentsName">
                                            <input type="text" defaultValue={addSanzaiFesContents?.name} placeholder="コンテンツ名" onChange={(e) => setAddSanzaiFesContents(prev => ({ ...prev,img:"", name: e.target.value } as FesContents))} />
                                        </div>
                                    </div>
                                )}
                                {sanzaiEditMode === "削除" && (
                                    <div className="deleteSanzaiFesContents">
                                        <h4>削除するコンテンツを選択してください。</h4>
                                        {/* 削除するコンテンツのリスト */}
                                        <select defaultValue={deleteSanzaiFesContents} onChange={(e) => setDeleteSanzaiFesContents(e.target.value)}>
                                            <option value="No Change"></option>
                                            {currentSanzaiFesContents?.map((contents) => (
                                                <option key={contents.name} value={contents.id}>{contents.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {sanzaiEditMode === "更新" && (
                                    <div className="updateSanzaiFesContents">
                                        <h4>更新するコンテンツを選択してください。</h4>
                                        <select defaultValue={editSanzaiFesContentTarget} onChange={(e) => setEditSanzaiFesContentTarget(e.target.value)}>
                                            <option value="No Change"></option>
                                            {currentSanzaiFesContents?.map((contents) => (
                                                <option key={contents.name} value={contents.id}>{contents.name}</option>
                                            ))}
                                        </select>
                                        <div className="updateInputer">
                                            {/* <div className="sanzaiFesContentsImage">
                                                <input type="file" accept="image/*" onChange={(e) => setEditSanzaiFesContents(prev => ({ ...prev, image: e.target.value } as FesContents))}/>
                                            </div> */}
                                            <div className="sanzaiFesContentsName">
                                                <input type="text" defaultValue={editSanzaiFesContents?.name} placeholder="コンテンツ名" onChange={(e) => setEditSanzaiFesContents(prev => ({ ...prev, name: e.target.value } as FesContents))}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="tonokooriPageData max-h-96 mb-5 md:mb-10">
                    {/* 紹介テキスト・開催日時・主催・後援・開催場所・祭りのコンテンツ・開催場所マップリンク */}
                    <div className="editTitle flex justify-center items-center" onClick={() => isOpenDetailPart(isTonoDetailPartOpen,setIsTonoDetailPartOpen)}>
                        <div className="detailVector text-left">凸</div>
                        <div className="titleText text-right">城址祭り情報</div>
                    </div>
                    {isTonoDetailPartOpen && (
                        <div className="detailPart">
                        <div className="tonoFesInfo">
                            <div className="tonoFesDate">
                                <input type="text" defaultValue ={editTonoFesInfo?.date} placeholder={currentTonoFesInfo?.date} onChange={(e) => setEditTonoFesInfo(prev => ({ ...prev, date: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="tonoFesIntroText">
                                <input type="text" defaultValue ={editTonoFesInfo?.intro_text} placeholder={currentTonoFesInfo?.intro_text} onChange={(e) => setEditTonoFesInfo(prev => ({ ...prev, intro_text: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="tonoFesManagement">
                                <input type="text" defaultValue ={editTonoFesInfo?.management} placeholder={currentTonoFesInfo?.management} onChange={(e) => setEditTonoFesInfo(prev => ({ ...prev, management: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="tonoFesPlace">
                                <input type="text" defaultValue ={editTonoFesInfo?.place} placeholder={currentTonoFesInfo?.place} onChange={(e) => setEditTonoFesInfo(prev => ({ ...prev, place: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="tonoFesPlaceMapLink">
                                <input type="text" defaultValue ={editTonoFesInfo?.place_map_link} placeholder={currentTonoFesInfo?.place_map_link} onChange={(e) => setEditTonoFesInfo(prev => ({ ...prev, place_map_link: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="sponsor">
                                <input type="text" defaultValue ={editTonoFesInfo?.sponsor} placeholder={currentTonoFesInfo?.sponsor} onChange={(e) => setEditTonoFesInfo(prev => ({ ...prev, sponsor: e.target.value } as FesBaseInfo))} />
                            </div>
                        </div>
                        <div className="tonoFesContents">
                            {/* 追加・削除・編集 */}
                            <div className="title">祭りのコンテンツ</div>
                            <div className="radio">
                                <input type="radio" name="tonoFesContents" value="追加" checked={tonoEditMode === "追加"} onChange={() => setTonoEditMode("追加")} />
                                <label className="pl-1 pr-1">追加</label>
                                <input type="radio" name="tonoFesContents" value="削除" checked={tonoEditMode === "削除"} onChange={() => setTonoEditMode("削除")} />
                                <label className="pl-1 pr-1">削除</label>
                                <input type="radio" name="tonoFesContents" value="更新" checked={tonoEditMode === "更新"} onChange={() => setTonoEditMode("更新")} />
                                <label className="pl-1 pr-1">更新</label>
                            </div>
                            {tonoEditMode === "追加" && (
                                <div className="addtonoFesContents">
                                    {/* <div className="tonoFesContentsImage">
                                        <input type="file" accept="image/*" onChange={(e) => setAddTonoFesContents(prev => ({ ...prev, image: e.target.value } as FesContents))} />
                                    </div> */}
                                    <div className="tonoFesContentsName">
                                        <input type="text" defaultValue={addTonoFesContents?.name} placeholder="コンテンツ名" onChange={(e) => setAddTonoFesContents(prev => ({ ...prev,img:"" , name: e.target.value } as FesContents))} />
                                    </div>
                                </div>
                            )}
                            {tonoEditMode === "削除" && (
                                <div className="deletetonoFesContents">
                                    <h4>削除するコンテンツを選択してください。</h4>
                                    {/* 削除するコンテンツのリスト */}
                                    <select defaultValue={deleteTonoFesContents} onChange={(e) => setDeleteTonoFesContents(e.target.value)}>
                                        <option value="No Change"></option>
                                        {currentTonoFesContents?.map((contents,index) => (
                                            <option key={index} value={contents.id}>{contents.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            {tonoEditMode === "更新" && (
                                <div className="updatetonoFesContents">
                                    <h4>更新するコンテンツを選択してください。</h4>
                                    <select defaultValue={editTonoFesContentTarget} onChange={(e) => setEditTonoFesContentTarget(e.target.value)}>
                                        <option value="No Change"></option>
                                        {currentTonoFesContents?.map((contents,index) => (
                                            <option key={index} value={contents.id}>{contents.name}</option>
                                        ))}
                                    </select>
                                    <div className="updateInputer">
                                        {/* <div className="tonoFesContentsImage">
                                            <input type="file" accept="image/*" onChange={(e) => setEditTonoFesContents(prev => ({ ...prev, image: e.target.value } as FesContents))}/>
                                        </div> */}
                                        <div className="tonoFesContentsName">
                                            <input type="text" defaultValue={editTonoFesContents?.name} placeholder="コンテンツ名" onChange={(e) => setEditTonoFesContents(prev => ({ ...prev, name: e.target.value } as FesContents))}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    )}
                </div>

                <div className="MinouPageData max-h-96 mb-5 md:mb-10">
                    {/* 紹介テキスト・開催日時・主催・後援・開催場所・祭りのコンテンツ・開催場所マップリンク */}
                    <div className="editTitle flex justify-center items-center" onClick={() => isOpenDetailPart(isMinouDetailPartOpen,setIsMinouDetailPartOpen)}>
                        <div className="detailVector text-left">凸</div>
                        <div className="titleText text-right">ちびっ子相撲大会情報</div>
                    </div>
                    {isMinouDetailPartOpen && (
                        <div className="detailPart">
                        <div className="minouFesInfo">
                            <div className="minouFesDate">
                                <input type="text" defaultValue ={editMinouFesInfo?.date} placeholder={currentMinouFesInfo?.date} onChange={(e) => setEditMinouFesInfo(prev => ({ ...prev, date: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="minouFesIntroText">
                                <input type="text" defaultValue ={editMinouFesInfo?.intro_text} placeholder={currentMinouFesInfo?.intro_text} onChange={(e) => setEditMinouFesInfo(prev => ({ ...prev, intro_text: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="minouFesManagement">
                                <input type="text" defaultValue ={editMinouFesInfo?.management} placeholder={currentMinouFesInfo?.management} onChange={(e) => setEditMinouFesInfo(prev => ({ ...prev, management: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="minouFesPlace">
                                <input type="text" defaultValue ={editMinouFesInfo?.place} placeholder={currentMinouFesInfo?.place} onChange={(e) => setEditMinouFesInfo(prev => ({ ...prev, place: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="minouFesPlaceMapLink">
                                <input type="text" defaultValue ={editMinouFesInfo?.place_map_link} placeholder={currentMinouFesInfo?.place_map_link} onChange={(e) => setEditMinouFesInfo(prev => ({ ...prev, place_map_link: e.target.value } as FesBaseInfo))} />
                            </div>
                            <div className="sponsor">
                                <input type="text" defaultValue ={editMinouFesInfo?.sponsor} placeholder={currentMinouFesInfo?.sponsor} onChange={(e) => setEditMinouFesInfo(prev => ({ ...prev, sponsor: e.target.value } as FesBaseInfo))} />
                            </div>
                        </div>
                        <div className="minouFesContents">
                            {/* 追加・削除・編集 */}
                            <div className="title">祭りのコンテンツ</div>
                            <div className="radio">
                                <input type="radio" name="minouFesContents" value="追加" checked={minouEditMode === "追加"} onChange={() => setMinouEditMode("追加")} />
                                <label className="pl-1 pr-1">追加</label>
                                <input type="radio" name="minouFesContents" value="削除" checked={minouEditMode === "削除"} onChange={() => setMinouEditMode("削除")} />
                                <label className="pl-1 pr-1">削除</label>
                                <input type="radio" name="minouFesContents" value="更新" checked={minouEditMode === "更新"} onChange={() => setMinouEditMode("更新")} />
                                <label className="pl-1 pr-1">更新</label>
                            </div>
                            {minouEditMode === "追加" && (
                                <div className="addminouFesContents">
                                    {/* <div className="minouFesContentsImage">
                                        <input type="file" accept="image/*" onChange={(e) => setAddMinouFesContents(prev => ({ ...prev, image: e.target.value } as FesContents))} />
                                    </div> */}
                                    <div className="minouFesContentsName">
                                        <input type="text" defaultValue={addMinouFesContents?.name} placeholder="コンテンツ名" onChange={(e) => setAddMinouFesContents(prev => ({ ...prev, name: e.target.value } as FesContents))} />
                                    </div>
                                </div>
                            )}
                            {minouEditMode === "削除" && (
                                <div className="deleteminouFesContents">
                                    <h4>削除するコンテンツを選択してください。</h4>
                                    {/* 削除するコンテンツのリスト */}
                                    <select defaultValue={deleteMinouFesContents} onChange={(e) => setDeleteMinouFesContents(e.target.value)}>
                                        <option value="No Change"></option>
                                        {currentMinouFesContents?.map((contents) => (
                                            <option key={contents.name} value={contents.id}>{contents.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            {minouEditMode === "更新" && (
                                <div className="updateminouFesContents">
                                    <h4>更新するコンテンツを選択してください。</h4>
                                    <select defaultValue={editMinouFesContentTarget} onChange={(e) => setEditMinouFesContentTarget(e.target.value)}>
                                        <option value="No Change"></option>
                                        {currentMinouFesContents?.map((contents) => (
                                            <option key={contents.name} value={contents.id}>{contents.name}</option>
                                        ))}
                                    </select>
                                    <div className="updateInputer">
                                        {/* <div className="minouFesContentsImage">
                                            <input type="file" accept="image/*" onChange={(e) => setEditMinouFesContents(prev => ({ ...prev, image: e.target.value } as FesContents))}/>
                                        </div> */}
                                        <div className="minouFesContentsName">
                                            <input type="text" defaultValue={editMinouFesContents?.name} placeholder="コンテンツ名" onChange={(e) => setEditMinouFesContents(prev => ({ ...prev, name: e.target.value } as FesContents))}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="confirmPart flex flex-col justify-center items-center mt-5 md:mt-10">
                {/* クリックすると、これまでの入力内容の一覧を表示して、下部に「確定」ボタンとキャンセルを表示 */}
                <button className="confirm" onClick={displayDialog}>確認</button>
                <dialog open={isDisplayDialog} className="confirmDialog"> 
                    <div className="confirmContents">
                        <div className="confirmTitle">
                            <h2>入力内容確認</h2>
                        </div>
                        <div className="confirmContents">
                            {addSponsor !== undefined && (
                                <div className="confirmSponsors">
                                    <h3>協賛先一覧</h3>
                                    <div>
                                        <p>追加する協賛様名：{addSponsor?.name}</p>
                                        <p>追加する協賛様リンク{addSponsor?.link}</p>
                                    </div>
                                </div>
                            )}
                            {deleteSponsor !== "No Change" && (
                                <div className="confirmSponsors">
                                    <h3>協賛先一覧：削除する協賛様名：{currentSponsors?.find((sponsor)=> sponsor.id === deleteSponsor)?.name}</h3>
                                </div>
                            )}
                            {editSponsor !== undefined && (
                                <div className="confirmSponsors">
                                    <h3>協賛先一覧</h3>
                                    {editSponsor && editSponsorTarget !=="No Change" && editSponsorTarget &&(
                                        <div>
                                            {editSponsor.name && (<p>更新する協賛様名：{editSponsor?.name}</p>)}
                                            {editSponsor.link && (<p>更新する協賛様リンク：{editSponsor?.link}</p>)}
                                        </div>
                                    )}
                                </div>
                            )}
                            {editSubmitResult !== undefined && (    
                                <div className="confirmSubmitResult">
                                    <h3>応募方法と抽選結果</h3>
                                    {editSubmitResult.result_movie_link && (<p>更新する結果発表動画リンク：{editSubmitResult?.result_movie_link}</p>)}
                                    {editSubmitResult.sub_oshougatsu && (<p>更新するお正月抽選会応募方法：{editSubmitResult?.sub_oshougatsu}</p>)}
                                    {editSubmitResult.sub_perfect && (<p>更新するパーフェクト抽選会応募方法：{editSubmitResult?.sub_perfect}</p>)}
                                </div>
                            )}
                            {addSanzaiFesContents !== undefined && (
                                <div className="confirmSanzaiFesContents">
                                    {/* <p>追加するコンテンツ写真：{addSanzaiFesContents?.image}</p> */}
                                    {addSanzaiFesContents.name && (
                                        <p>追加するへそ祭りコンテンツ名：{addSanzaiFesContents?.name}</p>
                                    )}
                                </div>
                            )}
                            {deleteSanzaiFesContents !== "No Change" && (
                                <div className="confirmSanzaiFesContents">
                                    <h3>削除するへそ祭りコンテンツ名：{currentSanzaiFesContents?.find(content => content.id === deleteSanzaiFesContents)?.name}</h3>
                                </div>
                            )}
                            {editSanzaiFesContents !== undefined && editSanzaiFesContentTarget !== "No Change" && editSanzaiFesContents.name && (
                                <div className="confirmSanzaiFesContents">
                                    {/* <p>更新するコンテンツ写真：{editSanzaiFesContents?.image}</p> */}
                                    <p>更新するへそ祭りコンテンツ名：{editSanzaiFesContents?.name}</p>
                                </div>
                            )}
                            {addTonoFesContents !== undefined && (
                                <div className="confirmTonoFesContents">
                                    {/* <p>追加するコンテンツ写真：{addTonoFesContents?.image}</p> */}
                                    {addTonoFesContents.name && (
                                        <p>追加する城址祭りコンテンツ名：{addTonoFesContents?.name}</p>
                                    )}
                                </div>
                            )}
                            {deleteTonoFesContents !== "No Change" && (
                                <div className="confirmTonoFesContents">
                                    <h3>削除する城址祭りコンテンツ名：{currentTonoFesContents?.find(content => content.id === deleteTonoFesContents)?.name}</h3>
                                </div>
                            )}
                            {editTonoFesContents !== undefined && editTonoFesContentTarget !== "No Change" && editTonoFesContents.name && (
                                <div className="confirmTonoFesContents">
                                    {/* <p>更新するコンテンツ写真：{editTonoFesContents?.image}</p> */}
                                    <p>更新する城址祭りコンテンツ名：{editTonoFesContents?.name}</p>
                                </div>
                            )}
                            {addMinouFesContents !== undefined && (
                                <div className="confirmMinouFesContents">
                                    {/* <p>追加するコンテンツ写真：{addMinouFesContents?.image}</p> */}
                                    {addMinouFesContents.name && (
                                        <p>追加する相撲大会コンテンツ名：{addMinouFesContents?.name}</p>
                                    )}
                                </div>
                            )}
                            {deleteMinouFesContents !== "No Change" && (
                                <div className="confirmMinouFesContents">
                                    <h3>削除する相撲大会コンテンツ名：{currentMinouFesContents?.find(content => content.id === deleteMinouFesContents)?.name}</h3>
                                </div>
                            )}
                            {editMinouFesContents !== undefined && editMinouFesContentTarget !== "No Change" && editMinouFesContents.name && (
                                <div className="confirmMinouFesContents">
                                    {/* <p>更新するコンテンツ写真：{editMinouFesContents?.image}</p> */}
                                    <p>更新する相撲大会コンテンツ名：{editMinouFesContents?.name}</p>
                                </div>
                            )}
                        </div>
                    </div>  
                    <div className="finalConfirmOrCancel flex">
                        <Link href="/" className="finalConfirm" onClick={confirmEditAll}>確定</Link>
                        <button className="finalCancel" onClick={closeDialog}>キャンセル</button>
                    </div>
                </dialog>
            </div>
        </>
    );
}
