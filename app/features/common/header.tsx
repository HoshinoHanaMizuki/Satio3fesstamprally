import Link from "next/link";

const titleImage:string = "/image/eventTitle.png";

export default function Header(){
    return(
        <header>
          <div className="titleContainer w-4/5">
            <Link href={'/'}>
              <img src={titleImage} alt="" className="w-full h-auto" loading="lazy" />
            </Link>
          </div>
        </header>
    )
}

