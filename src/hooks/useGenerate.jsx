import { useContext } from 'react';
import { Context } from "../";
import { getImprovedLetter, getGeneratedLetter } from '../clients/LetterCLient';

const useGenerate = () => {
    const { user, letter, generateParams } = useContext(Context);

    const improveLetter = async () => {
        const letterData = {
            senderName: user.name,
            subject: letter.subject,
            text: letter.text,
        };
        const improvedLetter = await getImprovedLetter(letterData);

        letter.setSubject(improvedLetter.subject);
        letter.setText(improvedLetter.text);
    }

    const generateLetter = async () => {
        const letterData = {
            senderName: user.name,
            aboutSender: user.info,
            aboutRecipient: generateParams.aboutRecipient,
            purpose: generateParams.purpose,
            addRequirements: generateParams.addRequirements,
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
