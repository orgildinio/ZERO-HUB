export const validateIFSC = async (ifscCode: string) => {
    try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);

        if (response.ok) {
            const data = await response.json();
            return {
                isValid: true,
                bank: data.BANK,
                branch: data.BRANCH,
                city: data.CITY,
                state: data.STATE,
                address: data.ADDRESS
            };
        } else {
            return { isValid: false };
        }
    } catch (error) {
        console.error('IFSC validation error:', error);
        return { isValid: false };
    }
};