import { Video } from './video';

export class AnswerDetail {
    number: Number
    question: String
    content: String
    video: {
        number: Number
    }
    link: String

    constructor(){
        this.video = new Video();
    }

    public isValid():boolean{
        if (this.question && this.question.length > 0
            && this.video && 
            this.content && this.content.length > 0)
            return true;
        else 
            return false;    
    }
}