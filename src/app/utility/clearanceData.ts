import { Church } from "./church";
import { personData } from "./personalData";

export class clearanceData{
    dateOfMarriagePermit: Date;
    fatherOfConfession: string;
    gender:  string;
    intakeRate:  string;
    isHaveChildern:  string;
    is_previous_engagement:  string;
    is_previous_marriage:  string;
    is_previous_travel_board:  string;
    job:  string;
    jobAddress:  string;
    military_service:  string;
    numOfChildern:  string;
    originalFileAttachment:  string;
    refNo:string;
    printedFileAttachment:  string;
    recognition_regularity_rate:  string;
    socialStatus:  string;
    sourceOfMarriagePermit:  string;
    status:  string;
    address: string;
    Emirate_id: number;
    personalData: personData;
    fromChurch: string;
    recognitionRegularityRate:string;
    church:Church;
    militaryService: string;
    isPreviousEngagement: string;
}
