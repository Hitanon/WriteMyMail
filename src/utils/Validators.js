export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const extractEmailType = (email) => {
    const domain = email.split('@')[1].split('.')[0];
    return domain.charAt(0).toUpperCase() + domain.slice(1);
};