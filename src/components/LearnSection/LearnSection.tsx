import trading from '@/assets/images/trading_academy.png';
import manage from '@/assets/images/manage.png';
import './LearnSection.scss';

const learnData = [
    {
        title: 'Trading academy',
        category: 'Beginners',
        picture: trading,
    },
    {
        title: 'How to manage personal finances',
        category: 'Beginners',
        picture: manage,
    },
    {
        title: 'How to manage your portfolio',
        category: 'Beginners',
        picture: trading,
    },

    {
        title: 'How to manage your portfolio',
        category: 'Beginners',
        picture: trading,
    },
];

const LearnSection = () => {
    return (
        <section className={'learn-section'}>
            <h2>Learn</h2>
            <div className={'learn-section--cards'}>
                {learnData.map((el, i) => (
                    <div className={'learn-section--cards-card'} key={i}>
                        <img src={el.picture} alt={el.title} />
                        <p>{el.category}</p>
                        <h3>{el.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LearnSection;
