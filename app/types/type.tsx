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
    Sponsors:Sponsors;
    place:string;
}
export type FestivalDetails ={
    introText : string[];
    festivalContents : FestivalContents[];
    importantInfo: ImportantInfo;
    garallyPhotos: string[];
    mapLink:string;
    anotherInfos:string[];
}

export type FestivalContents = {
    contentImage : string;
    contentTitle : string;
}

export type participationAwardsPartner = {
    name:string;
    image:string;
    link:string;
    award:string[];
}