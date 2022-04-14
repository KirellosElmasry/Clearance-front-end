import { clearanceData } from "./clearanceData";
import { personData } from "./personalData";

export class dto{
    eid: string;
    code: number;
    emirateId: string;
    job: string;
    militaryService: string;
    recognitionRegularityRate: string;
    intakeRate: string;
    fatherOfConfession: string;
    gender: string;
    churchId: number;
    fromChurch: string;
    jobAddress: string;
    address: string;
    message:string;
    msg:string;
    clearances:clearanceData;
    userId: number;   
    isPreviousEngagement:string;
    isPreviousMarrage:string;
    isPreviousChild:string;
    marriageDate:string;
    marriagePlace:string;
    status:string;
    priestFather:string;
    kindOfMarriage:string;
    childName:string;
    childAge:string;
    baptism:string;
    refNo:string;
    socialStatus:string;
    sourceOfPermitMarriage:string;
    dateOfPermitMarriage:string;
    personalData:personData;
}