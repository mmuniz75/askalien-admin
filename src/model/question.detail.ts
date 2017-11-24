export interface IQuestionDetail {
    id: Number,
    ip: String,
    text: String,
    email: String,
    feedback: String,
    answer: {
        question: String
        content: String,
        number: Number,
        videoNumber: Number,
        date: String
    },
    creator: String,
    country: String,
    date: String
}
