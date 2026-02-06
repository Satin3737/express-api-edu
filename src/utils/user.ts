import {User} from '@/models';

export const isEmailUnique = async (email: string | undefined): Promise<boolean> => {
    if (!email) return true;
    const withSameEmail = await User.find({email});
    return !withSameEmail.length;
};
