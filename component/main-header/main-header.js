
import Link from "next/link";
import Image from "next/image";

import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import MainHeaderBackground from "./main-header-background";
import { usePathname } from "next/navigation";
import NavLink from "./nav-link";

export default function MainHeader(){   

 return(
    <>
    <MainHeaderBackground />
     <header className={classes.header}>
         <Link className={classes.logo} href="/">
            <Image src={logoImg} alat="Logo Image" />
            NextLevel Food
         </Link>

         <nav className={classes.nav}>
            <ul>
                <li>
                  <NavLink href="/community">Community</NavLink>
                </li>
                <li>
                  <NavLink href="/meals">Meals</NavLink>
                </li>
            </ul>
         </nav>
     </header>
     </>
 );   
}