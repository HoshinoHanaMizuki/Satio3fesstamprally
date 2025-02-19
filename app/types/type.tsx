export type Festival ={
    fesName:string;
    fesLink:String;
    fesImage:string;
    releaseDate:string;
    isLocked:boolean;
}
export type Sponsors = {
    MainSponsor : string;
    SubSponsor : string;
    isSubSponsored : boolean;
}
export type ImportantInfo = {
    date:string;
    sponsors:Sponsors;
    place:string;
}
export type FestivalDetails ={
    introText : string;
    fesContents : FesContents[];
    importantInfo: ImportantInfo;
    garallyPhotos: string[];
    mapLink:string;
    anotherInfos:string[];
}


export type participationAwardsPartner = {
    name:string;
    image:string;
    link:string;
    award:string[];
}



//editPage
export interface SponsorsData{
    id:string
    image:string,
    link:string,
    name:string,
    sort_id:number
}
export interface SubmitResult{
    result_movie_link:string,
    sub_oshougatsu:string,
    sub_perfect:string
}
export interface FesContents{
    id:string,
    img:string,
    name:string
}
export interface FesBaseInfo{
    date:string,
    intro_text:string,
    management:string,
    place:string,
    place_map_link:string,
    sponsor:string,
}