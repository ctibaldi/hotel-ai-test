import {Content} from './content';
import {Meta} from './meta';

export interface Page {
  lang?: string;
  variety?: string;
  title: string;
  meta?: Meta;
  content?: Content;
}
