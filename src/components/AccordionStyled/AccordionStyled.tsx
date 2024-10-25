import * as Accordion from '@radix-ui/react-accordion';

import './AccordionStyled.scss';
import { ChevronDown } from '@/components/Icons/Icons.tsx';

type PropsType = {
    title: string;
    content: string;
    isFirst?: boolean;
};

export const AccordionStyled = ({ content, title, isFirst }: PropsType) => {
    return (
        <Accordion.Root
            type="single"
            collapsible
            className={`accordion-root ${!isFirst ? '' : 'accordion-separator'}`}
        >
            <Accordion.Item value="item-1" className="accordion-item">
                <Accordion.Header className="accordion-header">
                    <Accordion.Trigger className="accordion-trigger">
                        {title}
                        <ChevronDown className="accordion-chevron" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="accordion-content">
                    {content}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    );
};
