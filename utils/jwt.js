import * as jose from 'jose';

async function sign(data) {
  await new jose.SignJWT(data)
    .setProtectedHeader({alg: 'ES256'})
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(process.env.JWT_PRIVATE);
}

export default {sign};
