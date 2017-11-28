export class QuestionFilter {
    justFeedback:boolean;
	startDate:Date;
	endDate:Date;
	question:string;
    ipFilter:String;
    
    constructor(){
        this.startDate = new Date();
        this.startDate.setDate(1);
        this.startDate.setHours(0,0,0,0);
        this.endDate = new Date();
    }
}
