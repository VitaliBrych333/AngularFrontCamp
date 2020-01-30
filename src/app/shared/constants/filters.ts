import { News } from '../../interfaces/news.interface';

export const Filters = {
    byAuthor: (data: News[], filterName: string) => data.filter(item => item.author === filterName ),
    byValue: (data: News[], filterValue: string) => data.filter(item => item.content.indexOf(filterValue) !== -1),
};
