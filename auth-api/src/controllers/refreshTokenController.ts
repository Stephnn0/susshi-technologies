import { Request, Response } from 'express';
import  User, { IUser } from '../models/User';
const jwt = require('jsonwebtoken');



export const handleRefreshToken = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(401);
        return
    } 
    console.log('kookies :',cookies)
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    
    const foundUser: IUser | null = await User.findOne({ refreshToken: refreshToken }).exec();

    console.log('foundUser :',foundUser)

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string,
            async (err: any, decoded: { email: string } | undefined) => {
                if (err) return res.sendStatus(403); // Forbidden
                console.log('Attempted refresh token reuse!');
                const hackedUser = await User.findOne({ email: decoded?.email }).exec();
                if (hackedUser) {
                    hackedUser.refreshToken = [];
                    const result = await hackedUser.save();
                    console.log(result);
                }
            }
        );
        res.sendStatus(403); // Forbidden
        return;
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter((rt: string) => rt !== refreshToken);

    // Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        async (err: any, decoded: { email: string } | undefined) => {
            if (err) {
                console.log('Expired refresh token');
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
                console.log(result);
            }
            if (err || foundUser.email !== decoded?.email) return res.sendStatus(403);

            // Refresh token was still valid
            const roles = Object.values(foundUser.roles);
            const id = Object.values(foundUser.userId);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        email: decoded.email,
                        roles: roles,
                        user: id
                    },
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '50m' }
            );

            const newRefreshToken = jwt.sign(
                { email: foundUser.email },
                process.env.REFRESH_TOKEN_SECRET as string,
                { expiresIn: '7d' }
            );
            console.log('newrefreshtoken', newRefreshToken)
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ accessToken });
        }
    );
};

export default { handleRefreshToken };
