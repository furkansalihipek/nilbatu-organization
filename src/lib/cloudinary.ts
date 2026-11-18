import { createHash, randomUUID } from 'node:crypto';

export function getCloudinaryConfig() {
  if (process.env.GALLERY_READ_ONLY === 'true') return null;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!process.env.FLY_APP_NAME && !cloudName && !apiKey && !apiSecret) return null;
  if (!cloudName || !/^[a-z0-9_-]+$/i.test(cloudName) || !apiKey || !apiSecret) {
    throw new Error('Cloudinary yapılandırması eksik veya geçersiz');
  }

  return { cloudName, apiKey, apiSecret };
}

export function signCloudinaryFields(
  fields: Record<string, string>,
  config: NonNullable<ReturnType<typeof getCloudinaryConfig>>
) {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const parameters = { ...fields, timestamp };
  const value = Object.entries(parameters).sort(([a], [b]) => a.localeCompare(b))
    .map(([key, entry]) => `${key}=${entry}`).join('&');
  const signature = createHash('sha256').update(value + config.apiSecret).digest('hex');
  return { ...parameters, api_key: config.apiKey, signature };
}

export function createCloudinaryUpload() {
  const config = getCloudinaryConfig();
  if (!config) return null;

  return {
    url: `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    fields: signCloudinaryFields({
      overwrite: 'false',
      public_id: `nilbatu-gallery-${randomUUID()}`,
    }, config),
  };
}

const recordsId = 'nilbatu-gallery-records.json';

export async function readCloudinaryRecords(config: NonNullable<ReturnType<typeof getCloudinaryConfig>>) {
  const { cloudName, apiKey, apiSecret } = config;
  const authorization = Buffer.from(apiKey + ':' + apiSecret).toString('base64');
  const endpoint = 'https://api.cloudinary.com/v1_1/' + cloudName + '/resources/raw/upload/' + recordsId;
  const asset = await fetch(endpoint, {
    headers: { Authorization: 'Basic ' + authorization }, cache: 'no-store', signal: AbortSignal.timeout(8000),
  });
  if (asset.status === 404) return [];
  if (!asset.ok) throw new Error('Galeri kayıt dosyası bulunamadı: ' + asset.status);
  const { secure_url: url } = await asset.json();
  if (typeof url !== 'string' || !url.startsWith('https://res.cloudinary.com/' + cloudName + '/raw/upload/')) {
    throw new Error('Galeri kayıt adresi geçersiz');
  }
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('Galeri kayıtları okunamadı: ' + response.status);
  const records: unknown = await response.json();
  if (!Array.isArray(records)) throw new Error('Galeri kayıtları geçersiz');
  return records;
}

export async function writeCloudinaryRecords(
  records: unknown[],
  config: NonNullable<ReturnType<typeof getCloudinaryConfig>>
) {
  const form = new FormData();
  form.set('file', new Blob([JSON.stringify(records)], { type: 'application/json' }), recordsId);
  const fields = signCloudinaryFields({ invalidate: 'true', overwrite: 'true', public_id: recordsId }, config);
  for (const [key, value] of Object.entries(fields)) form.set(key, value);

  const response = await fetch('https://api.cloudinary.com/v1_1/' + config.cloudName + '/raw/upload', {
    method: 'POST', body: form, signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('Galeri kayıtları kaydedilemedi: ' + response.status);
}
