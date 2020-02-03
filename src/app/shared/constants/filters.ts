import { Article } from '../../interfaces/article.interface';

export const Filters = {
    byAuthor: (data: Article[], filterName: string) => data.filter(item => item.author === filterName ),
    byValue: (data: Article[], filterValue: string) => data.filter(item => item.content.indexOf(filterValue) !== -1),
};
