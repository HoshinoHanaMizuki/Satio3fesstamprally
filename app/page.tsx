"use client";
import Image from "next/image";
import { useState ,useEffect} from "react";
type Festival ={
  fesName:string;
  releaseDate:string;
  description:string[];
  isLocked:boolean;
}

const festivalInfoArray:Festival[] = [
  {fesName:"三財へそまつり",releaseDate:'2024-10-20',description:["A","B","C"],isLocked:false},
  {fesName:"都於郡城址まつり",releaseDate:"2024-11-10",description:["A","B","C"],isLocked:true},
  {fesName:"三納ちびっこ相撲",releaseDate:"2024-12-08",description:["A","B","C"],isLocked:true}
]

const fesImages:string[] = ["/image/MinouSumou.JPG","/image/MinouSumou.JPG","/image/MinouSumou.JPG"];
const loadingImage:string = "/image/fesThumnail.png";
const titleImage:string = "/image/eventTitle.jpg";
export default function Home() {
  const [isLoad,setIsLoad] = useState(true);
  useEffect(() => {
    // 4秒後にローダーを非表示にする
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 2000);

    // コンポーネントがアンマウントされたときにタイマーをクリア
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {isLoad ? (
      <div className="loadingContent w-screen h-screen flex justify-center items-center">
        <Image src={loadingImage} alt= "" layout="responsive" width={100} height={100}/>
      </div>
    ) : 
    (
      <>
        <div className="contentscontainer w-screen h-screen mb-3 flex flex-col">
          <div className="eventTitle text-lg text-center mb-5 w-screen ">
            <Image src={titleImage} alt=""  layout="responsive" width={100} height={100}/>
          </div>
          <div className="festivalContainer grid  grid-cols-1 md:grid-cols-3 w-screen sm:flex-1 sm:h-auto h-screen gap-4 ">
            <>
              {festivalInfoArray.map((festival: Festival, index) => (
                <div className={`${festival.fesName} h-screen flex flex-col`} key={index}>
                  <div className="cardContainer relative h-3/5 m-5 bg-white rounded-md text-center items-center z-0">
                    {festival.isLocked && (
                      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-80 rounded-md z-10">
                        <span className="text-white text-2xl font-bold">Coming Soon</span>
                      </div>
                    )}
                    <div className="fesTitlecontainer relative  w-auto items-center h-4/5">
                      <Image src={`${fesImages[index]}`} alt="" layout="fill" objectFit="cover" className="rounded-md"/>
                      <div className="fesTitle text-center">{festival.fesName}</div>
                    </div>
                    <div className="descriptionTitle text-center">{festival.fesName}について</div>
                    <div className="descriptionText text-center">{festival.description}</div>

                    {/* ボタンの中央揃え */}
                    <div className="linkButton flex justify-center items-center rounded-lg w-full mt-4">
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                        詳しくはこちら
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
      </>
      
    )}
      
    </>
  );
}

