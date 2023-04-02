import {BaseModel} from 'src/app/shared/general/base.model';
import {Accident} from '../accident/accident';

export class Photo extends BaseModel {
  filename: string;
  url: string;
  image: string;
  isDetail: boolean;
  accident: Accident;
  choosedImage?: FileList;
  volatileName?: string;
}
