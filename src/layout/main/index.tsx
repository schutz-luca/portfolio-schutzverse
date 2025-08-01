
import { useScroll, useSpring, motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useEffect, useState, useRef } from 'react';
import { AiOutlineBehance, AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';
import { ThemeProvider } from 'styled-components';
import { CircleText } from '@/src/components/circle-text';
import { Loading } from '@/src/components/loading';
import { AppManagerContext } from '@/src/context/app-manager';
import GlobalStyle from '@/src/styles/globals';
import { Header } from './header';
import { StyMain, StySideElement } from './styles';
import { MainLayoutProps } from './types';

export const MainLayout = ({ children, headerItems, isMainPage }: MainLayoutProps) => {
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState<HTMLElement[]>([]);
    const [activeSection, setActiveSection] = useState<number>(0);

    const { theme } = useContext(AppManagerContext);

    const mainRef = useRef<HTMLElement | null>(null);

    // Top progress bar
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const scrollTo = (value: number) => window.scrollTo({
        top: value,
        behavior: 'smooth'
    });

    const sectionToIndex = (selectedSection: string) => {
        const sectionsId = sections.map(section => section.id);
        return sectionsId?.indexOf(selectedSection);
    };

    // Scroll to selected section whener active session changes
    useEffect(() => {
        const currentSection = sections ? sections[activeSection] : undefined;

        if (currentSection) scrollTo(currentSection.offsetTop);
        // eslint-disable-next-line
    }, [activeSection, sections]);

    // Loading interval
    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoading(false);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [loading]);

    useEffect(() => {
        const section = window.location.href.split('#')[1];
        const index = sectionToIndex(section);

        if (isMainPage && index !== -1 && index !== undefined)
            setActiveSection(index);

        // eslint-disable-next-line
    }, [sections]);

    // Create an HTMLElement array with children elements
    useEffect(() => {
        let sectionsNodes: any = mainRef.current?.children;

        if (!sectionsNodes)
            return;

        var sections: any[] = [];
        [].push.apply(sections, sectionsNodes);

        setSections(sections);
    }, [loading]);

    return (
        <ThemeProvider theme={theme}>
            <Loading visible={loading} />
            <Header active={activeSection} setActive={setActiveSection} headerItems={headerItems} isMainPage={isMainPage} />
            <StySideElement className='left'>
                <ul>
                    <li>
                        <Link href='https://www.behance.net/schutz_luca' target='_blank'>
                            <AiOutlineBehance />
                        </Link>
                    </li>
                    <li>
                        <Link href='https://www.linkedin.com/in/luca-schutzenhofer/' target='_blank'>
                            <AiOutlineLinkedin />
                        </Link>
                    </li>
                    <li>
                        <Link href='https://github.com/schutz-luca' target='_blank'>
                            <AiOutlineGithub />
                        </Link>
                    </li>
                </ul>
            </StySideElement>
            <StySideElement className='right'>
                <CircleText
                    text='LSLSLSLSLSLSLSLSLSLSLSLSLSLS'
                    className='scrolling-obj'
                    style={{ transform: `rotate(${scrollYProgress.get() * 900}deg)` }}
                />
                <Link href='mailto:lucaschutzenhofer@hotmail.com'>
                    lucaschutzenhofer@hotmail.com
                </Link>
            </StySideElement>
            <StyMain ref={mainRef}>
                {!loading && children}
            </StyMain>
            <motion.div className='progress' style={{ scaleX }} />
            <motion.div className='progress bottom' style={{ scaleX }} />
            <GlobalStyle />
        </ThemeProvider>
    );
};