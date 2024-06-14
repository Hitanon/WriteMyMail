import { postMail } from '../clients/MailClient';

const useSendMail = () => {

    const sendMail = async (userName, userMail, subjectLetter, textLetter, recipientMail) => {
        const letterData = {
            userName,
            senderMail: userMail, 
            recipientMail,
            subject: subjectLetter,
            text: textLetter,
        };
        const response = await postMail(letterData);
        return response;
    };

    return {
        sendMail,
    };
};

export default useSendMail;
