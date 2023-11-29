import { IPresignUrl } from '../shared/presign.payload.interface';

export interface IS3Service {
  getSignedUrl(user_id: number, ext: string): Promise<IPresignUrl>;
}
