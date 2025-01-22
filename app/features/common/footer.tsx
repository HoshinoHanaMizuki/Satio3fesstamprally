import { thisYear } from "./commonValue"

export default function Footer(){
    return (
        <footer>
            <p className="text-center text-xs md:text-lg mt-5">&copy; ${thisYear} それゆけ！3地区合同スタンプラリー実行委委員会</p>
        </footer>
    )
}