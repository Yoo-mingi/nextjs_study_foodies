import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

//데이터를 불러올때는 all. 수정 등의 삽입은 run()
    //get도 되지만 여러개라면 all이다.
export async function getAllMeals() {
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}

export function GetMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();
    
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Image upload failed');
        }
    });
    meal.image = `/images/${filename}`;

    db.prepare(`
        INSERT INTO meals(
        title,
        slug,
        image,
        summary,
        instructions,
        creator,
        creator_email)
        VALUES(
            @title,
            @slug,
            @image,
            @summary,
            @instructions,
            @creator,
            @creator_email
        )`).run(meal);

}