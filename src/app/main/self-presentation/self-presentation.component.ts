import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-self-presentation',
    templateUrl: './self-presentation.component.html',
    styleUrls: ['./self-presentation.component.scss']
})
export class SelfPresentationComponent implements OnInit {

    public content: string;
    public links: object[];

    public ngOnInit(): void {
        this.content = `I learn to program in JS for about a year. I like exactly the frontend,
                        because I love to contemplate my result and I like how dynamically this
                        direction is developing. My goals are to achieve an appropriate level of
                        knowledge and gain practical experience in commercial development, allowing
                        me to find a job in this area. I am constantly engaged in self-development
                        and self-education, in addition to this I continue to receive an academic
                        education. I love to learn, easily learn new information. It is important
                        for me to teach the right direction of my development in this industry
                        from people with a lot of practical experience, competent advice and feedback
                        on my work, counter-criticism to my address. My life motto is constant
                        development and self-education. I constantly read manuals and special
                        literature on programming, watch video tutorials, independently try to understand
                        technologies. I assimilate information quickly. I would like to wish myself
                        and you development and the fastest possible achievement of the set goals.`;
        this.links = [
            { link: 'main', name: 'Hello World' },
        ];
    }

}
