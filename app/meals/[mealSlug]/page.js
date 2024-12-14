import Image from 'next/image';
import classes from './page.module.css';
import { GetMeal } from '@/lib/meal';

export default function MeadDetailsPage({ params }) {
    const meal = GetMeal(params.mealSlug);
    meal.instructions = meal.instructions.replaceAll('\n', '<br/>');
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                        <p className={classes.sumary}>{meal.summary}</p>
                    </p>
                </div>
            </header>
            <main className={classes.main}>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                     __html: meal.instructions }}></p>
            </main>
        </>
    );
}