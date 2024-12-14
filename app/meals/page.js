import Link from 'next/link';
import classes from './page.module.css';
import MealGrid from '@/component/meals/meal-grid';
import { getAllMeals } from '@/lib/meal';
import { Suspense } from 'react';

async function Meals(){
    const meals = await getAllMeals();
    return <MealGrid meals={meals}/>
}

export default function MealsPage() {
    //바닐라 라면?
    // useEffect(() => {
    //     fetch() //이걸로 특정 URL에 접근하여 가져오는 방법이 Basic
    // },[]);

    //서버 컴포넌트이기에, fetch로 가져오지 않을 수 있다.
    //즉 여기서 바로 데이터로 간다는 의미이다. 어렵지만 서버에서만 실행되는 서버 컴포넌트이기 때문에 가능하다.

    return (
        <>
         <header className={classes.header}>
            <h1>
                Delicious meals. <span className={classes.highlight}>by you</span>
            </h1>

            <p>Choose your favorite meal!</p>
            <p className={classes.cta}>
                <Link href="/meals/share">Share a meal</Link>
            </p>

         </header>
         <main className={classes.main}>
            <Suspense fallback = {<p> className={classes.loading}Fetching.....</p>}>
                <Meals /> 
            </Suspense>       
         </main>
        </>
    );
}   