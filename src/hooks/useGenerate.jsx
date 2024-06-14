import { useContext } from 'react';
import { Context } from "../";
import { getImprovedLetter, getGeneratedLetter } from '../clients/LetterCLient';

const useGenerate = () => {
    const { letter } = useContext(Context);

    const improveLetter = async ({ 
        userName,
        subject,
        text }) => {
        const letterData = {
            senderName: userName,
            subject,
            text,
        };
        const improvedLetter = await getImprovedLetter(letterData);

        letter.setSubject(improvedLetter.subject);
        letter.setText(improvedLetter.text);
    }

    const generateLetter = async ({ 
        userName,
        aboutSender,
        aboutRecipient,
        purpose,
        addRequirements,
     }) => {
        const letterData = {
            senderName: userName,
            aboutSender,
            aboutRecipient,
            purpose,
            addRequirements,
        };
        const generatedLetter = await getGeneratedLetter(letterData);

        letter.setSubject(generatedLetter.subject);
        letter.setText(generatedLetter.text);
    }

    return {
        improveLetter,
        generateLetter,
    };
};

export default useGenerate;
