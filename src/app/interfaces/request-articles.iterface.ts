import { Article} from './article.interface';

export interface RequestArticle {
    status: string;
    totalResults: number;
    articles: Article[];
}
