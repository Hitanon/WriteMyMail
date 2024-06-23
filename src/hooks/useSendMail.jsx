import { postMail } from '../clients/MailClient';

const useSendMail = () => {

    const sendMail = async (userMail, subjectLetter, textLetter, recipientMail) => {
        const letterData = {
            from: userMail, 
            to: recipientMail,
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
