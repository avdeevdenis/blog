import { useEffect } from 'react';

export const withHightlightCode = (Component: React.FC) => (props: any) => {
    useEffect(() => {
        const onPrepareCodesError = (error: Error) => console.log('Can\'t parse code highlight.js with error ', error);
        const prepareCodes: (props: any) => void = ([hljs, { default: language }]) => {
            try {
                hljs.initHighlightingOnLoad();
                hljs.registerLanguage('javascript', language);

                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            } catch (error) {
                onPrepareCodesError(error);
            }
        }

        const highlightLibs = [
            import('highlight.js/lib/core'),
            import('highlight.js/lib/languages/javascript'),
            import('highlight.js/styles/github.css')
        ];

        Promise.all(highlightLibs)
            .then(prepareCodes)
            .catch(onPrepareCodesError);
    }, []);

    return <Component {...props} />
};
