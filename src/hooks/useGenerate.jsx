import { useContext } from 'react';
import { Context } from "../";
import { getImprovedLetter, getGeneratedLetter } from '../clients/LetterCLient';

const useGenerate = () => {
    const { letter } = useContext(Context);

    const improveLetter = async ({ 
        userName,
        subject,
        text 
    }) => {
        const letterData = {
            sender: userName,
            subject,
            body: text,
        };
        const response = await getImprovedLetter(letterData);
        // letter.setSubject(improvedLetter.subject);
        letter.setText(response.data.text);
    }

    const generateLetter = async ({ 
        userName,
        aboutSender,
        aboutRecipient,
        purpose,
        addRequirements,
     }) => {
        const letterData = {
            sender: userName,
            senderInfo: aboutSender,
            recipientInfo: aboutRecipient,
            purpose,
            requirements: addRequirements,
        };

        const response = await getGeneratedLetter(letterData);

        letter.setSubject(response.data.subject);
        letter.setText(response.data.text);
    }

    return {
        improveLetter,
        generateLetter,
    };
};

export default useGenerate;
