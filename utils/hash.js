import crypto from 'crypto';

function create(str) {
  return crypto.createHash('shake256').update(str).digest('hex');
}

export default {create};
