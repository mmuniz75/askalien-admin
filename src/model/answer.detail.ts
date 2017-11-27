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

    
}