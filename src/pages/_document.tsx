import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {

    return (

        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&family=Kumbh+Sans:wght@400;500;700;800&family=Montserrat:wght@300;500;600;700&family=Open+Sans:wght@300;500;800&family=Poppins:wght@300;500;600;700&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>

    );

}