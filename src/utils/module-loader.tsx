import { useEffect, useState } from "react";

export const moduleLoader = (module: Promise<any>) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        module
            .then(result => {
                try {
                    result && result.externalScript && result.externalScript();
                    setLoaded(true);
                } catch (error) {
                    setError(error);
                }
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    return {
        loaded,
        error
    };
}
