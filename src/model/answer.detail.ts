export interface IAnswerDetail {
    number: Number,
    question: String,
    content: String,
    video: {
        number: Number
    },
    link: String
}

export class AnswerDetail implements IAnswerDetail{
    number: Number
    question: String
    content: String
    video: {
        number: Number
    }
    link: String
}