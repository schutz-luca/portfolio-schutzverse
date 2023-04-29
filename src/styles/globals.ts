import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { devices } from './devices';

export default createGlobalStyle`
  ${normalize}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    height: -webkit-fill-available;
    -ms-overflow-style: scrollbar;
    background: black;
    background: ${({ theme }) => theme.background};
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    font: 400 1rem ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.text};
    transition: ${({ theme }) => theme.transition};
  }

  section {
    box-sizing: border-box;
    width: 100%;
    height: 101vh;
    display: flex;
    justify-content: flex-start;
    padding-top: 80px;
    
    span{
      display: block;
      transform: translateY(-50px);
      opacity: 0;
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  img {
    max-width: 100%;
  }

  button {
    background-color: transparent;
    border: none;
    box-shadow: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    -webkit-box-shadow: none;
  }

  h1, h2, h3 {
    margin: 0;
  }

  h1 {
    font-size: 100px;
  }

  a {
      color: ${({ theme }) => theme.text};
      text-decoration: none;
      font-weight: 600;

      &.active {
        color: ${({ theme }) => theme.primary};
      }
  }

  a, li {
    margin-bottom: 0;
    transition: ${({ theme }) => theme.transition};

    &:hover, &:focus{
      transform: translateY(-3px);
    }
  }

  ul {
    list-style: none;
  }

  @-ms-viewport {
    width: device-width;
  }

    *::selection {
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.colors.white};
    }

    *::-webkit-scrollbar {
      width: 0.4rem;
      @media ${devices.tablet}{
        width: 0.2rem;
      }
    }

    *::-webkit-scrollbar-track {
      border-radius: 40px;
      background: #0001;
    }

    *::-webkit-scrollbar-thumb {
      border-radius: 40px;
      background-color: #2225;
      transition: background-color 0.3s ease-out;
    }

    *:hover::-webkit-scrollbar-thumb {
      background-color: #2228;
    }

    .progress {
      position: fixed;
      left: 0;
      right: 0;
      height: 5px;
      min-width: 10px;
      background: ${({ theme }) => theme.progress};
      top: 0;
      z-index: 9;
    }
`;