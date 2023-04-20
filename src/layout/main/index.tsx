
import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AiOutlineBehance, AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import { ThemeManagerContext } from "@/context/theme-manager";
import GlobalStyle from '@/styles/globals'
import { themeDark, themeLight } from "@/styles/theme";
import { MainLayoutProps } from "./types";
import { Header } from "./header";
import { StyMain, StySideElement } from "./styles";
import Link from "next/link";
import { Loading } from "@/components/loading";

export const MainLayout = ({ children }: MainLayoutProps) => {
    const { theme } = useContext(ThemeManagerContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoading(false);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [loading]);

    return (
        <ThemeProvider theme={theme}>
            <Loading visible={loading} />
            <Header />
            <StySideElement className="left">
                <ul>
                    <li>
                        <Link href='https://www.behance.net/schutz_luca' target="_blank">
                            <AiOutlineBehance />
                        </Link>
                    </li>
                    <li>
                        <Link href='https://www.linkedin.com/in/luca-schutzenhofer/' target="_blank">
                            <AiOutlineLinkedin />
                        </Link>
                    </li>
                    <li>
                        <Link href='https://github.com/schutz-luca' target="_blank">
                            <AiOutlineGithub />
                        </Link>
                    </li>
                </ul>
            </StySideElement>
            <StySideElement className="right">
                <Link href='mailto:lucaschutzenhofer@hotmail.com'>
                    lucaschutzenhofer@hotmail.com
                </Link>
            </StySideElement>
            <StyMain>
                {children}
            </StyMain>
            <GlobalStyle />
        </ThemeProvider>
    )
}